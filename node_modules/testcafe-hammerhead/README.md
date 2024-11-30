# testcafe-hammerhead
`testcafe-hammerhead` is a powerful Web proxy used as a core for the [TestCafe](https://github.com/devexpress/testcafe) testing framework.

## Core Concepts

`testcafe-hammerhead` is a URL-rewriting proxy. This means that it rewrites all properties of the appropriate JavaScript objects that contain a URL value (`Location`, `HTMLLinkElement.href`, etc). You can see it if you open a proxied page, invoke the browser's DevTools and inspect any element.

In addition, the proxied web page does not know that it is opened under a proxy. The proxy intercepts access attempts to all URL-containing properties and provides the original values.

## First Look
1. Clone the Hammerhead repository
    ```cmd
    git clone https://github.com/DevExpress/testcafe-hammerhead.git
    ```
1. Go to the `testcafe-hammerhead` folder
    ```cmd
    cd testcafe-hammerhead
    ```
1. Install the dependencies
    ```cmd
    npm install
    ```
1. Run the [Hammerhead playground](https://github.com/DevExpress/testcafe-hammerhead/blob/master/test/playground/server.js) to see our proxy in action
    ```cmd
    node node_modules/gulp/bin/gulp http-playground
    ```

This opens a playground page where you can specify a webpage to proxy. Enter the page URL and hit **Proxy!**.

## Features

* HTTP/HTTPS requests
* WebSockets, EventSource
* file upload
* request events (`onRequest`, `onResponse`)
* bypassing requests
* custom UI on a web page

##  Reporting Issues and Contributing

Read our [Contributing Guide](https://github.com/DevExpress/testcafe-hammerhead/blob/master/CONTRIBUTING.md) to learn how to contribute to the project.

[![Build Status](https://img.shields.io/github/checks-status/DevExpress/testcafe-hammerhead/master?label=Tests)](https://github.com/DevExpress/testcafe-hammerhead/commits/master)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/testcafebot.svg)](https://saucelabs.com/u/testcafebot)

[![Health Monitor](http://66.55.147.18:13500/badge/last-commit.svg)](http://66.55.147.18:13500/)
