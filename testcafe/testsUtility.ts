import { RequestMock, RequestLogger } from 'testcafe';
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { sanitize } from 'sanitize-filename-ts';
import { waitForReact } from 'testcafe-react-selectors';

export const host = 'http://localhost:5000';

async function fetchFromAPI(requestURL: string) {
  const response = await fetch(requestURL);
  const jsonData = await response.json();

  console.log(`writing ./testcafe/cachedAjax/${path2file(requestURL)}.json`);
  writeFileSync(
    `./testcafe/cachedAjax/${path2file(requestURL)}.json`,
    JSON.stringify(jsonData, null, '\t'),
  );
}

const logger = RequestLogger(/api.opendota.com\/api/);

function path2file(url: string) {
  return sanitize(url.replace('https://api.opendota.com/api/', ''), {
    replacement: '_',
  }).substr(0, 45);
}

export const fixtureBeforeHook = async (ctx: any) => {
  ctx.requests = [];
};

export const fixtureBeforeEachHook = async () => {
  await waitForReact(180000);
};

export const fixtureAfterHook = async (ctx: any) => {
  for (const request of logger.requests) {
    if (
      existsSync(
        `./testcafe/cachedAjax/${path2file(request.request.url)}.json`,
      )
    ) {
      continue;
    }

    await fetchFromAPI(request.request.url);
    await new Promise((res) => setTimeout(res, 3000));
  }
};

const mock = RequestMock()
  .onRequestTo(/api.opendota.com\/api/)
  .respond((req, res) => {
    const data = readFileSync(
      `./testcafe/cachedAjax/${path2file(req.url)}.json`,
      'utf8',
    );

    res.headers['Access-Control-Allow-Origin'] = '*';
    res.statusCode = 200;
    res.setBody(data);
  });

export const fixtureRequestHooks = [logger, mock];
