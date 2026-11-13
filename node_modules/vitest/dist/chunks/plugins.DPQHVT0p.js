import { p as plugins } from './index.D0heQG4v.js';

const serialize = (val, config, indentation, depth, refs, printer) => {
	// Serialize a non-default name, even if config.printFunctionName is false.
	const name = val.getMockName();
	const nameString = name === "vi.fn()" ? "" : ` ${name}`;
	let callsString = "";
	if (val.mock.calls.length !== 0) {
		const indentationNext = indentation + config.indent;
		callsString = ` {${config.spacingOuter}${indentationNext}"calls": ${printer(val.mock.calls, config, indentationNext, depth, refs)}${config.min ? ", " : ","}${config.spacingOuter}${indentationNext}"results": ${printer(val.mock.results, config, indentationNext, depth, refs)}${config.min ? "" : ","}${config.spacingOuter}${indentation}}`;
	}
	return `[MockFunction${nameString}]${callsString}`;
};
const test = (val) => val && !!val._isMockFunction;
const plugin = {
	serialize,
	test
};

const { DOMCollection, DOMElement, Immutable, ReactElement, ReactTestComponent, AsymmetricMatcher } = plugins;
let PLUGINS = [
	ReactTestComponent,
	ReactElement,
	DOMElement,
	DOMCollection,
	Immutable,
	AsymmetricMatcher,
	plugin
];
function addSerializer(plugin) {
	PLUGINS = [plugin].concat(PLUGINS);
}
function getSerializers() {
	return PLUGINS;
}

export { addSerializer as a, getSerializers as g };
