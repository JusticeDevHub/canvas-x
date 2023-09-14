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
var _CanvasCamera_zoomLevel;
import CanvasObject from "./CanvasObject.js";
class CanvasCamera extends CanvasObject {
    constructor(id, onCreate = (_this) => { }, onUpdate = (_this) => { }) {
        super(id, onCreate, onUpdate, () => { }, () => { });
        _CanvasCamera_zoomLevel.set(this, 1);
        this.getZoomLevel = () => {
            return __classPrivateFieldGet(this, _CanvasCamera_zoomLevel, "f");
        };
        this.setZoomLevel = (zoomLevel) => {
            __classPrivateFieldSet(this, _CanvasCamera_zoomLevel, zoomLevel > 0 ? zoomLevel : 0.001, "f");
        };
    }
}
_CanvasCamera_zoomLevel = new WeakMap();
export default CanvasCamera;
//# sourceMappingURL=CanvasCamera.js.map