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
var _CanvasCamera_position, _CanvasCamera_zoomLevel;
import VariableClass from "./VariableClass.js";
class CanvasCamera extends VariableClass {
    constructor(onCreate = () => { }, onUpdate = () => { }) {
        super();
        _CanvasCamera_position.set(this, { x: 0, y: 0 });
        _CanvasCamera_zoomLevel.set(this, 1);
        this.getPosition = () => {
            return __classPrivateFieldGet(this, _CanvasCamera_position, "f");
        };
        this.setPosition = (x, y) => {
            __classPrivateFieldSet(this, _CanvasCamera_position, {
                x,
                y,
            }, "f");
        };
        this.getZoomLevel = () => {
            return __classPrivateFieldGet(this, _CanvasCamera_zoomLevel, "f");
        };
        this.setZoomLevel = (zoomLevel) => {
            __classPrivateFieldSet(this, _CanvasCamera_zoomLevel, zoomLevel, "f");
        };
        onCreate(this);
        // TODO: On cancal close animation frame
        const updateLoop = () => {
            onUpdate(this);
            requestAnimationFrame(updateLoop);
        };
        requestAnimationFrame(updateLoop);
    }
}
_CanvasCamera_position = new WeakMap(), _CanvasCamera_zoomLevel = new WeakMap();
export default CanvasCamera;
//# sourceMappingURL=CanvasCamera.js.map