'use strict';

const express = require('express');
const requestTrivia = require('./request_trivia/index');
const parseTrivia = require('./parse_trivia/index');
const token = require('./token/index');

const router = express.Router();

router.get('/', (request, response, next) => {
    response.status(200).send({ success: true });
});

router.post(
    '/api/v1/trivia',
    token.verifyToken,
    requestTrivia.getTrivia,
    parseTrivia.parseTrivia
);

module.exports = router;
