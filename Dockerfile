FROM node:16

ENV NPM_CONFIG_LOGLEVEL warn

WORKDIR /usr/src

CMD ["npm", "run", "start:install"]
