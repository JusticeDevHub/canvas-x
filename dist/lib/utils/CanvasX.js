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
var _CanvasX_width, _CanvasX_height, _CanvasX_ctx, _CanvasX_objectsCreated, _CanvasX_mousePosition, _CanvasX_onUpdate, _CanvasX_wheelScroll, _CanvasX_loopId, _CanvasX_globalValues, _CanvasX_window, _CanvasX_canvasUpdate, _CanvasX_logic, _CanvasX_drawCanvas, _CanvasX_destroyObjectById;
import CanvasCamera from "./CanvasCamera.js";
import CanvasObject from "./CanvasObject.js";
import VariableClass from "./VariableClass.js";
import Log from "./log.js";
import onHover from "./utils/onHover.js";
import onWheelScroll from "./utils/onWheelScroll.js";
import moveToPositionHandling from "./utils/moveToPositionHandling.js";
import isDraggedHandling from "./utils/isDraggedHandling.js";
import drawSpriteCTX from "./utils/drawSpriteCTX.js";
import updateCanvasMousePosition from "./utils/updateCanvasMousePosition.js";
import handleCollisions from "./utils/handleCollisions.js";
export default class CanvasX extends VariableClass {
    constructor() {
        super(...arguments);
        _CanvasX_width.set(this, "auto");
        _CanvasX_height.set(this, "auto");
        this.canvasCamera = new CanvasCamera(-1, "", () => { }, () => { }, this);
        this.canvasObjects = [];
        this.canvas = null;
        _CanvasX_ctx.set(this, null);
        _CanvasX_objectsCreated.set(this, 0);
        _CanvasX_mousePosition.set(this, { x: 0, y: 0 });
        _CanvasX_onUpdate.set(this, (_this) => { });
        _CanvasX_wheelScroll.set(this, { x: 0, y: 0 });
        _CanvasX_loopId.set(this, null);
        _CanvasX_globalValues.set(this, new VariableClass());
        _CanvasX_window.set(this, null);
        this.init = (canvasId, onCreate = (_this) => { }, onUpdate = (_this) => { }) => {
            this.canvas =
                document.getElementById(canvasId) || null;
            if (this.canvas) {
                this.setCanvasSize("auto", "auto");
                __classPrivateFieldSet(this, _CanvasX_ctx, this.canvas.getContext("2d"), "f");
                __classPrivateFieldSet(this, _CanvasX_loopId, setInterval(() => {
                    __classPrivateFieldGet(this, _CanvasX_canvasUpdate, "f").call(this);
                }, 1000 / 60), "f");
                const mouseOrClickDown = (e) => {
                    // e.preventDefault();
                    if (e instanceof MouseEvent) {
                        updateCanvasMousePosition(this, e.clientX, e.clientY);
                    }
                    else if (e.touches && e.touches[0]) {
                        updateCanvasMousePosition(this, e.touches[0].clientX, e.touches[0].clientY);
                    }
                    this.canvasObjects.forEach((canvasObject) => {
                        // Handle Global Left Click
                        const global_left_click = canvasObject.getOnClick("global_left_click");
                        if (global_left_click) {
                            global_left_click(canvasObject);
                        }
                        if (canvasObject.getOnHoverTrue()) {
                            // Handle this Left Clicked
                            const this_left_click = canvasObject.getOnClick("this_left_click");
                            if (this_left_click) {
                                this_left_click(canvasObject);
                            }
                            // Handle drag
                            const draggable = canvasObject.getDraggable();
                            if (draggable) {
                                const dragData = canvasObject.getDragData();
                                canvasObject.setDragData({
                                    dragPositionOffset: {
                                        x: __classPrivateFieldGet(this, _CanvasX_mousePosition, "f").x - canvasObject.getPosition().x,
                                        y: __classPrivateFieldGet(this, _CanvasX_mousePosition, "f").y - canvasObject.getPosition().y,
                                    },
                                    isDragged: true,
                                    smoothness: dragData.smoothness,
                                });
                            }
                        }
                    });
                };
                const mouseOrClickUp = (e) => {
                    // e.preventDefault();
                    this.canvasObjects.forEach((canvasObject) => {
                        // Handle click release
                        const clickRelease = canvasObject.getClickRelease();
                        if (clickRelease !== null) {
                            clickRelease(canvasObject);
                        }
                        // Handle drag
                        const dragData = canvasObject.getDragData();
                        if (dragData.isDragged) {
                            canvasObject.setDragData({
                                dragPositionOffset: {
                                    x: 0,
                                    y: 0,
                                },
                                isDragged: false,
                                smoothness: dragData.smoothness,
                            });
                        }
                    });
                };
                const mouseOrClickMove = (e, clientX, clientY) => {
                    if (this.canvas === null) {
                        return;
                    }
                    // e.preventDefault();
                    updateCanvasMousePosition(this, clientX, clientY);
                };
                document.addEventListener("mousedown", (e) => {
                    mouseOrClickDown(e);
                });
                document.addEventListener("touchstart", (e) => {
                    mouseOrClickDown(e);
                });
                document.addEventListener("mousemove", (e) => {
                    mouseOrClickMove(e, e.clientX, e.clientY);
                });
                document.addEventListener("touchmove", (e) => {
                    if (e && e.touches && e.touches[0]) {
                        const clientX = e.touches[0].clientX;
                        const clientY = e.touches[0].clientY;
                        mouseOrClickMove(e, clientX, clientY);
                    }
                });
                document.addEventListener("mouseup", (e) => {
                    mouseOrClickUp(e);
                });
                document.addEventListener("touchend", (e) => {
                    mouseOrClickUp(e);
                });
                document.addEventListener("contextmenu", (e) => {
                    // e.preventDefault();
                    this.canvasObjects.forEach((canvasObject) => {
                        const global_right_click = canvasObject.getOnClick("global_right_click");
                        if (global_right_click) {
                            global_right_click(canvasObject);
                        }
                        if (canvasObject.getOnHoverTrue()) {
                            const this_right_click = canvasObject.getOnClick("this_right_click");
                            if (this_right_click) {
                                this_right_click(canvasObject);
                            }
                        }
                    });
                });
                document.addEventListener("wheel", (e) => {
                    if (this.canvasCamera.getZoomByScroll()) {
                        let zoomLevel = this.canvasCamera.getZoomLevel();
                        const zoomSpeed = this.canvasCamera.getZoomSpeed();
                        const bassScrollSpeedPoint = 50;
                        const scrollDelta = 1 + 0.02 * zoomSpeed * (Math.abs(e.deltaY) / bassScrollSpeedPoint);
                        if (e.deltaY < 0) {
                            zoomLevel *= scrollDelta;
                        }
                        else {
                            zoomLevel /= scrollDelta;
                        }
                        this.canvasCamera.setZoomLevel(zoomLevel);
                    }
                    // TODO: Seems not needed
                    __classPrivateFieldSet(this, _CanvasX_wheelScroll, {
                        x: Math.abs(e.deltaX) < 10 ? 0 : e.deltaX,
                        y: Math.abs(e.deltaY) < 10 ? 0 : e.deltaY,
                    }, "f");
                });
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
        _CanvasX_logic.set(this, () => {
            __classPrivateFieldGet(this, _CanvasX_onUpdate, "f").call(this, this);
            const objs = [...this.canvasObjects, this.canvasCamera];
            objs.forEach((canvasObject) => {
                const update = canvasObject.getOnUpdate();
                handleCollisions(canvasObject, this);
                moveToPositionHandling(canvasObject);
                onWheelScroll(canvasObject, { ...__classPrivateFieldGet(this, _CanvasX_wheelScroll, "f") });
                onHover(canvasObject, { ...__classPrivateFieldGet(this, _CanvasX_mousePosition, "f") });
                isDraggedHandling(canvasObject, { ...__classPrivateFieldGet(this, _CanvasX_mousePosition, "f") });
                update(canvasObject);
            });
        });
        _CanvasX_drawCanvas.set(this, () => {
            if (this.canvas === null || __classPrivateFieldGet(this, _CanvasX_ctx, "f") === null) {
                return;
            }
            const canvasSize = this.getCanvasSize();
            __classPrivateFieldGet(this, _CanvasX_ctx, "f").clearRect(0, 0, canvasSize.width, canvasSize.height);
            const canvasObjectsDrawOrder = [];
            this.canvasObjects.forEach((canvasObject) => {
                const obj = { ...canvasObject };
                if (canvasObject.getVisible()) {
                    canvasObjectsDrawOrder.push(obj);
                }
            });
            canvasObjectsDrawOrder.sort((a, b) => {
                return a.getPosition().z - b.getPosition().z;
            });
            canvasObjectsDrawOrder.forEach((canvasObject) => {
                const spriteData = canvasObject.getSpriteData();
                const backgroundColor = canvasObject.getBackgroundColor();
                const cameraZoomLevel = this.canvasCamera.getZoomLevel();
                const cameraPositionOffset = this.canvasCamera.getPosition();
                const position = canvasObject.getPosition();
                const dimensions = canvasObject.getDimensions();
                const rotation = canvasObject.getRotation();
                const parent = canvasObject.getParent();
                if (parent) {
                    const parentPosition = parent.getPosition();
                    position.x += parentPosition.x;
                    position.y += parentPosition.y;
                }
                dimensions.width *= cameraZoomLevel;
                dimensions.height *= cameraZoomLevel;
                position.x -= cameraPositionOffset.x;
                position.y -= cameraPositionOffset.y;
                position.x *= cameraZoomLevel;
                position.y *= cameraZoomLevel;
                position.x -= dimensions.width / 2;
                position.y -= dimensions.height / 2;
                position.x += canvasSize.width / 2;
                position.y += canvasSize.height / 2;
                if (backgroundColor && __classPrivateFieldGet(this, _CanvasX_ctx, "f") !== null) {
                    __classPrivateFieldGet(this, _CanvasX_ctx, "f").globalAlpha = canvasObject.getOpacity();
                    __classPrivateFieldGet(this, _CanvasX_ctx, "f").fillStyle = backgroundColor;
                    __classPrivateFieldGet(this, _CanvasX_ctx, "f").fillRect(position.x, position.y, dimensions.width, dimensions.height);
                }
                if (spriteData.sprites && __classPrivateFieldGet(this, _CanvasX_ctx, "f") !== null) {
                    __classPrivateFieldGet(this, _CanvasX_ctx, "f").save();
                    __classPrivateFieldGet(this, _CanvasX_ctx, "f").globalAlpha = canvasObject.getOpacity();
                    __classPrivateFieldGet(this, _CanvasX_ctx, "f").translate(position.x + dimensions.width / 2, position.y + dimensions.height / 2);
                    __classPrivateFieldGet(this, _CanvasX_ctx, "f").rotate(rotation * (Math.PI / 180));
                    __classPrivateFieldGet(this, _CanvasX_ctx, "f").translate(-(position.x + dimensions.width / 2), -(position.y + dimensions.height / 2));
                    const sprites = spriteData.sprites;
                    if (sprites && sprites[0] && sprites.length === 1) {
                        drawSpriteCTX(__classPrivateFieldGet(this, _CanvasX_ctx, "f"), sprites[0], position.x, position.y, dimensions.width, dimensions.height);
                    }
                    else if (sprites.length > 1) {
                        const timePassed = (new Date().getTime() -
                            canvasObject.getSpriteData().startTimeFrame) /
                            1000;
                        const animationFrame = Math.floor((timePassed * spriteData.animationSpeed) % spriteData.sprites.length);
                        const sprite = sprites[animationFrame];
                        if (sprite) {
                            drawSpriteCTX(__classPrivateFieldGet(this, _CanvasX_ctx, "f"), sprite, position.x, position.y, dimensions.width, dimensions.height);
                        }
                    }
                    __classPrivateFieldGet(this, _CanvasX_ctx, "f").restore();
                }
                const textData = canvasObject.getText();
                if (textData.text && __classPrivateFieldGet(this, _CanvasX_ctx, "f") !== null) {
                    const fontSize = textData.scaleRelativeToZoomLevel
                        ? cameraZoomLevel * textData.fontSize
                        : textData.fontSize;
                    __classPrivateFieldGet(this, _CanvasX_ctx, "f").font = `${fontSize}px ${textData.font}`;
                    __classPrivateFieldGet(this, _CanvasX_ctx, "f").fillStyle = `${textData.fontColor}`;
                    __classPrivateFieldGet(this, _CanvasX_ctx, "f").textAlign = `${textData.textAlign}`;
                    __classPrivateFieldGet(this, _CanvasX_ctx, "f").textBaseline = `${textData.textBaseline}`;
                    __classPrivateFieldGet(this, _CanvasX_ctx, "f").fillText(textData.text, position.x + dimensions.width / 2, position.y + dimensions.height / 2);
                }
            });
        });
        this.useRequestAnimationFrame = (window) => {
            clearInterval(__classPrivateFieldGet(this, _CanvasX_loopId, "f"));
            __classPrivateFieldSet(this, _CanvasX_window, window, "f");
            const loop = () => {
                __classPrivateFieldGet(this, _CanvasX_canvasUpdate, "f").call(this);
                __classPrivateFieldSet(this, _CanvasX_loopId, window.requestAnimationFrame(loop), "f");
            };
            loop();
        };
        this.setCanvasSize = (width, height) => {
            if (this.canvas) {
                let canvasWidth = typeof width === "number" ? width : this.canvas.clientWidth;
                let canvasHeight = typeof height === "number" ? height : this.canvas.clientHeight;
                __classPrivateFieldSet(this, _CanvasX_width, canvasWidth, "f");
                __classPrivateFieldSet(this, _CanvasX_height, canvasHeight, "f");
                this.canvas.width = canvasWidth;
                this.canvas.height = canvasHeight;
                this.canvas.style.width = `${width}px`;
                this.canvas.style.height = `${height}px`;
            }
            else {
                Log("Cannot set canvas size because no canvas found");
            }
        };
        this.getCanvasSize = () => {
            if (this.canvas === null) {
                return { width: 0, height: 0 };
            }
            const canvasSize = {
                width: typeof __classPrivateFieldGet(this, _CanvasX_width, "f") === "number" ? __classPrivateFieldGet(this, _CanvasX_width, "f") : this.canvas.clientWidth,
                height: typeof __classPrivateFieldGet(this, _CanvasX_height, "f") === "number"
                    ? __classPrivateFieldGet(this, _CanvasX_height, "f")
                    : this.canvas.clientHeight,
            };
            return canvasSize;
        };
        this.getCamera = () => {
            return this.canvasCamera;
        };
        // TODO: Hidden from user
        this.setMousePosition = (x, y) => {
            __classPrivateFieldSet(this, _CanvasX_mousePosition, { x, y }, "f");
        };
        this.getMousePosition = () => {
            return __classPrivateFieldGet(this, _CanvasX_mousePosition, "f");
        };
        this.getGlobalVariableValue = (key) => {
            return __classPrivateFieldGet(this, _CanvasX_globalValues, "f").getVariableValue(key);
        };
        this.setGlobalVariableValue = (key, value) => {
            __classPrivateFieldGet(this, _CanvasX_globalValues, "f").setVariableValue(key, value);
        };
        _CanvasX_destroyObjectById.set(this, (id) => {
            this.canvasObjects = this.canvasObjects.filter((canvasObject) => canvasObject.getId() !== id);
        });
        this.setMouseCursor = (cursorType) => {
            document.body.style.cursor = cursorType;
        };
        this.getObjectWithId = (id) => {
            const canvasObject = this.canvasObjects.find((canvasObject) => {
                return canvasObject.getId() === id;
            });
            return canvasObject || null;
        };
        this.getObjectWithName = (name) => {
            const canvasObject = this.canvasObjects.find((canvasObject) => {
                return canvasObject.getName() === name;
            });
            return canvasObject || null;
        };
        this.createObject = (name = "", onCreate = (_this) => { }, onUpdate = (_this) => { }, onDestroy = (_this) => { }) => {
            var _a;
            const newObj = new CanvasObject(__classPrivateFieldSet(this, _CanvasX_objectsCreated, (_a = __classPrivateFieldGet(this, _CanvasX_objectsCreated, "f"), ++_a), "f"), name, onCreate, onUpdate, onDestroy, __classPrivateFieldGet(this, _CanvasX_destroyObjectById, "f"), this);
            this.canvasObjects.push(newObj);
            return newObj;
        };
        this.createCamera = (name = "", onCreate = (_this) => { }, onUpdate = (_this) => { }) => {
            var _a;
            this.canvasCamera = new CanvasCamera(__classPrivateFieldSet(this, _CanvasX_objectsCreated, (_a = __classPrivateFieldGet(this, _CanvasX_objectsCreated, "f"), ++_a), "f"), name, onCreate, onUpdate, this);
            this.canvasObjects.push(this.canvasCamera);
            return this.canvasCamera;
        };
        this.terminate = () => {
            if (__classPrivateFieldGet(this, _CanvasX_window, "f") !== null) {
                __classPrivateFieldGet(this, _CanvasX_window, "f").cancelAnimationFrame(__classPrivateFieldGet(this, _CanvasX_loopId, "f"));
            }
            else {
                clearInterval(__classPrivateFieldGet(this, _CanvasX_loopId, "f"));
            }
        };
    }
}
_CanvasX_width = new WeakMap(), _CanvasX_height = new WeakMap(), _CanvasX_ctx = new WeakMap(), _CanvasX_objectsCreated = new WeakMap(), _CanvasX_mousePosition = new WeakMap(), _CanvasX_onUpdate = new WeakMap(), _CanvasX_wheelScroll = new WeakMap(), _CanvasX_loopId = new WeakMap(), _CanvasX_globalValues = new WeakMap(), _CanvasX_window = new WeakMap(), _CanvasX_canvasUpdate = new WeakMap(), _CanvasX_logic = new WeakMap(), _CanvasX_drawCanvas = new WeakMap(), _CanvasX_destroyObjectById = new WeakMap();
//# sourceMappingURL=CanvasX.js.map