'use strict';
const Joi = require('joi');
const ErrorHandler = require('../handlers/errorHandler');

const crimeValidator = {
    validate: {
        query: {
            query: Joi.string()
                .min(1)
                .optional()
                .description('query should specify what crimes to include')
        },
        failAction: ErrorHandler.handleError
    }
};

module.exports = crimeValidator;
