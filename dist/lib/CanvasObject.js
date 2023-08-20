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
var _CanvasObject_id, _CanvasObject_position, _CanvasObject_dimensions, _CanvasObject_sprite, _CanvasObject_loopId, _CanvasObject_onDestroy, _CanvasObject_destroyById, _CanvasObject_backgroundColor, _CanvasObject_opacity;
import VariableClass from "./VariableClass.js";
class CanvasObject extends VariableClass {
    constructor(id, onCreate, onUpdate, onDestroy, destroyById) {
        super();
        _CanvasObject_id.set(this, void 0);
        _CanvasObject_position.set(this, { x: 0, y: 0 });
        _CanvasObject_dimensions.set(this, { width: 100, height: 100 });
        _CanvasObject_sprite.set(this, null);
        _CanvasObject_loopId.set(this, -1);
        _CanvasObject_onDestroy.set(this, void 0);
        _CanvasObject_destroyById.set(this, void 0);
        _CanvasObject_backgroundColor.set(this, null);
        _CanvasObject_opacity.set(this, 1);
        this.getId = () => {
            return __classPrivateFieldGet(this, _CanvasObject_id, "f");
        };
        this.getPosition = () => {
            return __classPrivateFieldGet(this, _CanvasObject_position, "f");
        };
        this.setPosition = (x, y) => {
            __classPrivateFieldSet(this, _CanvasObject_position, {
                x,
                y,
            }, "f");
        };
        this.getSprite = () => {
            return __classPrivateFieldGet(this, _CanvasObject_sprite, "f");
        };
        this.setSprite = (sprite) => {
            __classPrivateFieldSet(this, _CanvasObject_sprite, sprite, "f");
        };
        this.getDimensions = () => {
            return __classPrivateFieldGet(this, _CanvasObject_dimensions, "f");
        };
        this.setDimensions = (width, height) => {
            // TODO: handle auto
            const dimensions = {
                width: typeof width === "number" ? width : 0,
                height: typeof height === "number" ? height : 0,
            };
            __classPrivateFieldSet(this, _CanvasObject_dimensions, dimensions, "f");
        };
        this.getBackgroundColor = () => {
            return __classPrivateFieldGet(this, _CanvasObject_backgroundColor, "f");
        };
        this.setBackgroundColor = (color) => {
            __classPrivateFieldSet(this, _CanvasObject_backgroundColor, color, "f");
        };
        this.getOpacity = () => {
            return __classPrivateFieldGet(this, _CanvasObject_opacity, "f");
        };
        this.setOpacity = (opacity) => {
            __classPrivateFieldSet(this, _CanvasObject_opacity, opacity, "f");
        };
        this.destroy = () => {
            __classPrivateFieldGet(this, _CanvasObject_onDestroy, "f").call(this, this);
            __classPrivateFieldGet(this, _CanvasObject_destroyById, "f").call(this, __classPrivateFieldGet(this, _CanvasObject_id, "f"));
            cancelAnimationFrame(__classPrivateFieldGet(this, _CanvasObject_loopId, "f"));
        };
        __classPrivateFieldSet(this, _CanvasObject_id, id, "f");
        onCreate(this);
        const updateLoop = () => {
            onUpdate(this);
            __classPrivateFieldSet(this, _CanvasObject_loopId, requestAnimationFrame(updateLoop), "f");
        };
        __classPrivateFieldSet(this, _CanvasObject_loopId, requestAnimationFrame(updateLoop), "f");
        __classPrivateFieldSet(this, _CanvasObject_onDestroy, onDestroy, "f");
        __classPrivateFieldSet(this, _CanvasObject_destroyById, destroyById, "f");
    }
}
_CanvasObject_id = new WeakMap(), _CanvasObject_position = new WeakMap(), _CanvasObject_dimensions = new WeakMap(), _CanvasObject_sprite = new WeakMap(), _CanvasObject_loopId = new WeakMap(), _CanvasObject_onDestroy = new WeakMap(), _CanvasObject_destroyById = new WeakMap(), _CanvasObject_backgroundColor = new WeakMap(), _CanvasObject_opacity = new WeakMap();
export default CanvasObject;
//# sourceMappingURL=CanvasObject.js.map