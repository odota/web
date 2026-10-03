/**
 * Copyright (c) 2013 Sam Decrock https://github.com/SamDecrock/
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var url = require('url');
var httpreq = require('httpreq');
var ntlm = require('./ntlm');
var _ = require('underscore');
var http = require('http');
var https = require('https');

exports.method = function(method, options, finalCallback){
	if(!options.workstation) options.workstation = '';
	if(!options.domain) options.domain = '';

	// extract non-ntlm-options:
	var httpreqOptions = _.omit(options, 'url', 'username', 'password', 'workstation', 'domain');

	// is https?
	var isHttps = false;
	var reqUrl = url.parse(options.url);
	if(reqUrl.protocol == 'https:') isHttps = true;

	// set keepaliveAgent (http or https):
	var keepaliveAgent;

	if(options.agent) {
		keepaliveAgent = options.agent;
	}else{
		if(isHttps){
			keepaliveAgent = new https.Agent({keepAlive: true});
		}else{
			keepaliveAgent = new http.Agent({keepAlive: true});
		}
	}

	// build type1 request:

	function sendType1Message (callback) {
		var type1msg = ntlm.createType1Message(options);

		var type1options = {
			headers:{
				'Connection' : 'keep-alive',
				'Authorization': type1msg
			},
			timeout: options.timeout || 0,
			agent: keepaliveAgent,
			allowRedirects: false // don't redirect in httpreq, because http could change to https which means we need to change the keepaliveAgent
		};

		// pass along other options:
		type1options = _.extend({}, _.omit(httpreqOptions, 'headers', 'body'), type1options);
		// do not pass headers here, only in the last call, the headers can be consumed serverside

		// send type1 message to server:
		httpreq[method](options.url, type1options, callback);
	}

	function sendType3Message (res, callback) {
		// catch redirect here:
		if(res.headers.location) {
			options.url = res.headers.location;
			return exports[method](options, finalCallback);
		}


		if(!res.headers['www-authenticate'])
			return callback(new Error('www-authenticate not found on response of second request'));

		// parse type2 message from server:
		var type2msg = ntlm.parseType2Message(res.headers['www-authenticate'], callback); //callback only happens on errors
		if(!type2msg) return; // if callback returned an error, the parse-function returns with null

		// create type3 message:
		var type3msg = ntlm.createType3Message(type2msg, options);

		// build type3 request:
		var type3options = {
			headers: {
				'Connection': 'Close',
				'Authorization': type3msg
			},
			allowRedirects: false,
			agent: keepaliveAgent
		};

		// pass along other options:
		type3options = _.extend(type3options, _.omit(httpreqOptions, 'headers'));

		// pass all headers except Authorization & Connection as the NTLM protocol uses this:
		if(httpreqOptions.headers) type3options.headers = _.extend(type3options.headers, _.omit(httpreqOptions.headers, 'Connection', 'Authorization'));

		// send type3 message to server:
		httpreq[method](options.url, type3options, callback);
	}


	sendType1Message(function (err, res) {
		if(err) return finalCallback(err);
		setImmediate(function () { // doesn't work without setImmediate()
			sendType3Message(res, finalCallback);
		});
	});

};

['get', 'put', 'patch', 'post', 'delete', 'options'].forEach(function(method){
	exports[method] = exports.method.bind(exports, method);
});

exports.ntlm = ntlm; //if you want to use the NTML functions yourself

