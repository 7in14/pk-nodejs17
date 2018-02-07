'use strict';
const Joi = require('joi');
const ErrorHandler = require('../handlers/errorHandler');

const dataSourceValidator = {
    validate: {
        payload: Joi.object({
            name: Joi.string().min(3),
            url: Joi.string().uri()
        }),
        failAction: ErrorHandler.handleError
    }
};

module.exports = dataSourceValidator;
