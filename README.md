# ui
[![Build Status](https://travis-ci.org/yasp-dota/ui.svg?branch=master)](https://travis-ci.org/yasp-dota/ui)

Web UI for YASP.  This is a SPA (single-page application) built with React, Redux, and React-Router.

Quickstart
----
* Install Node.js (6.0.0 or greater) (on Ubuntu, `curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash - && sudo apt-get install -y nodejs`)
* `npm install`
* `npm start`
* Visit port 8080 on your development machine.  You can configure the port used by webpack-dev-server in `webpack.config.js`.
* Ready to make a pull request? Run `npm run build` to make sure the build runs and there are no linting errors.

Tech Stack
----
* View layer: React
* State management: Redux
* CSS: css-modules & postcss

Notes
----
* UI is now in its own repository (this one).
  * Should improve build time on both this and yasp core
  * All you need is Node to get started
* You can develop the UI against production yasp API.  This is on by default, and means you don't have to set up the entire stack.
  * You can configure it to point to your own instance (if you are working on a backend feature) in `yasp.config.js`.
* Swagger spec for YASP API: http://swagger.yasp.co/
  * You can refer to `routes/api.js` in yasp core for the canonical state of the API
* Current state of master gets built by Travis and pushed to production.
  * When we are ready to switch we'll probably route www.yasp.co to the UI
  * yasp.co will continue to host the API
* Discord: https://discord.gg/0o5SQGbXuWCNDcaF
  * Strongly recommended to join for active developers, you can get help rapidly and coordinate with others.

Development Guides
----
* New to React/Redux? Read these articles on React and watch these egghead series by Redux creator Dan Abramov.
  * Thinking in React: https://facebook.github.io/react/docs/thinking-in-react.html
  * Getting started with Redux: https://egghead.io/courses/getting-started-with-redux
  * Idiomatic Redux: https://egghead.io/courses/building-react-applications-with-idiomatic-redux
  * ES6 guide: https://github.com/lukehoban/es6features
  * Adding new components with Redux: https://github.com/yasp-dota/ui/wiki/Adding-new-components-with-redux
