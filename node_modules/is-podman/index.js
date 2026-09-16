'use strict'
const fs = require('fs')

/**
 * Checks for the presence of `/run/.containerenv`, which is present within Podman containers, but not within Docker containers (which have `/.dockerenv` instead)
 * @returns {boolean} 
 */
const hasContainerEnv = () => {
    try {
        fs.statSync('/run/.containerenv')
        return true
    } catch (_) {
        return false
    }
}

module.exports = () => {
    return hasContainerEnv()
}
