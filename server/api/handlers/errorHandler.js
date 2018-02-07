'use strict';

exports.handleError = function (request, h, err) {

    console.info('In the error handler', err);

    // Extra "data" object is inserted in errorObject if data is validated
    // through Hapi or programatically
    const errorObject = err.data || err;


    if (errorObject.isJoi && Array.isArray(errorObject.details) && errorObject.details.length > 0) {
        const invalidItem = errorObject.details[0];
        return h.response(`Data Validation Error. Schema violation. <${invalidItem.path}> \nDetails: ${JSON.stringify(errorObject.details)}`).code(401);
    }


    return new Error(err);
};
