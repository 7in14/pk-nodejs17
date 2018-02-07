'use strict';

const Lab = require('lab');
const Code = require('code');
const Composer = require('../index');
const MongoMock = require('mongo-mock');
const Proxyquire = require('proxyquire');
const MongoPlugin = Proxyquire('hapi-mongodb', {
    'mongodb': MongoMock
});

const lab = exports.lab = Lab.script();


lab.experiment('App', () => {

    lab.test('it composes a server', {
        plan: 1
    }, async () => {

        // Act
        const composedServer = await Composer();

        // Assert
        Code.expect(composedServer)
            .to.be.an.object();
    });
});
