'use strict';

const Lab = require('lab');
const Code = require('code');
const MongoMock = require('mongo-mock');
const ApiTestSetup = require('../apiTestSetup');

const lab = exports.lab = Lab.script();
let server;

const mockData = [{
    collection: 'pk_7in14',
    data: [{
            "_id": MongoMock.ObjectID("5a7891604fc48cd116842dc1"),
            "name": "US States",
            "url": "http://services.groupkt.com/state/get/USA/all"
        },
        {
            "_id": MongoMock.ObjectID("5a7891604fc48cd116842dc2"),
            "name": "JSON placeholder",
            "url": "https://jsonplaceholder.typicode.com/users"
        }
    ]
}];

lab.beforeEach(async () => {

    server = await ApiTestSetup.setupServer(mockData);
});


lab.experiment('Get data source - /api/datasource/[id]', () => {

    lab.test('it returns one data source by id', async () => {

        // Arrange
        const request = {
            method: 'GET',
            url: '/api/dataSource/5a7891604fc48cd116842dc1'
        };

        // Act
        const response = await server.inject(request);

        // Assert
        Code.expect(response.statusCode)
            .to.equal(200);
        Code.expect(response.result.name)
            .to.equal('US States');
    });

    lab.test('it returns HTTP 400 when id not guid', async () => {

        // Arrange
        const request = {
            method: 'GET',
            url: '/api/dataSource/1'
        };

        // Act
        const response = await server.inject(request);

        // Assert
        Code.expect(response.statusCode)
            .to.equal(400);
    });

    lab.test('it returns HTTP 404 when id not found', async () => {

        // Arrange
        const request = {
            method: 'GET',
            url: '/api/dataSource/7b7891604fc48cd116842dc3'
        };

        // Act
        const response = await server.inject(request);

        // Assert
        Code.expect(response.statusCode)
            .to.equal(404);
    });
});
