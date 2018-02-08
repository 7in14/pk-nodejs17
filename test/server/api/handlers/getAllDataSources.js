'use strict';

const Lab = require('lab');
const Code = require('code');
const ApiTestSetup = require('../apiTestSetup');

const lab = exports.lab = Lab.script();
let server;

const mockData = [{
    collection: 'pk_7in14',
    data: [{
            "_id": "5a7891604fc48cd116842dc1",
            "name": "US States",
            "url": "http://services.groupkt.com/state/get/USA/all"
        },
        {
            "_id": "5a7891604fc48cd116842dc1",
            "name": "JSON placeholder",
            "url": "https://jsonplaceholder.typicode.com/users"
        }
    ]
}]

lab.beforeEach(async () => {

    server = await ApiTestSetup.setupServer(mockData);
});


lab.experiment('Get all data sources - /api/dataSources', () => {

    lab.test('it returns all data sources', async () => {

        // Arrange
        const request = {
            method: 'GET',
            url: '/api/dataSources'
        };

        // Act
        const response = await server.inject(request);
        const data = JSON.parse(response.payload);
        console.log(data);

        // Assert
        Code.expect(response.statusCode)
            .to.equal(200);
        Code.expect(data).to.have.length(2);
    });
});
