"use strict";

const status = {
    EMPTY_TOKEN: 1,
    TOKEN_NOT_FOUND: 2,
    BODY_FORMAT_ERROR: 3,
    INTERNAL_ERROR: 4
};

function resourceNotFound() {
    const error = new Error("Resource not found.");
    error.code = 404;
    error.status = status.INTERNAL_ERROR;
    return error;
}

function unexpectedError() {
    const error = new Error("Unexpected error.");
    error.code = 500;
    error.status = status.INTERNAL_ERROR;
    return error;
}

function badBodyFormat() {
    const error = new Error(
        'Body is not formatted correctly. Please format it as { token: "your_token_here" }.'
    );
    error.code = 400;
    error.status = status.BODY_FORMAT_ERROR;
    return error;
}

function unexpectedResponse() {
    const error = new Error(
        "The API returned an unexpected response. Please contact the administrator if this continues."
    );
    error.code = 500;
    error.status = status.INTERNAL_ERROR;
    return error;
}

function internalError() {
    const error = new Error(
        "An unexpected error occurred. Please try again, and if this issue persists, contact the administrator."
    );
    error.code = 500;
    error.status = status.INTERNAL_ERROR;
    return error;
}

function emptyToken() {
    const error = new Error("Token is empty.");
    error.code = 401;
    error.status = status.EMPTY_TOKEN;
    return error;
}

function tokenNotFound() {
    const error = new Error("Token not found.");
    error.code = 401;
    error.status = status.TOKEN_NOT_FOUND;
    return error;
}

module.exports = {
    resourceNotFound: resourceNotFound,
    unexpectedError: unexpectedError,
    badBodyFormat: badBodyFormat,
    unexpectedResponse: unexpectedResponse,
    emptyToken: emptyToken,
    tokenNotFound: tokenNotFound,
    internalError: internalError
};
