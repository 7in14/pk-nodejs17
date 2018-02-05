'use strict';
const Joi = require('joi');

const crimeValidator = {
    validate: {
        query: {
            query: Joi.string()
                .min(1)
                .optional()
                .description('query should specify what crimes to include')
        }
    }
};

module.exports = crimeValidator;
