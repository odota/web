"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const lodash_1 = require("lodash");
const log_update_async_hook_1 = __importDefault(require("log-update-async-hook"));
const render_callsite_sync_1 = __importDefault(require("../utils/render-callsite-sync"));
const create_stack_filter_1 = __importDefault(require("../errors/create-stack-filter"));
exports.default = {
    messages: [],
    debugLogging: false,
    streamsOverridden: false,
    _overrideStream(stream) {
        const initialWrite = stream.write;
        stream.write = (chunk, encoding, cb) => {
            if (this.debugLogging)
                initialWrite.call(stream, chunk, encoding, cb);
            else {
                this.debugLogging = true;
                log_update_async_hook_1.default.clear();
                log_update_async_hook_1.default.done();
                initialWrite.call(stream, chunk, encoding, cb);
                setTimeout(() => this._showAllBreakpoints(), 0);
                this.debugLogging = false;
            }
        };
    },
    _overrideStreams() {
        this._overrideStream(process.stdout);
        this._overrideStream(process.stderr);
        this.streamsOverridden = true;
    },
    _getMessageAsString() {
        let string = '';
        for (const message of this.messages)
            string += message.frame;
        return string;
    },
    _showAllBreakpoints() {
        if (!this.messages.length)
            return;
        this.debugLogging = true;
        (0, log_update_async_hook_1.default)(this._getMessageAsString());
        this.debugLogging = false;
    },
    showBreakpoint(testRunId, userAgent, callsite, testError) {
        if (!this.streamsOverridden)
            this._overrideStreams();
        const callsiteStr = (0, render_callsite_sync_1.default)(callsite, {
            frameSize: 1,
            stackFilter: (0, create_stack_filter_1.default)(Error.stackTraceLimit),
            stack: false,
        });
        const frame = `\n` +
            `----\n` +
            `${userAgent}\n` +
            chalk_1.default.yellow(testError ? 'DEBUGGER PAUSE ON FAILED TEST:' : 'DEBUGGER PAUSE:') +
            `${testError ? `\n${testError}` : ''}` +
            `${!testError && callsiteStr ? `\n${callsiteStr}` : ''}` +
            '\n' +
            `----\n`;
        const message = { testRunId, frame };
        const index = (0, lodash_1.findIndex)(this.messages, { testRunId });
        if (index === -1)
            this.messages.push(message);
        else
            this.messages[index] = message;
        this._showAllBreakpoints();
    },
    hideBreakpoint(testRunId) {
        const index = (0, lodash_1.findIndex)(this.messages, { testRunId });
        if (index !== -1)
            this.messages.splice(index, 1);
        this._showAllBreakpoints();
    },
};
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWctbG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL25vdGlmaWNhdGlvbnMvZGVidWctbG9nZ2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0RBQTBCO0FBQzFCLG1DQUFtQztBQUNuQyxrRkFBOEM7QUFDOUMseUZBQStEO0FBQy9ELHdGQUE4RDtBQUU5RCxrQkFBZTtJQUNYLFFBQVEsRUFBRSxFQUFFO0lBRVosWUFBWSxFQUFFLEtBQUs7SUFFbkIsaUJBQWlCLEVBQUUsS0FBSztJQUV4QixlQUFlLENBQUUsTUFBTTtRQUNuQixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBRWxDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxFQUFFO1lBQ25DLElBQUksSUFBSSxDQUFDLFlBQVk7Z0JBQ2pCLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7aUJBQzlDO2dCQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO2dCQUV6QiwrQkFBUyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNsQiwrQkFBUyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUVqQixZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUUvQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBRWhELElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2FBQzdCO1FBQ0wsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUVELGdCQUFnQjtRQUNaLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXJDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7SUFDbEMsQ0FBQztJQUVELG1CQUFtQjtRQUNmLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVoQixLQUFLLE1BQU0sT0FBTyxJQUFJLElBQUksQ0FBQyxRQUFRO1lBQy9CLE1BQU0sSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDO1FBRTVCLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxtQkFBbUI7UUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNO1lBQ3JCLE9BQU87UUFFWCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFBLCtCQUFTLEVBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUM5QixDQUFDO0lBRUQsY0FBYyxDQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFNBQVM7UUFDckQsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUI7WUFDdkIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFFNUIsTUFBTSxXQUFXLEdBQUcsSUFBQSw4QkFBa0IsRUFBQyxRQUFRLEVBQUU7WUFDN0MsU0FBUyxFQUFJLENBQUM7WUFDZCxXQUFXLEVBQUUsSUFBQSw2QkFBaUIsRUFBQyxLQUFLLENBQUMsZUFBZSxDQUFDO1lBQ3JELEtBQUssRUFBUSxLQUFLO1NBQ3JCLENBQUMsQ0FBQztRQUVILE1BQU0sS0FBSyxHQUFHLElBQUk7WUFDSixRQUFRO1lBQ1IsR0FBRyxTQUFTLElBQUk7WUFDaEIsZUFBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLGdDQUFnQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQztZQUM5RSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3RDLEdBQUcsQ0FBQyxTQUFTLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDeEQsSUFBSTtZQUNKLFFBQVEsQ0FBQztRQUV2QixNQUFNLE9BQU8sR0FBRyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQztRQUNyQyxNQUFNLEtBQUssR0FBSyxJQUFBLGtCQUFTLEVBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFFeEQsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDO1lBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7O1lBRTVCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDO1FBRW5DLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCxjQUFjLENBQUUsU0FBUztRQUNyQixNQUFNLEtBQUssR0FBRyxJQUFBLGtCQUFTLEVBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFFdEQsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDO1lBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRW5DLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQy9CLENBQUM7Q0FDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJztcbmltcG9ydCB7IGZpbmRJbmRleCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgbG9nVXBkYXRlIGZyb20gJ2xvZy11cGRhdGUtYXN5bmMtaG9vayc7XG5pbXBvcnQgcmVuZGVyQ2FsbHNpdGVTeW5jIGZyb20gJy4uL3V0aWxzL3JlbmRlci1jYWxsc2l0ZS1zeW5jJztcbmltcG9ydCBjcmVhdGVTdGFja0ZpbHRlciBmcm9tICcuLi9lcnJvcnMvY3JlYXRlLXN0YWNrLWZpbHRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBtZXNzYWdlczogW10sXG5cbiAgICBkZWJ1Z0xvZ2dpbmc6IGZhbHNlLFxuXG4gICAgc3RyZWFtc092ZXJyaWRkZW46IGZhbHNlLFxuXG4gICAgX292ZXJyaWRlU3RyZWFtIChzdHJlYW0pIHtcbiAgICAgICAgY29uc3QgaW5pdGlhbFdyaXRlID0gc3RyZWFtLndyaXRlO1xuXG4gICAgICAgIHN0cmVhbS53cml0ZSA9IChjaHVuaywgZW5jb2RpbmcsIGNiKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5kZWJ1Z0xvZ2dpbmcpXG4gICAgICAgICAgICAgICAgaW5pdGlhbFdyaXRlLmNhbGwoc3RyZWFtLCBjaHVuaywgZW5jb2RpbmcsIGNiKTtcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVidWdMb2dnaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIGxvZ1VwZGF0ZS5jbGVhcigpO1xuICAgICAgICAgICAgICAgIGxvZ1VwZGF0ZS5kb25lKCk7XG5cbiAgICAgICAgICAgICAgICBpbml0aWFsV3JpdGUuY2FsbChzdHJlYW0sIGNodW5rLCBlbmNvZGluZywgY2IpO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLl9zaG93QWxsQnJlYWtwb2ludHMoKSwgMCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRlYnVnTG9nZ2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBfb3ZlcnJpZGVTdHJlYW1zICgpIHtcbiAgICAgICAgdGhpcy5fb3ZlcnJpZGVTdHJlYW0ocHJvY2Vzcy5zdGRvdXQpO1xuICAgICAgICB0aGlzLl9vdmVycmlkZVN0cmVhbShwcm9jZXNzLnN0ZGVycik7XG5cbiAgICAgICAgdGhpcy5zdHJlYW1zT3ZlcnJpZGRlbiA9IHRydWU7XG4gICAgfSxcblxuICAgIF9nZXRNZXNzYWdlQXNTdHJpbmcgKCkge1xuICAgICAgICBsZXQgc3RyaW5nID0gJyc7XG5cbiAgICAgICAgZm9yIChjb25zdCBtZXNzYWdlIG9mIHRoaXMubWVzc2FnZXMpXG4gICAgICAgICAgICBzdHJpbmcgKz0gbWVzc2FnZS5mcmFtZTtcblxuICAgICAgICByZXR1cm4gc3RyaW5nO1xuICAgIH0sXG5cbiAgICBfc2hvd0FsbEJyZWFrcG9pbnRzICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1lc3NhZ2VzLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB0aGlzLmRlYnVnTG9nZ2luZyA9IHRydWU7XG4gICAgICAgIGxvZ1VwZGF0ZSh0aGlzLl9nZXRNZXNzYWdlQXNTdHJpbmcoKSk7XG4gICAgICAgIHRoaXMuZGVidWdMb2dnaW5nID0gZmFsc2U7XG4gICAgfSxcblxuICAgIHNob3dCcmVha3BvaW50ICh0ZXN0UnVuSWQsIHVzZXJBZ2VudCwgY2FsbHNpdGUsIHRlc3RFcnJvcikge1xuICAgICAgICBpZiAoIXRoaXMuc3RyZWFtc092ZXJyaWRkZW4pXG4gICAgICAgICAgICB0aGlzLl9vdmVycmlkZVN0cmVhbXMoKTtcblxuICAgICAgICBjb25zdCBjYWxsc2l0ZVN0ciA9IHJlbmRlckNhbGxzaXRlU3luYyhjYWxsc2l0ZSwge1xuICAgICAgICAgICAgZnJhbWVTaXplOiAgIDEsXG4gICAgICAgICAgICBzdGFja0ZpbHRlcjogY3JlYXRlU3RhY2tGaWx0ZXIoRXJyb3Iuc3RhY2tUcmFjZUxpbWl0KSxcbiAgICAgICAgICAgIHN0YWNrOiAgICAgICBmYWxzZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgZnJhbWUgPSBgXFxuYCArXG4gICAgICAgICAgICAgICAgICAgICAgYC0tLS1cXG5gICtcbiAgICAgICAgICAgICAgICAgICAgICBgJHt1c2VyQWdlbnR9XFxuYCArXG4gICAgICAgICAgICAgICAgICAgICAgY2hhbGsueWVsbG93KHRlc3RFcnJvciA/ICdERUJVR0dFUiBQQVVTRSBPTiBGQUlMRUQgVEVTVDonIDogJ0RFQlVHR0VSIFBBVVNFOicpICtcbiAgICAgICAgICAgICAgICAgICAgICBgJHt0ZXN0RXJyb3IgPyBgXFxuJHt0ZXN0RXJyb3J9YCA6ICcnfWAgK1xuICAgICAgICAgICAgICAgICAgICAgIGAkeyF0ZXN0RXJyb3IgJiYgY2FsbHNpdGVTdHIgPyBgXFxuJHtjYWxsc2l0ZVN0cn1gIDogJyd9YCArXG4gICAgICAgICAgICAgICAgICAgICAgJ1xcbicgK1xuICAgICAgICAgICAgICAgICAgICAgIGAtLS0tXFxuYDtcblxuICAgICAgICBjb25zdCBtZXNzYWdlID0geyB0ZXN0UnVuSWQsIGZyYW1lIH07XG4gICAgICAgIGNvbnN0IGluZGV4ICAgPSBmaW5kSW5kZXgodGhpcy5tZXNzYWdlcywgeyB0ZXN0UnVuSWQgfSk7XG5cbiAgICAgICAgaWYgKGluZGV4ID09PSAtMSlcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZXMucHVzaChtZXNzYWdlKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlc1tpbmRleF0gPSBtZXNzYWdlO1xuXG4gICAgICAgIHRoaXMuX3Nob3dBbGxCcmVha3BvaW50cygpO1xuICAgIH0sXG5cbiAgICBoaWRlQnJlYWtwb2ludCAodGVzdFJ1bklkKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gZmluZEluZGV4KHRoaXMubWVzc2FnZXMsIHsgdGVzdFJ1bklkIH0pO1xuXG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VzLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICAgICAgdGhpcy5fc2hvd0FsbEJyZWFrcG9pbnRzKCk7XG4gICAgfSxcbn07XG4iXX0=