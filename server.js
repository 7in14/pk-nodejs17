'use strict';

const Composer = require('./index');

const startServer = async () => {

    try {
        console.log(`Starting the 7in14 app using env:${process.env.NODE_ENV}...`);
        const server = await Composer();
        await server.start();
        console.log(`Started the 7in14 app using env:${process.env.NODE_ENV} on port ${server.info.port}`);

        return server;
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

startServer();
