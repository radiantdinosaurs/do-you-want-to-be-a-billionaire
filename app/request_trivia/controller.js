"use strict";

const axios = require("axios");
const getError = require("../error/index");
const logger = require("../logger/index");
const constants = require("../constants/index");

const EASY_QUESTIONS = token =>
    `https://opentdb.com/api.php?amount=9&category=9&difficulty=easy&type=multiple&token=${token}`;
const MEDIUM_QUESTIONS = token =>
    `https://opentdb.com/api.php?amount=4&category=9&difficulty=medium&type=multiple&token=${token}`;
const HARD_QUESTIONS = token =>
    `https://opentdb.com/api.php?amount=2&category=9&difficulty=hard&type=multiple&token=${token}`;

function checkResponseCode(response) {
    const responseCode = response.data.response_code;
    if (responseCode === constants.TOKEN_EMPTY) {
        logger.log("info", "Token is empty");
        throw getError.emptyToken();
    } else if (responseCode === constants.TOKEN_NOT_FOUND) {
        logger.log("info", "Token was not found");
        throw getError.tokenNotFound();
    } else if (responseCode !== constants.SUCCESS)
        throw getError.unexpectedResponse();
}

function handleGettingTrivia(request, response, next) {
    let questions = [];

    if (request && request.body) {
        if (request.body.token) {
            const token = request.body.token;
            axios
                .get(EASY_QUESTIONS(token))
                .then(result => {
                    checkResponseCode(result);
                    questions = result.data.results;
                    return axios.get(MEDIUM_QUESTIONS(token));
                })
                .then(result => {
                    checkResponseCode(result);
                    questions = questions.concat(result.data.results);
                    return axios.get(HARD_QUESTIONS(token));
                })
                .then(result => {
                    checkResponseCode(result);
                    questions = questions.concat(result.data.results);
                    response.questions = questions;
                    next();
                })
                .catch(error => {
                    logger.log("error", {
                        message: "Caught an error inside handleTriviaRequest",
                        error: error
                    });
                    next(error);
                });
        } else next(getError.badBodyFormat());
    } else next(getError.internalError());
}

module.exports = {
    handleGettingTrivia: handleGettingTrivia
};
