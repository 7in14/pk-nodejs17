'use strict';

const Lab = require('lab');
const Code = require('code');
const ApiTestSetup = require('./apiTestSetup');

const lab = exports.lab = Lab.script();
let server;


lab.beforeEach(async () => {

    server = await ApiTestSetup.setupServer();
});


lab.experiment('Index Plugin', () => {

    lab.test('it returns the default message', async () => {

        // Arrange
        const request = {
            method: 'GET',
            url: '/api'
        };

        // Act
        const response = await server.inject(request);

        // Assert
        Code.expect(response.result.message)
            .to.match(/welcome to the 7in14 app/i);
        Code.expect(response.statusCode)
            .to.equal(200);
    });

});
