'use strict';

const Lab = require('lab');
const Code = require('code');
const ApiTestSetup = require('../apiTestSetup');

const lab = exports.lab = Lab.script();
let server;


lab.beforeEach(async () => {

    server = await ApiTestSetup.setupServer();
});


lab.experiment('File route', () => {

    lab.test('it returns readme file', async () => {

        // Arrange
        const request = {
            method: 'GET',
            url: '/api/file'
        };

        // Act
        const response = await server.inject(request);

        // Assert
        Code.expect(response.result.data)
            .to.match(/Sample generated Rest API/);
        Code.expect(response.statusCode)
            .to.equal(200);
    });
});
