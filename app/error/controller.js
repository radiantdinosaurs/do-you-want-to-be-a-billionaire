'use strict';

function resourceNotFound() {
    const error = new Error('Resource not found.');
    error.code = 404;
    return error;
}

function unexpectedError() {
    const error = new Error('Unexpected error.');
    error.code = 500;
    return error;
}

function badBodyFormat() {
    const error = new Error(
        'Body is not formatted correctly. Please format it as { token: "your_token_here" }.'
    );
    error.code = 400;
    return error;
}

function unexpectedResponse() {
    const error = new Error(
        'The API returned an unexpected response. Please contact the administrator if this continues.'
    );
    error.code = 500;
    return error;
}

function emptyToken() {
    const error = new Error('Token is empty.');
    error.code = 401;
    return error;
}

function tokenNotFound() {
    const error = new Error('Token not found.');
    error.code = 401;
    return error;
}

module.exports = {
    resourceNotFound: resourceNotFound,
    unexpectedError: unexpectedError,
    badBodyFormat: badBodyFormat,
    unexpectedResponse: unexpectedResponse,
    emptyToken: emptyToken,
    tokenNotFound: tokenNotFound
};
