'use strict';
var ansiEscapes = require('ansi-escapes');
var wrapAnsi = require('wrap-ansi');
var cliCursor = require('./cli-cursor');


function isStdStream (stream) {
	return stream === process.stdout || stream === process.stderr;
}

function main (stream) {
	var prevLineCount = 0;
	var context       = { stream, streamWrite: stream.write, enabled: false };

	function overriddenWrite (...args) {
		if (context.enabled && prevLineCount)
			render.clear();

		if (this === process.stderr)
			return context.stderrWrite.apply(this, args);
		else 
			return context.stdoutWrite.apply(this, args); 
	};

	function overrideStdStreams (context) {	
		if (!isStdStream(stream))
			return context;

		if (process.stderr.write !== overriddenWrite) {
			context.stderrWrite  = process.stderr.write;
			process.stderr.write = overriddenWrite;
		}
	
		if (process.stdout.write !== overriddenWrite) {
			context.stdoutWrite  = process.stdout.write;
			process.stdout.write = overriddenWrite;
		}
	
		return context;
	}

	var render = function () {
		cliCursor.hide();

		context.enabled = true;
		  
		var out = [].join.call(arguments, ' ') + '\n';

		out = wrapAnsi(out, process.stdout.columns || 80, {wordWrap: false});

		context.streamWrite.call(stream, ansiEscapes.eraseLines(prevLineCount) + out);
		
		prevLineCount = out.split('\n').length;
	};

	render.clear = function () {
		context.streamWrite.call(stream, ansiEscapes.eraseLines(prevLineCount));

		prevLineCount = 0;
	};

	render.done = function () {
		prevLineCount = 0;

		context.enabled = false;

		cliCursor.show();
	};

	overrideStdStreams(context);

	return render;
}

module.exports = main(process.stdout);
module.exports.stderr = main(process.stderr);
module.exports.create = main;
