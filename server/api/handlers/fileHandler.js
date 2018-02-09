'use strict';
const Fs = require('fs');
const Util = require('util');

const options = {

    handler(request, h) {

        return Util.promisify(Fs.readFile)('README.md');
    }
};

module.exports = options;
