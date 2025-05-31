"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
const chalk_1 = __importDefault(require("chalk"));
const log_1 = __importDefault(require("./log"));
const promisify_event_1 = __importDefault(require("promisify-event"));
const dedent_1 = __importDefault(require("dedent"));
async function default_1(testCafe, remoteCount, showQRCode) {
    const connectionPromises = [];
    if (remoteCount) {
        log_1.default.hideSpinner();
        const description = dedent_1.default(`
            Connecting ${remoteCount} remote browser(s)...
            Navigate to the following URL from each remote browser.
        `);
        log_1.default.write(description);
        if (showQRCode)
            log_1.default.write('You can either enter the URL or scan the QR-code.');
        const connectionUrl = testCafe.browserConnectionGateway.connectUrl;
        log_1.default.write(`Connect URL: ${chalk_1.default.underline.blue(connectionUrl)}`);
        if (showQRCode)
            qrcode_terminal_1.default.generate(connectionUrl);
        for (let i = 0; i < remoteCount; i++) {
            connectionPromises.push(testCafe
                .createBrowserConnection()
                .then((bc) => promisify_event_1.default(bc, 'ready').then(() => bc))
                .then((bc) => {
                log_1.default.write(`${chalk_1.default.green('CONNECTED')} ${bc.userAgent}`);
                return bc;
            }));
        }
        log_1.default.showSpinner();
    }
    return await Promise.all(connectionPromises);
}
exports.default = default_1;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3Rlcy13aXphcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2xpL3JlbW90ZXMtd2l6YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0VBQXFDO0FBQ3JDLGtEQUEwQjtBQUMxQixnREFBd0I7QUFDeEIsc0VBQTZDO0FBQzdDLG9EQUE0QjtBQVViLEtBQUssb0JBQVcsUUFBa0IsRUFBRSxXQUFtQixFQUFFLFVBQW1CO0lBQ3ZGLE1BQU0sa0JBQWtCLEdBQUcsRUFBRSxDQUFDO0lBRTlCLElBQUksV0FBVyxFQUFFO1FBQ2IsYUFBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRWxCLE1BQU0sV0FBVyxHQUFHLGdCQUFNLENBQUM7eUJBQ1YsV0FBVzs7U0FFM0IsQ0FBQyxDQUFDO1FBRUgsYUFBRyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV2QixJQUFJLFVBQVU7WUFDVixhQUFHLENBQUMsS0FBSyxDQUFDLG1EQUFtRCxDQUFDLENBQUM7UUFFbkUsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLHdCQUF3QixDQUFDLFVBQVUsQ0FBQztRQUVuRSxhQUFHLENBQUMsS0FBSyxDQUFDLGdCQUFnQixlQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFakUsSUFBSSxVQUFVO1lBQ1YseUJBQU0sQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFbkMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNsQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUTtpQkFDM0IsdUJBQXVCLEVBQUU7aUJBQ3pCLElBQUksQ0FBQyxDQUFDLEVBQXFCLEVBQUUsRUFBRSxDQUFDLHlCQUFjLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDM0UsSUFBSSxDQUFDLENBQUMsRUFBcUIsRUFBRSxFQUFFO2dCQUM1QixhQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsZUFBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztnQkFFekQsT0FBTyxFQUFFLENBQUM7WUFDZCxDQUFDLENBQUMsQ0FDTCxDQUFDO1NBQ0w7UUFFRCxhQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDckI7SUFFRCxPQUFPLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUF2Q0QsNEJBdUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHFyY29kZSBmcm9tICdxcmNvZGUtdGVybWluYWwnO1xuaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJztcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2cnO1xuaW1wb3J0IHByb21pc2lmeUV2ZW50IGZyb20gJ3Byb21pc2lmeS1ldmVudCc7XG5pbXBvcnQgZGVkZW50IGZyb20gJ2RlZGVudCc7XG5cbmltcG9ydCBCcm93c2VyQ29ubmVjdGlvbiBmcm9tICcuLi9icm93c2VyL2Nvbm5lY3Rpb24nO1xuaW1wb3J0IEJyb3dzZXJDb25uZWN0aW9uR2F0ZXdheSBmcm9tICcuLi9icm93c2VyL2Nvbm5lY3Rpb24vZ2F0ZXdheSc7XG5cbmludGVyZmFjZSBUZXN0Q2FmZSB7XG4gICAgYnJvd3NlckNvbm5lY3Rpb25HYXRld2F5OiBCcm93c2VyQ29ubmVjdGlvbkdhdGV3YXk7XG4gICAgY3JlYXRlQnJvd3NlckNvbm5lY3Rpb24oKTogUHJvbWlzZTxCcm93c2VyQ29ubmVjdGlvbj47XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uICh0ZXN0Q2FmZTogVGVzdENhZmUsIHJlbW90ZUNvdW50OiBudW1iZXIsIHNob3dRUkNvZGU6IGJvb2xlYW4pOiBQcm9taXNlPEJyb3dzZXJDb25uZWN0aW9uW10+IHtcbiAgICBjb25zdCBjb25uZWN0aW9uUHJvbWlzZXMgPSBbXTtcblxuICAgIGlmIChyZW1vdGVDb3VudCkge1xuICAgICAgICBsb2cuaGlkZVNwaW5uZXIoKTtcblxuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRlZGVudChgXG4gICAgICAgICAgICBDb25uZWN0aW5nICR7cmVtb3RlQ291bnR9IHJlbW90ZSBicm93c2VyKHMpLi4uXG4gICAgICAgICAgICBOYXZpZ2F0ZSB0byB0aGUgZm9sbG93aW5nIFVSTCBmcm9tIGVhY2ggcmVtb3RlIGJyb3dzZXIuXG4gICAgICAgIGApO1xuXG4gICAgICAgIGxvZy53cml0ZShkZXNjcmlwdGlvbik7XG5cbiAgICAgICAgaWYgKHNob3dRUkNvZGUpXG4gICAgICAgICAgICBsb2cud3JpdGUoJ1lvdSBjYW4gZWl0aGVyIGVudGVyIHRoZSBVUkwgb3Igc2NhbiB0aGUgUVItY29kZS4nKTtcblxuICAgICAgICBjb25zdCBjb25uZWN0aW9uVXJsID0gdGVzdENhZmUuYnJvd3NlckNvbm5lY3Rpb25HYXRld2F5LmNvbm5lY3RVcmw7XG5cbiAgICAgICAgbG9nLndyaXRlKGBDb25uZWN0IFVSTDogJHtjaGFsay51bmRlcmxpbmUuYmx1ZShjb25uZWN0aW9uVXJsKX1gKTtcblxuICAgICAgICBpZiAoc2hvd1FSQ29kZSlcbiAgICAgICAgICAgIHFyY29kZS5nZW5lcmF0ZShjb25uZWN0aW9uVXJsKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlbW90ZUNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGNvbm5lY3Rpb25Qcm9taXNlcy5wdXNoKHRlc3RDYWZlXG4gICAgICAgICAgICAgICAgLmNyZWF0ZUJyb3dzZXJDb25uZWN0aW9uKClcbiAgICAgICAgICAgICAgICAudGhlbigoYmM6IEJyb3dzZXJDb25uZWN0aW9uKSA9PiBwcm9taXNpZnlFdmVudChiYywgJ3JlYWR5JykudGhlbigoKSA9PiBiYykpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGJjOiBCcm93c2VyQ29ubmVjdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsb2cud3JpdGUoYCR7Y2hhbGsuZ3JlZW4oJ0NPTk5FQ1RFRCcpfSAke2JjLnVzZXJBZ2VudH1gKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmM7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBsb2cuc2hvd1NwaW5uZXIoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXdhaXQgUHJvbWlzZS5hbGwoY29ubmVjdGlvblByb21pc2VzKTtcbn1cbiJdfQ==