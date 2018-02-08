'use strict';

const Hapi = require('hapi');
const Config = require('../../../config');
const MongoMock = require('mongo-mock');
const Proxyquire = require('proxyquire');
const MongoPlugin = Proxyquire('hapi-mongodb', {
    'mongodb': MongoMock
});

exports.setupServer = async function (data) {

    if (data) {
        await setupData(data);
    }

    MongoMock.max_delay = 0;
    const plugins = [{
            plugin: require('../../../server/api/index'),
            routes: {
                prefix: '/api'
            }
        },
        {
            plugin: MongoPlugin,
            options: {
                url: Config.get('/mongo/url'),
                decorate: true
            }
        }
    ];
    const server = Hapi.Server({
        port: Config.get('/port/web')
    });
    await server.register(plugins);

    return server;
};

async function setupData(mockData) {

    const connectionString = Config.get('/mongo/url');

    const db = await MongoMock.MongoClient.connect(connectionString);

    console.log(`Connected to mock mongo ${connectionString}`);

    for (let index = 0; index < mockData.length; index++) {
        const col = mockData[index];

        const removeResult = await db.collection(col.collection).remove({});

        const data = await db.collection(col.collection).find({}).toArray();
        console.log(`Drop result ${removeResult.result.n} In collection: ${data}`);

        const result = await db.collection(col.collection).insert(col.data);

        console.log(`Inserted data to mock DB: ${result.result.n}`);
    }
}
