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

        const request = {
            method: 'GET',
            url: '/'
        };

        return await server.inject(request, (response) => {

            Code.expect(response.result)
                .to.match(/activate the 7in14 app/i);
            Code.expect(response.statusCode)
                .to.equal(200);

        });
    });
});
