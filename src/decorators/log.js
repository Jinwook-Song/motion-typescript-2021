var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function Log(_, name, descriptor) {
    var newDescriptor = __assign(__assign({}, descriptor), { value: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log("Calling " + name + " with arguments:");
            console.dir(args);
            var result = descriptor.value.apply(this, args);
            console.log("Result:");
            console.dir(result);
            return result;
        } });
    return newDescriptor;
}
var Calculator = /** @class */ (function () {
    function Calculator() {
    }
    Calculator.prototype.add = function (x, y) {
        return x + y;
    };
    __decorate([
        Log
    ], Calculator.prototype, "add");
    return Calculator;
}());
var calculator = new Calculator();
console.log(calculator.add(1, 2));
