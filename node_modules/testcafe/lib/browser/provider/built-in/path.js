"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testcafe_browser_tools_1 = __importDefault(require("testcafe-browser-tools"));
const string_1 = require("../../../utils/string");
exports.default = {
    isMultiBrowser: true,
    async _handleString(str) {
        const args = (0, string_1.splitQuotedText)(str, ' ', '`"\'');
        const path = args.shift();
        const browserInfo = await testcafe_browser_tools_1.default.getBrowserInfo(path);
        if (!browserInfo)
            return null;
        const params = Object.assign({}, browserInfo);
        if (args.length)
            params.cmd = args.join(' ') + (params.cmd ? ' ' + params.cmd : '');
        return params;
    },
    async _handleJSON(str) {
        let params = null;
        try {
            params = JSON.parse(str);
        }
        catch (e) {
            return null;
        }
        if (!params.path)
            return null;
        const openParameters = await testcafe_browser_tools_1.default.getBrowserInfo(params.path);
        if (!openParameters)
            return null;
        if (params.cmd)
            openParameters.cmd = params.cmd;
        return openParameters;
    },
    async openBrowser(browserId, pageUrl, browserName) {
        const openParameters = await this._handleString(browserName) || await this._handleJSON(browserName);
        if (!openParameters)
            throw new Error('The specified browser name is not valid!');
        await testcafe_browser_tools_1.default.open(openParameters, pageUrl);
    },
    async isLocalBrowser() {
        return true;
    },
};
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9icm93c2VyL3Byb3ZpZGVyL2J1aWx0LWluL3BhdGguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvRkFBa0Q7QUFDbEQsa0RBQXdEO0FBRXhELGtCQUFlO0lBQ1gsY0FBYyxFQUFFLElBQUk7SUFFcEIsS0FBSyxDQUFDLGFBQWEsQ0FBRSxHQUFHO1FBQ3BCLE1BQU0sSUFBSSxHQUFHLElBQUEsd0JBQWUsRUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQy9DLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUUxQixNQUFNLFdBQVcsR0FBRyxNQUFNLGdDQUFZLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTVELElBQUksQ0FBQyxXQUFXO1lBQ1osT0FBTyxJQUFJLENBQUM7UUFFaEIsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFOUMsSUFBSSxJQUFJLENBQUMsTUFBTTtZQUNYLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUV2RSxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQsS0FBSyxDQUFDLFdBQVcsQ0FBRSxHQUFHO1FBQ2xCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztRQUVsQixJQUFJO1lBQ0EsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDNUI7UUFDRCxPQUFPLENBQUMsRUFBRTtZQUNOLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUk7WUFDWixPQUFPLElBQUksQ0FBQztRQUVoQixNQUFNLGNBQWMsR0FBRyxNQUFNLGdDQUFZLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV0RSxJQUFJLENBQUMsY0FBYztZQUNmLE9BQU8sSUFBSSxDQUFDO1FBRWhCLElBQUksTUFBTSxDQUFDLEdBQUc7WUFDVixjQUFjLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFFcEMsT0FBTyxjQUFjLENBQUM7SUFDMUIsQ0FBQztJQUVELEtBQUssQ0FBQyxXQUFXLENBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxXQUFXO1FBQzlDLE1BQU0sY0FBYyxHQUFHLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFcEcsSUFBSSxDQUFDLGNBQWM7WUFDZixNQUFNLElBQUksS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7UUFFaEUsTUFBTSxnQ0FBWSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELEtBQUssQ0FBQyxjQUFjO1FBQ2hCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Q0FDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJyb3dzZXJUb29scyBmcm9tICd0ZXN0Y2FmZS1icm93c2VyLXRvb2xzJztcbmltcG9ydCB7IHNwbGl0UXVvdGVkVGV4dCB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL3N0cmluZyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBpc011bHRpQnJvd3NlcjogdHJ1ZSxcblxuICAgIGFzeW5jIF9oYW5kbGVTdHJpbmcgKHN0cikge1xuICAgICAgICBjb25zdCBhcmdzID0gc3BsaXRRdW90ZWRUZXh0KHN0ciwgJyAnLCAnYFwiXFwnJyk7XG4gICAgICAgIGNvbnN0IHBhdGggPSBhcmdzLnNoaWZ0KCk7XG5cbiAgICAgICAgY29uc3QgYnJvd3NlckluZm8gPSBhd2FpdCBicm93c2VyVG9vbHMuZ2V0QnJvd3NlckluZm8ocGF0aCk7XG5cbiAgICAgICAgaWYgKCFicm93c2VySW5mbylcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIGJyb3dzZXJJbmZvKTtcblxuICAgICAgICBpZiAoYXJncy5sZW5ndGgpXG4gICAgICAgICAgICBwYXJhbXMuY21kID0gYXJncy5qb2luKCcgJykgKyAocGFyYW1zLmNtZCA/ICcgJyArIHBhcmFtcy5jbWQgOiAnJyk7XG5cbiAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICB9LFxuXG4gICAgYXN5bmMgX2hhbmRsZUpTT04gKHN0cikge1xuICAgICAgICBsZXQgcGFyYW1zID0gbnVsbDtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcGFyYW1zID0gSlNPTi5wYXJzZShzdHIpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcGFyYW1zLnBhdGgpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgICBjb25zdCBvcGVuUGFyYW1ldGVycyA9IGF3YWl0IGJyb3dzZXJUb29scy5nZXRCcm93c2VySW5mbyhwYXJhbXMucGF0aCk7XG5cbiAgICAgICAgaWYgKCFvcGVuUGFyYW1ldGVycylcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICAgIGlmIChwYXJhbXMuY21kKVxuICAgICAgICAgICAgb3BlblBhcmFtZXRlcnMuY21kID0gcGFyYW1zLmNtZDtcblxuICAgICAgICByZXR1cm4gb3BlblBhcmFtZXRlcnM7XG4gICAgfSxcblxuICAgIGFzeW5jIG9wZW5Ccm93c2VyIChicm93c2VySWQsIHBhZ2VVcmwsIGJyb3dzZXJOYW1lKSB7XG4gICAgICAgIGNvbnN0IG9wZW5QYXJhbWV0ZXJzID0gYXdhaXQgdGhpcy5faGFuZGxlU3RyaW5nKGJyb3dzZXJOYW1lKSB8fCBhd2FpdCB0aGlzLl9oYW5kbGVKU09OKGJyb3dzZXJOYW1lKTtcblxuICAgICAgICBpZiAoIW9wZW5QYXJhbWV0ZXJzKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgc3BlY2lmaWVkIGJyb3dzZXIgbmFtZSBpcyBub3QgdmFsaWQhJyk7XG5cbiAgICAgICAgYXdhaXQgYnJvd3NlclRvb2xzLm9wZW4ob3BlblBhcmFtZXRlcnMsIHBhZ2VVcmwpO1xuICAgIH0sXG5cbiAgICBhc3luYyBpc0xvY2FsQnJvd3NlciAoKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG59O1xuIl19