import { a as namespaces, i as enabled, n as disable, s as selectColor } from "./core.js";
import { createDebug as createDebug$1, enable } from "./plain.js";
//#region src/browser.ts
const colors = [
	"#0000CC",
	"#0000FF",
	"#0033CC",
	"#0033FF",
	"#0066CC",
	"#0066FF",
	"#0099CC",
	"#0099FF",
	"#00CC00",
	"#00CC33",
	"#00CC66",
	"#00CC99",
	"#00CCCC",
	"#00CCFF",
	"#3300CC",
	"#3300FF",
	"#3333CC",
	"#3333FF",
	"#3366CC",
	"#3366FF",
	"#3399CC",
	"#3399FF",
	"#33CC00",
	"#33CC33",
	"#33CC66",
	"#33CC99",
	"#33CCCC",
	"#33CCFF",
	"#6600CC",
	"#6600FF",
	"#6633CC",
	"#6633FF",
	"#66CC00",
	"#66CC33",
	"#9900CC",
	"#9900FF",
	"#9933CC",
	"#9933FF",
	"#99CC00",
	"#99CC33",
	"#CC0000",
	"#CC0033",
	"#CC0066",
	"#CC0099",
	"#CC00CC",
	"#CC00FF",
	"#CC3300",
	"#CC3333",
	"#CC3366",
	"#CC3399",
	"#CC33CC",
	"#CC33FF",
	"#CC6600",
	"#CC6633",
	"#CC9900",
	"#CC9933",
	"#CCCC00",
	"#CCCC33",
	"#FF0000",
	"#FF0033",
	"#FF0066",
	"#FF0099",
	"#FF00CC",
	"#FF00FF",
	"#FF3300",
	"#FF3333",
	"#FF3366",
	"#FF3399",
	"#FF33CC",
	"#FF33FF",
	"#FF6600",
	"#FF6633",
	"#FF9900",
	"#FF9933",
	"#FFCC00",
	"#FFCC33"
];
/**
* Colorize log arguments if enabled.
*/
function formatArgs(diff, args) {
	const { useColors } = this;
	args[0] = `${(useColors ? "%c" : "") + this.namespace + (useColors ? " %c" : " ") + args[0] + (useColors ? "%c " : " ")}+${this.humanize(diff)}`;
	if (!useColors) return;
	const c = `color: ${this.color}`;
	args.splice(1, 0, c, "color: inherit");
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-z%]/gi, (match) => {
		if (match === "%%") return;
		index++;
		if (match === "%c") lastC = index;
	});
	args.splice(lastC, 0, c);
}
function createDebug(namespace, options) {
	var _ref;
	const color = (_ref = options && options.color) !== null && _ref !== void 0 ? _ref : selectColor(colors, namespace);
	return createDebug$1(namespace, Object.assign({
		useColors: true,
		color,
		formatArgs
	}, options));
}
//#endregion
export { createDebug, disable, enable, enabled, namespaces };
