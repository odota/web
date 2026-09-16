"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isThennable = void 0;
function isThennable(target) {
    return target && typeof target === 'object' && 'then' in target && typeof target.then === 'function';
}
exports.isThennable = isThennable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbm5hYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3RoZW5uYWJsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxTQUFnQixXQUFXLENBQUUsTUFBTTtJQUMvQixPQUFPLE1BQU0sSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksTUFBTSxJQUFJLE1BQU0sSUFBSSxPQUFPLE1BQU0sQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDO0FBQ3pHLENBQUM7QUFGRCxrQ0FFQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBpc1RoZW5uYWJsZSAodGFyZ2V0KSB7XG4gICAgcmV0dXJuIHRhcmdldCAmJiB0eXBlb2YgdGFyZ2V0ID09PSAnb2JqZWN0JyAmJiAndGhlbicgaW4gdGFyZ2V0ICYmIHR5cGVvZiB0YXJnZXQudGhlbiA9PT0gJ2Z1bmN0aW9uJztcbn1cbiJdfQ==