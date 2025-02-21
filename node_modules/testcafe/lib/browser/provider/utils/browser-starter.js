"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_family_1 = __importDefault(require("os-family"));
const testcafe_browser_tools_1 = __importDefault(require("testcafe-browser-tools"));
const delay_1 = __importDefault(require("../../../utils/delay"));
const POST_OPERATION_DELAY = 500;
class OperationsQueue {
    constructor() {
        this.chainPromise = Promise.resolve();
    }
    executeOperation(operation) {
        const operationPromise = this.chainPromise.then(operation);
        this.chainPromise = operationPromise.then(() => delay_1.default(POST_OPERATION_DELAY));
        return operationPromise;
    }
}
class BrowserStarter {
    constructor() {
        // NOTE: You can't start multiple instances of the same app at the same time on macOS.
        // That's why a queue of opening requests is needed.
        this.macOSBrowserOpeningQueue = new OperationsQueue();
    }
    async startBrowser(...openArgs) {
        const openBrowserOperation = () => testcafe_browser_tools_1.default.open(...openArgs);
        if (os_family_1.default.mac)
            await this.macOSBrowserOpeningQueue.executeOperation(openBrowserOperation);
        else
            await openBrowserOperation();
    }
}
exports.default = BrowserStarter;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci1zdGFydGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jyb3dzZXIvcHJvdmlkZXIvdXRpbHMvYnJvd3Nlci1zdGFydGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMERBQTJCO0FBQzNCLG9GQUFrRDtBQUNsRCxpRUFBeUM7QUFHekMsTUFBTSxvQkFBb0IsR0FBRyxHQUFHLENBQUM7QUFFakMsTUFBTSxlQUFlO0lBQ2pCO1FBQ0ksSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVELGdCQUFnQixDQUFFLFNBQVM7UUFDdkIsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUUzRCxJQUFJLENBQUMsWUFBWSxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxlQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO1FBRTdFLE9BQU8sZ0JBQWdCLENBQUM7SUFDNUIsQ0FBQztDQUNKO0FBRUQsTUFBcUIsY0FBYztJQUMvQjtRQUNJLHNGQUFzRjtRQUN0RixvREFBb0Q7UUFDcEQsSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7SUFDMUQsQ0FBQztJQUVELEtBQUssQ0FBQyxZQUFZLENBQUUsR0FBRyxRQUFRO1FBQzNCLE1BQU0sb0JBQW9CLEdBQUcsR0FBRyxFQUFFLENBQUMsZ0NBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQztRQUVsRSxJQUFJLG1CQUFFLENBQUMsR0FBRztZQUNOLE1BQU0sSUFBSSxDQUFDLHdCQUF3QixDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDLENBQUM7O1lBRTNFLE1BQU0sb0JBQW9CLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0NBQ0o7QUFmRCxpQ0FlQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBPUyBmcm9tICdvcy1mYW1pbHknO1xuaW1wb3J0IGJyb3dzZXJUb29scyBmcm9tICd0ZXN0Y2FmZS1icm93c2VyLXRvb2xzJztcbmltcG9ydCBkZWxheSBmcm9tICcuLi8uLi8uLi91dGlscy9kZWxheSc7XG5cblxuY29uc3QgUE9TVF9PUEVSQVRJT05fREVMQVkgPSA1MDA7XG5cbmNsYXNzIE9wZXJhdGlvbnNRdWV1ZSB7XG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICB0aGlzLmNoYWluUHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cblxuICAgIGV4ZWN1dGVPcGVyYXRpb24gKG9wZXJhdGlvbikge1xuICAgICAgICBjb25zdCBvcGVyYXRpb25Qcm9taXNlID0gdGhpcy5jaGFpblByb21pc2UudGhlbihvcGVyYXRpb24pO1xuXG4gICAgICAgIHRoaXMuY2hhaW5Qcm9taXNlID0gb3BlcmF0aW9uUHJvbWlzZS50aGVuKCgpID0+IGRlbGF5KFBPU1RfT1BFUkFUSU9OX0RFTEFZKSk7XG5cbiAgICAgICAgcmV0dXJuIG9wZXJhdGlvblByb21pc2U7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCcm93c2VyU3RhcnRlciB7XG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICAvLyBOT1RFOiBZb3UgY2FuJ3Qgc3RhcnQgbXVsdGlwbGUgaW5zdGFuY2VzIG9mIHRoZSBzYW1lIGFwcCBhdCB0aGUgc2FtZSB0aW1lIG9uIG1hY09TLlxuICAgICAgICAvLyBUaGF0J3Mgd2h5IGEgcXVldWUgb2Ygb3BlbmluZyByZXF1ZXN0cyBpcyBuZWVkZWQuXG4gICAgICAgIHRoaXMubWFjT1NCcm93c2VyT3BlbmluZ1F1ZXVlID0gbmV3IE9wZXJhdGlvbnNRdWV1ZSgpO1xuICAgIH1cblxuICAgIGFzeW5jIHN0YXJ0QnJvd3NlciAoLi4ub3BlbkFyZ3MpIHtcbiAgICAgICAgY29uc3Qgb3BlbkJyb3dzZXJPcGVyYXRpb24gPSAoKSA9PiBicm93c2VyVG9vbHMub3BlbiguLi5vcGVuQXJncyk7XG5cbiAgICAgICAgaWYgKE9TLm1hYylcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubWFjT1NCcm93c2VyT3BlbmluZ1F1ZXVlLmV4ZWN1dGVPcGVyYXRpb24ob3BlbkJyb3dzZXJPcGVyYXRpb24pO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBhd2FpdCBvcGVuQnJvd3Nlck9wZXJhdGlvbigpO1xuICAgIH1cbn1cbiJdfQ==