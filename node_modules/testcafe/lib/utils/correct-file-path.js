"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const sanitize_filename_1 = __importDefault(require("sanitize-filename"));
const lodash_1 = require("lodash");
function default_1(filePath, expectedExtention) {
    filePath = filePath.replace(new RegExp((0, lodash_1.escapeRegExp)(path_1.default.win32.sep), 'g'), path_1.default.posix.sep);
    const correctedPath = filePath
        .split(path_1.default.posix.sep)
        .filter((fragment, index) => index === 0 || !!fragment)
        .map(str => (0, sanitize_filename_1.default)(str))
        .join(path_1.default.sep);
    if (!expectedExtention)
        return correctedPath;
    const extentionRe = new RegExp((0, lodash_1.escapeRegExp)(expectedExtention));
    return extentionRe.test(correctedPath) ? correctedPath : `${correctedPath}.${expectedExtention}`;
}
exports.default = default_1;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ycmVjdC1maWxlLXBhdGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvY29ycmVjdC1maWxlLXBhdGguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxnREFBd0I7QUFDeEIsMEVBQWlEO0FBQ2pELG1DQUFrRDtBQUVsRCxtQkFBeUIsUUFBUSxFQUFFLGlCQUFpQjtJQUNoRCxRQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFBLHFCQUFRLEVBQUMsY0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxjQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXZGLE1BQU0sYUFBYSxHQUFHLFFBQVE7U0FDekIsS0FBSyxDQUFDLGNBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1NBQ3JCLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQztTQUN0RCxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFBLDJCQUFnQixFQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2pDLElBQUksQ0FBQyxjQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFcEIsSUFBSSxDQUFDLGlCQUFpQjtRQUNsQixPQUFPLGFBQWEsQ0FBQztJQUV6QixNQUFNLFdBQVcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFBLHFCQUFRLEVBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBRTVELE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxHQUFHLGFBQWEsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO0FBQ3JHLENBQUM7QUFmRCw0QkFlQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHNhbml0aXplRmlsZW5hbWUgZnJvbSAnc2FuaXRpemUtZmlsZW5hbWUnO1xuaW1wb3J0IHsgZXNjYXBlUmVnRXhwIGFzIGVzY2FwZVJlIH0gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGZpbGVQYXRoLCBleHBlY3RlZEV4dGVudGlvbikge1xuICAgIGZpbGVQYXRoID0gZmlsZVBhdGgucmVwbGFjZShuZXcgUmVnRXhwKGVzY2FwZVJlKHBhdGgud2luMzIuc2VwKSwgJ2cnKSwgcGF0aC5wb3NpeC5zZXApO1xuXG4gICAgY29uc3QgY29ycmVjdGVkUGF0aCA9IGZpbGVQYXRoXG4gICAgICAgIC5zcGxpdChwYXRoLnBvc2l4LnNlcClcbiAgICAgICAgLmZpbHRlcigoZnJhZ21lbnQsIGluZGV4KSA9PiBpbmRleCA9PT0gMCB8fCAhIWZyYWdtZW50KVxuICAgICAgICAubWFwKHN0ciA9PiBzYW5pdGl6ZUZpbGVuYW1lKHN0cikpXG4gICAgICAgIC5qb2luKHBhdGguc2VwKTtcblxuICAgIGlmICghZXhwZWN0ZWRFeHRlbnRpb24pXG4gICAgICAgIHJldHVybiBjb3JyZWN0ZWRQYXRoO1xuXG4gICAgY29uc3QgZXh0ZW50aW9uUmUgPSBuZXcgUmVnRXhwKGVzY2FwZVJlKGV4cGVjdGVkRXh0ZW50aW9uKSk7XG5cbiAgICByZXR1cm4gZXh0ZW50aW9uUmUudGVzdChjb3JyZWN0ZWRQYXRoKSA/IGNvcnJlY3RlZFBhdGggOiBgJHtjb3JyZWN0ZWRQYXRofS4ke2V4cGVjdGVkRXh0ZW50aW9ufWA7XG59XG4iXX0=