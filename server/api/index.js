'use strict';
const PingHandler = require('./handlers/pingHandler');
const NotifierHandler = require('./handlers/notifierHandler');
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
        path: '/notifier',
        options: NotifierHandler.getNotifiers
    });

    server.route({
        method: 'DELETE',
        path: '/notifier/{id}',
        options: NotifierHandler.deleteNotifiers
    });

    server.route({
        method: 'GET',
        path: '/notifier/{id}',
        options: NotifierHandler.getNotifier
    });

    server.route({
        method: 'PUT',
        path: '/notifier',
        options: NotifierHandler.addNotifier
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
