"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_unit_1 = __importDefault(require("./base-unit"));
const unit_type_1 = __importDefault(require("./unit-type"));
const BORROWED_TEST_PROPERTIES = ['skip', 'only', 'pageUrl', 'authCredentials'];
class TestFile extends base_unit_1.default {
    constructor(filename) {
        super(unit_type_1.default.testFile);
        this.filename = filename;
        this.currentFixture = null;
        this.collectedTests = [];
    }
    getTests() {
        this.collectedTests.forEach(test => {
            BORROWED_TEST_PROPERTIES.forEach(prop => {
                // TODO: add index signature to the Test and Fixture classes
                //@ts-ignore
                test[prop] = test[prop] || test.fixture[prop];
            });
            const testFixture = test.fixture;
            if (test.disablePageReloads === void 0)
                test.disablePageReloads = testFixture.disablePageReloads;
            if (!test.disablePageCaching)
                test.disablePageCaching = testFixture.disablePageCaching;
        });
        return this.collectedTests;
    }
}
exports.default = TestFile;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC1maWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwaS9zdHJ1Y3R1cmUvdGVzdC1maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNERBQW1DO0FBQ25DLDREQUFtQztBQUluQyxNQUFNLHdCQUF3QixHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztBQUVoRixNQUFxQixRQUFTLFNBQVEsbUJBQVE7SUFLMUMsWUFBb0IsUUFBZ0I7UUFDaEMsS0FBSyxDQUFDLG1CQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFekIsSUFBSSxDQUFDLFFBQVEsR0FBUyxRQUFRLENBQUM7UUFDL0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVNLFFBQVE7UUFDWCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMvQix3QkFBd0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3BDLDREQUE0RDtnQkFDNUQsWUFBWTtnQkFDWixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEQsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBa0IsQ0FBQztZQUU1QyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsS0FBSyxLQUFLLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxXQUFXLENBQUMsa0JBQWtCLENBQUM7WUFFN0QsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0I7Z0JBQ3hCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxXQUFXLENBQUMsa0JBQWtCLENBQUM7UUFDakUsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDL0IsQ0FBQztDQUNKO0FBaENELDJCQWdDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlVW5pdCBmcm9tICcuL2Jhc2UtdW5pdCc7XG5pbXBvcnQgVW5pdFR5cGUgZnJvbSAnLi91bml0LXR5cGUnO1xuaW1wb3J0IEZpeHR1cmUgZnJvbSAnLi9maXh0dXJlJztcbmltcG9ydCBUZXN0IGZyb20gJy4vdGVzdCc7XG5cbmNvbnN0IEJPUlJPV0VEX1RFU1RfUFJPUEVSVElFUyA9IFsnc2tpcCcsICdvbmx5JywgJ3BhZ2VVcmwnLCAnYXV0aENyZWRlbnRpYWxzJ107XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlc3RGaWxlIGV4dGVuZHMgQmFzZVVuaXQge1xuICAgIHB1YmxpYyBmaWxlbmFtZTogc3RyaW5nO1xuICAgIHB1YmxpYyBjdXJyZW50Rml4dHVyZTogRml4dHVyZSB8IG51bGw7XG4gICAgcHVibGljIGNvbGxlY3RlZFRlc3RzOiBUZXN0W107XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IgKGZpbGVuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoVW5pdFR5cGUudGVzdEZpbGUpO1xuXG4gICAgICAgIHRoaXMuZmlsZW5hbWUgICAgICAgPSBmaWxlbmFtZTtcbiAgICAgICAgdGhpcy5jdXJyZW50Rml4dHVyZSA9IG51bGw7XG4gICAgICAgIHRoaXMuY29sbGVjdGVkVGVzdHMgPSBbXTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VGVzdHMgKCk6IFRlc3RbXSB7XG4gICAgICAgIHRoaXMuY29sbGVjdGVkVGVzdHMuZm9yRWFjaCh0ZXN0ID0+IHtcbiAgICAgICAgICAgIEJPUlJPV0VEX1RFU1RfUFJPUEVSVElFUy5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFRPRE86IGFkZCBpbmRleCBzaWduYXR1cmUgdG8gdGhlIFRlc3QgYW5kIEZpeHR1cmUgY2xhc3Nlc1xuICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIHRlc3RbcHJvcF0gPSB0ZXN0W3Byb3BdIHx8IHRlc3QuZml4dHVyZVtwcm9wXTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCB0ZXN0Rml4dHVyZSA9IHRlc3QuZml4dHVyZSBhcyBGaXh0dXJlO1xuXG4gICAgICAgICAgICBpZiAodGVzdC5kaXNhYmxlUGFnZVJlbG9hZHMgPT09IHZvaWQgMClcbiAgICAgICAgICAgICAgICB0ZXN0LmRpc2FibGVQYWdlUmVsb2FkcyA9IHRlc3RGaXh0dXJlLmRpc2FibGVQYWdlUmVsb2FkcztcblxuICAgICAgICAgICAgaWYgKCF0ZXN0LmRpc2FibGVQYWdlQ2FjaGluZylcbiAgICAgICAgICAgICAgICB0ZXN0LmRpc2FibGVQYWdlQ2FjaGluZyA9IHRlc3RGaXh0dXJlLmRpc2FibGVQYWdlQ2FjaGluZztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY29sbGVjdGVkVGVzdHM7XG4gICAgfVxufVxuIl19