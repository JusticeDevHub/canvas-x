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
var _CanvasX_width, _CanvasX_height, _CanvasX_ctx, _CanvasX_objectsCreated, _CanvasX_mousePosition, _CanvasX_onUpdate, _CanvasX_wheelScroll, _CanvasX_canvasUpdate, _CanvasX_drawCanvas, _CanvasX_logic, _CanvasX_destroyObjectById;
import CanvasCamera from "./CanvasCamera.js";
import CanvasObject from "./CanvasObject.js";
import VariableClass from "./VariableClass.js";
import Log from "./log.js";
import onHover from "./utils/onHover.js";
import onWheelScroll from "./utils/onWheelScroll.js";
class CanvasX extends VariableClass {
    constructor() {
        super(...arguments);
        _CanvasX_width.set(this, 0);
        _CanvasX_height.set(this, 0);
        this.canvasCamera = new CanvasCamera(-1, () => { }, () => { });
        this.canvasObjects = [];
        this.canvas = null;
        _CanvasX_ctx.set(this, null);
        _CanvasX_objectsCreated.set(this, 0);
        _CanvasX_mousePosition.set(this, { x: 0, y: 0 });
        _CanvasX_onUpdate.set(this, null);
        _CanvasX_wheelScroll.set(this, { x: 0, y: 0 });
        this.createCanvas = (canvasId, onCreate = () => { }, onUpdate = () => { }) => {
            this.canvas =
                document.getElementById(canvasId) || null;
            if (this.canvas) {
                __classPrivateFieldSet(this, _CanvasX_ctx, this.canvas.getContext("2d"), "f");
                const canvasUpdateLoop = () => {
                    __classPrivateFieldGet(this, _CanvasX_canvasUpdate, "f").call(this);
                    requestAnimationFrame(canvasUpdateLoop);
                };
                requestAnimationFrame(canvasUpdateLoop);
                document.addEventListener("click", (e) => {
                    this.canvasObjects.forEach((canvasObject) => {
                        if (canvasObject.getOnHoverTrue()) {
                            const onClicked = canvasObject.getOnClicked();
                            if (onClicked) {
                                onClicked(canvasObject);
                            }
                        }
                    });
                });
                document.addEventListener("wheel", (e) => {
                    __classPrivateFieldSet(this, _CanvasX_wheelScroll, {
                        x: Math.abs(e.deltaX) < 10 ? 0 : e.deltaX,
                        y: Math.abs(e.deltaY) < 10 ? 0 : e.deltaY,
                    }, "f");
                });
                document.onmousemove = (e) => {
                    __classPrivateFieldSet(this, _CanvasX_mousePosition, {
                        x: e.clientX - __classPrivateFieldGet(this, _CanvasX_width, "f") / 2,
                        y: e.clientY - __classPrivateFieldGet(this, _CanvasX_height, "f") / 2,
                    }, "f");
                };
                onCreate(this);
                __classPrivateFieldSet(this, _CanvasX_onUpdate, onUpdate, "f");
                return this;
            }
            else {
                Log(`No canvas with id ${canvasId} found`);
                return null;
            }
        };
        _CanvasX_canvasUpdate.set(this, () => {
            __classPrivateFieldGet(this, _CanvasX_logic, "f").call(this);
            __classPrivateFieldGet(this, _CanvasX_drawCanvas, "f").call(this);
        });
        _CanvasX_drawCanvas.set(this, () => {
            __classPrivateFieldGet(this, _CanvasX_ctx, "f").clearRect(0, 0, __classPrivateFieldGet(this, _CanvasX_width, "f"), __classPrivateFieldGet(this, _CanvasX_height, "f"));
            this.canvasObjects.forEach((canvasObject) => {
                const sprite = canvasObject.getSprite();
                const backgroundColor = canvasObject.getBackgroundColor();
                const cameraZoomLevel = this.canvasCamera.getZoomLevel();
                const cameraPositionOffset = this.canvasCamera.getPosition();
                const position = canvasObject.getPosition();
                const dimensions = canvasObject.getDimensions();
                dimensions.width *= cameraZoomLevel;
                dimensions.height *= cameraZoomLevel;
                position.x -= cameraPositionOffset.x;
                position.y -= cameraPositionOffset.y;
                position.x *= cameraZoomLevel;
                position.y *= cameraZoomLevel;
                position.x -= dimensions.width / 2;
                position.y -= dimensions.height / 2;
                position.x += __classPrivateFieldGet(this, _CanvasX_width, "f") / 2;
                position.y += __classPrivateFieldGet(this, _CanvasX_height, "f") / 2;
                if (backgroundColor) {
                    __classPrivateFieldGet(this, _CanvasX_ctx, "f").globalAlpha = canvasObject.getOpacity();
                    __classPrivateFieldGet(this, _CanvasX_ctx, "f").fillStyle = backgroundColor;
                    __classPrivateFieldGet(this, _CanvasX_ctx, "f").fillRect(position.x, position.y, dimensions.width, dimensions.height);
                }
                if (sprite) {
                    __classPrivateFieldGet(this, _CanvasX_ctx, "f").globalAlpha = canvasObject.getOpacity();
                    __classPrivateFieldGet(this, _CanvasX_ctx, "f").drawImage(sprite, position.x, position.y, dimensions.width, dimensions.height);
                }
            });
        });
        _CanvasX_logic.set(this, () => {
            const objs = [...this.canvasObjects, this.canvasCamera];
            objs.forEach((canvasObject) => {
                __classPrivateFieldGet(this, _CanvasX_onUpdate, "f").call(this, this);
                onWheelScroll(canvasObject, { ...__classPrivateFieldGet(this, _CanvasX_wheelScroll, "f") });
                onHover(canvasObject, { ...__classPrivateFieldGet(this, _CanvasX_mousePosition, "f") }, this.getCamera().getZoomLevel());
            });
        });
        this.setCanvasSize = (width, height) => {
            if (this.canvas) {
                __classPrivateFieldSet(this, _CanvasX_width, width, "f");
                __classPrivateFieldSet(this, _CanvasX_height, height, "f");
                this.canvas.width = width;
                this.canvas.height = height;
                this.canvas.style.width = `${width}px`;
                this.canvas.style.height = `${height}px`;
            }
            else {
                Log("Cannot set canvas width because no canvas found");
            }
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
        this.setMouseCursor = (cursorType) => {
            document.body.style.cursor = cursorType;
        };
        this.createObject = (onCreate = () => { }, onUpdate = () => { }, onDestroy = () => { }) => {
            var _a;
            const newObj = new CanvasObject(__classPrivateFieldSet(this, _CanvasX_objectsCreated, (_a = __classPrivateFieldGet(this, _CanvasX_objectsCreated, "f"), ++_a), "f"), onCreate, onUpdate, onDestroy, __classPrivateFieldGet(this, _CanvasX_destroyObjectById, "f"));
            this.canvasObjects.push(newObj);
            return newObj;
        };
        this.createCamera = (onCreate = () => { }, onUpdate = () => { }) => {
            var _a;
            this.canvasCamera = new CanvasCamera(__classPrivateFieldSet(this, _CanvasX_objectsCreated, (_a = __classPrivateFieldGet(this, _CanvasX_objectsCreated, "f"), ++_a), "f"), onCreate, onUpdate);
            this.canvasObjects.push(this.canvasCamera);
            return this.canvasCamera;
        };
    }
}
_CanvasX_width = new WeakMap(), _CanvasX_height = new WeakMap(), _CanvasX_ctx = new WeakMap(), _CanvasX_objectsCreated = new WeakMap(), _CanvasX_mousePosition = new WeakMap(), _CanvasX_onUpdate = new WeakMap(), _CanvasX_wheelScroll = new WeakMap(), _CanvasX_canvasUpdate = new WeakMap(), _CanvasX_drawCanvas = new WeakMap(), _CanvasX_logic = new WeakMap(), _CanvasX_destroyObjectById = new WeakMap();
export default CanvasX;
//# sourceMappingURL=CanvasX.js.map