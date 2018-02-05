'use strict';
const Joi = require('joi');

const crimeValidator = {
    validate: {
        query: {
            query: Joi.string()
                .min(1)
                .optional()
        }
    }
};

module.exports = crimeValidator;
