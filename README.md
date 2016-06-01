# ui
[![Build Status](https://travis-ci.org/yasp-dota/ui.svg?branch=master)](https://travis-ci.org/yasp-dota/ui)

Web UI for YASP.  This is a SPA (single-page application) built with React, Redux, and React-Router.

Quickstart
----
* Install Node.js (on Ubuntu, `curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash - && sudo apt-get install -y nodejs`)
* `npm install`
* `npm start`
* Visit port 8080 on your development machine.  You can configure the port used by webpack-dev-server in `webpack.config.js`.

Notes
----
* For ease of development, the SPA is pointed to production YASP by default.  This means you don't need to set up the entire stack/get sample data.
* You can configure it to point to your own instance (if you are working on a backend feature) in `yasp.config.js`.
