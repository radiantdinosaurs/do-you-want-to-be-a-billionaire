'use strict'

const axios = require('axios')
const error = require('../error/index')
const logger = require('../logger/index')

const SUCCESS = 0
const TOKEN_EMPTY = 4

async function handleGettingTrivia(request, response, next) {
    try {
        let answers
        if (request.body && request.body.token) {
            const token = request.body.token
            const easyQuestions = await handleMakingRequestForEasyQuestions(token)
            const mediumQuestions = await handleMakingRequestForMediumQuestions(token)
            const hardQuestions = await handleMakingRequestForHardQuestions(token)
            let questions = await easyQuestions.concat(mediumQuestions, hardQuestions)
            questions = await questions.map((question) => {
                answers = []
                answers.push({ 'correct': parse(question.correct_answer) })
                question.incorrect_answers.forEach((answer) => {
                    answers.push({ 'incorrect': parse(answer) })
                    shuffle(answers)
                })
                parse(question.question)
                return {
                    'question': question.question,
                    'answers': answers
                }
            })
            response.status(200).send({ questions })
        } else next(error.badBodyFormat())
    } catch (error) {
        next(error)
    }
}

function shuffle(array) {
    let currentIndex = array.length
    let temporaryValue
    let randomIndex
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
    }
    return array
}

function parse(sentence) {
    return sentence.replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/(&quot;)|(&ldquo;)/g, '"')
        .replace(/(&#039;)|(&rsquo;)|(&#039;)/g, "'")
        .replace(/&shy;/g, '-')
        .replace(/&amp;/g, '&')
        .replace(/&oacute;/g, 'ó')
        .replace(/&hellip;/g, '...')
}

function needsTokenReset(response) {
    if (response.response_code) {
        if (response.response_code === SUCCESS) {
            return false
        } else if (response.response_code === TOKEN_EMPTY) {
            return true
        }
    }
}

function resetToken(token) {
    return new Promise((resolve, reject) => {
        axios.get(`https://opentdb.com/api_token.php?command=reset&token=${token}`)
            .then((response) => resolve(response))
            .catch((error) => reject(error))
    })
}

async function handleMakingRequestForEasyQuestions(token) {
    let response = await getEasyQuestions(token)
    if (needsTokenReset(response)) {
        await resetToken(token)
        response = await getEasyQuestions(token)
    }
    const easyQuestions = response.results
    return easyQuestions
}

async function handleMakingRequestForMediumQuestions(token) {
    let response = await getMediumQuestions(token)
    if (needsTokenReset(response)) {
        await resetToken(token)
        response = await getMediumQuestions(token)
    }
    const mediumQuestions = response.results
    return mediumQuestions
}

async function handleMakingRequestForHardQuestions(token) {
    let response = await getHardQuestions(token)
    if (needsTokenReset(response)) {
        await resetToken(token)
        response = await getHardQuestions(token)
    }
    const hardQuestions = response.results
    return hardQuestions
}

function getEasyQuestions(token) {
    return new Promise((resolve, reject) => {
        axios.get(`https://opentdb.com/api.php?amount=9&category=9&difficulty=easy&type=multiple&token=${token}`)
        .then((response) => {
            resolve(response.data)
        }).catch((error) => reject(error))
    })
}

function getMediumQuestions(token) {
    return new Promise((resolve, reject) => {
        axios.get(`https://opentdb.com/api.php?amount=4&category=9&difficulty=medium&type=multiple&token=${token}`)
        .then((response) => {
            resolve(response.data)
        }).catch((error) => reject(error))
    })
}

function getHardQuestions(token) {
    return new Promise((resolve, reject) => {
        axios.get(`https://opentdb.com/api.php?amount=2&category=9&difficulty=hard&type=multiple&token=${token}`)
        .then((response) => {
            resolve(response.data)
        }).catch((error) => reject(error))
    })
}

module.exports = {
    handleGettingTrivia: handleGettingTrivia
}
