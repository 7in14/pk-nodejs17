'use strict';

const Lab = require('lab');
const Code = require('code');
const Nock = require('nock');
const MongoMock = require('mongo-mock');

const ApiTestSetup = require('../apiTestSetup');

const lab = exports.lab = Lab.script();
let server;

const mockData = [{
    collection: 'pk_7in14',
    data: [{
            "_id": MongoMock.ObjectID("5a7891604fc48cd116842dc1"),
            "name": "service1",
            "url": "http://dummy-service1/ok"
        },
        {
            "_id": MongoMock.ObjectID("5a7891604fc48cd116842dc2"),
            "name": "service2",
            "url": "https://dummy-service2/error"
        }
    ]
}];

lab.beforeEach(async () => {

    server = await ApiTestSetup.setupServer(mockData);
});


lab.experiment('All data handler - /api/allData', () => {

    lab.test('it gets data from multipme sources', async () => {

        // Arrange
        const request = {
            method: 'GET',
            url: '/api/allData'
        };
        var dummyService1 = Nock('http://dummy-service1')
            .get('/ok')
            .reply({
                data: "ok"
            });
        var dummyService2 = Nock('https://dummy-service2')
            .get('/error')
            .reply(500, 'service down');
        const expected = [{
                name: 'service1',
                data: ''
            },
            {
                name: 'service2',
                error: 'service down'
            }];

        // Act
        const response = await server.inject(request);

        // Assert
        Code.expect(response.statusCode)
            .to.equal(200);
        Code.expect(dummyService1.isDone())
            .to.be.true();
        Code.expect(dummyService2.isDone())
            .to.be.true();
        Code.expect(response.result)
            .to.equal(expected);
    });

});
