"use strict";
// -------------------------------------------------------------
// WARNING: this file is used by both the client and the server.
// Do not use any browser or node-specific API!
// -------------------------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
function selectorAttributeFilter(node, index, originNode, attrName, attrValue) {
    if (node.nodeType !== 1)
        return false;
    const attributes = node.attributes;
    let attr = null;
    const check = (actual, expect) => typeof expect === 'string' ? expect === actual : expect.test(actual);
    for (let i = 0; i < attributes.length; i++) {
        attr = attributes[i];
        if (check(attr.nodeName, attrName) && (!attrValue || check(attr.nodeValue, attrValue)))
            return true;
    }
    return false;
}
exports.default = selectorAttributeFilter;
/* eslint-enable no-undef */
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0b3ItYXR0cmlidXRlLWZpbHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGllbnQtZnVuY3Rpb25zL3NlbGVjdG9ycy9zZWxlY3Rvci1hdHRyaWJ1dGUtZmlsdGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxnRUFBZ0U7QUFDaEUsZ0VBQWdFO0FBQ2hFLCtDQUErQztBQUMvQyxnRUFBZ0U7O0FBRWhFLDZCQUE2QjtBQUM3QixTQUF3Qix1QkFBdUIsQ0FBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsU0FBUztJQUN6RixJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssQ0FBQztRQUNuQixPQUFPLEtBQUssQ0FBQztJQUVqQixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ25DLElBQUksSUFBSSxHQUFTLElBQUksQ0FBQztJQUV0QixNQUFNLEtBQUssR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUV2RyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN4QyxJQUFJLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXJCLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNsRixPQUFPLElBQUksQ0FBQztLQUNuQjtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFqQkQsMENBaUJDO0FBQ0QsNEJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gV0FSTklORzogdGhpcyBmaWxlIGlzIHVzZWQgYnkgYm90aCB0aGUgY2xpZW50IGFuZCB0aGUgc2VydmVyLlxuLy8gRG8gbm90IHVzZSBhbnkgYnJvd3NlciBvciBub2RlLXNwZWNpZmljIEFQSSFcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNlbGVjdG9yQXR0cmlidXRlRmlsdGVyIChub2RlLCBpbmRleCwgb3JpZ2luTm9kZSwgYXR0ck5hbWUsIGF0dHJWYWx1ZSkge1xuICAgIGlmIChub2RlLm5vZGVUeXBlICE9PSAxKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gbm9kZS5hdHRyaWJ1dGVzO1xuICAgIGxldCBhdHRyICAgICAgID0gbnVsbDtcblxuICAgIGNvbnN0IGNoZWNrID0gKGFjdHVhbCwgZXhwZWN0KSA9PiB0eXBlb2YgZXhwZWN0ID09PSAnc3RyaW5nJyA/IGV4cGVjdCA9PT0gYWN0dWFsIDogZXhwZWN0LnRlc3QoYWN0dWFsKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBhdHRyID0gYXR0cmlidXRlc1tpXTtcblxuICAgICAgICBpZiAoY2hlY2soYXR0ci5ub2RlTmFtZSwgYXR0ck5hbWUpICYmICghYXR0clZhbHVlIHx8IGNoZWNrKGF0dHIubm9kZVZhbHVlLCBhdHRyVmFsdWUpKSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn1cbi8qIGVzbGludC1lbmFibGUgbm8tdW5kZWYgKi9cbiJdfQ==