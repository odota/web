import { spawn } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { performance } from 'node:perf_hooks';
import { pathToFileURL } from 'node:url';
import { t as toArray, r as resolve } from './pathe.M-eThtNZ.zq3TM4NT.js';
import { $ } from './tinyrainbow.Do8I1XRG.js';
import { distDir } from '../path.js';

// custom environments are measured too: the run fails if they lack setupVM
const ENVIRONMENTS_WITHOUT_VM_UPSIDE = /* @__PURE__ */ new Set(["node", "edge-runtime"]);
/**
* Builds the list of configurations worth measuring for this config. The
* candidates are pruned by what the config already uses - there is no point
* in measuring `threads` when the config already runs in `threads`.
*/
function resolveDoctorCandidates(projects, options = {}) {
	const candidates = [];
	// `pool`, `environment` and the fs module cache don't reach the browser
	// runtime, so those candidates are driven by the node-side projects only;
	// isolation applies to browser projects as well
	const testProjects = projects.filter((project) => !project.browser);
	const pools = new Set(testProjects.map((project) => project.pool));
	const usesVmPool = pools.has("vmThreads") || pools.has("vmForks");
	const benefitsFromVm = testProjects.some((project) => !ENVIRONMENTS_WITHOUT_VM_UPSIDE.has(project.environment));
	const isolates = projects.some((project) => project.isolate && (project.browser || project.pool !== "vmThreads" && project.pool !== "vmForks"));
	if (pools.has("forks")) candidates.push({
		id: "threads",
		title: `pool: 'threads'`,
		overrides: { pool: "threads" },
		configLines: [`pool: 'threads'`],
		preservesIsolation: true
	});
	if (benefitsFromVm && !pools.has("vmThreads")) candidates.push({
		id: "vmThreads",
		title: `pool: 'vmThreads'`,
		overrides: { pool: "vmThreads" },
		configLines: [`pool: 'vmThreads'`],
		preservesIsolation: true
	});
	// vmForks trades vmThreads' worker threads for child processes: each child
	// gets its own heap and GC, which can beat vmThreads on GC-heavy suites, and
	// it is the vm option for suites that cannot run in worker threads
	if (benefitsFromVm && !pools.has("vmForks")) candidates.push({
		id: "vmForks",
		title: `pool: 'vmForks'`,
		overrides: { pool: "vmForks" },
		configLines: [`pool: 'vmForks'`],
		preservesIsolation: true
	});
	// jsdom -> happy-dom is the only swap with a speed upside; it is applied per
	// project, so projects running other environments keep them
	if (options.happyDomAvailable && testProjects.some((project) => project.environment === "jsdom")) candidates.push({
		id: "happy-dom",
		title: `environment: 'happy-dom'`,
		overrides: {},
		envSwap: {
			from: "jsdom",
			to: "happy-dom"
		},
		configLines: [`environment: 'happy-dom'`],
		preservesIsolation: true
	});
	if (isolates) candidates.push({
		id: "no-isolate",
		title: "isolate: false",
		overrides: { isolate: false },
		configLines: ["isolate: false"],
		preservesIsolation: false,
		validateIsolation: true
	});
	if (usesVmPool)
 // the honest competitor of a vm pool: reused workers with shared state
	candidates.push({
		id: "threads-no-isolate",
		title: `pool: 'threads' + isolate: false`,
		overrides: {
			pool: "threads",
			isolate: false
		},
		configLines: [`pool: 'threads'`, "isolate: false"],
		preservesIsolation: false,
		validateIsolation: true
	});
	if (testProjects.length > 0 && testProjects.every((project) => !project.fsModuleCache))
 // an untimed priming run populates the cache first: the candidate measures
	// what repeated runs pay, which is what doctor compares everywhere else
	candidates.push({
		id: "fs-cache",
		title: "fsModuleCache: true",
		overrides: { fsModuleCache: true },
		configLines: ["fsModuleCache: true"],
		preservesIsolation: true,
		primeRuns: 1
	});
	return candidates;
}
function log(...args) {
	console.log(...args);
}
async function doctor(cliFilters, options) {
	const { prepareVitest } = await import('./cli-api.COfZo8lK.js').then(function (n) { return n.j; });
	log();
	log($.inverse($.bold($.blue(" DOCTOR "))), "resolving the current configuration...");
	const ctx = await prepareVitest({
		...options,
		watch: false,
		run: true
	}, void 0, void 0, cliFilters);
	const projects = ctx.projects.map((project) => ({
		name: project.name,
		pool: project.config.pool,
		environment: project.config.environment,
		isolate: project.config.isolate,
		browser: project.config.browser.enabled,
		fsModuleCache: project.config.fsModuleCache === true
	}));
	const fileCount = (await ctx.getRelevantTestSpecifications(cliFilters)).length;
	const effectiveMaxWorkers = ctx.config.maxWorkers;
	await ctx.close();
	// the environments import 'happy-dom' relative to the vitest package (it is
	// a peer dependency), so resolving from here mirrors what a run would do
	let happyDomAvailable = false;
	try {
		import.meta.resolve("happy-dom");
		happyDomAvailable = true;
	} catch {}
	const candidates = resolveDoctorCandidates(projects, { happyDomAvailable });
	const baselineTitle = `baseline (${describeProjects(projects)})`;
	// every measured run goes through one generated runner script: candidates
	// may need per-project overrides (the happy-dom swap), which the CLI cannot
	// express, and routing the baseline through the same entry keeps the
	// process cost identical across measurements
	const runnerDir = mkdtempSync(join(tmpdir(), "vitest-doctor-"));
	const runnerPath = join(runnerDir, "runner.mjs");
	writeFileSync(runnerPath, createRunnerScript());
	process.once("exit", () => rmSync(runnerDir, {
		recursive: true,
		force: true
	}));
	const childProjects = toArray(options.project).map(String);
	const childOptions = {
		watch: false,
		...options.root ? { root: String(options.root) } : {},
		...options.config ? { config: String(options.config) } : {},
		...childProjects.length ? { project: childProjects } : {}
	};
	// make sure an interrupted doctor doesn't leave a test suite running
	let activeChild;
	const killActiveChild = () => {
		activeChild?.kill("SIGKILL");
		process.exit(130);
	};
	process.once("SIGINT", killActiveChild);
	process.once("SIGTERM", killActiveChild);
	const runVitest = (run, timeoutMs) => {
		return new Promise((resolve) => {
			const start = performance.now();
			const payload = JSON.stringify({
				filters: cliFilters,
				options: {
					...childOptions,
					...run.overrides
				},
				envSwap: run.envSwap
			});
			const child = spawn(process.execPath, [runnerPath, payload], {
				env: {
					...process.env,
					NO_COLOR: "1"
				},
				stdio: [
					"ignore",
					"ignore",
					"pipe"
				]
			});
			activeChild = child;
			let timedOut = false;
			const timer = timeoutMs ? setTimeout(() => {
				timedOut = true;
				child.kill("SIGKILL");
			}, timeoutMs) : void 0;
			let stderr = "";
			child.stderr.on("data", (chunk) => {
				stderr = (stderr + String(chunk)).slice(-4e3);
			});
			child.on("close", (code) => {
				if (timer) clearTimeout(timer);
				activeChild = void 0;
				if (timedOut) stderr += `\n(the run was killed after exceeding ${Math.round((timeoutMs || 0) / 1e3)}s - several times the baseline duration)`;
				resolve({
					wall: performance.now() - start,
					ok: code === 0 && !timedOut,
					stderr
				});
			});
		});
	};
	log();
	if (candidates.length === 0) log("The configuration already uses the fastest setup Vitest knows how to compare - measuring it for reference.");
	else {
		log("Measuring alternative configurations by running the test suite under each of them.");
		log($.dim("Close other heavy programs - the comparison is only as good as the machine is quiet."));
	}
	log();
	// The first baseline run also warms up caches for every following run, so
	// candidates are compared in a warm steady state.
	process.stdout.write($.dim(`  measuring ${baselineTitle}...`));
	const firstRun = await runVitest({});
	if (!firstRun.ok) {
		process.stdout.write("\n");
		log($.red("The test suite fails with the current configuration. Fix the failures first - doctor needs a green suite to compare configurations."));
		if (firstRun.stderr.trim()) log($.dim(firstRun.stderr.trim()));
		process.exitCode = 1;
		return;
	}
	// scale repetitions to the suite duration: short suites are noisy and can
	// afford more runs, long suites cannot
	const reps = firstRun.wall < 1e4 ? 3 : firstRun.wall < 6e4 ? 2 : 1;
	// the first run is cold and mostly warms up caches: always take at least one
	// more baseline run so the reported baseline is a warm one, like the
	// candidates that run after it
	const baselineRuns = Math.max(reps, 2);
	const baselineWalls = [firstRun.wall];
	for (let i = 1; i < baselineRuns; i++) {
		const run = await runVitest({});
		if (!run.ok) {
			process.stdout.write("\n");
			log($.red(`The test suite passed once but failed on repetition ${i + 1} with the same configuration - doctor needs a stable green suite to compare configurations.`));
			if (run.stderr.trim()) log($.dim(run.stderr.trim()));
			process.exitCode = 1;
			return;
		}
		baselineWalls.push(run.wall);
	}
	const baselineWall = Math.min(...baselineWalls);
	process.stdout.write(` ${formatSeconds(baselineWall)}\n`);
	// a candidate that takes several times the baseline is a regression, not a
	// recommendation - don't let it stall doctor indefinitely
	const candidateTimeout = Math.max(6e4, baselineWall * 4);
	const measured = [];
	for (const candidate of candidates) {
		process.stdout.write($.dim(`  measuring ${candidate.title}...`));
		let wall = Number.POSITIVE_INFINITY;
		let ok = true;
		let stderr = "";
		const candidateRun = {
			overrides: candidate.overrides,
			envSwap: candidate.envSwap
		};
		for (let i = 0; i < (candidate.primeRuns ?? 0) && ok; i++) {
			const run = await runVitest(candidateRun, candidateTimeout);
			ok = run.ok;
			stderr = run.stderr;
		}
		for (let i = 0; i < reps && ok; i++) {
			const run = await runVitest(candidateRun, candidateTimeout);
			wall = Math.min(wall, run.wall);
			ok = run.ok;
			stderr = run.stderr;
		}
		let isolationVerdict;
		if (ok && candidate.validateIsolation) {
			// tests can pass under shared state by accident of ordering: shuffle the
			// file order twice to catch the common cross-file couplings; the explicit
			// distinct seeds guarantee two different orders even when the user pinned
			// `sequence.seed` in their config
			isolationVerdict = "passed";
			for (let i = 0; i < 2; i++) {
				const run = await runVitest({
					overrides: {
						...candidate.overrides,
						sequence: {
							shuffle: { files: true },
							seed: 271828 + i
						}
					},
					envSwap: candidate.envSwap
				}, candidateTimeout);
				if (!run.ok) {
					isolationVerdict = "failed";
					stderr = run.stderr;
					break;
				}
			}
		}
		measured.push({
			candidate,
			wall,
			ok,
			stderr,
			isolationVerdict
		});
		process.stdout.write(ok ? ` ${formatSeconds(wall)}\n` : ` ${$.red("failed")}\n`);
	}
	const viable = measured.filter((result) => result.ok && result.isolationVerdict !== "failed" && result.wall < baselineWall * .9);
	// among candidates close to the fastest, prefer the one that keeps per-file
	// isolation - equal speed with stronger guarantees wins
	const fastest = viable.length > 0 ? viable.reduce((a, b) => b.wall < a.wall ? b : a) : void 0;
	const preferred = fastest ? viable.filter((result) => result.wall <= fastest.wall * 1.05).sort((a, b) => Number(b.candidate.preservesIsolation) - Number(a.candidate.preservesIsolation))[0] : void 0;
	// Past a certain worker count the single main-thread Vite server becomes the
	// bottleneck, so FEWER workers can be faster. Greedily descend by halving on
	// top of the winning configuration, keeping a step only when it is a real
	// (>= 5%) improvement.
	const workerStack = preferred ? {
		overrides: preferred.candidate.overrides,
		envSwap: preferred.candidate.envSwap
	} : {};
	const workerSuffix = preferred ? ` (with ${preferred.candidate.title})` : "";
	const workerProbes = [];
	let bestWorkers;
	{
		let currentBest = preferred ? preferred.wall : baselineWall;
		let probe = Math.floor(effectiveMaxWorkers / 2);
		while (probe >= 2 && probe < fileCount) {
			process.stdout.write($.dim(`  measuring maxWorkers: ${probe}${workerSuffix}...`));
			let wall = Number.POSITIVE_INFINITY;
			let ok = true;
			for (let i = 0; i < reps && ok; i++) {
				const run = await runVitest({
					overrides: {
						...workerStack.overrides,
						maxWorkers: probe
					},
					envSwap: workerStack.envSwap
				}, candidateTimeout);
				wall = Math.min(wall, run.wall);
				ok = run.ok;
			}
			process.stdout.write(ok ? ` ${formatSeconds(wall)}\n` : ` ${$.red("failed")}\n`);
			if (!ok) break;
			workerProbes.push({
				workers: probe,
				wall
			});
			if (wall >= currentBest * .95) break;
			currentBest = wall;
			bestWorkers = {
				workers: probe,
				wall
			};
			probe = Math.floor(probe / 2);
		}
	}
	log();
	log($.bold("Results") + $.dim(` (min of ${reps} run${reps === 1 ? "" : "s"} each)`));
	log();
	const rowTitles = [...measured.map((m) => m.candidate.title), ...workerProbes.map((p) => `maxWorkers: ${p.workers}${workerSuffix}`)];
	const width = Math.max(baselineTitle.length, ...rowTitles.map((title) => title.length)) + 2;
	log(`  ${baselineTitle.padEnd(width)}${formatSeconds(baselineWall)}`);
	for (const result of measured) {
		const title = result.candidate.title.padEnd(width);
		if (!result.ok) log(`  ${title}${$.red("failed")}`);
		else if (result.isolationVerdict === "failed") log(`  ${title}${formatSeconds(result.wall)} ${$.red("(fails with a shuffled file order - tests depend on isolation)")}`);
		else log(`  ${title}${formatSeconds(result.wall)} ${formatDelta(result.wall, baselineWall)}`);
	}
	for (const probeResult of workerProbes) log(`  ${`maxWorkers: ${probeResult.workers}${workerSuffix}`.padEnd(width)}${formatSeconds(probeResult.wall)} ${formatDelta(probeResult.wall, baselineWall)}`);
	// failing candidates are as informative as fast ones: show what broke,
	// so "vmThreads is not an option for this suite" comes with the reason
	for (const result of measured) if (!result.ok) logFailureExcerpt(`${result.candidate.title} failed with:`, result.stderr);
	else if (result.isolationVerdict === "failed") logFailureExcerpt(`${result.candidate.title} failed with a shuffled file order:`, result.stderr);
	log();
	if (!preferred && !bestWorkers) {
		if (candidates.length === 0) log(`${$.bold("Recommendation:")} keep the current configuration (${describeProjects(projects)}) - it measured ${$.yellow(formatSeconds(baselineWall))} and Vitest has no faster candidate to suggest for it.`);
		else log(`${$.bold("Recommendation:")} keep the current configuration (${describeProjects(projects)}) - no measured candidate was more than 10% faster.`);
		return;
	}
	const finalWall = bestWorkers ? bestWorkers.wall : preferred.wall;
	const recommendationTitle = [preferred?.candidate.title, bestWorkers ? `maxWorkers: ${bestWorkers.workers}` : void 0].filter(Boolean).join(" + ");
	const configLines = [...preferred ? preferred.candidate.configLines : [], ...bestWorkers ? [`maxWorkers: ${bestWorkers.workers}`] : []];
	log(`${$.bold("Recommendation:")} ${$.yellow(recommendationTitle)} ${formatDelta(finalWall, baselineWall)}`);
	log();
	log($.dim("  // vitest.config.ts"));
	log($.dim(`  import { defineConfig } from 'vitest/config'`));
	log();
	log($.dim("  export default defineConfig({"));
	log($.dim("    test: {"));
	for (const [index, line] of configLines.entries()) log(`      ${line},${index === configLines.length - 1 ? $.dim(` // measured ${Math.round((finalWall - baselineWall) / baselineWall * 100)}% on this suite`) : ""}`);
	log($.dim("    },"));
	log($.dim("  })"));
	log();
	if (preferred) for (const note of candidateNotes(preferred)) log($.dim(`  ${note}`));
	if (bestWorkers) {
		log($.dim(`  Fewer workers can be faster because every worker funnels transforms through the`));
		log($.dim(`  single main-thread Vite server; a lower count also reduces memory pressure.`));
	}
	if (projects.length > 1) {
		const note = preferred?.candidate.envSwap ? `Doctor swapped the environment of every project running ${preferred.candidate.envSwap.from}; other projects were left unchanged.` : "Doctor overrides options for all projects at once; apply the change per project if they need different settings.";
		log($.dim(`  ${note}`));
	}
	log($.dim("  Trade-offs of every option: https://vitest.dev/guide/improving-performance"));
}
/**
* The measured runs execute this script instead of the CLI binary: it accepts
* the overrides as JSON and can apply per-project changes (the environment
* swap) that CLI flags cannot express. `createVitest` attaches the projects,
* so the swap mutates each resolved project config before the run starts.
*/
function createRunnerScript() {
	const nodeEntry = pathToFileURL(resolve(distDir, "node.js")).href;
	return `import { createVitest } from ${JSON.stringify(nodeEntry)}

const { filters, options, envSwap } = JSON.parse(process.argv[2])
const ctx = await createVitest(options)
if (envSwap) {
  for (const project of ctx.projects) {
    if (!project.config.browser.enabled && project.config.environment === envSwap.from) {
      project.config.environment = envSwap.to
    }
  }
}
try {
  await ctx.start(filters)
}
catch (error) {
  console.error(error?.stack || String(error))
  process.exitCode = 1
}
await ctx.close()
process.exit(process.exitCode || 0)
`;
}
function logFailureExcerpt(title, stderr) {
	log();
	log(`  ${$.red(title)}`);
	if (!stderr.trim()) {
		log($.dim("    (the run produced no error output - rerun with the same options to inspect it)"));
		return;
	}
	const lines = stderr.trim().split("\n");
	const excerpt = lines.slice(-15);
	if (lines.length > excerpt.length) log($.dim(`    … (last ${excerpt.length} lines)`));
	for (const line of excerpt) log($.dim(`    ${line}`));
}
function candidateNotes(result) {
	switch (result.candidate.id) {
		case "vmThreads":
		case "vmForks": return [`vm pools keep per-file isolation but run test code in a VM context: cross-realm`, `instanceof edge cases and higher memory usage are possible (see vmMemoryLimit).`];
		case "no-isolate":
		case "threads-no-isolate": return [`The suite passed twice with a shuffled file order under shared state, so it is`, `likely - but not guaranteed - that no test depends on isolation.`];
		case "happy-dom": return [
			`The swap was applied only to projects running jsdom; other projects kept their`,
			`environment. happy-dom implements the DOM differently than jsdom: the suite`,
			`passed under it, but double-check tests that depend on layout, navigation or`,
			`other DOM edge cases.`
		];
		case "fs-cache": return [`The fs module cache persists transformed modules on disk: repeated runs skip`, `the transforms, the first run after a file change still pays them.`];
		default: return [];
	}
}
function describeProjects(projects) {
	return `pool: ${[...new Set(projects.map((project) => project.browser ? "browser" : project.pool))].join(", ")} · isolate: ${projects.some((project) => project.isolate)}`;
}
function formatSeconds(time) {
	return `${(time / 1e3).toFixed(2)}s`;
}
function formatDelta(wall, baseline) {
	const delta = Math.round((wall - baseline) / baseline * 100);
	if (delta === 0) return $.dim("(±0%)");
	return delta < 0 ? $.green(`(${delta}%)`) : $.yellow(`(+${delta}%)`);
}

export { doctor, resolveDoctorCandidates };
