'use strict';

const Lab = require('lab');
const Code = require('code');
const ApiTestSetup = require('../apiTestSetup');

const lab = exports.lab = Lab.script();
let server;

const mockData = [{
    collection: 'pk_7in14',
    data: []
}]

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
        //Code.expect(data.name).to.equal('JSON placeholder');
    });
});
