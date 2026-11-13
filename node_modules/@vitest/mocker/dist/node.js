import { a as cleanUrl, c as createManualModuleSource } from './chunk-utils.js';
import { a as automockModule, e as esmWalker, b as init, p as parse } from './chunk-automock.js';
import MagicString from 'magic-string';
import { createFilter, isFileLoadingAllowed } from 'vite';
import { h as hoistMocks } from './chunk-hoistMocks.js';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path/posix';
import { s as slash } from './chunk-helpers.js';
import { M as MockerRegistry, a as ManualMockedModule } from './chunk-registry.js';
import { fileURLToPath } from 'node:url';
import { existsSync, readFileSync } from 'node:fs';
import { findMockRedirect } from './redirect.js';
import { i as isAbsolute, j as join$1, r as resolve, d as dirname } from './chunk-pathe.M-eThtNZ.js';
import 'estree-walker';
import 'node:module';
import 'node:path';
import '@jridgewell/trace-mapping';

function automockPlugin(options = {}) {
	return {
		name: "vitest:automock",
		enforce: "post",
		transform(code, id) {
			if (id.includes("mock=automock") || id.includes("mock=autospy")) {
				const mockType = id.includes("mock=automock") ? "automock" : "autospy";
				const ms = automockModule(code, mockType, this.parse, options);
				return {
					code: ms.toString(),
					map: ms.generateMap({
						hires: "boundary",
						source: cleanUrl(id)
					})
				};
			}
		}
	};
}

