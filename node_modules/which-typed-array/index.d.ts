/**
 * Determines the type of the given collection, or returns false.
 *
 * @param {unknown} value The potential collection
 * @returns {TypedArrayName | false | null} 'Int8Array' | 'Uint8Array' | 'Uint8ClampedArray' | 'Int16Array' | 'Uint16Array' | 'Int32Array' | 'Uint32Array' | 'Float32Array' | 'Float64Array' | 'BigInt64Array' | 'BigUint64Array' | false | null
 */
declare function whichTypedArray<T>(
	value: T & whichTypedArray.TypedArray,
): whichTypedArray.WhichTypedArray<T>;
declare function whichTypedArray<T>(
	value: unknown,
): false | null | whichTypedArray.TypedArrayName;

import TAs from 'available-typed-arrays';

/** the names the consumer's `lib` declares a global for, so there is a type to compare against */
type DeclaredName = whichTypedArray.TypedArrayName & keyof typeof globalThis;

/** the names it does not (eg, `Float16Array` under `lib: es2020`), which are still possible at runtime */
type UndeclaredName = Exclude<whichTypedArray.TypedArrayName, keyof typeof globalThis>;

type Instance<Name extends DeclaredName> = typeof globalThis[Name]['prototype'];

type IsAny<T> = 0 extends (1 & T) ? true : false;

