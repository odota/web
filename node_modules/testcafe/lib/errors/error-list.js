"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_test_fn_error_1 = __importDefault(require("./process-test-fn-error"));
const test_run_1 = require("./test-run");
class TestCafeErrorList {
    constructor() {
        this.items = [];
        this.name = TestCafeErrorList.name;
        this.adapter = null;
    }
    get hasErrors() {
        return !!this.items.length;
    }
    get hasUncaughtErrorsInTestCode() {
        return this.items.some(item => item instanceof test_run_1.UncaughtErrorInTestCode);
    }
    addError(err) {
        if (err instanceof TestCafeErrorList)
            this.items = this.items.concat(err.items);
        else
            this.items.push((0, process_test_fn_error_1.default)(err));
    }
}
exports.default = TestCafeErrorList;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItbGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lcnJvcnMvZXJyb3ItbGlzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG9GQUF5RDtBQUN6RCx5Q0FBcUQ7QUFFckQsTUFBcUIsaUJBQWlCO0lBQ2xDO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBSyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLElBQUksR0FBTSxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7UUFDdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQUksU0FBUztRQUNULE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQy9CLENBQUM7SUFFRCxJQUFJLDJCQUEyQjtRQUMzQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxZQUFZLGtDQUF1QixDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUVELFFBQVEsQ0FBRSxHQUFHO1FBQ1QsSUFBSSxHQUFHLFlBQVksaUJBQWlCO1lBQ2hDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDOztZQUUxQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFBLCtCQUFrQixFQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztDQUNKO0FBckJELG9DQXFCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwcm9jZXNzVGVzdEZuRXJyb3IgZnJvbSAnLi9wcm9jZXNzLXRlc3QtZm4tZXJyb3InO1xuaW1wb3J0IHsgVW5jYXVnaHRFcnJvckluVGVzdENvZGUgfSBmcm9tICcuL3Rlc3QtcnVuJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVzdENhZmVFcnJvckxpc3Qge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgdGhpcy5pdGVtcyAgID0gW107XG4gICAgICAgIHRoaXMubmFtZSAgICA9IFRlc3RDYWZlRXJyb3JMaXN0Lm5hbWU7XG4gICAgICAgIHRoaXMuYWRhcHRlciA9IG51bGw7XG4gICAgfVxuXG4gICAgZ2V0IGhhc0Vycm9ycyAoKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuaXRlbXMubGVuZ3RoO1xuICAgIH1cblxuICAgIGdldCBoYXNVbmNhdWdodEVycm9yc0luVGVzdENvZGUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcy5zb21lKGl0ZW0gPT4gaXRlbSBpbnN0YW5jZW9mIFVuY2F1Z2h0RXJyb3JJblRlc3RDb2RlKTtcbiAgICB9XG5cbiAgICBhZGRFcnJvciAoZXJyKSB7XG4gICAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBUZXN0Q2FmZUVycm9yTGlzdClcbiAgICAgICAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1zLmNvbmNhdChlcnIuaXRlbXMpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2gocHJvY2Vzc1Rlc3RGbkVycm9yKGVycikpO1xuICAgIH1cbn1cbiJdfQ==