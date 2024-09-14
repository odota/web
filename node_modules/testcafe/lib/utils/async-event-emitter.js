"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const emittery_1 = __importDefault(require("emittery"));
class AsyncEventEmitter extends emittery_1.default {
    constructor({ captureRejections = false } = {}) {
        super();
        this.captureRejections = captureRejections;
    }
    once(event, listener) {
        if (!listener)
            return super.once(event);
        const unsubscribe = this.on(event, async (data) => {
            unsubscribe();
            return listener(data);
        });
        return Promise.resolve();
    }
    emit(eventName, ...args) {
        const emitPromise = super.emit(eventName, ...args);
        if (this.captureRejections && eventName !== 'error')
            emitPromise.catch(reason => this.emit('error', reason));
        return emitPromise;
    }
}
exports.default = AsyncEventEmitter;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmMtZXZlbnQtZW1pdHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9hc3luYy1ldmVudC1lbWl0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0RBQWdDO0FBRWhDLE1BQXFCLGlCQUFrQixTQUFRLGtCQUFRO0lBR25ELFlBQW9CLEVBQUUsaUJBQWlCLEdBQUcsS0FBSyxFQUFFLEdBQUcsRUFBRTtRQUNsRCxLQUFLLEVBQUUsQ0FBQztRQUVSLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztJQUMvQyxDQUFDO0lBRU0sSUFBSSxDQUFFLEtBQWEsRUFBRSxRQUFtQjtRQUMzQyxJQUFJLENBQUMsUUFBUTtZQUNULE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU3QixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUMsSUFBSSxFQUFDLEVBQUU7WUFDNUMsV0FBVyxFQUFFLENBQUM7WUFFZCxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFTSxJQUFJLENBQUUsU0FBaUIsRUFBRSxHQUFHLElBQWU7UUFDOUMsTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUVuRCxJQUFJLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxTQUFTLEtBQUssT0FBTztZQUMvQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUU1RCxPQUFPLFdBQVcsQ0FBQztJQUN2QixDQUFDO0NBQ0o7QUE5QkQsb0NBOEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVtaXR0ZXJ5IGZyb20gJ2VtaXR0ZXJ5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXN5bmNFdmVudEVtaXR0ZXIgZXh0ZW5kcyBFbWl0dGVyeSB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBjYXB0dXJlUmVqZWN0aW9uczogYm9vbGVhbjtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciAoeyBjYXB0dXJlUmVqZWN0aW9ucyA9IGZhbHNlIH0gPSB7fSkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuY2FwdHVyZVJlamVjdGlvbnMgPSBjYXB0dXJlUmVqZWN0aW9ucztcbiAgICB9XG5cbiAgICBwdWJsaWMgb25jZSAoZXZlbnQ6IHN0cmluZywgbGlzdGVuZXI/OiBGdW5jdGlvbik6IFByb21pc2U8YW55PiB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICBpZiAoIWxpc3RlbmVyKVxuICAgICAgICAgICAgcmV0dXJuIHN1cGVyLm9uY2UoZXZlbnQpO1xuXG4gICAgICAgIGNvbnN0IHVuc3Vic2NyaWJlID0gdGhpcy5vbihldmVudCwgYXN5bmMgZGF0YSA9PiB7XG4gICAgICAgICAgICB1bnN1YnNjcmliZSgpO1xuXG4gICAgICAgICAgICByZXR1cm4gbGlzdGVuZXIoZGF0YSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZW1pdCAoZXZlbnROYW1lOiBzdHJpbmcsIC4uLmFyZ3M6IHVua25vd25bXSk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBlbWl0UHJvbWlzZSA9IHN1cGVyLmVtaXQoZXZlbnROYW1lLCAuLi5hcmdzKTtcblxuICAgICAgICBpZiAodGhpcy5jYXB0dXJlUmVqZWN0aW9ucyAmJiBldmVudE5hbWUgIT09ICdlcnJvcicpXG4gICAgICAgICAgICBlbWl0UHJvbWlzZS5jYXRjaChyZWFzb24gPT4gdGhpcy5lbWl0KCdlcnJvcicsIHJlYXNvbikpO1xuXG4gICAgICAgIHJldHVybiBlbWl0UHJvbWlzZTtcbiAgICB9XG59XG4iXX0=