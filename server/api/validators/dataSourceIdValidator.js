'use strict';
const Joi = require('joi');
const ErrorHandler = require('../handlers/errorHandler');

const dataSourceIdValidator = {
    validate: {
        params: {
            id: Joi.string()
                .guid()
                .description('id of the data source')
        },
        failAction: ErrorHandler.handleError
    }
};

module.exports = dataSourceIdValidator;
