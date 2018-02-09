'use strict';
const Fs = require('fs');
const Util = require('util');

const options = {

    async handler(request, h) {

        const data = await Util.promisify(Fs.readFile)('README.md', 'utf8');
        return {
            name: 'README.md',
            data
        };
    }
};

module.exports = options;
