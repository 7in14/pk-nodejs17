'use strict';
const tt = require('timethat');
const os = require('os');
const MB = 1024 * 1000;
const GB = MB * 1000;

const options = {

    handler(request, h) {

        return getSystemInfo();
    }
};

const getOsInfo = function () {

    // filter out the required OS info
    const cpu = os.cpus();
    const osInfo = {
        totalmem: Math.round(os.totalmem() / GB),
        freemem: Math.round(os.freemem() / GB),
        core: cpu.length,
        model: cpu[0].model,
        speed: cpu[0].speed,
        hostname: os.hostname()
    };

    return osInfo;
}

const getSystemInfo = async function () {
    const sys = {},
        proc = process,
        defaultString = '-';

    // filter out the required process info
    sys.proc = {
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

    sys.proc.memv8 = {
        rss: Math.round(sys.proc.memv8.rss / MB),
        heapUsed: Math.round(sys.proc.memv8.heapUsed / MB),
        heapTotal: Math.round(sys.proc.memv8.heapTotal / MB)
    };

    sys.os = getOsInfo();

    return sys;
};

module.exports = options;
