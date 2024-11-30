"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const module_1 = __importDefault(require("module"));
const bootstrapper_1 = __importDefault(require("../runner/bootstrapper"));
const compiler_1 = __importDefault(require("../compiler"));
const cache_proxy_1 = __importDefault(require("./../compiler/test-file/cache-proxy"));
const originalRequire = module_1.default.prototype.require;
class LiveModeBootstrapper extends bootstrapper_1.default {
    constructor(runner, browserConnectionGateway, compilerService, messageBus) {
        super({ browserConnectionGateway, compilerService, messageBus });
        this.runner = runner;
        cache_proxy_1.default.preventCaching();
    }
    _getTests(id) {
        this._mockRequire();
        return super._getTests(id)
            .then(result => {
            this._restoreRequire();
            return result;
        })
            .catch(err => {
            this._restoreRequire();
            compiler_1.default.cleanUp();
            this.runner.setBootstrappingError(err);
        });
    }
    _mockRequire() {
        const controller = this.runner.controller;
        // NODE: we replace the `require` method to add required files to watcher
        module_1.default.prototype.require = function (filePath) {
            const filename = module_1.default._resolveFilename(filePath, this, false);
            if (path_1.default.isAbsolute(filename) || /^\.\.?[/\\]/.test(filename))
                controller.addFileToWatches(filename);
            return originalRequire.apply(this, arguments);
        };
    }
    _restoreRequire() {
        module_1.default.prototype.require = originalRequire;
    }
}
exports.default = LiveModeBootstrapper;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpdmUvYm9vdHN0cmFwcGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0RBQXdCO0FBQ3hCLG9EQUE0QjtBQUM1QiwwRUFBa0Q7QUFDbEQsMkRBQW1DO0FBQ25DLHNGQUE2RDtBQUU3RCxNQUFNLGVBQWUsR0FBRyxnQkFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7QUFFakQsTUFBTSxvQkFBcUIsU0FBUSxzQkFBWTtJQUMzQyxZQUFhLE1BQU0sRUFBRSx3QkFBd0IsRUFBRSxlQUFlLEVBQUUsVUFBVTtRQUN0RSxLQUFLLENBQUMsRUFBRSx3QkFBd0IsRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUVqRSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUVyQixxQkFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxTQUFTLENBQUUsRUFBRTtRQUNULElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVwQixPQUFPLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO2FBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNYLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUV2QixPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDVCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFFdkIsa0JBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUVuQixJQUFJLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELFlBQVk7UUFDUixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUUxQyx5RUFBeUU7UUFDekUsZ0JBQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLFVBQVUsUUFBUTtZQUN6QyxNQUFNLFFBQVEsR0FBRyxnQkFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFFaEUsSUFBSSxjQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUN6RCxVQUFVLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7WUFHMUMsT0FBTyxlQUFlLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNsRCxDQUFDLENBQUM7SUFDTixDQUFDO0lBRUQsZUFBZTtRQUNYLGdCQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUM7SUFDL0MsQ0FBQztDQUNKO0FBRUQsa0JBQWUsb0JBQW9CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBNb2R1bGUgZnJvbSAnbW9kdWxlJztcbmltcG9ydCBCb290c3RyYXBwZXIgZnJvbSAnLi4vcnVubmVyL2Jvb3RzdHJhcHBlcic7XG5pbXBvcnQgQ29tcGlsZXIgZnJvbSAnLi4vY29tcGlsZXInO1xuaW1wb3J0IGNhY2hlUHJveHkgZnJvbSAnLi8uLi9jb21waWxlci90ZXN0LWZpbGUvY2FjaGUtcHJveHknO1xuXG5jb25zdCBvcmlnaW5hbFJlcXVpcmUgPSBNb2R1bGUucHJvdG90eXBlLnJlcXVpcmU7XG5cbmNsYXNzIExpdmVNb2RlQm9vdHN0cmFwcGVyIGV4dGVuZHMgQm9vdHN0cmFwcGVyIHtcbiAgICBjb25zdHJ1Y3RvciAocnVubmVyLCBicm93c2VyQ29ubmVjdGlvbkdhdGV3YXksIGNvbXBpbGVyU2VydmljZSwgbWVzc2FnZUJ1cykge1xuICAgICAgICBzdXBlcih7IGJyb3dzZXJDb25uZWN0aW9uR2F0ZXdheSwgY29tcGlsZXJTZXJ2aWNlLCBtZXNzYWdlQnVzIH0pO1xuXG4gICAgICAgIHRoaXMucnVubmVyID0gcnVubmVyO1xuXG4gICAgICAgIGNhY2hlUHJveHkucHJldmVudENhY2hpbmcoKTtcbiAgICB9XG5cbiAgICBfZ2V0VGVzdHMgKGlkKSB7XG4gICAgICAgIHRoaXMuX21vY2tSZXF1aXJlKCk7XG5cbiAgICAgICAgcmV0dXJuIHN1cGVyLl9nZXRUZXN0cyhpZClcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzdG9yZVJlcXVpcmUoKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzdG9yZVJlcXVpcmUoKTtcblxuICAgICAgICAgICAgICAgIENvbXBpbGVyLmNsZWFuVXAoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucnVubmVyLnNldEJvb3RzdHJhcHBpbmdFcnJvcihlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX21vY2tSZXF1aXJlICgpIHtcbiAgICAgICAgY29uc3QgY29udHJvbGxlciA9IHRoaXMucnVubmVyLmNvbnRyb2xsZXI7XG5cbiAgICAgICAgLy8gTk9ERTogd2UgcmVwbGFjZSB0aGUgYHJlcXVpcmVgIG1ldGhvZCB0byBhZGQgcmVxdWlyZWQgZmlsZXMgdG8gd2F0Y2hlclxuICAgICAgICBNb2R1bGUucHJvdG90eXBlLnJlcXVpcmUgPSBmdW5jdGlvbiAoZmlsZVBhdGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVuYW1lID0gTW9kdWxlLl9yZXNvbHZlRmlsZW5hbWUoZmlsZVBhdGgsIHRoaXMsIGZhbHNlKTtcblxuICAgICAgICAgICAgaWYgKHBhdGguaXNBYnNvbHV0ZShmaWxlbmFtZSkgfHwgL15cXC5cXC4/Wy9cXFxcXS8udGVzdChmaWxlbmFtZSkpXG4gICAgICAgICAgICAgICAgY29udHJvbGxlci5hZGRGaWxlVG9XYXRjaGVzKGZpbGVuYW1lKTtcblxuXG4gICAgICAgICAgICByZXR1cm4gb3JpZ2luYWxSZXF1aXJlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgX3Jlc3RvcmVSZXF1aXJlICgpIHtcbiAgICAgICAgTW9kdWxlLnByb3RvdHlwZS5yZXF1aXJlID0gb3JpZ2luYWxSZXF1aXJlO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGl2ZU1vZGVCb290c3RyYXBwZXI7XG4iXX0=