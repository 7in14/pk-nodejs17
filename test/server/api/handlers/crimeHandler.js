'use strict';

const Lab = require('lab');
const Code = require('code');
const ApiTestSetup = require('../apiTestSetup');

const lab = exports.lab = Lab.script();
let server;


lab.beforeEach(async () => {

    server = await ApiTestSetup.setupServer();
});


lab.experiment('Crime route', () => {

    lab.test('it returns 500 when Crime Data API responds with error', async () => {

        const request = {
            method: 'GET',
            url: '/api/file'
        };

        const response = await server.inject(request);

        Code.expect(response.result)
            .to.match(/Sample generated Rest API/);
        Code.expect(response.statusCode)
            .to.equal(200);
    });
});
