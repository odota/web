const fs       = require('fs');
const { join } = require('path');

const VIEWPORT_SIZES_PATH = join(__dirname, 'viewport-sizes.json');
const VIEWPORT_DATA       = JSON.parse(fs.readFileSync(VIEWPORT_SIZES_PATH));

/** Gets the name and the viewport size of mobile devices
 * @function
 * @name getDevicesViewportData
 * @returns {ViewportData} A JSON Object that contains device names and viewport sizes.
 */
function getDevicesViewportData () {
    return VIEWPORT_DATA;
}

/** @typedef {Object} DeviceViewportSize
 * @description Defines the size of a device viewport.
 * @property {number} portraitWidth - The viewport width in portrait orientation.
 * @property {number} landscapeWidth - The viewport width in landscape orientation.
 */

/** Gets the viewport size for the specified device.
 * @function
 * @name getViewportSize
 * @param {string} deviceName - Specifies the name of the target device. Use values from the Device Name column of [this table]{@link http://viewportsizes.com/}.
 * @returns {DeviceViewportSize} The size of the device viewport.
 */
function getViewportSize (deviceName) {
    deviceName = deviceName.toLowerCase().replace(/\s+/g, '');

    return getDevicesViewportData()[deviceName];
}

/**
 * Checks if the provided string is a valid device name contained in the screen size database.
 * @function
 * @name isValidDeviceName
 * @param {string} inputString - The string to be validated.
 * @returns {boolean} `true` if the specified string is a valid device name.
 */
function isValidDeviceName (inputString) {
    return !!getViewportSize(inputString);
}

module.exports = {
    getDevicesViewportData,
    getViewportSize,
    isValidDeviceName
};
