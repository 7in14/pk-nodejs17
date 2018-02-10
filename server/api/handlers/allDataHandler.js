'use strict';
const Fs = require('fs');
const Util = require('util');
const Got = require('got');

const options = {

    async handler(request, h) {

        const COLLECTION = 'pk_7in14';

        const results = await request.mongo.db.collection(COLLECTION)
            .find({})
            .toArray();

        const promises = results.map((ds) => {

            return getDataPromise(ds.url, ds.name);
        });

        return Promise.all(promises);
    }
};

const getDataPromise = async (url, name) => {

    return Got(url, {
            json: true
        })
        .then((data) => {
            return {
                name,
                data: data.body
            };
        })
        .catch((e) => {
            return {
                name,
                error: e
            };
        });
};

module.exports = options;
