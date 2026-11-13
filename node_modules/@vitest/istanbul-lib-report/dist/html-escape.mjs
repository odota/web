//#region src/html-escape.ts
const e = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"'": "&#39;",
	"\"": "&quot;"
};
function escape(t) {
	return String(t).replace(/[&<>'"]/g, (t) => e[t]);
}
//#endregion
export { escape };
