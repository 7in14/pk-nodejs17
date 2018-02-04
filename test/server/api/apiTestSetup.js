'use strict';

const Hapi = require('hapi');
const Config = require('../../../config');

exports.setupServer = async function () {

    const plugins = {
        plugin: require('../../../server/api/index'),
        routes: {
            prefix: '/api'
        }
    };
    const server = Hapi.Server({
        port: Config.get('/port/web')
    });
    await server.register(plugins);

    return server;
};
