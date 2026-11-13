import { randomUUID } from 'node:crypto';
import { existsSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';

const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}

const _UNC_REGEX = /^[/\\]{2}/;
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
const normalize = function(path) {
  if (path.length === 0) {
    return ".";
  }
  path = normalizeWindowsPath(path);
  const isUNCPath = path.match(_UNC_REGEX);
  const isPathAbsolute = isAbsolute(path);
  const trailingSeparator = path[path.length - 1] === "/";
  path = normalizeString(path, !isPathAbsolute);
  if (path.length === 0) {
    if (isPathAbsolute) {
      return "/";
    }
    return trailingSeparator ? "./" : ".";
  }
  if (trailingSeparator) {
    path += "/";
  }
  if (_DRIVE_LETTER_RE.test(path)) {
    path += "/";
  }
  if (isUNCPath) {
    if (!isPathAbsolute) {
      return `//./${path}`;
    }
    return `//${path}`;
  }
  return isPathAbsolute && !isAbsolute(path) ? `/${path}` : path;
};
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};

const commands = {
	startV8Coverage,
	takeV8Coverage,
	stopV8Coverage
};
async function startV8Coverage(context) {
	const session = await context.__ensureCDPHandler();
	// Previous test file's modules must be collected, otherwise V8 reuses their compiled code without block coverage
	await session.send("HeapProfiler.collectGarbage");
	await session.send("Profiler.enable");
	await session.send("Profiler.startPreciseCoverage", {
		callCount: true,
		detailed: true
	});
}
async function stopV8Coverage(context) {
	const session = await context.__ensureCDPHandler();
	await session.send("Profiler.stopPreciseCoverage");
	await session.send("Profiler.disable");
}
async function takeV8Coverage(context, pageUrl) {
	const session = await context.__ensureCDPHandler();
	const coverage = await session.send("Profiler.takePreciseCoverage");
	const origin = new URL(pageUrl).origin;
	const result = [];
	for (const entry of coverage.result) {
		if (filterResult(entry.url, origin, pageUrl)) {
			entry.url = decodeURIComponent(entry.url.replace(origin, ""));
			result.push(entry);
		}
	}
	const provider = context.project.vitest.coverageProvider;
	return await writeCoverageFile(provider.coverageFilesDirectory, { result });
}
async function writeCoverageFile(coverageFilesDirectory, coverage) {
	// Write results on file system directly and transfer only the filename over RPC
	const filename = resolve(coverageFilesDirectory, `coverage-${randomUUID()}.json`);
	try {
		await writeFile(filename, JSON.stringify(coverage), "utf-8");
	} catch (error) {
		if (!existsSync(coverageFilesDirectory)) {
			throw new Error(`Something removed the coverage directory "${coverageFilesDirectory}" Vitest created earlier. Make sure you are not running multiple Vitests with the same "coverage.reportsDirectory" at the same time.`, { cause: error });
		}
		throw error;
	}
	return filename;
}
function filterResult(url, origin, pageUrl) {
	if (!url.startsWith(origin)) {
		return false;
	}
	if (url.includes("/node_modules/")) {
		return false;
	}
	if (url.includes("__vitest_browser__")) {
		return false;
	}
	if (url.includes("__vitest__/assets")) {
		return false;
	}
	if (url === pageUrl) {
		return false;
	}
	if (url.includes("/@id/@vitest/")) {
		return false;
	}
	if (url.includes("/@vite/client")) {
		return false;
	}
	return true;
}

export { commands as c, normalize as n, writeCoverageFile as w };
