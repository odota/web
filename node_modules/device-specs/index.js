const emulatedDevices = require('./emulated-devices');
const viewportSizes   = require('./viewport-sizes');

const {
    getDevicesViewportData,
    getViewportSize,
    isValidDeviceName
} = require('./utils');

module.exports = {
    emulatedDevices,
    viewportSizes,
    getDevicesViewportData,
    getViewportSize,
    isValidDeviceName
};
