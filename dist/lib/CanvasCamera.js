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
var _CanvasCamera_zoomLevel, _CanvasCamera_zoomByScroll, _CanvasCamera_zoomSpeed;
import CanvasObject from "./CanvasObject.js";
export default class CanvasCamera extends CanvasObject {
    constructor(id, name, onCreate = (_this) => { }, onUpdate = (_this) => { }, canvasX) {
        super(id, name, (_this) => {
            onCreate(this);
        }, (_this) => {
            onUpdate(this);
        }, () => { }, () => { }, canvasX);
        _CanvasCamera_zoomLevel.set(this, 1);
        _CanvasCamera_zoomByScroll.set(this, false);
        _CanvasCamera_zoomSpeed.set(this, 1);
        this.getZoomLevel = () => {
            return __classPrivateFieldGet(this, _CanvasCamera_zoomLevel, "f");
        };
        this.setZoomLevel = (zoomLevel) => {
            __classPrivateFieldSet(this, _CanvasCamera_zoomLevel, zoomLevel > 0 ? zoomLevel : 0.001, "f");
        };
        this.getZoomSpeed = () => {
            return __classPrivateFieldGet(this, _CanvasCamera_zoomSpeed, "f");
        };
        this.setZoomSpeed = (zoomSpeed) => {
            __classPrivateFieldSet(this, _CanvasCamera_zoomSpeed, zoomSpeed, "f");
        };
        this.getZoomByScroll = () => {
            return __classPrivateFieldGet(this, _CanvasCamera_zoomByScroll, "f");
        };
        this.setZoomByScroll = (value, zoomSpeed = 1) => {
            __classPrivateFieldSet(this, _CanvasCamera_zoomByScroll, value, "f");
            __classPrivateFieldSet(this, _CanvasCamera_zoomSpeed, zoomSpeed, "f");
        };
    }
}
_CanvasCamera_zoomLevel = new WeakMap(), _CanvasCamera_zoomByScroll = new WeakMap(), _CanvasCamera_zoomSpeed = new WeakMap();
//# sourceMappingURL=CanvasCamera.js.map