'use strict';
const DataSourceIdValidator = require('../validators/dataSourceIdValidator');
const DataSourceValidator = require('../validators/dataSourceValidator');

const COLLECTION = 'pk_7in14';

const getAll = {

    async handler(request, h) {

        const result = await request.mongo.db.collection(COLLECTION)
            .find({})
            .toArray();

        return result;
    }
};

const del = {

    async handler(request, h) {

        const id = request.params.id;
        console.info(`Trying to delete data source ${id}`);

        const result = await request.mongo.db.collection(COLLECTION)
            .remove({
                _id: new request.mongo.ObjectID(id)
            });

        if (result && result.result.n === 1 && result.result.ok === 1) {

            const all = await getAll.handler(request);
            return h.response(all)
                .code(202);
        }

        // todo: add Boom
        return h.response(`Could not delete, data source with id ${id} not found`)
            .code(404);
    },

    validate: DataSourceIdValidator.validate
};

const get = {

    async handler(request, h) {

        const id = request.params.id;
        console.info(`Trying to get data source ${id}`);

        const result = await request.mongo.db.collection(COLLECTION)
            .findOne({
                _id: new request.mongo.ObjectID(id)
            });

        if (result) {
            return result;
        }

        // todo: add Boom
        return h.response(`Data source with id ${id} not found`)
            .code(404);
    },

    validate: DataSourceIdValidator.validate
};

const add = {

    async handler(request, h) {

        const dataSource = request.payload;

        console.info(`Trying to add notifier ${JSON.stringify(dataSource)}`);

        const insertResult = await request.mongo.db.collection(COLLECTION)
            .insert(dataSource);

        const result = await getAll.handler(request);

        return h.response(result)
            .code(201);
    },

    validate: DataSourceValidator.validate
};

module.exports = {
    getAll,
    del,
    get,
    add
};
