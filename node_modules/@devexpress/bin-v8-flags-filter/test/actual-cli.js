var gracefulShutdown = process.argv.indexOf('--graceful-shutdown') > -1;

if (gracefulShutdown) {
    process.on('message', function (message) {
        if (message === 'shutdown') {
            console.log('$$$SHUTDOWN MESSAGE RECEIVED$$$');

            setTimeout(function () {
                process.exit(0);
            }, 0);
        }
    });
}

console.log('$$$ARGS:' + JSON.stringify(process.argv.slice(2)) + '$$$');
console.log('$$$ISSMI:' + %_IsSmi(1) + '$$$');
