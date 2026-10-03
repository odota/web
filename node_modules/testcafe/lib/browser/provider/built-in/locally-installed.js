"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testcafe_browser_tools_1 = __importDefault(require("testcafe-browser-tools"));
exports.default = {
    isMultiBrowser: true,
    async openBrowser(browserId, pageUrl, browserName) {
        const args = browserName.split(' ');
        const alias = args.shift();
        const browserInfo = await testcafe_browser_tools_1.default.getBrowserInfo(alias);
        const openParameters = Object.assign({}, browserInfo);
        if (args.length)
            openParameters.cmd = args.join(' ') + (openParameters.cmd ? ' ' + openParameters.cmd : '');
        await testcafe_browser_tools_1.default.open(openParameters, pageUrl);
    },
    async isLocalBrowser() {
        return true;
    },
    async getBrowserList() {
        const installations = await testcafe_browser_tools_1.default.getInstallations();
        return Object.keys(installations);
    },
    async isValidBrowserName(browserName) {
        const browserNames = await this.getBrowserList();
        browserName = browserName.toLowerCase().split(' ')[0];
        return browserNames.indexOf(browserName) > -1;
    },
};
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxseS1pbnN0YWxsZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYnJvd3Nlci9wcm92aWRlci9idWlsdC1pbi9sb2NhbGx5LWluc3RhbGxlZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG9GQUFrRDtBQUVsRCxrQkFBZTtJQUNYLGNBQWMsRUFBRSxJQUFJO0lBRXBCLEtBQUssQ0FBQyxXQUFXLENBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxXQUFXO1FBQzlDLE1BQU0sSUFBSSxHQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRTNCLE1BQU0sV0FBVyxHQUFNLE1BQU0sZ0NBQVksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEUsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFdEQsSUFBSSxJQUFJLENBQUMsTUFBTTtZQUNYLGNBQWMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUUvRixNQUFNLGdDQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsS0FBSyxDQUFDLGNBQWM7UUFDaEIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELEtBQUssQ0FBQyxjQUFjO1FBQ2hCLE1BQU0sYUFBYSxHQUFHLE1BQU0sZ0NBQVksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRTVELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsS0FBSyxDQUFDLGtCQUFrQixDQUFFLFdBQVc7UUFDakMsTUFBTSxZQUFZLEdBQUcsTUFBTSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFakQsV0FBVyxHQUFHLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdEQsT0FBTyxZQUFZLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7Q0FDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJyb3dzZXJUb29scyBmcm9tICd0ZXN0Y2FmZS1icm93c2VyLXRvb2xzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGlzTXVsdGlCcm93c2VyOiB0cnVlLFxuXG4gICAgYXN5bmMgb3BlbkJyb3dzZXIgKGJyb3dzZXJJZCwgcGFnZVVybCwgYnJvd3Nlck5hbWUpIHtcbiAgICAgICAgY29uc3QgYXJncyAgPSBicm93c2VyTmFtZS5zcGxpdCgnICcpO1xuICAgICAgICBjb25zdCBhbGlhcyA9IGFyZ3Muc2hpZnQoKTtcblxuICAgICAgICBjb25zdCBicm93c2VySW5mbyAgICA9IGF3YWl0IGJyb3dzZXJUb29scy5nZXRCcm93c2VySW5mbyhhbGlhcyk7XG4gICAgICAgIGNvbnN0IG9wZW5QYXJhbWV0ZXJzID0gT2JqZWN0LmFzc2lnbih7fSwgYnJvd3NlckluZm8pO1xuXG4gICAgICAgIGlmIChhcmdzLmxlbmd0aClcbiAgICAgICAgICAgIG9wZW5QYXJhbWV0ZXJzLmNtZCA9IGFyZ3Muam9pbignICcpICsgKG9wZW5QYXJhbWV0ZXJzLmNtZCA/ICcgJyArIG9wZW5QYXJhbWV0ZXJzLmNtZCA6ICcnKTtcblxuICAgICAgICBhd2FpdCBicm93c2VyVG9vbHMub3BlbihvcGVuUGFyYW1ldGVycywgcGFnZVVybCk7XG4gICAgfSxcblxuICAgIGFzeW5jIGlzTG9jYWxCcm93c2VyICgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIGFzeW5jIGdldEJyb3dzZXJMaXN0ICgpIHtcbiAgICAgICAgY29uc3QgaW5zdGFsbGF0aW9ucyA9IGF3YWl0IGJyb3dzZXJUb29scy5nZXRJbnN0YWxsYXRpb25zKCk7XG5cbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGluc3RhbGxhdGlvbnMpO1xuICAgIH0sXG5cbiAgICBhc3luYyBpc1ZhbGlkQnJvd3Nlck5hbWUgKGJyb3dzZXJOYW1lKSB7XG4gICAgICAgIGNvbnN0IGJyb3dzZXJOYW1lcyA9IGF3YWl0IHRoaXMuZ2V0QnJvd3Nlckxpc3QoKTtcblxuICAgICAgICBicm93c2VyTmFtZSA9IGJyb3dzZXJOYW1lLnRvTG93ZXJDYXNlKCkuc3BsaXQoJyAnKVswXTtcblxuICAgICAgICByZXR1cm4gYnJvd3Nlck5hbWVzLmluZGV4T2YoYnJvd3Nlck5hbWUpID4gLTE7XG4gICAgfSxcbn07XG4iXX0=