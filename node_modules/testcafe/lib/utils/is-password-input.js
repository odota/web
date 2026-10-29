"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isPasswordInput(node) {
    var _a;
    if (!node)
        return false;
    return node.tagName === 'input' && ((_a = node.attributes) === null || _a === void 0 ? void 0 : _a.type) === 'password';
}
exports.default = isPasswordInput;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtcGFzc3dvcmQtaW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvaXMtcGFzc3dvcmQtaW5wdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxTQUF3QixlQUFlLENBQUUsSUFBbUI7O0lBQ3hELElBQUksQ0FBQyxJQUFJO1FBQ0wsT0FBTyxLQUFLLENBQUM7SUFFakIsT0FBTyxJQUFJLENBQUMsT0FBTyxLQUFLLE9BQU8sSUFBSSxDQUFBLE1BQUEsSUFBSSxDQUFDLFVBQVUsMENBQUUsSUFBSSxNQUFLLFVBQVUsQ0FBQztBQUM1RSxDQUFDO0FBTEQsa0NBS0MiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc1Bhc3N3b3JkSW5wdXQgKG5vZGU/OiBOb2RlU25hcHNob3QpOiBib29sZWFuIHtcbiAgICBpZiAoIW5vZGUpXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIHJldHVybiBub2RlLnRhZ05hbWUgPT09ICdpbnB1dCcgJiYgbm9kZS5hdHRyaWJ1dGVzPy50eXBlID09PSAncGFzc3dvcmQnO1xufVxuIl19