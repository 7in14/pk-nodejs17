'use strict';

const Lab = require('lab');
const Code = require('code');
const Nock = require('nock');
const ApiTestSetup = require('../apiTestSetup');

const lab = exports.lab = Lab.script();
let server;


lab.beforeEach(async () => {

    server = await ApiTestSetup.setupServer();
});

const crimeData = [{
    "district": "SOUTHEAST",
    "inc_datetime": "2018-02-02T00:00:00.000",
    "inc_no": "P18005857",
    "lcr": "71A",
    "lcr_desc": "Traffic/DWI (Driving While Impaired)",
    "location": {
        "type": "Point",
        "coordinates": [-78.551901663482, 35.760454956736]
    }
}, {
    "district": "SOUTHEAST",
    "inc_datetime": "2018-02-02T00:39:00.000",
    "inc_no": "P18005860",
    "lcr": "54D",
    "lcr_desc": "Drug Violation/Misdemeanor",
    "location": {
        "type": "Point",
        "coordinates": [-78.544612050741, 35.757214096643]
    }
}];

lab.experiment('Crime route', () => {

    lab.test('it returns 500 when Crime Data API responds with error', async () => {

        // Arrange
        var crimeApi = Nock('https://data.raleighnc.gov')
            .get('/resource/3bhm-we7a.json')
            .reply(500, 'Some error');
        const request = {
            method: 'GET',
            url: '/api/raleigh/crime'
        };

        // Act
        const response = await server.inject(request);

        // Assert
        Code.expect(response.result)
            .to.match(/Some error/);
        Code.expect(response.statusCode)
            .to.equal(500);
        Code.expect(crimeApi.isDone())
            .to.be.true();
    });

    lab.test('it returns 200 and all results when no query param', async () => {

        // Arrange
        var crimeApi = Nock('https://data.raleighnc.gov')
            .get('/resource/3bhm-we7a.json')
            .reply(200, crimeData);
        const request = {
            method: 'GET',
            url: '/api/raleigh/crime'
        };

        // Act
        const response = await server.inject(request);

        // Assert
        Code.expect(response.result)
            .to.equal(crimeData);
        Code.expect(response.statusCode)
            .to.equal(200);
        Code.expect(crimeApi.isDone())
            .to.be.true();
    });

    lab.test('it returns 200 and all filtered results when query provided', async () => {

        // Arrange
        var crimeApi = Nock('https://data.raleighnc.gov')
            .get('/resource/3bhm-we7a.json')
            .reply(200, crimeData);
        const request = {
            method: 'GET',
            url: '/api/raleigh/crime?query=Drug'
        };

        // Act
        const response = await server.inject(request);

        // Assert
        Code.expect(response.result)
            .to.have.length(1);
        Code.expect(response.result[0].inc_no)
            .to.equal('P18005860');
        Code.expect(response.statusCode)
            .to.equal(200);
        Code.expect(crimeApi.isDone())
            .to.be.true();
    });
});
