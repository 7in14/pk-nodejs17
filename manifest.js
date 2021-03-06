'use strict';

const Confidence = require('confidence');
const Config = require('./config');

const criteria = {
    env: process.env.NODE_ENV
};


const manifest = {
    $meta: 'This file defines the 7in14 app.',
    server: {
        debug: {
            request: ['error']
        },
        routes: {
            security: true
        },
        port: Config.get('/port/web')
    },
    register: {
        plugins: [
            'vision',
            {
                plugin: './server/api/index',
                routes: {
                    prefix: '/api'
                }
            },
            './server/web/index',
            {
                plugin: 'good',
                options: {
                    ops: {
                        interval: 1000
                    },
                    reporters: {
                        myConsoleReporter: [{
                            module: 'good-squeeze',
                            name: 'Squeeze',
                            args: [{
                                log: '*',
                                response: '*'
                            }]
                        }, {
                            module: 'good-console'
                        }, 'stdout']
                    }
                }
            },
            {
                plugin: 'hapi-mongodb',
                options: {
                    url: Config.get('/mongo/url'),
                    settings: {
                        poolSize: 10
                    },
                    decorate: true
                }
            }
        ]
    }
};


const store = new Confidence.Store(manifest);


exports.get = (key) => {

    return store.get(key, criteria);
};


exports.meta = (key) => {

    return store.meta(key, criteria);
};
