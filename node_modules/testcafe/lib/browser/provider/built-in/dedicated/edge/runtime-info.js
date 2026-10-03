"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const runtime_info_1 = __importDefault(require("../chrome/runtime-info"));
const promisified_functions_1 = require("../../../../../utils/promisified-functions");
class EdgeRuntimeInfo extends runtime_info_1.default {
    async createTempProfile(proxyHostName, disableMultipleWindows) {
        const tempDir = await super.createTempProfile(proxyHostName, disableMultipleWindows);
        // NOTE: prevents Edge from automatically logging under system credentials
        // and showing the welcome screen
        const preferences = {
            'fre': {
                'has_user_seen_fre': true,
            },
            'profiles': {
                'edge_implicitly_signed_in': [{
                        'edge_account_type': 3,
                        'id': '',
                    }],
            },
        };
        await (0, promisified_functions_1.writeFile)(path_1.default.join(tempDir.path, 'Local State'), JSON.stringify(preferences));
        return tempDir;
    }
}
exports.default = EdgeRuntimeInfo;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVudGltZS1pbmZvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2Jyb3dzZXIvcHJvdmlkZXIvYnVpbHQtaW4vZGVkaWNhdGVkL2VkZ2UvcnVudGltZS1pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0RBQXdCO0FBQ3hCLDBFQUF1RDtBQUV2RCxzRkFBdUU7QUFFdkUsTUFBcUIsZUFBZ0IsU0FBUSxzQkFBaUI7SUFDaEQsS0FBSyxDQUFDLGlCQUFpQixDQUFFLGFBQXFCLEVBQUUsc0JBQStCO1FBQ3JGLE1BQU0sT0FBTyxHQUFHLE1BQU0sS0FBSyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1FBRXJGLDBFQUEwRTtRQUMxRSxpQ0FBaUM7UUFDakMsTUFBTSxXQUFXLEdBQUc7WUFDaEIsS0FBSyxFQUFFO2dCQUNILG1CQUFtQixFQUFFLElBQUk7YUFDNUI7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsMkJBQTJCLEVBQUUsQ0FBQzt3QkFDMUIsbUJBQW1CLEVBQUUsQ0FBQzt3QkFDdEIsSUFBSSxFQUFpQixFQUFFO3FCQUMxQixDQUFDO2FBQ0w7U0FDSixDQUFDO1FBRUYsTUFBTSxJQUFBLGlDQUFTLEVBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUVyRixPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0NBQ0o7QUF0QkQsa0NBc0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgQ2hyb21lUnVudGltZUluZm8gZnJvbSAnLi4vY2hyb21lL3J1bnRpbWUtaW5mbyc7XG5pbXBvcnQgVGVtcERpcmVjdG9yeSBmcm9tICcuLi8uLi8uLi8uLi8uLi91dGlscy90ZW1wLWRpcmVjdG9yeSc7XG5pbXBvcnQgeyB3cml0ZUZpbGUgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi91dGlscy9wcm9taXNpZmllZC1mdW5jdGlvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGdlUnVudGltZUluZm8gZXh0ZW5kcyBDaHJvbWVSdW50aW1lSW5mbyB7XG4gICAgcHJvdGVjdGVkIGFzeW5jIGNyZWF0ZVRlbXBQcm9maWxlIChwcm94eUhvc3ROYW1lOiBzdHJpbmcsIGRpc2FibGVNdWx0aXBsZVdpbmRvd3M6IGJvb2xlYW4pOiBQcm9taXNlPFRlbXBEaXJlY3Rvcnk+IHtcbiAgICAgICAgY29uc3QgdGVtcERpciA9IGF3YWl0IHN1cGVyLmNyZWF0ZVRlbXBQcm9maWxlKHByb3h5SG9zdE5hbWUsIGRpc2FibGVNdWx0aXBsZVdpbmRvd3MpO1xuXG4gICAgICAgIC8vIE5PVEU6IHByZXZlbnRzIEVkZ2UgZnJvbSBhdXRvbWF0aWNhbGx5IGxvZ2dpbmcgdW5kZXIgc3lzdGVtIGNyZWRlbnRpYWxzXG4gICAgICAgIC8vIGFuZCBzaG93aW5nIHRoZSB3ZWxjb21lIHNjcmVlblxuICAgICAgICBjb25zdCBwcmVmZXJlbmNlcyA9IHtcbiAgICAgICAgICAgICdmcmUnOiB7XG4gICAgICAgICAgICAgICAgJ2hhc191c2VyX3NlZW5fZnJlJzogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAncHJvZmlsZXMnOiB7XG4gICAgICAgICAgICAgICAgJ2VkZ2VfaW1wbGljaXRseV9zaWduZWRfaW4nOiBbe1xuICAgICAgICAgICAgICAgICAgICAnZWRnZV9hY2NvdW50X3R5cGUnOiAzLFxuICAgICAgICAgICAgICAgICAgICAnaWQnOiAgICAgICAgICAgICAgICAnJyxcbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgYXdhaXQgd3JpdGVGaWxlKHBhdGguam9pbih0ZW1wRGlyLnBhdGgsICdMb2NhbCBTdGF0ZScpLCBKU09OLnN0cmluZ2lmeShwcmVmZXJlbmNlcykpO1xuXG4gICAgICAgIHJldHVybiB0ZW1wRGlyO1xuICAgIH1cbn1cbiJdfQ==