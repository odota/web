var execSync = require('child_process').execSync;
var isLinux  = require('os-family').linux;


var LIBC_TYPE = {
    glibc:   'glibc',
    musl:    'musl',
    unknown: 'unknown'
};

var bits = process.arch === 'x64' ? 64 : 32;

function getLddOutput () {
    try {
        return execSync('ldd --version', { stdio: 'pipe' }).toString().split('\n');
    }
    catch (e) {
        var output = e.message.split('\n');

        output.shift();

        return output;
    }
}

function getLibCType () {
    var lddOutput = getLddOutput();

    if (/glibc|gnu\s*libc/i.test(lddOutput[0]))
        return LIBC_TYPE.glibc;
    else if (/musl/i.test(lddOutput[0]))
        return LIBC_TYPE.musl;

    return LIBC_TYPE.unknown;
}

var libcType = isLinux ? getLibCType() : LIBC_TYPE.unknown;


exports.LIBC_TYPE = LIBC_TYPE;
exports.bits      = bits;
exports.libcType  = libcType;
exports.platform  = libcType + '-' + bits;
