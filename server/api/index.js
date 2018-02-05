'use strict';
const PingHandler = require('./handlers/pingHandler');
const DataSourceHandler = require('./handlers/dataSourceHandler');
const FileHandler = require('./handlers/fileHandler');
const CrimeHandler = require('./handlers/crimeHandler');
const WelcomeHandler = require('./handlers/welcomeHandler');

const register = function (server, options) {

    server.route({
        method: 'GET',
        path: '/',
        options: WelcomeHandler
    });

    server.route({
        method: 'GET',
        path: '/ping',
        options: PingHandler
    });

    server.route({
        method: 'GET',
        path: '/dataSources',
        options: DataSourceHandler.getAll
    });

    server.route({
        method: 'DELETE',
        path: '/dataSource/{id}',
        options: DataSourceHandler.del
    });

    server.route({
        method: 'GET',
        path: '/dataSource/{id}',
        options: DataSourceHandler.get
    });

    server.route({
        method: 'PUT',
        path: '/dataSource',
        options: DataSourceHandler.add
    });

    server.route({
        method: 'GET',
        path: '/file',
        options: FileHandler
    });

    server.route({
        method: 'GET',
        path: '/raleigh/crime',
        options: CrimeHandler
    });
};

exports.plugin = {
    register,
    name: 'api'
};
