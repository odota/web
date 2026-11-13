"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FlagList {
    constructor(flags) {
        Object.defineProperty(this, '_initialFlagValue', { writable: true, value: false });
        flags.forEach(flag => {
            this[flag] = false;
        });
    }
    reset() {
        Object.getOwnPropertyNames(this)
            .forEach(name => {
            this[name] = !this._initialFlagValue;
        });
    }
}
exports.default = FlagList;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhZy1saXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2ZsYWctbGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQXFCLFFBQVE7SUFHekIsWUFBb0IsS0FBZTtRQUMvQixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxtQkFBbUIsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFFbkYsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLEtBQUs7UUFDUixNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDO2FBQzNCLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7Q0FDSjtBQWpCRCwyQkFpQkMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBGbGFnTGlzdCB7XG4gICAgW2tleTogc3RyaW5nXTogYW55O1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yIChmbGFnczogc3RyaW5nW10pIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdfaW5pdGlhbEZsYWdWYWx1ZScsIHsgd3JpdGFibGU6IHRydWUsIHZhbHVlOiBmYWxzZSB9KTtcblxuICAgICAgICBmbGFncy5mb3JFYWNoKGZsYWcgPT4ge1xuICAgICAgICAgICAgdGhpc1tmbGFnXSA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVzZXQgKCk6IHZvaWQge1xuICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzKVxuICAgICAgICAgICAgLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpc1tuYW1lXSA9ICF0aGlzLl9pbml0aWFsRmxhZ1ZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxufVxuIl19