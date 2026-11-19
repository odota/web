# @vitest/istanbul-lib-report

Core reporting utilities and report generators for istanbul. This package contains both the
reporting context (formerly `istanbul-lib-report`) and the built-in reports
(formerly `istanbul-reports`).

## Example usage

```js
import * as libReport from "@vitest/istanbul-lib-report";

// coverageMap, for instance, obtained from @vitest/istanbul-lib-coverage
const coverageMap;

const configWatermarks = {
  statements: [50, 80],
  functions: [50, 80],
  branches: [50, 80],
  lines: [50, 80],
};

// create a context for report generation
const context = libReport.createContext({
  dir: "report/output/dir",
  // The summarizer to default to (may be overridden by some reports)
  // values can be nested/flat/pkg. Defaults to 'pkg'
  defaultSummarizer: "nested",
  watermarks: configWatermarks,
  coverageMap,
});

// create an instance of the relevant report class, passing the
// report name e.g. json/html/html-spa/text
const report = libReport.create("json", {
  skipEmpty: configSkipEmpty,
  skipFull: configSkipFull,
});

// call execute to synchronously create and write the report to disk
report.execute(context);
```

### Custom reporters

`create()` only knows the built-in reporters. To load a custom reporter use `createAsync()`, which accepts a built-in name, a package name, an absolute path or a `file://` URL.
The module's default export (ESM) or `module.exports` (CommonJS) must be the report class:

```js
import { createAsync, ReportBase } from "@vitest/istanbul-lib-report";

// my-report.mjs
export default class MyReport extends ReportBase {
  onStart(root, context) {
    this.writer = context.writer.writeFile("my-report.txt");
  }
  onEnd() {
    this.writer.close();
  }
}

const report = await createAsync("/absolute/path/to/my-report.mjs", {
  summarizer: "nested",
});
report.execute(context);
```
