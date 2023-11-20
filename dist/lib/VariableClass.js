var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _VariableClass_variables;
class VariableClass {
    constructor() {
        _VariableClass_variables.set(this, {});
        this.getVariableValue = (key) => {
            return __classPrivateFieldGet(this, _VariableClass_variables, "f")[key];
        };
        this.setVariableValue = (key, value) => {
            __classPrivateFieldGet(this, _VariableClass_variables, "f")[key] = value;
        };
    }
}
_VariableClass_variables = new WeakMap();
export default VariableClass;
//# sourceMappingURL=VariableClass.js.map