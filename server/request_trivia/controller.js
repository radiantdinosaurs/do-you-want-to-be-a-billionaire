'use strict'

const axios = require('axios')
const error = require('../error/index')
const logger = require('../logger/index')

const SUCCESS = 0
const TOKEN_EMPTY = 4

async function handleGettingTrivia(request, response, next) {
    try {
        if (request.body && request.body.token) {
            const token = request.body.token
            const easyQuestions = await handleMakingRequestForEasyQuestions(token)
            const mediumQuestions = await handleMakingRequestForMediumQuestions(token)
            const hardQuestions = await handleMakingRequestForHardQuestions(token)
            const questions = easyQuestions.concat(mediumQuestions, hardQuestions)
            response.status(200).send({ questions })
        } else next(error.badBodyFormat())
    } catch(error) {
        next(error)
    }
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