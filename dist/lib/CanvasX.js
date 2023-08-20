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
var _CanvasX_width, _CanvasX_height, _CanvasX_ctx, _CanvasX_objectsCreated, _CanvasX_canvasUpdate, _CanvasX_drawCanvas, _CanvasX_logic, _CanvasX_destroyObjectById;
import CanvasCamera from "./CanvasCamera.js";
import CanvasObject from "./CanvasObject.js";
import Log from "./log.js";
class CanvasX {
    constructor() {
        _CanvasX_width.set(this, 0);
        _CanvasX_height.set(this, 0);
        this.canvasObjects = [];
        this.canvas = null;
        _CanvasX_ctx.set(this, null);
        _CanvasX_objectsCreated.set(this, 0);
        this.createCanvas = (canvasId) => {
            this.canvas =
                document.getElementById(canvasId) || null;
            if (this.canvas) {
                __classPrivateFieldSet(this, _CanvasX_ctx, this.canvas.getContext("2d"), "f");
                const canvasUpdateLoop = () => {
                    __classPrivateFieldGet(this, _CanvasX_canvasUpdate, "f").call(this);
                    requestAnimationFrame(canvasUpdateLoop);
                };
                requestAnimationFrame(canvasUpdateLoop);
                return this;
            }
            else {
                Log(`No canvas with id ${canvasId} found`);
                return null;
            }
        };
        this.createCamera = (onCreate = () => { }, onUpdate = () => { }) => {
            this.canvasCamera = new CanvasCamera(onCreate, onUpdate);
            return this;
        };
        _CanvasX_canvasUpdate.set(this, () => {
            __classPrivateFieldGet(this, _CanvasX_logic, "f").call(this);
            __classPrivateFieldGet(this, _CanvasX_drawCanvas, "f").call(this);
        });
        _CanvasX_drawCanvas.set(this, () => {
            __classPrivateFieldGet(this, _CanvasX_ctx, "f").clearRect(0, 0, __classPrivateFieldGet(this, _CanvasX_width, "f"), __classPrivateFieldGet(this, _CanvasX_height, "f"));
            this.canvasObjects.forEach((canvasObject) => {
                const sprite = canvasObject.getSprite();
                const position = { ...canvasObject.getPosition() };
                const dimensions = canvasObject.getDimensions();
                const backgroundColor = canvasObject.getBackgroundColor();
                const positionOffset = this.canvasCamera.getPosition();
                position.x -= positionOffset.x;
                position.y -= positionOffset.y;
                if (backgroundColor) {
                    __classPrivateFieldGet(this, _CanvasX_ctx, "f").fillStyle = backgroundColor;
                    __classPrivateFieldGet(this, _CanvasX_ctx, "f").fillRect(position.x, position.y, dimensions.width, dimensions.height);
                }
                if (sprite) {
                    __classPrivateFieldGet(this, _CanvasX_ctx, "f").globalAlpha = canvasObject.getOpacity();
                    __classPrivateFieldGet(this, _CanvasX_ctx, "f").drawImage(sprite, position.x, position.y, dimensions.width, dimensions.height);
                }
            });
        });
        _CanvasX_logic.set(this, () => { });
        this.setCanvasWidth = (width) => {
            if (this.canvas) {
                __classPrivateFieldSet(this, _CanvasX_width, width, "f");
                this.canvas.width = width;
            }
            else {
                Log("Cannot set canvas width because no canvas found");
            }
        };
        this.setCanvasHeight = (height) => {
            if (this.canvas) {
                __classPrivateFieldSet(this, _CanvasX_height, height, "f");
                this.canvas.height = height;
            }
            else {
                Log("Cannot set canvas height because no canvas found");
            }
        };
        this.setCanvasSize = (width, height) => {
            this.setCanvasWidth(width);
            this.setCanvasHeight(height);
        };
        this.getCanvasSize = () => {
            return {
                width: __classPrivateFieldGet(this, _CanvasX_width, "f"),
                height: __classPrivateFieldGet(this, _CanvasX_height, "f"),
            };
        };
        this.getCamera = () => {
            return this.canvasCamera;
        };
        _CanvasX_destroyObjectById.set(this, (id) => {
            this.canvasObjects = this.canvasObjects.filter((canvasObject) => canvasObject.getId() !== id);
        });
        this.createObject = (onCreate = () => { }, onUpdate = () => { }, onDestroy = () => { }) => {
            var _a;
            const newObj = new CanvasObject(__classPrivateFieldSet(this, _CanvasX_objectsCreated, (_a = __classPrivateFieldGet(this, _CanvasX_objectsCreated, "f"), ++_a), "f"), onCreate, onUpdate, onDestroy, __classPrivateFieldGet(this, _CanvasX_destroyObjectById, "f"));
            this.canvasObjects.push(newObj);
            return newObj;
        };
    }
}
_CanvasX_width = new WeakMap(), _CanvasX_height = new WeakMap(), _CanvasX_ctx = new WeakMap(), _CanvasX_objectsCreated = new WeakMap(), _CanvasX_canvasUpdate = new WeakMap(), _CanvasX_drawCanvas = new WeakMap(), _CanvasX_logic = new WeakMap(), _CanvasX_destroyObjectById = new WeakMap();
export default CanvasX;
//# sourceMappingURL=CanvasX.js.map