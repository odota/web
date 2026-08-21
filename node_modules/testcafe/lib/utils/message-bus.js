"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const async_event_emitter_1 = __importDefault(require("./async-event-emitter"));
class MessageBus extends async_event_emitter_1.default {
    abort() {
        this.clearListeners();
    }
}
exports.default = MessageBus;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS1idXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvbWVzc2FnZS1idXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxnRkFBc0Q7QUFFdEQsTUFBcUIsVUFBVyxTQUFRLDZCQUFpQjtJQUM5QyxLQUFLO1FBQ1IsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFCLENBQUM7Q0FDSjtBQUpELDZCQUlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFzeW5jRXZlbnRFbWl0dGVyIGZyb20gJy4vYXN5bmMtZXZlbnQtZW1pdHRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lc3NhZ2VCdXMgZXh0ZW5kcyBBc3luY0V2ZW50RW1pdHRlciB7XG4gICAgcHVibGljIGFib3J0ICgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jbGVhckxpc3RlbmVycygpO1xuICAgIH1cbn1cbiJdfQ==