"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const parse5_1 = require("parse5");
const render_error_template_1 = __importDefault(require("./render-error-template"));
const create_stack_filter_1 = __importDefault(require("../create-stack-filter"));
const render_callsite_sync_1 = __importDefault(require("../../utils/render-callsite-sync"));
const get_renderes_1 = __importDefault(require("../../utils/get-renderes"));
const parser = new parse5_1.Parser();
class TestRunErrorFormattableAdapter {
    constructor(err, metaInfo) {
        this.userAgent = metaInfo.userAgent;
        this.screenshotPath = metaInfo.screenshotPath;
        this.testRunId = metaInfo.testRunId;
        this.testRunPhase = metaInfo.testRunPhase;
        (0, lodash_1.assignIn)(this, err);
        this.callsite = this.callsite || metaInfo.callsite;
    }
    static _getSelector(node) {
        const classAttr = (0, lodash_1.find)(node.attrs, { name: 'class' });
        const cls = classAttr && classAttr.value;
        return cls ? `${node.tagName} ${cls}` : node.tagName;
    }
    static _decorateHtml(node, decorator) {
        let msg = '';
        if (node.nodeName === '#text')
            msg = node.value;
        else {
            if (node.childNodes.length) {
                msg += node.childNodes
                    .map(childNode => TestRunErrorFormattableAdapter._decorateHtml(childNode, decorator))
                    .join('');
            }
            if (node.nodeName !== '#document-fragment') {
                const selector = TestRunErrorFormattableAdapter._getSelector(node);
                msg = decorator[selector] ? decorator[selector](msg, node.attrs) : msg;
            }
        }
        return msg;
    }
    getErrorMarkup(viewportWidth) {
        return (0, render_error_template_1.default)(this, viewportWidth);
    }
    getCallsiteMarkup() {
        const renderers = (0, get_renderes_1.default)(this.callsite);
        return (0, render_callsite_sync_1.default)(this.callsite, {
            renderer: renderers.html,
            stackFilter: (0, create_stack_filter_1.default)(Error.stackTraceLimit),
        });
    }
    formatMessage(decorator, viewportWidth) {
        const msgHtml = this.getErrorMarkup(viewportWidth);
        const fragment = parser.parseFragment(msgHtml);
        return TestRunErrorFormattableAdapter._decorateHtml(fragment, decorator);
    }
}
exports.default = TestRunErrorFormattableAdapter;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0dGFibGUtYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9lcnJvcnMvdGVzdC1ydW4vZm9ybWF0dGFibGUtYWRhcHRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG1DQUF3QztBQUN4QyxtQ0FBZ0M7QUFDaEMsb0ZBQTBEO0FBQzFELGlGQUF1RDtBQUN2RCw0RkFBa0U7QUFDbEUsNEVBQW9EO0FBRXBELE1BQU0sTUFBTSxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7QUFFNUIsTUFBcUIsOEJBQThCO0lBQy9DLFlBQWEsR0FBRyxFQUFFLFFBQVE7UUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBUSxRQUFRLENBQUMsU0FBUyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQztRQUM5QyxJQUFJLENBQUMsU0FBUyxHQUFRLFFBQVEsQ0FBQyxTQUFTLENBQUM7UUFDekMsSUFBSSxDQUFDLFlBQVksR0FBSyxRQUFRLENBQUMsWUFBWSxDQUFDO1FBRTVDLElBQUEsaUJBQVEsRUFBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFDdkQsQ0FBQztJQUVELE1BQU0sQ0FBQyxZQUFZLENBQUUsSUFBSTtRQUNyQixNQUFNLFNBQVMsR0FBRyxJQUFBLGFBQUksRUFBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDdEQsTUFBTSxHQUFHLEdBQVMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFFL0MsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN6RCxDQUFDO0lBRUQsTUFBTSxDQUFDLGFBQWEsQ0FBRSxJQUFJLEVBQUUsU0FBUztRQUNqQyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFFYixJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssT0FBTztZQUN6QixHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQzthQUNoQjtZQUNELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3hCLEdBQUcsSUFBSSxJQUFJLENBQUMsVUFBVTtxQkFDakIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsOEJBQThCLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztxQkFDcEYsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ2pCO1lBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLG9CQUFvQixFQUFFO2dCQUN4QyxNQUFNLFFBQVEsR0FBRyw4QkFBOEIsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRW5FLEdBQUcsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7YUFDMUU7U0FDSjtRQUVELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVELGNBQWMsQ0FBRSxhQUFhO1FBQ3pCLE9BQU8sSUFBQSwrQkFBbUIsRUFBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELGlCQUFpQjtRQUNiLE1BQU0sU0FBUyxHQUFHLElBQUEsc0JBQVksRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFOUMsT0FBTyxJQUFBLDhCQUFrQixFQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDckMsUUFBUSxFQUFLLFNBQVMsQ0FBQyxJQUFJO1lBQzNCLFdBQVcsRUFBRSxJQUFBLDZCQUFpQixFQUFDLEtBQUssQ0FBQyxlQUFlLENBQUM7U0FDeEQsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGFBQWEsQ0FBRSxTQUFTLEVBQUUsYUFBYTtRQUNuQyxNQUFNLE9BQU8sR0FBSSxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3BELE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFL0MsT0FBTyw4QkFBOEIsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQzdFLENBQUM7Q0FDSjtBQTVERCxpREE0REMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmaW5kLCBhc3NpZ25JbiB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBQYXJzZXIgfSBmcm9tICdwYXJzZTUnO1xuaW1wb3J0IHJlbmRlckVycm9yVGVtcGxhdGUgZnJvbSAnLi9yZW5kZXItZXJyb3ItdGVtcGxhdGUnO1xuaW1wb3J0IGNyZWF0ZVN0YWNrRmlsdGVyIGZyb20gJy4uL2NyZWF0ZS1zdGFjay1maWx0ZXInO1xuaW1wb3J0IHJlbmRlckNhbGxzaXRlU3luYyBmcm9tICcuLi8uLi91dGlscy9yZW5kZXItY2FsbHNpdGUtc3luYyc7XG5pbXBvcnQgZ2V0UmVuZGVyZXJzIGZyb20gJy4uLy4uL3V0aWxzL2dldC1yZW5kZXJlcyc7XG5cbmNvbnN0IHBhcnNlciA9IG5ldyBQYXJzZXIoKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVzdFJ1bkVycm9yRm9ybWF0dGFibGVBZGFwdGVyIHtcbiAgICBjb25zdHJ1Y3RvciAoZXJyLCBtZXRhSW5mbykge1xuICAgICAgICB0aGlzLnVzZXJBZ2VudCAgICAgID0gbWV0YUluZm8udXNlckFnZW50O1xuICAgICAgICB0aGlzLnNjcmVlbnNob3RQYXRoID0gbWV0YUluZm8uc2NyZWVuc2hvdFBhdGg7XG4gICAgICAgIHRoaXMudGVzdFJ1bklkICAgICAgPSBtZXRhSW5mby50ZXN0UnVuSWQ7XG4gICAgICAgIHRoaXMudGVzdFJ1blBoYXNlICAgPSBtZXRhSW5mby50ZXN0UnVuUGhhc2U7XG5cbiAgICAgICAgYXNzaWduSW4odGhpcywgZXJyKTtcblxuICAgICAgICB0aGlzLmNhbGxzaXRlID0gdGhpcy5jYWxsc2l0ZSB8fCBtZXRhSW5mby5jYWxsc2l0ZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX2dldFNlbGVjdG9yIChub2RlKSB7XG4gICAgICAgIGNvbnN0IGNsYXNzQXR0ciA9IGZpbmQobm9kZS5hdHRycywgeyBuYW1lOiAnY2xhc3MnIH0pO1xuICAgICAgICBjb25zdCBjbHMgICAgICAgPSBjbGFzc0F0dHIgJiYgY2xhc3NBdHRyLnZhbHVlO1xuXG4gICAgICAgIHJldHVybiBjbHMgPyBgJHtub2RlLnRhZ05hbWV9ICR7Y2xzfWAgOiBub2RlLnRhZ05hbWU7XG4gICAgfVxuXG4gICAgc3RhdGljIF9kZWNvcmF0ZUh0bWwgKG5vZGUsIGRlY29yYXRvcikge1xuICAgICAgICBsZXQgbXNnID0gJyc7XG5cbiAgICAgICAgaWYgKG5vZGUubm9kZU5hbWUgPT09ICcjdGV4dCcpXG4gICAgICAgICAgICBtc2cgPSBub2RlLnZhbHVlO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChub2RlLmNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbXNnICs9IG5vZGUuY2hpbGROb2Rlc1xuICAgICAgICAgICAgICAgICAgICAubWFwKGNoaWxkTm9kZSA9PiBUZXN0UnVuRXJyb3JGb3JtYXR0YWJsZUFkYXB0ZXIuX2RlY29yYXRlSHRtbChjaGlsZE5vZGUsIGRlY29yYXRvcikpXG4gICAgICAgICAgICAgICAgICAgIC5qb2luKCcnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5vZGUubm9kZU5hbWUgIT09ICcjZG9jdW1lbnQtZnJhZ21lbnQnKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSBUZXN0UnVuRXJyb3JGb3JtYXR0YWJsZUFkYXB0ZXIuX2dldFNlbGVjdG9yKG5vZGUpO1xuXG4gICAgICAgICAgICAgICAgbXNnID0gZGVjb3JhdG9yW3NlbGVjdG9yXSA/IGRlY29yYXRvcltzZWxlY3Rvcl0obXNnLCBub2RlLmF0dHJzKSA6IG1zZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtc2c7XG4gICAgfVxuXG4gICAgZ2V0RXJyb3JNYXJrdXAgKHZpZXdwb3J0V2lkdGgpIHtcbiAgICAgICAgcmV0dXJuIHJlbmRlckVycm9yVGVtcGxhdGUodGhpcywgdmlld3BvcnRXaWR0aCk7XG4gICAgfVxuXG4gICAgZ2V0Q2FsbHNpdGVNYXJrdXAgKCkge1xuICAgICAgICBjb25zdCByZW5kZXJlcnMgPSBnZXRSZW5kZXJlcnModGhpcy5jYWxsc2l0ZSk7XG5cbiAgICAgICAgcmV0dXJuIHJlbmRlckNhbGxzaXRlU3luYyh0aGlzLmNhbGxzaXRlLCB7XG4gICAgICAgICAgICByZW5kZXJlcjogICAgcmVuZGVyZXJzLmh0bWwsXG4gICAgICAgICAgICBzdGFja0ZpbHRlcjogY3JlYXRlU3RhY2tGaWx0ZXIoRXJyb3Iuc3RhY2tUcmFjZUxpbWl0KSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZm9ybWF0TWVzc2FnZSAoZGVjb3JhdG9yLCB2aWV3cG9ydFdpZHRoKSB7XG4gICAgICAgIGNvbnN0IG1zZ0h0bWwgID0gdGhpcy5nZXRFcnJvck1hcmt1cCh2aWV3cG9ydFdpZHRoKTtcbiAgICAgICAgY29uc3QgZnJhZ21lbnQgPSBwYXJzZXIucGFyc2VGcmFnbWVudChtc2dIdG1sKTtcblxuICAgICAgICByZXR1cm4gVGVzdFJ1bkVycm9yRm9ybWF0dGFibGVBZGFwdGVyLl9kZWNvcmF0ZUh0bWwoZnJhZ21lbnQsIGRlY29yYXRvcik7XG4gICAgfVxufVxuIl19