'use strict';

const logger = require('../logger/index');

async function parseTrivia(request, response, next) {
    try {
        const questions = await response.questions.map(question => {
            let answers = [];
            answers.push({
                name: parse(question.correct_answer),
                correct: true
            });
            question.incorrect_answers.forEach(answer => {
                answers.push({ name: parse(answer), correct: false });
                shuffle(answers);
            });
            parse(question.question);
            return {
                question: question.question,
                answers: answers
            };
        });
        response.status(200).send({ questions });
    } catch (error) {
        logger.log('error', {
            message: 'Caught an error inside parseTrivia',
            error: error
        });
        next(error);
    }
}

function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function parse(sentence) {
    sentence
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/(&quot;)|(&ldquo;)/g, '"')
        .replace(/(&#039;)|(&rsquo;)|(&#039;)/g, "'")
        .replace(/&shy;/g, '-')
        .replace(/&amp;/g, '&')
        .replace(/&oacute;/g, 'ó')
        .replace(/&hellip;/g, '...');
    return sentence;
}

module.exports = {
    parseTrivia: parseTrivia
};
