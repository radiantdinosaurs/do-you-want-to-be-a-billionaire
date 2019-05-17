"use strict";

const error = require("../error/index");
const logger = require("../logger/index");
const requestTrivia = require("../request_trivia/index");

const RESET_TOKEN = token =>
    `https://opentdb.com/api_token.php?command=reset&token=${token}`;
const GET_TOKEN = `https://opentdb.com/api_token.php?command=request`;

function verifyToken(request, response, next) {
    if (request.body && request.body.token) next();
    else next(error.badBodyFormat());
}

function resetToken(request, response, next) {
    fetch
        .get(RESET_TOKEN(request.body.token))
        .then(result => {
            request.body.token = result.data.token;
            requestTrivia.getTrivia(request, response, next);
        })
        .catch(error => {
            logger.log("error", {
                message: "Caught an error inside resetToken",
                error: error
            });
            next(error);
        });
}

function fetchToken(request, response, next) {
    fetch
        .get(GET_TOKEN)
        .then(result => {
            request.body.token = result.data.token;
            requestTrivia.getTrivia(request, response, next);
        })
        .catch(error => {
            logger.log("error", {
                message: "Caught an error inside fetchToken",
                error: error
            });
            next(error);
        });
}

module.exports = {
    verifyToken: verifyToken,
    resetToken: resetToken,
    fetchToken: fetchToken
};
