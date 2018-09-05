'use strict'

const express = require('express')
const requestTrivia = require('./request_trivia/index')

const router = express.Router()

router.get('/', (request, response) => {
    response.status(200).send({ success: true })
})

router.post('/trivia', requestTrivia.getTrivia)

module.exports = router
