'use strict';

const Lab = require('lab');
const Code = require('code');
const ApiTestSetup = require('../apiTestSetup');

const lab = exports.lab = Lab.script();
let server;


lab.beforeEach(async () => {

    server = await ApiTestSetup.setupServer();
});


lab.experiment('Ping route', () => {

    lab.test('it returns pong for ping route', async () => {

        // Arrange
        const request = {
            method: 'GET',
            url: '/api/ping'
        };

        // Act
        const response = await server.inject(request);

        // Assert
        Code.expect(response.result)
            .to.equal('pong');
        Code.expect(response.statusCode)
            .to.equal(200);
    });
});
