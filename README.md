# ui

OpenDota UI: A web interface to OpenDota.

Quickstart
----
* Install Node.js (6.0.0 or greater) (on Ubuntu, `curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash - && sudo apt-get install -y nodejs`)
* `npm install`
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

Workflow
----
* If you're interested in contributing regularly, let us know and we'll add you to the organization.
* Development/pull requests should target the `master` branch.
* The `master` branch is automatically deployed to the stage environment: https://stage.opendota.com
* Admins will periodically drive releases by making a pull request from `master` to `production`.
* The `production` branch is automatically built by Travis CI and pushed to the production repository: `odota.github.io`.
  
Notes
----
* The UI is standalone, so you don't have to set up the entire stack (databases, etc.), or worry about getting starter data.
* By default, the UI points to the production API.
* You can configure it to point to your own backend (if you are working on a new feature and want to start building the UI before it's deployed to production).
* You can also configure the port used by webpack-dev-server in `webpack.config.js`.
* Discord: https://discord.gg/0o5SQGbXuWCNDcaF
  * Strongly recommended for active developers! We move fast and it's helpful to be up to speed with everything that's happening.

Resources
----
* New to React/Redux? Read these articles on React and watch video tutorials by Redux creator Dan Abramov.
  * Thinking in React: https://facebook.github.io/react/docs/thinking-in-react.html
  * Getting started with Redux: https://egghead.io/courses/getting-started-with-redux
  * Idiomatic Redux: https://egghead.io/courses/building-react-applications-with-idiomatic-redux
  * ES6 guide: https://github.com/lukehoban/es6features
