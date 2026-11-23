# @vitest/istanbul-lib-coverage

[![Build Status](https://img.shields.io/github/actions/workflow/status/vitest-dev/istanbuljs/ci.yml?label=CI&logo=GitHub)](https://github.com/vitest-dev/istanbuljs/actions/workflows/ci.yml)

An API that provides a read-only view of coverage information with the ability
to merge and summarize coverage info.

Supersedes `object-utils` and `collector` from the v0 istanbul API.

See the docs for the full API.

```js
import * as libCoverage from "@vitest/istanbul-lib-coverage";

const map = libCoverage.createCoverageMap(globalCoverageVar);
const summary = libCoverage.createCoverageSummary();

// merge another coverage map into the one we created
map.merge(otherCoverageMap);

// inspect and summarize all file coverage objects in the map
for (const f of map.files()) {
  const fc = map.fileCoverageFor(f);
  summary.merge(fc.toSummary());
}

console.log("Global summary", summary);
```
