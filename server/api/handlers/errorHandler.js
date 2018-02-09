'use strict';

exports.handleError = function (request, h, err) {

    // Extra "data" object is inserted in errorObject if data is validated
    // through Hapi or programatically
    //const errorObject = err.data || err;
    const errorObject = err;

    if (errorObject.isJoi && Array.isArray(errorObject.details) && errorObject.details.length > 0) {
        const invalidItem = errorObject.details[0];
        return h.response(`Data Validation Error. Schema violation. <${invalidItem.path}> \nDetails: ${JSON.stringify(errorObject.details)}`)
            .code(400)
            .takeover();
    }

    return h.response(err)
        .takeover()
};
