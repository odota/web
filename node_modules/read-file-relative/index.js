var path     = require('path');
var fs       = require('fs');
var callSite = require('callsite');

function toAbsPath (relativePath) {
    var site = callSite();
    var idx  = 2;

    // NOTE: skip native call sites
    // to support calls from Array
    // proto methods
    while (site[idx].isNative())
        idx++;

    var caller     = site[idx];
    var callerPath = caller.getFileName();
    var basePath   = path.dirname(callerPath);

    return path.join(basePath, relativePath);
}

function readSync (relativePath, binary) {
    var absPath = toAbsPath(relativePath);
    var content = fs.readFileSync(absPath);

    return binary ? content : content.toString();
}

function read (relativePath, options, callback) {
    var absPath = toAbsPath(relativePath);

    if (typeof options === 'function') {
        callback = options;
        options  = null;
    }

    fs.readFile(absPath, options, callback);
}

module.exports = {
    readSync: readSync,
    read:     read,

    // NOTE: we need this wrapper to achieve
    // correct call site in real `toAbsPath()`.
    // It could be done via binary flag, but
    // this approach is not `Array.map`-safe.
    toAbsPath: function (relativePath) {
        return toAbsPath(relativePath);
    }
};
