import {
  RequestMock,
  RequestLogger,
} from 'testcafe';
import fetch from 'isomorphic-fetch';
import fs from 'fs';
import sanitize from 'sanitize-filename';
import {
  waitForReact,
} from 'testcafe-react-selectors';

export const host = 'http://localhost:5000';

async function fetchFromAPI(requestURL) {
  const response = await fetch(requestURL);
  const jsonData = await response.json();

  console.log(`writing ./testcafe/cachedAjax/${path2file(requestURL)}.json`);
  fs.writeFileSync(`./testcafe/cachedAjax/${path2file(requestURL)}.json`, JSON.stringify(jsonData, null, '\t'), (err) => {
    if (err) {
      console.log(err);
    }
  });
}

const logger = RequestLogger(/api.opendota.com\/api/);

function path2file(url) {
  return sanitize(url.replace('https://api.opendota.com/api/', ''), {
    replacement: '_',
  }).substr(0, 45);
}

export const fixtureBeforeHook = async (ctx) => {
  ctx.requests = [];
};

export const fixtureBeforeEachHook = async () => {
  await waitForReact(180000);
};

export const fixtureAfterHook = async (ctx) => {
  for (const request of logger.requests) {
    if (fs.existsSync(`./testcafe/cachedAjax/${path2file(request.request.url)}.json`)) {
      continue;
    }

    await fetchFromAPI(request.request.url);
    await new Promise(res => setTimeout(res, 3000));
  }
};


const mock = RequestMock()
  .onRequestTo(/api.opendota.com\/api/).respond((req, res) => {
    const data = fs.readFileSync(`./testcafe/cachedAjax/${path2file(req.url)}.json`, 'utf8');

    res.headers['Access-Control-Allow-Origin'] = '*';
    res.statusCode = 200;
    res.setBody(data);
  });

export const fixtureRequestHooks = [logger, mock];
