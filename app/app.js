'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');
const logger = require('./logger/index');
const error = require('./error/index');

const app = express();

// config ===============================
app.set('port', 8080);
app.use(bodyParser.json({ limit: '50mb' }));
app.use(
    bodyParser.urlencoded({
        limit: '50mb',
        extended: true,
        parameterLimit: 50000
    })
);

// routes ===============================
app.use('/', router);

// handles when route is not found
app.use((request, response, next) => next(error.resourceNotFound));

// handles errors
app.use((error, request, response, next) => {
    if (error) {
        if (error.code) {
            logger.log('error', error);
            response.status(error.code).send({
                status: error.code,
                error: error.message
            });
        } else {
            logger.log('error', error);
            response.status(500).send({
                status: 500,
                error: 'Unexpected error.'
            });
        }
    }
});

// launch ===============================
app.listen(app.get('port'), error => {
    if (error) logger.log('error', error);
    else {
        logger.log({
            level: 'info',
            message:
                'App is running, server is listening on port ' + app.get('port')
        });
    }
});
