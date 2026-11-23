"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionCommandBase = exports.CommandBase = void 0;
const nanoid_1 = require("nanoid");
const assignable_1 = __importDefault(require("../../utils/assignable"));
const COMMON_NOT_REPORTED_PROPERTIES = ['studio'];
class CommandBase extends assignable_1.default {
    constructor(obj, testRun, type, validateProperties = true) {
        super();
        this.type = type;
        this.actionId = (obj === null || obj === void 0 ? void 0 : obj.actionId) || (0, nanoid_1.nanoid)(7);
        this._assignFrom(obj, validateProperties, { testRun });
    }
    getAssignableProperties() {
        return [];
    }
    getNonReportedProperties() {
        return COMMON_NOT_REPORTED_PROPERTIES;
    }
}
exports.CommandBase = CommandBase;
class ActionCommandBase extends CommandBase {
    get methodName() {
        return this.constructor.methodName;
    }
}
exports.ActionCommandBase = ActionCommandBase;
ActionCommandBase.methodName = 'actionCommandBase';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZXN0LXJ1bi9jb21tYW5kcy9iYXNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG1DQUFnQztBQUNoQyx3RUFBZ0Q7QUFFaEQsTUFBTSw4QkFBOEIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRWxELE1BQWEsV0FBWSxTQUFRLG9CQUFVO0lBQ3ZDLFlBQWEsR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEdBQUcsSUFBSTtRQUN0RCxLQUFLLEVBQUUsQ0FBQztRQUVSLElBQUksQ0FBQyxJQUFJLEdBQU8sSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQSxHQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsUUFBUSxLQUFJLElBQUEsZUFBTSxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTNDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLGtCQUFrQixFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsdUJBQXVCO1FBQ25CLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVELHdCQUF3QjtRQUNwQixPQUFPLDhCQUE4QixDQUFDO0lBQzFDLENBQUM7Q0FDSjtBQWpCRCxrQ0FpQkM7QUFFRCxNQUFhLGlCQUFrQixTQUFRLFdBQVc7SUFHOUMsSUFBSSxVQUFVO1FBQ1YsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQztJQUN2QyxDQUFDOztBQUxMLDhDQU1DO0FBTFUsNEJBQVUsR0FBRyxtQkFBbUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG5hbm9pZCB9IGZyb20gJ25hbm9pZCc7XG5pbXBvcnQgQXNzaWduYWJsZSBmcm9tICcuLi8uLi91dGlscy9hc3NpZ25hYmxlJztcblxuY29uc3QgQ09NTU9OX05PVF9SRVBPUlRFRF9QUk9QRVJUSUVTID0gWydzdHVkaW8nXTtcblxuZXhwb3J0IGNsYXNzIENvbW1hbmRCYXNlIGV4dGVuZHMgQXNzaWduYWJsZSB7XG4gICAgY29uc3RydWN0b3IgKG9iaiwgdGVzdFJ1biwgdHlwZSwgdmFsaWRhdGVQcm9wZXJ0aWVzID0gdHJ1ZSkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMudHlwZSAgICAgPSB0eXBlO1xuICAgICAgICB0aGlzLmFjdGlvbklkID0gb2JqPy5hY3Rpb25JZCB8fCBuYW5vaWQoNyk7XG5cbiAgICAgICAgdGhpcy5fYXNzaWduRnJvbShvYmosIHZhbGlkYXRlUHJvcGVydGllcywgeyB0ZXN0UnVuIH0pO1xuICAgIH1cblxuICAgIGdldEFzc2lnbmFibGVQcm9wZXJ0aWVzICgpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIGdldE5vblJlcG9ydGVkUHJvcGVydGllcyAoKSB7XG4gICAgICAgIHJldHVybiBDT01NT05fTk9UX1JFUE9SVEVEX1BST1BFUlRJRVM7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQWN0aW9uQ29tbWFuZEJhc2UgZXh0ZW5kcyBDb21tYW5kQmFzZSB7XG4gICAgc3RhdGljIG1ldGhvZE5hbWUgPSAnYWN0aW9uQ29tbWFuZEJhc2UnO1xuXG4gICAgZ2V0IG1ldGhvZE5hbWUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5tZXRob2ROYW1lO1xuICAgIH1cbn1cbiJdfQ==