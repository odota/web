'use strict';
var onetime  = require('onetime');
var exitHook = require('async-exit-hook');

module.exports = onetime(function () {
	exitHook(function () {
		process.stderr.write('\u001b[?25h');
	});
});
