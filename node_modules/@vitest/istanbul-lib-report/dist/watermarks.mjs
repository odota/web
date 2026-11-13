//#region src/watermarks.ts
function getDefault() {
	return {
		statements: [50, 80],
		functions: [50, 80],
		branches: [50, 80],
		lines: [50, 80]
	};
}
//#endregion
export { getDefault };
