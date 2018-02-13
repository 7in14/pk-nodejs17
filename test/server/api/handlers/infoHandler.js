'use strict';

const Lab = require('lab');
const Code = require('code');
const ApiTestSetup = require('../apiTestSetup');

const lab = exports.lab = Lab.script();
let server;


lab.beforeEach(async () => {

    server = await ApiTestSetup.setupServer();
});


lab.experiment('Info route /api/info', () => {

    lab.test('it returns environment details', async () => {

        // Arrange
        const request = {
            method: 'GET',
            url: '/api/info'
        };

        // Act
        const response = await server.inject(request);

        // Assert
        Code.expect(response.statusCode)
            .to.equal(200);
    });
});
