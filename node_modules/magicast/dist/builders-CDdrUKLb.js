import * as babelParser from "@babel/parser";
//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
//#region vendor/ast-types/src/shared.ts
function shared_default(fork) {
	var types = fork.use(typesPlugin);
	var Type = types.Type;
	var builtin = types.builtInTypes;
	var isNumber = builtin.number;
	function geq(than) {
		return Type.from((value) => isNumber.check(value) && value >= than, isNumber + " >= " + than);
	}
	const defaults = {
		"null": function() {
			return null;
		},
		"emptyArray": function() {
			return [];
		},
		"false": function() {
			return false;
		},
		"true": function() {
			return true;
		},
		"undefined": function() {},
		"use strict": function() {
			return "use strict";
		}
	};
	var naiveIsPrimitive = Type.or(builtin.string, builtin.number, builtin.boolean, builtin.null, builtin.undefined);
	return {
		geq,
		defaults,
		isPrimitive: Type.from((value) => {
			if (value === null) return true;
			var type = typeof value;
			if (type === "object" || type === "function") return false;
			return true;
		}, naiveIsPrimitive.toString())
	};
}
//#endregion
//#region vendor/ast-types/src/types.ts
const Op = Object.prototype;
const objToStr = Op.toString;
const hasOwn$6 = Op.hasOwnProperty;
var BaseType = class {
	assert(value, deep) {
		if (!this.check(value, deep)) {
			var str = shallowStringify(value);
			throw new Error(str + " does not match type " + this);
		}
		return true;
	}
	arrayOf() {
		return new ArrayType(this);
	}
};
var ArrayType = class extends BaseType {
	elemType;
	kind = "ArrayType";
	constructor(elemType) {
		super();
		this.elemType = elemType;
	}
	toString() {
		return "[" + this.elemType + "]";
	}
	check(value, deep) {
		return Array.isArray(value) && value.every((elem) => this.elemType.check(elem, deep));
	}
};
var IdentityType = class extends BaseType {
	value;
	kind = "IdentityType";
	constructor(value) {
		super();
		this.value = value;
	}
	toString() {
		return String(this.value);
	}
	check(value, deep) {
		const result = value === this.value;
		if (!result && typeof deep === "function") deep(this, value);
		return result;
	}
};
var ObjectType = class extends BaseType {
	fields;
	kind = "ObjectType";
	constructor(fields) {
		super();
		this.fields = fields;
	}
	toString() {
		return "{ " + this.fields.join(", ") + " }";
	}
	check(value, deep) {
		return objToStr.call(value) === objToStr.call({}) && this.fields.every((field) => {
			return field.type.check(value[field.name], deep);
		});
	}
};
var OrType = class extends BaseType {
	types;
	kind = "OrType";
	constructor(types) {
		super();
		this.types = types;
	}
	toString() {
		return this.types.join(" | ");
	}
	check(value, deep) {
		if (this.types.some((type) => type.check(value, !!deep))) return true;
		if (typeof deep === "function") deep(this, value);
		return false;
	}
};
var PredicateType = class extends BaseType {
	name;
	predicate;
	kind = "PredicateType";
	constructor(name, predicate) {
		super();
		this.name = name;
		this.predicate = predicate;
	}
	toString() {
		return this.name;
	}
	check(value, deep) {
		const result = this.predicate(value, deep);
		if (!result && typeof deep === "function") deep(this, value);
		return result;
	}
};
var Def = class Def {
	type;
	typeName;
	baseNames = [];
	ownFields = Object.create(null);
	allSupertypes = Object.create(null);
	supertypeList = [];
	allFields = Object.create(null);
	fieldNames = [];
	finalized = false;
	buildable = false;
	buildParams = [];
	constructor(type, typeName) {
		this.type = type;
		this.typeName = typeName;
	}
	isSupertypeOf(that) {
		if (that instanceof Def) {
			if (this.finalized !== true || that.finalized !== true) throw new Error("");
			return hasOwn$6.call(that.allSupertypes, this.typeName);
		} else throw new Error(that + " is not a Def");
	}
	checkAllFields(value, deep) {
		var allFields = this.allFields;
		if (this.finalized !== true) throw new Error("" + this.typeName);
		function checkFieldByName(name) {
			var field = allFields[name];
			var type = field.type;
			var child = field.getValue(value);
			return type.check(child, deep);
		}
		return value !== null && typeof value === "object" && Object.keys(allFields).every(checkFieldByName);
	}
	bases(...supertypeNames) {
		var bases = this.baseNames;
		if (this.finalized) {
			if (supertypeNames.length !== bases.length) throw new Error("");
			for (var i = 0; i < supertypeNames.length; i++) if (supertypeNames[i] !== bases[i]) throw new Error("");
			return this;
		}
		supertypeNames.forEach((baseName) => {
			if (bases.indexOf(baseName) < 0) bases.push(baseName);
		});
		return this;
	}
};
var Field = class {
	name;
	type;
	defaultFn;
	hidden;
	constructor(name, type, defaultFn, hidden) {
		this.name = name;
		this.type = type;
		this.defaultFn = defaultFn;
		this.hidden = !!hidden;
	}
	toString() {
		return JSON.stringify(this.name) + ": " + this.type;
	}
	getValue(obj) {
		var value = obj[this.name];
		if (typeof value !== "undefined") return value;
		if (typeof this.defaultFn === "function") value = this.defaultFn.call(obj);
		return value;
	}
};
function shallowStringify(value) {
	if (Array.isArray(value)) return "[" + value.map(shallowStringify).join(", ") + "]";
	if (value && typeof value === "object") return "{ " + Object.keys(value).map(function(key) {
		return key + ": " + value[key];
	}).join(", ") + " }";
	return JSON.stringify(value);
}
function typesPlugin(_fork) {
	const Type = {
		or(...types) {
			return new OrType(types.map((type) => Type.from(type)));
		},
		from(value, name) {
			if (value instanceof ArrayType || value instanceof IdentityType || value instanceof ObjectType || value instanceof OrType || value instanceof PredicateType) return value;
			if (value instanceof Def) return value.type;
			if (isArray.check(value)) {
				if (value.length !== 1) throw new Error("only one element type is permitted for typed arrays");
				return new ArrayType(Type.from(value[0]));
			}
			if (isObject.check(value)) return new ObjectType(Object.keys(value).map((name) => {
				return new Field(name, Type.from(value[name], name));
			}));
			if (typeof value === "function") {
				var bicfIndex = builtInCtorFns.indexOf(value);
				if (bicfIndex >= 0) return builtInCtorTypes[bicfIndex];
				if (typeof name !== "string") throw new Error("missing name");
				return new PredicateType(name, value);
			}
			return new IdentityType(value);
		},
		def(typeName) {
			return hasOwn$6.call(defCache, typeName) ? defCache[typeName] : defCache[typeName] = new DefImpl(typeName);
		},
		hasDef(typeName) {
			return hasOwn$6.call(defCache, typeName);
		}
	};
	var builtInCtorFns = [];
	var builtInCtorTypes = [];
	function defBuiltInType(name, example) {
		const objStr = objToStr.call(example);
		const type = new PredicateType(name, (value) => objToStr.call(value) === objStr);
		if (example && typeof example.constructor === "function") {
			builtInCtorFns.push(example.constructor);
			builtInCtorTypes.push(type);
		}
		return type;
	}
	const isString = defBuiltInType("string", "truthy");
	const isFunction = defBuiltInType("function", function() {});
	const isArray = defBuiltInType("array", []);
	const isObject = defBuiltInType("object", {});
	const isRegExp = defBuiltInType("RegExp", /./);
	const isDate = defBuiltInType("Date", /* @__PURE__ */ new Date());
	const isNumber = defBuiltInType("number", 3);
	const isBoolean = defBuiltInType("boolean", true);
	const isNull = defBuiltInType("null", null);
	const isUndefined = defBuiltInType("undefined", void 0);
	const builtInTypes = {
		string: isString,
		function: isFunction,
		array: isArray,
		object: isObject,
		RegExp: isRegExp,
		Date: isDate,
		number: isNumber,
		boolean: isBoolean,
		null: isNull,
		undefined: isUndefined,
		BigInt: typeof BigInt === "function" ? defBuiltInType("BigInt", BigInt(1234)) : new PredicateType("BigInt", () => false)
	};
	var defCache = Object.create(null);
	function defFromValue(value) {
		if (value && typeof value === "object") {
			var type = value.type;
			if (typeof type === "string" && hasOwn$6.call(defCache, type)) {
				var d = defCache[type];
				if (d.finalized) return d;
			}
		}
		return null;
	}
	class DefImpl extends Def {
		constructor(typeName) {
			super(new PredicateType(typeName, (value, deep) => this.check(value, deep)), typeName);
		}
		check(value, deep) {
			if (this.finalized !== true) throw new Error("prematurely checking unfinalized type " + this.typeName);
			if (value === null || typeof value !== "object") return false;
			var vDef = defFromValue(value);
			if (!vDef) {
				if (this.typeName === "SourceLocation" || this.typeName === "Position") return this.checkAllFields(value, deep);
				return false;
			}
			if (deep && vDef === this) return this.checkAllFields(value, deep);
			if (!this.isSupertypeOf(vDef)) return false;
			if (!deep) return true;
			return vDef.checkAllFields(value, deep) && this.checkAllFields(value, false);
		}
		build(...buildParams) {
			this.buildParams = buildParams;
			if (this.buildable) return this;
			this.field("type", String, () => this.typeName);
			this.buildable = true;
			const addParam = (built, param, arg, isArgAvailable) => {
				if (hasOwn$6.call(built, param)) return;
				var all = this.allFields;
				if (!hasOwn$6.call(all, param)) throw new Error("" + param);
				var field = all[param];
				var type = field.type;
				var value;
				if (isArgAvailable) value = arg;
				else if (field.defaultFn) value = field.defaultFn.call(built);
				else {
					var message = "no value or default function given for field " + JSON.stringify(param) + " of " + this.typeName + "(" + this.buildParams.map(function(name) {
						return all[name];
					}).join(", ") + ")";
					throw new Error(message);
				}
				if (!type.check(value)) throw new Error(shallowStringify(value) + " does not match field " + field + " of type " + this.typeName);
				built[param] = value;
			};
			const builder = (...args) => {
				var argc = args.length;
				if (!this.finalized) throw new Error("attempting to instantiate unfinalized type " + this.typeName);
				var built = Object.create(nodePrototype);
				this.buildParams.forEach(function(param, i) {
					if (i < argc) addParam(built, param, args[i], true);
					else addParam(built, param, null, false);
				});
				Object.keys(this.allFields).forEach(function(param) {
					addParam(built, param, null, false);
				});
				if (built.type !== this.typeName) throw new Error("");
				return built;
			};
			builder.from = (obj) => {
				if (!this.finalized) throw new Error("attempting to instantiate unfinalized type " + this.typeName);
				var built = Object.create(nodePrototype);
				Object.keys(this.allFields).forEach(function(param) {
					if (hasOwn$6.call(obj, param)) addParam(built, param, obj[param], true);
					else addParam(built, param, null, false);
				});
				if (built.type !== this.typeName) throw new Error("");
				return built;
			};
			Object.defineProperty(builders, getBuilderName(this.typeName), {
				enumerable: true,
				value: builder
			});
			return this;
		}
		field(name, type, defaultFn, hidden) {
			if (this.finalized) {
				console.error("Ignoring attempt to redefine field " + JSON.stringify(name) + " of finalized type " + JSON.stringify(this.typeName));
				return this;
			}
			this.ownFields[name] = new Field(name, Type.from(type), defaultFn, hidden);
			return this;
		}
		finalize() {
			if (!this.finalized) {
				var allFields = this.allFields;
				var allSupertypes = this.allSupertypes;
				this.baseNames.forEach((name) => {
					var def = defCache[name];
					if (def instanceof Def) {
						def.finalize();
						extend(allFields, def.allFields);
						extend(allSupertypes, def.allSupertypes);
					} else {
						var message = "unknown supertype name " + JSON.stringify(name) + " for subtype " + JSON.stringify(this.typeName);
						throw new Error(message);
					}
				});
				extend(allFields, this.ownFields);
				allSupertypes[this.typeName] = this;
				this.fieldNames.length = 0;
				for (var fieldName in allFields) if (hasOwn$6.call(allFields, fieldName) && !allFields[fieldName].hidden) this.fieldNames.push(fieldName);
				Object.defineProperty(namedTypes, this.typeName, {
					enumerable: true,
					value: this.type
				});
				this.finalized = true;
				populateSupertypeList(this.typeName, this.supertypeList);
				if (this.buildable && this.supertypeList.lastIndexOf("Expression") >= 0) wrapExpressionBuilderWithStatement(this.typeName);
			}
		}
	}
	function getSupertypeNames(typeName) {
		if (!hasOwn$6.call(defCache, typeName)) throw new Error("");
		var d = defCache[typeName];
		if (d.finalized !== true) throw new Error("");
		return d.supertypeList.slice(1);
	}
	function computeSupertypeLookupTable(candidates) {
		var table = {};
		var typeNames = Object.keys(defCache);
		var typeNameCount = typeNames.length;
		for (var i = 0; i < typeNameCount; ++i) {
			var typeName = typeNames[i];
			var d = defCache[typeName];
			if (d.finalized !== true) throw new Error("" + typeName);
			for (var j = 0; j < d.supertypeList.length; ++j) {
				var superTypeName = d.supertypeList[j];
				if (hasOwn$6.call(candidates, superTypeName)) {
					table[typeName] = superTypeName;
					break;
				}
			}
		}
		return table;
	}
	var builders = Object.create(null);
	var nodePrototype = {};
	function defineMethod(name, func) {
		var old = nodePrototype[name];
		if (isUndefined.check(func)) delete nodePrototype[name];
		else {
			isFunction.assert(func);
			Object.defineProperty(nodePrototype, name, {
				enumerable: true,
				configurable: true,
				value: func
			});
		}
		return old;
	}
	function getBuilderName(typeName) {
		return typeName.replace(/^[A-Z]+/, function(upperCasePrefix) {
			var len = upperCasePrefix.length;
			switch (len) {
				case 0: return "";
				case 1: return upperCasePrefix.toLowerCase();
				default: return upperCasePrefix.slice(0, len - 1).toLowerCase() + upperCasePrefix.charAt(len - 1);
			}
		});
	}
	function getStatementBuilderName(typeName) {
		typeName = getBuilderName(typeName);
		return typeName.replace(/(Expression)?$/, "Statement");
	}
	var namedTypes = {};
	function getFieldNames(object) {
		var d = defFromValue(object);
		if (d) return d.fieldNames.slice(0);
		if ("type" in object) throw new Error("did not recognize object of type " + JSON.stringify(object.type));
		return Object.keys(object);
	}
	function getFieldValue(object, fieldName) {
		var d = defFromValue(object);
		if (d) {
			var field = d.allFields[fieldName];
			if (field) return field.getValue(object);
		}
		return object && object[fieldName];
	}
	function eachField(object, callback, context) {
		getFieldNames(object).forEach(function(name) {
			callback.call(this, name, getFieldValue(object, name));
		}, context);
	}
	function someField(object, callback, context) {
		return getFieldNames(object).some(function(name) {
			return callback.call(this, name, getFieldValue(object, name));
		}, context);
	}
	function wrapExpressionBuilderWithStatement(typeName) {
		var wrapperName = getStatementBuilderName(typeName);
		if (builders[wrapperName]) return;
		var wrapped = builders[getBuilderName(typeName)];
		if (!wrapped) return;
		const builder = function(...args) {
			return builders.expressionStatement(wrapped.apply(builders, args));
		};
		builder.from = function(...args) {
			return builders.expressionStatement(wrapped.from.apply(builders, args));
		};
		builders[wrapperName] = builder;
	}
	function populateSupertypeList(typeName, list) {
		list.length = 0;
		list.push(typeName);
		var lastSeen = Object.create(null);
		for (var pos = 0; pos < list.length; ++pos) {
			typeName = list[pos];
			var d = defCache[typeName];
			if (d.finalized !== true) throw new Error("");
			if (hasOwn$6.call(lastSeen, typeName)) delete list[lastSeen[typeName]];
			lastSeen[typeName] = pos;
			list.push.apply(list, d.baseNames);
		}
		for (var to = 0, from = to, len = list.length; from < len; ++from) if (hasOwn$6.call(list, from)) list[to++] = list[from];
		list.length = to;
	}
	function extend(into, from) {
		Object.keys(from).forEach(function(name) {
			into[name] = from[name];
		});
		return into;
	}
	function finalize() {
		Object.keys(defCache).forEach(function(name) {
			defCache[name].finalize();
		});
	}
	return {
		Type,
		builtInTypes,
		getSupertypeNames,
		computeSupertypeLookupTable,
		builders,
		defineMethod,
		getBuilderName,
		getStatementBuilderName,
		namedTypes,
		getFieldNames,
		getFieldValue,
		eachField,
		someField,
		finalize
	};
}
//#endregion
//#region vendor/ast-types/src/path.ts
var hasOwn$5 = Object.prototype.hasOwnProperty;
function pathPlugin(fork) {
	var types = fork.use(typesPlugin);
	var isArray = types.builtInTypes.array;
	var isNumber = types.builtInTypes.number;
	const Path = function Path(value, parentPath, name) {
		if (!(this instanceof Path)) throw new Error("Path constructor cannot be invoked without 'new'");
		if (parentPath) {
			if (!(parentPath instanceof Path)) throw new Error("");
		} else {
			parentPath = null;
			name = null;
		}
		this.value = value;
		this.parentPath = parentPath;
		this.name = name;
		this.__childCache = null;
	};
	var Pp = Path.prototype;
	function getChildCache(path) {
		return path.__childCache || (path.__childCache = Object.create(null));
	}
	function getChildPath(path, name) {
		var cache = getChildCache(path);
		var actualChildValue = path.getValueProperty(name);
		var childPath = cache[name];
		if (!hasOwn$5.call(cache, name) || childPath.value !== actualChildValue) childPath = cache[name] = new path.constructor(actualChildValue, path, name);
		return childPath;
	}
	Pp.getValueProperty = function getValueProperty(name) {
		return this.value[name];
	};
	Pp.get = function get(...names) {
		var path = this;
		var count = names.length;
		for (var i = 0; i < count; ++i) path = getChildPath(path, names[i]);
		return path;
	};
	Pp.each = function each(callback, context) {
		var childPaths = [];
		var len = this.value.length;
		var i = 0;
		for (var i = 0; i < len; ++i) if (hasOwn$5.call(this.value, i)) childPaths[i] = this.get(i);
		context = context || this;
		for (i = 0; i < len; ++i) if (hasOwn$5.call(childPaths, i)) callback.call(context, childPaths[i]);
	};
	Pp.map = function map(callback, context) {
		var result = [];
		this.each(function(childPath) {
			result.push(callback.call(this, childPath));
		}, context);
		return result;
	};
	Pp.filter = function filter(callback, context) {
		var result = [];
		this.each(function(childPath) {
			if (callback.call(this, childPath)) result.push(childPath);
		}, context);
		return result;
	};
	function emptyMoves() {}
	function getMoves(path, offset, start, end) {
		isArray.assert(path.value);
		if (offset === 0) return emptyMoves;
		var length = path.value.length;
		if (length < 1) return emptyMoves;
		var argc = arguments.length;
		if (argc === 2) {
			start = 0;
			end = length;
		} else if (argc === 3) {
			start = Math.max(start, 0);
			end = length;
		} else {
			start = Math.max(start, 0);
			end = Math.min(end, length);
		}
		isNumber.assert(start);
		isNumber.assert(end);
		var moves = Object.create(null);
		var cache = getChildCache(path);
		for (var i = start; i < end; ++i) if (hasOwn$5.call(path.value, i)) {
			var childPath = path.get(i);
			if (childPath.name !== i) throw new Error("");
			var newIndex = i + offset;
			childPath.name = newIndex;
			moves[newIndex] = childPath;
			delete cache[i];
		}
		delete cache.length;
		return function() {
			for (var newIndex in moves) {
				var childPath = moves[newIndex];
				if (childPath.name !== +newIndex) throw new Error("");
				cache[newIndex] = childPath;
				path.value[newIndex] = childPath.value;
			}
		};
	}
	Pp.shift = function shift() {
		var move = getMoves(this, -1);
		var result = this.value.shift();
		move();
		return result;
	};
	Pp.unshift = function unshift(...args) {
		var move = getMoves(this, args.length);
		var result = this.value.unshift.apply(this.value, args);
		move();
		return result;
	};
	Pp.push = function push(...args) {
		isArray.assert(this.value);
		delete getChildCache(this).length;
		return this.value.push.apply(this.value, args);
	};
	Pp.pop = function pop() {
		isArray.assert(this.value);
		var cache = getChildCache(this);
		delete cache[this.value.length - 1];
		delete cache.length;
		return this.value.pop();
	};
	Pp.insertAt = function insertAt(index) {
		var argc = arguments.length;
		var move = getMoves(this, argc - 1, index);
		if (move === emptyMoves && argc <= 1) return this;
		index = Math.max(index, 0);
		for (var i = 1; i < argc; ++i) this.value[index + i - 1] = arguments[i];
		move();
		return this;
	};
	Pp.insertBefore = function insertBefore(...args) {
		var pp = this.parentPath;
		var argc = args.length;
		var insertAtArgs = [this.name];
		for (var i = 0; i < argc; ++i) insertAtArgs.push(args[i]);
		return pp.insertAt.apply(pp, insertAtArgs);
	};
	Pp.insertAfter = function insertAfter(...args) {
		var pp = this.parentPath;
		var argc = args.length;
		var insertAtArgs = [this.name + 1];
		for (var i = 0; i < argc; ++i) insertAtArgs.push(args[i]);
		return pp.insertAt.apply(pp, insertAtArgs);
	};
	function repairRelationshipWithParent(path) {
		if (!(path instanceof Path)) throw new Error("");
		var pp = path.parentPath;
		if (!pp) return path;
		var parentValue = pp.value;
		var parentCache = getChildCache(pp);
		if (parentValue[path.name] === path.value) parentCache[path.name] = path;
		else if (isArray.check(parentValue)) {
			var i = parentValue.indexOf(path.value);
			if (i >= 0) parentCache[path.name = i] = path;
		} else {
			parentValue[path.name] = path.value;
			parentCache[path.name] = path;
		}
		if (parentValue[path.name] !== path.value) throw new Error("");
		if (path.parentPath.get(path.name) !== path) throw new Error("");
		return path;
	}
	Pp.replace = function replace(replacement) {
		var results = [];
		var parentValue = this.parentPath.value;
		var parentCache = getChildCache(this.parentPath);
		var count = arguments.length;
		repairRelationshipWithParent(this);
		if (isArray.check(parentValue)) {
			var originalLength = parentValue.length;
			var move = getMoves(this.parentPath, count - 1, this.name + 1);
			var spliceArgs = [this.name, 1];
			for (var i = 0; i < count; ++i) spliceArgs.push(arguments[i]);
			if (parentValue.splice.apply(parentValue, spliceArgs)[0] !== this.value) throw new Error("");
			if (parentValue.length !== originalLength - 1 + count) throw new Error("");
			move();
			if (count === 0) {
				delete this.value;
				delete parentCache[this.name];
				this.__childCache = null;
			} else {
				if (parentValue[this.name] !== replacement) throw new Error("");
				if (this.value !== replacement) {
					this.value = replacement;
					this.__childCache = null;
				}
				for (i = 0; i < count; ++i) results.push(this.parentPath.get(this.name + i));
				if (results[0] !== this) throw new Error("");
			}
		} else if (count === 1) {
			if (this.value !== replacement) this.__childCache = null;
			this.value = parentValue[this.name] = replacement;
			results.push(this);
		} else if (count === 0) {
			delete parentValue[this.name];
			delete this.value;
			this.__childCache = null;
		} else throw new Error("Could not replace path");
		return results;
	};
	return Path;
}
//#endregion
//#region vendor/ast-types/src/scope.ts
var hasOwn$4 = Object.prototype.hasOwnProperty;
function scopePlugin(fork) {
	var types = fork.use(typesPlugin);
	var Type = types.Type;
	var namedTypes = types.namedTypes;
	var Node = namedTypes.Node;
	var Expression = namedTypes.Expression;
	var isArray = types.builtInTypes.array;
	var b = types.builders;
	const Scope = function Scope(path, parentScope) {
		if (!(this instanceof Scope)) throw new Error("Scope constructor cannot be invoked without 'new'");
		if (!TypeParameterScopeType.check(path.value)) ScopeType.assert(path.value);
		var depth;
		if (parentScope) {
			if (!(parentScope instanceof Scope)) throw new Error("");
			depth = parentScope.depth + 1;
		} else {
			parentScope = null;
			depth = 0;
		}
		Object.defineProperties(this, {
			path: { value: path },
			node: { value: path.value },
			isGlobal: {
				value: !parentScope,
				enumerable: true
			},
			depth: { value: depth },
			parent: { value: parentScope },
			bindings: { value: {} },
			types: { value: {} }
		});
	};
	var ScopeType = Type.or(namedTypes.Program, namedTypes.Function, namedTypes.CatchClause);
	var TypeParameterScopeType = Type.or(namedTypes.Function, namedTypes.ClassDeclaration, namedTypes.ClassExpression, namedTypes.InterfaceDeclaration, namedTypes.TSInterfaceDeclaration, namedTypes.TypeAlias, namedTypes.TSTypeAliasDeclaration);
	var FlowOrTSTypeParameterType = Type.or(namedTypes.TypeParameter, namedTypes.TSTypeParameter);
	Scope.isEstablishedBy = function(node) {
		return ScopeType.check(node) || TypeParameterScopeType.check(node);
	};
	var Sp = Scope.prototype;
	Sp.didScan = false;
	Sp.declares = function(name) {
		this.scan();
		return hasOwn$4.call(this.bindings, name);
	};
	Sp.declaresType = function(name) {
		this.scan();
		return hasOwn$4.call(this.types, name);
	};
	Sp.declareTemporary = function(prefix) {
		if (prefix) {
			if (!/^[a-z$_]/i.test(prefix)) throw new Error("");
		} else prefix = "t$";
		prefix += this.depth.toString(36) + "$";
		this.scan();
		var index = 0;
		while (this.declares(prefix + index)) ++index;
		var name = prefix + index;
		return this.bindings[name] = types.builders.identifier(name);
	};
	Sp.injectTemporary = function(identifier, init) {
		identifier || (identifier = this.declareTemporary());
		var bodyPath = this.path.get("body");
		if (namedTypes.BlockStatement.check(bodyPath.value)) bodyPath = bodyPath.get("body");
		bodyPath.unshift(b.variableDeclaration("var", [b.variableDeclarator(identifier, init || null)]));
		return identifier;
	};
	Sp.scan = function(force) {
		if (force || !this.didScan) {
			for (var name in this.bindings) delete this.bindings[name];
			for (var name in this.types) delete this.types[name];
			scanScope(this.path, this.bindings, this.types);
			this.didScan = true;
		}
	};
	Sp.getBindings = function() {
		this.scan();
		return this.bindings;
	};
	Sp.getTypes = function() {
		this.scan();
		return this.types;
	};
	function scanScope(path, bindings, scopeTypes) {
		var node = path.value;
		if (TypeParameterScopeType.check(node)) {
			const params = path.get("typeParameters", "params");
			if (isArray.check(params.value)) params.each((childPath) => {
				addTypeParameter(childPath, scopeTypes);
			});
		}
		if (ScopeType.check(node)) {
			if (namedTypes.CatchClause.check(node)) addPattern(path.get("param"), bindings);
			else recursiveScanScope(path, bindings, scopeTypes);
		}
	}
	function recursiveScanScope(path, bindings, scopeTypes) {
		var node = path.value;
		if (path.parent && namedTypes.FunctionExpression.check(path.parent.node) && path.parent.node.id) addPattern(path.parent.get("id"), bindings);
		if (!node) {} else if (isArray.check(node)) path.each((childPath) => {
			recursiveScanChild(childPath, bindings, scopeTypes);
		});
		else if (namedTypes.Function.check(node)) {
			path.get("params").each((paramPath) => {
				addPattern(paramPath, bindings);
			});
			recursiveScanChild(path.get("body"), bindings, scopeTypes);
			recursiveScanScope(path.get("typeParameters"), bindings, scopeTypes);
		} else if (namedTypes.TypeAlias && namedTypes.TypeAlias.check(node) || namedTypes.InterfaceDeclaration && namedTypes.InterfaceDeclaration.check(node) || namedTypes.TSTypeAliasDeclaration && namedTypes.TSTypeAliasDeclaration.check(node) || namedTypes.TSInterfaceDeclaration && namedTypes.TSInterfaceDeclaration.check(node)) addTypePattern(path.get("id"), scopeTypes);
		else if (namedTypes.VariableDeclarator.check(node)) {
			addPattern(path.get("id"), bindings);
			recursiveScanChild(path.get("init"), bindings, scopeTypes);
		} else if (node.type === "ImportSpecifier" || node.type === "ImportNamespaceSpecifier" || node.type === "ImportDefaultSpecifier") addPattern(path.get(node.local ? "local" : node.name ? "name" : "id"), bindings);
		else if (Node.check(node) && !Expression.check(node)) types.eachField(node, function(name, child) {
			var childPath = path.get(name);
			if (!pathHasValue(childPath, child)) throw new Error("");
			recursiveScanChild(childPath, bindings, scopeTypes);
		});
	}
	function pathHasValue(path, value) {
		if (path.value === value) return true;
		if (Array.isArray(path.value) && path.value.length === 0 && Array.isArray(value) && value.length === 0) return true;
		return false;
	}
	function recursiveScanChild(path, bindings, scopeTypes) {
		var node = path.value;
		if (!node || Expression.check(node)) {} else if (namedTypes.FunctionDeclaration.check(node) && node.id !== null) addPattern(path.get("id"), bindings);
		else if (namedTypes.ClassDeclaration && namedTypes.ClassDeclaration.check(node) && node.id !== null) {
			addPattern(path.get("id"), bindings);
			recursiveScanScope(path.get("typeParameters"), bindings, scopeTypes);
		} else if (namedTypes.InterfaceDeclaration && namedTypes.InterfaceDeclaration.check(node) || namedTypes.TSInterfaceDeclaration && namedTypes.TSInterfaceDeclaration.check(node)) addTypePattern(path.get("id"), scopeTypes);
		else if (ScopeType.check(node)) {
			if (namedTypes.CatchClause.check(node) && namedTypes.Identifier.check(node.param)) {
				var catchParamName = node.param.name;
				var hadBinding = hasOwn$4.call(bindings, catchParamName);
				recursiveScanScope(path.get("body"), bindings, scopeTypes);
				if (!hadBinding) delete bindings[catchParamName];
			}
		} else recursiveScanScope(path, bindings, scopeTypes);
	}
	function addPattern(patternPath, bindings) {
		var pattern = patternPath.value;
		namedTypes.Pattern.assert(pattern);
		if (namedTypes.Identifier.check(pattern)) {
			if (hasOwn$4.call(bindings, pattern.name)) bindings[pattern.name].push(patternPath);
			else bindings[pattern.name] = [patternPath];
		} else if (namedTypes.AssignmentPattern && namedTypes.AssignmentPattern.check(pattern)) addPattern(patternPath.get("left"), bindings);
		else if (namedTypes.ObjectPattern && namedTypes.ObjectPattern.check(pattern)) patternPath.get("properties").each(function(propertyPath) {
			var property = propertyPath.value;
			if (namedTypes.Pattern.check(property)) addPattern(propertyPath, bindings);
			else if (namedTypes.Property.check(property) || namedTypes.ObjectProperty && namedTypes.ObjectProperty.check(property)) addPattern(propertyPath.get("value"), bindings);
			else if (namedTypes.SpreadProperty && namedTypes.SpreadProperty.check(property)) addPattern(propertyPath.get("argument"), bindings);
		});
		else if (namedTypes.ArrayPattern && namedTypes.ArrayPattern.check(pattern)) patternPath.get("elements").each(function(elementPath) {
			var element = elementPath.value;
			if (namedTypes.Pattern.check(element)) addPattern(elementPath, bindings);
			else if (namedTypes.SpreadElement && namedTypes.SpreadElement.check(element)) addPattern(elementPath.get("argument"), bindings);
		});
		else if (namedTypes.PropertyPattern && namedTypes.PropertyPattern.check(pattern)) addPattern(patternPath.get("pattern"), bindings);
		else if (namedTypes.SpreadElementPattern && namedTypes.SpreadElementPattern.check(pattern) || namedTypes.RestElement && namedTypes.RestElement.check(pattern) || namedTypes.SpreadPropertyPattern && namedTypes.SpreadPropertyPattern.check(pattern)) addPattern(patternPath.get("argument"), bindings);
	}
	function addTypePattern(patternPath, types) {
		var pattern = patternPath.value;
		namedTypes.Pattern.assert(pattern);
		if (namedTypes.Identifier.check(pattern)) {
			if (hasOwn$4.call(types, pattern.name)) types[pattern.name].push(patternPath);
			else types[pattern.name] = [patternPath];
		}
	}
	function addTypeParameter(parameterPath, types) {
		var parameter = parameterPath.value;
		FlowOrTSTypeParameterType.assert(parameter);
		if (hasOwn$4.call(types, parameter.name)) types[parameter.name].push(parameterPath);
		else types[parameter.name] = [parameterPath];
	}
	Sp.lookup = function(name) {
		for (var scope = this; scope; scope = scope.parent) if (scope.declares(name)) break;
		return scope;
	};
	Sp.lookupType = function(name) {
		for (var scope = this; scope; scope = scope.parent) if (scope.declaresType(name)) break;
		return scope;
	};
	Sp.getGlobalScope = function() {
		var scope = this;
		while (!scope.isGlobal) scope = scope.parent;
		return scope;
	};
	return Scope;
}
//#endregion
//#region vendor/ast-types/src/node-path.ts
function nodePathPlugin(fork) {
	var types = fork.use(typesPlugin);
	var n = types.namedTypes;
	var b = types.builders;
	var isNumber = types.builtInTypes.number;
	var isArray = types.builtInTypes.array;
	var Path = fork.use(pathPlugin);
	var Scope = fork.use(scopePlugin);
	const NodePath = function NodePath(value, parentPath, name) {
		if (!(this instanceof NodePath)) throw new Error("NodePath constructor cannot be invoked without 'new'");
		Path.call(this, value, parentPath, name);
	};
	var NPp = NodePath.prototype = Object.create(Path.prototype, { constructor: {
		value: NodePath,
		enumerable: false,
		writable: true,
		configurable: true
	} });
	Object.defineProperties(NPp, {
		node: { get: function() {
			Object.defineProperty(this, "node", {
				configurable: true,
				value: this._computeNode()
			});
			return this.node;
		} },
		parent: { get: function() {
			Object.defineProperty(this, "parent", {
				configurable: true,
				value: this._computeParent()
			});
			return this.parent;
		} },
		scope: { get: function() {
			Object.defineProperty(this, "scope", {
				configurable: true,
				value: this._computeScope()
			});
			return this.scope;
		} }
	});
	NPp.replace = function() {
		delete this.node;
		delete this.parent;
		delete this.scope;
		return Path.prototype.replace.apply(this, arguments);
	};
	NPp.prune = function() {
		var remainingNodePath = this.parent;
		this.replace();
		return cleanUpNodesAfterPrune(remainingNodePath);
	};
	NPp._computeNode = function() {
		var value = this.value;
		if (n.Node.check(value)) return value;
		var pp = this.parentPath;
		return pp && pp.node || null;
	};
	NPp._computeParent = function() {
		var value = this.value;
		var pp = this.parentPath;
		if (!n.Node.check(value)) {
			while (pp && !n.Node.check(pp.value)) pp = pp.parentPath;
			if (pp) pp = pp.parentPath;
		}
		while (pp && !n.Node.check(pp.value)) pp = pp.parentPath;
		return pp || null;
	};
	NPp._computeScope = function() {
		var value = this.value;
		var pp = this.parentPath;
		var scope = pp && pp.scope;
		if (n.Node.check(value) && Scope.isEstablishedBy(value)) scope = new Scope(this, scope);
		return scope || null;
	};
	NPp.getValueProperty = function(name) {
		return types.getFieldValue(this.value, name);
	};
	/**
	* Determine whether this.node needs to be wrapped in parentheses in order
	* for a parser to reproduce the same local AST structure.
	*
	* For instance, in the expression `(1 + 2) * 3`, the BinaryExpression
	* whose operator is "+" needs parentheses, because `1 + 2 * 3` would
	* parse differently.
	*
	* If assumeExpressionContext === true, we don't worry about edge cases
	* like an anonymous FunctionExpression appearing lexically first in its
	* enclosing statement and thus needing parentheses to avoid being parsed
	* as a FunctionDeclaration with a missing name.
	*/
	NPp.needsParens = function(assumeExpressionContext) {
		var pp = this.parentPath;
		if (!pp) return false;
		var node = this.value;
		if (!n.Expression.check(node)) return false;
		if (node.type === "Identifier") return false;
		while (!n.Node.check(pp.value)) {
			pp = pp.parentPath;
			if (!pp) return false;
		}
		var parent = pp.value;
		switch (node.type) {
			case "UnaryExpression":
			case "SpreadElement":
			case "SpreadProperty": return parent.type === "MemberExpression" && this.name === "object" && parent.object === node;
			case "BinaryExpression":
			case "LogicalExpression": switch (parent.type) {
				case "CallExpression": return this.name === "callee" && parent.callee === node;
				case "UnaryExpression":
				case "SpreadElement":
				case "SpreadProperty": return true;
				case "MemberExpression": return this.name === "object" && parent.object === node;
				case "BinaryExpression":
				case "LogicalExpression": {
					const n = node;
					const pp = PRECEDENCE[parent.operator];
					const np = PRECEDENCE[n.operator];
					if (pp > np) return true;
					if (pp === np && this.name === "right") {
						if (parent.right !== n) throw new Error("Nodes must be equal");
						return true;
					}
				}
				default: return false;
			}
			case "SequenceExpression": switch (parent.type) {
				case "ForStatement": return false;
				case "ExpressionStatement": return this.name !== "expression";
				default: return true;
			}
			case "YieldExpression": switch (parent.type) {
				case "BinaryExpression":
				case "LogicalExpression":
				case "UnaryExpression":
				case "SpreadElement":
				case "SpreadProperty":
				case "CallExpression":
				case "MemberExpression":
				case "NewExpression":
				case "ConditionalExpression":
				case "YieldExpression": return true;
				default: return false;
			}
			case "Literal": return parent.type === "MemberExpression" && isNumber.check(node.value) && this.name === "object" && parent.object === node;
			case "AssignmentExpression":
			case "ConditionalExpression": switch (parent.type) {
				case "UnaryExpression":
				case "SpreadElement":
				case "SpreadProperty":
				case "BinaryExpression":
				case "LogicalExpression": return true;
				case "CallExpression": return this.name === "callee" && parent.callee === node;
				case "ConditionalExpression": return this.name === "test" && parent.test === node;
				case "MemberExpression": return this.name === "object" && parent.object === node;
				default: return false;
			}
			default: if (parent.type === "NewExpression" && this.name === "callee" && parent.callee === node) return containsCallExpression(node);
		}
		if (assumeExpressionContext !== true && !this.canBeFirstInStatement() && this.firstInStatement()) return true;
		return false;
	};
	function isBinary(node) {
		return n.BinaryExpression.check(node) || n.LogicalExpression.check(node);
	}
	var PRECEDENCE = {};
	[
		["||"],
		["&&"],
		["|"],
		["^"],
		["&"],
		[
			"==",
			"===",
			"!=",
			"!=="
		],
		[
			"<",
			">",
			"<=",
			">=",
			"in",
			"instanceof"
		],
		[
			">>",
			"<<",
			">>>"
		],
		["+", "-"],
		[
			"*",
			"/",
			"%"
		]
	].forEach(function(tier, i) {
		tier.forEach(function(op) {
			PRECEDENCE[op] = i;
		});
	});
	function containsCallExpression(node) {
		if (n.CallExpression.check(node)) return true;
		if (isArray.check(node)) return node.some(containsCallExpression);
		if (n.Node.check(node)) return types.someField(node, function(_name, child) {
			return containsCallExpression(child);
		});
		return false;
	}
	NPp.canBeFirstInStatement = function() {
		var node = this.node;
		return !n.FunctionExpression.check(node) && !n.ObjectExpression.check(node);
	};
	NPp.firstInStatement = function() {
		return firstInStatement(this);
	};
	function firstInStatement(path) {
		for (var node, parent; path.parent; path = path.parent) {
			node = path.node;
			parent = path.parent.node;
			if (n.BlockStatement.check(parent) && path.parent.name === "body" && path.name === 0) {
				if (parent.body[0] !== node) throw new Error("Nodes must be equal");
				return true;
			}
			if (n.ExpressionStatement.check(parent) && path.name === "expression") {
				if (parent.expression !== node) throw new Error("Nodes must be equal");
				return true;
			}
			if (n.SequenceExpression.check(parent) && path.parent.name === "expressions" && path.name === 0) {
				if (parent.expressions[0] !== node) throw new Error("Nodes must be equal");
				continue;
			}
			if (n.CallExpression.check(parent) && path.name === "callee") {
				if (parent.callee !== node) throw new Error("Nodes must be equal");
				continue;
			}
			if (n.MemberExpression.check(parent) && path.name === "object") {
				if (parent.object !== node) throw new Error("Nodes must be equal");
				continue;
			}
			if (n.ConditionalExpression.check(parent) && path.name === "test") {
				if (parent.test !== node) throw new Error("Nodes must be equal");
				continue;
			}
			if (isBinary(parent) && path.name === "left") {
				if (parent.left !== node) throw new Error("Nodes must be equal");
				continue;
			}
			if (n.UnaryExpression.check(parent) && !parent.prefix && path.name === "argument") {
				if (parent.argument !== node) throw new Error("Nodes must be equal");
				continue;
			}
			return false;
		}
		return true;
	}
	/**
	* Pruning certain nodes will result in empty or incomplete nodes, here we clean those nodes up.
	*/
	function cleanUpNodesAfterPrune(remainingNodePath) {
		if (n.VariableDeclaration.check(remainingNodePath.node)) {
			var declarations = remainingNodePath.get("declarations").value;
			if (!declarations || declarations.length === 0) return remainingNodePath.prune();
		} else if (n.ExpressionStatement.check(remainingNodePath.node)) {
			if (!remainingNodePath.get("expression").value) return remainingNodePath.prune();
		} else if (n.IfStatement.check(remainingNodePath.node)) cleanUpIfStatementAfterPrune(remainingNodePath);
		return remainingNodePath;
	}
	function cleanUpIfStatementAfterPrune(ifStatement) {
		var testExpression = ifStatement.get("test").value;
		var alternate = ifStatement.get("alternate").value;
		var consequent = ifStatement.get("consequent").value;
		if (!consequent && !alternate) {
			var testExpressionStatement = b.expressionStatement(testExpression);
			ifStatement.replace(testExpressionStatement);
		} else if (!consequent && alternate) {
			var negatedTestExpression = b.unaryExpression("!", testExpression, true);
			if (n.UnaryExpression.check(testExpression) && testExpression.operator === "!") negatedTestExpression = testExpression.argument;
			ifStatement.get("test").replace(negatedTestExpression);
			ifStatement.get("consequent").replace(alternate);
			ifStatement.get("alternate").replace();
		}
	}
	return NodePath;
}
//#endregion
//#region vendor/ast-types/src/path-visitor.ts
var hasOwn$3 = Object.prototype.hasOwnProperty;
function pathVisitorPlugin(fork) {
	var types = fork.use(typesPlugin);
	var NodePath = fork.use(nodePathPlugin);
	var isArray = types.builtInTypes.array;
	var isObject = types.builtInTypes.object;
	var isFunction = types.builtInTypes.function;
	var undefined;
	const PathVisitor = function PathVisitor() {
		if (!(this instanceof PathVisitor)) throw new Error("PathVisitor constructor cannot be invoked without 'new'");
		this._reusableContextStack = [];
		this._methodNameTable = computeMethodNameTable(this);
		this._shouldVisitComments = hasOwn$3.call(this._methodNameTable, "Block") || hasOwn$3.call(this._methodNameTable, "Line");
		this.Context = makeContextConstructor(this);
		this._visiting = false;
		this._changeReported = false;
	};
	function computeMethodNameTable(visitor) {
		var typeNames = Object.create(null);
		for (var methodName in visitor) if (/^visit[A-Z]/.test(methodName)) typeNames[methodName.slice(5)] = true;
		var supertypeTable = types.computeSupertypeLookupTable(typeNames);
		var methodNameTable = Object.create(null);
		var typeNameKeys = Object.keys(supertypeTable);
		var typeNameCount = typeNameKeys.length;
		for (var i = 0; i < typeNameCount; ++i) {
			var typeName = typeNameKeys[i];
			methodName = "visit" + supertypeTable[typeName];
			if (isFunction.check(visitor[methodName])) methodNameTable[typeName] = methodName;
		}
		return methodNameTable;
	}
	PathVisitor.fromMethodsObject = function fromMethodsObject(methods) {
		if (methods instanceof PathVisitor) return methods;
		if (!isObject.check(methods)) return new PathVisitor();
		const Visitor = function Visitor() {
			if (!(this instanceof Visitor)) throw new Error("Visitor constructor cannot be invoked without 'new'");
			PathVisitor.call(this);
		};
		var Vp = Visitor.prototype = Object.create(PVp);
		Vp.constructor = Visitor;
		extend(Vp, methods);
		extend(Visitor, PathVisitor);
		isFunction.assert(Visitor.fromMethodsObject);
		isFunction.assert(Visitor.visit);
		return new Visitor();
	};
	function extend(target, source) {
		for (var property in source) if (hasOwn$3.call(source, property)) target[property] = source[property];
		return target;
	}
	PathVisitor.visit = function visit(node, methods) {
		return PathVisitor.fromMethodsObject(methods).visit(node);
	};
	var PVp = PathVisitor.prototype;
	PVp.visit = function() {
		if (this._visiting) throw new Error("Recursively calling visitor.visit(path) resets visitor state. Try this.visit(path) or this.traverse(path) instead.");
		this._visiting = true;
		this._changeReported = false;
		this._abortRequested = false;
		var argc = arguments.length;
		var args = new Array(argc);
		for (var i = 0; i < argc; ++i) args[i] = arguments[i];
		if (!(args[0] instanceof NodePath)) args[0] = new NodePath({ root: args[0] }).get("root");
		this.reset.apply(this, args);
		var didNotThrow;
		try {
			var root = this.visitWithoutReset(args[0]);
			didNotThrow = true;
		} finally {
			this._visiting = false;
			if (!didNotThrow && this._abortRequested) return args[0].value;
		}
		return root;
	};
	PVp.AbortRequest = function AbortRequest() {};
	PVp.abort = function() {
		var visitor = this;
		visitor._abortRequested = true;
		var request = new visitor.AbortRequest();
		request.cancel = function() {
			visitor._abortRequested = false;
		};
		throw request;
	};
	PVp.reset = function(_path) {};
	PVp.visitWithoutReset = function(path) {
		if (this instanceof this.Context) return this.visitor.visitWithoutReset(path);
		if (!(path instanceof NodePath)) throw new Error("");
		var value = path.value;
		var methodName = value && typeof value === "object" && typeof value.type === "string" && this._methodNameTable[value.type];
		if (methodName) {
			var context = this.acquireContext(path);
			try {
				return context.invokeVisitorMethod(methodName);
			} finally {
				this.releaseContext(context);
			}
		} else return visitChildren(path, this);
	};
	function visitChildren(path, visitor) {
		if (!(path instanceof NodePath)) throw new Error("");
		if (!(visitor instanceof PathVisitor)) throw new Error("");
		var value = path.value;
		if (isArray.check(value)) path.each(visitor.visitWithoutReset, visitor);
		else if (!isObject.check(value)) {} else {
			var childNames = types.getFieldNames(value);
			if (visitor._shouldVisitComments && value.comments && childNames.indexOf("comments") < 0) childNames.push("comments");
			var childCount = childNames.length;
			var childPaths = [];
			for (var i = 0; i < childCount; ++i) {
				var childName = childNames[i];
				if (!hasOwn$3.call(value, childName)) value[childName] = types.getFieldValue(value, childName);
				childPaths.push(path.get(childName));
			}
			for (var i = 0; i < childCount; ++i) visitor.visitWithoutReset(childPaths[i]);
		}
		return path.value;
	}
	PVp.acquireContext = function(path) {
		if (this._reusableContextStack.length === 0) return new this.Context(path);
		return this._reusableContextStack.pop().reset(path);
	};
	PVp.releaseContext = function(context) {
		if (!(context instanceof this.Context)) throw new Error("");
		this._reusableContextStack.push(context);
		context.currentPath = null;
	};
	PVp.reportChanged = function() {
		this._changeReported = true;
	};
	PVp.wasChangeReported = function() {
		return this._changeReported;
	};
	function makeContextConstructor(visitor) {
		function Context(path) {
			if (!(this instanceof Context)) throw new Error("");
			if (!(this instanceof PathVisitor)) throw new Error("");
			if (!(path instanceof NodePath)) throw new Error("");
			Object.defineProperty(this, "visitor", {
				value: visitor,
				writable: false,
				enumerable: true,
				configurable: false
			});
			this.currentPath = path;
			this.needToCallTraverse = true;
			Object.seal(this);
		}
		if (!(visitor instanceof PathVisitor)) throw new Error("");
		var Cp = Context.prototype = Object.create(visitor);
		Cp.constructor = Context;
		extend(Cp, sharedContextProtoMethods);
		return Context;
	}
	var sharedContextProtoMethods = Object.create(null);
	sharedContextProtoMethods.reset = function reset(path) {
		if (!(this instanceof this.Context)) throw new Error("");
		if (!(path instanceof NodePath)) throw new Error("");
		this.currentPath = path;
		this.needToCallTraverse = true;
		return this;
	};
	sharedContextProtoMethods.invokeVisitorMethod = function invokeVisitorMethod(methodName) {
		if (!(this instanceof this.Context)) throw new Error("");
		if (!(this.currentPath instanceof NodePath)) throw new Error("");
		var result = this.visitor[methodName].call(this, this.currentPath);
		if (result === false) this.needToCallTraverse = false;
		else if (result !== undefined) {
			this.currentPath = this.currentPath.replace(result)[0];
			if (this.needToCallTraverse) this.traverse(this.currentPath);
		}
		if (this.needToCallTraverse !== false) throw new Error("Must either call this.traverse or return false in " + methodName);
		var path = this.currentPath;
		return path && path.value;
	};
	sharedContextProtoMethods.traverse = function traverse(path, newVisitor) {
		if (!(this instanceof this.Context)) throw new Error("");
		if (!(path instanceof NodePath)) throw new Error("");
		if (!(this.currentPath instanceof NodePath)) throw new Error("");
		this.needToCallTraverse = false;
		return visitChildren(path, PathVisitor.fromMethodsObject(newVisitor || this.visitor));
	};
	sharedContextProtoMethods.visit = function visit(path, newVisitor) {
		if (!(this instanceof this.Context)) throw new Error("");
		if (!(path instanceof NodePath)) throw new Error("");
		if (!(this.currentPath instanceof NodePath)) throw new Error("");
		this.needToCallTraverse = false;
		return PathVisitor.fromMethodsObject(newVisitor || this.visitor).visitWithoutReset(path);
	};
	sharedContextProtoMethods.reportChanged = function reportChanged() {
		this.visitor.reportChanged();
	};
	sharedContextProtoMethods.abort = function abort() {
		this.needToCallTraverse = false;
		this.visitor.abort();
	};
	return PathVisitor;
}
//#endregion
//#region vendor/ast-types/src/equiv.ts
function equiv_default(fork) {
	var types = fork.use(typesPlugin);
	var getFieldNames = types.getFieldNames;
	var getFieldValue = types.getFieldValue;
	var isArray = types.builtInTypes.array;
	var isObject = types.builtInTypes.object;
	var isDate = types.builtInTypes.Date;
	var isRegExp = types.builtInTypes.RegExp;
	var hasOwn = Object.prototype.hasOwnProperty;
	function astNodesAreEquivalent(a, b, problemPath) {
		if (isArray.check(problemPath)) problemPath.length = 0;
		else problemPath = null;
		return areEquivalent(a, b, problemPath);
	}
	astNodesAreEquivalent.assert = function(a, b) {
		var problemPath = [];
		if (!astNodesAreEquivalent(a, b, problemPath)) {
			if (problemPath.length === 0) {
				if (a !== b) throw new Error("Nodes must be equal");
			} else throw new Error("Nodes differ in the following path: " + problemPath.map(subscriptForProperty).join(""));
		}
	};
	function subscriptForProperty(property) {
		if (/[_$a-z][_$a-z0-9]*/i.test(property)) return "." + property;
		return "[" + JSON.stringify(property) + "]";
	}
	function areEquivalent(a, b, problemPath) {
		if (a === b) return true;
		if (isArray.check(a)) return arraysAreEquivalent(a, b, problemPath);
		if (isObject.check(a)) return objectsAreEquivalent(a, b, problemPath);
		if (isDate.check(a)) return isDate.check(b) && +a === +b;
		if (isRegExp.check(a)) return isRegExp.check(b) && a.source === b.source && a.global === b.global && a.multiline === b.multiline && a.ignoreCase === b.ignoreCase;
		return a == b;
	}
	function arraysAreEquivalent(a, b, problemPath) {
		isArray.assert(a);
		var aLength = a.length;
		if (!isArray.check(b) || b.length !== aLength) {
			if (problemPath) problemPath.push("length");
			return false;
		}
		for (var i = 0; i < aLength; ++i) {
			if (problemPath) problemPath.push(i);
			if (i in a !== i in b) return false;
			if (!areEquivalent(a[i], b[i], problemPath)) return false;
			if (problemPath) {
				var problemPathTail = problemPath.pop();
				if (problemPathTail !== i) throw new Error("" + problemPathTail);
			}
		}
		return true;
	}
	function objectsAreEquivalent(a, b, problemPath) {
		isObject.assert(a);
		if (!isObject.check(b)) return false;
		if (a.type !== b.type) {
			if (problemPath) problemPath.push("type");
			return false;
		}
		var aNames = getFieldNames(a);
		var aNameCount = aNames.length;
		var bNames = getFieldNames(b);
		var bNameCount = bNames.length;
		if (aNameCount === bNameCount) {
			for (var i = 0; i < aNameCount; ++i) {
				var name = aNames[i];
				var aChild = getFieldValue(a, name);
				var bChild = getFieldValue(b, name);
				if (problemPath) problemPath.push(name);
				if (!areEquivalent(aChild, bChild, problemPath)) return false;
				if (problemPath) {
					var problemPathTail = problemPath.pop();
					if (problemPathTail !== name) throw new Error("" + problemPathTail);
				}
			}
			return true;
		}
		if (!problemPath) return false;
		var seenNames = Object.create(null);
		for (i = 0; i < aNameCount; ++i) seenNames[aNames[i]] = true;
		for (i = 0; i < bNameCount; ++i) {
			name = bNames[i];
			if (!hasOwn.call(seenNames, name)) {
				problemPath.push(name);
				return false;
			}
			delete seenNames[name];
		}
		for (name in seenNames) {
			problemPath.push(name);
			break;
		}
		return false;
	}
	return astNodesAreEquivalent;
}
//#endregion
//#region vendor/ast-types/src/fork.ts
function fork_default(plugins) {
	const fork = createFork();
	const types = fork.use(typesPlugin);
	plugins.forEach(fork.use);
	types.finalize();
	const PathVisitor = fork.use(pathVisitorPlugin);
	return {
		Type: types.Type,
		builtInTypes: types.builtInTypes,
		namedTypes: types.namedTypes,
		builders: types.builders,
		defineMethod: types.defineMethod,
		getFieldNames: types.getFieldNames,
		getFieldValue: types.getFieldValue,
		eachField: types.eachField,
		someField: types.someField,
		getSupertypeNames: types.getSupertypeNames,
		getBuilderName: types.getBuilderName,
		astNodesAreEquivalent: fork.use(equiv_default),
		finalize: types.finalize,
		Path: fork.use(pathPlugin),
		NodePath: fork.use(nodePathPlugin),
		PathVisitor,
		use: fork.use,
		visit: PathVisitor.visit
	};
}
function createFork() {
	const used = [];
	const usedResult = [];
	function use(plugin) {
		var idx = used.indexOf(plugin);
		if (idx === -1) {
			idx = used.length;
			used.push(plugin);
			usedResult[idx] = plugin(fork);
		}
		return usedResult[idx];
	}
	var fork = { use };
	return fork;
}
//#endregion
//#region vendor/ast-types/src/def/operators/core.ts
function core_default$1() {
	return {
		BinaryOperators: [
			"==",
			"!=",
			"===",
			"!==",
			"<",
			"<=",
			">",
			">=",
			"<<",
			">>",
			">>>",
			"+",
			"-",
			"*",
			"/",
			"%",
			"&",
			"|",
			"^",
			"in",
			"instanceof"
		],
		AssignmentOperators: [
			"=",
			"+=",
			"-=",
			"*=",
			"/=",
			"%=",
			"<<=",
			">>=",
			">>>=",
			"|=",
			"^=",
			"&="
		],
		LogicalOperators: ["||", "&&"]
	};
}
//#endregion
//#region vendor/ast-types/src/def/operators/es2016.ts
function es2016_default$1(fork) {
	const result = fork.use(core_default$1);
	if (result.BinaryOperators.indexOf("**") < 0) result.BinaryOperators.push("**");
	if (result.AssignmentOperators.indexOf("**=") < 0) result.AssignmentOperators.push("**=");
	return result;
}
//#endregion
//#region vendor/ast-types/src/def/operators/es2020.ts
function es2020_default$1(fork) {
	const result = fork.use(es2016_default$1);
	if (result.LogicalOperators.indexOf("??") < 0) result.LogicalOperators.push("??");
	return result;
}
//#endregion
//#region vendor/ast-types/src/def/operators/es2021.ts
function es2021_default$1(fork) {
	const result = fork.use(es2020_default$1);
	result.LogicalOperators.forEach((op) => {
		const assignOp = op + "=";
		if (result.AssignmentOperators.indexOf(assignOp) < 0) result.AssignmentOperators.push(assignOp);
	});
	return result;
}
//#endregion
//#region vendor/ast-types/src/def/core.ts
function core_default(fork) {
	var Type = fork.use(typesPlugin).Type;
	var def = Type.def;
	var or = Type.or;
	var shared = fork.use(shared_default);
	var defaults = shared.defaults;
	var geq = shared.geq;
	const { BinaryOperators, AssignmentOperators, LogicalOperators } = fork.use(core_default$1);
	def("Printable").field("loc", or(def("SourceLocation"), null), defaults["null"], true);
	def("Node").bases("Printable").field("type", String).field("comments", or([def("Comment")], null), defaults["null"], true);
	def("SourceLocation").field("start", def("Position")).field("end", def("Position")).field("source", or(String, null), defaults["null"]);
	def("Position").field("line", geq(1)).field("column", geq(0));
	def("File").bases("Node").build("program", "name").field("program", def("Program")).field("name", or(String, null), defaults["null"]);
	def("Program").bases("Node").build("body").field("body", [def("Statement")]);
	def("Function").bases("Node").field("id", or(def("Identifier"), null), defaults["null"]).field("params", [def("Pattern")]).field("body", def("BlockStatement")).field("generator", Boolean, defaults["false"]).field("async", Boolean, defaults["false"]);
	def("Statement").bases("Node");
	def("EmptyStatement").bases("Statement").build();
	def("BlockStatement").bases("Statement").build("body").field("body", [def("Statement")]);
	def("ExpressionStatement").bases("Statement").build("expression").field("expression", def("Expression"));
	def("IfStatement").bases("Statement").build("test", "consequent", "alternate").field("test", def("Expression")).field("consequent", def("Statement")).field("alternate", or(def("Statement"), null), defaults["null"]);
	def("LabeledStatement").bases("Statement").build("label", "body").field("label", def("Identifier")).field("body", def("Statement"));
	def("BreakStatement").bases("Statement").build("label").field("label", or(def("Identifier"), null), defaults["null"]);
	def("ContinueStatement").bases("Statement").build("label").field("label", or(def("Identifier"), null), defaults["null"]);
	def("WithStatement").bases("Statement").build("object", "body").field("object", def("Expression")).field("body", def("Statement"));
	def("SwitchStatement").bases("Statement").build("discriminant", "cases", "lexical").field("discriminant", def("Expression")).field("cases", [def("SwitchCase")]).field("lexical", Boolean, defaults["false"]);
	def("ReturnStatement").bases("Statement").build("argument").field("argument", or(def("Expression"), null));
	def("ThrowStatement").bases("Statement").build("argument").field("argument", def("Expression"));
	def("TryStatement").bases("Statement").build("block", "handler", "finalizer").field("block", def("BlockStatement")).field("handler", or(def("CatchClause"), null), function() {
		return this.handlers && this.handlers[0] || null;
	}).field("handlers", [def("CatchClause")], function() {
		return this.handler ? [this.handler] : [];
	}, true).field("guardedHandlers", [def("CatchClause")], defaults.emptyArray).field("finalizer", or(def("BlockStatement"), null), defaults["null"]);
	def("CatchClause").bases("Node").build("param", "guard", "body").field("param", def("Pattern")).field("guard", or(def("Expression"), null), defaults["null"]).field("body", def("BlockStatement"));
	def("WhileStatement").bases("Statement").build("test", "body").field("test", def("Expression")).field("body", def("Statement"));
	def("DoWhileStatement").bases("Statement").build("body", "test").field("body", def("Statement")).field("test", def("Expression"));
	def("ForStatement").bases("Statement").build("init", "test", "update", "body").field("init", or(def("VariableDeclaration"), def("Expression"), null)).field("test", or(def("Expression"), null)).field("update", or(def("Expression"), null)).field("body", def("Statement"));
	def("ForInStatement").bases("Statement").build("left", "right", "body").field("left", or(def("VariableDeclaration"), def("Expression"))).field("right", def("Expression")).field("body", def("Statement"));
	def("DebuggerStatement").bases("Statement").build();
	def("Declaration").bases("Statement");
	def("FunctionDeclaration").bases("Function", "Declaration").build("id", "params", "body").field("id", def("Identifier"));
	def("FunctionExpression").bases("Function", "Expression").build("id", "params", "body");
	def("VariableDeclaration").bases("Declaration").build("kind", "declarations").field("kind", or("var", "let", "const")).field("declarations", [def("VariableDeclarator")]);
	def("VariableDeclarator").bases("Node").build("id", "init").field("id", def("Pattern")).field("init", or(def("Expression"), null), defaults["null"]);
	def("Expression").bases("Node");
	def("ThisExpression").bases("Expression").build();
	def("ArrayExpression").bases("Expression").build("elements").field("elements", [or(def("Expression"), null)]);
	def("ObjectExpression").bases("Expression").build("properties").field("properties", [def("Property")]);
	def("Property").bases("Node").build("kind", "key", "value").field("kind", or("init", "get", "set")).field("key", or(def("Literal"), def("Identifier"))).field("value", def("Expression"));
	def("SequenceExpression").bases("Expression").build("expressions").field("expressions", [def("Expression")]);
	var UnaryOperator = or("-", "+", "!", "~", "typeof", "void", "delete");
	def("UnaryExpression").bases("Expression").build("operator", "argument", "prefix").field("operator", UnaryOperator).field("argument", def("Expression")).field("prefix", Boolean, defaults["true"]);
	const BinaryOperator = or(...BinaryOperators);
	def("BinaryExpression").bases("Expression").build("operator", "left", "right").field("operator", BinaryOperator).field("left", def("Expression")).field("right", def("Expression"));
	const AssignmentOperator = or(...AssignmentOperators);
	def("AssignmentExpression").bases("Expression").build("operator", "left", "right").field("operator", AssignmentOperator).field("left", or(def("Pattern"), def("MemberExpression"))).field("right", def("Expression"));
	var UpdateOperator = or("++", "--");
	def("UpdateExpression").bases("Expression").build("operator", "argument", "prefix").field("operator", UpdateOperator).field("argument", def("Expression")).field("prefix", Boolean);
	var LogicalOperator = or(...LogicalOperators);
	def("LogicalExpression").bases("Expression").build("operator", "left", "right").field("operator", LogicalOperator).field("left", def("Expression")).field("right", def("Expression"));
	def("ConditionalExpression").bases("Expression").build("test", "consequent", "alternate").field("test", def("Expression")).field("consequent", def("Expression")).field("alternate", def("Expression"));
	def("NewExpression").bases("Expression").build("callee", "arguments").field("callee", def("Expression")).field("arguments", [def("Expression")]);
	def("CallExpression").bases("Expression").build("callee", "arguments").field("callee", def("Expression")).field("arguments", [def("Expression")]);
	def("MemberExpression").bases("Expression").build("object", "property", "computed").field("object", def("Expression")).field("property", or(def("Identifier"), def("Expression"))).field("computed", Boolean, function() {
		var type = this.property.type;
		if (type === "Literal" || type === "MemberExpression" || type === "BinaryExpression") return true;
		return false;
	});
	def("Pattern").bases("Node");
	def("SwitchCase").bases("Node").build("test", "consequent").field("test", or(def("Expression"), null)).field("consequent", [def("Statement")]);
	def("Identifier").bases("Expression", "Pattern").build("name").field("name", String).field("optional", Boolean, defaults["false"]);
	def("Literal").bases("Expression").build("value").field("value", or(String, Boolean, null, Number, RegExp, BigInt));
	def("Comment").bases("Printable").field("value", String).field("leading", Boolean, defaults["true"]).field("trailing", Boolean, defaults["false"]);
}
//#endregion
//#region vendor/ast-types/src/def/es6.ts
function es6_default(fork) {
	fork.use(core_default);
	const types = fork.use(typesPlugin);
	const def = types.Type.def;
	const or = types.Type.or;
	const defaults = fork.use(shared_default).defaults;
	def("Function").field("generator", Boolean, defaults["false"]).field("expression", Boolean, defaults["false"]).field("defaults", [or(def("Expression"), null)], defaults.emptyArray).field("rest", or(def("Identifier"), null), defaults["null"]);
	def("RestElement").bases("Pattern").build("argument").field("argument", def("Pattern")).field("typeAnnotation", or(def("TypeAnnotation"), def("TSTypeAnnotation"), null), defaults["null"]);
	def("SpreadElementPattern").bases("Pattern").build("argument").field("argument", def("Pattern"));
	def("FunctionDeclaration").build("id", "params", "body", "generator", "expression").field("id", or(def("Identifier"), null));
	def("FunctionExpression").build("id", "params", "body", "generator", "expression");
	def("ArrowFunctionExpression").bases("Function", "Expression").build("params", "body", "expression").field("id", null, defaults["null"]).field("body", or(def("BlockStatement"), def("Expression"))).field("generator", false, defaults["false"]);
	def("ForOfStatement").bases("Statement").build("left", "right", "body").field("left", or(def("VariableDeclaration"), def("Pattern"))).field("right", def("Expression")).field("body", def("Statement"));
	def("YieldExpression").bases("Expression").build("argument", "delegate").field("argument", or(def("Expression"), null)).field("delegate", Boolean, defaults["false"]);
	def("GeneratorExpression").bases("Expression").build("body", "blocks", "filter").field("body", def("Expression")).field("blocks", [def("ComprehensionBlock")]).field("filter", or(def("Expression"), null));
	def("ComprehensionExpression").bases("Expression").build("body", "blocks", "filter").field("body", def("Expression")).field("blocks", [def("ComprehensionBlock")]).field("filter", or(def("Expression"), null));
	def("ComprehensionBlock").bases("Node").build("left", "right", "each").field("left", def("Pattern")).field("right", def("Expression")).field("each", Boolean);
	def("Property").field("key", or(def("Literal"), def("Identifier"), def("Expression"))).field("value", or(def("Expression"), def("Pattern"))).field("method", Boolean, defaults["false"]).field("shorthand", Boolean, defaults["false"]).field("computed", Boolean, defaults["false"]);
	def("ObjectProperty").field("shorthand", Boolean, defaults["false"]);
	def("PropertyPattern").bases("Pattern").build("key", "pattern").field("key", or(def("Literal"), def("Identifier"), def("Expression"))).field("pattern", def("Pattern")).field("computed", Boolean, defaults["false"]);
	def("ObjectPattern").bases("Pattern").build("properties").field("properties", [or(def("PropertyPattern"), def("Property"))]);
	def("ArrayPattern").bases("Pattern").build("elements").field("elements", [or(def("Pattern"), null)]);
	def("SpreadElement").bases("Node").build("argument").field("argument", def("Expression"));
	def("ArrayExpression").field("elements", [or(def("Expression"), def("SpreadElement"), def("RestElement"), null)]);
	def("NewExpression").field("arguments", [or(def("Expression"), def("SpreadElement"))]);
	def("CallExpression").field("arguments", [or(def("Expression"), def("SpreadElement"))]);
	def("AssignmentPattern").bases("Pattern").build("left", "right").field("left", def("Pattern")).field("right", def("Expression"));
	def("MethodDefinition").bases("Declaration").build("kind", "key", "value", "static").field("kind", or("constructor", "method", "get", "set")).field("key", def("Expression")).field("value", def("Function")).field("computed", Boolean, defaults["false"]).field("static", Boolean, defaults["false"]);
	const ClassBodyElement = or(def("MethodDefinition"), def("VariableDeclarator"), def("ClassPropertyDefinition"), def("ClassProperty"), def("StaticBlock"));
	def("ClassProperty").bases("Declaration").build("key").field("key", or(def("Literal"), def("Identifier"), def("Expression"))).field("computed", Boolean, defaults["false"]);
	def("ClassPropertyDefinition").bases("Declaration").build("definition").field("definition", ClassBodyElement);
	def("ClassBody").bases("Declaration").build("body").field("body", [ClassBodyElement]);
	def("ClassDeclaration").bases("Declaration").build("id", "body", "superClass").field("id", or(def("Identifier"), null)).field("body", def("ClassBody")).field("superClass", or(def("Expression"), null), defaults["null"]);
	def("ClassExpression").bases("Expression").build("id", "body", "superClass").field("id", or(def("Identifier"), null), defaults["null"]).field("body", def("ClassBody")).field("superClass", or(def("Expression"), null), defaults["null"]);
	def("Super").bases("Expression").build();
	def("Specifier").bases("Node");
	def("ModuleSpecifier").bases("Specifier").field("local", or(def("Identifier"), null), defaults["null"]).field("id", or(def("Identifier"), null), defaults["null"]).field("name", or(def("Identifier"), null), defaults["null"]);
	def("ImportSpecifier").bases("ModuleSpecifier").build("imported", "local").field("imported", def("Identifier"));
	def("ImportDefaultSpecifier").bases("ModuleSpecifier").build("local");
	def("ImportNamespaceSpecifier").bases("ModuleSpecifier").build("local");
	def("ImportDeclaration").bases("Declaration").build("specifiers", "source", "importKind").field("specifiers", [or(def("ImportSpecifier"), def("ImportNamespaceSpecifier"), def("ImportDefaultSpecifier"))], defaults.emptyArray).field("source", def("Literal")).field("importKind", or("value", "type"), function() {
		return "value";
	});
	def("ExportNamedDeclaration").bases("Declaration").build("declaration", "specifiers", "source").field("declaration", or(def("Declaration"), null)).field("specifiers", [def("ExportSpecifier")], defaults.emptyArray).field("source", or(def("Literal"), null), defaults["null"]);
	def("ExportSpecifier").bases("ModuleSpecifier").build("local", "exported").field("exported", def("Identifier"));
	def("ExportDefaultDeclaration").bases("Declaration").build("declaration").field("declaration", or(def("Declaration"), def("Expression")));
	def("ExportAllDeclaration").bases("Declaration").build("source").field("source", def("Literal"));
	def("TaggedTemplateExpression").bases("Expression").build("tag", "quasi").field("tag", def("Expression")).field("quasi", def("TemplateLiteral"));
	def("TemplateLiteral").bases("Expression").build("quasis", "expressions").field("quasis", [def("TemplateElement")]).field("expressions", [def("Expression")]);
	def("TemplateElement").bases("Node").build("value", "tail").field("value", {
		"cooked": String,
		"raw": String
	}).field("tail", Boolean);
	def("MetaProperty").bases("Expression").build("meta", "property").field("meta", def("Identifier")).field("property", def("Identifier"));
}
//#endregion
//#region vendor/ast-types/src/def/es2016.ts
function es2016_default(fork) {
	fork.use(es2016_default$1);
	fork.use(es6_default);
}
//#endregion
//#region vendor/ast-types/src/def/es2017.ts
function es2017_default(fork) {
	fork.use(es2016_default);
	const def = fork.use(typesPlugin).Type.def;
	const defaults = fork.use(shared_default).defaults;
	def("Function").field("async", Boolean, defaults["false"]);
	def("AwaitExpression").bases("Expression").build("argument").field("argument", def("Expression"));
}
//#endregion
//#region vendor/ast-types/src/def/es2018.ts
function es2018_default(fork) {
	fork.use(es2017_default);
	const types = fork.use(typesPlugin);
	const def = types.Type.def;
	const or = types.Type.or;
	const defaults = fork.use(shared_default).defaults;
	def("ForOfStatement").field("await", Boolean, defaults["false"]);
	def("SpreadProperty").bases("Node").build("argument").field("argument", def("Expression"));
	def("ObjectExpression").field("properties", [or(def("Property"), def("SpreadProperty"), def("SpreadElement"))]);
	def("TemplateElement").field("value", {
		"cooked": or(String, null),
		"raw": String
	});
	def("SpreadPropertyPattern").bases("Pattern").build("argument").field("argument", def("Pattern"));
	def("ObjectPattern").field("properties", [or(def("PropertyPattern"), def("Property"), def("RestElement"), def("SpreadPropertyPattern"))]);
}
//#endregion
//#region vendor/ast-types/src/def/es2019.ts
function es2019_default(fork) {
	fork.use(es2018_default);
	const types = fork.use(typesPlugin);
	const def = types.Type.def;
	const or = types.Type.or;
	const defaults = fork.use(shared_default).defaults;
	def("CatchClause").field("param", or(def("Pattern"), null), defaults["null"]);
}
//#endregion
//#region vendor/ast-types/src/def/es2020.ts
function es2020_default(fork) {
	fork.use(es2020_default$1);
	fork.use(es2019_default);
	const types = fork.use(typesPlugin);
	const def = types.Type.def;
	const or = types.Type.or;
	const defaults = fork.use(shared_default).defaults;
	def("ImportExpression").bases("Expression").build("source").field("source", def("Expression"));
	def("ExportAllDeclaration").bases("Declaration").build("source", "exported").field("source", def("Literal")).field("exported", or(def("Identifier"), null, void 0), defaults["null"]);
	def("ChainElement").bases("Node").field("optional", Boolean, defaults["false"]);
	def("CallExpression").bases("Expression", "ChainElement");
	def("MemberExpression").bases("Expression", "ChainElement");
	def("ChainExpression").bases("Expression").build("expression").field("expression", def("ChainElement"));
	def("OptionalCallExpression").bases("CallExpression").build("callee", "arguments", "optional").field("optional", Boolean, defaults["true"]);
	def("OptionalMemberExpression").bases("MemberExpression").build("object", "property", "computed", "optional").field("optional", Boolean, defaults["true"]);
}
//#endregion
//#region vendor/ast-types/src/def/es2021.ts
function es2021_default(fork) {
	fork.use(es2021_default$1);
	fork.use(es2020_default);
}
//#endregion
//#region vendor/ast-types/src/def/es2022.ts
function es2022_default(fork) {
	fork.use(es2021_default);
	const def = fork.use(typesPlugin).Type.def;
	def("StaticBlock").bases("Declaration").build("body").field("body", [def("Statement")]);
}
//#endregion
//#region vendor/ast-types/src/def/es-proposals.ts
function es_proposals_default(fork) {
	fork.use(es2022_default);
	const types = fork.use(typesPlugin);
	const Type = types.Type;
	const def = types.Type.def;
	const or = Type.or;
	const defaults = fork.use(shared_default).defaults;
	def("AwaitExpression").build("argument", "all").field("argument", or(def("Expression"), null)).field("all", Boolean, defaults["false"]);
	def("Decorator").bases("Node").build("expression").field("expression", def("Expression"));
	def("Property").field("decorators", or([def("Decorator")], null), defaults["null"]);
	def("MethodDefinition").field("decorators", or([def("Decorator")], null), defaults["null"]);
	def("PrivateName").bases("Expression", "Pattern").build("id").field("id", def("Identifier"));
	def("ClassPrivateProperty").bases("ClassProperty").build("key", "value").field("key", def("PrivateName")).field("value", or(def("Expression"), null), defaults["null"]);
	def("ImportAttribute").bases("Node").build("key", "value").field("key", or(def("Identifier"), def("Literal"))).field("value", def("Expression"));
	[
		"ImportDeclaration",
		"ExportAllDeclaration",
		"ExportNamedDeclaration"
	].forEach((decl) => {
		def(decl).field("assertions", [def("ImportAttribute")], defaults.emptyArray);
	});
	def("RecordExpression").bases("Expression").build("properties").field("properties", [or(def("ObjectProperty"), def("ObjectMethod"), def("SpreadElement"))]);
	def("TupleExpression").bases("Expression").build("elements").field("elements", [or(def("Expression"), def("SpreadElement"), null)]);
	def("ModuleExpression").bases("Node").build("body").field("body", def("Program"));
}
//#endregion
//#region vendor/ast-types/src/def/jsx.ts
function jsx_default(fork) {
	fork.use(es_proposals_default);
	const types = fork.use(typesPlugin);
	const def = types.Type.def;
	const or = types.Type.or;
	const defaults = fork.use(shared_default).defaults;
	def("JSXAttribute").bases("Node").build("name", "value").field("name", or(def("JSXIdentifier"), def("JSXNamespacedName"))).field("value", or(def("Literal"), def("JSXExpressionContainer"), def("JSXElement"), def("JSXFragment"), null), defaults["null"]);
	def("JSXIdentifier").bases("Identifier").build("name").field("name", String);
	def("JSXNamespacedName").bases("Node").build("namespace", "name").field("namespace", def("JSXIdentifier")).field("name", def("JSXIdentifier"));
	def("JSXMemberExpression").bases("MemberExpression").build("object", "property").field("object", or(def("JSXIdentifier"), def("JSXMemberExpression"))).field("property", def("JSXIdentifier")).field("computed", Boolean, defaults.false);
	const JSXElementName = or(def("JSXIdentifier"), def("JSXNamespacedName"), def("JSXMemberExpression"));
	def("JSXSpreadAttribute").bases("Node").build("argument").field("argument", def("Expression"));
	const JSXAttributes = [or(def("JSXAttribute"), def("JSXSpreadAttribute"))];
	def("JSXExpressionContainer").bases("Expression").build("expression").field("expression", or(def("Expression"), def("JSXEmptyExpression")));
	const JSXChildren = [or(def("JSXText"), def("JSXExpressionContainer"), def("JSXSpreadChild"), def("JSXElement"), def("JSXFragment"), def("Literal"))];
	def("JSXElement").bases("Expression").build("openingElement", "closingElement", "children").field("openingElement", def("JSXOpeningElement")).field("closingElement", or(def("JSXClosingElement"), null), defaults["null"]).field("children", JSXChildren, defaults.emptyArray).field("name", JSXElementName, function() {
		return this.openingElement.name;
	}, true).field("selfClosing", Boolean, function() {
		return this.openingElement.selfClosing;
	}, true).field("attributes", JSXAttributes, function() {
		return this.openingElement.attributes;
	}, true);
	def("JSXOpeningElement").bases("Node").build("name", "attributes", "selfClosing").field("name", JSXElementName).field("attributes", JSXAttributes, defaults.emptyArray).field("selfClosing", Boolean, defaults["false"]);
	def("JSXClosingElement").bases("Node").build("name").field("name", JSXElementName);
	def("JSXFragment").bases("Expression").build("openingFragment", "closingFragment", "children").field("openingFragment", def("JSXOpeningFragment")).field("closingFragment", def("JSXClosingFragment")).field("children", JSXChildren, defaults.emptyArray);
	def("JSXOpeningFragment").bases("Node").build();
	def("JSXClosingFragment").bases("Node").build();
	def("JSXText").bases("Literal").build("value", "raw").field("value", String).field("raw", String, function() {
		return this.value;
	});
	def("JSXEmptyExpression").bases("Node").build();
	def("JSXSpreadChild").bases("Node").build("expression").field("expression", def("Expression"));
}
//#endregion
//#region vendor/ast-types/src/def/type-annotations.ts
function type_annotations_default(fork) {
	var types = fork.use(typesPlugin);
	var def = types.Type.def;
	var or = types.Type.or;
	var defaults = fork.use(shared_default).defaults;
	var TypeAnnotation = or(def("TypeAnnotation"), def("TSTypeAnnotation"), null);
	var TypeParamDecl = or(def("TypeParameterDeclaration"), def("TSTypeParameterDeclaration"), null);
	def("Identifier").field("typeAnnotation", TypeAnnotation, defaults["null"]);
	def("ObjectPattern").field("typeAnnotation", TypeAnnotation, defaults["null"]);
	def("Function").field("returnType", TypeAnnotation, defaults["null"]).field("typeParameters", TypeParamDecl, defaults["null"]);
	def("ClassProperty").build("key", "value", "typeAnnotation", "static").field("value", or(def("Expression"), null)).field("static", Boolean, defaults["false"]).field("typeAnnotation", TypeAnnotation, defaults["null"]);
	["ClassDeclaration", "ClassExpression"].forEach((typeName) => {
		def(typeName).field("typeParameters", TypeParamDecl, defaults["null"]).field("superTypeParameters", or(def("TypeParameterInstantiation"), def("TSTypeParameterInstantiation"), null), defaults["null"]).field("implements", or([def("ClassImplements")], [def("TSExpressionWithTypeArguments")]), defaults.emptyArray);
	});
}
//#endregion
//#region vendor/ast-types/src/def/flow.ts
function flow_default(fork) {
	fork.use(es_proposals_default);
	fork.use(type_annotations_default);
	const types = fork.use(typesPlugin);
	const def = types.Type.def;
	const or = types.Type.or;
	const defaults = fork.use(shared_default).defaults;
	def("Flow").bases("Node");
	def("FlowType").bases("Flow");
	def("AnyTypeAnnotation").bases("FlowType").build();
	def("EmptyTypeAnnotation").bases("FlowType").build();
	def("MixedTypeAnnotation").bases("FlowType").build();
	def("VoidTypeAnnotation").bases("FlowType").build();
	def("SymbolTypeAnnotation").bases("FlowType").build();
	def("NumberTypeAnnotation").bases("FlowType").build();
	def("BigIntTypeAnnotation").bases("FlowType").build();
	def("NumberLiteralTypeAnnotation").bases("FlowType").build("value", "raw").field("value", Number).field("raw", String);
	def("NumericLiteralTypeAnnotation").bases("FlowType").build("value", "raw").field("value", Number).field("raw", String);
	def("BigIntLiteralTypeAnnotation").bases("FlowType").build("value", "raw").field("value", null).field("raw", String);
	def("StringTypeAnnotation").bases("FlowType").build();
	def("StringLiteralTypeAnnotation").bases("FlowType").build("value", "raw").field("value", String).field("raw", String);
	def("BooleanTypeAnnotation").bases("FlowType").build();
	def("BooleanLiteralTypeAnnotation").bases("FlowType").build("value", "raw").field("value", Boolean).field("raw", String);
	def("TypeAnnotation").bases("Node").build("typeAnnotation").field("typeAnnotation", def("FlowType"));
	def("NullableTypeAnnotation").bases("FlowType").build("typeAnnotation").field("typeAnnotation", def("FlowType"));
	def("NullLiteralTypeAnnotation").bases("FlowType").build();
	def("NullTypeAnnotation").bases("FlowType").build();
	def("ThisTypeAnnotation").bases("FlowType").build();
	def("ExistsTypeAnnotation").bases("FlowType").build();
	def("ExistentialTypeParam").bases("FlowType").build();
	def("FunctionTypeAnnotation").bases("FlowType").build("params", "returnType", "rest", "typeParameters").field("params", [def("FunctionTypeParam")]).field("returnType", def("FlowType")).field("rest", or(def("FunctionTypeParam"), null)).field("typeParameters", or(def("TypeParameterDeclaration"), null));
	def("FunctionTypeParam").bases("Node").build("name", "typeAnnotation", "optional").field("name", or(def("Identifier"), null)).field("typeAnnotation", def("FlowType")).field("optional", Boolean);
	def("ArrayTypeAnnotation").bases("FlowType").build("elementType").field("elementType", def("FlowType"));
	def("ObjectTypeAnnotation").bases("FlowType").build("properties", "indexers", "callProperties").field("properties", [or(def("ObjectTypeProperty"), def("ObjectTypeSpreadProperty"))]).field("indexers", [def("ObjectTypeIndexer")], defaults.emptyArray).field("callProperties", [def("ObjectTypeCallProperty")], defaults.emptyArray).field("inexact", or(Boolean, void 0), defaults["undefined"]).field("exact", Boolean, defaults["false"]).field("internalSlots", [def("ObjectTypeInternalSlot")], defaults.emptyArray);
	def("Variance").bases("Node").build("kind").field("kind", or("plus", "minus"));
	const LegacyVariance = or(def("Variance"), "plus", "minus", null);
	def("ObjectTypeProperty").bases("Node").build("key", "value", "optional").field("key", or(def("Literal"), def("Identifier"))).field("value", def("FlowType")).field("optional", Boolean).field("variance", LegacyVariance, defaults["null"]);
	def("ObjectTypeIndexer").bases("Node").build("id", "key", "value").field("id", def("Identifier")).field("key", def("FlowType")).field("value", def("FlowType")).field("variance", LegacyVariance, defaults["null"]).field("static", Boolean, defaults["false"]);
	def("ObjectTypeCallProperty").bases("Node").build("value").field("value", def("FunctionTypeAnnotation")).field("static", Boolean, defaults["false"]);
	def("QualifiedTypeIdentifier").bases("Node").build("qualification", "id").field("qualification", or(def("Identifier"), def("QualifiedTypeIdentifier"))).field("id", def("Identifier"));
	def("GenericTypeAnnotation").bases("FlowType").build("id", "typeParameters").field("id", or(def("Identifier"), def("QualifiedTypeIdentifier"))).field("typeParameters", or(def("TypeParameterInstantiation"), null));
	def("MemberTypeAnnotation").bases("FlowType").build("object", "property").field("object", def("Identifier")).field("property", or(def("MemberTypeAnnotation"), def("GenericTypeAnnotation")));
	def("IndexedAccessType").bases("FlowType").build("objectType", "indexType").field("objectType", def("FlowType")).field("indexType", def("FlowType"));
	def("OptionalIndexedAccessType").bases("FlowType").build("objectType", "indexType", "optional").field("objectType", def("FlowType")).field("indexType", def("FlowType")).field("optional", Boolean);
	def("UnionTypeAnnotation").bases("FlowType").build("types").field("types", [def("FlowType")]);
	def("IntersectionTypeAnnotation").bases("FlowType").build("types").field("types", [def("FlowType")]);
	def("TypeofTypeAnnotation").bases("FlowType").build("argument").field("argument", def("FlowType"));
	def("ObjectTypeSpreadProperty").bases("Node").build("argument").field("argument", def("FlowType"));
	def("ObjectTypeInternalSlot").bases("Node").build("id", "value", "optional", "static", "method").field("id", def("Identifier")).field("value", def("FlowType")).field("optional", Boolean).field("static", Boolean).field("method", Boolean);
	def("TypeParameterDeclaration").bases("Node").build("params").field("params", [def("TypeParameter")]);
	def("TypeParameterInstantiation").bases("Node").build("params").field("params", [def("FlowType")]);
	def("TypeParameter").bases("FlowType").build("name", "variance", "bound", "default").field("name", String).field("variance", LegacyVariance, defaults["null"]).field("bound", or(def("TypeAnnotation"), null), defaults["null"]).field("default", or(def("FlowType"), null), defaults["null"]);
	def("ClassProperty").field("variance", LegacyVariance, defaults["null"]);
	def("ClassImplements").bases("Node").build("id").field("id", def("Identifier")).field("superClass", or(def("Expression"), null), defaults["null"]).field("typeParameters", or(def("TypeParameterInstantiation"), null), defaults["null"]);
	def("InterfaceTypeAnnotation").bases("FlowType").build("body", "extends").field("body", def("ObjectTypeAnnotation")).field("extends", or([def("InterfaceExtends")], null), defaults["null"]);
	def("InterfaceDeclaration").bases("Declaration").build("id", "body", "extends").field("id", def("Identifier")).field("typeParameters", or(def("TypeParameterDeclaration"), null), defaults["null"]).field("body", def("ObjectTypeAnnotation")).field("extends", [def("InterfaceExtends")]);
	def("DeclareInterface").bases("InterfaceDeclaration").build("id", "body", "extends");
	def("InterfaceExtends").bases("Node").build("id").field("id", def("Identifier")).field("typeParameters", or(def("TypeParameterInstantiation"), null), defaults["null"]);
	def("TypeAlias").bases("Declaration").build("id", "typeParameters", "right").field("id", def("Identifier")).field("typeParameters", or(def("TypeParameterDeclaration"), null)).field("right", def("FlowType"));
	def("DeclareTypeAlias").bases("TypeAlias").build("id", "typeParameters", "right");
	def("OpaqueType").bases("Declaration").build("id", "typeParameters", "impltype", "supertype").field("id", def("Identifier")).field("typeParameters", or(def("TypeParameterDeclaration"), null)).field("impltype", def("FlowType")).field("supertype", or(def("FlowType"), null));
	def("DeclareOpaqueType").bases("OpaqueType").build("id", "typeParameters", "supertype").field("impltype", or(def("FlowType"), null));
	def("TypeCastExpression").bases("Expression").build("expression", "typeAnnotation").field("expression", def("Expression")).field("typeAnnotation", def("TypeAnnotation"));
	def("TupleTypeAnnotation").bases("FlowType").build("types").field("types", [def("FlowType")]);
	def("DeclareVariable").bases("Statement").build("id").field("id", def("Identifier"));
	def("DeclareFunction").bases("Statement").build("id").field("id", def("Identifier")).field("predicate", or(def("FlowPredicate"), null), defaults["null"]);
	def("DeclareClass").bases("InterfaceDeclaration").build("id");
	def("DeclareModule").bases("Statement").build("id", "body").field("id", or(def("Identifier"), def("Literal"))).field("body", def("BlockStatement"));
	def("DeclareModuleExports").bases("Statement").build("typeAnnotation").field("typeAnnotation", def("TypeAnnotation"));
	def("DeclareExportDeclaration").bases("Declaration").build("default", "declaration", "specifiers", "source").field("default", Boolean).field("declaration", or(def("DeclareVariable"), def("DeclareFunction"), def("DeclareClass"), def("FlowType"), def("TypeAlias"), def("DeclareOpaqueType"), def("InterfaceDeclaration"), null)).field("specifiers", [or(def("ExportSpecifier"), def("ExportBatchSpecifier"))], defaults.emptyArray).field("source", or(def("Literal"), null), defaults["null"]);
	def("DeclareExportAllDeclaration").bases("Declaration").build("source").field("source", or(def("Literal"), null), defaults["null"]);
	def("ImportDeclaration").field("importKind", or("value", "type", "typeof"), () => "value");
	def("FlowPredicate").bases("Flow");
	def("InferredPredicate").bases("FlowPredicate").build();
	def("DeclaredPredicate").bases("FlowPredicate").build("value").field("value", def("Expression"));
	def("Function").field("predicate", or(def("FlowPredicate"), null), defaults["null"]);
	def("CallExpression").field("typeArguments", or(null, def("TypeParameterInstantiation")), defaults["null"]);
	def("NewExpression").field("typeArguments", or(null, def("TypeParameterInstantiation")), defaults["null"]);
	def("EnumDeclaration").bases("Declaration").build("id", "body").field("id", def("Identifier")).field("body", or(def("EnumBooleanBody"), def("EnumNumberBody"), def("EnumStringBody"), def("EnumSymbolBody")));
	def("EnumBooleanBody").build("members", "explicitType").field("members", [def("EnumBooleanMember")]).field("explicitType", Boolean);
	def("EnumNumberBody").build("members", "explicitType").field("members", [def("EnumNumberMember")]).field("explicitType", Boolean);
	def("EnumStringBody").build("members", "explicitType").field("members", or([def("EnumStringMember")], [def("EnumDefaultedMember")])).field("explicitType", Boolean);
	def("EnumSymbolBody").build("members").field("members", [def("EnumDefaultedMember")]);
	def("EnumBooleanMember").build("id", "init").field("id", def("Identifier")).field("init", or(def("Literal"), Boolean));
	def("EnumNumberMember").build("id", "init").field("id", def("Identifier")).field("init", def("Literal"));
	def("EnumStringMember").build("id", "init").field("id", def("Identifier")).field("init", def("Literal"));
	def("EnumDefaultedMember").build("id").field("id", def("Identifier"));
}
//#endregion
//#region vendor/ast-types/src/def/esprima.ts
function esprima_default(fork) {
	fork.use(es_proposals_default);
	var types = fork.use(typesPlugin);
	var defaults = fork.use(shared_default).defaults;
	var def = types.Type.def;
	var or = types.Type.or;
	def("VariableDeclaration").field("declarations", [or(def("VariableDeclarator"), def("Identifier"))]);
	def("Property").field("value", or(def("Expression"), def("Pattern")));
	def("ArrayPattern").field("elements", [or(def("Pattern"), def("SpreadElement"), null)]);
	def("ObjectPattern").field("properties", [or(def("Property"), def("PropertyPattern"), def("SpreadPropertyPattern"), def("SpreadProperty"))]);
	def("ExportSpecifier").bases("ModuleSpecifier").build("id", "name");
	def("ExportBatchSpecifier").bases("Specifier").build();
	def("ExportDeclaration").bases("Declaration").build("default", "declaration", "specifiers", "source").field("default", Boolean).field("declaration", or(def("Declaration"), def("Expression"), null)).field("specifiers", [or(def("ExportSpecifier"), def("ExportBatchSpecifier"))], defaults.emptyArray).field("source", or(def("Literal"), null), defaults["null"]);
	def("Block").bases("Comment").build("value", "leading", "trailing");
	def("Line").bases("Comment").build("value", "leading", "trailing");
}
//#endregion
//#region vendor/ast-types/src/def/babel-core.ts
function babel_core_default(fork) {
	fork.use(es_proposals_default);
	const types = fork.use(typesPlugin);
	const defaults = fork.use(shared_default).defaults;
	const def = types.Type.def;
	const or = types.Type.or;
	const { undefined: isUndefined } = types.builtInTypes;
	def("Noop").bases("Statement").build();
	def("DoExpression").bases("Expression").build("body").field("body", [def("Statement")]);
	def("BindExpression").bases("Expression").build("object", "callee").field("object", or(def("Expression"), null)).field("callee", def("Expression"));
	def("ParenthesizedExpression").bases("Expression").build("expression").field("expression", def("Expression"));
	def("ExportNamespaceSpecifier").bases("Specifier").build("exported").field("exported", def("Identifier"));
	def("ExportDefaultSpecifier").bases("Specifier").build("exported").field("exported", def("Identifier"));
	def("CommentBlock").bases("Comment").build("value", "leading", "trailing");
	def("CommentLine").bases("Comment").build("value", "leading", "trailing");
	def("Directive").bases("Node").build("value").field("value", def("DirectiveLiteral"));
	def("DirectiveLiteral").bases("Node", "Expression").build("value").field("value", String, defaults["use strict"]);
	def("InterpreterDirective").bases("Node").build("value").field("value", String);
	def("BlockStatement").bases("Statement").build("body").field("body", [def("Statement")]).field("directives", [def("Directive")], defaults.emptyArray);
	def("Program").bases("Node").build("body").field("body", [def("Statement")]).field("directives", [def("Directive")], defaults.emptyArray).field("interpreter", or(def("InterpreterDirective"), null), defaults["null"]);
	function makeLiteralExtra(rawValueType = String, toRaw) {
		return [
			"extra",
			{
				rawValue: rawValueType,
				raw: String
			},
			function getDefault() {
				const value = types.getFieldValue(this, "value");
				return {
					rawValue: value,
					raw: toRaw ? toRaw(value) : String(value)
				};
			}
		];
	}
	def("StringLiteral").bases("Literal").build("value").field("value", String).field(...makeLiteralExtra(String, (val) => JSON.stringify(val)));
	def("NumericLiteral").bases("Literal").build("value").field("value", Number).field("raw", or(String, null), defaults["null"]).field(...makeLiteralExtra(Number));
	def("BigIntLiteral").bases("Literal").build("value").field("value", or(String, Number)).field(...makeLiteralExtra(String, (val) => val + "n"));
	def("DecimalLiteral").bases("Literal").build("value").field("value", String).field(...makeLiteralExtra(String, (val) => val + "m"));
	def("NullLiteral").bases("Literal").build().field("value", null, defaults["null"]);
	def("BooleanLiteral").bases("Literal").build("value").field("value", Boolean);
	def("RegExpLiteral").bases("Literal").build("pattern", "flags").field("pattern", String).field("flags", String).field("value", RegExp, function() {
		return new RegExp(this.pattern, this.flags);
	}).field(...makeLiteralExtra(or(RegExp, isUndefined), (exp) => `/${exp.pattern}/${exp.flags || ""}`)).field("regex", {
		pattern: String,
		flags: String
	}, function() {
		return {
			pattern: this.pattern,
			flags: this.flags
		};
	});
	var ObjectExpressionProperty = or(def("Property"), def("ObjectMethod"), def("ObjectProperty"), def("SpreadProperty"), def("SpreadElement"));
	def("ObjectExpression").bases("Expression").build("properties").field("properties", [ObjectExpressionProperty]);
	def("ObjectMethod").bases("Node", "Function").build("kind", "key", "params", "body", "computed").field("kind", or("method", "get", "set")).field("key", or(def("Literal"), def("Identifier"), def("Expression"))).field("params", [def("Pattern")]).field("body", def("BlockStatement")).field("computed", Boolean, defaults["false"]).field("generator", Boolean, defaults["false"]).field("async", Boolean, defaults["false"]).field("accessibility", or(def("Literal"), null), defaults["null"]).field("decorators", or([def("Decorator")], null), defaults["null"]);
	def("ObjectProperty").bases("Node").build("key", "value").field("key", or(def("Literal"), def("Identifier"), def("Expression"))).field("value", or(def("Expression"), def("Pattern"))).field("accessibility", or(def("Literal"), null), defaults["null"]).field("computed", Boolean, defaults["false"]);
	var ClassBodyElement = or(def("MethodDefinition"), def("VariableDeclarator"), def("ClassPropertyDefinition"), def("ClassProperty"), def("ClassPrivateProperty"), def("ClassMethod"), def("ClassPrivateMethod"), def("ClassAccessorProperty"), def("StaticBlock"));
	def("ClassBody").bases("Declaration").build("body").field("body", [ClassBodyElement]);
	def("ClassMethod").bases("Declaration", "Function").build("kind", "key", "params", "body", "computed", "static").field("key", or(def("Literal"), def("Identifier"), def("Expression")));
	def("ClassPrivateMethod").bases("Declaration", "Function").build("key", "params", "body", "kind", "computed", "static").field("key", def("PrivateName"));
	def("ClassAccessorProperty").bases("Declaration").build("key", "value", "decorators", "computed", "static").field("key", or(def("Literal"), def("Identifier"), def("PrivateName"), def("Expression"))).field("value", or(def("Expression"), null), defaults["null"]);
	["ClassMethod", "ClassPrivateMethod"].forEach((typeName) => {
		def(typeName).field("kind", or("get", "set", "method", "constructor"), () => "method").field("body", def("BlockStatement")).field("access", or("public", "private", "protected", null), defaults["null"]);
	});
	[
		"ClassMethod",
		"ClassPrivateMethod",
		"ClassAccessorProperty"
	].forEach((typeName) => {
		def(typeName).field("computed", Boolean, defaults["false"]).field("static", Boolean, defaults["false"]).field("abstract", Boolean, defaults["false"]).field("accessibility", or("public", "private", "protected", null), defaults["null"]).field("decorators", or([def("Decorator")], null), defaults["null"]).field("definite", Boolean, defaults["false"]).field("optional", Boolean, defaults["false"]).field("override", Boolean, defaults["false"]).field("readonly", Boolean, defaults["false"]);
	});
	var ObjectPatternProperty = or(def("Property"), def("PropertyPattern"), def("SpreadPropertyPattern"), def("SpreadProperty"), def("ObjectProperty"), def("RestProperty"), def("RestElement"));
	def("ObjectPattern").bases("Pattern").build("properties").field("properties", [ObjectPatternProperty]).field("decorators", or([def("Decorator")], null), defaults["null"]);
	def("SpreadProperty").bases("Node").build("argument").field("argument", def("Expression"));
	def("RestProperty").bases("Node").build("argument").field("argument", def("Expression"));
	def("ForAwaitStatement").bases("Statement").build("left", "right", "body").field("left", or(def("VariableDeclaration"), def("Expression"))).field("right", def("Expression")).field("body", def("Statement"));
	def("Import").bases("Expression").build();
}
//#endregion
//#region vendor/ast-types/src/def/babel.ts
function babel_default(fork) {
	const def = fork.use(typesPlugin).Type.def;
	fork.use(babel_core_default);
	fork.use(flow_default);
	def("V8IntrinsicIdentifier").bases("Expression").build("name").field("name", String);
	def("TopicReference").bases("Expression").build();
}
//#endregion
//#region vendor/ast-types/src/def/typescript.ts
function typescript_default(fork) {
	fork.use(babel_core_default);
	fork.use(type_annotations_default);
	var types = fork.use(typesPlugin);
	var n = types.namedTypes;
	var def = types.Type.def;
	var or = types.Type.or;
	var defaults = fork.use(shared_default).defaults;
	var StringLiteral = types.Type.from(function(value, deep) {
		if (n.StringLiteral && n.StringLiteral.check(value, deep)) return true;
		if (n.Literal && n.Literal.check(value, deep) && typeof value.value === "string") return true;
		return false;
	}, "StringLiteral");
	def("TSType").bases("Node");
	var TSEntityName = or(def("Identifier"), def("TSQualifiedName"));
	def("TSTypeReference").bases("TSType", "TSHasOptionalTypeParameterInstantiation").build("typeName", "typeParameters").field("typeName", TSEntityName);
	def("TSHasOptionalTypeParameterInstantiation").field("typeParameters", or(def("TSTypeParameterInstantiation"), null), defaults["null"]);
	def("TSHasOptionalTypeParameters").field("typeParameters", or(def("TSTypeParameterDeclaration"), null, void 0), defaults["null"]);
	def("TSHasOptionalTypeAnnotation").field("typeAnnotation", or(def("TSTypeAnnotation"), null), defaults["null"]);
	def("TSQualifiedName").bases("Node").build("left", "right").field("left", TSEntityName).field("right", TSEntityName);
	def("TSAsExpression").bases("Expression", "Pattern").build("expression", "typeAnnotation").field("expression", def("Expression")).field("typeAnnotation", def("TSType")).field("extra", or({ parenthesized: Boolean }, null), defaults["null"]);
	def("TSTypeCastExpression").bases("Expression").build("expression", "typeAnnotation").field("expression", def("Expression")).field("typeAnnotation", def("TSType"));
	def("TSSatisfiesExpression").bases("Expression", "Pattern").build("expression", "typeAnnotation").field("expression", def("Expression")).field("typeAnnotation", def("TSType"));
	def("TSNonNullExpression").bases("Expression", "Pattern").build("expression").field("expression", def("Expression"));
	[
		"TSAnyKeyword",
		"TSBigIntKeyword",
		"TSBooleanKeyword",
		"TSNeverKeyword",
		"TSNullKeyword",
		"TSNumberKeyword",
		"TSObjectKeyword",
		"TSStringKeyword",
		"TSSymbolKeyword",
		"TSUndefinedKeyword",
		"TSUnknownKeyword",
		"TSVoidKeyword",
		"TSIntrinsicKeyword",
		"TSThisType"
	].forEach((keywordType) => {
		def(keywordType).bases("TSType").build();
	});
	def("TSArrayType").bases("TSType").build("elementType").field("elementType", def("TSType"));
	def("TSLiteralType").bases("TSType").build("literal").field("literal", or(def("NumericLiteral"), def("StringLiteral"), def("BooleanLiteral"), def("TemplateLiteral"), def("UnaryExpression"), def("BigIntLiteral")));
	def("TemplateLiteral").field("expressions", or([def("Expression")], [def("TSType")]));
	["TSUnionType", "TSIntersectionType"].forEach((typeName) => {
		def(typeName).bases("TSType").build("types").field("types", [def("TSType")]);
	});
	def("TSConditionalType").bases("TSType").build("checkType", "extendsType", "trueType", "falseType").field("checkType", def("TSType")).field("extendsType", def("TSType")).field("trueType", def("TSType")).field("falseType", def("TSType"));
	def("TSInferType").bases("TSType").build("typeParameter").field("typeParameter", def("TSTypeParameter"));
	def("TSParenthesizedType").bases("TSType").build("typeAnnotation").field("typeAnnotation", def("TSType"));
	var ParametersType = [or(def("Identifier"), def("RestElement"), def("ArrayPattern"), def("ObjectPattern"))];
	["TSFunctionType", "TSConstructorType"].forEach((typeName) => {
		def(typeName).bases("TSType", "TSHasOptionalTypeParameters", "TSHasOptionalTypeAnnotation").build("parameters").field("parameters", ParametersType);
	});
	def("TSDeclareFunction").bases("Declaration", "TSHasOptionalTypeParameters").build("id", "params", "returnType").field("declare", Boolean, defaults["false"]).field("async", Boolean, defaults["false"]).field("generator", Boolean, defaults["false"]).field("id", or(def("Identifier"), null), defaults["null"]).field("params", [def("Pattern")]).field("returnType", or(def("TSTypeAnnotation"), def("Noop"), null), defaults["null"]);
	def("TSDeclareMethod").bases("Declaration", "TSHasOptionalTypeParameters").build("key", "params", "returnType").field("async", Boolean, defaults["false"]).field("generator", Boolean, defaults["false"]).field("params", [def("Pattern")]).field("abstract", Boolean, defaults["false"]).field("accessibility", or("public", "private", "protected", void 0), defaults["undefined"]).field("static", Boolean, defaults["false"]).field("computed", Boolean, defaults["false"]).field("optional", Boolean, defaults["false"]).field("key", or(def("Identifier"), def("StringLiteral"), def("NumericLiteral"), def("Expression"))).field("kind", or("get", "set", "method", "constructor"), function getDefault() {
		return "method";
	}).field("access", or("public", "private", "protected", void 0), defaults["undefined"]).field("decorators", or([def("Decorator")], null), defaults["null"]).field("returnType", or(def("TSTypeAnnotation"), def("Noop"), null), defaults["null"]);
	def("TSMappedType").bases("TSType").build("typeParameter", "typeAnnotation").field("readonly", or(Boolean, "+", "-"), defaults["false"]).field("typeParameter", def("TSTypeParameter")).field("optional", or(Boolean, "+", "-"), defaults["false"]).field("typeAnnotation", or(def("TSType"), null), defaults["null"]);
	def("TSTupleType").bases("TSType").build("elementTypes").field("elementTypes", [or(def("TSType"), def("TSNamedTupleMember"))]);
	def("TSNamedTupleMember").bases("TSType").build("label", "elementType", "optional").field("label", def("Identifier")).field("optional", Boolean, defaults["false"]).field("elementType", def("TSType"));
	def("TSRestType").bases("TSType").build("typeAnnotation").field("typeAnnotation", def("TSType"));
	def("TSOptionalType").bases("TSType").build("typeAnnotation").field("typeAnnotation", def("TSType"));
	def("TSIndexedAccessType").bases("TSType").build("objectType", "indexType").field("objectType", def("TSType")).field("indexType", def("TSType"));
	def("TSTypeOperator").bases("TSType").build("operator").field("operator", String).field("typeAnnotation", def("TSType"));
	def("TSTypeAnnotation").bases("Node").build("typeAnnotation").field("typeAnnotation", or(def("TSType"), def("TSTypeAnnotation")));
	def("TSIndexSignature").bases("Declaration", "TSHasOptionalTypeAnnotation").build("parameters", "typeAnnotation").field("parameters", [def("Identifier")]).field("readonly", Boolean, defaults["false"]);
	def("TSPropertySignature").bases("Declaration", "TSHasOptionalTypeAnnotation").build("key", "typeAnnotation", "optional").field("key", def("Expression")).field("computed", Boolean, defaults["false"]).field("readonly", Boolean, defaults["false"]).field("optional", Boolean, defaults["false"]).field("initializer", or(def("Expression"), null), defaults["null"]);
	def("TSMethodSignature").bases("Declaration", "TSHasOptionalTypeParameters", "TSHasOptionalTypeAnnotation").build("key", "parameters", "typeAnnotation").field("key", def("Expression")).field("computed", Boolean, defaults["false"]).field("optional", Boolean, defaults["false"]).field("parameters", ParametersType);
	def("TSTypePredicate").bases("TSTypeAnnotation", "TSType").build("parameterName", "typeAnnotation", "asserts").field("parameterName", or(def("Identifier"), def("TSThisType"))).field("typeAnnotation", or(def("TSTypeAnnotation"), null), defaults["null"]).field("asserts", Boolean, defaults["false"]);
	["TSCallSignatureDeclaration", "TSConstructSignatureDeclaration"].forEach((typeName) => {
		def(typeName).bases("Declaration", "TSHasOptionalTypeParameters", "TSHasOptionalTypeAnnotation").build("parameters", "typeAnnotation").field("parameters", ParametersType);
	});
	def("TSEnumMember").bases("Node").build("id", "initializer").field("id", or(def("Identifier"), StringLiteral)).field("initializer", or(def("Expression"), null), defaults["null"]);
	def("TSTypeQuery").bases("TSType").build("exprName").field("exprName", or(TSEntityName, def("TSImportType")));
	var TSTypeMember = or(def("TSCallSignatureDeclaration"), def("TSConstructSignatureDeclaration"), def("TSIndexSignature"), def("TSMethodSignature"), def("TSPropertySignature"));
	def("TSTypeLiteral").bases("TSType").build("members").field("members", [TSTypeMember]);
	def("TSTypeParameter").bases("Identifier").build("name", "constraint", "default").field("name", or(def("Identifier"), String)).field("constraint", or(def("TSType"), void 0), defaults["undefined"]).field("default", or(def("TSType"), void 0), defaults["undefined"]);
	def("TSTypeAssertion").bases("Expression", "Pattern").build("typeAnnotation", "expression").field("typeAnnotation", def("TSType")).field("expression", def("Expression")).field("extra", or({ parenthesized: Boolean }, null), defaults["null"]);
	def("TSTypeParameterDeclaration").bases("Declaration").build("params").field("params", [def("TSTypeParameter")]);
	def("TSInstantiationExpression").bases("Expression", "TSHasOptionalTypeParameterInstantiation").build("expression", "typeParameters").field("expression", def("Expression"));
	def("TSTypeParameterInstantiation").bases("Node").build("params").field("params", [def("TSType")]);
	def("TSEnumDeclaration").bases("Declaration").build("id", "members").field("id", def("Identifier")).field("const", Boolean, defaults["false"]).field("declare", Boolean, defaults["false"]).field("members", [def("TSEnumMember")]).field("initializer", or(def("Expression"), null), defaults["null"]);
	def("TSTypeAliasDeclaration").bases("Declaration", "TSHasOptionalTypeParameters").build("id", "typeAnnotation").field("id", def("Identifier")).field("declare", Boolean, defaults["false"]).field("typeAnnotation", def("TSType"));
	def("TSModuleBlock").bases("Node").build("body").field("body", [def("Statement")]);
	def("TSModuleDeclaration").bases("Declaration").build("id", "body").field("id", or(StringLiteral, TSEntityName)).field("declare", Boolean, defaults["false"]).field("global", Boolean, defaults["false"]).field("body", or(def("TSModuleBlock"), def("TSModuleDeclaration"), null), defaults["null"]);
	def("TSImportType").bases("TSType", "TSHasOptionalTypeParameterInstantiation").build("argument", "qualifier", "typeParameters").field("argument", StringLiteral).field("qualifier", or(TSEntityName, void 0), defaults["undefined"]);
	def("TSImportEqualsDeclaration").bases("Declaration").build("id", "moduleReference").field("id", def("Identifier")).field("isExport", Boolean, defaults["false"]).field("moduleReference", or(TSEntityName, def("TSExternalModuleReference")));
	def("TSExternalModuleReference").bases("Declaration").build("expression").field("expression", StringLiteral);
	def("TSExportAssignment").bases("Statement").build("expression").field("expression", def("Expression"));
	def("TSNamespaceExportDeclaration").bases("Declaration").build("id").field("id", def("Identifier"));
	def("TSInterfaceBody").bases("Node").build("body").field("body", [TSTypeMember]);
	def("TSExpressionWithTypeArguments").bases("TSType", "TSHasOptionalTypeParameterInstantiation").build("expression", "typeParameters").field("expression", TSEntityName);
	def("TSInterfaceDeclaration").bases("Declaration", "TSHasOptionalTypeParameters").build("id", "body").field("id", TSEntityName).field("declare", Boolean, defaults["false"]).field("extends", or([def("TSExpressionWithTypeArguments")], null), defaults["null"]).field("body", def("TSInterfaceBody"));
	def("TSParameterProperty").bases("Pattern").build("parameter").field("accessibility", or("public", "private", "protected", void 0), defaults["undefined"]).field("readonly", Boolean, defaults["false"]).field("parameter", or(def("Identifier"), def("AssignmentPattern")));
	def("ClassProperty").field("access", or("public", "private", "protected", void 0), defaults["undefined"]);
	def("ClassAccessorProperty").bases("Declaration", "TSHasOptionalTypeAnnotation");
	def("ClassBody").field("body", [or(def("MethodDefinition"), def("VariableDeclarator"), def("ClassPropertyDefinition"), def("ClassProperty"), def("ClassPrivateProperty"), def("ClassAccessorProperty"), def("ClassMethod"), def("ClassPrivateMethod"), def("StaticBlock"), def("TSDeclareMethod"), TSTypeMember)]);
}
//#endregion
//#region vendor/ast-types/src/gen/namedTypes.ts
let namedTypes$1;
namedTypes$1 || (namedTypes$1 = {});
//#endregion
//#region vendor/ast-types/src/main.ts
const { astNodesAreEquivalent, builders: builders$1, builtInTypes, defineMethod, eachField, finalize, getBuilderName, getFieldNames, getFieldValue, getSupertypeNames, namedTypes: n$3, NodePath, Path, PathVisitor, someField, Type, use, visit } = fork_default([
	es_proposals_default,
	jsx_default,
	flow_default,
	esprima_default,
	babel_default,
	typescript_default
]);
Object.assign(namedTypes$1, n$3);
//#endregion
//#region node_modules/.pnpm/source-map-js@1.2.1/node_modules/source-map-js/lib/base64.js
var require_base64 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var intToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
	/**
	* Encode an integer in the range of 0 to 63 to a single base 64 digit.
	*/
	exports.encode = function(number) {
		if (0 <= number && number < intToCharMap.length) return intToCharMap[number];
		throw new TypeError("Must be between 0 and 63: " + number);
	};
	/**
	* Decode a single base 64 character code digit to an integer. Returns -1 on
	* failure.
	*/
	exports.decode = function(charCode) {
		var bigA = 65;
		var bigZ = 90;
		var littleA = 97;
		var littleZ = 122;
		var zero = 48;
		var nine = 57;
		var plus = 43;
		var slash = 47;
		var littleOffset = 26;
		var numberOffset = 52;
		if (bigA <= charCode && charCode <= bigZ) return charCode - bigA;
		if (littleA <= charCode && charCode <= littleZ) return charCode - littleA + littleOffset;
		if (zero <= charCode && charCode <= nine) return charCode - zero + numberOffset;
		if (charCode == plus) return 62;
		if (charCode == slash) return 63;
		return -1;
	};
}));
//#endregion
//#region node_modules/.pnpm/source-map-js@1.2.1/node_modules/source-map-js/lib/base64-vlq.js
var require_base64_vlq = /* @__PURE__ */ __commonJSMin(((exports) => {
	var base64 = require_base64();
	var VLQ_BASE_SHIFT = 5;
	var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
	var VLQ_BASE_MASK = VLQ_BASE - 1;
	var VLQ_CONTINUATION_BIT = VLQ_BASE;
	/**
	* Converts from a two-complement value to a value where the sign bit is
	* placed in the least significant bit.  For example, as decimals:
	*   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
	*   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
	*/
	function toVLQSigned(aValue) {
		return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
	}
	/**
	* Converts to a two-complement value from a value where the sign bit is
	* placed in the least significant bit.  For example, as decimals:
	*   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
	*   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
	*/
	function fromVLQSigned(aValue) {
		var isNegative = (aValue & 1) === 1;
		var shifted = aValue >> 1;
		return isNegative ? -shifted : shifted;
	}
	/**
	* Returns the base 64 VLQ encoded value.
	*/
	exports.encode = function base64VLQ_encode(aValue) {
		var encoded = "";
		var digit;
		var vlq = toVLQSigned(aValue);
		do {
			digit = vlq & VLQ_BASE_MASK;
			vlq >>>= VLQ_BASE_SHIFT;
			if (vlq > 0) digit |= VLQ_CONTINUATION_BIT;
			encoded += base64.encode(digit);
		} while (vlq > 0);
		return encoded;
	};
	/**
	* Decodes the next base 64 VLQ value from the given string and returns the
	* value and the rest of the string via the out parameter.
	*/
	exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
		var strLen = aStr.length;
		var result = 0;
		var shift = 0;
		var continuation, digit;
		do {
			if (aIndex >= strLen) throw new Error("Expected more digits in base 64 VLQ value.");
			digit = base64.decode(aStr.charCodeAt(aIndex++));
			if (digit === -1) throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
			continuation = !!(digit & VLQ_CONTINUATION_BIT);
			digit &= VLQ_BASE_MASK;
			result = result + (digit << shift);
			shift += VLQ_BASE_SHIFT;
		} while (continuation);
		aOutParam.value = fromVLQSigned(result);
		aOutParam.rest = aIndex;
	};
}));
//#endregion
//#region node_modules/.pnpm/source-map-js@1.2.1/node_modules/source-map-js/lib/util.js
var require_util = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* This is a helper function for getting values from parameter/options
	* objects.
	*
	* @param args The object we are extracting values from
	* @param name The name of the property we are getting.
	* @param defaultValue An optional value to return if the property is missing
	* from the object. If this is not specified and the property is missing, an
	* error will be thrown.
	*/
	function getArg(aArgs, aName, aDefaultValue) {
		if (aName in aArgs) return aArgs[aName];
		else if (arguments.length === 3) return aDefaultValue;
		else throw new Error("\"" + aName + "\" is a required argument.");
	}
	exports.getArg = getArg;
	var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
	var dataUrlRegexp = /^data:.+\,.+$/;
	function urlParse(aUrl) {
		var match = aUrl.match(urlRegexp);
		if (!match) return null;
		return {
			scheme: match[1],
			auth: match[2],
			host: match[3],
			port: match[4],
			path: match[5]
		};
	}
	exports.urlParse = urlParse;
	function urlGenerate(aParsedUrl) {
		var url = "";
		if (aParsedUrl.scheme) url += aParsedUrl.scheme + ":";
		url += "//";
		if (aParsedUrl.auth) url += aParsedUrl.auth + "@";
		if (aParsedUrl.host) url += aParsedUrl.host;
		if (aParsedUrl.port) url += ":" + aParsedUrl.port;
		if (aParsedUrl.path) url += aParsedUrl.path;
		return url;
	}
	exports.urlGenerate = urlGenerate;
	var MAX_CACHED_INPUTS = 32;
	/**
	* Takes some function `f(input) -> result` and returns a memoized version of
	* `f`.
	*
	* We keep at most `MAX_CACHED_INPUTS` memoized results of `f` alive. The
	* memoization is a dumb-simple, linear least-recently-used cache.
	*/
	function lruMemoize(f) {
		var cache = [];
		return function(input) {
			for (var i = 0; i < cache.length; i++) if (cache[i].input === input) {
				var temp = cache[0];
				cache[0] = cache[i];
				cache[i] = temp;
				return cache[0].result;
			}
			var result = f(input);
			cache.unshift({
				input,
				result
			});
			if (cache.length > MAX_CACHED_INPUTS) cache.pop();
			return result;
		};
	}
	/**
	* Normalizes a path, or the path portion of a URL:
	*
	* - Replaces consecutive slashes with one slash.
	* - Removes unnecessary '.' parts.
	* - Removes unnecessary '<dir>/..' parts.
	*
	* Based on code in the Node.js 'path' core module.
	*
	* @param aPath The path or url to normalize.
	*/
	var normalize = lruMemoize(function normalize(aPath) {
		var path = aPath;
		var url = urlParse(aPath);
		if (url) {
			if (!url.path) return aPath;
			path = url.path;
		}
		var isAbsolute = exports.isAbsolute(path);
		var parts = [];
		var start = 0;
		var i = 0;
		while (true) {
			start = i;
			i = path.indexOf("/", start);
			if (i === -1) {
				parts.push(path.slice(start));
				break;
			} else {
				parts.push(path.slice(start, i));
				while (i < path.length && path[i] === "/") i++;
			}
		}
		for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
			part = parts[i];
			if (part === ".") parts.splice(i, 1);
			else if (part === "..") up++;
			else if (up > 0) {
				if (part === "") {
					parts.splice(i + 1, up);
					up = 0;
				} else {
					parts.splice(i, 2);
					up--;
				}
			}
		}
		path = parts.join("/");
		if (path === "") path = isAbsolute ? "/" : ".";
		if (url) {
			url.path = path;
			return urlGenerate(url);
		}
		return path;
	});
	exports.normalize = normalize;
	/**
	* Joins two paths/URLs.
	*
	* @param aRoot The root path or URL.
	* @param aPath The path or URL to be joined with the root.
	*
	* - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
	*   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
	*   first.
	* - Otherwise aPath is a path. If aRoot is a URL, then its path portion
	*   is updated with the result and aRoot is returned. Otherwise the result
	*   is returned.
	*   - If aPath is absolute, the result is aPath.
	*   - Otherwise the two paths are joined with a slash.
	* - Joining for example 'http://' and 'www.example.com' is also supported.
	*/
	function join(aRoot, aPath) {
		if (aRoot === "") aRoot = ".";
		if (aPath === "") aPath = ".";
		var aPathUrl = urlParse(aPath);
		var aRootUrl = urlParse(aRoot);
		if (aRootUrl) aRoot = aRootUrl.path || "/";
		if (aPathUrl && !aPathUrl.scheme) {
			if (aRootUrl) aPathUrl.scheme = aRootUrl.scheme;
			return urlGenerate(aPathUrl);
		}
		if (aPathUrl || aPath.match(dataUrlRegexp)) return aPath;
		if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
			aRootUrl.host = aPath;
			return urlGenerate(aRootUrl);
		}
		var joined = aPath.charAt(0) === "/" ? aPath : normalize(aRoot.replace(/\/+$/, "") + "/" + aPath);
		if (aRootUrl) {
			aRootUrl.path = joined;
			return urlGenerate(aRootUrl);
		}
		return joined;
	}
	exports.join = join;
	exports.isAbsolute = function(aPath) {
		return aPath.charAt(0) === "/" || urlRegexp.test(aPath);
	};
	/**
	* Make a path relative to a URL or another path.
	*
	* @param aRoot The root path or URL.
	* @param aPath The path or URL to be made relative to aRoot.
	*/
	function relative(aRoot, aPath) {
		if (aRoot === "") aRoot = ".";
		aRoot = aRoot.replace(/\/$/, "");
		var level = 0;
		while (aPath.indexOf(aRoot + "/") !== 0) {
			var index = aRoot.lastIndexOf("/");
			if (index < 0) return aPath;
			aRoot = aRoot.slice(0, index);
			if (aRoot.match(/^([^\/]+:\/)?\/*$/)) return aPath;
			++level;
		}
		return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
	}
	exports.relative = relative;
	var supportsNullProto = function() {
		return !("__proto__" in Object.create(null));
	}();
	function identity(s) {
		return s;
	}
	/**
	* Because behavior goes wacky when you set `__proto__` on objects, we
	* have to prefix all the strings in our set with an arbitrary character.
	*
	* See https://github.com/mozilla/source-map/pull/31 and
	* https://github.com/mozilla/source-map/issues/30
	*
	* @param String aStr
	*/
	function toSetString(aStr) {
		if (isProtoString(aStr)) return "$" + aStr;
		return aStr;
	}
	exports.toSetString = supportsNullProto ? identity : toSetString;
	function fromSetString(aStr) {
		if (isProtoString(aStr)) return aStr.slice(1);
		return aStr;
	}
	exports.fromSetString = supportsNullProto ? identity : fromSetString;
	function isProtoString(s) {
		if (!s) return false;
		var length = s.length;
		if (length < 9) return false;
		if (s.charCodeAt(length - 1) !== 95 || s.charCodeAt(length - 2) !== 95 || s.charCodeAt(length - 3) !== 111 || s.charCodeAt(length - 4) !== 116 || s.charCodeAt(length - 5) !== 111 || s.charCodeAt(length - 6) !== 114 || s.charCodeAt(length - 7) !== 112 || s.charCodeAt(length - 8) !== 95 || s.charCodeAt(length - 9) !== 95) return false;
		for (var i = length - 10; i >= 0; i--) if (s.charCodeAt(i) !== 36) return false;
		return true;
	}
	/**
	* Comparator between two mappings where the original positions are compared.
	*
	* Optionally pass in `true` as `onlyCompareGenerated` to consider two
	* mappings with the same original source/line/column, but different generated
	* line and column the same. Useful when searching for a mapping with a
	* stubbed out mapping.
	*/
	function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
		var cmp = strcmp(mappingA.source, mappingB.source);
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0 || onlyCompareOriginal) return cmp;
		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0) return cmp;
		cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) return cmp;
		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByOriginalPositions = compareByOriginalPositions;
	function compareByOriginalPositionsNoSource(mappingA, mappingB, onlyCompareOriginal) {
		var cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0 || onlyCompareOriginal) return cmp;
		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0) return cmp;
		cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) return cmp;
		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByOriginalPositionsNoSource = compareByOriginalPositionsNoSource;
	/**
	* Comparator between two mappings with deflated source and name indices where
	* the generated positions are compared.
	*
	* Optionally pass in `true` as `onlyCompareGenerated` to consider two
	* mappings with the same generated line and column, but different
	* source/name/original line and column the same. Useful when searching for a
	* mapping with a stubbed out mapping.
	*/
	function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
		var cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0 || onlyCompareGenerated) return cmp;
		cmp = strcmp(mappingA.source, mappingB.source);
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0) return cmp;
		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;
	function compareByGeneratedPositionsDeflatedNoLine(mappingA, mappingB, onlyCompareGenerated) {
		var cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0 || onlyCompareGenerated) return cmp;
		cmp = strcmp(mappingA.source, mappingB.source);
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0) return cmp;
		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByGeneratedPositionsDeflatedNoLine = compareByGeneratedPositionsDeflatedNoLine;
	function strcmp(aStr1, aStr2) {
		if (aStr1 === aStr2) return 0;
		if (aStr1 === null) return 1;
		if (aStr2 === null) return -1;
		if (aStr1 > aStr2) return 1;
		return -1;
	}
	/**
	* Comparator between two mappings with inflated source and name strings where
	* the generated positions are compared.
	*/
	function compareByGeneratedPositionsInflated(mappingA, mappingB) {
		var cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0) return cmp;
		cmp = strcmp(mappingA.source, mappingB.source);
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0) return cmp;
		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
	/**
	* Strip any JSON XSSI avoidance prefix from the string (as documented
	* in the source maps specification), and then parse the string as
	* JSON.
	*/
	function parseSourceMapInput(str) {
		return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ""));
	}
	exports.parseSourceMapInput = parseSourceMapInput;
	/**
	* Compute the URL of a source given the the source root, the source's
	* URL, and the source map's URL.
	*/
	function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
		sourceURL = sourceURL || "";
		if (sourceRoot) {
			if (sourceRoot[sourceRoot.length - 1] !== "/" && sourceURL[0] !== "/") sourceRoot += "/";
			sourceURL = sourceRoot + sourceURL;
		}
		if (sourceMapURL) {
			var parsed = urlParse(sourceMapURL);
			if (!parsed) throw new Error("sourceMapURL could not be parsed");
			if (parsed.path) {
				var index = parsed.path.lastIndexOf("/");
				if (index >= 0) parsed.path = parsed.path.substring(0, index + 1);
			}
			sourceURL = join(urlGenerate(parsed), sourceURL);
		}
		return normalize(sourceURL);
	}
	exports.computeSourceURL = computeSourceURL;
}));
//#endregion
//#region node_modules/.pnpm/source-map-js@1.2.1/node_modules/source-map-js/lib/array-set.js
var require_array_set = /* @__PURE__ */ __commonJSMin(((exports) => {
	var util = require_util();
	var has = Object.prototype.hasOwnProperty;
	var hasNativeMap = typeof Map !== "undefined";
	/**
	* A data structure which is a combination of an array and a set. Adding a new
	* member is O(1), testing for membership is O(1), and finding the index of an
	* element is O(1). Removing elements from the set is not supported. Only
	* strings are supported for membership.
	*/
	function ArraySet() {
		this._array = [];
		this._set = hasNativeMap ? /* @__PURE__ */ new Map() : Object.create(null);
	}
	/**
	* Static method for creating ArraySet instances from an existing array.
	*/
	ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
		var set = new ArraySet();
		for (var i = 0, len = aArray.length; i < len; i++) set.add(aArray[i], aAllowDuplicates);
		return set;
	};
	/**
	* Return how many unique items are in this ArraySet. If duplicates have been
	* added, than those do not count towards the size.
	*
	* @returns Number
	*/
	ArraySet.prototype.size = function ArraySet_size() {
		return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
	};
	/**
	* Add the given string to this set.
	*
	* @param String aStr
	*/
	ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
		var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
		var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
		var idx = this._array.length;
		if (!isDuplicate || aAllowDuplicates) this._array.push(aStr);
		if (!isDuplicate) {
			if (hasNativeMap) this._set.set(aStr, idx);
			else this._set[sStr] = idx;
		}
	};
	/**
	* Is the given string a member of this set?
	*
	* @param String aStr
	*/
	ArraySet.prototype.has = function ArraySet_has(aStr) {
		if (hasNativeMap) return this._set.has(aStr);
		else {
			var sStr = util.toSetString(aStr);
			return has.call(this._set, sStr);
		}
	};
	/**
	* What is the index of the given string in the array?
	*
	* @param String aStr
	*/
	ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
		if (hasNativeMap) {
			var idx = this._set.get(aStr);
			if (idx >= 0) return idx;
		} else {
			var sStr = util.toSetString(aStr);
			if (has.call(this._set, sStr)) return this._set[sStr];
		}
		throw new Error("\"" + aStr + "\" is not in the set.");
	};
	/**
	* What is the element at the given index?
	*
	* @param Number aIdx
	*/
	ArraySet.prototype.at = function ArraySet_at(aIdx) {
		if (aIdx >= 0 && aIdx < this._array.length) return this._array[aIdx];
		throw new Error("No element indexed by " + aIdx);
	};
	/**
	* Returns the array representation of this set (which has the proper indices
	* indicated by indexOf). Note that this is a copy of the internal array used
	* for storing the members so that no one can mess with internal state.
	*/
	ArraySet.prototype.toArray = function ArraySet_toArray() {
		return this._array.slice();
	};
	exports.ArraySet = ArraySet;
}));
//#endregion
//#region node_modules/.pnpm/source-map-js@1.2.1/node_modules/source-map-js/lib/mapping-list.js
var require_mapping_list = /* @__PURE__ */ __commonJSMin(((exports) => {
	var util = require_util();
	/**
	* Determine whether mappingB is after mappingA with respect to generated
	* position.
	*/
	function generatedPositionAfter(mappingA, mappingB) {
		var lineA = mappingA.generatedLine;
		var lineB = mappingB.generatedLine;
		var columnA = mappingA.generatedColumn;
		var columnB = mappingB.generatedColumn;
		return lineB > lineA || lineB == lineA && columnB >= columnA || util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
	}
	/**
	* A data structure to provide a sorted view of accumulated mappings in a
	* performance conscious manner. It trades a neglibable overhead in general
	* case for a large speedup in case of mappings being added in order.
	*/
	function MappingList() {
		this._array = [];
		this._sorted = true;
		this._last = {
			generatedLine: -1,
			generatedColumn: 0
		};
	}
	/**
	* Iterate through internal items. This method takes the same arguments that
	* `Array.prototype.forEach` takes.
	*
	* NOTE: The order of the mappings is NOT guaranteed.
	*/
	MappingList.prototype.unsortedForEach = function MappingList_forEach(aCallback, aThisArg) {
		this._array.forEach(aCallback, aThisArg);
	};
	/**
	* Add the given source mapping.
	*
	* @param Object aMapping
	*/
	MappingList.prototype.add = function MappingList_add(aMapping) {
		if (generatedPositionAfter(this._last, aMapping)) {
			this._last = aMapping;
			this._array.push(aMapping);
		} else {
			this._sorted = false;
			this._array.push(aMapping);
		}
	};
	/**
	* Returns the flat, sorted array of mappings. The mappings are sorted by
	* generated position.
	*
	* WARNING: This method returns internal data without copying, for
	* performance. The return value must NOT be mutated, and should be treated as
	* an immutable borrow. If you want to take ownership, you must make your own
	* copy.
	*/
	MappingList.prototype.toArray = function MappingList_toArray() {
		if (!this._sorted) {
			this._array.sort(util.compareByGeneratedPositionsInflated);
			this._sorted = true;
		}
		return this._array;
	};
	exports.MappingList = MappingList;
}));
//#endregion
//#region node_modules/.pnpm/source-map-js@1.2.1/node_modules/source-map-js/lib/source-map-generator.js
var require_source_map_generator = /* @__PURE__ */ __commonJSMin(((exports) => {
	var base64VLQ = require_base64_vlq();
	var util = require_util();
	var ArraySet = require_array_set().ArraySet;
	var MappingList = require_mapping_list().MappingList;
	/**
	* An instance of the SourceMapGenerator represents a source map which is
	* being built incrementally. You may pass an object with the following
	* properties:
	*
	*   - file: The filename of the generated source.
	*   - sourceRoot: A root for all relative URLs in this source map.
	*/
	function SourceMapGenerator(aArgs) {
		if (!aArgs) aArgs = {};
		this._file = util.getArg(aArgs, "file", null);
		this._sourceRoot = util.getArg(aArgs, "sourceRoot", null);
		this._skipValidation = util.getArg(aArgs, "skipValidation", false);
		this._ignoreInvalidMapping = util.getArg(aArgs, "ignoreInvalidMapping", false);
		this._sources = new ArraySet();
		this._names = new ArraySet();
		this._mappings = new MappingList();
		this._sourcesContents = null;
	}
	SourceMapGenerator.prototype._version = 3;
	/**
	* Creates a new SourceMapGenerator based on a SourceMapConsumer
	*
	* @param aSourceMapConsumer The SourceMap.
	*/
	SourceMapGenerator.fromSourceMap = function SourceMapGenerator_fromSourceMap(aSourceMapConsumer, generatorOps) {
		var sourceRoot = aSourceMapConsumer.sourceRoot;
		var generator = new SourceMapGenerator(Object.assign(generatorOps || {}, {
			file: aSourceMapConsumer.file,
			sourceRoot
		}));
		aSourceMapConsumer.eachMapping(function(mapping) {
			var newMapping = { generated: {
				line: mapping.generatedLine,
				column: mapping.generatedColumn
			} };
			if (mapping.source != null) {
				newMapping.source = mapping.source;
				if (sourceRoot != null) newMapping.source = util.relative(sourceRoot, newMapping.source);
				newMapping.original = {
					line: mapping.originalLine,
					column: mapping.originalColumn
				};
				if (mapping.name != null) newMapping.name = mapping.name;
			}
			generator.addMapping(newMapping);
		});
		aSourceMapConsumer.sources.forEach(function(sourceFile) {
			var sourceRelative = sourceFile;
			if (sourceRoot !== null) sourceRelative = util.relative(sourceRoot, sourceFile);
			if (!generator._sources.has(sourceRelative)) generator._sources.add(sourceRelative);
			var content = aSourceMapConsumer.sourceContentFor(sourceFile);
			if (content != null) generator.setSourceContent(sourceFile, content);
		});
		return generator;
	};
	/**
	* Add a single mapping from original source line and column to the generated
	* source's line and column for this source map being created. The mapping
	* object should have the following properties:
	*
	*   - generated: An object with the generated line and column positions.
	*   - original: An object with the original line and column positions.
	*   - source: The original source file (relative to the sourceRoot).
	*   - name: An optional original token name for this mapping.
	*/
	SourceMapGenerator.prototype.addMapping = function SourceMapGenerator_addMapping(aArgs) {
		var generated = util.getArg(aArgs, "generated");
		var original = util.getArg(aArgs, "original", null);
		var source = util.getArg(aArgs, "source", null);
		var name = util.getArg(aArgs, "name", null);
		if (!this._skipValidation) {
			if (this._validateMapping(generated, original, source, name) === false) return;
		}
		if (source != null) {
			source = String(source);
			if (!this._sources.has(source)) this._sources.add(source);
		}
		if (name != null) {
			name = String(name);
			if (!this._names.has(name)) this._names.add(name);
		}
		this._mappings.add({
			generatedLine: generated.line,
			generatedColumn: generated.column,
			originalLine: original != null && original.line,
			originalColumn: original != null && original.column,
			source,
			name
		});
	};
	/**
	* Set the source content for a source file.
	*/
	SourceMapGenerator.prototype.setSourceContent = function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
		var source = aSourceFile;
		if (this._sourceRoot != null) source = util.relative(this._sourceRoot, source);
		if (aSourceContent != null) {
			if (!this._sourcesContents) this._sourcesContents = Object.create(null);
			this._sourcesContents[util.toSetString(source)] = aSourceContent;
		} else if (this._sourcesContents) {
			delete this._sourcesContents[util.toSetString(source)];
			if (Object.keys(this._sourcesContents).length === 0) this._sourcesContents = null;
		}
	};
	/**
	* Applies the mappings of a sub-source-map for a specific source file to the
	* source map being generated. Each mapping to the supplied source file is
	* rewritten using the supplied source map. Note: The resolution for the
	* resulting mappings is the minimium of this map and the supplied map.
	*
	* @param aSourceMapConsumer The source map to be applied.
	* @param aSourceFile Optional. The filename of the source file.
	*        If omitted, SourceMapConsumer's file property will be used.
	* @param aSourceMapPath Optional. The dirname of the path to the source map
	*        to be applied. If relative, it is relative to the SourceMapConsumer.
	*        This parameter is needed when the two source maps aren't in the same
	*        directory, and the source map to be applied contains relative source
	*        paths. If so, those relative source paths need to be rewritten
	*        relative to the SourceMapGenerator.
	*/
	SourceMapGenerator.prototype.applySourceMap = function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
		var sourceFile = aSourceFile;
		if (aSourceFile == null) {
			if (aSourceMapConsumer.file == null) throw new Error("SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's \"file\" property. Both were omitted.");
			sourceFile = aSourceMapConsumer.file;
		}
		var sourceRoot = this._sourceRoot;
		if (sourceRoot != null) sourceFile = util.relative(sourceRoot, sourceFile);
		var newSources = new ArraySet();
		var newNames = new ArraySet();
		this._mappings.unsortedForEach(function(mapping) {
			if (mapping.source === sourceFile && mapping.originalLine != null) {
				var original = aSourceMapConsumer.originalPositionFor({
					line: mapping.originalLine,
					column: mapping.originalColumn
				});
				if (original.source != null) {
					mapping.source = original.source;
					if (aSourceMapPath != null) mapping.source = util.join(aSourceMapPath, mapping.source);
					if (sourceRoot != null) mapping.source = util.relative(sourceRoot, mapping.source);
					mapping.originalLine = original.line;
					mapping.originalColumn = original.column;
					if (original.name != null) mapping.name = original.name;
				}
			}
			var source = mapping.source;
			if (source != null && !newSources.has(source)) newSources.add(source);
			var name = mapping.name;
			if (name != null && !newNames.has(name)) newNames.add(name);
		}, this);
		this._sources = newSources;
		this._names = newNames;
		aSourceMapConsumer.sources.forEach(function(sourceFile) {
			var content = aSourceMapConsumer.sourceContentFor(sourceFile);
			if (content != null) {
				if (aSourceMapPath != null) sourceFile = util.join(aSourceMapPath, sourceFile);
				if (sourceRoot != null) sourceFile = util.relative(sourceRoot, sourceFile);
				this.setSourceContent(sourceFile, content);
			}
		}, this);
	};
	/**
	* A mapping can have one of the three levels of data:
	*
	*   1. Just the generated position.
	*   2. The Generated position, original position, and original source.
	*   3. Generated and original position, original source, as well as a name
	*      token.
	*
	* To maintain consistency, we validate that any new mapping being added falls
	* in to one of these categories.
	*/
	SourceMapGenerator.prototype._validateMapping = function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName) {
		if (aOriginal && typeof aOriginal.line !== "number" && typeof aOriginal.column !== "number") {
			var message = "original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.";
			if (this._ignoreInvalidMapping) {
				if (typeof console !== "undefined" && console.warn) console.warn(message);
				return false;
			} else throw new Error(message);
		}
		if (aGenerated && "line" in aGenerated && "column" in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName) return;
		else if (aGenerated && "line" in aGenerated && "column" in aGenerated && aOriginal && "line" in aOriginal && "column" in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource) return;
		else {
			var message = "Invalid mapping: " + JSON.stringify({
				generated: aGenerated,
				source: aSource,
				original: aOriginal,
				name: aName
			});
			if (this._ignoreInvalidMapping) {
				if (typeof console !== "undefined" && console.warn) console.warn(message);
				return false;
			} else throw new Error(message);
		}
	};
	/**
	* Serialize the accumulated mappings in to the stream of base 64 VLQs
	* specified by the source map format.
	*/
	SourceMapGenerator.prototype._serializeMappings = function SourceMapGenerator_serializeMappings() {
		var previousGeneratedColumn = 0;
		var previousGeneratedLine = 1;
		var previousOriginalColumn = 0;
		var previousOriginalLine = 0;
		var previousName = 0;
		var previousSource = 0;
		var result = "";
		var next;
		var mapping;
		var nameIdx;
		var sourceIdx;
		var mappings = this._mappings.toArray();
		for (var i = 0, len = mappings.length; i < len; i++) {
			mapping = mappings[i];
			next = "";
			if (mapping.generatedLine !== previousGeneratedLine) {
				previousGeneratedColumn = 0;
				while (mapping.generatedLine !== previousGeneratedLine) {
					next += ";";
					previousGeneratedLine++;
				}
			} else if (i > 0) {
				if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) continue;
				next += ",";
			}
			next += base64VLQ.encode(mapping.generatedColumn - previousGeneratedColumn);
			previousGeneratedColumn = mapping.generatedColumn;
			if (mapping.source != null) {
				sourceIdx = this._sources.indexOf(mapping.source);
				next += base64VLQ.encode(sourceIdx - previousSource);
				previousSource = sourceIdx;
				next += base64VLQ.encode(mapping.originalLine - 1 - previousOriginalLine);
				previousOriginalLine = mapping.originalLine - 1;
				next += base64VLQ.encode(mapping.originalColumn - previousOriginalColumn);
				previousOriginalColumn = mapping.originalColumn;
				if (mapping.name != null) {
					nameIdx = this._names.indexOf(mapping.name);
					next += base64VLQ.encode(nameIdx - previousName);
					previousName = nameIdx;
				}
			}
			result += next;
		}
		return result;
	};
	SourceMapGenerator.prototype._generateSourcesContent = function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
		return aSources.map(function(source) {
			if (!this._sourcesContents) return null;
			if (aSourceRoot != null) source = util.relative(aSourceRoot, source);
			var key = util.toSetString(source);
			return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
		}, this);
	};
	/**
	* Externalize the source map.
	*/
	SourceMapGenerator.prototype.toJSON = function SourceMapGenerator_toJSON() {
		var map = {
			version: this._version,
			sources: this._sources.toArray(),
			names: this._names.toArray(),
			mappings: this._serializeMappings()
		};
		if (this._file != null) map.file = this._file;
		if (this._sourceRoot != null) map.sourceRoot = this._sourceRoot;
		if (this._sourcesContents) map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
		return map;
	};
	/**
	* Render the source map being generated to a string.
	*/
	SourceMapGenerator.prototype.toString = function SourceMapGenerator_toString() {
		return JSON.stringify(this.toJSON());
	};
	exports.SourceMapGenerator = SourceMapGenerator;
}));
//#endregion
//#region node_modules/.pnpm/source-map-js@1.2.1/node_modules/source-map-js/lib/binary-search.js
var require_binary_search = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.GREATEST_LOWER_BOUND = 1;
	exports.LEAST_UPPER_BOUND = 2;
	/**
	* Recursive implementation of binary search.
	*
	* @param aLow Indices here and lower do not contain the needle.
	* @param aHigh Indices here and higher do not contain the needle.
	* @param aNeedle The element being searched for.
	* @param aHaystack The non-empty array being searched.
	* @param aCompare Function which takes two elements and returns -1, 0, or 1.
	* @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
	*     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
	*     closest element that is smaller than or greater than the one we are
	*     searching for, respectively, if the exact element cannot be found.
	*/
	function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
		var mid = Math.floor((aHigh - aLow) / 2) + aLow;
		var cmp = aCompare(aNeedle, aHaystack[mid], true);
		if (cmp === 0) return mid;
		else if (cmp > 0) {
			if (aHigh - mid > 1) return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
			if (aBias == exports.LEAST_UPPER_BOUND) return aHigh < aHaystack.length ? aHigh : -1;
			else return mid;
		} else {
			if (mid - aLow > 1) return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
			if (aBias == exports.LEAST_UPPER_BOUND) return mid;
			else return aLow < 0 ? -1 : aLow;
		}
	}
	/**
	* This is an implementation of binary search which will always try and return
	* the index of the closest element if there is no exact hit. This is because
	* mappings between original and generated line/col pairs are single points,
	* and there is an implicit region between each of them, so a miss just means
	* that you aren't on the very start of a region.
	*
	* @param aNeedle The element you are looking for.
	* @param aHaystack The array that is being searched.
	* @param aCompare A function which takes the needle and an element in the
	*     array and returns -1, 0, or 1 depending on whether the needle is less
	*     than, equal to, or greater than the element, respectively.
	* @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
	*     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
	*     closest element that is smaller than or greater than the one we are
	*     searching for, respectively, if the exact element cannot be found.
	*     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
	*/
	exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
		if (aHaystack.length === 0) return -1;
		var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack, aCompare, aBias || exports.GREATEST_LOWER_BOUND);
		if (index < 0) return -1;
		while (index - 1 >= 0) {
			if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) break;
			--index;
		}
		return index;
	};
}));
//#endregion
//#region node_modules/.pnpm/source-map-js@1.2.1/node_modules/source-map-js/lib/quick-sort.js
var require_quick_sort = /* @__PURE__ */ __commonJSMin(((exports) => {
	function SortTemplate(comparator) {
		/**
		* Swap the elements indexed by `x` and `y` in the array `ary`.
		*
		* @param {Array} ary
		*        The array.
		* @param {Number} x
		*        The index of the first item.
		* @param {Number} y
		*        The index of the second item.
		*/
		function swap(ary, x, y) {
			var temp = ary[x];
			ary[x] = ary[y];
			ary[y] = temp;
		}
		/**
		* Returns a random integer within the range `low .. high` inclusive.
		*
		* @param {Number} low
		*        The lower bound on the range.
		* @param {Number} high
		*        The upper bound on the range.
		*/
		function randomIntInRange(low, high) {
			return Math.round(low + Math.random() * (high - low));
		}
		/**
		* The Quick Sort algorithm.
		*
		* @param {Array} ary
		*        An array to sort.
		* @param {function} comparator
		*        Function to use to compare two items.
		* @param {Number} p
		*        Start index of the array
		* @param {Number} r
		*        End index of the array
		*/
		function doQuickSort(ary, comparator, p, r) {
			if (p < r) {
				var pivotIndex = randomIntInRange(p, r);
				var i = p - 1;
				swap(ary, pivotIndex, r);
				var pivot = ary[r];
				for (var j = p; j < r; j++) if (comparator(ary[j], pivot, false) <= 0) {
					i += 1;
					swap(ary, i, j);
				}
				swap(ary, i + 1, j);
				var q = i + 1;
				doQuickSort(ary, comparator, p, q - 1);
				doQuickSort(ary, comparator, q + 1, r);
			}
		}
		return doQuickSort;
	}
	function cloneSort(comparator) {
		let template = SortTemplate.toString();
		return new Function(`return ${template}`)()(comparator);
	}
	/**
	* Sort the given array in-place with the given comparator function.
	*
	* @param {Array} ary
	*        An array to sort.
	* @param {function} comparator
	*        Function to use to compare two items.
	*/
	let sortCache = /* @__PURE__ */ new WeakMap();
	exports.quickSort = function(ary, comparator, start = 0) {
		let doQuickSort = sortCache.get(comparator);
		if (doQuickSort === void 0) {
			doQuickSort = cloneSort(comparator);
			sortCache.set(comparator, doQuickSort);
		}
		doQuickSort(ary, comparator, start, ary.length - 1);
	};
}));
//#endregion
//#region node_modules/.pnpm/source-map-js@1.2.1/node_modules/source-map-js/lib/source-map-consumer.js
var require_source_map_consumer = /* @__PURE__ */ __commonJSMin(((exports) => {
	var util = require_util();
	var binarySearch = require_binary_search();
	var ArraySet = require_array_set().ArraySet;
	var base64VLQ = require_base64_vlq();
	var quickSort = require_quick_sort().quickSort;
	function SourceMapConsumer(aSourceMap, aSourceMapURL) {
		var sourceMap = aSourceMap;
		if (typeof aSourceMap === "string") sourceMap = util.parseSourceMapInput(aSourceMap);
		return sourceMap.sections != null ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL) : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
	}
	SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
		return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
	};
	/**
	* The version of the source mapping spec that we are consuming.
	*/
	SourceMapConsumer.prototype._version = 3;
	SourceMapConsumer.prototype.__generatedMappings = null;
	Object.defineProperty(SourceMapConsumer.prototype, "_generatedMappings", {
		configurable: true,
		enumerable: true,
		get: function() {
			if (!this.__generatedMappings) this._parseMappings(this._mappings, this.sourceRoot);
			return this.__generatedMappings;
		}
	});
	SourceMapConsumer.prototype.__originalMappings = null;
	Object.defineProperty(SourceMapConsumer.prototype, "_originalMappings", {
		configurable: true,
		enumerable: true,
		get: function() {
			if (!this.__originalMappings) this._parseMappings(this._mappings, this.sourceRoot);
			return this.__originalMappings;
		}
	});
	SourceMapConsumer.prototype._charIsMappingSeparator = function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
		var c = aStr.charAt(index);
		return c === ";" || c === ",";
	};
	/**
	* Parse the mappings in a string in to a data structure which we can easily
	* query (the ordered arrays in the `this.__generatedMappings` and
	* `this.__originalMappings` properties).
	*/
	SourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
		throw new Error("Subclasses must implement _parseMappings");
	};
	SourceMapConsumer.GENERATED_ORDER = 1;
	SourceMapConsumer.ORIGINAL_ORDER = 2;
	SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
	SourceMapConsumer.LEAST_UPPER_BOUND = 2;
	/**
	* Iterate over each mapping between an original source/line/column and a
	* generated line/column in this source map.
	*
	* @param Function aCallback
	*        The function that is called with each mapping.
	* @param Object aContext
	*        Optional. If specified, this object will be the value of `this` every
	*        time that `aCallback` is called.
	* @param aOrder
	*        Either `SourceMapConsumer.GENERATED_ORDER` or
	*        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
	*        iterate over the mappings sorted by the generated file's line/column
	*        order or the original's source/line/column order, respectively. Defaults to
	*        `SourceMapConsumer.GENERATED_ORDER`.
	*/
	SourceMapConsumer.prototype.eachMapping = function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
		var context = aContext || null;
		var order = aOrder || SourceMapConsumer.GENERATED_ORDER;
		var mappings;
		switch (order) {
			case SourceMapConsumer.GENERATED_ORDER:
				mappings = this._generatedMappings;
				break;
			case SourceMapConsumer.ORIGINAL_ORDER:
				mappings = this._originalMappings;
				break;
			default: throw new Error("Unknown order of iteration.");
		}
		var sourceRoot = this.sourceRoot;
		var boundCallback = aCallback.bind(context);
		var names = this._names;
		var sources = this._sources;
		var sourceMapURL = this._sourceMapURL;
		for (var i = 0, n = mappings.length; i < n; i++) {
			var mapping = mappings[i];
			var source = mapping.source === null ? null : sources.at(mapping.source);
			if (source !== null) source = util.computeSourceURL(sourceRoot, source, sourceMapURL);
			boundCallback({
				source,
				generatedLine: mapping.generatedLine,
				generatedColumn: mapping.generatedColumn,
				originalLine: mapping.originalLine,
				originalColumn: mapping.originalColumn,
				name: mapping.name === null ? null : names.at(mapping.name)
			});
		}
	};
	/**
	* Returns all generated line and column information for the original source,
	* line, and column provided. If no column is provided, returns all mappings
	* corresponding to a either the line we are searching for or the next
	* closest line that has any mappings. Otherwise, returns all mappings
	* corresponding to the given line and either the column we are searching for
	* or the next closest column that has any offsets.
	*
	* The only argument is an object with the following properties:
	*
	*   - source: The filename of the original source.
	*   - line: The line number in the original source.  The line number is 1-based.
	*   - column: Optional. the column number in the original source.
	*    The column number is 0-based.
	*
	* and an array of objects is returned, each with the following properties:
	*
	*   - line: The line number in the generated source, or null.  The
	*    line number is 1-based.
	*   - column: The column number in the generated source, or null.
	*    The column number is 0-based.
	*/
	SourceMapConsumer.prototype.allGeneratedPositionsFor = function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
		var line = util.getArg(aArgs, "line");
		var needle = {
			source: util.getArg(aArgs, "source"),
			originalLine: line,
			originalColumn: util.getArg(aArgs, "column", 0)
		};
		needle.source = this._findSourceIndex(needle.source);
		if (needle.source < 0) return [];
		var mappings = [];
		var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions, binarySearch.LEAST_UPPER_BOUND);
		if (index >= 0) {
			var mapping = this._originalMappings[index];
			if (aArgs.column === void 0) {
				var originalLine = mapping.originalLine;
				while (mapping && mapping.originalLine === originalLine) {
					mappings.push({
						line: util.getArg(mapping, "generatedLine", null),
						column: util.getArg(mapping, "generatedColumn", null),
						lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
					});
					mapping = this._originalMappings[++index];
				}
			} else {
				var originalColumn = mapping.originalColumn;
				while (mapping && mapping.originalLine === line && mapping.originalColumn == originalColumn) {
					mappings.push({
						line: util.getArg(mapping, "generatedLine", null),
						column: util.getArg(mapping, "generatedColumn", null),
						lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
					});
					mapping = this._originalMappings[++index];
				}
			}
		}
		return mappings;
	};
	exports.SourceMapConsumer = SourceMapConsumer;
	/**
	* A BasicSourceMapConsumer instance represents a parsed source map which we can
	* query for information about the original file positions by giving it a file
	* position in the generated source.
	*
	* The first parameter is the raw source map (either as a JSON string, or
	* already parsed to an object). According to the spec, source maps have the
	* following attributes:
	*
	*   - version: Which version of the source map spec this map is following.
	*   - sources: An array of URLs to the original source files.
	*   - names: An array of identifiers which can be referrenced by individual mappings.
	*   - sourceRoot: Optional. The URL root from which all sources are relative.
	*   - sourcesContent: Optional. An array of contents of the original source files.
	*   - mappings: A string of base64 VLQs which contain the actual mappings.
	*   - file: Optional. The generated file this source map is associated with.
	*
	* Here is an example source map, taken from the source map spec[0]:
	*
	*     {
	*       version : 3,
	*       file: "out.js",
	*       sourceRoot : "",
	*       sources: ["foo.js", "bar.js"],
	*       names: ["src", "maps", "are", "fun"],
	*       mappings: "AA,AB;;ABCDE;"
	*     }
	*
	* The second parameter, if given, is a string whose value is the URL
	* at which the source map was found.  This URL is used to compute the
	* sources array.
	*
	* [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
	*/
	function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
		var sourceMap = aSourceMap;
		if (typeof aSourceMap === "string") sourceMap = util.parseSourceMapInput(aSourceMap);
		var version = util.getArg(sourceMap, "version");
		var sources = util.getArg(sourceMap, "sources");
		var names = util.getArg(sourceMap, "names", []);
		var sourceRoot = util.getArg(sourceMap, "sourceRoot", null);
		var sourcesContent = util.getArg(sourceMap, "sourcesContent", null);
		var mappings = util.getArg(sourceMap, "mappings");
		var file = util.getArg(sourceMap, "file", null);
		if (version != this._version) throw new Error("Unsupported version: " + version);
		if (sourceRoot) sourceRoot = util.normalize(sourceRoot);
		sources = sources.map(String).map(util.normalize).map(function(source) {
			return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source) ? util.relative(sourceRoot, source) : source;
		});
		this._names = ArraySet.fromArray(names.map(String), true);
		this._sources = ArraySet.fromArray(sources, true);
		this._absoluteSources = this._sources.toArray().map(function(s) {
			return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
		});
		this.sourceRoot = sourceRoot;
		this.sourcesContent = sourcesContent;
		this._mappings = mappings;
		this._sourceMapURL = aSourceMapURL;
		this.file = file;
	}
	BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
	BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;
	/**
	* Utility function to find the index of a source.  Returns -1 if not
	* found.
	*/
	BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
		var relativeSource = aSource;
		if (this.sourceRoot != null) relativeSource = util.relative(this.sourceRoot, relativeSource);
		if (this._sources.has(relativeSource)) return this._sources.indexOf(relativeSource);
		var i = 0;
		for (; i < this._absoluteSources.length; ++i) if (this._absoluteSources[i] == aSource) return i;
		return -1;
	};
	/**
	* Create a BasicSourceMapConsumer from a SourceMapGenerator.
	*
	* @param SourceMapGenerator aSourceMap
	*        The source map that will be consumed.
	* @param String aSourceMapURL
	*        The URL at which the source map can be found (optional)
	* @returns BasicSourceMapConsumer
	*/
	BasicSourceMapConsumer.fromSourceMap = function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
		var smc = Object.create(BasicSourceMapConsumer.prototype);
		var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
		var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
		smc.sourceRoot = aSourceMap._sourceRoot;
		smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(), smc.sourceRoot);
		smc.file = aSourceMap._file;
		smc._sourceMapURL = aSourceMapURL;
		smc._absoluteSources = smc._sources.toArray().map(function(s) {
			return util.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
		});
		var generatedMappings = aSourceMap._mappings.toArray().slice();
		var destGeneratedMappings = smc.__generatedMappings = [];
		var destOriginalMappings = smc.__originalMappings = [];
		for (var i = 0, length = generatedMappings.length; i < length; i++) {
			var srcMapping = generatedMappings[i];
			var destMapping = new Mapping();
			destMapping.generatedLine = srcMapping.generatedLine;
			destMapping.generatedColumn = srcMapping.generatedColumn;
			if (srcMapping.source) {
				destMapping.source = sources.indexOf(srcMapping.source);
				destMapping.originalLine = srcMapping.originalLine;
				destMapping.originalColumn = srcMapping.originalColumn;
				if (srcMapping.name) destMapping.name = names.indexOf(srcMapping.name);
				destOriginalMappings.push(destMapping);
			}
			destGeneratedMappings.push(destMapping);
		}
		quickSort(smc.__originalMappings, util.compareByOriginalPositions);
		return smc;
	};
	/**
	* The version of the source mapping spec that we are consuming.
	*/
	BasicSourceMapConsumer.prototype._version = 3;
	/**
	* The list of original sources.
	*/
	Object.defineProperty(BasicSourceMapConsumer.prototype, "sources", { get: function() {
		return this._absoluteSources.slice();
	} });
	/**
	* Provide the JIT with a nice shape / hidden class.
	*/
	function Mapping() {
		this.generatedLine = 0;
		this.generatedColumn = 0;
		this.source = null;
		this.originalLine = null;
		this.originalColumn = null;
		this.name = null;
	}
	/**
	* Parse the mappings in a string in to a data structure which we can easily
	* query (the ordered arrays in the `this.__generatedMappings` and
	* `this.__originalMappings` properties).
	*/
	const compareGenerated = util.compareByGeneratedPositionsDeflatedNoLine;
	function sortGenerated(array, start) {
		let l = array.length;
		let n = array.length - start;
		if (n <= 1) return;
		else if (n == 2) {
			let a = array[start];
			let b = array[start + 1];
			if (compareGenerated(a, b) > 0) {
				array[start] = b;
				array[start + 1] = a;
			}
		} else if (n < 20) for (let i = start; i < l; i++) for (let j = i; j > start; j--) {
			let a = array[j - 1];
			let b = array[j];
			if (compareGenerated(a, b) <= 0) break;
			array[j - 1] = b;
			array[j] = a;
		}
		else quickSort(array, compareGenerated, start);
	}
	BasicSourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
		var generatedLine = 1;
		var previousGeneratedColumn = 0;
		var previousOriginalLine = 0;
		var previousOriginalColumn = 0;
		var previousSource = 0;
		var previousName = 0;
		var length = aStr.length;
		var index = 0;
		var temp = {};
		var originalMappings = [];
		var generatedMappings = [], mapping, segment, end, value;
		let subarrayStart = 0;
		while (index < length) if (aStr.charAt(index) === ";") {
			generatedLine++;
			index++;
			previousGeneratedColumn = 0;
			sortGenerated(generatedMappings, subarrayStart);
			subarrayStart = generatedMappings.length;
		} else if (aStr.charAt(index) === ",") index++;
		else {
			mapping = new Mapping();
			mapping.generatedLine = generatedLine;
			for (end = index; end < length; end++) if (this._charIsMappingSeparator(aStr, end)) break;
			aStr.slice(index, end);
			segment = [];
			while (index < end) {
				base64VLQ.decode(aStr, index, temp);
				value = temp.value;
				index = temp.rest;
				segment.push(value);
			}
			if (segment.length === 2) throw new Error("Found a source, but no line and column");
			if (segment.length === 3) throw new Error("Found a source and line, but no column");
			mapping.generatedColumn = previousGeneratedColumn + segment[0];
			previousGeneratedColumn = mapping.generatedColumn;
			if (segment.length > 1) {
				mapping.source = previousSource + segment[1];
				previousSource += segment[1];
				mapping.originalLine = previousOriginalLine + segment[2];
				previousOriginalLine = mapping.originalLine;
				mapping.originalLine += 1;
				mapping.originalColumn = previousOriginalColumn + segment[3];
				previousOriginalColumn = mapping.originalColumn;
				if (segment.length > 4) {
					mapping.name = previousName + segment[4];
					previousName += segment[4];
				}
			}
			generatedMappings.push(mapping);
			if (typeof mapping.originalLine === "number") {
				let currentSource = mapping.source;
				while (originalMappings.length <= currentSource) originalMappings.push(null);
				if (originalMappings[currentSource] === null) originalMappings[currentSource] = [];
				originalMappings[currentSource].push(mapping);
			}
		}
		sortGenerated(generatedMappings, subarrayStart);
		this.__generatedMappings = generatedMappings;
		for (var i = 0; i < originalMappings.length; i++) if (originalMappings[i] != null) quickSort(originalMappings[i], util.compareByOriginalPositionsNoSource);
		this.__originalMappings = [].concat(...originalMappings);
	};
	/**
	* Find the mapping that best matches the hypothetical "needle" mapping that
	* we are searching for in the given "haystack" of mappings.
	*/
	BasicSourceMapConsumer.prototype._findMapping = function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName, aColumnName, aComparator, aBias) {
		if (aNeedle[aLineName] <= 0) throw new TypeError("Line must be greater than or equal to 1, got " + aNeedle[aLineName]);
		if (aNeedle[aColumnName] < 0) throw new TypeError("Column must be greater than or equal to 0, got " + aNeedle[aColumnName]);
		return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
	};
	/**
	* Compute the last column for each generated mapping. The last column is
	* inclusive.
	*/
	BasicSourceMapConsumer.prototype.computeColumnSpans = function SourceMapConsumer_computeColumnSpans() {
		for (var index = 0; index < this._generatedMappings.length; ++index) {
			var mapping = this._generatedMappings[index];
			if (index + 1 < this._generatedMappings.length) {
				var nextMapping = this._generatedMappings[index + 1];
				if (mapping.generatedLine === nextMapping.generatedLine) {
					mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
					continue;
				}
			}
			mapping.lastGeneratedColumn = Infinity;
		}
	};
	/**
	* Returns the original source, line, and column information for the generated
	* source's line and column positions provided. The only argument is an object
	* with the following properties:
	*
	*   - line: The line number in the generated source.  The line number
	*     is 1-based.
	*   - column: The column number in the generated source.  The column
	*     number is 0-based.
	*   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
	*     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
	*     closest element that is smaller than or greater than the one we are
	*     searching for, respectively, if the exact element cannot be found.
	*     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
	*
	* and an object is returned with the following properties:
	*
	*   - source: The original source file, or null.
	*   - line: The line number in the original source, or null.  The
	*     line number is 1-based.
	*   - column: The column number in the original source, or null.  The
	*     column number is 0-based.
	*   - name: The original identifier, or null.
	*/
	BasicSourceMapConsumer.prototype.originalPositionFor = function SourceMapConsumer_originalPositionFor(aArgs) {
		var needle = {
			generatedLine: util.getArg(aArgs, "line"),
			generatedColumn: util.getArg(aArgs, "column")
		};
		var index = this._findMapping(needle, this._generatedMappings, "generatedLine", "generatedColumn", util.compareByGeneratedPositionsDeflated, util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND));
		if (index >= 0) {
			var mapping = this._generatedMappings[index];
			if (mapping.generatedLine === needle.generatedLine) {
				var source = util.getArg(mapping, "source", null);
				if (source !== null) {
					source = this._sources.at(source);
					source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
				}
				var name = util.getArg(mapping, "name", null);
				if (name !== null) name = this._names.at(name);
				return {
					source,
					line: util.getArg(mapping, "originalLine", null),
					column: util.getArg(mapping, "originalColumn", null),
					name
				};
			}
		}
		return {
			source: null,
			line: null,
			column: null,
			name: null
		};
	};
	/**
	* Return true if we have the source content for every source in the source
	* map, false otherwise.
	*/
	BasicSourceMapConsumer.prototype.hasContentsOfAllSources = function BasicSourceMapConsumer_hasContentsOfAllSources() {
		if (!this.sourcesContent) return false;
		return this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(sc) {
			return sc == null;
		});
	};
	/**
	* Returns the original source content. The only argument is the url of the
	* original source file. Returns null if no original source content is
	* available.
	*/
	BasicSourceMapConsumer.prototype.sourceContentFor = function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
		if (!this.sourcesContent) return null;
		var index = this._findSourceIndex(aSource);
		if (index >= 0) return this.sourcesContent[index];
		var relativeSource = aSource;
		if (this.sourceRoot != null) relativeSource = util.relative(this.sourceRoot, relativeSource);
		var url;
		if (this.sourceRoot != null && (url = util.urlParse(this.sourceRoot))) {
			var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
			if (url.scheme == "file" && this._sources.has(fileUriAbsPath)) return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];
			if ((!url.path || url.path == "/") && this._sources.has("/" + relativeSource)) return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
		}
		if (nullOnMissing) return null;
		else throw new Error("\"" + relativeSource + "\" is not in the SourceMap.");
	};
	/**
	* Returns the generated line and column information for the original source,
	* line, and column positions provided. The only argument is an object with
	* the following properties:
	*
	*   - source: The filename of the original source.
	*   - line: The line number in the original source.  The line number
	*     is 1-based.
	*   - column: The column number in the original source.  The column
	*     number is 0-based.
	*   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
	*     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
	*     closest element that is smaller than or greater than the one we are
	*     searching for, respectively, if the exact element cannot be found.
	*     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
	*
	* and an object is returned with the following properties:
	*
	*   - line: The line number in the generated source, or null.  The
	*     line number is 1-based.
	*   - column: The column number in the generated source, or null.
	*     The column number is 0-based.
	*/
	BasicSourceMapConsumer.prototype.generatedPositionFor = function SourceMapConsumer_generatedPositionFor(aArgs) {
		var source = util.getArg(aArgs, "source");
		source = this._findSourceIndex(source);
		if (source < 0) return {
			line: null,
			column: null,
			lastColumn: null
		};
		var needle = {
			source,
			originalLine: util.getArg(aArgs, "line"),
			originalColumn: util.getArg(aArgs, "column")
		};
		var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions, util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND));
		if (index >= 0) {
			var mapping = this._originalMappings[index];
			if (mapping.source === needle.source) return {
				line: util.getArg(mapping, "generatedLine", null),
				column: util.getArg(mapping, "generatedColumn", null),
				lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
			};
		}
		return {
			line: null,
			column: null,
			lastColumn: null
		};
	};
	exports.BasicSourceMapConsumer = BasicSourceMapConsumer;
	/**
	* An IndexedSourceMapConsumer instance represents a parsed source map which
	* we can query for information. It differs from BasicSourceMapConsumer in
	* that it takes "indexed" source maps (i.e. ones with a "sections" field) as
	* input.
	*
	* The first parameter is a raw source map (either as a JSON string, or already
	* parsed to an object). According to the spec for indexed source maps, they
	* have the following attributes:
	*
	*   - version: Which version of the source map spec this map is following.
	*   - file: Optional. The generated file this source map is associated with.
	*   - sections: A list of section definitions.
	*
	* Each value under the "sections" field has two fields:
	*   - offset: The offset into the original specified at which this section
	*       begins to apply, defined as an object with a "line" and "column"
	*       field.
	*   - map: A source map definition. This source map could also be indexed,
	*       but doesn't have to be.
	*
	* Instead of the "map" field, it's also possible to have a "url" field
	* specifying a URL to retrieve a source map from, but that's currently
	* unsupported.
	*
	* Here's an example source map, taken from the source map spec[0], but
	* modified to omit a section which uses the "url" field.
	*
	*  {
	*    version : 3,
	*    file: "app.js",
	*    sections: [{
	*      offset: {line:100, column:10},
	*      map: {
	*        version : 3,
	*        file: "section.js",
	*        sources: ["foo.js", "bar.js"],
	*        names: ["src", "maps", "are", "fun"],
	*        mappings: "AAAA,E;;ABCDE;"
	*      }
	*    }],
	*  }
	*
	* The second parameter, if given, is a string whose value is the URL
	* at which the source map was found.  This URL is used to compute the
	* sources array.
	*
	* [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
	*/
	function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
		var sourceMap = aSourceMap;
		if (typeof aSourceMap === "string") sourceMap = util.parseSourceMapInput(aSourceMap);
		var version = util.getArg(sourceMap, "version");
		var sections = util.getArg(sourceMap, "sections");
		if (version != this._version) throw new Error("Unsupported version: " + version);
		this._sources = new ArraySet();
		this._names = new ArraySet();
		var lastOffset = {
			line: -1,
			column: 0
		};
		this._sections = sections.map(function(s) {
			if (s.url) throw new Error("Support for url field in sections not implemented.");
			var offset = util.getArg(s, "offset");
			var offsetLine = util.getArg(offset, "line");
			var offsetColumn = util.getArg(offset, "column");
			if (offsetLine < lastOffset.line || offsetLine === lastOffset.line && offsetColumn < lastOffset.column) throw new Error("Section offsets must be ordered and non-overlapping.");
			lastOffset = offset;
			return {
				generatedOffset: {
					generatedLine: offsetLine + 1,
					generatedColumn: offsetColumn + 1
				},
				consumer: new SourceMapConsumer(util.getArg(s, "map"), aSourceMapURL)
			};
		});
	}
	IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
	IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;
	/**
	* The version of the source mapping spec that we are consuming.
	*/
	IndexedSourceMapConsumer.prototype._version = 3;
	/**
	* The list of original sources.
	*/
	Object.defineProperty(IndexedSourceMapConsumer.prototype, "sources", { get: function() {
		var sources = [];
		for (var i = 0; i < this._sections.length; i++) for (var j = 0; j < this._sections[i].consumer.sources.length; j++) sources.push(this._sections[i].consumer.sources[j]);
		return sources;
	} });
	/**
	* Returns the original source, line, and column information for the generated
	* source's line and column positions provided. The only argument is an object
	* with the following properties:
	*
	*   - line: The line number in the generated source.  The line number
	*     is 1-based.
	*   - column: The column number in the generated source.  The column
	*     number is 0-based.
	*
	* and an object is returned with the following properties:
	*
	*   - source: The original source file, or null.
	*   - line: The line number in the original source, or null.  The
	*     line number is 1-based.
	*   - column: The column number in the original source, or null.  The
	*     column number is 0-based.
	*   - name: The original identifier, or null.
	*/
	IndexedSourceMapConsumer.prototype.originalPositionFor = function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
		var needle = {
			generatedLine: util.getArg(aArgs, "line"),
			generatedColumn: util.getArg(aArgs, "column")
		};
		var sectionIndex = binarySearch.search(needle, this._sections, function(needle, section) {
			var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
			if (cmp) return cmp;
			return needle.generatedColumn - section.generatedOffset.generatedColumn;
		});
		var section = this._sections[sectionIndex];
		if (!section) return {
			source: null,
			line: null,
			column: null,
			name: null
		};
		return section.consumer.originalPositionFor({
			line: needle.generatedLine - (section.generatedOffset.generatedLine - 1),
			column: needle.generatedColumn - (section.generatedOffset.generatedLine === needle.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
			bias: aArgs.bias
		});
	};
	/**
	* Return true if we have the source content for every source in the source
	* map, false otherwise.
	*/
	IndexedSourceMapConsumer.prototype.hasContentsOfAllSources = function IndexedSourceMapConsumer_hasContentsOfAllSources() {
		return this._sections.every(function(s) {
			return s.consumer.hasContentsOfAllSources();
		});
	};
	/**
	* Returns the original source content. The only argument is the url of the
	* original source file. Returns null if no original source content is
	* available.
	*/
	IndexedSourceMapConsumer.prototype.sourceContentFor = function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
		for (var i = 0; i < this._sections.length; i++) {
			var content = this._sections[i].consumer.sourceContentFor(aSource, true);
			if (content || content === "") return content;
		}
		if (nullOnMissing) return null;
		else throw new Error("\"" + aSource + "\" is not in the SourceMap.");
	};
	/**
	* Returns the generated line and column information for the original source,
	* line, and column positions provided. The only argument is an object with
	* the following properties:
	*
	*   - source: The filename of the original source.
	*   - line: The line number in the original source.  The line number
	*     is 1-based.
	*   - column: The column number in the original source.  The column
	*     number is 0-based.
	*
	* and an object is returned with the following properties:
	*
	*   - line: The line number in the generated source, or null.  The
	*     line number is 1-based. 
	*   - column: The column number in the generated source, or null.
	*     The column number is 0-based.
	*/
	IndexedSourceMapConsumer.prototype.generatedPositionFor = function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
		for (var i = 0; i < this._sections.length; i++) {
			var section = this._sections[i];
			if (section.consumer._findSourceIndex(util.getArg(aArgs, "source")) === -1) continue;
			var generatedPosition = section.consumer.generatedPositionFor(aArgs);
			if (generatedPosition) return {
				line: generatedPosition.line + (section.generatedOffset.generatedLine - 1),
				column: generatedPosition.column + (section.generatedOffset.generatedLine === generatedPosition.line ? section.generatedOffset.generatedColumn - 1 : 0)
			};
		}
		return {
			line: null,
			column: null
		};
	};
	/**
	* Parse the mappings in a string in to a data structure which we can easily
	* query (the ordered arrays in the `this.__generatedMappings` and
	* `this.__originalMappings` properties).
	*/
	IndexedSourceMapConsumer.prototype._parseMappings = function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
		this.__generatedMappings = [];
		this.__originalMappings = [];
		for (var i = 0; i < this._sections.length; i++) {
			var section = this._sections[i];
			var sectionMappings = section.consumer._generatedMappings;
			for (var j = 0; j < sectionMappings.length; j++) {
				var mapping = sectionMappings[j];
				var source = section.consumer._sources.at(mapping.source);
				if (source !== null) source = util.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
				this._sources.add(source);
				source = this._sources.indexOf(source);
				var name = null;
				if (mapping.name) {
					name = section.consumer._names.at(mapping.name);
					this._names.add(name);
					name = this._names.indexOf(name);
				}
				var adjustedMapping = {
					source,
					generatedLine: mapping.generatedLine + (section.generatedOffset.generatedLine - 1),
					generatedColumn: mapping.generatedColumn + (section.generatedOffset.generatedLine === mapping.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
					originalLine: mapping.originalLine,
					originalColumn: mapping.originalColumn,
					name
				};
				this.__generatedMappings.push(adjustedMapping);
				if (typeof adjustedMapping.originalLine === "number") this.__originalMappings.push(adjustedMapping);
			}
		}
		quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
		quickSort(this.__originalMappings, util.compareByOriginalPositions);
	};
	exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
}));
//#endregion
//#region node_modules/.pnpm/source-map-js@1.2.1/node_modules/source-map-js/lib/source-node.js
var require_source_node = /* @__PURE__ */ __commonJSMin(((exports) => {
	var SourceMapGenerator = require_source_map_generator().SourceMapGenerator;
	var util = require_util();
	var REGEX_NEWLINE = /(\r?\n)/;
	var NEWLINE_CODE = 10;
	var isSourceNode = "$$$isSourceNode$$$";
	/**
	* SourceNodes provide a way to abstract over interpolating/concatenating
	* snippets of generated JavaScript source code while maintaining the line and
	* column information associated with the original source code.
	*
	* @param aLine The original line number.
	* @param aColumn The original column number.
	* @param aSource The original source's filename.
	* @param aChunks Optional. An array of strings which are snippets of
	*        generated JS, or other SourceNodes.
	* @param aName The original identifier.
	*/
	function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
		this.children = [];
		this.sourceContents = {};
		this.line = aLine == null ? null : aLine;
		this.column = aColumn == null ? null : aColumn;
		this.source = aSource == null ? null : aSource;
		this.name = aName == null ? null : aName;
		this[isSourceNode] = true;
		if (aChunks != null) this.add(aChunks);
	}
	/**
	* Creates a SourceNode from generated code and a SourceMapConsumer.
	*
	* @param aGeneratedCode The generated code
	* @param aSourceMapConsumer The SourceMap for the generated code
	* @param aRelativePath Optional. The path that relative sources in the
	*        SourceMapConsumer should be relative to.
	*/
	SourceNode.fromStringWithSourceMap = function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
		var node = new SourceNode();
		var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
		var remainingLinesIndex = 0;
		var shiftNextLine = function() {
			return getNextLine() + (getNextLine() || "");
			function getNextLine() {
				return remainingLinesIndex < remainingLines.length ? remainingLines[remainingLinesIndex++] : void 0;
			}
		};
		var lastGeneratedLine = 1, lastGeneratedColumn = 0;
		var lastMapping = null;
		aSourceMapConsumer.eachMapping(function(mapping) {
			if (lastMapping !== null) {
				if (lastGeneratedLine < mapping.generatedLine) {
					addMappingWithCode(lastMapping, shiftNextLine());
					lastGeneratedLine++;
					lastGeneratedColumn = 0;
				} else {
					var nextLine = remainingLines[remainingLinesIndex] || "";
					var code = nextLine.substr(0, mapping.generatedColumn - lastGeneratedColumn);
					remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn - lastGeneratedColumn);
					lastGeneratedColumn = mapping.generatedColumn;
					addMappingWithCode(lastMapping, code);
					lastMapping = mapping;
					return;
				}
			}
			while (lastGeneratedLine < mapping.generatedLine) {
				node.add(shiftNextLine());
				lastGeneratedLine++;
			}
			if (lastGeneratedColumn < mapping.generatedColumn) {
				var nextLine = remainingLines[remainingLinesIndex] || "";
				node.add(nextLine.substr(0, mapping.generatedColumn));
				remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
				lastGeneratedColumn = mapping.generatedColumn;
			}
			lastMapping = mapping;
		}, this);
		if (remainingLinesIndex < remainingLines.length) {
			if (lastMapping) addMappingWithCode(lastMapping, shiftNextLine());
			node.add(remainingLines.splice(remainingLinesIndex).join(""));
		}
		aSourceMapConsumer.sources.forEach(function(sourceFile) {
			var content = aSourceMapConsumer.sourceContentFor(sourceFile);
			if (content != null) {
				if (aRelativePath != null) sourceFile = util.join(aRelativePath, sourceFile);
				node.setSourceContent(sourceFile, content);
			}
		});
		return node;
		function addMappingWithCode(mapping, code) {
			if (mapping === null || mapping.source === void 0) node.add(code);
			else {
				var source = aRelativePath ? util.join(aRelativePath, mapping.source) : mapping.source;
				node.add(new SourceNode(mapping.originalLine, mapping.originalColumn, source, code, mapping.name));
			}
		}
	};
	/**
	* Add a chunk of generated JS to this source node.
	*
	* @param aChunk A string snippet of generated JS code, another instance of
	*        SourceNode, or an array where each member is one of those things.
	*/
	SourceNode.prototype.add = function SourceNode_add(aChunk) {
		if (Array.isArray(aChunk)) aChunk.forEach(function(chunk) {
			this.add(chunk);
		}, this);
		else if (aChunk[isSourceNode] || typeof aChunk === "string") {
			if (aChunk) this.children.push(aChunk);
		} else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
		return this;
	};
	/**
	* Add a chunk of generated JS to the beginning of this source node.
	*
	* @param aChunk A string snippet of generated JS code, another instance of
	*        SourceNode, or an array where each member is one of those things.
	*/
	SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
		if (Array.isArray(aChunk)) for (var i = aChunk.length - 1; i >= 0; i--) this.prepend(aChunk[i]);
		else if (aChunk[isSourceNode] || typeof aChunk === "string") this.children.unshift(aChunk);
		else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
		return this;
	};
	/**
	* Walk over the tree of JS snippets in this node and its children. The
	* walking function is called once for each snippet of JS and is passed that
	* snippet and the its original associated source's line/column location.
	*
	* @param aFn The traversal function.
	*/
	SourceNode.prototype.walk = function SourceNode_walk(aFn) {
		var chunk;
		for (var i = 0, len = this.children.length; i < len; i++) {
			chunk = this.children[i];
			if (chunk[isSourceNode]) chunk.walk(aFn);
			else if (chunk !== "") aFn(chunk, {
				source: this.source,
				line: this.line,
				column: this.column,
				name: this.name
			});
		}
	};
	/**
	* Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
	* each of `this.children`.
	*
	* @param aSep The separator.
	*/
	SourceNode.prototype.join = function SourceNode_join(aSep) {
		var newChildren;
		var i;
		var len = this.children.length;
		if (len > 0) {
			newChildren = [];
			for (i = 0; i < len - 1; i++) {
				newChildren.push(this.children[i]);
				newChildren.push(aSep);
			}
			newChildren.push(this.children[i]);
			this.children = newChildren;
		}
		return this;
	};
	/**
	* Call String.prototype.replace on the very right-most source snippet. Useful
	* for trimming whitespace from the end of a source node, etc.
	*
	* @param aPattern The pattern to replace.
	* @param aReplacement The thing to replace the pattern with.
	*/
	SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
		var lastChild = this.children[this.children.length - 1];
		if (lastChild[isSourceNode]) lastChild.replaceRight(aPattern, aReplacement);
		else if (typeof lastChild === "string") this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
		else this.children.push("".replace(aPattern, aReplacement));
		return this;
	};
	/**
	* Set the source content for a source file. This will be added to the SourceMapGenerator
	* in the sourcesContent field.
	*
	* @param aSourceFile The filename of the source file
	* @param aSourceContent The content of the source file
	*/
	SourceNode.prototype.setSourceContent = function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
		this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
	};
	/**
	* Walk over the tree of SourceNodes. The walking function is called for each
	* source file content and is passed the filename and source content.
	*
	* @param aFn The traversal function.
	*/
	SourceNode.prototype.walkSourceContents = function SourceNode_walkSourceContents(aFn) {
		for (var i = 0, len = this.children.length; i < len; i++) if (this.children[i][isSourceNode]) this.children[i].walkSourceContents(aFn);
		var sources = Object.keys(this.sourceContents);
		for (var i = 0, len = sources.length; i < len; i++) aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
	};
	/**
	* Return the string representation of this source node. Walks over the tree
	* and concatenates all the various snippets together to one string.
	*/
	SourceNode.prototype.toString = function SourceNode_toString() {
		var str = "";
		this.walk(function(chunk) {
			str += chunk;
		});
		return str;
	};
	/**
	* Returns the string representation of this source node along with a source
	* map.
	*/
	SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
		var generated = {
			code: "",
			line: 1,
			column: 0
		};
		var map = new SourceMapGenerator(aArgs);
		var sourceMappingActive = false;
		var lastOriginalSource = null;
		var lastOriginalLine = null;
		var lastOriginalColumn = null;
		var lastOriginalName = null;
		this.walk(function(chunk, original) {
			generated.code += chunk;
			if (original.source !== null && original.line !== null && original.column !== null) {
				if (lastOriginalSource !== original.source || lastOriginalLine !== original.line || lastOriginalColumn !== original.column || lastOriginalName !== original.name) map.addMapping({
					source: original.source,
					original: {
						line: original.line,
						column: original.column
					},
					generated: {
						line: generated.line,
						column: generated.column
					},
					name: original.name
				});
				lastOriginalSource = original.source;
				lastOriginalLine = original.line;
				lastOriginalColumn = original.column;
				lastOriginalName = original.name;
				sourceMappingActive = true;
			} else if (sourceMappingActive) {
				map.addMapping({ generated: {
					line: generated.line,
					column: generated.column
				} });
				lastOriginalSource = null;
				sourceMappingActive = false;
			}
			for (var idx = 0, length = chunk.length; idx < length; idx++) if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
				generated.line++;
				generated.column = 0;
				if (idx + 1 === length) {
					lastOriginalSource = null;
					sourceMappingActive = false;
				} else if (sourceMappingActive) map.addMapping({
					source: original.source,
					original: {
						line: original.line,
						column: original.column
					},
					generated: {
						line: generated.line,
						column: generated.column
					},
					name: original.name
				});
			} else generated.column++;
		});
		this.walkSourceContents(function(sourceFile, sourceContent) {
			map.setSourceContent(sourceFile, sourceContent);
		});
		return {
			code: generated.code,
			map
		};
	};
	exports.SourceNode = SourceNode;
}));
//#endregion
//#region vendor/recast/lib/util.ts
var import_source_map = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports) => {
	exports.SourceMapGenerator = require_source_map_generator().SourceMapGenerator;
	exports.SourceMapConsumer = require_source_map_consumer().SourceMapConsumer;
	exports.SourceNode = require_source_node().SourceNode;
})))());
const n$2 = namedTypes$1;
const SourceMapConsumer = import_source_map.SourceMapConsumer;
const SourceMapGenerator = import_source_map.SourceMapGenerator;
const hasOwn$2 = Object.prototype.hasOwnProperty;
function getLineTerminator() {
	return "\n";
}
function getOption(options, key, defaultValue) {
	if (options && hasOwn$2.call(options, key)) return options[key];
	return defaultValue;
}
function getUnionOfKeys(...args) {
	const result = {};
	const argc = args.length;
	for (let i = 0; i < argc; ++i) {
		const keys = Object.keys(args[i]);
		const keyCount = keys.length;
		for (let j = 0; j < keyCount; ++j) result[keys[j]] = true;
	}
	return result;
}
function comparePos(pos1, pos2) {
	return pos1.line - pos2.line || pos1.column - pos2.column;
}
function copyPos(pos) {
	return {
		line: pos.line,
		column: pos.column
	};
}
function composeSourceMaps(formerMap, latterMap) {
	if (formerMap) {
		if (!latterMap) return formerMap;
	} else return latterMap || null;
	const smcFormer = new SourceMapConsumer(formerMap);
	const smcLatter = new SourceMapConsumer(latterMap);
	const smg = new SourceMapGenerator({
		file: latterMap.file,
		sourceRoot: latterMap.sourceRoot
	});
	const sourcesToContents = {};
	smcLatter.eachMapping(function(mapping) {
		const origPos = smcFormer.originalPositionFor({
			line: mapping.originalLine,
			column: mapping.originalColumn
		});
		const sourceName = origPos.source;
		if (sourceName === null) return;
		smg.addMapping({
			source: sourceName,
			original: copyPos(origPos),
			generated: {
				line: mapping.generatedLine,
				column: mapping.generatedColumn
			},
			name: mapping.name
		});
		const sourceContent = smcFormer.sourceContentFor(sourceName);
		if (sourceContent && !hasOwn$2.call(sourcesToContents, sourceName)) {
			sourcesToContents[sourceName] = sourceContent;
			smg.setSourceContent(sourceName, sourceContent);
		}
	});
	return smg.toJSON();
}
function getTrueLoc(node, lines) {
	if (!node.loc) return null;
	const result = {
		start: node.loc.start,
		end: node.loc.end
	};
	function include(node) {
		expandLoc(result, node.loc);
	}
	if (node.declaration && node.declaration.decorators && isExportDeclaration(node)) node.declaration.decorators.forEach(include);
	if (comparePos(result.start, result.end) < 0) {
		result.start = copyPos(result.start);
		lines.skipSpaces(result.start, false, true);
		if (comparePos(result.start, result.end) < 0) {
			result.end = copyPos(result.end);
			lines.skipSpaces(result.end, true, true);
		}
	}
	if (node.comments) node.comments.forEach(include);
	return result;
}
function expandLoc(parentLoc, childLoc) {
	if (parentLoc && childLoc) {
		if (comparePos(childLoc.start, parentLoc.start) < 0) parentLoc.start = childLoc.start;
		if (comparePos(parentLoc.end, childLoc.end) < 0) parentLoc.end = childLoc.end;
	}
}
function fixFaultyLocations(node, lines) {
	const loc = node.loc;
	if (loc) {
		if (loc.start.line < 1) loc.start.line = 1;
		if (loc.end.line < 1) loc.end.line = 1;
	}
	if (node.type === "File") {
		loc.start = lines.firstPos();
		loc.end = lines.lastPos();
	}
	fixForLoopHead(node, lines);
	fixTemplateLiteral(node, lines);
	if (loc && node.decorators) node.decorators.forEach(function(decorator) {
		expandLoc(loc, decorator.loc);
	});
	else if (node.declaration && isExportDeclaration(node)) {
		node.declaration.loc = null;
		const decorators = node.declaration.decorators;
		if (decorators) decorators.forEach(function(decorator) {
			expandLoc(loc, decorator.loc);
		});
	} else if (n$2.MethodDefinition && n$2.MethodDefinition.check(node) || n$2.Property.check(node) && (node.method || node.shorthand)) {
		node.value.loc = null;
		if (n$2.FunctionExpression.check(node.value)) node.value.id = null;
	} else if (node.type === "ObjectTypeProperty") {
		const loc = node.loc;
		let end = loc && loc.end;
		if (end) {
			end = copyPos(end);
			if (lines.prevPos(end) && lines.charAt(end) === ",") {
				if (end = lines.skipSpaces(end, true, true)) loc.end = end;
			}
		}
	}
}
function fixForLoopHead(node, lines) {
	if (node.type !== "ForStatement") return;
	function fix(child) {
		const loc = child && child.loc;
		const start = loc && loc.start;
		const end = loc && copyPos(loc.end);
		while (start && end && comparePos(start, end) < 0) {
			lines.prevPos(end);
			if (lines.charAt(end) === ";") {
				loc.end.line = end.line;
				loc.end.column = end.column;
			} else break;
		}
	}
	fix(node.init);
	fix(node.test);
	fix(node.update);
}
function fixTemplateLiteral(node, lines) {
	if (node.type !== "TemplateLiteral") return;
	if (node.quasis.length === 0) return;
	if (node.loc) {
		const afterLeftBackTickPos = copyPos(node.loc.start);
		lines.charAt(afterLeftBackTickPos);
		lines.nextPos(afterLeftBackTickPos);
		const firstQuasi = node.quasis[0];
		if (comparePos(firstQuasi.loc.start, afterLeftBackTickPos) < 0) firstQuasi.loc.start = afterLeftBackTickPos;
		const rightBackTickPos = copyPos(node.loc.end);
		lines.prevPos(rightBackTickPos);
		lines.charAt(rightBackTickPos);
		const lastQuasi = node.quasis[node.quasis.length - 1];
		if (comparePos(rightBackTickPos, lastQuasi.loc.end) < 0) lastQuasi.loc.end = rightBackTickPos;
	}
	node.expressions.forEach(function(expr, i) {
		const dollarCurlyPos = lines.skipSpaces(expr.loc.start, true, false);
		if (lines.prevPos(dollarCurlyPos) && lines.charAt(dollarCurlyPos) === "{" && lines.prevPos(dollarCurlyPos) && lines.charAt(dollarCurlyPos) === "$") {
			const quasiBefore = node.quasis[i];
			if (comparePos(dollarCurlyPos, quasiBefore.loc.end) < 0) quasiBefore.loc.end = dollarCurlyPos;
		}
		const rightCurlyPos = lines.skipSpaces(expr.loc.end, false, false);
		if (lines.charAt(rightCurlyPos) === "}") {
			lines.nextPos(rightCurlyPos);
			const quasiAfter = node.quasis[i + 1];
			if (comparePos(quasiAfter.loc.start, rightCurlyPos) < 0) quasiAfter.loc.start = rightCurlyPos;
		}
	});
}
function isExportDeclaration(node) {
	if (node) switch (node.type) {
		case "ExportDeclaration":
		case "ExportDefaultDeclaration":
		case "ExportDefaultSpecifier":
		case "DeclareExportDeclaration":
		case "ExportNamedDeclaration":
		case "ExportAllDeclaration": return true;
	}
	return false;
}
function getParentExportDeclaration(path) {
	const parentNode = path.getParentNode();
	if (path.getName() === "declaration" && isExportDeclaration(parentNode)) return parentNode;
	return null;
}
function isTrailingCommaEnabled(options, context) {
	const trailingComma = options.trailingComma;
	if (typeof trailingComma === "object") return !!trailingComma[context];
	return !!trailingComma;
}
//#endregion
//#region vendor/recast/lib/options.ts
const defaults = {
	tabWidth: 4,
	useTabs: false,
	reuseWhitespace: true,
	lineTerminator: getLineTerminator(),
	wrapColumn: 74,
	sourceFileName: null,
	sourceMapName: null,
	sourceRoot: null,
	inputSourceMap: null,
	range: false,
	tolerant: true,
	quote: null,
	trailingComma: false,
	arrayBracketSpacing: false,
	objectCurlySpacing: true,
	arrowParensAlways: false,
	flowObjectCommas: true,
	tokens: true
};
const hasOwn$1 = defaults.hasOwnProperty;
function normalize(opts) {
	const options = opts || defaults;
	function get(key) {
		return hasOwn$1.call(options, key) ? options[key] : defaults[key];
	}
	return {
		tabWidth: +get("tabWidth"),
		useTabs: !!get("useTabs"),
		reuseWhitespace: !!get("reuseWhitespace"),
		lineTerminator: get("lineTerminator"),
		wrapColumn: Math.max(get("wrapColumn"), 0),
		sourceFileName: get("sourceFileName"),
		sourceMapName: get("sourceMapName"),
		sourceRoot: get("sourceRoot"),
		inputSourceMap: get("inputSourceMap"),
		parser: get("esprima") || get("parser"),
		range: get("range"),
		tolerant: get("tolerant"),
		quote: get("quote"),
		trailingComma: get("trailingComma"),
		arrayBracketSpacing: get("arrayBracketSpacing"),
		objectCurlySpacing: get("objectCurlySpacing"),
		arrowParensAlways: get("arrowParensAlways"),
		flowObjectCommas: get("flowObjectCommas"),
		tokens: !!get("tokens")
	};
}
//#endregion
//#region vendor/recast/lib/mapping.ts
var Mapping = class Mapping {
	sourceLines;
	sourceLoc;
	targetLoc;
	constructor(sourceLines, sourceLoc, targetLoc = sourceLoc) {
		this.sourceLines = sourceLines;
		this.sourceLoc = sourceLoc;
		this.targetLoc = targetLoc;
	}
	slice(lines, start, end = lines.lastPos()) {
		const sourceLines = this.sourceLines;
		let sourceLoc = this.sourceLoc;
		let targetLoc = this.targetLoc;
		function skip(name) {
			const sourceFromPos = sourceLoc[name];
			const targetFromPos = targetLoc[name];
			let targetToPos = start;
			if (name === "end") targetToPos = end;
			return skipChars(sourceLines, sourceFromPos, lines, targetFromPos, targetToPos);
		}
		if (comparePos(start, targetLoc.start) <= 0) {
			if (comparePos(targetLoc.end, end) <= 0) targetLoc = {
				start: subtractPos(targetLoc.start, start.line, start.column),
				end: subtractPos(targetLoc.end, start.line, start.column)
			};
			else if (comparePos(end, targetLoc.start) <= 0) return null;
			else {
				sourceLoc = {
					start: sourceLoc.start,
					end: skip("end")
				};
				targetLoc = {
					start: subtractPos(targetLoc.start, start.line, start.column),
					end: subtractPos(end, start.line, start.column)
				};
			}
		} else {
			if (comparePos(targetLoc.end, start) <= 0) return null;
			if (comparePos(targetLoc.end, end) <= 0) {
				sourceLoc = {
					start: skip("start"),
					end: sourceLoc.end
				};
				targetLoc = {
					start: {
						line: 1,
						column: 0
					},
					end: subtractPos(targetLoc.end, start.line, start.column)
				};
			} else {
				sourceLoc = {
					start: skip("start"),
					end: skip("end")
				};
				targetLoc = {
					start: {
						line: 1,
						column: 0
					},
					end: subtractPos(end, start.line, start.column)
				};
			}
		}
		return new Mapping(this.sourceLines, sourceLoc, targetLoc);
	}
	add(line, column) {
		return new Mapping(this.sourceLines, this.sourceLoc, {
			start: addPos(this.targetLoc.start, line, column),
			end: addPos(this.targetLoc.end, line, column)
		});
	}
	subtract(line, column) {
		return new Mapping(this.sourceLines, this.sourceLoc, {
			start: subtractPos(this.targetLoc.start, line, column),
			end: subtractPos(this.targetLoc.end, line, column)
		});
	}
	reindent(oldLines, newLines) {
		const start = this.targetLoc.start;
		const end = this.targetLoc.end;
		const startShift = newLines.getIndentAt(start.line) - oldLines.getIndentAt(start.line);
		const endShift = newLines.getIndentAt(end.line) - oldLines.getIndentAt(end.line);
		if (startShift === 0 && endShift === 0) return this;
		return new Mapping(this.sourceLines, this.sourceLoc, {
			start: {
				line: start.line,
				column: Math.max(0, start.column + startShift)
			},
			end: {
				line: end.line,
				column: Math.max(0, end.column + endShift)
			}
		});
	}
};
function addPos(toPos, line, column) {
	return {
		line: toPos.line + line - 1,
		column: toPos.line === 1 ? toPos.column + column : toPos.column
	};
}
function subtractPos(fromPos, line, column) {
	return {
		line: fromPos.line - line + 1,
		column: fromPos.line === line ? fromPos.column - column : fromPos.column
	};
}
function skipChars(sourceLines, sourceFromPos, targetLines, targetFromPos, targetToPos) {
	const targetComparison = comparePos(targetFromPos, targetToPos);
	if (targetComparison === 0) return sourceFromPos;
	let sourceCursor, targetCursor;
	if (targetComparison < 0) {
		sourceCursor = sourceLines.skipSpaces(sourceFromPos) || sourceLines.lastPos();
		targetCursor = targetLines.skipSpaces(targetFromPos) || targetLines.lastPos();
		const lineDiff = targetToPos.line - targetCursor.line;
		sourceCursor.line += lineDiff;
		targetCursor.line += lineDiff;
		if (lineDiff > 0) {
			sourceCursor.column = 0;
			targetCursor.column = 0;
		}
		while (comparePos(targetCursor, targetToPos) < 0 && targetLines.nextPos(targetCursor, true)) {
			sourceLines.nextPos(sourceCursor, true);
			sourceLines.charAt(sourceCursor), targetLines.charAt(targetCursor);
		}
	} else {
		sourceCursor = sourceLines.skipSpaces(sourceFromPos, true) || sourceLines.firstPos();
		targetCursor = targetLines.skipSpaces(targetFromPos, true) || targetLines.firstPos();
		const lineDiff = targetToPos.line - targetCursor.line;
		sourceCursor.line += lineDiff;
		targetCursor.line += lineDiff;
		if (lineDiff < 0) {
			sourceCursor.column = sourceLines.getLineLength(sourceCursor.line);
			targetCursor.column = targetLines.getLineLength(targetCursor.line);
		}
		while (comparePos(targetToPos, targetCursor) < 0 && targetLines.prevPos(targetCursor, true)) {
			sourceLines.prevPos(sourceCursor, true);
			sourceLines.charAt(sourceCursor), targetLines.charAt(targetCursor);
		}
	}
	return sourceCursor;
}
//#endregion
//#region vendor/recast/lib/lines.ts
var Lines = class Lines {
	infos;
	length;
	name;
	mappings = [];
	cachedSourceMap = null;
	cachedTabWidth = void 0;
	constructor(infos, sourceFileName = null) {
		this.infos = infos;
		infos.length;
		this.length = infos.length;
		this.name = sourceFileName || null;
		if (this.name) this.mappings.push(new Mapping(this, {
			start: this.firstPos(),
			end: this.lastPos()
		}));
	}
	toString(options) {
		return this.sliceString(this.firstPos(), this.lastPos(), options);
	}
	getSourceMap(sourceMapName, sourceRoot) {
		if (!sourceMapName) return null;
		const targetLines = this;
		function updateJSON(json) {
			json = json || {};
			json.file = sourceMapName;
			if (sourceRoot) json.sourceRoot = sourceRoot;
			return json;
		}
		if (targetLines.cachedSourceMap) return updateJSON(targetLines.cachedSourceMap.toJSON());
		const smg = new import_source_map.SourceMapGenerator(updateJSON());
		const sourcesToContents = {};
		targetLines.mappings.forEach(function(mapping) {
			const sourceCursor = mapping.sourceLines.skipSpaces(mapping.sourceLoc.start) || mapping.sourceLines.lastPos();
			const targetCursor = targetLines.skipSpaces(mapping.targetLoc.start) || targetLines.lastPos();
			while (comparePos(sourceCursor, mapping.sourceLoc.end) < 0 && comparePos(targetCursor, mapping.targetLoc.end) < 0) {
				mapping.sourceLines.charAt(sourceCursor);
				targetLines.charAt(targetCursor);
				const sourceName = mapping.sourceLines.name;
				smg.addMapping({
					source: sourceName,
					original: {
						line: sourceCursor.line,
						column: sourceCursor.column
					},
					generated: {
						line: targetCursor.line,
						column: targetCursor.column
					}
				});
				if (!hasOwn.call(sourcesToContents, sourceName)) {
					const sourceContent = mapping.sourceLines.toString();
					smg.setSourceContent(sourceName, sourceContent);
					sourcesToContents[sourceName] = sourceContent;
				}
				targetLines.nextPos(targetCursor, true);
				mapping.sourceLines.nextPos(sourceCursor, true);
			}
		});
		targetLines.cachedSourceMap = smg;
		return smg.toJSON();
	}
	bootstrapCharAt(pos) {
		pos.line;
		pos.column;
		const line = pos.line, column = pos.column, strings = this.toString().split(lineTerminatorSeqExp), string = strings[line - 1];
		if (typeof string === "undefined") return "";
		if (column === string.length && line < strings.length) return "\n";
		if (column >= string.length) return "";
		return string.charAt(column);
	}
	charAt(pos) {
		pos.line;
		pos.column;
		let line = pos.line, column = pos.column, info = this.infos[line - 1], c = column;
		if (typeof info === "undefined" || c < 0) return "";
		const indent = this.getIndentAt(line);
		if (c < indent) return " ";
		c += info.sliceStart - indent;
		if (c === info.sliceEnd && line < this.length) return "\n";
		if (c >= info.sliceEnd) return "";
		return info.line.charAt(c);
	}
	stripMargin(width, skipFirstLine) {
		if (width === 0) return this;
		"" + width;
		if (skipFirstLine && this.length === 1) return this;
		const lines = new Lines(this.infos.map(function(info, i) {
			if (info.line && (i > 0 || !skipFirstLine)) info = {
				...info,
				indent: Math.max(0, info.indent - width)
			};
			return info;
		}));
		return this.reindentMappings(lines);
	}
	indent(by) {
		if (by === 0) return this;
		const lines = new Lines(this.infos.map(function(info) {
			if (info.line && !info.locked) info = {
				...info,
				indent: info.indent + by
			};
			return info;
		}));
		return this.reindentMappings(lines);
	}
	indentTail(by) {
		if (by === 0) return this;
		if (this.length < 2) return this;
		const lines = new Lines(this.infos.map(function(info, i) {
			if (i > 0 && info.line && !info.locked) info = {
				...info,
				indent: info.indent + by
			};
			return info;
		}));
		return this.reindentMappings(lines);
	}
	reindentMappings(lines) {
		lines.mappings.length;
		this.mappings.forEach((mapping) => lines.mappings.push(mapping.reindent(this, lines)));
		return lines;
	}
	lockIndentTail() {
		if (this.length < 2) return this;
		return new Lines(this.infos.map((info, i) => ({
			...info,
			locked: i > 0
		})));
	}
	getIndentAt(line) {
		"" + line;
		return Math.max(this.infos[line - 1].indent, 0);
	}
	guessTabWidth() {
		if (typeof this.cachedTabWidth === "number") return this.cachedTabWidth;
		const counts = [];
		let lastIndent = 0;
		for (let line = 1, last = this.length; line <= last; ++line) {
			const info = this.infos[line - 1];
			if (isOnlyWhitespace(info.line.slice(info.sliceStart, info.sliceEnd))) continue;
			const diff = Math.abs(info.indent - lastIndent);
			counts[diff] = ~~counts[diff] + 1;
			lastIndent = info.indent;
		}
		let maxCount = -1;
		let result = 2;
		for (let tabWidth = 1; tabWidth < counts.length; tabWidth += 1) if (hasOwn.call(counts, tabWidth) && counts[tabWidth] > maxCount) {
			maxCount = counts[tabWidth];
			result = tabWidth;
		}
		return this.cachedTabWidth = result;
	}
	startsWithComment() {
		if (this.infos.length === 0) return false;
		const firstLineInfo = this.infos[0], sliceStart = firstLineInfo.sliceStart, sliceEnd = firstLineInfo.sliceEnd, firstLine = firstLineInfo.line.slice(sliceStart, sliceEnd).trim();
		return firstLine.length === 0 || firstLine.slice(0, 2) === "//" || firstLine.slice(0, 2) === "/*";
	}
	isOnlyWhitespace() {
		return isOnlyWhitespace(this.toString());
	}
	isPrecededOnlyByWhitespace(pos) {
		const info = this.infos[pos.line - 1];
		const indent = Math.max(info.indent, 0);
		const diff = pos.column - indent;
		if (diff <= 0) return true;
		const start = info.sliceStart;
		const end = Math.min(start + diff, info.sliceEnd);
		return isOnlyWhitespace(info.line.slice(start, end));
	}
	getLineLength(line) {
		const info = this.infos[line - 1];
		return this.getIndentAt(line) + info.sliceEnd - info.sliceStart;
	}
	nextPos(pos, skipSpaces = false) {
		const l = Math.max(pos.line, 0);
		if (Math.max(pos.column, 0) < this.getLineLength(l)) {
			pos.column += 1;
			return skipSpaces ? !!this.skipSpaces(pos, false, true) : true;
		}
		if (l < this.length) {
			pos.line += 1;
			pos.column = 0;
			return skipSpaces ? !!this.skipSpaces(pos, false, true) : true;
		}
		return false;
	}
	prevPos(pos, skipSpaces = false) {
		let l = pos.line, c = pos.column;
		if (c < 1) {
			l -= 1;
			if (l < 1) return false;
			c = this.getLineLength(l);
		} else c = Math.min(c - 1, this.getLineLength(l));
		pos.line = l;
		pos.column = c;
		return skipSpaces ? !!this.skipSpaces(pos, true, true) : true;
	}
	firstPos() {
		return {
			line: 1,
			column: 0
		};
	}
	lastPos() {
		return {
			line: this.length,
			column: this.getLineLength(this.length)
		};
	}
	skipSpaces(pos, backward = false, modifyInPlace = false) {
		if (pos) pos = modifyInPlace ? pos : {
			line: pos.line,
			column: pos.column
		};
		else if (backward) pos = this.lastPos();
		else pos = this.firstPos();
		if (backward) {
			while (this.prevPos(pos)) if (!isOnlyWhitespace(this.charAt(pos)) && this.nextPos(pos)) return pos;
			return null;
		} else {
			while (isOnlyWhitespace(this.charAt(pos))) if (!this.nextPos(pos)) return null;
			return pos;
		}
	}
	trimLeft() {
		const pos = this.skipSpaces(this.firstPos(), false, true);
		return pos ? this.slice(pos) : emptyLines;
	}
	trimRight() {
		const pos = this.skipSpaces(this.lastPos(), true, true);
		return pos ? this.slice(this.firstPos(), pos) : emptyLines;
	}
	trim() {
		const start = this.skipSpaces(this.firstPos(), false, true);
		if (start === null) return emptyLines;
		const end = this.skipSpaces(this.lastPos(), true, true);
		if (end === null) return emptyLines;
		return this.slice(start, end);
	}
	eachPos(callback, startPos = this.firstPos(), skipSpaces = false) {
		const pos = this.firstPos();
		if (startPos) pos.line = startPos.line, pos.column = startPos.column;
		if (skipSpaces && !this.skipSpaces(pos, false, true)) return;
		do
			callback.call(this, pos);
		while (this.nextPos(pos, skipSpaces));
	}
	bootstrapSlice(start, end) {
		const strings = this.toString().split(lineTerminatorSeqExp).slice(start.line - 1, end.line);
		if (strings.length > 0) {
			strings.push(strings.pop().slice(0, end.column));
			strings[0] = strings[0].slice(start.column);
		}
		return fromString(strings.join("\n"));
	}
	slice(start, end) {
		if (!end) {
			if (!start) return this;
			end = this.lastPos();
		}
		if (!start) throw new Error("cannot slice with end but not start");
		const sliced = this.infos.slice(start.line - 1, end.line);
		if (start.line === end.line) sliced[0] = sliceInfo(sliced[0], start.column, end.column);
		else {
			start.line, end.line;
			sliced[0] = sliceInfo(sliced[0], start.column);
			sliced.push(sliceInfo(sliced.pop(), 0, end.column));
		}
		const lines = new Lines(sliced);
		if (this.mappings.length > 0) {
			const newMappings = lines.mappings;
			newMappings.length;
			this.mappings.forEach(function(mapping) {
				const sliced = mapping.slice(this, start, end);
				if (sliced) newMappings.push(sliced);
			}, this);
		}
		return lines;
	}
	bootstrapSliceString(start, end, options) {
		return this.slice(start, end).toString(options);
	}
	sliceString(start = this.firstPos(), end = this.lastPos(), options) {
		const { tabWidth, useTabs, reuseWhitespace, lineTerminator } = normalize(options);
		const parts = [];
		for (let line = start.line; line <= end.line; ++line) {
			let info = this.infos[line - 1];
			if (line === start.line) {
				if (line === end.line) info = sliceInfo(info, start.column, end.column);
				else info = sliceInfo(info, start.column);
			} else if (line === end.line) info = sliceInfo(info, 0, end.column);
			const indent = Math.max(info.indent, 0);
			const before = info.line.slice(0, info.sliceStart);
			if (reuseWhitespace && isOnlyWhitespace(before) && countSpaces(before, tabWidth) === indent) {
				parts.push(info.line.slice(0, info.sliceEnd));
				continue;
			}
			let tabs = 0;
			let spaces = indent;
			if (useTabs) {
				tabs = Math.floor(indent / tabWidth);
				spaces -= tabs * tabWidth;
			}
			let result = "";
			if (tabs > 0) result += new Array(tabs + 1).join("	");
			if (spaces > 0) result += new Array(spaces + 1).join(" ");
			result += info.line.slice(info.sliceStart, info.sliceEnd);
			parts.push(result);
		}
		return parts.join(lineTerminator);
	}
	isEmpty() {
		return this.length < 2 && this.getLineLength(1) < 1;
	}
	join(elements) {
		const separator = this;
		const infos = [];
		const mappings = [];
		let prevInfo;
		function appendLines(linesOrNull) {
			if (linesOrNull === null) return;
			if (prevInfo) {
				const info = linesOrNull.infos[0];
				const indent = new Array(info.indent + 1).join(" ");
				const prevLine = infos.length;
				const prevColumn = Math.max(prevInfo.indent, 0) + prevInfo.sliceEnd - prevInfo.sliceStart;
				prevInfo.line = prevInfo.line.slice(0, prevInfo.sliceEnd) + indent + info.line.slice(info.sliceStart, info.sliceEnd);
				prevInfo.locked = prevInfo.locked || info.locked;
				prevInfo.sliceEnd = prevInfo.line.length;
				if (linesOrNull.mappings.length > 0) linesOrNull.mappings.forEach(function(mapping) {
					mappings.push(mapping.add(prevLine, prevColumn));
				});
			} else if (linesOrNull.mappings.length > 0) mappings.push.apply(mappings, linesOrNull.mappings);
			linesOrNull.infos.forEach(function(info, i) {
				if (!prevInfo || i > 0) {
					prevInfo = { ...info };
					infos.push(prevInfo);
				}
			});
		}
		function appendWithSeparator(linesOrNull, i) {
			if (i > 0) appendLines(separator);
			appendLines(linesOrNull);
		}
		elements.map(function(elem) {
			const lines = fromString(elem);
			if (lines.isEmpty()) return null;
			return lines;
		}).forEach((linesOrNull, i) => {
			if (separator.isEmpty()) appendLines(linesOrNull);
			else appendWithSeparator(linesOrNull, i);
		});
		if (infos.length < 1) return emptyLines;
		const lines = new Lines(infos);
		lines.mappings = mappings;
		return lines;
	}
	concat(...args) {
		const list = [this];
		list.push.apply(list, args);
		list.length, args.length + 1;
		return emptyLines.join(list);
	}
};
const fromStringCache = {};
const hasOwn = fromStringCache.hasOwnProperty;
const maxCacheKeyLen = 10;
function countSpaces(spaces, tabWidth) {
	let count = 0;
	const len = spaces.length;
	for (let i = 0; i < len; ++i) switch (spaces.charCodeAt(i)) {
		case 9: {
			const next = Math.ceil(count / tabWidth) * tabWidth;
			if (next === count) count += tabWidth;
			else count = next;
			break;
		}
		case 11:
		case 12:
		case 13:
		case 65279: break;
		default: count += 1;
	}
	return count;
}
const leadingSpaceExp = /^\s*/;
const lineTerminatorSeqExp = /\u000D\u000A|\u000D(?!\u000A)|\u000A|\u2028|\u2029/;
/**
* @param {Object} options - Options object that configures printing.
*/
function fromString(string, options) {
	if (string instanceof Lines) return string;
	string += "";
	const tabWidth = options && options.tabWidth;
	const tabless = string.indexOf("	") < 0;
	const cacheable = !options && tabless && string.length <= maxCacheKeyLen;
	"" + string;
	if (cacheable && hasOwn.call(fromStringCache, string)) return fromStringCache[string];
	const lines = new Lines(string.split(lineTerminatorSeqExp).map(function(line) {
		const spaces = leadingSpaceExp.exec(line)[0];
		return {
			line,
			indent: countSpaces(spaces, tabWidth),
			locked: false,
			sliceStart: spaces.length,
			sliceEnd: line.length
		};
	}), normalize(options).sourceFileName);
	if (cacheable) fromStringCache[string] = lines;
	return lines;
}
function isOnlyWhitespace(string) {
	return !/\S/.test(string);
}
function sliceInfo(info, startCol, endCol) {
	let sliceStart = info.sliceStart;
	let sliceEnd = info.sliceEnd;
	let indent = Math.max(info.indent, 0);
	let lineLength = indent + sliceEnd - sliceStart;
	if (typeof endCol === "undefined") endCol = lineLength;
	startCol = Math.max(startCol, 0);
	endCol = Math.min(endCol, lineLength);
	endCol = Math.max(endCol, startCol);
	if (endCol < indent) {
		indent = endCol;
		sliceEnd = sliceStart;
	} else sliceEnd -= lineLength - endCol;
	lineLength = endCol;
	lineLength -= startCol;
	if (startCol < indent) indent -= startCol;
	else {
		startCol -= indent;
		indent = 0;
		sliceStart += startCol;
	}
	indent + sliceEnd - sliceStart;
	if (info.indent === indent && info.sliceStart === sliceStart && info.sliceEnd === sliceEnd) return info;
	return {
		line: info.line,
		indent,
		locked: false,
		sliceStart,
		sliceEnd
	};
}
function concat(elements) {
	return emptyLines.join(elements);
}
const emptyLines = fromString("");
//#endregion
//#region vendor/recast/lib/comments.ts
const n$1 = namedTypes$1;
const isArray$3 = builtInTypes.array;
const isObject$3 = builtInTypes.object;
const childNodesCache = /* @__PURE__ */ new WeakMap();
function getSortedChildNodes(node, lines, resultArray) {
	if (!node) return resultArray;
	fixFaultyLocations(node, lines);
	if (resultArray) {
		if (n$1.Node.check(node) && n$1.SourceLocation.check(node.loc)) {
			let i = resultArray.length - 1;
			for (; i >= 0; --i) {
				const child = resultArray[i];
				if (child && child.loc && comparePos(child.loc.end, node.loc.start) <= 0) break;
			}
			resultArray.splice(i + 1, 0, node);
			return resultArray;
		}
	} else {
		const childNodes = childNodesCache.get(node);
		if (childNodes) return childNodes;
	}
	let names;
	if (isArray$3.check(node)) names = Object.keys(node);
	else if (isObject$3.check(node)) names = getFieldNames(node);
	else return resultArray;
	if (!resultArray) childNodesCache.set(node, resultArray = []);
	for (let i = 0, nameCount = names.length; i < nameCount; ++i) getSortedChildNodes(node[names[i]], lines, resultArray);
	return resultArray;
}
function decorateComment(node, comment, lines) {
	const childNodes = getSortedChildNodes(node, lines);
	let left = 0;
	let right = childNodes && childNodes.length;
	let precedingNode;
	let followingNode;
	while (typeof right === "number" && left < right) {
		const middle = left + right >> 1;
		const child = childNodes[middle];
		if (comparePos(child.loc.start, comment.loc.start) <= 0 && comparePos(comment.loc.end, child.loc.end) <= 0) {
			decorateComment(comment.enclosingNode = child, comment, lines);
			return;
		}
		if (comparePos(child.loc.end, comment.loc.start) <= 0) {
			precedingNode = child;
			left = middle + 1;
			continue;
		}
		if (comparePos(comment.loc.end, child.loc.start) <= 0) {
			followingNode = child;
			right = middle;
			continue;
		}
		throw new Error("Comment location overlaps with node location");
	}
	if (precedingNode) comment.precedingNode = precedingNode;
	if (followingNode) comment.followingNode = followingNode;
}
function attach(comments, ast, lines) {
	if (!isArray$3.check(comments)) return;
	const tiesToBreak = [];
	comments.forEach(function(comment) {
		comment.loc.lines = lines;
		decorateComment(ast, comment, lines);
		const pn = comment.precedingNode;
		const en = comment.enclosingNode;
		const fn = comment.followingNode;
		if (pn && fn) {
			const tieCount = tiesToBreak.length;
			if (tieCount > 0) {
				const lastTie = tiesToBreak[tieCount - 1];
				lastTie.precedingNode, comment.precedingNode, lastTie.followingNode, comment.followingNode;
				if (lastTie.followingNode !== comment.followingNode) breakTies(tiesToBreak, lines);
			}
			tiesToBreak.push(comment);
		} else if (pn) {
			breakTies(tiesToBreak, lines);
			addTrailingComment(pn, comment);
		} else if (fn) {
			breakTies(tiesToBreak, lines);
			addLeadingComment(fn, comment);
		} else if (en) {
			breakTies(tiesToBreak, lines);
			addDanglingComment(en, comment);
		} else throw new Error("AST contains no nodes at all?");
	});
	breakTies(tiesToBreak, lines);
	comments.forEach(function(comment) {
		delete comment.precedingNode;
		delete comment.enclosingNode;
		delete comment.followingNode;
	});
}
function breakTies(tiesToBreak, lines) {
	const tieCount = tiesToBreak.length;
	if (tieCount === 0) return;
	const pn = tiesToBreak[0].precedingNode;
	const fn = tiesToBreak[0].followingNode;
	let gapEndPos = fn.loc.start;
	let indexOfFirstLeadingComment = tieCount;
	let comment;
	for (; indexOfFirstLeadingComment > 0; --indexOfFirstLeadingComment) {
		comment = tiesToBreak[indexOfFirstLeadingComment - 1];
		comment.precedingNode;
		comment.followingNode;
		const gap = lines.sliceString(comment.loc.end, gapEndPos);
		if (/\S/.test(gap)) break;
		gapEndPos = comment.loc.start;
	}
	while (indexOfFirstLeadingComment <= tieCount && (comment = tiesToBreak[indexOfFirstLeadingComment]) && (comment.type === "Line" || comment.type === "CommentLine") && comment.loc.start.column > fn.loc.start.column) ++indexOfFirstLeadingComment;
	if (indexOfFirstLeadingComment) {
		const { enclosingNode } = tiesToBreak[indexOfFirstLeadingComment - 1];
		if (enclosingNode?.type === "CallExpression") --indexOfFirstLeadingComment;
	}
	tiesToBreak.forEach(function(comment, i) {
		if (i < indexOfFirstLeadingComment) addTrailingComment(pn, comment);
		else addLeadingComment(fn, comment);
	});
	tiesToBreak.length = 0;
}
function addCommentHelper(node, comment) {
	(node.comments || (node.comments = [])).push(comment);
}
function addLeadingComment(node, comment) {
	comment.leading = true;
	comment.trailing = false;
	addCommentHelper(node, comment);
}
function addDanglingComment(node, comment) {
	comment.leading = false;
	comment.trailing = false;
	addCommentHelper(node, comment);
}
function addTrailingComment(node, comment) {
	comment.leading = false;
	comment.trailing = true;
	addCommentHelper(node, comment);
}
function printLeadingComment(commentPath, print) {
	const comment = commentPath.getValue();
	n$1.Comment.assert(comment);
	const loc = comment.loc;
	const lines = loc && loc.lines;
	const parts = [print(commentPath)];
	if (comment.trailing) parts.push("\n");
	else if (lines instanceof Lines) {
		const trailingSpace = lines.slice(loc.end, lines.skipSpaces(loc.end) || lines.lastPos());
		if (trailingSpace.length === 1) parts.push(trailingSpace);
		else parts.push(new Array(trailingSpace.length).join("\n"));
	} else parts.push("\n");
	return concat(parts);
}
function printTrailingComment(commentPath, print) {
	const comment = commentPath.getValue(commentPath);
	n$1.Comment.assert(comment);
	const loc = comment.loc;
	const lines = loc && loc.lines;
	const parts = [];
	if (lines instanceof Lines) {
		const fromPos = lines.skipSpaces(loc.start, true) || lines.firstPos();
		const leadingSpace = lines.slice(fromPos, loc.start);
		if (leadingSpace.length === 1) parts.push(leadingSpace);
		else parts.push(new Array(leadingSpace.length).join("\n"));
	}
	parts.push(print(commentPath));
	return concat(parts);
}
function printComments(path, print) {
	const value = path.getValue();
	const innerLines = print(path);
	const comments = n$1.Node.check(value) && getFieldValue(value, "comments");
	if (!comments || comments.length === 0) return innerLines;
	const leadingParts = [];
	const trailingParts = [innerLines];
	path.each(function(commentPath) {
		const comment = commentPath.getValue();
		const leading = getFieldValue(comment, "leading");
		const trailing = getFieldValue(comment, "trailing");
		if (leading || trailing && !(n$1.Statement.check(value) || comment.type === "Block" || comment.type === "CommentBlock")) leadingParts.push(printLeadingComment(commentPath, print));
		else if (trailing) trailingParts.push(printTrailingComment(commentPath, print));
	}, "comments");
	leadingParts.push.apply(leadingParts, trailingParts);
	return concat(leadingParts);
}
//#endregion
//#region vendor/recast/lib/parser.ts
const b$6 = builders$1;
const isObject$2 = builtInTypes.object;
const isArray$2 = builtInTypes.array;
function parse(source, options) {
	options = normalize(options);
	const lines = fromString(source, options);
	const sourceWithoutTabs = lines.toString({
		tabWidth: options.tabWidth,
		reuseWhitespace: false,
		useTabs: false
	});
	let comments = [];
	const ast = options.parser.parse(sourceWithoutTabs, {
		jsx: true,
		loc: true,
		locations: true,
		range: options.range,
		comment: true,
		onComment: comments,
		tolerant: getOption(options, "tolerant", true),
		ecmaVersion: 6,
		sourceType: getOption(options, "sourceType", "module")
	});
	const tokens = Array.isArray(ast.tokens) ? ast.tokens : false;
	delete ast.tokens;
	tokens.forEach(function(token) {
		if (typeof token.value !== "string") token.value = lines.sliceString(token.loc.start, token.loc.end);
	});
	if (Array.isArray(ast.comments)) {
		comments = ast.comments;
		delete ast.comments;
	}
	if (ast.loc) fixFaultyLocations(ast, lines);
	else ast.loc = {
		start: lines.firstPos(),
		end: lines.lastPos()
	};
	ast.loc.lines = lines;
	ast.loc.indent = 0;
	let file;
	let program;
	if (ast.type === "Program") {
		program = ast;
		file = b$6.file(ast, options.sourceFileName || null);
		file.loc = {
			start: lines.firstPos(),
			end: lines.lastPos(),
			lines,
			indent: 0
		};
	} else if (ast.type === "File") {
		file = ast;
		program = file.program;
	}
	if (options.tokens) file.tokens = tokens;
	const trueProgramLoc = getTrueLoc({
		type: program.type,
		loc: program.loc,
		body: [],
		comments
	}, lines);
	program.loc.start = trueProgramLoc.start;
	program.loc.end = trueProgramLoc.end;
	attach(comments, program.body.length ? file.program : file, lines);
	return new TreeCopier(lines, tokens).copy(file);
}
const TreeCopier = function TreeCopier(lines, tokens) {
	this instanceof TreeCopier;
	this.lines = lines;
	this.tokens = tokens;
	this.startTokenIndex = 0;
	this.endTokenIndex = tokens.length;
	this.indent = 0;
	this.seen = /* @__PURE__ */ new Map();
};
const TCp = TreeCopier.prototype;
const originalProperty = {
	configurable: false,
	enumerable: false,
	writable: true
};
TCp.copy = function(node) {
	if (typeof node !== "object") return node;
	if (this.seen.has(node)) return this.seen.get(node);
	if (isArray$2.check(node)) {
		const copy = node.slice();
		this.seen.set(node, copy);
		node.forEach(function(item, i) {
			copy[i] = this.copy(item);
		}, this);
		return copy;
	}
	if (!isObject$2.check(node)) return node;
	fixFaultyLocations(node, this.lines);
	const copy = Object.create(Object.getPrototypeOf(node));
	Object.defineProperty(copy, "original", originalProperty);
	copy.original = node;
	this.seen.set(node, copy);
	const loc = node.loc;
	const oldIndent = this.indent;
	let newIndent = oldIndent;
	const type = node.type;
	if (loc) {
		if (type === "Block" || type === "Line" || type === "CommentBlock" || type === "CommentLine" || this.lines.isPrecededOnlyByWhitespace(loc.start)) newIndent = this.indent = loc.start.column;
		loc.lines = this.lines;
		loc.tokens = this.tokens;
		loc.indent = newIndent;
		this.findTokenRange(loc);
	}
	const oldStartTokenIndex = this.startTokenIndex;
	const oldEndTokenIndex = this.endTokenIndex;
	const keys = Object.keys(node);
	const keyCount = keys.length;
	for (let i = 0; i < keyCount; ++i) {
		const key = keys[i];
		if (key === "loc") copy.loc = loc;
		else if (key === "tokens" && type === "File") copy.tokens = node.tokens;
		else copy[key] = this.copy(node[key]);
	}
	this.indent = oldIndent;
	this.startTokenIndex = oldStartTokenIndex;
	this.endTokenIndex = oldEndTokenIndex;
	return copy;
};
TCp.findTokenRange = function(loc) {
	while (this.startTokenIndex > 0) {
		const token = loc.tokens[this.startTokenIndex];
		if (comparePos(loc.start, token.loc.start) < 0) --this.startTokenIndex;
		else break;
	}
	while (this.endTokenIndex < loc.tokens.length) {
		const token = loc.tokens[this.endTokenIndex];
		if (comparePos(token.loc.end, loc.end) <= 0) ++this.endTokenIndex;
		else break;
	}
	while (this.startTokenIndex < this.endTokenIndex) {
		const token = loc.tokens[this.startTokenIndex];
		if (comparePos(token.loc.start, loc.start) < 0) ++this.startTokenIndex;
		else break;
	}
	loc.start.token = this.startTokenIndex;
	while (this.endTokenIndex > this.startTokenIndex) {
		const token = loc.tokens[this.endTokenIndex - 1];
		if (comparePos(loc.end, token.loc.end) < 0) --this.endTokenIndex;
		else break;
	}
	loc.end.token = this.endTokenIndex;
};
//#endregion
//#region vendor/recast/lib/fast-path.ts
const n = namedTypes$1;
const isArray$1 = builtInTypes.array;
const isNumber = builtInTypes.number;
const PRECEDENCE = {};
[
	["??"],
	["||"],
	["&&"],
	["|"],
	["^"],
	["&"],
	[
		"==",
		"===",
		"!=",
		"!=="
	],
	[
		"<",
		">",
		"<=",
		">=",
		"in",
		"instanceof"
	],
	[
		">>",
		"<<",
		">>>"
	],
	["+", "-"],
	[
		"*",
		"/",
		"%"
	],
	["**"]
].forEach(function(tier, i) {
	tier.forEach(function(op) {
		PRECEDENCE[op] = i;
	});
});
const FastPath = function FastPath(value) {
	this instanceof FastPath;
	this.stack = [value];
};
const FPp = FastPath.prototype;
FastPath.from = function(obj) {
	if (obj instanceof FastPath) return obj.copy();
	if (obj instanceof NodePath) {
		const copy = Object.create(FastPath.prototype);
		const stack = [obj.value];
		for (let pp; pp = obj.parentPath; obj = pp) stack.push(obj.name, pp.value);
		copy.stack = stack.reverse();
		return copy;
	}
	return new FastPath(obj);
};
FPp.copy = function copy() {
	const copy = Object.create(FastPath.prototype);
	copy.stack = this.stack.slice(0);
	return copy;
};
FPp.getName = function getName() {
	const s = this.stack;
	const len = s.length;
	if (len > 1) return s[len - 2];
	return null;
};
FPp.getValue = function getValue() {
	const s = this.stack;
	return s[s.length - 1];
};
FPp.valueIsDuplicate = function() {
	const s = this.stack;
	const valueIndex = s.length - 1;
	return s.lastIndexOf(s[valueIndex], valueIndex - 1) >= 0;
};
function getNodeHelper(path, count) {
	const s = path.stack;
	for (let i = s.length - 1; i >= 0; i -= 2) {
		const value = s[i];
		if (n.Node.check(value) && --count < 0) return value;
	}
	return null;
}
FPp.getNode = function getNode(count = 0) {
	return getNodeHelper(this, ~~count);
};
FPp.getParentNode = function getParentNode(count = 0) {
	return getNodeHelper(this, ~~count + 1);
};
FPp.getRootValue = function getRootValue() {
	const s = this.stack;
	if (s.length % 2 === 0) return s[1];
	return s[0];
};
FPp.call = function call(callback) {
	const s = this.stack;
	const origLen = s.length;
	let value = s[origLen - 1];
	const argc = arguments.length;
	for (let i = 1; i < argc; ++i) {
		const name = arguments[i];
		value = value[name];
		s.push(name, value);
	}
	const result = callback(this);
	s.length = origLen;
	return result;
};
FPp.each = function each(callback) {
	const s = this.stack;
	const origLen = s.length;
	let value = s[origLen - 1];
	const argc = arguments.length;
	for (let i = 1; i < argc; ++i) {
		const name = arguments[i];
		value = value[name];
		s.push(name, value);
	}
	for (let i = 0; i < value.length; ++i) if (i in value) {
		s.push(i, value[i]);
		callback(this);
		s.length -= 2;
	}
	s.length = origLen;
};
FPp.map = function map(callback) {
	const s = this.stack;
	const origLen = s.length;
	let value = s[origLen - 1];
	const argc = arguments.length;
	for (let i = 1; i < argc; ++i) {
		const name = arguments[i];
		value = value[name];
		s.push(name, value);
	}
	const result = new Array(value.length);
	for (let i = 0; i < value.length; ++i) if (i in value) {
		s.push(i, value[i]);
		result[i] = callback(this, i);
		s.length -= 2;
	}
	s.length = origLen;
	return result;
};
FPp.hasParens = function() {
	const node = this.getNode();
	const prevToken = this.getPrevToken(node);
	if (!prevToken) return false;
	const nextToken = this.getNextToken(node);
	if (!nextToken) return false;
	if (prevToken.value === "(") {
		if (nextToken.value === ")") return true;
		if (!this.canBeFirstInStatement() && this.firstInStatement() && !this.needsParens(true)) return true;
	}
	return false;
};
FPp.getPrevToken = function(node) {
	node = node || this.getNode();
	const loc = node && node.loc;
	const tokens = loc && loc.tokens;
	if (tokens && loc.start.token > 0) {
		const token = tokens[loc.start.token - 1];
		if (token) {
			const rootLoc = this.getRootValue().loc;
			if (comparePos(rootLoc.start, token.loc.start) <= 0) return token;
		}
	}
	return null;
};
FPp.getNextToken = function(node) {
	node = node || this.getNode();
	const loc = node && node.loc;
	const tokens = loc && loc.tokens;
	if (tokens && loc.end.token < tokens.length) {
		const token = tokens[loc.end.token];
		if (token) {
			const rootLoc = this.getRootValue().loc;
			if (comparePos(token.loc.end, rootLoc.end) <= 0) return token;
		}
	}
	return null;
};
FPp.needsParens = function(assumeExpressionContext) {
	const node = this.getNode();
	if (node.type === "AssignmentExpression" && node.left.type === "ObjectPattern") return true;
	const parent = this.getParentNode();
	const name = this.getName();
	if (this.getValue() !== node) return false;
	if (n.Statement.check(node)) return false;
	if (node.type === "Identifier") return false;
	if (parent && parent.type === "ParenthesizedExpression") return false;
	if (node.extra && node.extra.parenthesized) return true;
	if (!parent) return false;
	if (node.type === "UnaryExpression" && parent.type === "BinaryExpression" && name === "left" && parent.left === node && parent.operator === "**") return true;
	if (parent.type === "TaggedTemplateExpression" && name === "tag" && parent.tag === node) switch (node.type) {
		case "UnaryExpression":
		case "UpdateExpression":
		case "BinaryExpression":
		case "LogicalExpression":
		case "ConditionalExpression":
		case "AssignmentExpression":
		case "AwaitExpression":
		case "YieldExpression":
		case "ArrowFunctionExpression": return true;
	}
	switch (node.type) {
		case "UnaryExpression":
		case "SpreadElement":
		case "SpreadProperty": return parent.type === "MemberExpression" && name === "object" && parent.object === node;
		case "UpdateExpression": switch (parent.type) {
			case "MemberExpression": return name === "object" && parent.object === node;
			case "CallExpression":
			case "NewExpression": return name === "callee" && parent.callee === node;
			default: return false;
		}
		case "BinaryExpression":
		case "LogicalExpression":
			switch (parent.type) {
				case "CallExpression": return name === "callee" && parent.callee === node;
				case "UnaryExpression":
				case "SpreadElement":
				case "SpreadProperty": return true;
				case "MemberExpression": return name === "object" && parent.object === node;
				case "BinaryExpression":
				case "LogicalExpression": {
					const po = parent.operator;
					const pp = PRECEDENCE[po];
					const no = node.operator;
					const np = PRECEDENCE[no];
					if (pp > np) return true;
					if (pp === np) {
						if (po === "**") return name === "left";
						if (name === "right") {
							parent.right;
							return true;
						}
					}
					break;
				}
				default: return false;
			}
			break;
		case "SequenceExpression": switch (parent.type) {
			case "ReturnStatement": return false;
			case "ForStatement": return false;
			case "ExpressionStatement": return name !== "expression";
			default: return true;
		}
		case "OptionalIndexedAccessType": return node.optional && parent.type === "IndexedAccessType";
		case "IntersectionTypeAnnotation":
		case "UnionTypeAnnotation": return parent.type === "NullableTypeAnnotation";
		case "Literal": return parent.type === "MemberExpression" && isNumber.check(node.value) && name === "object" && parent.object === node;
		case "NumericLiteral": return parent.type === "MemberExpression" && name === "object" && parent.object === node;
		case "YieldExpression":
		case "AwaitExpression":
		case "AssignmentExpression":
		case "ConditionalExpression": switch (parent.type) {
			case "UnaryExpression":
			case "SpreadElement":
			case "SpreadProperty":
			case "BinaryExpression":
			case "LogicalExpression": return true;
			case "CallExpression":
			case "NewExpression": return name === "callee" && parent.callee === node;
			case "ConditionalExpression": return name === "test" && parent.test === node;
			case "MemberExpression": return name === "object" && parent.object === node;
			default: return false;
		}
		case "ArrowFunctionExpression":
			if (n.CallExpression.check(parent) && name === "callee" && parent.callee === node) return true;
			if (n.MemberExpression.check(parent) && name === "object" && parent.object === node) return true;
			if (n.TSAsExpression && n.TSAsExpression.check(parent) && name === "expression" && parent.expression === node) return true;
			return isBinary(parent);
		case "ObjectExpression":
			if (parent.type === "ArrowFunctionExpression" && name === "body" && parent.body === node) return true;
			break;
		case "TSAsExpression":
			if (parent.type === "ArrowFunctionExpression" && name === "body" && parent.body === node && node.expression.type === "ObjectExpression") return true;
			break;
		case "CallExpression": if (name === "declaration" && n.ExportDefaultDeclaration.check(parent) && n.FunctionExpression.check(node.callee)) return true;
	}
	if (parent.type === "NewExpression" && name === "callee" && parent.callee === node) return containsCallExpression(node);
	if (assumeExpressionContext !== true && !this.canBeFirstInStatement() && this.firstInStatement()) return true;
	return false;
};
function isBinary(node) {
	return n.BinaryExpression.check(node) || n.LogicalExpression.check(node);
}
function containsCallExpression(node) {
	if (n.CallExpression.check(node)) return true;
	if (isArray$1.check(node)) return node.some(containsCallExpression);
	if (n.Node.check(node)) return someField(node, (_name, child) => containsCallExpression(child));
	return false;
}
FPp.canBeFirstInStatement = function() {
	const node = this.getNode();
	if (n.FunctionExpression.check(node)) return false;
	if (n.ObjectExpression.check(node)) return false;
	if (n.ClassExpression.check(node)) return false;
	return true;
};
FPp.firstInStatement = function() {
	const s = this.stack;
	let parentName, parent;
	let childName, child;
	for (let i = s.length - 1; i >= 0; i -= 2) {
		if (n.Node.check(s[i])) {
			childName = parentName;
			child = parent;
			parentName = s[i - 1];
			parent = s[i];
		}
		if (!parent || !child) continue;
		if (n.BlockStatement.check(parent) && parentName === "body" && childName === 0) {
			parent.body[0];
			return true;
		}
		if (n.ExpressionStatement.check(parent) && childName === "expression") {
			parent.expression;
			return true;
		}
		if (n.AssignmentExpression.check(parent) && childName === "left") {
			parent.left;
			return true;
		}
		if (n.ArrowFunctionExpression.check(parent) && childName === "body") {
			parent.body;
			return true;
		}
		if (n.SequenceExpression.check(parent) && s[i + 1] === "expressions" && childName === 0) {
			parent.expressions[0];
			continue;
		}
		if (n.CallExpression.check(parent) && childName === "callee") {
			parent.callee;
			continue;
		}
		if (n.MemberExpression.check(parent) && childName === "object") {
			parent.object;
			continue;
		}
		if (n.ConditionalExpression.check(parent) && childName === "test") {
			parent.test;
			continue;
		}
		if (isBinary(parent) && childName === "left") {
			parent.left;
			continue;
		}
		if (n.UnaryExpression.check(parent) && !parent.prefix && childName === "argument") {
			parent.argument;
			continue;
		}
		return false;
	}
	return true;
};
//#endregion
//#region vendor/recast/lib/patcher.ts
const Printable = namedTypes$1.Printable;
const Expression = namedTypes$1.Expression;
const ReturnStatement = namedTypes$1.ReturnStatement;
const SourceLocation = namedTypes$1.SourceLocation;
const isObject$1 = builtInTypes.object;
const isArray = builtInTypes.array;
const isString$1 = builtInTypes.string;
const riskyAdjoiningCharExp = /[0-9a-z_$]/i;
const Patcher = function Patcher(lines) {
	this instanceof Patcher;
	lines instanceof Lines;
	const self = this, replacements = [];
	self.replace = function(loc, lines) {
		if (isString$1.check(lines)) lines = fromString(lines);
		replacements.push({
			lines,
			start: loc.start,
			end: loc.end
		});
	};
	self.get = function(loc) {
		loc = loc || {
			start: {
				line: 1,
				column: 0
			},
			end: {
				line: lines.length,
				column: lines.getLineLength(lines.length)
			}
		};
		let sliceFrom = loc.start, toConcat = [];
		function pushSlice(from, to) {
			comparePos(from, to);
			toConcat.push(lines.slice(from, to));
		}
		replacements.sort((a, b) => comparePos(a.start, b.start)).forEach(function(rep) {
			if (comparePos(sliceFrom, rep.start) > 0) {} else {
				pushSlice(sliceFrom, rep.start);
				toConcat.push(rep.lines);
				sliceFrom = rep.end;
			}
		});
		pushSlice(sliceFrom, loc.end);
		return concat(toConcat);
	};
};
const Pp = Patcher.prototype;
Pp.tryToReprintComments = function(newNode, oldNode, print) {
	const patcher = this;
	if (!newNode.comments && !oldNode.comments) return true;
	const newPath = FastPath.from(newNode);
	const oldPath = FastPath.from(oldNode);
	newPath.stack.push("comments", getSurroundingComments(newNode));
	oldPath.stack.push("comments", getSurroundingComments(oldNode));
	const reprints = [];
	const ableToReprintComments = findArrayReprints(newPath, oldPath, reprints);
	if (ableToReprintComments && reprints.length > 0) reprints.forEach(function(reprint) {
		const oldComment = reprint.oldPath.getValue();
		oldComment.leading || oldComment.trailing;
		patcher.replace(oldComment.loc, print(reprint.newPath).indentTail(oldComment.loc.indent));
	});
	return ableToReprintComments;
};
function getSurroundingComments(node) {
	const result = [];
	if (node.comments && node.comments.length > 0) node.comments.forEach(function(comment) {
		if (comment.leading || comment.trailing) result.push(comment);
	});
	return result;
}
Pp.deleteComments = function(node) {
	if (!node.comments) return;
	const patcher = this;
	node.comments.forEach(function(comment) {
		if (comment.leading) patcher.replace({
			start: comment.loc.start,
			end: node.loc.lines.skipSpaces(comment.loc.end, false, false)
		}, "");
		else if (comment.trailing) patcher.replace({
			start: node.loc.lines.skipSpaces(comment.loc.start, true, false),
			end: comment.loc.end
		}, "");
	});
};
function getReprinter(path) {
	path instanceof FastPath;
	const node = path.getValue();
	if (!Printable.check(node)) return;
	const orig = node.original;
	const origLoc = orig && orig.loc;
	const lines = origLoc && origLoc.lines;
	const reprints = [];
	if (!lines || !findReprints(path, reprints)) return;
	return function(print) {
		const patcher = new Patcher(lines);
		reprints.forEach(function(reprint) {
			const newNode = reprint.newPath.getValue();
			const oldNode = reprint.oldPath.getValue();
			SourceLocation.assert(oldNode.loc, true);
			const needToPrintNewPathWithComments = !patcher.tryToReprintComments(newNode, oldNode, print);
			if (needToPrintNewPathWithComments) patcher.deleteComments(oldNode);
			let newLines = print(reprint.newPath, {
				includeComments: needToPrintNewPathWithComments,
				avoidRootParens: oldNode.type === newNode.type && reprint.oldPath.hasParens()
			}).indentTail(oldNode.loc.indent);
			const nls = needsLeadingSpace(lines, oldNode.loc, newLines);
			const nts = needsTrailingSpace(lines, oldNode.loc, newLines);
			if (nls || nts) {
				const newParts = [];
				nls && newParts.push(" ");
				newParts.push(newLines);
				nts && newParts.push(" ");
				newLines = concat(newParts);
			}
			patcher.replace(oldNode.loc, newLines);
		});
		const patchedLines = patcher.get(origLoc).indentTail(-orig.loc.indent);
		if (path.needsParens()) return concat([
			"(",
			patchedLines,
			")"
		]);
		return patchedLines;
	};
}
function needsLeadingSpace(oldLines, oldLoc, newLines) {
	const posBeforeOldLoc = copyPos(oldLoc.start);
	const charBeforeOldLoc = oldLines.prevPos(posBeforeOldLoc) && oldLines.charAt(posBeforeOldLoc);
	const newFirstChar = newLines.charAt(newLines.firstPos());
	return charBeforeOldLoc && riskyAdjoiningCharExp.test(charBeforeOldLoc) && newFirstChar && riskyAdjoiningCharExp.test(newFirstChar);
}
function needsTrailingSpace(oldLines, oldLoc, newLines) {
	const charAfterOldLoc = oldLines.charAt(oldLoc.end);
	const newLastPos = newLines.lastPos();
	const newLastChar = newLines.prevPos(newLastPos) && newLines.charAt(newLastPos);
	return newLastChar && riskyAdjoiningCharExp.test(newLastChar) && charAfterOldLoc && riskyAdjoiningCharExp.test(charAfterOldLoc);
}
function findReprints(newPath, reprints) {
	const newNode = newPath.getValue();
	Printable.assert(newNode);
	const oldNode = newNode.original;
	Printable.assert(oldNode);
	reprints.length;
	if (newNode.type !== oldNode.type) return false;
	const canReprint = findChildReprints(newPath, new FastPath(oldNode), reprints);
	if (!canReprint) reprints.length = 0;
	return canReprint;
}
function findAnyReprints(newPath, oldPath, reprints) {
	const newNode = newPath.getValue();
	if (newNode === oldPath.getValue()) return true;
	if (isArray.check(newNode)) return findArrayReprints(newPath, oldPath, reprints);
	if (isObject$1.check(newNode)) return findObjectReprints(newPath, oldPath, reprints);
	return false;
}
function findArrayReprints(newPath, oldPath, reprints) {
	const newNode = newPath.getValue();
	const oldNode = oldPath.getValue();
	if (newNode === oldNode || newPath.valueIsDuplicate() || oldPath.valueIsDuplicate()) return true;
	isArray.assert(newNode);
	const len = newNode.length;
	if (!(isArray.check(oldNode) && oldNode.length === len)) return false;
	for (let i = 0; i < len; ++i) {
		newPath.stack.push(i, newNode[i]);
		oldPath.stack.push(i, oldNode[i]);
		const canReprint = findAnyReprints(newPath, oldPath, reprints);
		newPath.stack.length -= 2;
		oldPath.stack.length -= 2;
		if (!canReprint) return false;
	}
	return true;
}
function findObjectReprints(newPath, oldPath, reprints) {
	const newNode = newPath.getValue();
	isObject$1.assert(newNode);
	if (newNode.original === null) return false;
	const oldNode = oldPath.getValue();
	if (!isObject$1.check(oldNode)) return false;
	if (newNode === oldNode || newPath.valueIsDuplicate() || oldPath.valueIsDuplicate()) return true;
	if (Printable.check(newNode)) {
		if (!Printable.check(oldNode)) return false;
		const newParentNode = newPath.getParentNode();
		const oldParentNode = oldPath.getParentNode();
		if (oldParentNode !== null && oldParentNode.type === "FunctionTypeAnnotation" && newParentNode !== null && newParentNode.type === "FunctionTypeAnnotation") {
			const oldNeedsParens = oldParentNode.params.length !== 1 || !!oldParentNode.params[0].name;
			const newNeedParens = newParentNode.params.length !== 1 || !!newParentNode.params[0].name;
			if (!oldNeedsParens && newNeedParens) return false;
		}
		if (newNode.type === oldNode.type) {
			const childReprints = [];
			if (findChildReprints(newPath, oldPath, childReprints)) reprints.push.apply(reprints, childReprints);
			else if (oldNode.loc) reprints.push({
				oldPath: oldPath.copy(),
				newPath: newPath.copy()
			});
			else return false;
			return true;
		}
		if (Expression.check(newNode) && Expression.check(oldNode) && oldNode.loc) {
			reprints.push({
				oldPath: oldPath.copy(),
				newPath: newPath.copy()
			});
			return true;
		}
		return false;
	}
	return findChildReprints(newPath, oldPath, reprints);
}
function findChildReprints(newPath, oldPath, reprints) {
	const newNode = newPath.getValue();
	const oldNode = oldPath.getValue();
	isObject$1.assert(newNode);
	isObject$1.assert(oldNode);
	if (newNode.original === null) return false;
	if (newPath.needsParens() && !oldPath.hasParens()) return false;
	const keys = getUnionOfKeys(oldNode, newNode);
	if (oldNode.type === "File" || newNode.type === "File") delete keys.tokens;
	delete keys.loc;
	const originalReprintCount = reprints.length;
	for (let k in keys) {
		if (k.charAt(0) === "_") continue;
		newPath.stack.push(k, getFieldValue(newNode, k));
		oldPath.stack.push(k, getFieldValue(oldNode, k));
		const canReprint = findAnyReprints(newPath, oldPath, reprints);
		newPath.stack.length -= 2;
		oldPath.stack.length -= 2;
		if (!canReprint) return false;
	}
	if (ReturnStatement.check(newPath.getNode()) && reprints.length > originalReprintCount) return false;
	return true;
}
//#endregion
//#region vendor/recast/lib/printer.ts
const namedTypes = namedTypes$1;
const isString = builtInTypes.string;
const isObject = builtInTypes.object;
const PrintResult = function PrintResult(code, sourceMap) {
	this instanceof PrintResult;
	isString.assert(code);
	this.code = code;
	if (sourceMap) {
		isObject.assert(sourceMap);
		this.map = sourceMap;
	}
};
const PRp = PrintResult.prototype;
let warnedAboutToString = false;
PRp.toString = function() {
	if (!warnedAboutToString) {
		console.warn("Deprecation warning: recast.print now returns an object with a .code property. You appear to be treating the object as a string, which might still work but is strongly discouraged.");
		warnedAboutToString = true;
	}
	return this.code;
};
const emptyPrintResult = new PrintResult("");
const Printer = function Printer(config) {
	this instanceof Printer;
	const explicitTabWidth = config && config.tabWidth;
	config = normalize(config);
	config.sourceFileName = null;
	function makePrintFunctionWith(options, overrides) {
		options = Object.assign({}, options, overrides);
		return (path) => print(path, options);
	}
	function print(path, options) {
		path instanceof FastPath;
		options = options || {};
		if (options.includeComments) return printComments(path, makePrintFunctionWith(options, { includeComments: false }));
		const oldTabWidth = config.tabWidth;
		if (!explicitTabWidth) {
			const loc = path.getNode().loc;
			if (loc && loc.lines && loc.lines.guessTabWidth) config.tabWidth = loc.lines.guessTabWidth();
		}
		const reprinter = getReprinter(path);
		const lines = reprinter ? reprinter(print) : genericPrint(path, config, options, makePrintFunctionWith(options, {
			includeComments: true,
			avoidRootParens: false
		}));
		config.tabWidth = oldTabWidth;
		return lines;
	}
	this.print = function(ast) {
		if (!ast) return emptyPrintResult;
		const lines = print(FastPath.from(ast), {
			includeComments: true,
			avoidRootParens: false
		});
		return new PrintResult(lines.toString(config), composeSourceMaps(config.inputSourceMap, lines.getSourceMap(config.sourceMapName, config.sourceRoot)));
	};
	this.printGenerically = function(ast) {
		if (!ast) return emptyPrintResult;
		function printGenerically(path) {
			return printComments(path, (path) => genericPrint(path, config, {
				includeComments: true,
				avoidRootParens: false
			}, printGenerically));
		}
		const path = FastPath.from(ast);
		const oldReuseWhitespace = config.reuseWhitespace;
		config.reuseWhitespace = false;
		const pr = new PrintResult(printGenerically(path).toString(config));
		config.reuseWhitespace = oldReuseWhitespace;
		return pr;
	};
};
function genericPrint(path, config, options, printPath) {
	path instanceof FastPath;
	const node = path.getValue();
	const parts = [];
	const linesWithoutParens = genericPrintNoParens(path, config, printPath);
	if (!node || linesWithoutParens.isEmpty()) return linesWithoutParens;
	let shouldAddParens = false;
	const decoratorsLines = printDecorators(path, printPath);
	if (decoratorsLines.isEmpty()) {
		if (!options.avoidRootParens) shouldAddParens = path.needsParens();
	} else parts.push(decoratorsLines);
	if (shouldAddParens) parts.unshift("(");
	parts.push(linesWithoutParens);
	if (shouldAddParens) parts.push(")");
	return concat(parts);
}
function genericPrintNoParens(path, options, print) {
	const n = path.getValue();
	if (!n) return fromString("");
	if (typeof n === "string") return fromString(n, options);
	namedTypes.Printable.assert(n);
	const parts = [];
	switch (n.type) {
		case "File": return path.call(print, "program");
		case "Program":
			if (n.directives) path.each(function(childPath) {
				parts.push(print(childPath), ";\n");
			}, "directives");
			if (n.interpreter) parts.push(path.call(print, "interpreter"));
			parts.push(path.call((bodyPath) => printStatementSequence(bodyPath, options, print), "body"));
			return concat(parts);
		case "Noop":
		case "EmptyStatement": return fromString("");
		case "ExpressionStatement": return concat([path.call(print, "expression"), ";"]);
		case "ParenthesizedExpression": return concat([
			"(",
			path.call(print, "expression"),
			")"
		]);
		case "BinaryExpression":
		case "LogicalExpression":
		case "AssignmentExpression": return fromString(" ").join([
			path.call(print, "left"),
			n.operator,
			path.call(print, "right")
		]);
		case "AssignmentPattern": return concat([
			path.call(print, "left"),
			" = ",
			path.call(print, "right")
		]);
		case "MemberExpression":
		case "OptionalMemberExpression": {
			parts.push(path.call(print, "object"));
			const property = path.call(print, "property");
			const optional = getFieldValue(n, "optional");
			if (n.computed) parts.push(optional ? "?.[" : "[", property, "]");
			else parts.push(optional ? "?." : ".", property);
			return concat(parts);
		}
		case "ChainExpression": return path.call(print, "expression");
		case "MetaProperty": return concat([
			path.call(print, "meta"),
			".",
			path.call(print, "property")
		]);
		case "BindExpression":
			if (n.object) parts.push(path.call(print, "object"));
			parts.push("::", path.call(print, "callee"));
			return concat(parts);
		case "Path": return fromString(".").join(n.body);
		case "Identifier": return concat([
			fromString(n.name, options),
			n.optional ? "?" : "",
			path.call(print, "typeAnnotation")
		]);
		case "SpreadElement":
		case "SpreadElementPattern":
		case "RestProperty":
		case "SpreadProperty":
		case "SpreadPropertyPattern":
		case "ObjectTypeSpreadProperty":
		case "RestElement": return concat([
			"...",
			path.call(print, "argument"),
			path.call(print, "typeAnnotation")
		]);
		case "FunctionDeclaration":
		case "FunctionExpression":
		case "TSDeclareFunction":
			if (n.declare) parts.push("declare ");
			if (n.async) parts.push("async ");
			parts.push("function");
			if (n.generator) parts.push("*");
			if (n.id) parts.push(" ", path.call(print, "id"), path.call(print, "typeParameters"));
			else if (n.typeParameters) parts.push(path.call(print, "typeParameters"));
			parts.push("(", printFunctionParams(path, options, print), ")", path.call(print, "returnType"));
			if (n.body) parts.push(" ", path.call(print, "body"));
			return concat(parts);
		case "ArrowFunctionExpression":
			if (n.async) parts.push("async ");
			if (n.typeParameters) parts.push(path.call(print, "typeParameters"));
			if (!options.arrowParensAlways && n.params.length === 1 && !n.rest && n.params[0].type === "Identifier" && !n.params[0].typeAnnotation && !n.returnType) parts.push(path.call(print, "params", 0));
			else parts.push("(", printFunctionParams(path, options, print), ")", path.call(print, "returnType"));
			parts.push(" => ", path.call(print, "body"));
			return concat(parts);
		case "MethodDefinition": return printMethod(path, options, print);
		case "YieldExpression":
			parts.push("yield");
			if (n.delegate) parts.push("*");
			if (n.argument) parts.push(" ", path.call(print, "argument"));
			return concat(parts);
		case "AwaitExpression":
			parts.push("await");
			if (n.all) parts.push("*");
			if (n.argument) parts.push(" ", path.call(print, "argument"));
			return concat(parts);
		case "ModuleExpression": return concat([
			"module {\n",
			path.call(print, "body").indent(options.tabWidth),
			"\n}"
		]);
		case "ModuleDeclaration":
			parts.push("module", path.call(print, "id"));
			if (n.source) {
				n.body;
				parts.push("from", path.call(print, "source"));
			} else parts.push(path.call(print, "body"));
			return fromString(" ").join(parts);
		case "ImportSpecifier":
			if (n.importKind && n.importKind !== "value") parts.push(n.importKind + " ");
			if (n.imported) {
				parts.push(path.call(print, "imported"));
				if (n.local && n.local.name !== n.imported.name) parts.push(" as ", path.call(print, "local"));
			} else if (n.id) {
				parts.push(path.call(print, "id"));
				if (n.name) parts.push(" as ", path.call(print, "name"));
			}
			return concat(parts);
		case "ExportSpecifier":
			if (n.exportKind && n.exportKind !== "value") parts.push(n.exportKind + " ");
			if (n.local) {
				parts.push(path.call(print, "local"));
				if (n.exported && n.exported.name !== n.local.name) parts.push(" as ", path.call(print, "exported"));
			} else if (n.id) {
				parts.push(path.call(print, "id"));
				if (n.name) parts.push(" as ", path.call(print, "name"));
			}
			return concat(parts);
		case "ExportBatchSpecifier": return fromString("*");
		case "ImportNamespaceSpecifier":
			parts.push("* as ");
			if (n.local) parts.push(path.call(print, "local"));
			else if (n.id) parts.push(path.call(print, "id"));
			return concat(parts);
		case "ImportDefaultSpecifier":
			if (n.local) return path.call(print, "local");
			return path.call(print, "id");
		case "TSExportAssignment": return concat(["export = ", path.call(print, "expression")]);
		case "ExportDeclaration":
		case "ExportDefaultDeclaration":
		case "ExportNamedDeclaration": return printExportDeclaration(path, options, print);
		case "ExportAllDeclaration":
			parts.push(n.exportKind === "type" ? "export type *" : "export *");
			if (n.exported) parts.push(" as ", path.call(print, "exported"));
			parts.push(" from ", path.call(print, "source"), maybePrintImportAssertions(path, options, print), ";");
			return concat(parts);
		case "TSNamespaceExportDeclaration":
			parts.push("export as namespace ", path.call(print, "id"));
			return maybeAddSemicolon(concat(parts));
		case "ExportNamespaceSpecifier": return concat(["* as ", path.call(print, "exported")]);
		case "ExportDefaultSpecifier": return path.call(print, "exported");
		case "Import": return fromString("import", options);
		case "ImportExpression": return concat([
			"import(",
			path.call(print, "source"),
			")"
		]);
		case "ImportDeclaration":
			parts.push("import ");
			if (n.importKind && n.importKind !== "value") parts.push(n.importKind + " ");
			if (n.specifiers && n.specifiers.length > 0) {
				const unbracedSpecifiers = [];
				const bracedSpecifiers = [];
				path.each(function(specifierPath) {
					const spec = specifierPath.getValue();
					if (spec.type === "ImportSpecifier") bracedSpecifiers.push(print(specifierPath));
					else if (spec.type === "ImportDefaultSpecifier" || spec.type === "ImportNamespaceSpecifier") unbracedSpecifiers.push(print(specifierPath));
				}, "specifiers");
				unbracedSpecifiers.forEach((lines, i) => {
					if (i > 0) parts.push(", ");
					parts.push(lines);
				});
				if (bracedSpecifiers.length > 0) {
					let lines = fromString(", ").join(bracedSpecifiers);
					if (lines.getLineLength(1) > options.wrapColumn) lines = concat([fromString(",\n").join(bracedSpecifiers).indent(options.tabWidth), ","]);
					if (unbracedSpecifiers.length > 0) parts.push(", ");
					if (lines.length > 1) parts.push("{\n", lines, "\n}");
					else if (options.objectCurlySpacing) parts.push("{ ", lines, " }");
					else parts.push("{", lines, "}");
				}
				parts.push(" from ");
			}
			parts.push(path.call(print, "source"), maybePrintImportAssertions(path, options, print), ";");
			return concat(parts);
		case "ImportAttribute": return concat([
			path.call(print, "key"),
			": ",
			path.call(print, "value")
		]);
		case "StaticBlock": parts.push("static ");
		case "BlockStatement": {
			const naked = path.call((bodyPath) => printStatementSequence(bodyPath, options, print), "body");
			if (naked.isEmpty()) {
				if (!n.directives || n.directives.length === 0) {
					parts.push("{}");
					return concat(parts);
				}
			}
			parts.push("{\n");
			if (n.directives) path.each(function(childPath) {
				parts.push(maybeAddSemicolon(print(childPath).indent(options.tabWidth)), n.directives.length > 1 || !naked.isEmpty() ? "\n" : "");
			}, "directives");
			parts.push(naked.indent(options.tabWidth));
			parts.push("\n}");
			return concat(parts);
		}
		case "ReturnStatement":
			parts.push("return");
			if (n.argument) {
				const argIsJsxElement = namedTypes.JSXElement?.check(n.argument) || namedTypes.JSXFragment?.check(n.argument);
				let argLines = path.call(print, "argument");
				if (argLines.startsWithComment() || argLines.length > 1 && argIsJsxElement) {
					if (argIsJsxElement && n.argument.extra?.parenthesized) {
						n.argument.extra.parenthesized = false;
						argLines = path.call(print, "argument");
						n.argument.extra.parenthesized = true;
					}
					parts.push(" ", concat(["(\n", argLines]).indentTail(options.tabWidth), "\n)");
				} else parts.push(" ", argLines);
			}
			parts.push(";");
			return concat(parts);
		case "CallExpression":
		case "OptionalCallExpression":
			parts.push(path.call(print, "callee"));
			if (getFieldValue(n, "optional")) parts.push("?.");
			if (n.typeParameters) parts.push(path.call(print, "typeParameters"));
			if (n.typeArguments) parts.push(path.call(print, "typeArguments"));
			parts.push(printArgumentsList(path, options, print));
			return concat(parts);
		case "RecordExpression": parts.push("#");
		case "ObjectExpression":
		case "ObjectPattern":
		case "ObjectTypeAnnotation": {
			const isTypeAnnotation = n.type === "ObjectTypeAnnotation";
			const separator = options.flowObjectCommas ? "," : isTypeAnnotation ? ";" : ",";
			const fields = [];
			let allowBreak = false;
			if (isTypeAnnotation) {
				fields.push("indexers", "callProperties");
				if (n.internalSlots != null) fields.push("internalSlots");
			}
			fields.push("properties");
			let len = 0;
			fields.forEach(function(field) {
				len += n[field].length;
			});
			const oneLine = isTypeAnnotation && len === 1 || len === 0;
			const leftBrace = n.exact ? "{|" : "{";
			const rightBrace = n.exact ? "|}" : "}";
			parts.push(oneLine ? leftBrace : leftBrace + "\n");
			const leftBraceIndex = parts.length - 1;
			let i = 0;
			fields.forEach(function(field) {
				path.each(function(childPath) {
					let lines = print(childPath);
					if (!oneLine) lines = lines.indent(options.tabWidth);
					const multiLine = !isTypeAnnotation && lines.length > 1;
					if (multiLine && allowBreak) parts.push("\n");
					parts.push(lines);
					if (i < len - 1) {
						parts.push(separator + (multiLine ? "\n\n" : "\n"));
						allowBreak = !multiLine;
					} else if (len !== 1 && isTypeAnnotation) parts.push(separator);
					else if (!oneLine && isTrailingCommaEnabled(options, "objects") && childPath.getValue().type !== "RestElement") parts.push(separator);
					i++;
				}, field);
			});
			if (n.inexact) {
				const line = fromString("...", options);
				if (oneLine) {
					if (len > 0) parts.push(separator, " ");
					parts.push(line);
				} else parts.push("\n", line.indent(options.tabWidth));
			}
			parts.push(oneLine ? rightBrace : "\n" + rightBrace);
			if (i !== 0 && oneLine && options.objectCurlySpacing) {
				parts[leftBraceIndex] = leftBrace + " ";
				parts[parts.length - 1] = " " + rightBrace;
			}
			if (n.optional) parts.push("?");
			if (n.typeAnnotation) parts.push(path.call(print, "typeAnnotation"));
			return concat(parts);
		}
		case "PropertyPattern": return concat([
			path.call(print, "key"),
			": ",
			path.call(print, "pattern")
		]);
		case "ObjectProperty":
		case "Property": {
			if (n.method || n.kind === "get" || n.kind === "set") return printMethod(path, options, print);
			if (n.shorthand && n.value.type === "AssignmentPattern") return path.call(print, "value");
			const key = path.call(print, "key");
			if (n.computed) parts.push("[", key, "]");
			else parts.push(key);
			if (!n.shorthand || n.key.name !== n.value.name) parts.push(": ", path.call(print, "value"));
			return concat(parts);
		}
		case "ClassMethod":
		case "ObjectMethod":
		case "ClassPrivateMethod":
		case "TSDeclareMethod": return printMethod(path, options, print);
		case "PrivateName": return concat(["#", path.call(print, "id")]);
		case "Decorator": return concat(["@", path.call(print, "expression")]);
		case "TupleExpression": parts.push("#");
		case "ArrayExpression":
		case "ArrayPattern": {
			const len = n.elements.length;
			const printed = path.map(print, "elements");
			const oneLine = fromString(", ").join(printed).getLineLength(1) <= options.wrapColumn;
			if (oneLine) {
				if (options.arrayBracketSpacing) parts.push("[ ");
				else parts.push("[");
			} else parts.push("[\n");
			path.each(function(elemPath) {
				const i = elemPath.getName();
				if (!elemPath.getValue()) parts.push(",");
				else {
					let lines = printed[i];
					if (oneLine) {
						if (i > 0) parts.push(" ");
					} else lines = lines.indent(options.tabWidth);
					parts.push(lines);
					if (i < len - 1 || !oneLine && isTrailingCommaEnabled(options, "arrays")) parts.push(",");
					if (!oneLine) parts.push("\n");
				}
			}, "elements");
			if (oneLine && options.arrayBracketSpacing) parts.push(" ]");
			else parts.push("]");
			if (n.optional) parts.push("?");
			if (n.typeAnnotation) parts.push(path.call(print, "typeAnnotation"));
			return concat(parts);
		}
		case "SequenceExpression": return fromString(", ").join(path.map(print, "expressions"));
		case "ThisExpression": return fromString("this");
		case "Super": return fromString("super");
		case "NullLiteral": return fromString("null");
		case "RegExpLiteral": return fromString(getPossibleRaw(n) || `/${n.pattern}/${n.flags || ""}`, options);
		case "BigIntLiteral": return fromString(getPossibleRaw(n) || n.value + "n", options);
		case "NumericLiteral": return fromString(getPossibleRaw(n) || n.value, options);
		case "DecimalLiteral": return fromString(getPossibleRaw(n) || n.value + "m", options);
		case "StringLiteral": return fromString(nodeStr(n.value, options));
		case "BooleanLiteral":
		case "Literal": return fromString(getPossibleRaw(n) || (typeof n.value === "string" ? nodeStr(n.value, options) : n.value), options);
		case "Directive": return path.call(print, "value");
		case "DirectiveLiteral": return fromString(getPossibleRaw(n) || nodeStr(n.value, options), options);
		case "InterpreterDirective": return fromString(`#!${n.value}\n`, options);
		case "ModuleSpecifier":
			if (n.local) throw new Error("The ESTree ModuleSpecifier type should be abstract");
			return fromString(nodeStr(n.value, options), options);
		case "UnaryExpression":
			parts.push(n.operator);
			if (/[a-z]$/.test(n.operator)) parts.push(" ");
			parts.push(path.call(print, "argument"));
			return concat(parts);
		case "UpdateExpression":
			parts.push(path.call(print, "argument"), n.operator);
			if (n.prefix) parts.reverse();
			return concat(parts);
		case "ConditionalExpression": return concat([
			path.call(print, "test"),
			" ? ",
			path.call(print, "consequent"),
			" : ",
			path.call(print, "alternate")
		]);
		case "NewExpression":
			parts.push("new ", path.call(print, "callee"));
			if (n.typeParameters) parts.push(path.call(print, "typeParameters"));
			if (n.typeArguments) parts.push(path.call(print, "typeArguments"));
			if (n.arguments) parts.push(printArgumentsList(path, options, print));
			return concat(parts);
		case "VariableDeclaration": {
			if (n.declare) parts.push("declare ");
			parts.push(n.kind, " ");
			let maxLen = 0;
			const printed = path.map(function(childPath) {
				const lines = print(childPath);
				maxLen = Math.max(lines.length, maxLen);
				return lines;
			}, "declarations");
			if (maxLen === 1) parts.push(fromString(", ").join(printed));
			else if (printed.length > 1) parts.push(fromString(",\n").join(printed).indentTail(n.kind.length + 1));
			else parts.push(printed[0]);
			const parentNode = path.getParentNode();
			if (!namedTypes.ForStatement.check(parentNode) && !namedTypes.ForInStatement.check(parentNode) && !(namedTypes.ForOfStatement && namedTypes.ForOfStatement.check(parentNode)) && !(namedTypes.ForAwaitStatement && namedTypes.ForAwaitStatement.check(parentNode))) parts.push(";");
			return concat(parts);
		}
		case "VariableDeclarator": return n.init ? fromString(" = ").join([path.call(print, "id"), path.call(print, "init")]) : path.call(print, "id");
		case "WithStatement": return concat([
			"with (",
			path.call(print, "object"),
			") ",
			path.call(print, "body")
		]);
		case "IfStatement": {
			const con = adjustClause(path.call(print, "consequent"), options);
			parts.push("if (", path.call(print, "test"), ")", con);
			if (n.alternate) parts.push(endsWithBrace(con) ? " else" : "\nelse", adjustClause(path.call(print, "alternate"), options));
			return concat(parts);
		}
		case "ForStatement": {
			const init = path.call(print, "init");
			const head = concat([
				"for (",
				fromString(init.length > 1 ? ";\n" : "; ").join([
					init,
					path.call(print, "test"),
					path.call(print, "update")
				]).indentTail(5),
				")"
			]);
			let clause = adjustClause(path.call(print, "body"), options);
			parts.push(head);
			if (head.length > 1) {
				parts.push("\n");
				clause = clause.trimLeft();
			}
			parts.push(clause);
			return concat(parts);
		}
		case "WhileStatement": return concat([
			"while (",
			path.call(print, "test"),
			")",
			adjustClause(path.call(print, "body"), options)
		]);
		case "ForInStatement": return concat([
			n.each ? "for each (" : "for (",
			path.call(print, "left"),
			" in ",
			path.call(print, "right"),
			")",
			adjustClause(path.call(print, "body"), options)
		]);
		case "ForOfStatement":
		case "ForAwaitStatement":
			parts.push("for ");
			if (n.await || n.type === "ForAwaitStatement") parts.push("await ");
			parts.push("(", path.call(print, "left"), " of ", path.call(print, "right"), ")", adjustClause(path.call(print, "body"), options));
			return concat(parts);
		case "DoWhileStatement": {
			const doBody = concat(["do", adjustClause(path.call(print, "body"), options)]);
			parts.push(doBody);
			if (endsWithBrace(doBody)) parts.push(" while");
			else parts.push("\nwhile");
			parts.push(" (", path.call(print, "test"), ");");
			return concat(parts);
		}
		case "DoExpression": return concat([
			"do {\n",
			path.call((bodyPath) => printStatementSequence(bodyPath, options, print), "body").indent(options.tabWidth),
			"\n}"
		]);
		case "BreakStatement":
			parts.push("break");
			if (n.label) parts.push(" ", path.call(print, "label"));
			parts.push(";");
			return concat(parts);
		case "ContinueStatement":
			parts.push("continue");
			if (n.label) parts.push(" ", path.call(print, "label"));
			parts.push(";");
			return concat(parts);
		case "LabeledStatement": return concat([
			path.call(print, "label"),
			":\n",
			path.call(print, "body")
		]);
		case "TryStatement":
			parts.push("try ", path.call(print, "block"));
			if (n.handler) parts.push(" ", path.call(print, "handler"));
			else if (n.handlers) path.each(function(handlerPath) {
				parts.push(" ", print(handlerPath));
			}, "handlers");
			if (n.finalizer) parts.push(" finally ", path.call(print, "finalizer"));
			return concat(parts);
		case "CatchClause":
			parts.push("catch ");
			if (n.param) parts.push("(", path.call(print, "param"));
			if (n.guard) parts.push(" if ", path.call(print, "guard"));
			if (n.param) parts.push(") ");
			parts.push(path.call(print, "body"));
			return concat(parts);
		case "ThrowStatement": return concat([
			"throw ",
			path.call(print, "argument"),
			";"
		]);
		case "SwitchStatement": return concat([
			"switch (",
			path.call(print, "discriminant"),
			") {\n",
			fromString("\n").join(path.map(print, "cases")),
			"\n}"
		]);
		case "SwitchCase":
			if (n.test) parts.push("case ", path.call(print, "test"), ":");
			else parts.push("default:");
			if (n.consequent.length > 0) parts.push("\n", path.call((consequentPath) => printStatementSequence(consequentPath, options, print), "consequent").indent(options.tabWidth));
			return concat(parts);
		case "DebuggerStatement": return fromString("debugger;");
		case "JSXAttribute":
			parts.push(path.call(print, "name"));
			if (n.value) parts.push("=", path.call(print, "value"));
			return concat(parts);
		case "JSXIdentifier": return fromString(n.name, options);
		case "JSXNamespacedName": return fromString(":").join([path.call(print, "namespace"), path.call(print, "name")]);
		case "JSXMemberExpression": return fromString(".").join([path.call(print, "object"), path.call(print, "property")]);
		case "JSXSpreadAttribute": return concat([
			"{...",
			path.call(print, "argument"),
			"}"
		]);
		case "JSXSpreadChild": return concat([
			"{...",
			path.call(print, "expression"),
			"}"
		]);
		case "JSXExpressionContainer": return concat([
			"{",
			path.call(print, "expression"),
			"}"
		]);
		case "JSXElement":
		case "JSXFragment": {
			const openingPropName = "opening" + (n.type === "JSXElement" ? "Element" : "Fragment");
			const closingPropName = "closing" + (n.type === "JSXElement" ? "Element" : "Fragment");
			const openingLines = path.call(print, openingPropName);
			if (n[openingPropName].selfClosing) {
				n[closingPropName], "" + closingPropName + n.type;
				return openingLines;
			}
			return concat([
				openingLines,
				concat(path.map(function(childPath) {
					const child = childPath.getValue();
					if (namedTypes.Literal.check(child) && typeof child.value === "string") {
						if (/\S/.test(child.value)) return child.value.replace(/^\s+/g, "");
						else if (/\n\s*\n/.test(child.value)) return "\n\n";
						else if (/\n/.test(child.value)) return "\n";
					}
					return print(childPath);
				}, "children")).indentTail(options.tabWidth),
				path.call(print, closingPropName)
			]);
		}
		case "JSXOpeningElement": {
			parts.push("<", path.call(print, "name"));
			const typeDefPart = path.call(print, "typeParameters");
			if (typeDefPart.length) parts.push(typeDefPart);
			const attrParts = [];
			path.each(function(attrPath) {
				attrParts.push(" ", print(attrPath));
			}, "attributes");
			let attrLines = concat(attrParts);
			if (attrLines.length > 1 || attrLines.getLineLength(1) > options.wrapColumn) {
				attrParts.forEach(function(part, i) {
					if (part === " ") {
						i % 2;
						attrParts[i] = "\n";
					}
				});
				attrLines = concat(attrParts).indentTail(options.tabWidth);
			}
			parts.push(attrLines, n.selfClosing ? " />" : ">");
			return concat(parts);
		}
		case "JSXClosingElement": return concat([
			"</",
			path.call(print, "name"),
			">"
		]);
		case "JSXOpeningFragment": return fromString("<>");
		case "JSXClosingFragment": return fromString("</>");
		case "JSXText": return fromString(n.value, options);
		case "JSXEmptyExpression": return fromString("");
		case "TypeAnnotatedIdentifier": return concat([
			path.call(print, "annotation"),
			" ",
			path.call(print, "identifier")
		]);
		case "ClassBody":
			if (n.body.length === 0) return fromString("{}");
			return concat([
				"{\n",
				path.call((bodyPath) => printStatementSequence(bodyPath, options, print), "body").indent(options.tabWidth),
				"\n}"
			]);
		case "ClassPropertyDefinition":
			parts.push("static ", path.call(print, "definition"));
			if (!namedTypes.MethodDefinition.check(n.definition)) parts.push(";");
			return concat(parts);
		case "ClassProperty": {
			if (n.declare) parts.push("declare ");
			const access = n.accessibility || n.access;
			if (typeof access === "string") parts.push(access, " ");
			if (n.static) parts.push("static ");
			if (n.abstract) parts.push("abstract ");
			if (n.readonly) parts.push("readonly ");
			let key = path.call(print, "key");
			if (n.computed) key = concat([
				"[",
				key,
				"]"
			]);
			if (n.variance) key = concat([printVariance(path, print), key]);
			parts.push(key);
			if (n.optional) parts.push("?");
			if (n.definite) parts.push("!");
			if (n.typeAnnotation) parts.push(path.call(print, "typeAnnotation"));
			if (n.value) parts.push(" = ", path.call(print, "value"));
			parts.push(";");
			return concat(parts);
		}
		case "ClassPrivateProperty":
			if (n.static) parts.push("static ");
			parts.push(path.call(print, "key"));
			if (n.typeAnnotation) parts.push(path.call(print, "typeAnnotation"));
			if (n.value) parts.push(" = ", path.call(print, "value"));
			parts.push(";");
			return concat(parts);
		case "ClassAccessorProperty":
			parts.push(...printClassMemberModifiers(n), "accessor ");
			if (n.computed) parts.push("[", path.call(print, "key"), "]");
			else parts.push(path.call(print, "key"));
			if (n.optional) parts.push("?");
			if (n.definite) parts.push("!");
			if (n.typeAnnotation) parts.push(path.call(print, "typeAnnotation"));
			if (n.value) parts.push(" = ", path.call(print, "value"));
			parts.push(";");
			return concat(parts);
		case "ClassDeclaration":
		case "ClassExpression":
		case "DeclareClass":
			if (n.declare) parts.push("declare ");
			if (n.abstract) parts.push("abstract ");
			parts.push("class");
			if (n.id) parts.push(" ", path.call(print, "id"));
			if (n.typeParameters) parts.push(path.call(print, "typeParameters"));
			if (n.superClass) parts.push(" extends ", path.call(print, "superClass"), path.call(print, "superTypeParameters"));
			if (n.extends && n.extends.length > 0) parts.push(" extends ", fromString(", ").join(path.map(print, "extends")));
			if (n["implements"] && n["implements"].length > 0) parts.push(" implements ", fromString(", ").join(path.map(print, "implements")));
			parts.push(" ", path.call(print, "body"));
			if (n.type === "DeclareClass") return printFlowDeclaration(path, parts);
			else return concat(parts);
		case "TemplateElement": return fromString(n.value.raw, options).lockIndentTail();
		case "TemplateLiteral": {
			const expressions = path.map(print, "expressions");
			parts.push("`");
			path.each(function(childPath) {
				const i = childPath.getName();
				parts.push(print(childPath));
				if (i < expressions.length) parts.push("${", expressions[i], "}");
			}, "quasis");
			parts.push("`");
			return concat(parts).lockIndentTail();
		}
		case "TaggedTemplateExpression":
			parts.push(path.call(print, "tag"));
			if (n.typeParameters) parts.push(path.call(print, "typeParameters"));
			parts.push(path.call(print, "quasi"));
			return concat(parts);
		case "Node":
		case "Printable":
		case "SourceLocation":
		case "Position":
		case "Statement":
		case "Function":
		case "Pattern":
		case "Expression":
		case "Declaration":
		case "Specifier":
		case "NamedSpecifier":
		case "Comment":
		case "Flow":
		case "FlowType":
		case "FlowPredicate":
		case "MemberTypeAnnotation":
		case "Type":
		case "TSHasOptionalTypeParameterInstantiation":
		case "TSHasOptionalTypeParameters":
		case "TSHasOptionalTypeAnnotation":
		case "ChainElement": throw new Error("unprintable type: " + JSON.stringify(n.type));
		case "CommentBlock":
		case "Block": return concat([
			"/*",
			fromString(n.value, options),
			"*/"
		]);
		case "CommentLine":
		case "Line": return concat(["//", fromString(n.value, options)]);
		case "TypeAnnotation":
			if (n.typeAnnotation) {
				if (n.typeAnnotation.type !== "FunctionTypeAnnotation") parts.push(": ");
				parts.push(path.call(print, "typeAnnotation"));
				return concat(parts);
			}
			return fromString("");
		case "ExistentialTypeParam":
		case "ExistsTypeAnnotation": return fromString("*", options);
		case "EmptyTypeAnnotation": return fromString("empty", options);
		case "AnyTypeAnnotation": return fromString("any", options);
		case "MixedTypeAnnotation": return fromString("mixed", options);
		case "ArrayTypeAnnotation": return concat([path.call(print, "elementType"), "[]"]);
		case "TupleTypeAnnotation": {
			const printed = path.map(print, "types");
			const oneLine = fromString(", ").join(printed).getLineLength(1) <= options.wrapColumn;
			if (oneLine) {
				if (options.arrayBracketSpacing) parts.push("[ ");
				else parts.push("[");
			} else parts.push("[\n");
			path.each(function(elemPath) {
				const i = elemPath.getName();
				if (!elemPath.getValue()) parts.push(",");
				else {
					let lines = printed[i];
					if (oneLine) {
						if (i > 0) parts.push(" ");
					} else lines = lines.indent(options.tabWidth);
					parts.push(lines);
					if (i < n.types.length - 1 || !oneLine && isTrailingCommaEnabled(options, "arrays")) parts.push(",");
					if (!oneLine) parts.push("\n");
				}
			}, "types");
			if (oneLine && options.arrayBracketSpacing) parts.push(" ]");
			else parts.push("]");
			return concat(parts);
		}
		case "BooleanTypeAnnotation": return fromString("boolean", options);
		case "BooleanLiteralTypeAnnotation":
			n.value;
			return fromString("" + n.value, options);
		case "InterfaceTypeAnnotation":
			parts.push("interface");
			if (n.extends && n.extends.length > 0) parts.push(" extends ", fromString(", ").join(path.map(print, "extends")));
			parts.push(" ", path.call(print, "body"));
			return concat(parts);
		case "DeclareFunction": return printFlowDeclaration(path, [
			"function ",
			path.call(print, "id"),
			";"
		]);
		case "DeclareModule": return printFlowDeclaration(path, [
			"module ",
			path.call(print, "id"),
			" ",
			path.call(print, "body")
		]);
		case "DeclareModuleExports": return printFlowDeclaration(path, ["module.exports", path.call(print, "typeAnnotation")]);
		case "DeclareVariable": return printFlowDeclaration(path, [
			"var ",
			path.call(print, "id"),
			";"
		]);
		case "DeclareExportDeclaration":
		case "DeclareExportAllDeclaration": return concat(["declare ", printExportDeclaration(path, options, print)]);
		case "EnumDeclaration": return concat([
			"enum ",
			path.call(print, "id"),
			path.call(print, "body")
		]);
		case "EnumBooleanBody":
		case "EnumNumberBody":
		case "EnumStringBody":
		case "EnumSymbolBody":
			if (n.type === "EnumSymbolBody" || n.explicitType) parts.push(" of ", n.type.slice(4, -4).toLowerCase());
			parts.push(" {\n", fromString("\n").join(path.map(print, "members")).indent(options.tabWidth), "\n}");
			return concat(parts);
		case "EnumDefaultedMember": return concat([path.call(print, "id"), ","]);
		case "EnumBooleanMember":
		case "EnumNumberMember":
		case "EnumStringMember": return concat([
			path.call(print, "id"),
			" = ",
			path.call(print, "init"),
			","
		]);
		case "InferredPredicate": return fromString("%checks", options);
		case "DeclaredPredicate": return concat([
			"%checks(",
			path.call(print, "value"),
			")"
		]);
		case "FunctionTypeAnnotation": {
			const parent = path.getParentNode(0);
			const isArrowFunctionTypeAnnotation = !(namedTypes.ObjectTypeCallProperty.check(parent) || namedTypes.ObjectTypeInternalSlot.check(parent) && parent.method || namedTypes.DeclareFunction.check(path.getParentNode(2)));
			if (isArrowFunctionTypeAnnotation && !namedTypes.FunctionTypeParam.check(parent) && !namedTypes.TypeAlias.check(parent)) parts.push(": ");
			const hasTypeParameters = !!n.typeParameters;
			const needsParens = hasTypeParameters || n.params.length !== 1 || n.params[0].name;
			parts.push(hasTypeParameters ? path.call(print, "typeParameters") : "", needsParens ? "(" : "", printFunctionParams(path, options, print), needsParens ? ")" : "");
			if (n.returnType) parts.push(isArrowFunctionTypeAnnotation ? " => " : ": ", path.call(print, "returnType"));
			return concat(parts);
		}
		case "FunctionTypeParam": {
			const name = path.call(print, "name");
			parts.push(name);
			if (n.optional) parts.push("?");
			if (name.infos[0].line) parts.push(": ");
			parts.push(path.call(print, "typeAnnotation"));
			return concat(parts);
		}
		case "GenericTypeAnnotation": return concat([path.call(print, "id"), path.call(print, "typeParameters")]);
		case "DeclareInterface": parts.push("declare ");
		case "InterfaceDeclaration":
		case "TSInterfaceDeclaration":
			if (n.declare) parts.push("declare ");
			parts.push("interface ", path.call(print, "id"), path.call(print, "typeParameters"), " ");
			if (n["extends"] && n["extends"].length > 0) parts.push("extends ", fromString(", ").join(path.map(print, "extends")), " ");
			if (n.body) parts.push(path.call(print, "body"));
			return concat(parts);
		case "ClassImplements":
		case "InterfaceExtends": return concat([path.call(print, "id"), path.call(print, "typeParameters")]);
		case "IntersectionTypeAnnotation": return fromString(" & ").join(path.map(print, "types"));
		case "NullableTypeAnnotation": return concat(["?", path.call(print, "typeAnnotation")]);
		case "NullLiteralTypeAnnotation": return fromString("null", options);
		case "ThisTypeAnnotation": return fromString("this", options);
		case "NumberTypeAnnotation": return fromString("number", options);
		case "ObjectTypeCallProperty": return path.call(print, "value");
		case "ObjectTypeIndexer":
			if (n.static) parts.push("static ");
			parts.push(printVariance(path, print), "[");
			if (n.id) parts.push(path.call(print, "id"), ": ");
			parts.push(path.call(print, "key"), "]: ", path.call(print, "value"));
			return concat(parts);
		case "ObjectTypeProperty": return concat([
			printVariance(path, print),
			path.call(print, "key"),
			n.optional ? "?" : "",
			": ",
			path.call(print, "value")
		]);
		case "ObjectTypeInternalSlot": return concat([
			n.static ? "static " : "",
			"[[",
			path.call(print, "id"),
			"]]",
			n.optional ? "?" : "",
			n.value.type !== "FunctionTypeAnnotation" ? ": " : "",
			path.call(print, "value")
		]);
		case "QualifiedTypeIdentifier": return concat([
			path.call(print, "qualification"),
			".",
			path.call(print, "id")
		]);
		case "StringLiteralTypeAnnotation": return fromString(nodeStr(n.value, options), options);
		case "NumberLiteralTypeAnnotation":
		case "NumericLiteralTypeAnnotation":
			n.value;
			return fromString(JSON.stringify(n.value), options);
		case "BigIntLiteralTypeAnnotation": return fromString(n.raw, options);
		case "StringTypeAnnotation": return fromString("string", options);
		case "DeclareTypeAlias": parts.push("declare ");
		case "TypeAlias": return concat([
			"type ",
			path.call(print, "id"),
			path.call(print, "typeParameters"),
			" = ",
			path.call(print, "right"),
			";"
		]);
		case "DeclareOpaqueType": parts.push("declare ");
		case "OpaqueType":
			parts.push("opaque type ", path.call(print, "id"), path.call(print, "typeParameters"));
			if (n["supertype"]) parts.push(": ", path.call(print, "supertype"));
			if (n["impltype"]) parts.push(" = ", path.call(print, "impltype"));
			parts.push(";");
			return concat(parts);
		case "TypeCastExpression": return concat([
			"(",
			path.call(print, "expression"),
			path.call(print, "typeAnnotation"),
			")"
		]);
		case "TypeParameterDeclaration":
		case "TypeParameterInstantiation": return concat([
			"<",
			fromString(", ").join(path.map(print, "params")),
			">"
		]);
		case "Variance":
			if (n.kind === "plus") return fromString("+");
			if (n.kind === "minus") return fromString("-");
			return fromString("");
		case "TypeParameter":
			if (n.variance) parts.push(printVariance(path, print));
			parts.push(path.call(print, "name"));
			if (n.bound) parts.push(path.call(print, "bound"));
			if (n["default"]) parts.push("=", path.call(print, "default"));
			return concat(parts);
		case "TypeofTypeAnnotation": return concat([fromString("typeof ", options), path.call(print, "argument")]);
		case "IndexedAccessType":
		case "OptionalIndexedAccessType": return concat([
			path.call(print, "objectType"),
			n.optional ? "?." : "",
			"[",
			path.call(print, "indexType"),
			"]"
		]);
		case "UnionTypeAnnotation": return fromString(" | ").join(path.map(print, "types"));
		case "VoidTypeAnnotation": return fromString("void", options);
		case "NullTypeAnnotation": return fromString("null", options);
		case "SymbolTypeAnnotation": return fromString("symbol", options);
		case "BigIntTypeAnnotation": return fromString("bigint", options);
		case "TSType": throw new Error("unprintable type: " + JSON.stringify(n.type));
		case "TSNumberKeyword": return fromString("number", options);
		case "TSBigIntKeyword": return fromString("bigint", options);
		case "TSObjectKeyword": return fromString("object", options);
		case "TSBooleanKeyword": return fromString("boolean", options);
		case "TSStringKeyword": return fromString("string", options);
		case "TSSymbolKeyword": return fromString("symbol", options);
		case "TSAnyKeyword": return fromString("any", options);
		case "TSVoidKeyword": return fromString("void", options);
		case "TSIntrinsicKeyword": return fromString("intrinsic", options);
		case "TSThisType": return fromString("this", options);
		case "TSNullKeyword": return fromString("null", options);
		case "TSUndefinedKeyword": return fromString("undefined", options);
		case "TSUnknownKeyword": return fromString("unknown", options);
		case "TSNeverKeyword": return fromString("never", options);
		case "TSArrayType":
			if (n.elementType.type === "TSUnionType") return concat([
				"(",
				path.call(print, "elementType"),
				")",
				"[]"
			]);
			return concat([path.call(print, "elementType"), "[]"]);
		case "TSLiteralType": return path.call(print, "literal");
		case "TSUnionType": return fromString(" | ").join(path.map(print, "types"));
		case "TSIntersectionType": return fromString(" & ").join(path.map(print, "types"));
		case "TSConditionalType":
			parts.push(path.call(print, "checkType"), " extends ", path.call(print, "extendsType"), " ? ", path.call(print, "trueType"), " : ", path.call(print, "falseType"));
			return concat(parts);
		case "TSInferType":
			parts.push("infer ", path.call(print, "typeParameter"));
			return concat(parts);
		case "TSParenthesizedType": return concat([
			"(",
			path.call(print, "typeAnnotation"),
			")"
		]);
		case "TSFunctionType": return concat([
			path.call(print, "typeParameters"),
			"(",
			printFunctionParams(path, options, print),
			") => ",
			path.call(print, "typeAnnotation", "typeAnnotation")
		]);
		case "TSConstructorType": return concat([
			n.abstract ? "abstract new " : "new ",
			path.call(print, "typeParameters"),
			"(",
			printFunctionParams(path, options, print),
			") => ",
			path.call(print, "typeAnnotation", "typeAnnotation")
		]);
		case "TSMappedType": {
			const readonly = n.readonly === true ? "readonly " : n.readonly ? n.readonly + "readonly " : "";
			const optional = n.optional === true ? "?" : n.optional ? n.optional + "?" : "";
			parts.push(readonly, "[", path.call(print, "typeParameter"), "]", optional);
			if (n.typeAnnotation) parts.push(": ", path.call(print, "typeAnnotation"), ";");
			return concat([
				"{\n",
				concat(parts).indent(options.tabWidth),
				"\n}"
			]);
		}
		case "TSTupleType": return concat([
			"[",
			fromString(", ").join(path.map(print, "elementTypes")),
			"]"
		]);
		case "TSNamedTupleMember":
			parts.push(path.call(print, "label"));
			if (n.optional) parts.push("?");
			parts.push(": ", path.call(print, "elementType"));
			return concat(parts);
		case "TSRestType": return concat(["...", path.call(print, "typeAnnotation")]);
		case "TSOptionalType": return concat([path.call(print, "typeAnnotation"), "?"]);
		case "TSIndexedAccessType": return concat([
			path.call(print, "objectType"),
			"[",
			path.call(print, "indexType"),
			"]"
		]);
		case "TSTypeOperator": return concat([
			path.call(print, "operator"),
			" ",
			path.call(print, "typeAnnotation")
		]);
		case "TSTypeLiteral": {
			const members = fromString("\n").join(path.map(print, "members").map((member) => {
				if (lastNonSpaceCharacter(member) !== ";") return member.concat(";");
				return member;
			}));
			if (members.isEmpty()) return fromString("{}", options);
			parts.push("{\n", members.indent(options.tabWidth), "\n}");
			return concat(parts);
		}
		case "TSEnumMember":
			parts.push(path.call(print, "id"));
			if (n.initializer) parts.push(" = ", path.call(print, "initializer"));
			return concat(parts);
		case "TSTypeQuery": return concat([
			"typeof ",
			path.call(print, "exprName"),
			path.call(print, "typeParameters")
		]);
		case "TSParameterProperty":
			if (n.accessibility) parts.push(n.accessibility, " ");
			if (n.override) parts.push("override ");
			if (n.export) parts.push("export ");
			if (n.static) parts.push("static ");
			if (n.readonly) parts.push("readonly ");
			parts.push(path.call(print, "parameter"));
			return concat(parts);
		case "TSTypeReference": return concat([path.call(print, "typeName"), path.call(print, "typeParameters")]);
		case "TSQualifiedName": return concat([
			path.call(print, "left"),
			".",
			path.call(print, "right")
		]);
		case "TSAsExpression":
		case "TSSatisfiesExpression": {
			const expression = path.call(print, "expression");
			parts.push(expression, n.type === "TSSatisfiesExpression" ? " satisfies " : " as ", path.call(print, "typeAnnotation"));
			return concat(parts);
		}
		case "TSTypeCastExpression": return concat([path.call(print, "expression"), path.call(print, "typeAnnotation")]);
		case "TSNonNullExpression": return concat([path.call(print, "expression"), "!"]);
		case "TSTypeAnnotation": return concat([": ", path.call(print, "typeAnnotation")]);
		case "TSIndexSignature": return concat([
			n.readonly ? "readonly " : "",
			"[",
			path.map(print, "parameters"),
			"]",
			path.call(print, "typeAnnotation")
		]);
		case "TSPropertySignature":
			parts.push(printVariance(path, print), n.readonly ? "readonly " : "");
			if (n.computed) parts.push("[", path.call(print, "key"), "]");
			else parts.push(path.call(print, "key"));
			parts.push(n.optional ? "?" : "", path.call(print, "typeAnnotation"));
			return concat(parts);
		case "TSMethodSignature":
			if (n.kind === "get") parts.push("get ");
			else if (n.kind === "set") parts.push("set ");
			if (n.computed) parts.push("[", path.call(print, "key"), "]");
			else parts.push(path.call(print, "key"));
			if (n.optional) parts.push("?");
			parts.push(path.call(print, "typeParameters"), "(", printFunctionParams(path, options, print), ")", path.call(print, "typeAnnotation"));
			return concat(parts);
		case "TSTypePredicate":
			if (n.asserts) parts.push("asserts ");
			parts.push(path.call(print, "parameterName"));
			if (n.typeAnnotation) parts.push(" is ", path.call(print, "typeAnnotation", "typeAnnotation"));
			return concat(parts);
		case "TSCallSignatureDeclaration": return concat([
			path.call(print, "typeParameters"),
			"(",
			printFunctionParams(path, options, print),
			")",
			path.call(print, "typeAnnotation")
		]);
		case "TSConstructSignatureDeclaration":
			if (n.typeParameters) parts.push("new", path.call(print, "typeParameters"));
			else parts.push("new ");
			parts.push("(", printFunctionParams(path, options, print), ")", path.call(print, "typeAnnotation"));
			return concat(parts);
		case "TSTypeAliasDeclaration": return concat([
			n.declare ? "declare " : "",
			"type ",
			path.call(print, "id"),
			path.call(print, "typeParameters"),
			" = ",
			path.call(print, "typeAnnotation"),
			";"
		]);
		case "TSTypeParameter": {
			if (n.const) parts.push("const ");
			if (n.in) parts.push("in ");
			if (n.out) parts.push("out ");
			parts.push(path.call(print, "name"));
			const parent = path.getParentNode(0);
			const isInMappedType = namedTypes.TSMappedType.check(parent);
			if (n.constraint) parts.push(isInMappedType ? " in " : " extends ", path.call(print, "constraint"));
			if (n["default"]) parts.push(" = ", path.call(print, "default"));
			return concat(parts);
		}
		case "TSTypeAssertion":
			parts.push("<", path.call(print, "typeAnnotation"), "> ", path.call(print, "expression"));
			return concat(parts);
		case "TSTypeParameterDeclaration":
		case "TSTypeParameterInstantiation": return concat([
			"<",
			fromString(", ").join(path.map(print, "params")),
			">"
		]);
		case "TSEnumDeclaration": {
			parts.push(n.declare ? "declare " : "", n.const ? "const " : "", "enum ", path.call(print, "id"));
			const memberLines = fromString(",\n").join(path.map(print, "members"));
			if (memberLines.isEmpty()) parts.push(" {}");
			else parts.push(" {\n", memberLines.indent(options.tabWidth), "\n}");
			return concat(parts);
		}
		case "TSExpressionWithTypeArguments": return concat([path.call(print, "expression"), path.call(print, "typeParameters")]);
		case "TSInterfaceBody": {
			const lines = fromString("\n").join(path.map(print, "body").map((element) => {
				if (lastNonSpaceCharacter(element) !== ";") return element.concat(";");
				return element;
			}));
			if (lines.isEmpty()) return fromString("{}", options);
			return concat([
				"{\n",
				lines.indent(options.tabWidth),
				"\n}"
			]);
		}
		case "TSImportType":
			parts.push("import(", path.call(print, "argument"));
			if (n.options) parts.push(", ", path.call(print, "options"));
			parts.push(")");
			if (n.qualifier) parts.push(".", path.call(print, "qualifier"));
			if (n.typeParameters) parts.push(path.call(print, "typeParameters"));
			return concat(parts);
		case "TSImportEqualsDeclaration":
			if (n.isExport) parts.push("export ");
			parts.push(n.importKind === "type" ? "import type " : "import ", path.call(print, "id"), " = ", path.call(print, "moduleReference"));
			return maybeAddSemicolon(concat(parts));
		case "TSExternalModuleReference": return concat([
			"require(",
			path.call(print, "expression"),
			")"
		]);
		case "TSModuleDeclaration":
			if (path.getParentNode().type === "TSModuleDeclaration") parts.push(".");
			else {
				if (n.declare) parts.push("declare ");
				if (!n.global) {
					if (n.id.type === "StringLiteral" || n.id.type === "Literal" && typeof n.id.value === "string") parts.push("module ");
					else if (n.kind === "module") parts.push("module ");
					else if (n.kind === "namespace") parts.push("namespace ");
					else if (n.loc && n.loc.lines && n.id.loc) {
						if (n.loc.lines.sliceString(n.loc.start, n.id.loc.start).indexOf("module") >= 0) parts.push("module ");
						else parts.push("namespace ");
					} else parts.push("namespace ");
				}
			}
			parts.push(path.call(print, "id"));
			if (n.body) {
				parts.push(" ");
				parts.push(path.call(print, "body"));
			}
			return concat(parts);
		case "TSModuleBlock": {
			const naked = path.call((bodyPath) => printStatementSequence(bodyPath, options, print), "body");
			if (naked.isEmpty()) parts.push("{}");
			else parts.push("{\n", naked.indent(options.tabWidth), "\n}");
			return concat(parts);
		}
		case "TSInstantiationExpression":
			parts.push(path.call(print, "expression"), path.call(print, "typeParameters"));
			return concat(parts);
		case "V8IntrinsicIdentifier": return concat(["%", path.call(print, "name")]);
		case "TopicReference": return fromString("#");
		default:
			debugger;
			throw new Error("unknown type: " + JSON.stringify(n.type));
	}
}
function printDecorators(path, printPath) {
	const parts = [];
	const node = path.getValue();
	if (node.decorators && node.decorators.length > 0 && !getParentExportDeclaration(path)) path.each(function(decoratorPath) {
		parts.push(printPath(decoratorPath), "\n");
	}, "decorators");
	else if (isExportDeclaration(node) && node.declaration && node.declaration.decorators) path.each(function(decoratorPath) {
		parts.push(printPath(decoratorPath), "\n");
	}, "declaration", "decorators");
	return concat(parts);
}
function printStatementSequence(path, options, print) {
	const filtered = [];
	let sawComment = false;
	path.each(function(stmtPath) {
		const stmt = stmtPath.getValue();
		if (!stmt) return;
		if (stmt.type === "EmptyStatement" && !(stmt.comments && stmt.comments.length > 0)) return;
		if (namedTypes.Comment.check(stmt)) sawComment = true;
		else if (namedTypes.Statement.check(stmt));
		else isString.assert(stmt);
		filtered.push({
			node: stmt,
			printed: print(stmtPath)
		});
	});
	if (sawComment) {}
	let prevTrailingSpace = null;
	const len = filtered.length;
	const parts = [];
	filtered.forEach(function(info, i) {
		const printed = info.printed;
		const stmt = info.node;
		const multiLine = printed.length > 1;
		const notFirst = i > 0;
		const notLast = i < len - 1;
		let leadingSpace;
		let trailingSpace;
		const lines = stmt && stmt.loc && stmt.loc.lines;
		const trueLoc = lines && options.reuseWhitespace && getTrueLoc(stmt, lines);
		if (notFirst) {
			if (trueLoc) {
				const beforeStart = lines.skipSpaces(trueLoc.start, true);
				const beforeStartLine = beforeStart ? beforeStart.line : 1;
				const leadingGap = trueLoc.start.line - beforeStartLine;
				leadingSpace = Array(leadingGap + 1).join("\n");
			} else leadingSpace = multiLine ? "\n\n" : "\n";
		} else leadingSpace = "";
		if (notLast) {
			if (trueLoc) {
				const afterEnd = lines.skipSpaces(trueLoc.end);
				const trailingGap = (afterEnd ? afterEnd.line : lines.length) - trueLoc.end.line;
				trailingSpace = Array(trailingGap + 1).join("\n");
			} else trailingSpace = multiLine ? "\n\n" : "\n";
		} else trailingSpace = "";
		parts.push(maxSpace(prevTrailingSpace, leadingSpace), printed);
		if (notLast) prevTrailingSpace = trailingSpace;
		else if (trailingSpace) parts.push(trailingSpace);
	});
	return concat(parts);
}
function maxSpace(s1, s2) {
	if (!s1 && !s2) return fromString("");
	if (!s1) return fromString(s2);
	if (!s2) return fromString(s1);
	const spaceLines1 = fromString(s1);
	const spaceLines2 = fromString(s2);
	if (spaceLines2.length > spaceLines1.length) return spaceLines2;
	return spaceLines1;
}
function printClassMemberModifiers(node) {
	const parts = [];
	if (node.declare) parts.push("declare ");
	const access = node.accessibility || node.access;
	if (typeof access === "string") parts.push(access, " ");
	if (node.static) parts.push("static ");
	if (node.override) parts.push("override ");
	if (node.abstract) parts.push("abstract ");
	if (node.readonly) parts.push("readonly ");
	return parts;
}
function printMethod(path, options, print) {
	const node = path.getNode();
	const kind = node.kind;
	const parts = [];
	let nodeValue = node.value;
	if (!namedTypes.FunctionExpression.check(nodeValue)) nodeValue = node;
	parts.push(...printClassMemberModifiers(node));
	if (nodeValue.async) parts.push("async ");
	if (nodeValue.generator) parts.push("*");
	if (kind === "get" || kind === "set") parts.push(kind, " ");
	let key = path.call(print, "key");
	if (node.computed) key = concat([
		"[",
		key,
		"]"
	]);
	parts.push(key);
	if (node.optional) parts.push("?");
	if (node === nodeValue) {
		parts.push(path.call(print, "typeParameters"), "(", printFunctionParams(path, options, print), ")", path.call(print, "returnType"));
		if (node.body) parts.push(" ", path.call(print, "body"));
		else parts.push(";");
	} else {
		parts.push(path.call(print, "value", "typeParameters"), "(", path.call((valuePath) => printFunctionParams(valuePath, options, print), "value"), ")", path.call(print, "value", "returnType"));
		if (nodeValue.body) parts.push(" ", path.call(print, "value", "body"));
		else parts.push(";");
	}
	return concat(parts);
}
function printArgumentsList(path, options, print) {
	const printed = path.map(print, "arguments");
	const trailingComma = isTrailingCommaEnabled(options, "parameters");
	let joined = fromString(", ").join(printed);
	if (joined.getLineLength(1) > options.wrapColumn) {
		joined = fromString(",\n").join(printed);
		return concat([
			"(\n",
			joined.indent(options.tabWidth),
			trailingComma ? ",\n)" : "\n)"
		]);
	}
	return concat([
		"(",
		joined,
		")"
	]);
}
function printFunctionParams(path, options, print) {
	const fun = path.getValue();
	let params;
	let printed = [];
	if (fun.params) {
		params = fun.params;
		printed = path.map(print, "params");
	} else if (fun.parameters) {
		params = fun.parameters;
		printed = path.map(print, "parameters");
	}
	if (fun.defaults) path.each(function(defExprPath) {
		const i = defExprPath.getName();
		const p = printed[i];
		if (p && defExprPath.getValue()) printed[i] = concat([
			p,
			" = ",
			print(defExprPath)
		]);
	}, "defaults");
	if (fun.rest) printed.push(concat(["...", path.call(print, "rest")]));
	let joined = fromString(", ").join(printed);
	if (joined.length > 1 || joined.getLineLength(1) > options.wrapColumn) {
		joined = fromString(",\n").join(printed);
		if (isTrailingCommaEnabled(options, "parameters") && !fun.rest && params[params.length - 1].type !== "RestElement") joined = concat([joined, ",\n"]);
		else joined = concat([joined, "\n"]);
		return concat(["\n", joined.indent(options.tabWidth)]);
	}
	return joined;
}
function maybePrintImportAssertions(path, options, print) {
	const n = path.getValue();
	if (n.assertions && (n.assertions.length > 0 || n.importAttributesKeyword)) {
		const keyword = n.importAttributesKeyword === "with" ? " with {" : " assert {";
		const parts = [keyword];
		const printed = path.map(print, "assertions");
		if (printed.length === 0) return concat([keyword, "}"]);
		const flat = fromString(", ").join(printed);
		if (flat.length > 1 || flat.getLineLength(1) > options.wrapColumn) parts.push("\n", fromString(",\n").join(printed).indent(options.tabWidth), "\n}");
		else parts.push(" ", flat, " }");
		return concat(parts);
	}
	return fromString("");
}
function printExportDeclaration(path, options, print) {
	const decl = path.getValue();
	const parts = ["export "];
	if (decl.exportKind && decl.exportKind === "type") {
		if (!decl.declaration) parts.push("type ");
	}
	const shouldPrintSpaces = options.objectCurlySpacing;
	namedTypes.Declaration.assert(decl);
	if (decl["default"] || decl.type === "ExportDefaultDeclaration") parts.push("default ");
	if (decl.declaration) parts.push(path.call(print, "declaration"));
	else if (decl.specifiers) {
		if (decl.specifiers.length === 1 && decl.specifiers[0].type === "ExportBatchSpecifier") parts.push("*");
		else if (decl.specifiers.length === 0) parts.push("{}");
		else if (decl.specifiers[0].type === "ExportDefaultSpecifier" || decl.specifiers[0].type === "ExportNamespaceSpecifier") {
			const unbracedSpecifiers = [];
			const bracedSpecifiers = [];
			path.each(function(specifierPath) {
				const spec = specifierPath.getValue();
				if (spec.type === "ExportDefaultSpecifier" || spec.type === "ExportNamespaceSpecifier") unbracedSpecifiers.push(print(specifierPath));
				else bracedSpecifiers.push(print(specifierPath));
			}, "specifiers");
			unbracedSpecifiers.forEach((lines, i) => {
				if (i > 0) parts.push(", ");
				parts.push(lines);
			});
			if (bracedSpecifiers.length > 0) {
				let lines = fromString(", ").join(bracedSpecifiers);
				if (lines.getLineLength(1) > options.wrapColumn) lines = concat([fromString(",\n").join(bracedSpecifiers).indent(options.tabWidth), ","]);
				if (unbracedSpecifiers.length > 0) parts.push(", ");
				if (lines.length > 1) parts.push("{\n", lines, "\n}");
				else if (options.objectCurlySpacing) parts.push("{ ", lines, " }");
				else parts.push("{", lines, "}");
			}
		} else parts.push(shouldPrintSpaces ? "{ " : "{", fromString(", ").join(path.map(print, "specifiers")), shouldPrintSpaces ? " }" : "}");
		if (decl.source) parts.push(" from ", path.call(print, "source"), maybePrintImportAssertions(path, options, print));
	}
	let lines = concat(parts);
	if (lastNonSpaceCharacter(lines) !== ";" && !(decl.declaration && (decl.declaration.type === "FunctionDeclaration" || decl.declaration.type === "ClassDeclaration" || decl.declaration.type === "TSModuleDeclaration" || decl.declaration.type === "TSInterfaceDeclaration" || decl.declaration.type === "TSEnumDeclaration"))) lines = concat([lines, ";"]);
	return lines;
}
function printFlowDeclaration(path, parts) {
	const parentExportDecl = getParentExportDeclaration(path);
	if (parentExportDecl) parentExportDecl.type;
	else parts.unshift("declare ");
	return concat(parts);
}
function printVariance(path, print) {
	return path.call(function(variancePath) {
		const value = variancePath.getValue();
		if (value) {
			if (value === "plus") return fromString("+");
			if (value === "minus") return fromString("-");
			return print(variancePath);
		}
		return fromString("");
	}, "variance");
}
function adjustClause(clause, options) {
	if (clause.length > 1) return concat([" ", clause]);
	return concat(["\n", maybeAddSemicolon(clause).indent(options.tabWidth)]);
}
function lastNonSpaceCharacter(lines) {
	const pos = lines.lastPos();
	do {
		const ch = lines.charAt(pos);
		if (/\S/.test(ch)) return ch;
	} while (lines.prevPos(pos));
}
function endsWithBrace(lines) {
	return lastNonSpaceCharacter(lines) === "}";
}
function swapQuotes(str) {
	return str.replace(/['"]/g, (m) => m === "\"" ? "'" : "\"");
}
function getPossibleRaw(node) {
	const value = getFieldValue(node, "value");
	const extra = getFieldValue(node, "extra");
	if (extra && typeof extra.raw === "string" && value == extra.rawValue) return extra.raw;
	if (node.type === "Literal") {
		const raw = node.raw;
		if (typeof raw === "string" && value == raw) return raw;
	}
}
function jsSafeStringify(str) {
	return JSON.stringify(str).replace(/[\u2028\u2029]/g, function(m) {
		return "\\u" + m.charCodeAt(0).toString(16);
	});
}
function nodeStr(str, options) {
	isString.assert(str);
	switch (options.quote) {
		case "auto": {
			const double = jsSafeStringify(str);
			const single = swapQuotes(jsSafeStringify(swapQuotes(str)));
			return double.length > single.length ? single : double;
		}
		case "single": return swapQuotes(jsSafeStringify(swapQuotes(str)));
		default: return jsSafeStringify(str);
	}
}
function maybeAddSemicolon(lines) {
	const eoc = lastNonSpaceCharacter(lines);
	if (!eoc || "\n};".indexOf(eoc) < 0) return concat([lines, ";"]);
	return lines;
}
//#endregion
//#region vendor/recast/main.ts
/**
* Reprint a modified syntax tree using as much of the original source
* code as possible.
*/
function print(node, options) {
	return new Printer(options).print(node);
}
//#endregion
//#region src/babel.ts
let _babelParser;
function getBabelParser() {
	if (_babelParser) return _babelParser;
	const babelOptions = _getBabelOptions();
	_babelParser = { parse(source, options) {
		return babelParser.parse(source, {
			...babelOptions,
			...options
		});
	} };
	return _babelParser;
}
function _getBabelOptions() {
	return {
		sourceType: "module",
		strictMode: false,
		allowImportExportEverywhere: true,
		allowReturnOutsideFunction: true,
		startLine: 1,
		tokens: true,
		plugins: [
			"asyncGenerators",
			"bigInt",
			"classPrivateMethods",
			"classPrivateProperties",
			"classProperties",
			"classStaticBlock",
			"decimal",
			"decorators-legacy",
			"doExpressions",
			"dynamicImport",
			"exportDefaultFrom",
			"exportExtensions",
			"exportNamespaceFrom",
			"functionBind",
			"functionSent",
			"importAssertions",
			"importMeta",
			"nullishCoalescingOperator",
			"numericSeparator",
			"objectRestSpread",
			"optionalCatchBinding",
			"optionalChaining",
			["pipelineOperator", { proposal: "minimal" }],
			["recordAndTuple", { syntaxType: "hash" }],
			"throwExpressions",
			"topLevelAwait",
			"v8intrinsic",
			"jsx",
			"typescript"
		]
	};
}
//#endregion
//#region src/format.ts
function detectCodeFormat(code, userStyles = {}) {
	const detect = {
		wrapColumn: userStyles.wrapColumn === void 0,
		indent: userStyles.tabWidth === void 0 || userStyles.useTabs === void 0,
		quote: userStyles.quote === void 0,
		arrowParens: userStyles.arrowParensAlways === void 0,
		trailingComma: userStyles.trailingComma === void 0
	};
	let codeIndent = 2;
	let tabUsages = 0;
	let semiUsages = 0;
	let maxLineLength = 0;
	let multiLineTrailingCommaUsages = 0;
	const syntaxDetectRegex = /(?<doubleQuote>"[^"]+")|(?<singleQuote>'[^']+')|(?<singleParam>\([^),]+\)\s*=>)|(?<trailingComma>,\s*[\]}])/g;
	const syntaxUsages = {
		doubleQuote: 0,
		singleQuote: 0,
		singleParam: 0,
		trailingComma: 0
	};
	const lines = (code || "").split("\n");
	let previousLineTrailing = false;
	for (const line of lines) {
		const trimmitedLine = line.trim();
		if (trimmitedLine.length === 0) continue;
		if (detect.wrapColumn && line.length > maxLineLength) maxLineLength = line.length;
		if (detect.indent) {
			const lineIndent = line.match(/^\s+/)?.[0] || "";
			if (lineIndent.length > 0) {
				if (lineIndent.length > 0 && lineIndent.length < codeIndent) codeIndent = lineIndent.length;
				if (lineIndent[0] === "	") tabUsages++;
				else if (lineIndent.length > 0) tabUsages--;
			}
		}
		if (trimmitedLine.at(-1) === ";") semiUsages++;
		else if (trimmitedLine.length > 0) semiUsages--;
		if (detect.quote || detect.arrowParens) {
			const matches = trimmitedLine.matchAll(syntaxDetectRegex);
			for (const match of matches) {
				if (!match.groups) continue;
				for (const key in syntaxUsages) if (match.groups[key]) syntaxUsages[key]++;
			}
		}
		if (detect.trailingComma) {
			if (line.startsWith("}") || line.startsWith("]")) {
				if (previousLineTrailing) multiLineTrailingCommaUsages++;
				else multiLineTrailingCommaUsages--;
			}
			previousLineTrailing = trimmitedLine.endsWith(",");
		}
	}
	const format = {
		wrapColumn: maxLineLength,
		useTabs: tabUsages > 0,
		tabWidth: codeIndent,
		quote: syntaxUsages.singleQuote > syntaxUsages.doubleQuote ? "single" : "double",
		arrowParensAlways: syntaxUsages.singleParam > 0,
		trailingComma: multiLineTrailingCommaUsages > 0 || syntaxUsages.trailingComma > 0,
		useSemi: semiUsages > 0
	};
	for (const key of Object.keys(userStyles)) if (userStyles[key] !== void 0) format[key] = userStyles[key];
	return format;
}
//#endregion
//#region src/error.ts
var MagicastError = class extends Error {
	rawMessage;
	options;
	constructor(message, options) {
		super("");
		this.name = "MagicastError";
		this.rawMessage = message;
		this.options = options;
		if (options?.ast && options?.code && options.ast.loc) {
			const { line, column } = options.ast.loc.start;
			const lines = options.code.split("\n");
			const start = Math.max(0, line - 3);
			const end = Math.min(lines.length, line + 3);
			const codeFrame = lines.slice(start, end).map((lineCode, i) => {
				lineCode = `${(start + i + 1).toString().padStart(3, " ")} | ${lineCode}`;
				if (start + i === line - 1) lineCode += `\n${" ".repeat(6 + column)}^`;
				return lineCode;
			});
			message += `\n\n${codeFrame.join("\n")}\n`;
		}
		this.message = message;
	}
};
//#endregion
//#region src/proxy/_utils.ts
const LITERALS_AST = /* @__PURE__ */ new Set([
	"Literal",
	"StringLiteral",
	"NumericLiteral",
	"BooleanLiteral",
	"NullLiteral",
	"BigIntLiteral"
]);
const LITERALS_TYPEOF = /* @__PURE__ */ new Set([
	"string",
	"number",
	"boolean",
	"bigint",
	"symbol",
	"undefined"
]);
const b$5 = builders$1;
function isValidPropName(name) {
	return /^[$A-Z_][\w$]*$/i.test(name);
}
const PROXY_KEY = "__magicast_proxy";
function literalToAst(value, seen = /* @__PURE__ */ new Set()) {
	if (value === void 0) return b$5.identifier("undefined");
	if (value === null) return b$5.literal(null);
	if (LITERALS_TYPEOF.has(typeof value)) return b$5.literal(value);
	if (seen.has(value)) throw new MagicastError("Can not serialize circular reference");
	seen.add(value);
	if (value[PROXY_KEY]) return value.$ast;
	if (value instanceof RegExp) {
		const regex = b$5.regExpLiteral(value.source, value.flags);
		delete regex.extra.raw;
		return regex;
	}
	if (value instanceof Set) return b$5.newExpression(b$5.identifier("Set"), [b$5.arrayExpression([...value].map((n) => literalToAst(n, seen)))]);
	if (value instanceof Date) return b$5.newExpression(b$5.identifier("Date"), [b$5.literal(value.toISOString())]);
	if (value instanceof Map) return b$5.newExpression(b$5.identifier("Map"), [b$5.arrayExpression([...value].map(([key, value]) => {
		return b$5.arrayExpression([literalToAst(key, seen), literalToAst(value, seen)]);
	}))]);
	if (Array.isArray(value)) return b$5.arrayExpression(value.map((n) => literalToAst(n, seen)));
	if (typeof value === "object") return b$5.objectExpression(Object.entries(value).map(([key, value]) => {
		return b$5.property("init", /^[$A-Z_][\w$]*$/i.test(key) ? b$5.identifier(key) : b$5.literal(key), literalToAst(value, seen));
	}));
	return b$5.literal(value);
}
function makeProxyUtils(node, extend = {}) {
	const obj = extend;
	obj[PROXY_KEY] = true;
	obj.$ast = node;
	obj.$type ||= "object";
	return obj;
}
const propertyDescriptor = {
	enumerable: true,
	configurable: true
};
function createProxy(node, extend, handler) {
	const utils = makeProxyUtils(node, extend);
	return new Proxy({}, {
		ownKeys() {
			return Object.keys(utils).filter((i) => i !== PROXY_KEY && !i.startsWith("$"));
		},
		getOwnPropertyDescriptor() {
			return propertyDescriptor;
		},
		has(_target, key) {
			if (key in utils) return true;
			return false;
		},
		...handler,
		get(target, key, receiver) {
			if (key in utils) return utils[key];
			if (handler.get) return handler.get(target, key, receiver);
		},
		set(target, key, value, receiver) {
			if (key in utils) {
				utils[key] = value;
				return true;
			}
			if (handler.set) return handler.set(target, key, value, receiver);
			return false;
		}
	});
}
//#endregion
//#region src/proxy/array.ts
function proxifyArrayElements(node, elements, mod) {
	const utils = makeProxyUtils(node, {
		$type: "array",
		push(...values) {
			return elements.push(...values.map((v) => literalToAst(v)));
		},
		pop() {
			return proxify(elements.pop(), mod);
		},
		unshift(...values) {
			return elements.unshift(...values.map((v) => literalToAst(v)));
		},
		shift() {
			return proxify(elements.shift(), mod);
		},
		splice(start, ...rest) {
			return (rest.length === 0 ? elements.splice(start) : elements.splice(start, rest[0], ...rest.slice(1).map((n) => literalToAst(n)))).map((n) => proxify(n, mod));
		},
		toJSON() {
			return elements.map((n) => proxify(n, mod));
		}
	});
	return new Proxy([], {
		get(target, key, receiver) {
			if (key in utils) return utils[key];
			const self = receiver;
			if (key === "map") return (callback) => {
				const results = [];
				let index = 0;
				for (const item of self) {
					results.push(callback(item, index, self));
					index++;
				}
				return results;
			};
			if (key === "filter") return (callback) => {
				const results = [];
				let index = 0;
				for (const item of self) {
					if (callback(item, index, self)) results.push(item);
					index++;
				}
				return results;
			};
			if (key === "forEach") return (callback) => {
				let index = 0;
				for (const item of self) {
					callback(item, index, self);
					index++;
				}
			};
			if (key === "reduce") return (callback, ...initialValue) => {
				const array = [...self];
				if (array.length === 0 && initialValue.length === 0) throw new TypeError("Reduce of empty array with no initial value");
				let accumulator;
				let startIndex = 0;
				if (initialValue.length > 0) accumulator = initialValue[0];
				else {
					accumulator = array[0];
					startIndex = 1;
				}
				for (let i = startIndex; i < array.length; i++) accumulator = callback(accumulator, array[i], i, array);
				return accumulator;
			};
			if (key === "find") return (callback) => {
				let index = 0;
				for (const item of self) {
					if (callback(item, index, self)) return item;
					index++;
				}
			};
			if (key === "findIndex") return (callback) => {
				let index = 0;
				for (const item of self) {
					if (callback(item, index, self)) return index;
					index++;
				}
				return -1;
			};
			if (key === "includes") return (searchElement, fromIndex) => {
				return [...self].includes(searchElement, fromIndex);
			};
			if (key === "length") return elements.length;
			if (key === Symbol.iterator) return function* () {
				for (const item of elements) yield proxify(item, mod);
			};
			if (typeof key === "symbol") return Reflect.get(target, key, receiver);
			const index = +key;
			if (!Number.isNaN(index)) {
				const prop = elements[index];
				if (prop) return proxify(prop, mod);
			}
			return Reflect.get(target, key, receiver);
		},
		set(target, key, value, receiver) {
			if (typeof key === "symbol") return Reflect.set(target, key, value, receiver);
			const index = +key;
			if (!Number.isNaN(index)) {
				elements[index] = literalToAst(value);
				return true;
			}
			return Reflect.set(target, key, value, receiver);
		},
		deleteProperty(target, key) {
			if (typeof key === "symbol") return Reflect.deleteProperty(target, key);
			const index = +key;
			if (!Number.isNaN(index)) {
				elements[index] = literalToAst(void 0);
				return true;
			}
			return Reflect.deleteProperty(target, key);
		},
		ownKeys() {
			return ["length", ...elements.map((_, i) => i.toString())];
		},
		getOwnPropertyDescriptor(target, key) {
			if (key in utils) return {
				configurable: true,
				enumerable: true,
				value: utils[key]
			};
			if (key === "length") return {
				value: elements.length,
				writable: true,
				enumerable: false,
				configurable: false
			};
			if (typeof key === "symbol") return Reflect.getOwnPropertyDescriptor(target, key);
			const index = +key;
			if (!Number.isNaN(index) && index < elements.length) return {
				value: proxify(elements[index], mod),
				writable: true,
				enumerable: true,
				configurable: true
			};
			return Reflect.getOwnPropertyDescriptor(target, key);
		}
	});
}
function proxifyArray(node, mod) {
	if (!("elements" in node)) return;
	return proxifyArrayElements(node, node.elements, mod);
}
//#endregion
//#region src/proxy/arrow-function-expression.ts
function proxifyArrowFunctionExpression(node, mod) {
	if (node.type !== "ArrowFunctionExpression") throw new MagicastError("Not an arrow function expression");
	const utils = makeProxyUtils(node, {
		$type: "arrow-function-expression",
		$params: proxifyArrayElements(node, node.params, mod),
		$body: proxify(node.body, mod)
	});
	return new Proxy(() => {}, {
		get(target, key, receiver) {
			if (key in utils) return utils[key];
			return Reflect.get(target, key, receiver);
		},
		apply() {
			throw new MagicastError("Calling proxified functions is not supported. Use `generateCode` to get the code string.");
		}
	});
}
//#endregion
//#region src/proxy/await-expression.ts
function proxifyAwaitExpression(node, mod) {
	if (node.type !== "AwaitExpression") throw new MagicastError("Not an await expression");
	return createProxy(node, {
		$type: "await-expression",
		$argument: proxify(node.argument, mod)
	}, {});
}
//#endregion
//#region src/proxy/binary-expression.ts
function proxifyBinaryExpression(node, mod) {
	return createProxy(node, {
		$type: "binary-expression",
		$left: proxify(node.left, mod),
		$right: proxify(node.right, mod),
		$operator: node.operator
	}, {});
}
//#endregion
//#region src/proxy/block-statement.ts
function proxifyBlockStatement(node, mod) {
	return createProxy(node, {
		$type: "block-statement",
		$body: proxifyArrayElements(node, node.body, mod)
	}, {});
}
//#endregion
//#region src/proxy/function-call.ts
function proxifyFunctionCall(node, mod) {
	if (node.type !== "CallExpression") throw new MagicastError("Not a function call");
	function stringifyExpression(node) {
		if (node.type === "Identifier") return node.name;
		if (node.type === "Import") return "import";
		if (node.type === "MemberExpression") return `${stringifyExpression(node.object)}.${stringifyExpression(node.property)}`;
		throw new MagicastError("Not implemented");
	}
	const argumentsProxy = proxifyArrayElements(node, node.arguments, mod);
	return createProxy(node, {
		$type: "function-call",
		$callee: stringifyExpression(node.callee),
		$args: argumentsProxy
	}, {});
}
//#endregion
//#region src/proxy/function-expression.ts
function proxifyFunctionExpression(node, mod) {
	const utils = makeProxyUtils(node, {
		$type: "function-expression",
		$params: proxifyArrayElements(node, node.params, mod),
		$body: proxify(node.body, mod)
	});
	return new Proxy(() => {}, {
		get(target, key, receiver) {
			if (key in utils) return utils[key];
			return Reflect.get(target, key, receiver);
		},
		apply() {
			throw new MagicastError("Calling proxified functions is not supported. Use `generateCode` to get the code string.");
		}
	});
}
//#endregion
//#region src/proxy/identifier.ts
function proxifyIdentifier(node) {
	if (node.type !== "Identifier") throw new MagicastError("Not an identifier");
	return createProxy(node, {
		$type: "identifier",
		$name: node.name
	}, {});
}
//#endregion
//#region src/proxy/logical-expression.ts
function proxifyLogicalExpression(node) {
	if (node.type !== "LogicalExpression") throw new MagicastError("Not a logical expression");
	return createProxy(node, { $type: "logicalExpression" }, {});
}
//#endregion
//#region src/proxy/member-expression.ts
function proxifyMemberExpression(node, mod) {
	if (node.type !== "MemberExpression") throw new MagicastError("Not a member expression");
	return createProxy(node, {
		$type: "member-expression",
		$object: proxify(node.object, mod),
		$property: proxify(node.property, mod)
	}, {});
}
//#endregion
//#region src/proxy/new-expression.ts
function proxifyNewExpression(node, mod) {
	if (node.type !== "NewExpression") throw new MagicastError("Not a new expression");
	function stringifyExpression(node) {
		if (node.type === "Identifier") return node.name;
		if (node.type === "MemberExpression") return `${stringifyExpression(node.object)}.${stringifyExpression(node.property)}`;
		throw new MagicastError("Not implemented");
	}
	const argumentsProxy = proxifyArrayElements(node, node.arguments, mod);
	return createProxy(node, {
		$type: "new-expression",
		$callee: stringifyExpression(node.callee),
		$args: argumentsProxy
	}, {});
}
//#endregion
//#region src/proxy/object.ts
const b$4 = builders$1;
function proxifyObject(node, mod) {
	if (!("properties" in node)) return;
	const getPropName = (prop, throwError = false) => {
		const propType = prop.type;
		if (propType === "Property" || propType === "ObjectProperty" || propType === "ObjectMethod") {
			const propKey = prop.key;
			if (propKey.type === "Identifier") return propKey.name;
			if (propKey.type === "StringLiteral" || propKey.type === "NumericLiteral" || propKey.type === "BooleanLiteral") return propKey.value.toString();
		}
		if (throwError) throw new MagicastError(`Casting "${prop.type}" is not supported`, {
			ast: prop,
			code: mod?.$code
		});
	};
	const getProp = (key) => {
		const stringKey = String(key);
		for (const prop of node.properties) if (getPropName(prop) === stringKey) {
			const propType = prop.type;
			if (propType === "Property" || propType === "ObjectProperty") return prop.value;
			if (prop.type === "ObjectMethod") {
				const funcExpr = b$4.functionExpression(null, prop.params, prop.body, prop.generator, prop.async);
				funcExpr.async = prop.async;
				funcExpr.loc = prop.loc;
				return funcExpr;
			}
		}
	};
	const replaceOrAddProp = (key, value) => {
		const prop = node.properties.find((p) => getPropName(p) === key);
		if (prop) {
			const propType = prop.type;
			if (propType === "Property" || propType === "ObjectProperty") prop.value = value;
			else if (prop.type === "ObjectMethod") {
				const newProp = b$4.property("init", b$4.identifier(key), value);
				const index = node.properties.indexOf(prop);
				if (index !== -1) node.properties[index] = newProp;
			}
		} else {
			const newProp = b$4.property("init", isValidPropName(key) ? b$4.identifier(key) : b$4.stringLiteral(key), value);
			const innerComments = node.innerComments;
			if (innerComments?.length) {
				newProp.comments = innerComments.map((comment) => ({
					...comment,
					leading: true,
					trailing: false
				}));
				node.innerComments = [];
			}
			node.properties.push(newProp);
		}
	};
	return createProxy(node, {
		$type: "object",
		toJSON() {
			return node.properties.reduce((acc, prop) => {
				const propName = getPropName(prop);
				if (propName) {
					const propType = prop.type;
					if (propType === "Property" || propType === "ObjectProperty") acc[propName] = proxify(prop.value, mod);
					else if (prop.type === "ObjectMethod") {
						const funcExpr = b$4.functionExpression(null, prop.params, prop.body, prop.generator, prop.async);
						funcExpr.async = prop.async;
						funcExpr.loc = prop.loc;
						acc[propName] = proxify(funcExpr, mod);
					}
				}
				return acc;
			}, {});
		}
	}, {
		get(_, key) {
			const prop = getProp(key);
			if (prop) return proxify(prop, mod);
		},
		set(_, key, value) {
			if (typeof key !== "string") key = String(key);
			replaceOrAddProp(key, literalToAst(value));
			return true;
		},
		deleteProperty(_, key) {
			if (typeof key !== "string") key = String(key);
			const index = node.properties.findIndex((p) => getPropName(p) === key);
			if (index !== -1) node.properties.splice(index, 1);
			return true;
		},
		ownKeys() {
			return node.properties.map((p) => getPropName(p)).filter(Boolean);
		},
		getOwnPropertyDescriptor(target, key) {
			if (typeof key === "string" && Array.from(this.ownKeys(target)).includes(key)) return {
				enumerable: true,
				configurable: true
			};
		},
		has(_, key) {
			if (typeof key === "string") return Array.from(this.ownKeys(_)).includes(key);
			return false;
		}
	});
}
//#endregion
//#region src/proxy/proxify.ts
const _cache = /* @__PURE__ */ new WeakMap();
function proxify(node, mod) {
	if (LITERALS_TYPEOF.has(typeof node)) return node;
	if (node.type === "Identifier" && node.name === "undefined") return;
	if (node.type === "RegExpLiteral") {
		const { pattern, flags } = node;
		return new RegExp(pattern, flags);
	}
	if (LITERALS_AST.has(node.type)) return node.value;
	if (_cache.has(node)) return _cache.get(node);
	let proxy;
	switch (node.type) {
		case "ObjectExpression":
			proxy = proxifyObject(node, mod);
			break;
		case "ArrayExpression":
			proxy = proxifyArray(node, mod);
			break;
		case "CallExpression":
			proxy = proxifyFunctionCall(node, mod);
			break;
		case "ArrowFunctionExpression":
			proxy = proxifyArrowFunctionExpression(node, mod);
			break;
		case "FunctionExpression":
			proxy = proxifyFunctionExpression(node, mod);
			break;
		case "NewExpression":
			proxy = proxifyNewExpression(node, mod);
			break;
		case "Identifier":
			proxy = proxifyIdentifier(node);
			break;
		case "LogicalExpression":
			proxy = proxifyLogicalExpression(node);
			break;
		case "MemberExpression":
			proxy = proxifyMemberExpression(node);
			break;
		case "BinaryExpression":
			proxy = proxifyBinaryExpression(node, mod);
			break;
		case "AwaitExpression":
			proxy = proxifyAwaitExpression(node, mod);
			break;
		case "BlockStatement":
			proxy = proxifyBlockStatement(node, mod);
			break;
		case "TSAsExpression":
		case "TSSatisfiesExpression":
			proxy = proxify(node.expression, mod);
			break;
		default: throw new MagicastError(`Casting "${node.type}" is not supported`, {
			ast: node,
			code: mod?.$code
		});
	}
	_cache.set(node, proxy);
	return proxy;
}
//#endregion
//#region src/proxy/exports.ts
const b$3 = builders$1;
function createExportsProxy(root, mod) {
	const findExport = (key) => {
		const type = key === "default" ? "ExportDefaultDeclaration" : "ExportNamedDeclaration";
		for (const n of root.body) if (n.type === type) {
			if (key === "default") return n.declaration;
			if (n.declaration) {
				if (n.declaration.type === "VariableDeclaration") {
					const dec = n.declaration.declarations[0];
					if ("name" in dec.id && dec.id.name === key) return dec.init;
				}
				if (n.declaration.type === "FunctionDeclaration" && n.declaration.id && n.declaration.id.name === key) {
					const decl = n.declaration;
					const funcExpr = b$3.functionExpression(decl.id, decl.params, decl.body, decl.generator, decl.async);
					funcExpr.async = decl.async;
					funcExpr.loc = decl.loc;
					return funcExpr;
				}
			}
		}
	};
	const updateOrAddExport = (key, value) => {
		const type = key === "default" ? "ExportDefaultDeclaration" : "ExportNamedDeclaration";
		const node = literalToAst(value);
		for (const n of root.body) if (n.type === type) {
			if (key === "default") {
				n.declaration = node;
				return;
			}
			if (n.declaration) {
				if (n.declaration.type === "VariableDeclaration") {
					const dec = n.declaration.declarations[0];
					if ("name" in dec.id && dec.id.name === key) {
						dec.init = node;
						return;
					}
				}
				if (n.declaration.type === "FunctionDeclaration" && n.declaration.id && n.declaration.id.name === key) {
					const newExport = b$3.exportNamedDeclaration(b$3.variableDeclaration("const", [b$3.variableDeclarator(b$3.identifier(key), node)]));
					const index = root.body.indexOf(n);
					if (index !== -1) root.body[index] = newExport;
					return;
				}
			}
		}
		root.body.push(key === "default" ? b$3.exportDefaultDeclaration(node) : b$3.exportNamedDeclaration(b$3.variableDeclaration("const", [b$3.variableDeclarator(b$3.identifier(key), node)])));
	};
	return createProxy(root, { $type: "exports" }, {
		get(_, prop) {
			const node = findExport(prop);
			if (node) return proxify(node, mod);
		},
		set(_, prop, value) {
			updateOrAddExport(prop, value);
			return true;
		},
		ownKeys() {
			return root.body.flatMap((i) => {
				if (i.type === "ExportDefaultDeclaration") return ["default"];
				if (i.type === "ExportNamedDeclaration" && i.declaration) {
					if (i.declaration.type === "VariableDeclaration") return i.declaration.declarations.map((d) => "name" in d.id ? d.id.name : "");
					if (i.declaration.type === "FunctionDeclaration") return i.declaration.id ? [i.declaration.id.name] : [];
				}
				return [];
			}).filter(Boolean);
		},
		deleteProperty(_, prop) {
			const type = prop === "default" ? "ExportDefaultDeclaration" : "ExportNamedDeclaration";
			for (let i = 0; i < root.body.length; i++) {
				const n = root.body[i];
				if (n.type === type) {
					if (prop === "default") {
						root.body.splice(i, 1);
						return true;
					}
					if (n.declaration) {
						if (n.declaration.type === "VariableDeclaration") {
							const dec = n.declaration.declarations[0];
							if ("name" in dec.id && dec.id.name === prop) {
								root.body.splice(i, 1);
								return true;
							}
						}
						if (n.declaration.type === "FunctionDeclaration" && n.declaration.id && n.declaration.id.name === prop) {
							root.body.splice(i, 1);
							return true;
						}
					}
				}
			}
			return false;
		}
	});
}
//#endregion
//#region src/proxy/imports.ts
const b$2 = builders$1;
const _importProxyCache = /* @__PURE__ */ new WeakMap();
function createImportProxy(node, specifier, root) {
	if (_importProxyCache.has(specifier)) return _importProxyCache.get(specifier);
	const proxy = createProxy(specifier, {
		get $declaration() {
			return node;
		},
		get imported() {
			if (specifier.type === "ImportDefaultSpecifier") return "default";
			if (specifier.type === "ImportNamespaceSpecifier") return "*";
			if (specifier.imported.type === "Identifier") return specifier.imported.name;
			return specifier.imported.value;
		},
		set imported(value) {
			if (specifier.type !== "ImportSpecifier") throw new MagicastError("Changing import name is not yet implemented");
			if (specifier.imported.type === "Identifier") specifier.imported.name = value;
			else specifier.imported.value = value;
		},
		get local() {
			return specifier.local.name;
		},
		set local(value) {
			specifier.local.name = value;
		},
		get from() {
			return node.source.value;
		},
		set from(value) {
			if (value === node.source.value) return;
			node.specifiers = node.specifiers.filter((s) => s !== specifier);
			if (node.specifiers.length === 0) root.body = root.body.filter((s) => s !== node);
			const declaration = root.body.find((i) => i.type === "ImportDeclaration" && i.source.value === value);
			if (declaration) {
				declaration.specifiers.push(specifier);
				node = declaration;
			} else {
				const newDeclaration = b$2.importDeclaration([specifier], b$2.stringLiteral(value));
				root.body.unshift(newDeclaration);
				node = newDeclaration;
			}
		},
		toJSON() {
			return {
				imported: this.imported,
				local: this.local,
				from: this.from
			};
		}
	}, { ownKeys() {
		return [
			"imported",
			"local",
			"from",
			"toJSON"
		];
	} });
	_importProxyCache.set(specifier, proxy);
	return proxy;
}
function createImportsProxy(root, _mod) {
	const getAllImports = () => {
		const imports = [];
		for (const n of root.body) if (n.type === "ImportDeclaration") for (const specifier of n.specifiers) imports.push(createImportProxy(n, specifier, root));
		return imports;
	};
	const updateImport = (key, value, order) => {
		const imports = getAllImports();
		const item = imports.find((i) => i.local === key);
		const local = value.local || key;
		if (item) {
			item.imported = value.imported;
			item.local = local;
			item.from = value.from;
			return true;
		}
		const specifier = value.imported === "default" ? b$2.importDefaultSpecifier(b$2.identifier(local)) : value.imported === "*" ? b$2.importNamespaceSpecifier(b$2.identifier(local)) : b$2.importSpecifier(b$2.identifier(value.imported), b$2.identifier(local));
		const declaration = imports.find((i) => i.from === value.from)?.$declaration;
		if (declaration) declaration.specifiers.push(specifier);
		else if (order === "prepend" || imports.length === 0) root.body.unshift(b$2.importDeclaration([specifier], b$2.stringLiteral(value.from)));
		else {
			const lastImport = imports.at(-1).$declaration;
			const lastImportIndex = root.body.indexOf(lastImport);
			root.body.splice(lastImportIndex + 1, 0, b$2.importDeclaration([specifier], b$2.stringLiteral(value.from)));
		}
		return true;
	};
	const removeImport = (key) => {
		const item = getAllImports().find((i) => i.local === key);
		if (!item) return false;
		const node = item.$declaration;
		const specifier = item.$ast;
		node.specifiers = node.specifiers.filter((s) => s !== specifier);
		if (node.specifiers.length === 0) root.body = root.body.filter((n) => n !== node);
		return true;
	};
	return createProxy(root, {
		$type: "imports",
		$add(item) {
			updateImport(item.local || item.imported, item, "prepend");
		},
		$prepend(item) {
			updateImport(item.local || item.imported, item, "prepend");
		},
		$append(item) {
			updateImport(item.local || item.imported, item, "append");
		},
		get $items() {
			return getAllImports();
		},
		toJSON() {
			return getAllImports().reduce((acc, i) => {
				acc[i.local] = i;
				return acc;
			}, {});
		}
	}, {
		get(_, prop) {
			return getAllImports().find((i) => i.local === prop);
		},
		set(_, prop, value) {
			return updateImport(prop, value, "prepend");
		},
		deleteProperty(_, prop) {
			return removeImport(prop);
		},
		ownKeys() {
			return getAllImports().map((i) => i.local);
		},
		has(_, prop) {
			return getAllImports().some((i) => i.local === prop);
		}
	});
}
//#endregion
//#region src/proxy/module.ts
function proxifyModule(ast, code) {
	const root = ast.program;
	if (root.type !== "Program") throw new MagicastError(`Cannot proxify ${ast.type} as module`);
	const util = {
		$code: code,
		$type: "module"
	};
	const mod = createProxy(root, util, { ownKeys() {
		return [
			"imports",
			"exports",
			"generate"
		];
	} });
	util.exports = createExportsProxy(root, mod);
	util.imports = createImportsProxy(root, mod);
	util.generate = (options) => generateCode(mod, options);
	return mod;
}
//#endregion
//#region src/code.ts
const b$1 = builders$1;
function parseModule(code, options) {
	return proxifyModule(parse(code, {
		parser: options?.parser || getBabelParser(),
		...options
	}), code);
}
function parseExpression(code, options) {
	const isStandaloneComment = /^(?:\/\*[\s\S]*?\*\/|\/\/[^\n\r\u2028\u2029]*)$/.test(code.trim());
	const root = parse(isStandaloneComment ? `${code}\nnull` : `(${code})`, {
		parser: options?.parser || getBabelParser(),
		...options
	});
	let body = root.program.body[0];
	if (body.type === "ExpressionStatement") {
		const expr = body.expression;
		if (isStandaloneComment && body.comments?.length) {
			expr.comments = body.comments;
			delete body.comments;
		}
		body = expr;
	}
	if (body.extra?.parenthesized) body.extra.parenthesized = false;
	if (isStandaloneComment) return makeProxyUtils(body, { $type: "comment" });
	const mod = {
		$ast: root,
		$code: ` ${code} `,
		$type: "module"
	};
	return proxify(body, mod);
}
function generateCode(node, options = {}) {
	let ast = node.$ast || node;
	if (ast.type === "FunctionExpression") ast = b$1.expressionStatement(ast);
	const formatOptions = options.format === false || !("$code" in node) ? {} : detectCodeFormat(node.$code, options.format);
	const { code, map } = print(ast, {
		...options,
		...formatOptions
	});
	return {
		code,
		map
	};
}
//#endregion
//#region src/builders.ts
const b = builders$1;
const builders = {
	/**
	* Create a function call node.
	*/
	functionCall(callee, ...args) {
		return proxifyFunctionCall(b.callExpression(b.identifier(callee), args.map((i) => literalToAst(i))));
	},
	/**
	* Create a new expression node.
	*/
	newExpression(callee, ...args) {
		return proxifyNewExpression(b.newExpression(b.identifier(callee), args.map((i) => literalToAst(i))));
	},
	/**
	* Create a binary expression node.
	*/
	binaryExpression(left, operator, right) {
		return proxifyBinaryExpression(b.binaryExpression(operator, literalToAst(left), literalToAst(right)));
	},
	/**
	* Create an await expression node.
	*/
	awaitExpression(argument) {
		const argAst = argument?.$ast || literalToAst(argument);
		return proxifyAwaitExpression(b.awaitExpression(argAst));
	},
	/**
	* Create a proxified version of a literal value.
	*/
	literal(value) {
		return literalToAst(value);
	},
	/**
	* Parse a raw expression and return a proxified version of it.
	*
	* ```ts
	* const obj = builders.raw("{ foo: 1 }");
	* console.log(obj.foo); // 1
	* ```
	*/
	raw(code) {
		return parseExpression(code);
	}
};
//#endregion
export { MagicastError as a, parseModule as i, generateCode as n, detectCodeFormat as o, parseExpression as r, builders as t };
