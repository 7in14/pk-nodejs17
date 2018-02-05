'use strict';

const dummyData = [
    {
        id: '1',
        name: 'notifier 1',
        url: 'http://notifier1.com'
    },
    {
        id: '2',
        name: 'notifier 2',
        url: 'http://notifier2.com'
    }
];

const getAll = {

    handler(request, h) {

        return dummyData;
    }
};

const del = {

    handler(request, h) {

        // todo: add JOI
        const id = parseInt(request.params.id);

        if (!id) {
            return h.response(`Bad id provided <${id}>!`)
                .code(400);
        }

        console.info(`Trying to delete data source ${id}`);

        const index = dummyData.findIndex((n) => n.id === id);

        if (index >= 0) {
            dummyData.splice(index, 1);
            return h.response(dummyData)
                .code(202);
        }

        // todo: add Boom
        return h.response(`Could not delete, data source with id ${id} not found`)
            .code(404);
    }
};

const get = {

    handler(request, h) {

        // todo: add JOI
        const id = parseInt(request.params.id);

        if (!id) {
            return h.response(`Bad id provided <${id}>!`)
                .code(400);
        }

        console.info(`Trying to get data source ${id}`);

        const index = dummyData.findIndex((n) => n.id === id);

        if (index >= 0) {
            return dummyData[index];
        }

        // todo: add Boom
        return h.response(`Data source with id ${id} not found`)
            .code(404);
    }
};

const add = {

    handler(request, h) {

        const dataSource = request.payload;

        console.info(`Trying to add notifier ${dataSource}`);

        dummyData.push(dataSource);
        dataSource.id = (dummyData.length + 1)
            .toString();

        return h.response(dummyData)
            .code(201);
    }
};

module.exports = {
    getAll,
    del,
    get,
    add
};
