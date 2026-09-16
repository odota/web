var os = require('os');

var platform = os.platform();

module.exports = {
    win:   platform.match(/^win/),
    linux: platform === 'linux',
    mac:   platform === 'darwin',
    bsd:   platform.match(/bsd$/)
};
