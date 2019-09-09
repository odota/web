FROM node:8.9.0

ENV NPM_CONFIG_LOGLEVEL warn

WORKDIR /usr/src

CMD ["npm", "run", "start:install"]
