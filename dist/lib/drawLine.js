var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _LineClass_lineWidth, _LineClass_fromPosition, _LineClass_toPosition, _LineClass_color;
class LineClass {
    constructor() {
        _LineClass_lineWidth.set(this, 1);
        _LineClass_fromPosition.set(this, null);
        _LineClass_toPosition.set(this, null);
        _LineClass_color.set(this, null);
        this.setNull = () => {
            __classPrivateFieldSet(this, _LineClass_lineWidth, 1, "f");
            __classPrivateFieldSet(this, _LineClass_fromPosition, null, "f");
            __classPrivateFieldSet(this, _LineClass_toPosition, null, "f");
            __classPrivateFieldSet(this, _LineClass_color, null, "f");
        };
        this.setLine = (fromPosition, toPosition) => {
            __classPrivateFieldSet(this, _LineClass_fromPosition, fromPosition, "f");
            __classPrivateFieldSet(this, _LineClass_toPosition, toPosition, "f");
            if (__classPrivateFieldGet(this, _LineClass_color, "f") === null) {
                __classPrivateFieldSet(this, _LineClass_color, "black", "f");
            }
            return this;
        };
        this.setLineWidth = (lineWidth) => {
            __classPrivateFieldSet(this, _LineClass_lineWidth, lineWidth, "f");
            return this;
        };
        this.setColor = (color) => {
            __classPrivateFieldSet(this, _LineClass_color, color, "f");
            return this;
        };
        this.getLineData = () => {
            return {
                fromPosition: __classPrivateFieldGet(this, _LineClass_fromPosition, "f"),
                toPosition: __classPrivateFieldGet(this, _LineClass_toPosition, "f"),
                color: __classPrivateFieldGet(this, _LineClass_color, "f"),
                lineWidth: __classPrivateFieldGet(this, _LineClass_lineWidth, "f"),
            };
        };
    }
}
_LineClass_lineWidth = new WeakMap(), _LineClass_fromPosition = new WeakMap(), _LineClass_toPosition = new WeakMap(), _LineClass_color = new WeakMap();
export default LineClass;
//# sourceMappingURL=drawLine.js.map