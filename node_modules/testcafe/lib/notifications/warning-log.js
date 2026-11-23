"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const render_template_1 = __importDefault(require("../utils/render-template"));
const message_bus_1 = __importDefault(require("../utils/message-bus"));
class WarningLog {
    constructor(globalLog = null, callback) {
        this.messageInfos = [];
        this.globalLog = globalLog;
        this.callback = callback;
        this._isCopying = false;
    }
    get messages() {
        return this.messageInfos.map(msg => msg.message);
    }
    addPlainMessage(msg) {
        // NOTE: avoid duplicates
        if (!this.messageInfos.find(m => m.message === msg.message))
            this.messageInfos.push(msg);
    }
    addWarning(msg, ...args) {
        let message = '';
        let actionId = null;
        if (typeof msg !== 'string')
            ({ message, actionId } = msg);
        else
            message = msg;
        args = [message].concat(args);
        // @ts-ignore
        message = render_template_1.default.apply(null, args); // eslint-disable-line prefer-spread
        this.addPlainMessage({ message, actionId });
        if (this.globalLog)
            this.globalLog.addPlainMessage({ message, actionId });
        if (this.callback && !this._isCopying)
            this.callback(message, actionId);
    }
    clear() {
        this.messageInfos = [];
    }
    copyFrom(warningLog) {
        this._isCopying = true;
        warningLog.messages.forEach(msg => this.addWarning(msg));
        this._isCopying = false;
    }
    static createAddWarningCallback(messageBus, testRun) {
        return async (message, actionId) => {
            if (messageBus && messageBus instanceof message_bus_1.default) {
                const warning = {
                    message,
                    testRun,
                    actionId,
                };
                await messageBus.emit('before-warning-add', warning);
                await messageBus.emit('warning-add', warning);
            }
        };
    }
}
exports.default = WarningLog;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FybmluZy1sb2cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbm90aWZpY2F0aW9ucy93YXJuaW5nLWxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLCtFQUFzRDtBQUV0RCx1RUFBOEM7QUFTOUMsTUFBcUIsVUFBVTtJQU0zQixZQUFvQixZQUErQixJQUFJLEVBQUUsUUFBNkI7UUFDbEYsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBTSxTQUFTLENBQUM7UUFDOUIsSUFBSSxDQUFDLFFBQVEsR0FBTyxRQUFRLENBQUM7UUFDN0IsSUFBSSxDQUFDLFVBQVUsR0FBSyxLQUFLLENBQUM7SUFDOUIsQ0FBQztJQUVELElBQVcsUUFBUTtRQUNmLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVNLGVBQWUsQ0FBRSxHQUFzQjtRQUMxQyx5QkFBeUI7UUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxHQUFHLENBQUMsT0FBTyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFTSxVQUFVLENBQUUsR0FBK0IsRUFBRSxHQUFHLElBQVc7UUFDOUQsSUFBSSxPQUFPLEdBQUksRUFBRSxDQUFDO1FBQ2xCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQztRQUVwQixJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVE7WUFDdkIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQzs7WUFFOUIsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUVsQixJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFOUIsYUFBYTtRQUNiLE9BQU8sR0FBRyx5QkFBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxvQ0FBb0M7UUFFaEYsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBRTVDLElBQUksSUFBSSxDQUFDLFNBQVM7WUFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBRTFELElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVO1lBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFTSxLQUFLO1FBQ1IsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVNLFFBQVEsQ0FBRSxVQUFzQjtRQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixVQUFVLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUM1QixDQUFDO0lBRU0sTUFBTSxDQUFDLHdCQUF3QixDQUFFLFVBQWdDLEVBQUUsT0FBaUI7UUFDdkYsT0FBTyxLQUFLLEVBQUUsT0FBZSxFQUFFLFFBQXVCLEVBQUUsRUFBRTtZQUN0RCxJQUFJLFVBQVUsSUFBSSxVQUFVLFlBQVkscUJBQVUsRUFBRTtnQkFDaEQsTUFBTSxPQUFPLEdBQUc7b0JBQ1osT0FBTztvQkFDUCxPQUFPO29CQUNQLFFBQVE7aUJBQ1gsQ0FBQztnQkFFRixNQUFNLFVBQVUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ3JELE1BQU0sVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDakQ7UUFDTCxDQUFDLENBQUM7SUFDTixDQUFDO0NBQ0o7QUF0RUQsNkJBc0VDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlbmRlclRlbXBsYXRlIGZyb20gJy4uL3V0aWxzL3JlbmRlci10ZW1wbGF0ZSc7XG5pbXBvcnQgVGVzdFJ1biBmcm9tICcuLi90ZXN0LXJ1bic7XG5pbXBvcnQgTWVzc2FnZUJ1cyBmcm9tICcuLi91dGlscy9tZXNzYWdlLWJ1cyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgV2FybmluZ0xvZ01lc3NhZ2Uge1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICBhY3Rpb25JZDogc3RyaW5nIHwgbnVsbDtcbn1cblxudHlwZSBXYXJuaW5nTG9nQ2FsbGJhY2sgPSAobWVzc2FnZTogc3RyaW5nLCBhY3Rpb25JZDogc3RyaW5nIHwgbnVsbCkgPT4gUHJvbWlzZTx2b2lkPjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2FybmluZ0xvZyB7XG4gICAgcHVibGljIG1lc3NhZ2VJbmZvczogV2FybmluZ0xvZ01lc3NhZ2VbXTtcbiAgICBwdWJsaWMgZ2xvYmFsTG9nOiBXYXJuaW5nTG9nIHwgbnVsbDtcbiAgICBwdWJsaWMgY2FsbGJhY2s/OiBXYXJuaW5nTG9nQ2FsbGJhY2s7XG4gICAgcHJpdmF0ZSBfaXNDb3B5aW5nOiBib29sZWFuO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yIChnbG9iYWxMb2c6IFdhcm5pbmdMb2cgfCBudWxsID0gbnVsbCwgY2FsbGJhY2s/OiBXYXJuaW5nTG9nQ2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlSW5mb3MgPSBbXTtcbiAgICAgICAgdGhpcy5nbG9iYWxMb2cgICAgPSBnbG9iYWxMb2c7XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgICAgID0gY2FsbGJhY2s7XG4gICAgICAgIHRoaXMuX2lzQ29weWluZyAgID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBtZXNzYWdlcyAoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlSW5mb3MubWFwKG1zZyA9PiBtc2cubWVzc2FnZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZFBsYWluTWVzc2FnZSAobXNnOiBXYXJuaW5nTG9nTWVzc2FnZSk6IHZvaWQge1xuICAgICAgICAvLyBOT1RFOiBhdm9pZCBkdXBsaWNhdGVzXG4gICAgICAgIGlmICghdGhpcy5tZXNzYWdlSW5mb3MuZmluZChtID0+IG0ubWVzc2FnZSA9PT0gbXNnLm1lc3NhZ2UpKVxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlSW5mb3MucHVzaChtc2cpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRXYXJuaW5nIChtc2c6IFdhcm5pbmdMb2dNZXNzYWdlIHwgc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xuICAgICAgICBsZXQgbWVzc2FnZSAgPSAnJztcbiAgICAgICAgbGV0IGFjdGlvbklkID0gbnVsbDtcblxuICAgICAgICBpZiAodHlwZW9mIG1zZyAhPT0gJ3N0cmluZycpXG4gICAgICAgICAgICAoeyBtZXNzYWdlLCBhY3Rpb25JZCB9ID0gbXNnKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgbWVzc2FnZSA9IG1zZztcblxuICAgICAgICBhcmdzID0gW21lc3NhZ2VdLmNvbmNhdChhcmdzKTtcblxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIG1lc3NhZ2UgPSByZW5kZXJUZW1wbGF0ZS5hcHBseShudWxsLCBhcmdzKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBwcmVmZXItc3ByZWFkXG5cbiAgICAgICAgdGhpcy5hZGRQbGFpbk1lc3NhZ2UoeyBtZXNzYWdlLCBhY3Rpb25JZCB9KTtcblxuICAgICAgICBpZiAodGhpcy5nbG9iYWxMb2cpXG4gICAgICAgICAgICB0aGlzLmdsb2JhbExvZy5hZGRQbGFpbk1lc3NhZ2UoeyBtZXNzYWdlLCBhY3Rpb25JZCB9KTtcblxuICAgICAgICBpZiAodGhpcy5jYWxsYmFjayAmJiAhdGhpcy5faXNDb3B5aW5nKVxuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayhtZXNzYWdlLCBhY3Rpb25JZCk7XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFyICgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlSW5mb3MgPSBbXTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY29weUZyb20gKHdhcm5pbmdMb2c6IFdhcm5pbmdMb2cpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5faXNDb3B5aW5nID0gdHJ1ZTtcbiAgICAgICAgd2FybmluZ0xvZy5tZXNzYWdlcy5mb3JFYWNoKG1zZyA9PiB0aGlzLmFkZFdhcm5pbmcobXNnKSk7XG4gICAgICAgIHRoaXMuX2lzQ29weWluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlQWRkV2FybmluZ0NhbGxiYWNrIChtZXNzYWdlQnVzPzogTWVzc2FnZUJ1cyB8IG9iamVjdCwgdGVzdFJ1bj86IFRlc3RSdW4pOiBXYXJuaW5nTG9nQ2FsbGJhY2sge1xuICAgICAgICByZXR1cm4gYXN5bmMgKG1lc3NhZ2U6IHN0cmluZywgYWN0aW9uSWQ6IHN0cmluZyB8IG51bGwpID0+IHtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlQnVzICYmIG1lc3NhZ2VCdXMgaW5zdGFuY2VvZiBNZXNzYWdlQnVzKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2FybmluZyA9IHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgdGVzdFJ1bixcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uSWQsXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGF3YWl0IG1lc3NhZ2VCdXMuZW1pdCgnYmVmb3JlLXdhcm5pbmctYWRkJywgd2FybmluZyk7XG4gICAgICAgICAgICAgICAgYXdhaXQgbWVzc2FnZUJ1cy5lbWl0KCd3YXJuaW5nLWFkZCcsIHdhcm5pbmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn1cbiJdfQ==