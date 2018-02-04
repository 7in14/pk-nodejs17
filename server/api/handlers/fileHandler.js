'use strict';
const Fs = require('fs');
const Util = require('util');
const Path = require('path');

const options = {

    handler(request, h) {

        const filePath = Path.join(__dirname, '../../../README.MD');
        return Util.promisify(Fs.readFile)(filePath);
    }
};

module.exports = options;
