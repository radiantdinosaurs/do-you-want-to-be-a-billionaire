"use strict";

const controller = require("./controller");

module.exports = {
    resourceNotFound: controller.resourceNotFound,
    unexpectedError: controller.unexpectedError,
    badBodyFormat: controller.badBodyFormat,
    unexpectedResponse: controller.unexpectedResponse,
    emptyToken: controller.emptyToken,
    tokenNotFound: controller.tokenNotFound,
    internalError: controller.internalError
};
