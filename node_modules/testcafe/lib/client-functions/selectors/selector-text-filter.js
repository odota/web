"use strict";
// -------------------------------------------------------------
// WARNING: this file is used by both the client and the server.
// Do not use any browser or node-specific API!
// -------------------------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
function selectorTextFilter(node, index, originNode, textFilter) {
    function hasChildrenWithText(parentNode) {
        const cnCount = parentNode.childNodes.length;
        for (let i = 0; i < cnCount; i++) {
            if (selectorTextFilter(parentNode.childNodes[i], index, originNode, textFilter))
                return true;
        }
        return false;
    }
    function checkNodeText(text) {
        if (textFilter instanceof RegExp)
            return textFilter.test(text);
        return textFilter === text.trim();
    }
    // Element
    if (node.nodeType === 1) {
        // NOTE: In Firefox, <option> elements don't have `innerText`.
        // So, we fallback to `textContent` in that case (see GH-861).
        // SVG elements do not have `innerText` property as well
        return checkNodeText(node.innerText || node.textContent);
    }
    // Document
    if (node.nodeType === 9) {
        // NOTE: latest version of Edge doesn't have `innerText` for `document`,
        // `html` and `body`. So we check their children instead.
        const head = node.querySelector('head');
        const body = node.querySelector('body');
        return hasChildrenWithText(head, textFilter) || hasChildrenWithText(body, textFilter);
    }
    // DocumentFragment
    if (node.nodeType === 11)
        return hasChildrenWithText(node, textFilter);
    return checkNodeText(node.textContent);
}
exports.default = selectorTextFilter;
/* eslint-enable no-undef */
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0b3ItdGV4dC1maWx0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY2xpZW50LWZ1bmN0aW9ucy9zZWxlY3RvcnMvc2VsZWN0b3ItdGV4dC1maWx0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGdFQUFnRTtBQUNoRSxnRUFBZ0U7QUFDaEUsK0NBQStDO0FBQy9DLGdFQUFnRTs7QUFFaEUsNkJBQTZCO0FBQzdCLFNBQXdCLGtCQUFrQixDQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFVBQVU7SUFFM0UsU0FBUyxtQkFBbUIsQ0FBRSxVQUFVO1FBQ3BDLE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBRTdDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDOUIsSUFBSSxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDO2dCQUMzRSxPQUFPLElBQUksQ0FBQztTQUNuQjtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxTQUFTLGFBQWEsQ0FBRSxJQUFJO1FBQ3hCLElBQUksVUFBVSxZQUFZLE1BQU07WUFDNUIsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sVUFBVSxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBRUQsVUFBVTtJQUNWLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxDQUFDLEVBQUU7UUFDckIsOERBQThEO1FBQzlELDhEQUE4RDtRQUM5RCx3REFBd0Q7UUFDeEQsT0FBTyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7S0FDNUQ7SUFFRCxXQUFXO0lBQ1gsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLENBQUMsRUFBRTtRQUNyQix3RUFBd0U7UUFDeEUseURBQXlEO1FBQ3pELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV4QyxPQUFPLG1CQUFtQixDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FDekY7SUFFRCxtQkFBbUI7SUFDbkIsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLEVBQUU7UUFDcEIsT0FBTyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFFakQsT0FBTyxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzNDLENBQUM7QUExQ0QscUNBMENDO0FBQ0QsNEJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gV0FSTklORzogdGhpcyBmaWxlIGlzIHVzZWQgYnkgYm90aCB0aGUgY2xpZW50IGFuZCB0aGUgc2VydmVyLlxuLy8gRG8gbm90IHVzZSBhbnkgYnJvd3NlciBvciBub2RlLXNwZWNpZmljIEFQSSFcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNlbGVjdG9yVGV4dEZpbHRlciAobm9kZSwgaW5kZXgsIG9yaWdpbk5vZGUsIHRleHRGaWx0ZXIpIHtcblxuICAgIGZ1bmN0aW9uIGhhc0NoaWxkcmVuV2l0aFRleHQgKHBhcmVudE5vZGUpIHtcbiAgICAgICAgY29uc3QgY25Db3VudCA9IHBhcmVudE5vZGUuY2hpbGROb2Rlcy5sZW5ndGg7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjbkNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGlmIChzZWxlY3RvclRleHRGaWx0ZXIocGFyZW50Tm9kZS5jaGlsZE5vZGVzW2ldLCBpbmRleCwgb3JpZ2luTm9kZSwgdGV4dEZpbHRlcikpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tOb2RlVGV4dCAodGV4dCkge1xuICAgICAgICBpZiAodGV4dEZpbHRlciBpbnN0YW5jZW9mIFJlZ0V4cClcbiAgICAgICAgICAgIHJldHVybiB0ZXh0RmlsdGVyLnRlc3QodGV4dCk7XG4gICAgICAgIHJldHVybiB0ZXh0RmlsdGVyID09PSB0ZXh0LnRyaW0oKTtcbiAgICB9XG5cbiAgICAvLyBFbGVtZW50XG4gICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgICAgLy8gTk9URTogSW4gRmlyZWZveCwgPG9wdGlvbj4gZWxlbWVudHMgZG9uJ3QgaGF2ZSBgaW5uZXJUZXh0YC5cbiAgICAgICAgLy8gU28sIHdlIGZhbGxiYWNrIHRvIGB0ZXh0Q29udGVudGAgaW4gdGhhdCBjYXNlIChzZWUgR0gtODYxKS5cbiAgICAgICAgLy8gU1ZHIGVsZW1lbnRzIGRvIG5vdCBoYXZlIGBpbm5lclRleHRgIHByb3BlcnR5IGFzIHdlbGxcbiAgICAgICAgcmV0dXJuIGNoZWNrTm9kZVRleHQobm9kZS5pbm5lclRleHQgfHwgbm9kZS50ZXh0Q29udGVudCk7XG4gICAgfVxuXG4gICAgLy8gRG9jdW1lbnRcbiAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gOSkge1xuICAgICAgICAvLyBOT1RFOiBsYXRlc3QgdmVyc2lvbiBvZiBFZGdlIGRvZXNuJ3QgaGF2ZSBgaW5uZXJUZXh0YCBmb3IgYGRvY3VtZW50YCxcbiAgICAgICAgLy8gYGh0bWxgIGFuZCBgYm9keWAuIFNvIHdlIGNoZWNrIHRoZWlyIGNoaWxkcmVuIGluc3RlYWQuXG4gICAgICAgIGNvbnN0IGhlYWQgPSBub2RlLnF1ZXJ5U2VsZWN0b3IoJ2hlYWQnKTtcbiAgICAgICAgY29uc3QgYm9keSA9IG5vZGUucXVlcnlTZWxlY3RvcignYm9keScpO1xuXG4gICAgICAgIHJldHVybiBoYXNDaGlsZHJlbldpdGhUZXh0KGhlYWQsIHRleHRGaWx0ZXIpIHx8IGhhc0NoaWxkcmVuV2l0aFRleHQoYm9keSwgdGV4dEZpbHRlcik7XG4gICAgfVxuXG4gICAgLy8gRG9jdW1lbnRGcmFnbWVudFxuICAgIGlmIChub2RlLm5vZGVUeXBlID09PSAxMSlcbiAgICAgICAgcmV0dXJuIGhhc0NoaWxkcmVuV2l0aFRleHQobm9kZSwgdGV4dEZpbHRlcik7XG5cbiAgICByZXR1cm4gY2hlY2tOb2RlVGV4dChub2RlLnRleHRDb250ZW50KTtcbn1cbi8qIGVzbGludC1lbmFibGUgbm8tdW5kZWYgKi9cbiJdfQ==