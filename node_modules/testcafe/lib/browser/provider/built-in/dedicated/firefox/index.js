"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_family_1 = __importDefault(require("os-family"));
const base_1 = __importDefault(require("../base"));
const runtime_info_1 = __importDefault(require("./runtime-info"));
const config_1 = __importDefault(require("./config"));
const local_firefox_1 = require("./local-firefox");
const marionette_client_1 = __importDefault(require("./marionette-client"));
exports.default = Object.assign(Object.assign({}, base_1.default), { getConfig(name) {
        return (0, config_1.default)(name);
    },
    _getBrowserProtocolClient(runtimeInfo) {
        return runtimeInfo.marionetteClient;
    },
    async _createMarionetteClient(runtimeInfo) {
        try {
            const marionetteClient = new marionette_client_1.default(runtimeInfo.marionettePort, runtimeInfo);
            await marionetteClient.connect();
            return marionetteClient;
        }
        catch (e) {
            return null;
        }
    },
    async openBrowser(browserId, pageUrl, config, { disableMultipleWindows }) {
        const runtimeInfo = await (0, runtime_info_1.default)(config);
        runtimeInfo.browserName = this._getBrowserName();
        runtimeInfo.browserId = browserId;
        runtimeInfo.windowDescriptors = {};
        await (0, local_firefox_1.start)(pageUrl, runtimeInfo);
        await this.waitForConnectionReady(runtimeInfo.browserId);
        if (!disableMultipleWindows)
            runtimeInfo.activeWindowId = this.calculateWindowId();
        if (runtimeInfo.marionettePort)
            runtimeInfo.marionetteClient = await this._createMarionetteClient(runtimeInfo);
        this.openedBrowsers[browserId] = runtimeInfo;
    },
    async closeBrowser(browserId) {
        const runtimeInfo = this.openedBrowsers[browserId];
        const { config, marionetteClient } = runtimeInfo;
        if (config.headless)
            await marionetteClient.quit();
        else
            await this.closeLocalBrowser(browserId);
        if (os_family_1.default.mac && !config.headless)
            await (0, local_firefox_1.stop)(runtimeInfo);
        if (runtimeInfo.tempProfileDir)
            await runtimeInfo.tempProfileDir.dispose();
        delete this.openedBrowsers[browserId];
    },
    async resizeWindow(browserId, width, height) {
        const { marionetteClient } = this.openedBrowsers[browserId];
        await marionetteClient.setWindowSize(width, height);
    },
    async getVideoFrameData(browserId) {
        const { marionetteClient } = this.openedBrowsers[browserId];
        return marionetteClient.getScreenshotData();
    },
    async hasCustomActionForBrowser(browserId) {
        const { config, marionetteClient } = this.openedBrowsers[browserId];
        return {
            hasCloseBrowser: true,
            hasTakeScreenshot: !!marionetteClient,
            hasChromelessScreenshots: !!marionetteClient,
            hasGetVideoFrameData: !!marionetteClient,
            hasResizeWindow: !!marionetteClient && config.headless,
            hasMaximizeWindow: !!marionetteClient && config.headless,
            hasCanResizeWindowToDimensions: false,
        };
    } });
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYnJvd3Nlci9wcm92aWRlci9idWlsdC1pbi9kZWRpY2F0ZWQvZmlyZWZveC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDBEQUEyQjtBQUMzQixtREFBNEM7QUFDNUMsa0VBQTRDO0FBQzVDLHNEQUFpQztBQUNqQyxtREFBdUY7QUFDdkYsNEVBQW1EO0FBR25ELGtEQUNPLGNBQXFCLEtBRXhCLFNBQVMsQ0FBRSxJQUFJO1FBQ1gsT0FBTyxJQUFBLGdCQUFTLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELHlCQUF5QixDQUFFLFdBQVc7UUFDbEMsT0FBTyxXQUFXLENBQUMsZ0JBQWdCLENBQUM7SUFDeEMsQ0FBQztJQUVELEtBQUssQ0FBQyx1QkFBdUIsQ0FBRSxXQUFXO1FBQ3RDLElBQUk7WUFDQSxNQUFNLGdCQUFnQixHQUFHLElBQUksMkJBQWdCLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUV2RixNQUFNLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRWpDLE9BQU8sZ0JBQWdCLENBQUM7U0FDM0I7UUFDRCxPQUFPLENBQUMsRUFBRTtZQUNOLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7SUFDTCxDQUFDO0lBRUQsS0FBSyxDQUFDLFdBQVcsQ0FBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLHNCQUFzQixFQUFFO1FBQ3JFLE1BQU0sV0FBVyxHQUFHLE1BQU0sSUFBQSxzQkFBYyxFQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRWpELFdBQVcsQ0FBQyxXQUFXLEdBQVMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZELFdBQVcsQ0FBQyxTQUFTLEdBQVcsU0FBUyxDQUFDO1FBQzFDLFdBQVcsQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFFbkMsTUFBTSxJQUFBLHFCQUFpQixFQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztRQUU5QyxNQUFNLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFekQsSUFBSSxDQUFDLHNCQUFzQjtZQUN2QixXQUFXLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBRTFELElBQUksV0FBVyxDQUFDLGNBQWM7WUFDMUIsV0FBVyxDQUFDLGdCQUFnQixHQUFHLE1BQU0sSUFBSSxDQUFDLHVCQUF1QixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRW5GLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEdBQUcsV0FBVyxDQUFDO0lBQ2pELENBQUM7SUFFRCxLQUFLLENBQUMsWUFBWSxDQUFFLFNBQVM7UUFDekIsTUFBTSxXQUFXLEdBQW9CLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEUsTUFBTSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxHQUFHLFdBQVcsQ0FBQztRQUVqRCxJQUFJLE1BQU0sQ0FBQyxRQUFRO1lBQ2YsTUFBTSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7WUFFOUIsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFNUMsSUFBSSxtQkFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRO1lBQzFCLE1BQU0sSUFBQSxvQkFBZ0IsRUFBQyxXQUFXLENBQUMsQ0FBQztRQUV4QyxJQUFJLFdBQVcsQ0FBQyxjQUFjO1lBQzFCLE1BQU0sV0FBVyxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUUvQyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELEtBQUssQ0FBQyxZQUFZLENBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNO1FBQ3hDLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFNUQsTUFBTSxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCxLQUFLLENBQUMsaUJBQWlCLENBQUUsU0FBUztRQUM5QixNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTVELE9BQU8sZ0JBQWdCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBRUQsS0FBSyxDQUFDLHlCQUF5QixDQUFFLFNBQVM7UUFDdEMsTUFBTSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFcEUsT0FBTztZQUNILGVBQWUsRUFBaUIsSUFBSTtZQUNwQyxpQkFBaUIsRUFBZSxDQUFDLENBQUMsZ0JBQWdCO1lBQ2xELHdCQUF3QixFQUFRLENBQUMsQ0FBQyxnQkFBZ0I7WUFDbEQsb0JBQW9CLEVBQVksQ0FBQyxDQUFDLGdCQUFnQjtZQUNsRCxlQUFlLEVBQWlCLENBQUMsQ0FBQyxnQkFBZ0IsSUFBSSxNQUFNLENBQUMsUUFBUTtZQUNyRSxpQkFBaUIsRUFBZSxDQUFDLENBQUMsZ0JBQWdCLElBQUksTUFBTSxDQUFDLFFBQVE7WUFDckUsOEJBQThCLEVBQUUsS0FBSztTQUN4QyxDQUFDO0lBQ04sQ0FBQyxJQUNIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE9TIGZyb20gJ29zLWZhbWlseSc7XG5pbXBvcnQgZGVkaWNhdGVkUHJvdmlkZXJCYXNlIGZyb20gJy4uL2Jhc2UnO1xuaW1wb3J0IGdldFJ1bnRpbWVJbmZvIGZyb20gJy4vcnVudGltZS1pbmZvJztcbmltcG9ydCBnZXRDb25maWcgZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHsgc3RhcnQgYXMgc3RhcnRMb2NhbEZpcmVmb3gsIHN0b3AgYXMgc3RvcExvY2FsRmlyZWZveCB9IGZyb20gJy4vbG9jYWwtZmlyZWZveCc7XG5pbXBvcnQgTWFyaW9uZXR0ZUNsaWVudCBmcm9tICcuL21hcmlvbmV0dGUtY2xpZW50JztcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgLi4uZGVkaWNhdGVkUHJvdmlkZXJCYXNlLFxuXG4gICAgZ2V0Q29uZmlnIChuYW1lKSB7XG4gICAgICAgIHJldHVybiBnZXRDb25maWcobmFtZSk7XG4gICAgfSxcblxuICAgIF9nZXRCcm93c2VyUHJvdG9jb2xDbGllbnQgKHJ1bnRpbWVJbmZvKSB7XG4gICAgICAgIHJldHVybiBydW50aW1lSW5mby5tYXJpb25ldHRlQ2xpZW50O1xuICAgIH0sXG5cbiAgICBhc3luYyBfY3JlYXRlTWFyaW9uZXR0ZUNsaWVudCAocnVudGltZUluZm8pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IG1hcmlvbmV0dGVDbGllbnQgPSBuZXcgTWFyaW9uZXR0ZUNsaWVudChydW50aW1lSW5mby5tYXJpb25ldHRlUG9ydCwgcnVudGltZUluZm8pO1xuXG4gICAgICAgICAgICBhd2FpdCBtYXJpb25ldHRlQ2xpZW50LmNvbm5lY3QoKTtcblxuICAgICAgICAgICAgcmV0dXJuIG1hcmlvbmV0dGVDbGllbnQ7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGFzeW5jIG9wZW5Ccm93c2VyIChicm93c2VySWQsIHBhZ2VVcmwsIGNvbmZpZywgeyBkaXNhYmxlTXVsdGlwbGVXaW5kb3dzIH0pIHtcbiAgICAgICAgY29uc3QgcnVudGltZUluZm8gPSBhd2FpdCBnZXRSdW50aW1lSW5mbyhjb25maWcpO1xuXG4gICAgICAgIHJ1bnRpbWVJbmZvLmJyb3dzZXJOYW1lICAgICAgID0gdGhpcy5fZ2V0QnJvd3Nlck5hbWUoKTtcbiAgICAgICAgcnVudGltZUluZm8uYnJvd3NlcklkICAgICAgICAgPSBicm93c2VySWQ7XG4gICAgICAgIHJ1bnRpbWVJbmZvLndpbmRvd0Rlc2NyaXB0b3JzID0ge307XG5cbiAgICAgICAgYXdhaXQgc3RhcnRMb2NhbEZpcmVmb3gocGFnZVVybCwgcnVudGltZUluZm8pO1xuXG4gICAgICAgIGF3YWl0IHRoaXMud2FpdEZvckNvbm5lY3Rpb25SZWFkeShydW50aW1lSW5mby5icm93c2VySWQpO1xuXG4gICAgICAgIGlmICghZGlzYWJsZU11bHRpcGxlV2luZG93cylcbiAgICAgICAgICAgIHJ1bnRpbWVJbmZvLmFjdGl2ZVdpbmRvd0lkID0gdGhpcy5jYWxjdWxhdGVXaW5kb3dJZCgpO1xuXG4gICAgICAgIGlmIChydW50aW1lSW5mby5tYXJpb25ldHRlUG9ydClcbiAgICAgICAgICAgIHJ1bnRpbWVJbmZvLm1hcmlvbmV0dGVDbGllbnQgPSBhd2FpdCB0aGlzLl9jcmVhdGVNYXJpb25ldHRlQ2xpZW50KHJ1bnRpbWVJbmZvKTtcblxuICAgICAgICB0aGlzLm9wZW5lZEJyb3dzZXJzW2Jyb3dzZXJJZF0gPSBydW50aW1lSW5mbztcbiAgICB9LFxuXG4gICAgYXN5bmMgY2xvc2VCcm93c2VyIChicm93c2VySWQpIHtcbiAgICAgICAgY29uc3QgcnVudGltZUluZm8gICAgICAgICAgICAgICAgICA9IHRoaXMub3BlbmVkQnJvd3NlcnNbYnJvd3NlcklkXTtcbiAgICAgICAgY29uc3QgeyBjb25maWcsIG1hcmlvbmV0dGVDbGllbnQgfSA9IHJ1bnRpbWVJbmZvO1xuXG4gICAgICAgIGlmIChjb25maWcuaGVhZGxlc3MpXG4gICAgICAgICAgICBhd2FpdCBtYXJpb25ldHRlQ2xpZW50LnF1aXQoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgYXdhaXQgdGhpcy5jbG9zZUxvY2FsQnJvd3Nlcihicm93c2VySWQpO1xuXG4gICAgICAgIGlmIChPUy5tYWMgJiYgIWNvbmZpZy5oZWFkbGVzcylcbiAgICAgICAgICAgIGF3YWl0IHN0b3BMb2NhbEZpcmVmb3gocnVudGltZUluZm8pO1xuXG4gICAgICAgIGlmIChydW50aW1lSW5mby50ZW1wUHJvZmlsZURpcilcbiAgICAgICAgICAgIGF3YWl0IHJ1bnRpbWVJbmZvLnRlbXBQcm9maWxlRGlyLmRpc3Bvc2UoKTtcblxuICAgICAgICBkZWxldGUgdGhpcy5vcGVuZWRCcm93c2Vyc1ticm93c2VySWRdO1xuICAgIH0sXG5cbiAgICBhc3luYyByZXNpemVXaW5kb3cgKGJyb3dzZXJJZCwgd2lkdGgsIGhlaWdodCkge1xuICAgICAgICBjb25zdCB7IG1hcmlvbmV0dGVDbGllbnQgfSA9IHRoaXMub3BlbmVkQnJvd3NlcnNbYnJvd3NlcklkXTtcblxuICAgICAgICBhd2FpdCBtYXJpb25ldHRlQ2xpZW50LnNldFdpbmRvd1NpemUod2lkdGgsIGhlaWdodCk7XG4gICAgfSxcblxuICAgIGFzeW5jIGdldFZpZGVvRnJhbWVEYXRhIChicm93c2VySWQpIHtcbiAgICAgICAgY29uc3QgeyBtYXJpb25ldHRlQ2xpZW50IH0gPSB0aGlzLm9wZW5lZEJyb3dzZXJzW2Jyb3dzZXJJZF07XG5cbiAgICAgICAgcmV0dXJuIG1hcmlvbmV0dGVDbGllbnQuZ2V0U2NyZWVuc2hvdERhdGEoKTtcbiAgICB9LFxuXG4gICAgYXN5bmMgaGFzQ3VzdG9tQWN0aW9uRm9yQnJvd3NlciAoYnJvd3NlcklkKSB7XG4gICAgICAgIGNvbnN0IHsgY29uZmlnLCBtYXJpb25ldHRlQ2xpZW50IH0gPSB0aGlzLm9wZW5lZEJyb3dzZXJzW2Jyb3dzZXJJZF07XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhhc0Nsb3NlQnJvd3NlcjogICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgIGhhc1Rha2VTY3JlZW5zaG90OiAgICAgICAgICAgICAgISFtYXJpb25ldHRlQ2xpZW50LFxuICAgICAgICAgICAgaGFzQ2hyb21lbGVzc1NjcmVlbnNob3RzOiAgICAgICAhIW1hcmlvbmV0dGVDbGllbnQsXG4gICAgICAgICAgICBoYXNHZXRWaWRlb0ZyYW1lRGF0YTogICAgICAgICAgICEhbWFyaW9uZXR0ZUNsaWVudCxcbiAgICAgICAgICAgIGhhc1Jlc2l6ZVdpbmRvdzogICAgICAgICAgICAgICAgISFtYXJpb25ldHRlQ2xpZW50ICYmIGNvbmZpZy5oZWFkbGVzcyxcbiAgICAgICAgICAgIGhhc01heGltaXplV2luZG93OiAgICAgICAgICAgICAgISFtYXJpb25ldHRlQ2xpZW50ICYmIGNvbmZpZy5oZWFkbGVzcyxcbiAgICAgICAgICAgIGhhc0NhblJlc2l6ZVdpbmRvd1RvRGltZW5zaW9uczogZmFsc2UsXG4gICAgICAgIH07XG4gICAgfSxcbn07XG4iXX0=