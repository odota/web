var execFile = require('child_process').execFile;
var spawn    = require('child_process').spawn;
var assert   = require('assert');
var path     = require('path');

it('Should filter v8 flags', function (done) {
    var args = [
        path.join(__dirname, './cli.js'),
        '--hey',
        '--allow-natives-syntax',
        '-t=yo',
        '--trace-gc'
    ];

    execFile(process.execPath, args, function (err, stdout) {
        assert.ok(stdout.indexOf('$$$ARGS:["--hey","-t=yo"]$$$') > -1);
        assert.ok(stdout.indexOf('$$$ISSMI:true$$$') > -1);

        done();
    });
});

it('Should use ignore option to not filter some v8 flags', function (done) {
    var args = [
        path.join(__dirname, './cli.js'),
        '--hey',
        '--allow-natives-syntax',
        '-t=yo',
        '--trace-gc',
        '--ignore-trace-gc'
    ];

    execFile(process.execPath, args, function (err, stdout) {
        assert.ok(stdout.indexOf('$$$ARGS:["--hey","-t=yo","--trace-gc","--ignore-trace-gc"]$$$') > -1);
        assert.ok(stdout.indexOf('$$$ISSMI:true$$$') > -1);

        done();
    });
});

it('Should use shutdown message', function (done) {
    var args = [
        path.join(__dirname, './cli.js'),
        '--hey',
        '--allow-natives-syntax',
        '-t=yo',
        '--trace-gc',
        '--graceful-shutdown'
    ];

    var output     = '';
    var cliProcess = spawn(process.execPath, args, { stdio: [ 'pipe', 'pipe', 'pipe', 'ipc' ] });

    cliProcess.stdout.on('data', function (data) {
        output += data.toString();
    });

    cliProcess.on('exit', function () {
        assert.ok(output.indexOf('$$$ARGS:["--hey","-t=yo","--graceful-shutdown"]$$$') > -1);
        assert.ok(output.indexOf('$$$ISSMI:true$$$') > -1);
        assert.ok(output.indexOf('$$$SHUTDOWN MESSAGE RECEIVED$$$') > -1);

        done();
    });

    cliProcess.send('shutdown');
});

it('[Regression] Should not abort if using shutdown message and no parent IPC was established', function (done) {
    var args = [
        path.join(__dirname, './cli.js'),
        '--hey',
        '--allow-natives-syntax',
        '-t=yo',
        '--trace-gc',
        '--no-ipc-test'
    ];

    var output     = '';
    var cliProcess = spawn(process.execPath, args, { stdio: 'pipe' });

    cliProcess.stdout.on('data', function (data) {
        output += data.toString();
    });

    cliProcess.on('exit', function (code) {
        assert.equal(code, 0);
        assert.ok(output.indexOf('$$$ARGS:["--hey","-t=yo","--no-ipc-test"]$$$') > -1);
        assert.ok(output.indexOf('$$$ISSMI:true$$$') > -1);

        done();
    });
});
