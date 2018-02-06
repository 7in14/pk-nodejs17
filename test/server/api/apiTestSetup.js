'use strict';

const Hapi = require('hapi');
const Config = require('../../../config');
const MongoMock = require('mongo-mock');
const Proxyquire = require('proxyquire');
const MongoPlugin = Proxyquire('hapi-mongodb', {
    'mongodb': MongoMock
});

exports.setupServer = async function () {

    MongoMock.max_delay = 0;
    const plugins = [{
        plugin: require('../../../server/api/index'),
        routes: {
            prefix: '/api'
        }
    }, {
        plugin: MongoPlugin
    }];
    const server = Hapi.Server({
        port: Config.get('/port/web')
    });
    await server.register(plugins);

    return server;
};
