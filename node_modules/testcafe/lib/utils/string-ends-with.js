"use strict";
// -------------------------------------------------------------
// WARNING: this file is used by both the client and the server.
// Do not use any browser or node-specific API!
// -------------------------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
const objectToString = Object.prototype.toString;
const stringIndexOf = String.prototype.indexOf;
const stringEndsWith = String.prototype.endsWith
    || function (searchString, position) {
        const subjectString = objectToString.call(this);
        if (position === void 0 || position > subjectString.length)
            position = subjectString.length;
        position -= searchString.length;
        const lastIndex = stringIndexOf.call(subjectString, searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    };
exports.default = stringEndsWith;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLWVuZHMtd2l0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9zdHJpbmctZW5kcy13aXRoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxnRUFBZ0U7QUFDaEUsZ0VBQWdFO0FBQ2hFLCtDQUErQztBQUMvQyxnRUFBZ0U7O0FBRWhFLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO0FBQ2pELE1BQU0sYUFBYSxHQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO0FBRWhELE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUTtPQUNmLFVBQVUsWUFBWSxFQUFFLFFBQVE7UUFDL0IsTUFBTSxhQUFhLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVoRCxJQUFJLFFBQVEsS0FBSyxLQUFLLENBQUMsSUFBSSxRQUFRLEdBQUcsYUFBYSxDQUFDLE1BQU07WUFDdEQsUUFBUSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFFcEMsUUFBUSxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUM7UUFFaEMsTUFBTSxTQUFTLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRTVFLE9BQU8sU0FBUyxLQUFLLENBQUMsQ0FBQyxJQUFJLFNBQVMsS0FBSyxRQUFRLENBQUM7SUFDdEQsQ0FBQyxDQUFDO0FBRWhDLGtCQUFlLGNBQWMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFdBUk5JTkc6IHRoaXMgZmlsZSBpcyB1c2VkIGJ5IGJvdGggdGhlIGNsaWVudCBhbmQgdGhlIHNlcnZlci5cbi8vIERvIG5vdCB1c2UgYW55IGJyb3dzZXIgb3Igbm9kZS1zcGVjaWZpYyBBUEkhXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmNvbnN0IG9iamVjdFRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbmNvbnN0IHN0cmluZ0luZGV4T2YgID0gU3RyaW5nLnByb3RvdHlwZS5pbmRleE9mO1xuXG5jb25zdCBzdHJpbmdFbmRzV2l0aCA9IFN0cmluZy5wcm90b3R5cGUuZW5kc1dpdGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IGZ1bmN0aW9uIChzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3ViamVjdFN0cmluZyA9IG9iamVjdFRvU3RyaW5nLmNhbGwodGhpcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24gPT09IHZvaWQgMCB8fCBwb3NpdGlvbiA+IHN1YmplY3RTdHJpbmcubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IHN1YmplY3RTdHJpbmcubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gLT0gc2VhcmNoU3RyaW5nLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RJbmRleCA9IHN0cmluZ0luZGV4T2YuY2FsbChzdWJqZWN0U3RyaW5nLCBzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBsYXN0SW5kZXggIT09IC0xICYmIGxhc3RJbmRleCA9PT0gcG9zaXRpb247XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG5leHBvcnQgZGVmYXVsdCBzdHJpbmdFbmRzV2l0aDtcbiJdfQ==