const regexDynamicImport = /import\s*\(/;
function dynamicImportPlugin(options = {}) {
	return {
		name: "vitest:browser:esm-injector",
		enforce: "post",
		transform: {
			order: "post",
			handler(source, id) {
				// TODO: test is not called for static imports
				if (!regexDynamicImport.test(source)) {
					return;
				}
				if (options.filter && !options.filter(id, this.environment)) {
					return;
				}
				return injectDynamicImport(source, id, this.parse, options);
			}
		}
	};
}
function injectDynamicImport(code, id, parse, options = {}) {
	if (code.includes("wrapDynamicImport")) {
		return;
	}
	const s = new MagicString(code);
	let ast;
	try {
		ast = parse(code);
	} catch (err) {
		console.error(`Cannot parse ${id}:\n${err.message}`);
		return;
	}
	// 3. convert references to import bindings & import.meta references
	esmWalker(ast, {
		// TODO: make env updatable
		onImportMeta() {
			// s.update(node.start, node.end, viImportMetaKey)
		},
		onDynamicImport(node) {
			const globalThisAccessor = options.globalThisAccessor || "\"__vitest_mocker__\"";
			const replaceString = `globalThis[${globalThisAccessor}].wrapDynamicImport(async () => import(`;
			const importSubstring = code.substring(node.start, node.end);
			const hasIgnore = importSubstring.includes("/* @vite-ignore */");
			s.overwrite(node.start, node.source.start, replaceString + (hasIgnore ? "/* @vite-ignore */ " : ""));
			s.overwrite(node.end - 1, node.end, "))");
		}
	});
	return {
		code: s.toString(),
		map: s.generateMap({
			hires: "boundary",
			source: id
		})
	};
}

function hoistMocksPlugin(options = {}) {
	const filter = options.filter || createFilter(options.include, options.exclude);
	const { hoistableMockMethodNames = ["mock", "unmock"], dynamicImportMockMethodNames = [
		"mock",
		"unmock",
		"doMock",
		"doUnmock"
	], hoistedMethodNames = ["hoisted"], utilsObjectNames = ["vi", "vitest"] } = options;
	const methods = new Set([
		...hoistableMockMethodNames,
		...hoistedMethodNames,
		...dynamicImportMockMethodNames,
		"importActual"
	]);
	const regexpHoistable = new RegExp(`\\b(?:${utilsObjectNames.join("|")})\\s*\\.\\s*(?:${Array.from(methods).join("|")})\\s*\\(`);
	let root;
	return {
		name: "vitest:mocks",
		enforce: "post",
		configResolved(config) {
			root = config.root;
		},
		transform(code, id) {
			if (!filter(id)) {
				return;
			}
			const staticMocks = [];
			const s = hoistMocks(code, id, this.parse, {
				regexpHoistable,
				hoistableMockMethodNames,
				hoistedMethodNames,
				utilsObjectNames,
				dynamicImportMockMethodNames,
				root,
				getMap: () => this.getCombinedSourcemap(),
				...options,
				onStaticMock(call) {
					staticMocks.push(call);
					options.onStaticMock?.(call);
				}
			});
			// vite keeps `meta` across re-transforms, so always reset it
			if (!s) {
				return { meta: { vitestStaticMocks: staticMocks.length ? staticMocks : null } };
			}
			return {
				code: s.toString(),
				map: s.generateMap({
					hires: "boundary",
					source: cleanUrl(id)
				}),
				meta: { vitestStaticMocks: staticMocks }
			};
		}
	};
}
// to keeb backwards compat
function hoistMockAndResolve(code, id, parse, options = {}) {
	const s = hoistMocks(code, id, parse, options);
	if (s) {
		return {
			code: s.toString(),
			map: s.generateMap({
				hires: "boundary",
				source: cleanUrl(id)
			})
		};
	}
}

function interceptorPlugin(options = {}) {
	const registry = options.registry || new MockerRegistry();
	const plugin = {
		name: "vitest:mocks:interceptor",
		enforce: "pre",
		load: {
			order: "pre",
			async handler(id) {
				const mock = registry.getById(id);
				if (!mock) {
					return;
				}
				if (mock.type === "manual") {
					const exports = Object.keys(await mock.resolve());
					const accessor = options.globalThisAccessor || "\"__vitest_mocker__\"";
					return createManualModuleSource(mock.url, exports, accessor);
				}
				if (mock.type === "redirect") {
					return readFile(mock.redirect, "utf-8");
				}
			}
		},
		transform: {
			order: "post",
			handler(code, id) {
				const mock = registry.getById(id);
				if (!mock) {
					return;
				}
				if (mock.type === "automock" || mock.type === "autospy") {
					const m = automockModule(code, mock.type, this.parse, { globalThisAccessor: options.globalThisAccessor });
					return {
						code: m.toString(),
						map: m.generateMap({
							hires: "boundary",
							source: cleanUrl(id)
						})
					};
				}
			}
		}
	};
	if (options.registerWebSocketEvents !== false) {
		plugin.configureServer = (server) => {
			server.ws.on("vitest:interceptor:register", (event) => {
				if (event.type === "manual") {
					const module = ManualMockedModule.fromJSON(event, async () => {
						const keys = await getFactoryExports(event.url);
						return Object.fromEntries(keys.map((key) => [key, null]));
					});
					registry.add(module);
				} else {
					if (event.type === "redirect") {
						const redirectUrl = new URL(event.redirect);
						const redirect = join(server.config.root, slash(redirectUrl.pathname));
						// the redirect is served through the `load` hook below, so it must
						// stay inside the file-serving allowlist and never escape the root
						if (!isFileLoadingAllowed(server.config, redirect)) {
							server.ws.send("vitest:interceptor:register:result");
							return;
						}
						event.redirect = redirect;
					}
					registry.register(event);
				}
				server.ws.send("vitest:interceptor:register:result");
			});
			server.ws.on("vitest:interceptor:delete", (id) => {
				registry.delete(id);
				server.ws.send("vitest:interceptor:delete:result");
			});
			server.ws.on("vitest:interceptor:invalidate", () => {
				registry.clear();
				server.ws.send("vitest:interceptor:invalidate:result");
			});
			function getFactoryExports(url) {
				server.ws.send("vitest:interceptor:resolve", url);
				let timeout;
				return new Promise((resolve, reject) => {
					timeout = setTimeout(() => {
						reject(new Error(`Timeout while waiting for factory exports of ${url}`));
					}, 1e4);
					server.ws.on("vitest:interceptor:resolved", ({ url: resolvedUrl, keys }) => {
						if (resolvedUrl === url) {
							clearTimeout(timeout);
							resolve(keys);
						}
					});
				});
			}
		};
	}
	return plugin;
}

const PREFIX = "\0vitest-mock:";
// the shim id carries the registry url and the module id, but not the module
// path, so plugins that guard the original by its path never see the shim
function getManualMockId(url, moduleId) {
	const encoded = Buffer.from(JSON.stringify({
		url,
		id: moduleId
	})).toString("base64url");
	return `${PREFIX}${encoded}`;
}
function getManualMockUrl(url, moduleId) {
	return `/@id/__x00__${getManualMockId(url, moduleId).slice(1)}`;
}
// serves the shim of a factory mock: a module that exports every name of the
// original and reads the values from the factory when it evaluates
function manualMockPlugin(options = {}) {
	return {
		name: "vitest:manual-mock",
		enforce: "pre",
		resolveId(id) {
			if (id.startsWith(PREFIX)) {
				return id;
			}
		},
		load: {
			order: "pre",
			async handler(id) {
				if (!id.startsWith(PREFIX) || this.environment.mode !== "dev") {
					return;
				}
				const { url, moduleId } = parseManualMockId(id);
				let exports;
				try {
					exports = await collectEnvironmentExports(this.environment, moduleId);
				} catch (error) {
					// the original cannot be transformed, so the factory result decides
					if (!options.resolveFactoryExports) {
						throw error;
					}
					exports = await options.resolveFactoryExports(url);
				}
				return createManualModuleSource(url, exports, options.globalThisAccessor, "resolveFactoryModule");
			}
		}
	};
}
function parseManualMockId(id) {
	const encoded = id.slice(PREFIX.length);
	const { url, id: moduleId } = JSON.parse(Buffer.from(encoded, "base64url").toString());
	return {
		url,
		moduleId
	};
}
function collectEnvironmentExports(environment, moduleId, seen = new Set()) {
	return collectExports(environment, moduleId, seen);
}
// import analysis rewrites re-export sources into browser urls, which
// `transformRequest` does not accept for virtual ids
function unwrapId(url) {
	return url.startsWith("/@id/") ? url.slice(5).replace("__x00__", "\0") : url;
}
async function collectExports(environment, moduleId, seen) {
	if (seen.has(moduleId)) {
		return [];
	}
	seen.add(moduleId);
	let result;
	try {
		result = await environment.transformRequest(moduleId);
	} catch (cause) {
		throw new Error(`[vitest] Cannot collect the exports of "${moduleId}" for its factory mock: ${cause.message}`, { cause });
	}
	if (!result) {
		throw new Error(`[vitest] Cannot collect the exports of "${moduleId}" for its factory mock`);
	}
	await init;
	const [imports, exports] = parse(result.code, moduleId);
	const reexports = imports.filter(({ ss, se, n }) => {
		const statement = result.code.slice(ss, se).replace(/\s+/g, " ");
		return n && statement.startsWith("export *") && !statement.startsWith("export * as");
	});
	const names = await Promise.all(reexports.map(({ n }) => collectExports(environment, unwrapId(n), seen)));
	return Array.from(new Set([...exports.map((entry) => entry.n), ...names.flat()]));
}

const VALID_ID_PREFIX = "/@id/";
class ServerMockResolver {
	server;
	options;
	constructor(server, options = {}) {
		this.server = server;
		this.options = options;
	}
	async resolveMock(rawId, importer, options) {
		const { id, fsPath, external } = await this.resolveMockId(rawId, importer);
		const resolvedUrl = this.normalizeResolveIdToUrl({ id }).url;
		if (options.mock === "factory") {
			const manifest = getViteDepsManifest(this.server.config);
			const needsInterop = manifest?.[fsPath]?.needsInterop ?? false;
			return {
				mockType: "manual",
				resolvedId: id,
				resolvedUrl,
				needsInterop
			};
		}
		if (options.mock === "spy") {
			return {
				mockType: "autospy",
				resolvedId: id,
				resolvedUrl
			};
		}
		const redirectUrl = findMockRedirect(this.server.config.root, fsPath, external, rawId);
		return {
			mockType: redirectUrl === null ? "automock" : "redirect",
			redirectUrl,
			resolvedId: id,
			resolvedUrl
		};
	}
	invalidate(ids) {
		ids.forEach((id) => {
			const moduleGraph = this.server.moduleGraph;
			const module = moduleGraph.getModuleById(id);
			if (module) {
				module.transformResult = null;
			}
		});
	}
	async resolveId(id, importer) {
		const resolved = await this.server.environments.client.pluginContainer.resolveId(id, importer);
		if (!resolved) {
			return null;
		}
		return this.normalizeResolveIdToUrl(resolved);
	}
	normalizeResolveIdToUrl(resolved) {
		const isOptimized = resolved.id.startsWith(withTrailingSlash(this.server.config.cacheDir));
		let url;
		// normalise the URL to be acceptable by the browser
		// https://github.com/vitejs/vite/blob/14027b0f2a9b01c14815c38aab22baf5b29594bb/packages/vite/src/node/plugins/importAnalysis.ts#L103
		const root = this.server.config.root;
		if (resolved.id.startsWith(withTrailingSlash(root))) {
			url = resolved.id.slice(root.length);
		} else if (resolved.id !== "/@react-refresh" && isAbsolute(resolved.id) && existsSync(cleanUrl(resolved.id))) {
			url = join$1("/@fs/", resolved.id);
		} else {
			url = resolved.id;
		}
		if (url[0] !== "." && url[0] !== "/") {
			url = resolved.id.startsWith(VALID_ID_PREFIX) ? resolved.id : VALID_ID_PREFIX + resolved.id.replace("\0", "__x00__");
		}
		return {
			id: resolved.id,
			url,
			optimized: isOptimized
		};
	}
	async resolveMockId(rawId, importer) {
		if (!this.server.moduleGraph.getModuleById(importer) && !importer.startsWith(this.server.config.root)) {
			importer = join$1(this.server.config.root, importer);
		}
		const resolved = await this.server.pluginContainer.resolveId(rawId, importer, { ssr: false });
		return this.resolveModule(rawId, resolved);
	}
	resolveModule(rawId, resolved) {
		const id = resolved?.id || rawId;
		const external = !isAbsolute(id) || isModuleDirectory(this.options, id) ? rawId : null;
		return {
			id,
			fsPath: cleanUrl(id),
			external
		};
	}
}
function isModuleDirectory(config, path) {
	const moduleDirectories = config.moduleDirectories || ["/node_modules/"];
	return moduleDirectories.some((dir) => path.includes(dir));
}
const metadata = new WeakMap();
function getViteDepsManifest(config) {
	if (metadata.has(config)) {
		return metadata.get(config);
	}
	const cacheDirPath = getDepsCacheDir(config);
	const metadataPath = resolve(cacheDirPath, "_metadata.json");
	if (!existsSync(metadataPath)) {
		return null;
	}
	const { optimized } = JSON.parse(readFileSync(metadataPath, "utf-8"));
	const newManifest = {};
	for (const name in optimized) {
		const dep = optimized[name];
		const file = resolve(cacheDirPath, dep.file);
		newManifest[file] = {
			hash: dep.fileHash,
			needsInterop: dep.needsInterop
		};
	}
	metadata.set(config, newManifest);
	return newManifest;
}
function getDepsCacheDir(config) {
	return resolve(config.cacheDir, "deps");
}
function withTrailingSlash(path) {
	if (path.at(-1) !== "/") {
		return `${path}/`;
	}
	return path;
}

// this is an implementation for public usage
// vitest doesn't use this plugin directly
function mockerPlugin(options = {}) {
	let server;
	const registerPath = resolve(fileURLToPath(new URL("./register.js", import.meta.url)));
	const distDir = `${dirname(registerPath)}/`;
	return [
		{
			name: "vitest:mocker:msw",
			enforce: "pre",
			async resolveId(id, importer, options) {
				if (id !== "msw/http" || !importer?.startsWith(distDir)) {
					return;
				}
				try {
					return await this.resolve(id, importer, {
						...options,
						skipSelf: true
					});
				} catch {
					// msw v2 exports `http` from `msw/core/http`
					return this.resolve("msw/core/http", importer, {
						...options,
						skipSelf: true
					});
				}
			}
		},
		{
			name: "vitest:mocker:ws-rpc",
			config(_, { command }) {
				if (command !== "serve") {
					return;
				}
				return {
					server: { 
					// don't pre-transform request because they might be mocked at runtime
preTransformRequests: false },
					optimizeDeps: { exclude: ["@vitest/mocker/register", "@vitest/mocker/browser"] }
				};
			},
			configureServer(server_) {
				server = server_;
				const mockResolver = new ServerMockResolver(server);
				server.ws.on("vitest:mocks:resolveId", async ({ id, importer }) => {
					const resolved = await mockResolver.resolveId(id, importer);
					server.ws.send("vitest:mocks:resolvedId:result", resolved);
				});
				server.ws.on("vitest:mocks:resolveMock", async ({ id, importer, options }) => {
					const resolved = await mockResolver.resolveMock(id, importer, options);
					server.ws.send("vitest:mocks:resolveMock:result", resolved);
				});
				server.ws.on("vitest:mocks:invalidate", async ({ ids }) => {
					mockResolver.invalidate(ids);
					server.ws.send("vitest:mocks:invalidate:result");
				});
			},
			async load(id) {
				if (id !== registerPath) {
					return;
				}
				if (!server) {
					// mocker doesn't work during build
					return "export {}";
				}
				const content = await readFile(registerPath, "utf-8");
				const result = content.replace(/__VITEST_GLOBAL_THIS_ACCESSOR__/g, options.globalThisAccessor ?? "\"__vitest_mocker__\"").replace("__VITEST_MOCKER_ROOT__", JSON.stringify(server.config.root));
				return result;
			}
		},
		hoistMocksPlugin(options.hoistMocks),
		interceptorPlugin(options),
		automockPlugin(options),
		dynamicImportPlugin(options)
	];
}

export { ServerMockResolver, automockModule, automockPlugin, collectEnvironmentExports, createManualModuleSource, dynamicImportPlugin, findMockRedirect, getManualMockId, getManualMockUrl, hoistMockAndResolve as hoistMocks, hoistMocksPlugin, interceptorPlugin, manualMockPlugin, mockerPlugin };
