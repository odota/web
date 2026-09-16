var Promise = require('pinkie-promise');

module.exports = function (emitter, event) {
    var listener = null;

    var promise = new Promise(function (resolve, reject) {
        listener = function () {
            var args = null;

            if (arguments.length === 1)
                args = arguments[0];
            else {
                args = [];

                for (var i = 0; i < arguments.length; i++)
                    args.push(arguments[i]);
            }

            event === 'error' ? reject(args) : resolve(args);
        };

        emitter.once(event, listener);
    });

    promise.cancel = function () {
        emitter.removeListener(event, listener);
    };

    return promise;
};