type RequiredKeys<T> = {
	[K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T];

/** the key types of `T`'s index signatures, found by `{}` having them covered already */
type IndexKeys<T> = {
	[K in keyof T]-?: {} extends Record<K, never> ? K : never
}[keyof T];

/**
 * The keys of `T` that can be read off a value by name. An index signature is not a
 * named member, but a `string`-keyed one cannot be told apart here from the named
 * string members beside it, so it is left in and they are taken at face value.
 */
type NamedKeys<T> = Exclude<keyof T, Exclude<IndexKeys<T>, string>>;

/** `Object`'s members are on every object type, even though `keyof` does not list them */
type Apparent<T, K> = K extends keyof T
	? T[K]
	: K extends keyof Object
		? Object[K]
		: unknown;

/**
 * The typed arrays' symbol-keyed member whose value is a string, which is
 * `Symbol.toStringTag` in a `lib` that declares symbols and `never` in one that
 * does not (`lib: es5`). Deriving it this way leaves the tag comparisons below
 * with no information to go on, rather than naming `Symbol` in a `lib` without it.
 */
type TagKey = {
	[K in keyof whichTypedArray.TypedArray & symbol]: whichTypedArray.TypedArray[K] extends string ? K : never
}[keyof whichTypedArray.TypedArray & symbol];

/** `unknown` when `T` says nothing about its own tag, which rules no name out */
type TagOf<T> = [TagKey] extends [never]
	? unknown
	: TagKey extends keyof T
		? T[TagKey & keyof T]
		: unknown;

/** one value can carry both tags when either is assignable to the other */
type TagsMeet<A, B> = IsAny<A> extends true
	? true
	: IsAny<B> extends true
		? true
		: [Extract<A, B>] extends [never]
			? ([Extract<B, A>] extends [never] ? false : true)
			: true;

/** how many levels of members `Related` walks before it stops looking for a conflict */
type Prev = [
	never,
	0,
	1,
	2,
	3,
];

type Depth = 0 | 1 | 2 | 3 | 4;

/**
 * A rough stand-in for the comparability check TypeScript itself runs to decide
 * whether `x === someTypedArray` is worth allowing. One value can be a `Source` and
 * a `Target` at once if the two already share a constituent, or if neither is an
 * object type and one is assignable to the other; failing that, `D` more levels of
 * members and signatures are compared, in this direction only - `Meets` runs both.
 *
 * It is a heuristic, not that check, and it leans towards saying the two can meet.
 * A conflict further down than `D` levels is not looked for, so a name can be left
 * in that no value could produce. It also drops names TypeScript would have allowed:
 * a `Source` that carries a call signature, or a member declared with its own type
 * parameters, meets nothing, and only the last signature of an overloaded member is
 * compared.
 *
 * `Stale` marks a comparison standing in for a name this `lib` has no type for, where
 * a member the `lib` has never heard of is weaker evidence (see `GatedOn`).
 */
type Related<Source, Target, D extends Depth, Stale extends boolean> = IsAny<Source> extends true
	? true
	: IsAny<Target> extends true
		? true
		: [Extract<Source, Target>] extends [never]
			? (Widens<Source, Target> extends true ? true : Deeply<Source, Target, D, Stale>)
			: true;

/** neither side being an object type, one value fits both when either is assignable to the other */
type Widens<Source, Target> = [Source] extends [object]
	? false
	: [Target] extends [object]
		? false
		: ([Extract<Target, Source>] extends [never] ? false : true);

/** a union on either side only needs one part that can meet one part of the other */
type Deeply<Source, Target, D extends Depth, Stale extends boolean> = [D] extends [0]
	? true
	: true extends (Source extends unknown
		? (Target extends unknown ? Structurally<Source, Target, D, Stale> : never)
		: never)
		? true
		: false;

type Structurally<Source, Target, D extends Depth, Stale extends boolean> = [Source] extends [(...args: infer SP) => infer SR]
	? ([Target] extends [(...args: infer TP) => infer TR]
		? (Related<SR, TR, Prev[D], Stale> extends true ? ParamsRelated<SP, TP, Prev[D], Stale> : false)
		: false)
	: [Target] extends [Function]
		? false
		: [Source] extends [object]
			? ([Target] extends [object] ? Membered<Source, Target, D, Stale> : false)
			: false;

/** each pair of parameters only has to meet, in either direction, as with an overridden method */
type ParamsRelated<SP extends readonly unknown[], TP extends readonly unknown[], D extends Depth, Stale extends boolean> = false extends {
	[K in keyof SP]: K extends keyof TP ? Related<SP[K], TP[K & keyof TP], D, Stale> : true
}[number]
	? false
	: true;

type Membered<Source, Target, D extends Depth, Stale extends boolean> = GatedOn<Source, Target, D, Stale> extends true
	? (TagsMeet<TagOf<Source>, TagOf<Target>> extends true ? EachMember<Source, Target, D, Stale> : false)
	: false;

/**
 * Whether a member `Target` requires but `Source` lacks counts against the two
 * meeting. At the top of a comparison it does. Below that, in a comparison standing
 * in for a name this `lib` has no type for, one side is the `lib`'s own type for a
 * typed array or one of its members, and a member missing from that is as easily an
 * older `lib`'s gap as a real conflict, so it is not counted - which is how such a
 * name survives an input written in terms of a newer member, as
 * `{ buffer: { byteLength: number } & { resizable: boolean } }` is.
 */
type GatedOn<Source, Target, D extends Depth, Stale extends boolean> = [Stale, D] extends [true, 0 | 1 | 2 | 3]
	? true
	: Compatible<Source, Target, Stale>;

/** the members of `Target` that `Source`, or `Object` behind it, also has */
type SharedKeys<Source, Target> = keyof Target & (keyof Source | keyof Object);

type EachMember<Source, Target, D extends Depth, Stale extends boolean> = false extends {
	[K in SharedKeys<Source, Target>]: Related<Apparent<Source, K>, Target[K], Prev[D], Stale>
}[SharedKeys<Source, Target>]
	? false
	: true;

/**
 * `Source` has something to offer for every member `Target` requires. `Target`'s
 * optional members are left out on purpose: one value can be a `Source` and a
 * `Target` at once while having none of them.
 */
type Compatible<Source, Target, Stale extends boolean> = [Exclude<RequiredKeys<Target>, NamedKeys<Source> | keyof Object>] extends [never]
	? IndexesCovered<Source, Target, Stale>
	: false;

/**
 * Each index signature `Target` has needs one on `Source` with the same keys, or a
 * value type of `any`, which anything satisfies. Numeric-string keys are the
 * exception: they reach a `number` index signature, so `Source` having one of those
 * covers them, as long as what it holds can be what `Target` asks for.
 */
type IndexesCovered<Source, Target, Stale extends boolean> = [{
	[K in IndexKeys<Target>]: IsAny<Target[K & keyof Target]> extends true
		? never
		: (K extends IndexKeys<Source>
			? never
			: (string extends K
				? K
				: (`${number}` extends K
					? (Related<Source[number & keyof Source], Target[K & keyof Target], 1, Stale> extends true ? never : K)
					: K)))
}[IndexKeys<Target>]] extends [never]
	? true
	: false;

/**
 * `T` is not assignable to a plain copy of its own members, which is what a
 * `private`, `protected` or `#private` member does to a class, and what a call or
 * construct signature does to any type - none of which a typed array has, so nothing
 * outside that class can be one.
 */
type IsNominal<T> = {
	[K in keyof T]: T[K]
} extends T
	? false
	: true;

/**
 * Whether a `T` and an `I` look like they could be one value. A nominal `T` only
 * gets the one direction: nothing outside its class can be a `T`, but a `T` whose
 * members are all there can still be a typed array.
 */
type Meets<T, I, Nominal, Stale extends boolean> = Related<T, I, 4, Stale> extends true
	? true
	: (Nominal extends true ? false : Related<I, T, 4, Stale>);

type MayBe<T, Name extends DeclaredName> = TagsMeet<TagOf<Instance<Name>>, TagOf<T>> extends true
	? Meets<T, Instance<Name>, IsNominal<T>, false>
	: false;

type PossibleNames<T> = {
	[Name in DeclaredName]: MayBe<T, Name> extends true ? Name : never
}[DeclaredName];

/** the members the typed arrays this `lib` declares actually have */
type KnownKey = keyof Object | {
	[Name in DeclaredName]: keyof Instance<Name>
}[DeclaredName];

type UnknownKeys<T> = Exclude<RequiredKeys<T>, KnownKey>;

type WithoutUnknown<T> = Pick<T, Exclude<keyof T, UnknownKeys<T>>>;

/** of those, the ones holding data rather than a method */
type UnknownDataKeys<T> = {
	[K in UnknownKeys<T>]: T[K & keyof T] extends Function ? never : K
}[UnknownKeys<T>];

type MeetsAny<T, Nominal> = true extends {
	[Name in DeclaredName]: Meets<T, Instance<Name>, Nominal, true>
}[DeclaredName]
	? true
	: false;

/**
 * An undeclared name has no type in this `lib`, so there is nothing to compare `T`
 * to: the declared typed arrays stand in for it, with the members `T` requires that
 * none of them has set aside, so that a `T` asking for a member only a newer `lib`
 * knows about - `at` under `lib: es2020` - can still be the name that `lib` lacks.
 *
 * Setting a member aside loses whatever it said, and a member the `lib` has not heard
 * of further down is not counted either (see `GatedOn`), so this is looser than the
 * test for a declared name. A member that is data rather than a method is kept as
 * evidence, on the guess that a newer `lib` mostly adds methods; that guess, and the
 * stand-in itself, are why an undeclared name is the one that survives most often -
 * `DataView`, whose own methods are all set aside, keeps one.
 */
type MayBeUndeclared<T> = IsAny<T> extends true
	? true
	: [unknown] extends [T]
		? true
		: [T] extends [Function]
			? false
			: [T] extends [object]
				? ([UnknownDataKeys<T>] extends [never] ? MeetsAny<WithoutUnknown<T>, IsNominal<T>> : false)
				: false;

/** a specific tag names the typed array outright; a `string` tag leaves it to the members */
type PossibleUndeclaredNames<T> = [UndeclaredName] extends [never]
	? never
	: string extends TagOf<T>
		? (MayBeUndeclared<T> extends true ? UndeclaredName : never)
		: Extract<UndeclaredName, TagOf<T>>;

declare namespace whichTypedArray {
	export type TypedArrayName = ReturnType<typeof TAs>[number];

	// a consumer's `lib` may not declare every name (eg, `Float16Array`), so only look up the globals it has
	export type TypedArrayConstructor = typeof globalThis[TypedArrayName & keyof typeof globalThis];

	export type TypedArray = TypedArrayConstructor['prototype'];

	/**
	 * Distributes over `T`, so a subset of typed arrays maps to the matching
	 * subset of names (`Int8Array | Uint8Array` -> `'Int8Array' | 'Uint8Array'`,
	 * never a float16 or bigint name), and a `T` that is not definitely a typed
	 * array also gets `false | null`.
	 *
	 * For everything else - `object`, `ArrayBufferView`, `{ length: 0 }`, a
	 * duck-typed stand-in - it keeps the names that `T`'s own members do not rule
	 * out, so comparing the result to one of those names is usually not reported as a
	 * comparison that can never be true. The rule behind that is a heuristic (see
	 * `Related`), so it can keep a name no value of `T` could produce, and a `T` whose
	 * conflict with a name is buried deeply enough will keep that name too. A name
	 * this `lib` has no type for (see `MayBeUndeclared`) is kept more readily still.
	 *
	 * Derived entirely from `TypedArrayName`, so a new entry in `available-typed-arrays` flows through with no other change here.
	 */
	export type WhichTypedArray<T> = T extends unknown
		?
			| PossibleNames<T>
			| PossibleUndeclaredNames<T>
			| ([T] extends [TypedArray]
				? (IsAny<T> extends true ? false | null : never)
				: false | null)
		: never;
}

export = whichTypedArray;
