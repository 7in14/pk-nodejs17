'use strict';
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const ErrorHandler = require('../handlers/errorHandler');

const dataSourceIdValidator = {
    validate: {
        params: {
            id: Joi.objectId()
                .description('id of the data source')
        },
        failAction: ErrorHandler.handleError
    }
};

module.exports = dataSourceIdValidator;
