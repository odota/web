"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testcafe_hammerhead_1 = require("testcafe-hammerhead");
const internal_properties_1 = __importDefault(require("../client/driver/internal-properties"));
function getCustomClientScriptCode(script) {
    return `try {
        ${testcafe_hammerhead_1.processScript(script.content)}
    }
    catch (e) {
       window['${internal_properties_1.default.testCafeDriverInstance}'].onCustomClientScriptError(e, '${script.module || ''}');
    }`;
}
exports.default = getCustomClientScriptCode;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWNvZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY3VzdG9tLWNsaWVudC1zY3JpcHRzL2dldC1jb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkRBQW9EO0FBQ3BELCtGQUF1RTtBQUd2RSxTQUF3Qix5QkFBeUIsQ0FBRSxNQUFvQjtJQUNuRSxPQUFPO1VBQ0QsbUNBQWEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDOzs7aUJBR3RCLDZCQUFtQixDQUFDLHNCQUFzQixvQ0FBb0MsTUFBTSxDQUFDLE1BQU0sSUFBSSxFQUFFO01BQzVHLENBQUM7QUFDUCxDQUFDO0FBUEQsNENBT0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwcm9jZXNzU2NyaXB0IH0gZnJvbSAndGVzdGNhZmUtaGFtbWVyaGVhZCc7XG5pbXBvcnQgSU5URVJOQUxfUFJPUEVSVElFUyBmcm9tICcuLi9jbGllbnQvZHJpdmVyL2ludGVybmFsLXByb3BlcnRpZXMnO1xuaW1wb3J0IENsaWVudFNjcmlwdCBmcm9tICcuL2NsaWVudC1zY3JpcHQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRDdXN0b21DbGllbnRTY3JpcHRDb2RlIChzY3JpcHQ6IENsaWVudFNjcmlwdCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGB0cnkge1xuICAgICAgICAke3Byb2Nlc3NTY3JpcHQoc2NyaXB0LmNvbnRlbnQpfVxuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgIHdpbmRvd1snJHtJTlRFUk5BTF9QUk9QRVJUSUVTLnRlc3RDYWZlRHJpdmVySW5zdGFuY2V9J10ub25DdXN0b21DbGllbnRTY3JpcHRFcnJvcihlLCAnJHtzY3JpcHQubW9kdWxlIHx8ICcnfScpO1xuICAgIH1gO1xufVxuIl19