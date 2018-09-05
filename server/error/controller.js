'use strict'

function resourceNotFound() {
    const error = new Error('Resource not found.')
    error.code = 404
    return error
}

function unexpectedError() {
    const error = new Error('Unexpected error.')
    error.code = 500
    return error
}

function badBodyFormat() {
    const error = new Error('Body is not formatted correctly. Please format it as { token: "" }.')
    error.code = 400
    return error
}

module.exports = {
    resourceNotFound: resourceNotFound,
    unexpectedError: unexpectedError,
    badBodyFormat: badBodyFormat
}