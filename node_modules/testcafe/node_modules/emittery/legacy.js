'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const anyMap = new WeakMap();
const eventsMap = new WeakMap();
const resolvedPromise = Promise.resolve();

function assertEventName(eventName) {
	if (typeof eventName !== 'string') {
		throw new TypeError('eventName must be a string');
	}
}

function assertListener(listener) {
	if (typeof listener !== 'function') {
		throw new TypeError('listener must be a function');
	}
}

function getListeners(instance, eventName) {
	const events = eventsMap.get(instance);
	if (!events.has(eventName)) {
		events.set(eventName, new Set());
	}

	return events.get(eventName);
}

class Emittery {
	constructor() {
		anyMap.set(this, new Set());
		eventsMap.set(this, new Map());
	}

	on(eventName, listener) {
		assertEventName(eventName);
		assertListener(listener);
		getListeners(this, eventName).add(listener);
		return this.off.bind(this, eventName, listener);
	}

	off(eventName, listener) {
		assertEventName(eventName);
		assertListener(listener);
		getListeners(this, eventName).delete(listener);
	}

	once(eventName) {
		return new Promise(resolve => {
			assertEventName(eventName);
			const off = this.on(eventName, data => {
				off();
				resolve(data);
			});
		});
	}

	emit(eventName, eventData) {
		var _this = this;

		return _asyncToGenerator(function* () {
			assertEventName(eventName);

			const listeners = getListeners(_this, eventName);
			const anyListeners = anyMap.get(_this);
			const staticListeners = [...listeners];
			const staticAnyListeners = [...anyListeners];

			yield resolvedPromise;
			return Promise.all([...staticListeners.map((() => {
				var _ref = _asyncToGenerator(function* (listener) {
					if (listeners.has(listener)) {
						return listener(eventData);
					}
				});

				return function (_x) {
					return _ref.apply(this, arguments);
				};
			})()), ...staticAnyListeners.map((() => {
				var _ref2 = _asyncToGenerator(function* (listener) {
					if (anyListeners.has(listener)) {
						return listener(eventName, eventData);
					}
				});

				return function (_x2) {
					return _ref2.apply(this, arguments);
				};
			})())]);
		})();
	}

	emitSerial(eventName, eventData) {
		var _this2 = this;

		return _asyncToGenerator(function* () {
			assertEventName(eventName);

			const listeners = getListeners(_this2, eventName);
			const anyListeners = anyMap.get(_this2);
			const staticListeners = [...listeners];
			const staticAnyListeners = [...anyListeners];

			yield resolvedPromise;
			/* eslint-disable no-await-in-loop */
			for (const listener of staticListeners) {
				if (listeners.has(listener)) {
					yield listener(eventData);
				}
			}

			for (const listener of staticAnyListeners) {
				if (anyListeners.has(listener)) {
					yield listener(eventName, eventData);
				}
			}
			/* eslint-enable no-await-in-loop */
		})();
	}

	onAny(listener) {
		assertListener(listener);
		anyMap.get(this).add(listener);
		return this.offAny.bind(this, listener);
	}

	offAny(listener) {
		assertListener(listener);
		anyMap.get(this).delete(listener);
	}

	clearListeners(eventName) {
		if (typeof eventName === 'string') {
			getListeners(this, eventName).clear();
		} else {
			anyMap.get(this).clear();
			for (const listeners of eventsMap.get(this).values()) {
				listeners.clear();
			}
		}
	}

	listenerCount(eventName) {
		if (typeof eventName === 'string') {
			return anyMap.get(this).size + getListeners(this, eventName).size;
		}

		if (typeof eventName !== 'undefined') {
			assertEventName(eventName);
		}

		let count = anyMap.get(this).size;

		for (const value of eventsMap.get(this).values()) {
			count += value.size;
		}

		return count;
	}
}

// Subclass used to encourage TS users to type their events.
Emittery.Typed = class extends Emittery {};
Object.defineProperty(Emittery.Typed, 'Typed', {
	enumerable: false,
	value: undefined
});

module.exports = Emittery;
