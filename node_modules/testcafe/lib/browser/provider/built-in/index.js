"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("./path"));
const locally_installed_1 = __importDefault(require("./locally-installed"));
const remote_1 = __importDefault(require("./remote"));
const firefox_1 = __importDefault(require("./dedicated/firefox"));
const chrome_1 = __importDefault(require("./dedicated/chrome"));
const edge_1 = __importDefault(require("./dedicated/edge"));
exports.default = Object.assign({
    'locally-installed': locally_installed_1.default,
    'path': path_1.default,
    'remote': remote_1.default,
    'firefox': firefox_1.default,
    'chrome': chrome_1.default,
    'chromium': chrome_1.default,
    'chrome-canary': chrome_1.default,
    'edge': edge_1.default,
});
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYnJvd3Nlci9wcm92aWRlci9idWlsdC1pbi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtEQUF5QztBQUN6Qyw0RUFBa0U7QUFDbEUsc0RBQTZDO0FBQzdDLGtFQUFrRDtBQUNsRCxnRUFBZ0Q7QUFDaEQsNERBQTRDO0FBRTVDLGtCQUFlLE1BQU0sQ0FBQyxNQUFNLENBQ3hCO0lBQ0ksbUJBQW1CLEVBQUUsMkJBQStCO0lBQ3BELE1BQU0sRUFBZSxjQUFtQjtJQUN4QyxRQUFRLEVBQWEsZ0JBQXFCO0lBQzFDLFNBQVMsRUFBWSxpQkFBZTtJQUNwQyxRQUFRLEVBQWEsZ0JBQWM7SUFDbkMsVUFBVSxFQUFXLGdCQUFjO0lBQ25DLGVBQWUsRUFBTSxnQkFBYztJQUNuQyxNQUFNLEVBQWUsY0FBWTtDQUNwQyxDQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aEJyb3dzZXJQcm92aWRlciBmcm9tICcuL3BhdGgnO1xuaW1wb3J0IGxvY2FsbHlJbnN0YWxsZWRCcm93c2VyUHJvdmlkZXIgZnJvbSAnLi9sb2NhbGx5LWluc3RhbGxlZCc7XG5pbXBvcnQgcmVtb3RlQnJvd3NlclByb3ZpZGVyIGZyb20gJy4vcmVtb3RlJztcbmltcG9ydCBmaXJlZm94UHJvdmlkZXIgZnJvbSAnLi9kZWRpY2F0ZWQvZmlyZWZveCc7XG5pbXBvcnQgY2hyb21lUHJvdmlkZXIgZnJvbSAnLi9kZWRpY2F0ZWQvY2hyb21lJztcbmltcG9ydCBlZGdlUHJvdmlkZXIgZnJvbSAnLi9kZWRpY2F0ZWQvZWRnZSc7XG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oXG4gICAge1xuICAgICAgICAnbG9jYWxseS1pbnN0YWxsZWQnOiBsb2NhbGx5SW5zdGFsbGVkQnJvd3NlclByb3ZpZGVyLFxuICAgICAgICAncGF0aCc6ICAgICAgICAgICAgICBwYXRoQnJvd3NlclByb3ZpZGVyLFxuICAgICAgICAncmVtb3RlJzogICAgICAgICAgICByZW1vdGVCcm93c2VyUHJvdmlkZXIsXG4gICAgICAgICdmaXJlZm94JzogICAgICAgICAgIGZpcmVmb3hQcm92aWRlcixcbiAgICAgICAgJ2Nocm9tZSc6ICAgICAgICAgICAgY2hyb21lUHJvdmlkZXIsXG4gICAgICAgICdjaHJvbWl1bSc6ICAgICAgICAgIGNocm9tZVByb3ZpZGVyLFxuICAgICAgICAnY2hyb21lLWNhbmFyeSc6ICAgICBjaHJvbWVQcm92aWRlcixcbiAgICAgICAgJ2VkZ2UnOiAgICAgICAgICAgICAgZWRnZVByb3ZpZGVyLFxuICAgIH1cbik7XG4iXX0=