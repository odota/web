"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function defineLazyProperty(obj, propName, initializer) {
    Object.defineProperty(obj, propName, {
        propValue: null,
        get() {
            if (!this.propValue)
                this.propValue = initializer();
            return this.propValue;
        },
    });
}
exports.default = defineLazyProperty;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5lLWxhenktcHJvcGVydHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvZGVmaW5lLWxhenktcHJvcGVydHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxTQUF3QixrQkFBa0IsQ0FBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFdBQVc7SUFDbEUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFO1FBQ2pDLFNBQVMsRUFBRSxJQUFJO1FBRWYsR0FBRztZQUNDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUztnQkFDZixJQUFJLENBQUMsU0FBUyxHQUFHLFdBQVcsRUFBRSxDQUFDO1lBRW5DLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMxQixDQUFDO0tBQ0osQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQVhELHFDQVdDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVmaW5lTGF6eVByb3BlcnR5IChvYmosIHByb3BOYW1lLCBpbml0aWFsaXplcikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIHByb3BOYW1lLCB7XG4gICAgICAgIHByb3BWYWx1ZTogbnVsbCxcblxuICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnByb3BWYWx1ZSlcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BWYWx1ZSA9IGluaXRpYWxpemVyKCk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BWYWx1ZTtcbiAgICAgICAgfSxcbiAgICB9KTtcbn1cbiJdfQ==