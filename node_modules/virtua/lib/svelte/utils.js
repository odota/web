//#region src/svelte/utils.ts
var styleToString = (obj) => {
	return Object.keys(obj).reduce((acc, k) => {
		const value = obj[k];
		if (value == null) return acc;
		return acc + `${k}:${value};`;
	}, "");
};
var isSameRange = (prev, next) => {
	return prev[0] === next[0] && prev[1] === next[1];
};
var defaultGetKey = (_data, i) => "_" + i;
//#endregion
export { defaultGetKey, isSameRange, styleToString };

//# sourceMappingURL=utils.js.map