'use strict';
const Fs = require('fs');
const Util = require('util');
const Got = require('got');
const DataSourceHandler = require('./dataSourceHandler');

const options = {

    async handler(request, h) {

        const results = await DataSourceHandler.getAll.handler(request, h);

        const promises = results.map((ds) => {

            return getDataPromise(ds.url, ds.name);
        });

        return Promise.all(promises);
    }
};

const getDataPromise = async (url, name) => {

    console.log(`Calling ${name}, using url: ${url}`);
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
                error: (e.response && e.response.body) || e
            };
        });
};

module.exports = options;
