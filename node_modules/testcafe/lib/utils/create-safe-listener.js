"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createSafeListener(ctx, listener, debugLogger) {
    return async (...args) => {
        try {
            return await listener.apply(ctx, args);
        }
        catch (error) {
            if (error instanceof Error)
                debugLogger(listener && listener.name, error);
            return void 0;
        }
    };
}
exports.default = createSafeListener;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXNhZmUtbGlzdGVuZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvY3JlYXRlLXNhZmUtbGlzdGVuZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxTQUFTLGtCQUFrQixDQUFFLEdBQVksRUFBRSxRQUFrQixFQUFFLFdBQXFCO0lBQ2hGLE9BQU8sS0FBSyxFQUFFLEdBQUcsSUFBUSxFQUFFLEVBQUU7UUFDekIsSUFBSTtZQUNBLE9BQU8sTUFBTSxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUMxQztRQUNELE9BQU8sS0FBSyxFQUFFO1lBQ1YsSUFBSSxLQUFLLFlBQVksS0FBSztnQkFDdEIsV0FBVyxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRWxELE9BQU8sS0FBSyxDQUFDLENBQUM7U0FDakI7SUFDTCxDQUFDLENBQUM7QUFDTixDQUFDO0FBRUQsa0JBQWUsa0JBQWtCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEZWJ1Z2dlciB9IGZyb20gJ2RlYnVnJztcblxuZnVuY3Rpb24gY3JlYXRlU2FmZUxpc3RlbmVyIChjdHg6IHVua25vd24sIGxpc3RlbmVyOiBGdW5jdGlvbiwgZGVidWdMb2dnZXI6IERlYnVnZ2VyKTogRnVuY3Rpb24ge1xuICAgIHJldHVybiBhc3luYyAoLi4uYXJnczogW10pID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBsaXN0ZW5lci5hcHBseShjdHgsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpXG4gICAgICAgICAgICAgICAgZGVidWdMb2dnZXIobGlzdGVuZXIgJiYgbGlzdGVuZXIubmFtZSwgZXJyb3IpO1xuXG4gICAgICAgICAgICByZXR1cm4gdm9pZCAwO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlU2FmZUxpc3RlbmVyO1xuIl19