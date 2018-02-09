'use strict';
const Fs = require('fs');
const Util = require('util');

const options = {

    async handler(request, h) {

        const data = await Util.promisify(Fs.readFile)('README.md');
        return {
            name: 'README.md',
            data
        };
    }
};

module.exports = options;
