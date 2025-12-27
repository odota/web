"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const testcafe_browser_tools_1 = require("testcafe-browser-tools");
const warning_message_1 = __importDefault(require("../../../notifications/warning-message"));
const DEBUG_LOGGER = (0, debug_1.default)('testcafe:browser:provider:built-in:remote');
exports.default = {
    canDetectLocalBrowsers: true,
    localBrowsersFlags: {},
    async openBrowser(browserId) {
        if (!this.canDetectLocalBrowsers)
            return;
        await this.waitForConnectionReady(browserId);
        let localBrowserWindow = null;
        try {
            localBrowserWindow = await (0, testcafe_browser_tools_1.findWindow)(browserId);
        }
        catch (err) {
            // NOTE: We can suppress the error here since we can just disable window manipulation functions
            // when the browser is truly remote and we cannot find a local window descriptor
            DEBUG_LOGGER(err);
        }
        this.localBrowsersFlags[browserId] = localBrowserWindow !== null;
    },
    async closeBrowser(browserId) {
        delete this.localBrowsersFlags[browserId];
    },
    async isLocalBrowser(browserId) {
        // NOTE:
        // if browserId is not specified, then it means that a browser is not yet started
        // we may assume that it's not local, because
        // otherwise we'll just disable window manipulation function's after the browser will be started
        return !!browserId && this.localBrowsersFlags[browserId];
    },
    // NOTE: we must try to do a local screenshot or resize, if browser is accessible, and emit warning otherwise
    async hasCustomActionForBrowser(browserId) {
        const isLocalBrowser = this.localBrowsersFlags[browserId];
        return {
            hasCloseBrowser: true,
            hasResizeWindow: !isLocalBrowser,
            hasMaximizeWindow: !isLocalBrowser,
            hasTakeScreenshot: !isLocalBrowser,
            hasCanResizeWindowToDimensions: !isLocalBrowser,
        };
    },
    async takeScreenshot(browserId) {
        this.reportWarning(browserId, warning_message_1.default.browserManipulationsOnRemoteBrowser);
    },
    async resizeWindow(browserId) {
        this.reportWarning(browserId, warning_message_1.default.browserManipulationsOnRemoteBrowser);
    },
    async maximizeWindow(browserId) {
        this.reportWarning(browserId, warning_message_1.default.browserManipulationsOnRemoteBrowser);
    },
};
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jyb3dzZXIvcHJvdmlkZXIvYnVpbHQtaW4vcmVtb3RlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0RBQTBCO0FBQzFCLG1FQUFvRDtBQUNwRCw2RkFBcUU7QUFHckUsTUFBTSxZQUFZLEdBQUcsSUFBQSxlQUFLLEVBQUMsMkNBQTJDLENBQUMsQ0FBQztBQUV4RSxrQkFBZTtJQUNYLHNCQUFzQixFQUFFLElBQUk7SUFFNUIsa0JBQWtCLEVBQUUsRUFBRTtJQUV0QixLQUFLLENBQUMsV0FBVyxDQUFFLFNBQVM7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBc0I7WUFDNUIsT0FBTztRQUVYLE1BQU0sSUFBSSxDQUFDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTdDLElBQUksa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1FBRTlCLElBQUk7WUFDQSxrQkFBa0IsR0FBRyxNQUFNLElBQUEsbUNBQVUsRUFBQyxTQUFTLENBQUMsQ0FBQztTQUNwRDtRQUNELE9BQU8sR0FBRyxFQUFFO1lBQ1IsK0ZBQStGO1lBQy9GLGdGQUFnRjtZQUNoRixZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDckI7UUFFRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLEdBQUcsa0JBQWtCLEtBQUssSUFBSSxDQUFDO0lBQ3JFLENBQUM7SUFFRCxLQUFLLENBQUMsWUFBWSxDQUFFLFNBQVM7UUFDekIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELEtBQUssQ0FBQyxjQUFjLENBQUUsU0FBUztRQUMzQixRQUFRO1FBQ1IsaUZBQWlGO1FBQ2pGLDZDQUE2QztRQUM3QyxnR0FBZ0c7UUFDaEcsT0FBTyxDQUFDLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsNkdBQTZHO0lBQzdHLEtBQUssQ0FBQyx5QkFBeUIsQ0FBRSxTQUFTO1FBQ3RDLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUUxRCxPQUFPO1lBQ0gsZUFBZSxFQUFpQixJQUFJO1lBQ3BDLGVBQWUsRUFBaUIsQ0FBQyxjQUFjO1lBQy9DLGlCQUFpQixFQUFlLENBQUMsY0FBYztZQUMvQyxpQkFBaUIsRUFBZSxDQUFDLGNBQWM7WUFDL0MsOEJBQThCLEVBQUUsQ0FBQyxjQUFjO1NBQ2xELENBQUM7SUFDTixDQUFDO0lBRUQsS0FBSyxDQUFDLGNBQWMsQ0FBRSxTQUFTO1FBQzNCLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLHlCQUFlLENBQUMsbUNBQW1DLENBQUMsQ0FBQztJQUN2RixDQUFDO0lBRUQsS0FBSyxDQUFDLFlBQVksQ0FBRSxTQUFTO1FBQ3pCLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLHlCQUFlLENBQUMsbUNBQW1DLENBQUMsQ0FBQztJQUN2RixDQUFDO0lBRUQsS0FBSyxDQUFDLGNBQWMsQ0FBRSxTQUFTO1FBQzNCLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLHlCQUFlLENBQUMsbUNBQW1DLENBQUMsQ0FBQztJQUN2RixDQUFDO0NBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5pbXBvcnQgeyBmaW5kV2luZG93IH0gZnJvbSAndGVzdGNhZmUtYnJvd3Nlci10b29scyc7XG5pbXBvcnQgV0FSTklOR19NRVNTQUdFIGZyb20gJy4uLy4uLy4uL25vdGlmaWNhdGlvbnMvd2FybmluZy1tZXNzYWdlJztcblxuXG5jb25zdCBERUJVR19MT0dHRVIgPSBkZWJ1ZygndGVzdGNhZmU6YnJvd3Nlcjpwcm92aWRlcjpidWlsdC1pbjpyZW1vdGUnKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGNhbkRldGVjdExvY2FsQnJvd3NlcnM6IHRydWUsXG5cbiAgICBsb2NhbEJyb3dzZXJzRmxhZ3M6IHt9LFxuXG4gICAgYXN5bmMgb3BlbkJyb3dzZXIgKGJyb3dzZXJJZCkge1xuICAgICAgICBpZiAoIXRoaXMuY2FuRGV0ZWN0TG9jYWxCcm93c2VycylcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBhd2FpdCB0aGlzLndhaXRGb3JDb25uZWN0aW9uUmVhZHkoYnJvd3NlcklkKTtcblxuICAgICAgICBsZXQgbG9jYWxCcm93c2VyV2luZG93ID0gbnVsbDtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbG9jYWxCcm93c2VyV2luZG93ID0gYXdhaXQgZmluZFdpbmRvdyhicm93c2VySWQpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIC8vIE5PVEU6IFdlIGNhbiBzdXBwcmVzcyB0aGUgZXJyb3IgaGVyZSBzaW5jZSB3ZSBjYW4ganVzdCBkaXNhYmxlIHdpbmRvdyBtYW5pcHVsYXRpb24gZnVuY3Rpb25zXG4gICAgICAgICAgICAvLyB3aGVuIHRoZSBicm93c2VyIGlzIHRydWx5IHJlbW90ZSBhbmQgd2UgY2Fubm90IGZpbmQgYSBsb2NhbCB3aW5kb3cgZGVzY3JpcHRvclxuICAgICAgICAgICAgREVCVUdfTE9HR0VSKGVycik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxvY2FsQnJvd3NlcnNGbGFnc1ticm93c2VySWRdID0gbG9jYWxCcm93c2VyV2luZG93ICE9PSBudWxsO1xuICAgIH0sXG5cbiAgICBhc3luYyBjbG9zZUJyb3dzZXIgKGJyb3dzZXJJZCkge1xuICAgICAgICBkZWxldGUgdGhpcy5sb2NhbEJyb3dzZXJzRmxhZ3NbYnJvd3NlcklkXTtcbiAgICB9LFxuXG4gICAgYXN5bmMgaXNMb2NhbEJyb3dzZXIgKGJyb3dzZXJJZCkge1xuICAgICAgICAvLyBOT1RFOlxuICAgICAgICAvLyBpZiBicm93c2VySWQgaXMgbm90IHNwZWNpZmllZCwgdGhlbiBpdCBtZWFucyB0aGF0IGEgYnJvd3NlciBpcyBub3QgeWV0IHN0YXJ0ZWRcbiAgICAgICAgLy8gd2UgbWF5IGFzc3VtZSB0aGF0IGl0J3Mgbm90IGxvY2FsLCBiZWNhdXNlXG4gICAgICAgIC8vIG90aGVyd2lzZSB3ZSdsbCBqdXN0IGRpc2FibGUgd2luZG93IG1hbmlwdWxhdGlvbiBmdW5jdGlvbidzIGFmdGVyIHRoZSBicm93c2VyIHdpbGwgYmUgc3RhcnRlZFxuICAgICAgICByZXR1cm4gISFicm93c2VySWQgJiYgdGhpcy5sb2NhbEJyb3dzZXJzRmxhZ3NbYnJvd3NlcklkXTtcbiAgICB9LFxuXG4gICAgLy8gTk9URTogd2UgbXVzdCB0cnkgdG8gZG8gYSBsb2NhbCBzY3JlZW5zaG90IG9yIHJlc2l6ZSwgaWYgYnJvd3NlciBpcyBhY2Nlc3NpYmxlLCBhbmQgZW1pdCB3YXJuaW5nIG90aGVyd2lzZVxuICAgIGFzeW5jIGhhc0N1c3RvbUFjdGlvbkZvckJyb3dzZXIgKGJyb3dzZXJJZCkge1xuICAgICAgICBjb25zdCBpc0xvY2FsQnJvd3NlciA9IHRoaXMubG9jYWxCcm93c2Vyc0ZsYWdzW2Jyb3dzZXJJZF07XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhhc0Nsb3NlQnJvd3NlcjogICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgIGhhc1Jlc2l6ZVdpbmRvdzogICAgICAgICAgICAgICAgIWlzTG9jYWxCcm93c2VyLFxuICAgICAgICAgICAgaGFzTWF4aW1pemVXaW5kb3c6ICAgICAgICAgICAgICAhaXNMb2NhbEJyb3dzZXIsXG4gICAgICAgICAgICBoYXNUYWtlU2NyZWVuc2hvdDogICAgICAgICAgICAgICFpc0xvY2FsQnJvd3NlcixcbiAgICAgICAgICAgIGhhc0NhblJlc2l6ZVdpbmRvd1RvRGltZW5zaW9uczogIWlzTG9jYWxCcm93c2VyLFxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBhc3luYyB0YWtlU2NyZWVuc2hvdCAoYnJvd3NlcklkKSB7XG4gICAgICAgIHRoaXMucmVwb3J0V2FybmluZyhicm93c2VySWQsIFdBUk5JTkdfTUVTU0FHRS5icm93c2VyTWFuaXB1bGF0aW9uc09uUmVtb3RlQnJvd3Nlcik7XG4gICAgfSxcblxuICAgIGFzeW5jIHJlc2l6ZVdpbmRvdyAoYnJvd3NlcklkKSB7XG4gICAgICAgIHRoaXMucmVwb3J0V2FybmluZyhicm93c2VySWQsIFdBUk5JTkdfTUVTU0FHRS5icm93c2VyTWFuaXB1bGF0aW9uc09uUmVtb3RlQnJvd3Nlcik7XG4gICAgfSxcblxuICAgIGFzeW5jIG1heGltaXplV2luZG93IChicm93c2VySWQpIHtcbiAgICAgICAgdGhpcy5yZXBvcnRXYXJuaW5nKGJyb3dzZXJJZCwgV0FSTklOR19NRVNTQUdFLmJyb3dzZXJNYW5pcHVsYXRpb25zT25SZW1vdGVCcm93c2VyKTtcbiAgICB9LFxufTtcbiJdfQ==