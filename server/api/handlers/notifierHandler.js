'use strict';

const dumyNotifiers = [
    {
        id: 1,
        name: 'notifier 1',
        url: 'http://notifier1.com'
    },
    {
        id: 2,
        name: 'notifier 2',
        url: 'http://notifier2.com'
    }
];

const getNotifiers = {

    handler(request, h) {

        return dumyNotifiers;
    }
};

const deleteNotifiers = {

    handler(request, h) {

        let id;
        // todo: add JOI
        try {
            id = parseInt(request.params.id);
        } catch (e) {
            return h.response(`Bad id provided <${request.params.id}>!\n${e}`)
                .code(400);
        }

        console.info(`Trying to delete notifier ${id}`);

        const index = dumyNotifiers.findIndex((n) => n.id === id);

        if (index >= 0) {
            dumyNotifiers.splice(index, 1);
            return h.response(dumyNotifiers)
                .code(202);
        }

        // todo: add Boom
        return h.response(`Could not delete, notifier with id ${id} not found`)
            .code(404);
    }
};

const getNotifier = {

    handler(request, h) {

        let id;
        // todo: add JOI
        try {
            id = parseInt(request.params.id);
        } catch (e) {
            return h.response(`Bad id provided <${request.params.id}>!\n${e}`)
                .code(400);
        }

        console.info(`Trying to get notifier ${id}`);

        const index = dumyNotifiers.findIndex((n) => n.id === id);

        if (index >= 0) {
            return dumyNotifiers[index];
        }

        // todo: add Boom
        return h.response(`Notifier with id ${id} not found`)
            .code(404);
    }
};

const addNotifier = {

    handler(request, h) {

        const notifier = request.payload;
        console.log(notifier);

        console.info(`Trying to add notifier ${notifier}`);

        dumyNotifiers.push(notifier);
        notifier.id = dumyNotifiers.length + 1;

        return h.response(dumyNotifiers)
            .code(201);
    }
};

module.exports = {
    getNotifiers,
    deleteNotifiers,
    getNotifier,
    addNotifier
};
