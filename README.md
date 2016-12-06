# ui

OpenDota UI: A web interface to OpenDota.

Quickstart
----
* Install Node.js (6.0.0 or greater) (on Ubuntu, `curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash - && sudo apt-get install -y nodejs`)
* `npm run build`
* `npm start`
* Visit port 8080 on your development machine.
* Make some changes
* `npm run lint` to check your code for linting errors
* Submit a pull request. Wait for review and merge.
* Congratulations! You're a contributor.

Tech Stack
----
* View: React
* State Management: Redux
* CSS: css-modules/postcss

Notes
----
* You can develop the UI independently of the backend.
  * This means you don't have to set up the entire stack (databases, etc.), or worry about getting starter data.
  * By default, the UI points to the production API.
  * You can configure it to point to your own backend (if you are working on a new feature and want to start building the UI before it's deployed to production).
* You can configure the port used by webpack-dev-server in `webpack.config.js`.
* Discord: https://discord.gg/0o5SQGbXuWCNDcaF
  * Strongly recommended for active developers! We move fast and it's helpful to be up to speed with everything that's happening.

Resources
----
* New to React/Redux? Read these articles on React and watch video tutorials by Redux creator Dan Abramov.
  * Thinking in React: https://facebook.github.io/react/docs/thinking-in-react.html
  * Getting started with Redux: https://egghead.io/courses/getting-started-with-redux
  * Idiomatic Redux: https://egghead.io/courses/building-react-applications-with-idiomatic-redux
  * ES6 guide: https://github.com/lukehoban/es6features
