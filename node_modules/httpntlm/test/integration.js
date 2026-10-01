var httpntlm = require('../httpntlm');
var httpreq = require('httpreq');
var http = require('http');
var https = require('https');
var assert = require('assert');
var express = require('express');
var ntlm = require('express-ntlm');


var server;


describe('Integration tests', () => {

  before(function (done) {
    // Start express.js server
    var app = express();

    app.use(ntlm({
      debug: function() {
        var args = Array.prototype.slice.apply(arguments);
        console.log.apply(null, args);
      },
      domain: 'MYDOMAIN',

      // use different port (default: 389)
      // domaincontroller: 'ldap://myad.example:3899',
    }));

    app.all('*', function(request, response) {
      // console.log('> incoming NTLM request');
      // console.log('> headers:', request.headers);
      // console.log('> ntlm data:', request.ntlm);

      var data = {
        ntlm: request.ntlm,
        headers: request.headers
      }

      response.end(JSON.stringify(data));
    });



    server = app.listen(3000, () => {
      // console.log(`Listening on port 3000`);
      done();
    });
  });

  after(function () {
    // Stop express.js server
    server.close();
  });


  it('simple authorization', (done) => {
    httpntlm.get({
      url: "http://localhost:3000",
      username: 'm$',
      password: 'stinks',
      workstation: 'choose.something',
      domain: 'somedomain'
    }, function (err, res){
      if(err) return done(err);

      // console.log(res.headers);
      var data = JSON.parse(res.body);
      assert.equal(data.ntlm.Authenticated, true);
      done();
    });
  });

  it('reuse keep-alive agent', (done) => {
    var myKeepaliveAgent = new http.Agent({keepAlive: true});

    httpntlm.get({
      url: "http://localhost:3000",
      username: 'm$',
      password: 'stinks',
      workstation: 'choose.something',
      domain: 'somedomain',
      agent: myKeepaliveAgent
    }, function (err, res){
      if(err) return done(err);


      httpntlm.get({
        url: "http://localhost:3000",
        username: 'm$',
        password: 'stinks',
        workstation: 'choose.something',
        domain: 'somedomain',
        agent: myKeepaliveAgent
      }, function (err, res){
        if(err) return done(err);


        var data = JSON.parse(res.body);
        assert.equal(data.ntlm.Authenticated, true);
        done();
      });

    });
  });

  it('custom headers', (done) => {
    httpntlm.get({
      url: "http://localhost:3000/testheaders",
      username: 'm$',
      password: 'stinks',
      workstation: 'choose.something',
      domain: 'somedomain',
      headers: {
        'user-agent': 'my-useragent',
        'Authorization': 'will-be-omitted-by-the-module'
      }
    }, function (err, res){
      if(err) return done(err);

      var data = JSON.parse(res.body);
      assert.equal(data.ntlm.Authenticated, true);
      assert.equal(data.headers['user-agent'], 'my-useragent');
      done();
    });
  });

});

