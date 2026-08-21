"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_family_1 = __importDefault(require("os-family"));
const testcafe_browser_tools_1 = __importDefault(require("testcafe-browser-tools"));
const delay_1 = __importDefault(require("../../../utils/delay"));
const POST_OPERATION_DELAY = 500;
class OperationsQueue {
    constructor() {
        this.chainPromise = Promise.resolve();
    }
    executeOperation(operation) {
        const operationPromise = this.chainPromise.then(operation);
        this.chainPromise = operationPromise.then(() => (0, delay_1.default)(POST_OPERATION_DELAY));
        return operationPromise;
    }
}
class BrowserStarter {
    constructor() {
        // NOTE: You can't start multiple instances of the same app at the same time on macOS.
        // That's why a queue of opening requests is needed.
        this.macOSBrowserOpeningQueue = new OperationsQueue();
    }
    async startBrowser(...openArgs) {
        const openBrowserOperation = () => testcafe_browser_tools_1.default.open(...openArgs);
        if (os_family_1.default.mac)
            await this.macOSBrowserOpeningQueue.executeOperation(openBrowserOperation);
        else
            await openBrowserOperation();
    }
}
exports.default = BrowserStarter;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci1zdGFydGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jyb3dzZXIvcHJvdmlkZXIvdXRpbHMvYnJvd3Nlci1zdGFydGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMERBQTJCO0FBQzNCLG9GQUFrRDtBQUNsRCxpRUFBeUM7QUFHekMsTUFBTSxvQkFBb0IsR0FBRyxHQUFHLENBQUM7QUFFakMsTUFBTSxlQUFlO0lBQ2pCO1FBQ0ksSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVELGdCQUFnQixDQUFFLFNBQVM7UUFDdkIsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUUzRCxJQUFJLENBQUMsWUFBWSxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFBLGVBQUssRUFBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7UUFFN0UsT0FBTyxnQkFBZ0IsQ0FBQztJQUM1QixDQUFDO0NBQ0o7QUFFRCxNQUFxQixjQUFjO0lBQy9CO1FBQ0ksc0ZBQXNGO1FBQ3RGLG9EQUFvRDtRQUNwRCxJQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztJQUMxRCxDQUFDO0lBRUQsS0FBSyxDQUFDLFlBQVksQ0FBRSxHQUFHLFFBQVE7UUFDM0IsTUFBTSxvQkFBb0IsR0FBRyxHQUFHLEVBQUUsQ0FBQyxnQ0FBWSxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDO1FBRWxFLElBQUksbUJBQUUsQ0FBQyxHQUFHO1lBQ04sTUFBTSxJQUFJLENBQUMsd0JBQXdCLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLENBQUMsQ0FBQzs7WUFFM0UsTUFBTSxvQkFBb0IsRUFBRSxDQUFDO0lBQ3JDLENBQUM7Q0FDSjtBQWZELGlDQWVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE9TIGZyb20gJ29zLWZhbWlseSc7XG5pbXBvcnQgYnJvd3NlclRvb2xzIGZyb20gJ3Rlc3RjYWZlLWJyb3dzZXItdG9vbHMnO1xuaW1wb3J0IGRlbGF5IGZyb20gJy4uLy4uLy4uL3V0aWxzL2RlbGF5JztcblxuXG5jb25zdCBQT1NUX09QRVJBVElPTl9ERUxBWSA9IDUwMDtcblxuY2xhc3MgT3BlcmF0aW9uc1F1ZXVlIHtcbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHRoaXMuY2hhaW5Qcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuXG4gICAgZXhlY3V0ZU9wZXJhdGlvbiAob3BlcmF0aW9uKSB7XG4gICAgICAgIGNvbnN0IG9wZXJhdGlvblByb21pc2UgPSB0aGlzLmNoYWluUHJvbWlzZS50aGVuKG9wZXJhdGlvbik7XG5cbiAgICAgICAgdGhpcy5jaGFpblByb21pc2UgPSBvcGVyYXRpb25Qcm9taXNlLnRoZW4oKCkgPT4gZGVsYXkoUE9TVF9PUEVSQVRJT05fREVMQVkpKTtcblxuICAgICAgICByZXR1cm4gb3BlcmF0aW9uUHJvbWlzZTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJyb3dzZXJTdGFydGVyIHtcbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIC8vIE5PVEU6IFlvdSBjYW4ndCBzdGFydCBtdWx0aXBsZSBpbnN0YW5jZXMgb2YgdGhlIHNhbWUgYXBwIGF0IHRoZSBzYW1lIHRpbWUgb24gbWFjT1MuXG4gICAgICAgIC8vIFRoYXQncyB3aHkgYSBxdWV1ZSBvZiBvcGVuaW5nIHJlcXVlc3RzIGlzIG5lZWRlZC5cbiAgICAgICAgdGhpcy5tYWNPU0Jyb3dzZXJPcGVuaW5nUXVldWUgPSBuZXcgT3BlcmF0aW9uc1F1ZXVlKCk7XG4gICAgfVxuXG4gICAgYXN5bmMgc3RhcnRCcm93c2VyICguLi5vcGVuQXJncykge1xuICAgICAgICBjb25zdCBvcGVuQnJvd3Nlck9wZXJhdGlvbiA9ICgpID0+IGJyb3dzZXJUb29scy5vcGVuKC4uLm9wZW5BcmdzKTtcblxuICAgICAgICBpZiAoT1MubWFjKVxuICAgICAgICAgICAgYXdhaXQgdGhpcy5tYWNPU0Jyb3dzZXJPcGVuaW5nUXVldWUuZXhlY3V0ZU9wZXJhdGlvbihvcGVuQnJvd3Nlck9wZXJhdGlvbik7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGF3YWl0IG9wZW5Ccm93c2VyT3BlcmF0aW9uKCk7XG4gICAgfVxufVxuIl19