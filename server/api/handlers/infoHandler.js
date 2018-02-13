'use strict';
var tt = require('timethat');

const options = {

    handler(request, h) {

        return getSystemInfo();
    }
};

const getSystemInfo = async function () {
    var sys = [],
        info,
        proc = process,
        os = require('os'),
        cpu,
        memv8,
        MB = 1024 * 1000,
        GB = MB * 1000,
        defaultString = '-';

    // filter out the required process info
    info = {
        version: proc.version.replace(/^[v|V]/, ""),
        path: proc.env.NODE_PATH || defaultString,
        user: proc.env.USER || defaultString,
        lang: proc.env.LANG || defaultString,
        platform: proc.platform || defaultString,
        uptime: tt.calc(Date.now() - (proc.uptime() * 1000)),
        arch: proc.arch || defaultString,
        pid: proc.pid || defaultString,
        memv8: proc.memoryUsage()
    };

    memv8 = {
        rss: Math.round(info.memv8.rss / MB),
        heapUsed: Math.round(info.memv8.heapUsed / MB),
        heapTotal: Math.round(info.memv8.heapTotal / MB)
    };
    info.memv8 = memv8;

    sys.push({
        proc: info
    });

    // filter out the required OS info
    cpu = os.cpus();
    info = {
        totalmem: Math.round(os.totalmem() / GB),
        freemem: Math.round(os.freemem() / GB),
        core: cpu.length,
        model: cpu[0].model,
        speed: cpu[0].speed,
        hostname: os.hostname()
    };
    sys.push({
        os: info
    });

    return sys;
};

module.exports = options;
