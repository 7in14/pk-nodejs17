'use strict';

const Lab = require('lab');
const Code = require('code');
const MongoMock = require('mongo-mock');
const ApiTestSetup = require('../apiTestSetup');

const lab = exports.lab = Lab.script();
let server;

lab.beforeEach(async () => {

    server = await ApiTestSetup.setupServer();
});


lab.experiment('Add data source - /api/datasource', () => {

    lab.test('it adds one data datasource', async () => {

        // Arrange
        const request = {
            method: 'PUT',
            url: '/api/dataSource',
            payload: {
                url: 'https://my-data.com',
                name: 'unit test data'
            }
        };

        // Act
        const response = await server.inject(request);

        // Assert
        Code.expect(response.statusCode)
            .to.equal(201);
    });

    lab.test('it returns HTTP 400 when data not in correct format', async () => {

        // Arrange
        const request = {
            method: 'PUT',
            url: '/api/dataSource',
            payload: {
                url: 'not a URL',
                name: 'unit test data'
            }
        };

        // Act
        const response = await server.inject(request);

        // Assert
        Code.expect(response.statusCode)
            .to.equal(400);
    });
});
