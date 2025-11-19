# opendota-web

[![Help Contribute to Open Source](https://www.codetriage.com/odota/web/badges/users.svg)](https://www.codetriage.com/odota/web)

OpenDota Web UI: A web interface for viewing Dota 2 data. This utilizes the [OpenDota API](https://docs.opendota.com), which is also an [open source project](https://github.com/odota/core).

## Quickstart

- Clone the repo using `git clone git@github.com:odota/web.git`
- Install Node.js (v16 or greater) (download [installer](https://nodejs.org/en/download/) or [install via package manager](https://nodejs.org/en/download/package-manager/))
- `npm install`
- `npm start`
- Visit port 5173 on your development machine.

## Contributing

- Make some changes.
- `npm run typecheck` to check your code for typing errors.
- `npm test` to check all app routes for uncaught JavaScript errors.
- Submit a pull request. Wait for review and merge.
- Congratulations! You're a contributor.

## Configuration

- You can set the following environment variables:
  - VITE_API_HOST: Changes the API that the UI requests data from (default https://api.opendota.com)
  - SSL_CRT_FILE/SSL_KEY_FILE: Causes the development server to use HTTPS

## Tech Stack

- View: React/Redux
- CSS: styled-components

## Notes

- You don't have to set up the entire stack (databases, etc.), or worry about getting starter data, since the UI points to the production API.
- Use the configuration to point to your own API (if you are working on a new feature and want to start building the UI before it's deployed to production).
- Discord: https://discord.gg/opendota
  - Strongly recommended for active developers! We move fast and it's helpful to be up to speed with everything that's happening.
- If you're interested in contributing regularly, let us know and we'll add you to the organization.
