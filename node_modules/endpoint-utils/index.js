var os           = require('os');
var ip           = require('ip');
var Promise      = require('pinkie-promise');
var createServer = require('net').createServer;

function createServerOnFreePort () {
    return new Promise(function (resolve) {
        var server = createServer();

        server.once('listening', function () {
            resolve(server);
        });

        server.listen(0);
    });
}

function closeServers (servers) {
    return Promise.all(servers.map(function (server) {
        return new Promise(function (resolve) {
            server.once('close', resolve);
            server.close();
        });
    }));
}

function checkAvailability (port, hostname) {
    return new Promise(function (resolve) {
        var server = createServer();

        server.once('error', function () {
            resolve(false);
        });

        server.once('listening', function () {
            server.once('close', function () {
                resolve(true);
            });

            server.close();
        });

        server.listen(port, hostname);
    });
}

function isFreePort (port) {
    return checkAvailability(port);
}

function getFreePort () {
    return getFreePorts(1).then(function (ports) {
        return ports[0];
    });
}

function getFreePorts (count) {
    var serverPromises = [];
    var ports          = null;

    // NOTE: Sequentially collect listening
    // servers to avoid interference.
    for (var i = 0; i < count; i++)
        serverPromises.push(createServerOnFreePort());

    return Promise.all(serverPromises)
        .then(function (servers) {
            ports = servers.map(function (server) {
                return server.address().port;
            });

            return servers
        })
        .then(closeServers)
        .then(function () {
            return ports;
        });
}

function isMyHostname (hostname) {
    return getFreePort()
        .then(function (port) {
            return checkAvailability(port, hostname);
        });
}

function getMyHostname () {
    var hostname = os.hostname();

    return isMyHostname(hostname)
        .then(function (mine) {
            if (mine)
                return hostname;

            if (os.platform() === 'mac') {
                hostname += '.local';

                return isMyHostname(hostname)
                    .then(function (mine) {
                        return mine ? hostname : ip.address();
                    });
            }

            return ip.address();
        });
}

function getIPAddress () {
    return ip.address();
}

module.exports = {
    isFreePort:    isFreePort,
    getFreePort:   getFreePort,
    getFreePorts:  getFreePorts,
    isMyHostname:  isMyHostname,
    getMyHostname: getMyHostname,
    getIPAddress:  getIPAddress
};
