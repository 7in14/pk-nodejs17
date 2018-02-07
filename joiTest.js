const Hapi = require('hapi');
const Joi = require('joi');
const server = Hapi.server({
    port: 80
});

const startServer = async () => {

    try {
        const server = Hapi.server({
            port: 8083,
            debug: {
                request: '*',
                log: '*'
            }
        });

        server.route({
            method: 'GET',
            path: '/hello/{id}',
            config: {
                handler: (request, h) => 'ok ' + request.params.id,
                validate: {
                    params: {
                        id: Joi.number()
                    },
                    failAction: (request, h, err) => new Error('error: ' + err)
                },
            }
        });

        await server.start();
        console.log(`Started app using env:${process.env.NODE_ENV} on port ${server.info.port}`);

        return server;
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

startServer();
