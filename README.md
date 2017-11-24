# ui

[![Greenkeeper badge](https://badges.greenkeeper.io/odota/web.svg)](https://greenkeeper.io/)

OpenDota UI: A web interface for viewing Dota 2 data. This utilizes the [OpenDota API](https://docs.opendota.com), which is also an [open source project](https://github.com/odota/core).

Quickstart
----
* Install Node.js (6.0.0 or greater) (on Ubuntu, `curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash - && sudo apt-get install -y nodejs`)
* `npm install`
* `npm start`
* Visit port 3000 on your development machine.
* Make some changes
* `npm run lint` to check your code for linting errors
* Submit a pull request. Wait for review and merge.
* Congratulations! You're a contributor.

Configuration
----
* You can set the following environment variables:
  * PORT: Changes the port that the development server runs on
  * REACT_APP_API_HOST: Changes the API that the UI requests data from (default https://api.opendota.com)

Tech Stack
----
* View: React
* State Management: Redux
* CSS: styled-components

Workflow
----
* If you're interested in contributing regularly, let us know and we'll add you to the organization.
* The `master` branch is automatically deployed to the stage environment: https://stage.opendota.com
* We'll periodically ship releases to production: https://www.opendota.com

Notes
----
* You don't have to set up the entire stack (databases, etc.), or worry about getting starter data, since the UI points to the production API.
* Use the configuration to point to your own API (if you are working on a new feature and want to start building the UI before it's deployed to production).
* Discord: https://discord.gg/0o5SQGbXuWCNDcaF
  * Strongly recommended for active developers! We move fast and it's helpful to be up to speed with everything that's happening.

Resources
----
* New to React/Redux? Read these articles on React and watch video tutorials by Redux creator Dan Abramov.
  * Thinking in React: https://facebook.github.io/react/docs/thinking-in-react.html
  * Getting started with Redux: https://egghead.io/courses/getting-started-with-redux
  * Idiomatic Redux: https://egghead.io/courses/building-react-applications-with-idiomatic-redux
  * ES6 guide: https://github.com/lukehoban/es6features

Testing
----
<img src="/.github/browserstack_logo.png?raw=true" width="350" align="left">

[Browserstack](https://www.browserstack.com/start) have been kind enough to provide us with a free account for Live and Automate. We will be using automate in the future to run automatic end-to-end testing.

BrowserStack is a cloud-based cross-browser testing tool that enables developers to test their websites across various browsers on different operating systems and mobile devices, without requiring users to install virtual machines, devices or emulators.
