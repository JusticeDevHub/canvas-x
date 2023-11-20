var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _CircleClass_render, _CircleClass_radius, _CircleClass_color, _CircleClass_strokeWidth;
class CircleClass {
    constructor() {
        _CircleClass_render.set(this, false);
        _CircleClass_radius.set(this, null);
        _CircleClass_color.set(this, null);
        _CircleClass_strokeWidth.set(this, null);
        this.getRender = () => __classPrivateFieldGet(this, _CircleClass_render, "f");
        this.updateDefaultValues = () => {
            __classPrivateFieldSet(this, _CircleClass_render, true, "f");
            const defaultValues = {
                render: true,
                radius: 100,
                color: "gray",
                strokeWidth: 1,
            };
            if (__classPrivateFieldGet(this, _CircleClass_color, "f") === null) {
                __classPrivateFieldSet(this, _CircleClass_color, defaultValues.color, "f");
            }
            if (__classPrivateFieldGet(this, _CircleClass_radius, "f") === null) {
                __classPrivateFieldSet(this, _CircleClass_radius, defaultValues.radius, "f");
            }
            if (__classPrivateFieldGet(this, _CircleClass_strokeWidth, "f") === null) {
                __classPrivateFieldSet(this, _CircleClass_strokeWidth, defaultValues.strokeWidth, "f");
            }
        };
        this.getRadius = () => __classPrivateFieldGet(this, _CircleClass_radius, "f");
        this.setRadius = (radius) => {
            __classPrivateFieldSet(this, _CircleClass_radius, radius, "f");
            this.updateDefaultValues();
            return this;
        };
        this.getStrokeWidth = () => __classPrivateFieldGet(this, _CircleClass_strokeWidth, "f");
        this.setStrokeWidth = (width) => {
            __classPrivateFieldSet(this, _CircleClass_strokeWidth, width, "f");
            this.updateDefaultValues();
        };
        this.getColor = () => __classPrivateFieldGet(this, _CircleClass_color, "f");
        this.setColor = (color) => {
            __classPrivateFieldSet(this, _CircleClass_color, color, "f");
            this.updateDefaultValues();
            return this;
        };
    }
}
_CircleClass_render = new WeakMap(), _CircleClass_radius = new WeakMap(), _CircleClass_color = new WeakMap(), _CircleClass_strokeWidth = new WeakMap();
export default CircleClass;
//# sourceMappingURL=drawClass.js.map