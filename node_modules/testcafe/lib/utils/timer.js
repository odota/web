"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Timer {
    constructor(timeout) {
        this.expired = false;
        this.promise = new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
        this.promise.then(() => this._expire());
    }
    _expire() {
        this.expired = true;
    }
}
exports.default = Timer;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvdGltZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFxQixLQUFLO0lBSXRCLFlBQW9CLE9BQWU7UUFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFFckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNqQyxVQUFVLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVPLE9BQU87UUFDWCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUN4QixDQUFDO0NBQ0o7QUFqQkQsd0JBaUJDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZXIge1xuICAgIHB1YmxpYyBleHBpcmVkOiBib29sZWFuO1xuICAgIHB1YmxpYyBwcm9taXNlOiBQcm9taXNlPHZvaWQ+O1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yICh0aW1lb3V0OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5leHBpcmVkID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJlc29sdmUsIHRpbWVvdXQpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnByb21pc2UudGhlbigoKSA9PiB0aGlzLl9leHBpcmUoKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZXhwaXJlICgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5leHBpcmVkID0gdHJ1ZTtcbiAgICB9XG59XG4iXX0=