"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("./"));
const delegated_api_1 = require("../../utils/delegated-api");
const test_run_tracker_1 = __importDefault(require("../test-run-tracker"));
const runtime_1 = require("../../errors/runtime");
const types_1 = require("../../errors/types");
const testControllerProxy = Object.create(null);
(0, delegated_api_1.delegateAPI)(testControllerProxy, _1.default.API_LIST, {
    getHandler(propName, accessor) {
        const testRun = test_run_tracker_1.default.resolveContextTestRun();
        if (!testRun) {
            let callsiteName = null;
            if (accessor === 'getter')
                callsiteName = 'get';
            else if (accessor === 'setter')
                callsiteName = 'set';
            else
                callsiteName = propName;
            throw new runtime_1.APIError(callsiteName, types_1.RUNTIME_ERRORS.testControllerProxyCannotResolveTestRun);
        }
        return testRun.controller;
    },
});
exports.default = testControllerProxy;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJveHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBpL3Rlc3QtY29udHJvbGxlci9wcm94eS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDBDQUFnQztBQUNoQyw2REFBd0Q7QUFDeEQsMkVBQWlEO0FBQ2pELGtEQUFnRDtBQUNoRCw4Q0FBb0Q7QUFFcEQsTUFBTSxtQkFBbUIsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRWhELElBQUEsMkJBQVcsRUFBQyxtQkFBbUIsRUFBRSxVQUFjLENBQUMsUUFBUSxFQUFFO0lBQ3RELFVBQVUsQ0FBRSxRQUFRLEVBQUUsUUFBUTtRQUMxQixNQUFNLE9BQU8sR0FBRywwQkFBYyxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFFdkQsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNWLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQztZQUV4QixJQUFJLFFBQVEsS0FBSyxRQUFRO2dCQUNyQixZQUFZLEdBQUcsS0FBSyxDQUFDO2lCQUNwQixJQUFJLFFBQVEsS0FBSyxRQUFRO2dCQUMxQixZQUFZLEdBQUcsS0FBSyxDQUFDOztnQkFFckIsWUFBWSxHQUFHLFFBQVEsQ0FBQztZQUU1QixNQUFNLElBQUksa0JBQVEsQ0FBQyxZQUFZLEVBQUUsc0JBQWMsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1NBQzVGO1FBRUQsT0FBTyxPQUFPLENBQUMsVUFBVSxDQUFDO0lBQzlCLENBQUM7Q0FDSixDQUFDLENBQUM7QUFFSCxrQkFBZSxtQkFBbUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUZXN0Q29udHJvbGxlciBmcm9tICcuLyc7XG5pbXBvcnQgeyBkZWxlZ2F0ZUFQSSB9IGZyb20gJy4uLy4uL3V0aWxzL2RlbGVnYXRlZC1hcGknO1xuaW1wb3J0IHRlc3RSdW5UcmFja2VyIGZyb20gJy4uL3Rlc3QtcnVuLXRyYWNrZXInO1xuaW1wb3J0IHsgQVBJRXJyb3IgfSBmcm9tICcuLi8uLi9lcnJvcnMvcnVudGltZSc7XG5pbXBvcnQgeyBSVU5USU1FX0VSUk9SUyB9IGZyb20gJy4uLy4uL2Vycm9ycy90eXBlcyc7XG5cbmNvbnN0IHRlc3RDb250cm9sbGVyUHJveHkgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG5kZWxlZ2F0ZUFQSSh0ZXN0Q29udHJvbGxlclByb3h5LCBUZXN0Q29udHJvbGxlci5BUElfTElTVCwge1xuICAgIGdldEhhbmRsZXIgKHByb3BOYW1lLCBhY2Nlc3Nvcikge1xuICAgICAgICBjb25zdCB0ZXN0UnVuID0gdGVzdFJ1blRyYWNrZXIucmVzb2x2ZUNvbnRleHRUZXN0UnVuKCk7XG5cbiAgICAgICAgaWYgKCF0ZXN0UnVuKSB7XG4gICAgICAgICAgICBsZXQgY2FsbHNpdGVOYW1lID0gbnVsbDtcblxuICAgICAgICAgICAgaWYgKGFjY2Vzc29yID09PSAnZ2V0dGVyJylcbiAgICAgICAgICAgICAgICBjYWxsc2l0ZU5hbWUgPSAnZ2V0JztcbiAgICAgICAgICAgIGVsc2UgaWYgKGFjY2Vzc29yID09PSAnc2V0dGVyJylcbiAgICAgICAgICAgICAgICBjYWxsc2l0ZU5hbWUgPSAnc2V0JztcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBjYWxsc2l0ZU5hbWUgPSBwcm9wTmFtZTtcblxuICAgICAgICAgICAgdGhyb3cgbmV3IEFQSUVycm9yKGNhbGxzaXRlTmFtZSwgUlVOVElNRV9FUlJPUlMudGVzdENvbnRyb2xsZXJQcm94eUNhbm5vdFJlc29sdmVUZXN0UnVuKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0ZXN0UnVuLmNvbnRyb2xsZXI7XG4gICAgfSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCB0ZXN0Q29udHJvbGxlclByb3h5O1xuIl19