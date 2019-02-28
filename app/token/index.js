'use strict';

const controller = require('./controller');

module.exports = {
    verifyToken: controller.verifyToken,
    resetToken: controller.resetToken,
    fetchToken: controller.fetchToken
};
