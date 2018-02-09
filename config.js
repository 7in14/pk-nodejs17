'use strict';

const Confidence = require('confidence');


const criteria = {
    env: process.env.NODE_ENV
};


const config = {
    $meta: 'This file configures the 7in14 app.',
    projectName: 'sample',
    port: {
        web: {
            $filter: 'env',
            test: 9090,
            docker: 3000,
            prod: 80,
            $default: 8080
        }
    },
    mongo: {
        url: {
            $filter: 'env',
            test: 'mongodb://testingDb:27017/test',
            docker: process.env.MONGO || 'mongodb://172.17.0.3/7in14',
            prod: process.env.MONGO,
            $default: 'mongodb://localhost:27017/7in14',
        }
    }
};


const store = new Confidence.Store(config);


exports.get = function (key) {

    return store.get(key, criteria);
};


exports.meta = function (key) {

    return store.meta(key, criteria);
};
