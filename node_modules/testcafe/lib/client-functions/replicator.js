"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectorNodeTransform = exports.FunctionTransform = exports.createReplicator = void 0;
const lodash_1 = require("lodash");
const replicator_1 = __importDefault(require("replicator"));
const builder_symbol_1 = __importDefault(require("./builder-symbol"));
const compile_client_function_1 = __importDefault(require("../compiler/compile-client-function"));
function createReplicator(transforms) {
    // NOTE: we will serialize replicator results
    // to JSON with a command or command result.
    // Therefore there is no need to do additional job here,
    // so we use identity functions for serialization.
    const replicator = new replicator_1.default({
        serialize: lodash_1.identity,
        deserialize: lodash_1.identity,
    });
    return replicator.addTransforms(transforms);
}
exports.createReplicator = createReplicator;
// Replicator transforms
class FunctionTransform {
    constructor(callsiteNames) {
        this.type = 'Function';
        this.callsiteNames = callsiteNames;
    }
    shouldTransform(type) {
        return type === 'function';
    }
    toSerializable(fn) {
        const clientFnBuilder = fn[builder_symbol_1.default];
        if (clientFnBuilder) {
            return {
                fnCode: clientFnBuilder.compiledFnCode,
                dependencies: clientFnBuilder.getFunctionDependencies(),
            };
        }
        return {
            fnCode: (0, compile_client_function_1.default)(fn.toString(), null, this.callsiteNames.instantiation, this.callsiteNames.execution),
            dependencies: {},
        };
    }
    fromSerializable() {
        return void 0;
    }
}
exports.FunctionTransform = FunctionTransform;
class SelectorNodeTransform {
    constructor() {
        this.type = 'Node';
    }
    shouldTransform() {
        return false;
    }
    fromSerializable(nodeSnapshot) {
        return nodeSnapshot;
    }
}
exports.SelectorNodeTransform = SelectorNodeTransform;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGljYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGllbnQtZnVuY3Rpb25zL3JlcGxpY2F0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsbUNBQWtDO0FBQ2xDLDREQUFvQztBQUNwQyxzRUFBcUQ7QUFDckQsa0dBQXdFO0FBRXhFLFNBQWdCLGdCQUFnQixDQUFFLFVBQVU7SUFDeEMsNkNBQTZDO0lBQzdDLDRDQUE0QztJQUM1Qyx3REFBd0Q7SUFDeEQsa0RBQWtEO0lBQ2xELE1BQU0sVUFBVSxHQUFHLElBQUksb0JBQVUsQ0FBQztRQUM5QixTQUFTLEVBQUksaUJBQVE7UUFDckIsV0FBVyxFQUFFLGlCQUFRO0tBQ3hCLENBQUMsQ0FBQztJQUVILE9BQU8sVUFBVSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNoRCxDQUFDO0FBWEQsNENBV0M7QUFFRCx3QkFBd0I7QUFDeEIsTUFBYSxpQkFBaUI7SUFDMUIsWUFBYSxhQUFhO1FBQ3RCLElBQUksQ0FBQyxJQUFJLEdBQVksVUFBVSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxlQUFlLENBQUUsSUFBSTtRQUNqQixPQUFPLElBQUksS0FBSyxVQUFVLENBQUM7SUFDL0IsQ0FBQztJQUVELGNBQWMsQ0FBRSxFQUFFO1FBQ2QsTUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDLHdCQUFxQixDQUFDLENBQUM7UUFFbEQsSUFBSSxlQUFlLEVBQUU7WUFDakIsT0FBTztnQkFDSCxNQUFNLEVBQVEsZUFBZSxDQUFDLGNBQWM7Z0JBQzVDLFlBQVksRUFBRSxlQUFlLENBQUMsdUJBQXVCLEVBQUU7YUFDMUQsQ0FBQztTQUNMO1FBRUQsT0FBTztZQUNILE1BQU0sRUFBUSxJQUFBLGlDQUFxQixFQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUM7WUFDeEgsWUFBWSxFQUFFLEVBQUU7U0FDbkIsQ0FBQztJQUNOLENBQUM7SUFFRCxnQkFBZ0I7UUFDWixPQUFPLEtBQUssQ0FBQyxDQUFDO0lBQ2xCLENBQUM7Q0FDSjtBQTdCRCw4Q0E2QkM7QUFFRCxNQUFhLHFCQUFxQjtJQUM5QjtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxlQUFlO1FBQ1gsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELGdCQUFnQixDQUFFLFlBQVk7UUFDMUIsT0FBTyxZQUFZLENBQUM7SUFDeEIsQ0FBQztDQUNKO0FBWkQsc0RBWUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpZGVudGl0eSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgUmVwbGljYXRvciBmcm9tICdyZXBsaWNhdG9yJztcbmltcG9ydCBmdW5jdGlvbkJ1aWxkZXJTeW1ib2wgZnJvbSAnLi9idWlsZGVyLXN5bWJvbCc7XG5pbXBvcnQgY29tcGlsZUNsaWVudEZ1bmN0aW9uIGZyb20gJy4uL2NvbXBpbGVyL2NvbXBpbGUtY2xpZW50LWZ1bmN0aW9uJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlcGxpY2F0b3IgKHRyYW5zZm9ybXMpIHtcbiAgICAvLyBOT1RFOiB3ZSB3aWxsIHNlcmlhbGl6ZSByZXBsaWNhdG9yIHJlc3VsdHNcbiAgICAvLyB0byBKU09OIHdpdGggYSBjb21tYW5kIG9yIGNvbW1hbmQgcmVzdWx0LlxuICAgIC8vIFRoZXJlZm9yZSB0aGVyZSBpcyBubyBuZWVkIHRvIGRvIGFkZGl0aW9uYWwgam9iIGhlcmUsXG4gICAgLy8gc28gd2UgdXNlIGlkZW50aXR5IGZ1bmN0aW9ucyBmb3Igc2VyaWFsaXphdGlvbi5cbiAgICBjb25zdCByZXBsaWNhdG9yID0gbmV3IFJlcGxpY2F0b3Ioe1xuICAgICAgICBzZXJpYWxpemU6ICAgaWRlbnRpdHksXG4gICAgICAgIGRlc2VyaWFsaXplOiBpZGVudGl0eSxcbiAgICB9KTtcblxuICAgIHJldHVybiByZXBsaWNhdG9yLmFkZFRyYW5zZm9ybXModHJhbnNmb3Jtcyk7XG59XG5cbi8vIFJlcGxpY2F0b3IgdHJhbnNmb3Jtc1xuZXhwb3J0IGNsYXNzIEZ1bmN0aW9uVHJhbnNmb3JtIHtcbiAgICBjb25zdHJ1Y3RvciAoY2FsbHNpdGVOYW1lcykge1xuICAgICAgICB0aGlzLnR5cGUgICAgICAgICAgPSAnRnVuY3Rpb24nO1xuICAgICAgICB0aGlzLmNhbGxzaXRlTmFtZXMgPSBjYWxsc2l0ZU5hbWVzO1xuICAgIH1cblxuICAgIHNob3VsZFRyYW5zZm9ybSAodHlwZSkge1xuICAgICAgICByZXR1cm4gdHlwZSA9PT0gJ2Z1bmN0aW9uJztcbiAgICB9XG5cbiAgICB0b1NlcmlhbGl6YWJsZSAoZm4pIHtcbiAgICAgICAgY29uc3QgY2xpZW50Rm5CdWlsZGVyID0gZm5bZnVuY3Rpb25CdWlsZGVyU3ltYm9sXTtcblxuICAgICAgICBpZiAoY2xpZW50Rm5CdWlsZGVyKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGZuQ29kZTogICAgICAgY2xpZW50Rm5CdWlsZGVyLmNvbXBpbGVkRm5Db2RlLFxuICAgICAgICAgICAgICAgIGRlcGVuZGVuY2llczogY2xpZW50Rm5CdWlsZGVyLmdldEZ1bmN0aW9uRGVwZW5kZW5jaWVzKCksXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZuQ29kZTogICAgICAgY29tcGlsZUNsaWVudEZ1bmN0aW9uKGZuLnRvU3RyaW5nKCksIG51bGwsIHRoaXMuY2FsbHNpdGVOYW1lcy5pbnN0YW50aWF0aW9uLCB0aGlzLmNhbGxzaXRlTmFtZXMuZXhlY3V0aW9uKSxcbiAgICAgICAgICAgIGRlcGVuZGVuY2llczoge30sXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnJvbVNlcmlhbGl6YWJsZSAoKSB7XG4gICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgU2VsZWN0b3JOb2RlVHJhbnNmb3JtIHtcbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHRoaXMudHlwZSA9ICdOb2RlJztcbiAgICB9XG5cbiAgICBzaG91bGRUcmFuc2Zvcm0gKCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZnJvbVNlcmlhbGl6YWJsZSAobm9kZVNuYXBzaG90KSB7XG4gICAgICAgIHJldHVybiBub2RlU25hcHNob3Q7XG4gICAgfVxufVxuIl19