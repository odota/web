FROM node:6.9.0

ENV NPM_CONFIG_LOGLEVEL warn

WORKDIR /usr/src

COPY package.json /usr/src/

RUN npm install

COPY . /usr/src

ENV PATH /usr/src/node_modules/.bin:$PATH

CMD ["npm", "start"]
