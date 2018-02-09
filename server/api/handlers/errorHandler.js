'use strict';

exports.handleError = function (request, h, err) {

    // Extra "data" object is inserted in errorObject if data is validated
    // through Hapi or programatically
    const errorObject = err.data || err;

    if (errorObject.isJoi && Array.isArray(errorObject.details) && errorObject.details.length > 0) {
        const invalidItem = errorObject.details[0];
        return h.response(`7in14 node js - Data Validation Error. Schema violation. <${invalidItem.path}> \nDetails: ${JSON.stringify(errorObject.details)}`)
            .code(400)
            .takeover();
    }
};
