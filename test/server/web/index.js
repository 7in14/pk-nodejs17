'use strict';

const Lab = require('lab');
const Code = require('code');
const Config = require('../../../config');
const Hapi = require('hapi');

const lab = exports.lab = Lab.script();
let server;


lab.beforeEach(() => {

    const plugins = [require('vision'), require('../../../server/web/index')];
    server = Hapi.Server({
        port: Config.get('/port/web')
    });
    return server.register(plugins);
});


lab.experiment('Home Page View', () => {

    lab.test('home page renders properly', async () => {

        // Arrange
        const request = {
            method: 'GET',
            url: '/'
        };

        // Act
        const response = await server.inject(request);

        // Assert
        Code.expect(response.result)
            .to.match(/7in14 - Node.js/i);
        Code.expect(response.statusCode)
            .to.equal(200);
    });
});
