import { t as toArray, a as relative } from './chunks/pathe.M-eThtNZ.zq3TM4NT.js';

/* @__NO_SIDE_EFFECTS__ */
function isTestCase(s) {
	return s.type === "test";
}
/* @__NO_SIDE_EFFECTS__ */
function getTests(suite) {
	const tests = [];
	const arraySuites = toArray(suite);
	for (const s of arraySuites) if (/* @__PURE__ */ isTestCase(s)) tests.push(s);
	else for (const task of s.tasks) if (/* @__PURE__ */ isTestCase(task)) tests.push(task);
	else {
		const taskTests = /* @__PURE__ */ getTests(task);
		for (const test of taskTests) tests.push(test);
	}
	return tests;
}
/* @__NO_SIDE_EFFECTS__ */
function getTasks(tasks = []) {
	return toArray(tasks).flatMap((s) => /* @__PURE__ */ isTestCase(s) ? [s] : [s, .../* @__PURE__ */ getTasks(s.tasks)]);
}
/* @__NO_SIDE_EFFECTS__ */
function getSuites(suite) {
	return toArray(suite).flatMap((s) => s.type === "suite" ? [s, .../* @__PURE__ */ getSuites(s.tasks)] : []);
}
/* @__NO_SIDE_EFFECTS__ */
function hasFailed(suite) {
	return toArray(suite).some((s) => s.result?.state === "fail" || s.type === "suite" && /* @__PURE__ */ hasFailed(s.tasks));
}
/* @__NO_SIDE_EFFECTS__ */
function getNames(task) {
	const names = [task.name];
	let current = task;
	while (current?.suite) {
		current = current.suite;
		if (current?.name) names.unshift(current.name);
	}
	if (current !== task.file) names.unshift(task.file.name);
	return names;
}
/* @__NO_SIDE_EFFECTS__ */
function getFullName(task, separator = " > ") {
	return (/* @__PURE__ */ getNames(task)).join(separator);
}
/* @__NO_SIDE_EFFECTS__ */
function getTestName(task, separator = " > ") {
	return (/* @__PURE__ */ getNames(task)).slice(1).join(separator);
}
/* @__NO_SIDE_EFFECTS__ */
function createTaskName(names, separator = " > ") {
	return names.filter((name) => name !== void 0).join(separator);
}
/* @__NO_SIDE_EFFECTS__ */
function isSnapshotMatchError(error) {
	return typeof error?.message === "string" && /Snapshot .* mismatched/.test(error.message);
}
/* @__NO_SIDE_EFFECTS__ */
function hasFailedSnapshot(suite) {
	return (/* @__PURE__ */ getTests(suite)).some((s) => {
		return s.result?.errors?.some(isSnapshotMatchError);
	});
}
/* @__NO_SIDE_EFFECTS__ */
function convertTasksToEvents(file, onTask) {
	const packs = [];
	const events = [];
	function visit(suite) {
		onTask?.(suite);
		packs.push([
			suite.id,
			suite.result,
			suite.meta
		]);
		events.push([
			suite.id,
			"suite-prepare",
			void 0
		]);
		suite.tasks.forEach((task) => {
			if (task.type === "suite") visit(task);
			else {
				onTask?.(task);
				if (suite.mode !== "skip" && suite.mode !== "todo") {
					packs.push([
						task.id,
						task.result,
						task.meta
					]);
					events.push([
						task.id,
						"test-prepare",
						void 0
					]);
					task.annotations.forEach((annotation) => {
						events.push([
							task.id,
							"test-annotation",
							{ annotation }
						]);
					});
					task.artifacts.forEach((artifact) => {
						events.push([
							task.id,
							"test-artifact",
							{ artifact }
						]);
					});
					events.push([
						task.id,
						"test-finished",
						void 0
					]);
				}
			}
		});
		events.push([
			suite.id,
			"suite-finished",
			void 0
		]);
	}
	visit(file);
	return {
		packs,
		events
	};
}
/* @__NO_SIDE_EFFECTS__ */
function createFileTask(filepath, root, projectName, pool, viteEnvironment, meta) {
	const path = relative(root, filepath);
	// this can be called outside of the test run, so worker might not be there
	// @ts-expect-error injected global
	const workerState = globalThis.__vitest_worker__;
	const file = {
		id: /* @__PURE__ */ generateFileHash(path, projectName, meta),
		name: path,
		fullName: path,
		type: "suite",
		mode: "queued",
		filepath,
		tasks: [],
		meta: Object.assign(Object.create(null), meta),
		projectName,
		file: void 0,
		pool,
		viteEnvironment,
		concurrencyId: workerState?.ctx.concurrencyId ?? 0,
		workerId: workerState?.ctx.workerId ?? 0
	};
	file.file = file;
	return file;
}
/**
* Generate a unique ID for a file based on its path and project name
* @param file File relative to the root of the project to keep ID the same between different machines
* @param projectName The name of the test project
*/
/* @__NO_SIDE_EFFECTS__ */
function generateFileHash(file, projectName, meta) {
	return /* @__PURE__ */ generateHash([
		file,
		projectName || "",
		meta?.typecheck ? "__typecheck__" : "",
		meta?.__vitest_label__ || ""
	].join("\0"));
}
/* @__NO_SIDE_EFFECTS__ */
function generateHash(str) {
	let hash = 0;
	if (str.length === 0) return `${hash}`;
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash = hash & hash;
	}
	return `${hash}`;
}
function calculateSuiteHash(parent) {
	parent.tasks.forEach((t, idx) => {
		t.id = `${parent.id}_${idx}`;
		if (t.type === "suite") calculateSuiteHash(t);
	});
}
/**
* If any tasks been marked as `only`, mark all other tasks as `skip`.
*/
function interpretTaskModes(file, namePattern, testLocations, testIds, testNames, testTagsFilter, onlyMode, parentIsOnly, allowOnly) {
	const matchedLocations = [];
	const testLocationsSet = testLocations !== void 0 && testLocations.length !== 0 ? new Set(testLocations) : void 0;
	const testIdsSet = testIds ? new Set(testIds) : void 0;
	const testNamesSet = testNames ? new Set(testNames) : void 0;
	const traverseSuite = (suite, parentIsOnly, parentMatchedWithLocation) => {
		const suiteIsOnly = parentIsOnly || suite.mode === "only";
		// Check if any tasks in this suite have `.only` - if so, only those should run.
		// `containsOnly` is computed during collection (in the runtime/AST collectors).
		const hasSomeTasksOnly = !!(onlyMode && suite.containsOnly);
		suite.tasks.forEach((t) => {
			// Check if either the parent suite or the task itself are marked as included
			// If there are tasks with `.only` in this suite, only include those (not all tasks from describe.only)
			const includeTask = hasSomeTasksOnly ? t.mode === "only" || t.type === "suite" && !!t.containsOnly : suiteIsOnly || t.mode === "only";
			if (onlyMode) {
				if (t.type === "suite" && (includeTask || t.containsOnly)) {
					// Don't skip this suite
					if (t.mode === "only") {
						checkAllowOnly(t, allowOnly);
						t.mode = "run";
					}
				} else if (t.mode === "run" && !includeTask) t.mode = "skip";
				else if (t.mode === "only") {
					checkAllowOnly(t, allowOnly);
					t.mode = "run";
				}
			}
			let hasLocationMatch = parentMatchedWithLocation;
			// Match test location against provided locations, only run if present
			// in `testLocations`. Note: if `includeTaskLocation` is not enabled,
			// all test will be skipped.
			if (testLocationsSet !== void 0) {
				if (t.location && testLocationsSet.has(t.location.line)) {
					t.mode = "run";
					matchedLocations.push(t.location.line);
					hasLocationMatch = true;
				} else if (parentMatchedWithLocation) t.mode = "run";
				else if (t.type === "test") t.mode = "skip";
			}
			if (t.type === "test") {
				// oxlint-disable-next-line unicorn/prefer-regexp-test -- namePattern can be a string
				if (namePattern && !t.fullTestName.match(namePattern)) t.mode = "skip";
				if (testIdsSet && !testIdsSet.has(t.id)) t.mode = "skip";
				if (testNamesSet && !testNamesSet.has(t.fullTestName)) t.mode = "skip";
				if (testTagsFilter && !testTagsFilter(t.tags || [])) t.mode = "skip";
			} else if (t.type === "suite") {
				if (t.mode === "skip") skipAllTasks(t);
				else if (t.mode === "todo") todoAllTasks(t);
				else traverseSuite(t, includeTask, hasLocationMatch);
			}
		});
		// if all subtasks are skipped, mark as skip
		if (suite.mode === "run" || suite.mode === "queued") {
			if (suite.tasks.length && suite.tasks.every((i) => i.mode !== "run" && i.mode !== "queued")) suite.mode = "skip";
		}
	};
	traverseSuite(file, parentIsOnly, false);
	const nonMatching = testLocations?.filter((loc) => !matchedLocations.includes(loc));
	if (nonMatching && nonMatching.length !== 0) {
		const message = nonMatching.length === 1 ? `line ${nonMatching[0]}` : `lines ${nonMatching.join(", ")}`;
		if (file.result === void 0) file.result = {
			state: "fail",
			errors: []
		};
		if (file.result.errors === void 0) file.result.errors = [];
		const error = /* @__PURE__ */ new Error(`No test found in ${file.name} in ${message}`);
		file.result.errors.push({
			name: error.name,
			message: error.message,
			stack: error.stack
		});
	}
}
function skipAllTasks(suite) {
	suite.tasks.forEach((t) => {
		if (t.mode === "run" || t.mode === "queued") {
			t.mode = "skip";
			if (t.type === "suite") skipAllTasks(t);
		}
	});
}
function todoAllTasks(suite) {
	suite.tasks.forEach((t) => {
		if (t.mode === "run" || t.mode === "queued") {
			t.mode = "todo";
			if (t.type === "suite") todoAllTasks(t);
		}
	});
}
function checkAllowOnly(task, allowOnly) {
	if (allowOnly) return;
	const error = /* @__PURE__ */ new Error("[Vitest] Unexpected .only modifier. Remove it or pass --allowOnly argument to bypass this error");
	task.result = {
		state: "fail",
		errors: [{
			name: error.name,
			message: error.message,
			stack: error.stack
		}]
	};
}

export { calculateSuiteHash, convertTasksToEvents, createFileTask, createTaskName, generateFileHash, generateHash, getFullName, getNames, getSuites, getTasks, getTestName, getTests, hasFailed, hasFailedSnapshot, interpretTaskModes, isSnapshotMatchError, isTestCase };
