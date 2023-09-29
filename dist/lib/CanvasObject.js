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
var _CanvasObject_id, _CanvasObject_position, _CanvasObject_parent, _CanvasObject_dimensions, _CanvasObject_spriteData, _CanvasObject_canvasX, _CanvasObject_name, _CanvasObject_draggable, _CanvasObject_dragData, _CanvasObject_onUpdate, _CanvasObject_onDestroy, _CanvasObject_destroyById, _CanvasObject_backgroundColor, _CanvasObject_opacity, _CanvasObject_visible, _CanvasObject_onHoverTrue, _CanvasObject_onHoverEndTrue, _CanvasObject_onHover, _CanvasObject_onHoverEnd, _CanvasObject_onClick, _CanvasObject_rotation, _CanvasObject_moveToPosition, _CanvasObject_onWheelScroll, _CanvasObject_setDimensionsData;
import VariableClass from "./VariableClass.js";
class CanvasObject extends VariableClass {
    constructor(id, name, onCreate = (_this) => { }, onUpdate = (_this) => { }, onDestroy = (_this) => { }, destroyById, canvasX) {
        super();
        _CanvasObject_id.set(this, void 0);
        _CanvasObject_position.set(this, { x: 0, y: 0, z: 0 });
        _CanvasObject_parent.set(this, null);
        _CanvasObject_dimensions.set(this, { width: 100, height: 100 });
        _CanvasObject_spriteData.set(this, {
            sprites: null,
            startFrame: 0,
            animationSpeed: 0,
            startTimeFrame: 0,
        });
        _CanvasObject_canvasX.set(this, void 0);
        _CanvasObject_name.set(this, void 0);
        _CanvasObject_draggable.set(this, false);
        _CanvasObject_dragData.set(this, {
            dragPositionOffset: { x: 0, y: 0 },
            isDragged: false,
            smoothness: 0,
        });
        _CanvasObject_onUpdate.set(this, void 0);
        _CanvasObject_onDestroy.set(this, void 0);
        _CanvasObject_destroyById.set(this, void 0);
        _CanvasObject_backgroundColor.set(this, null);
        _CanvasObject_opacity.set(this, 1);
        _CanvasObject_visible.set(this, true);
        _CanvasObject_onHoverTrue.set(this, false);
        _CanvasObject_onHoverEndTrue.set(this, false);
        _CanvasObject_onHover.set(this, null);
        _CanvasObject_onHoverEnd.set(this, null);
        _CanvasObject_onClick.set(this, {});
        _CanvasObject_rotation.set(this, 0);
        _CanvasObject_moveToPosition.set(this, null);
        _CanvasObject_onWheelScroll.set(this, null);
        _CanvasObject_setDimensionsData.set(this, {
            width: "auto",
            height: "auto",
        });
        this.getId = () => {
            return __classPrivateFieldGet(this, _CanvasObject_id, "f");
        };
        this.getPosition = () => {
            return { ...__classPrivateFieldGet(this, _CanvasObject_position, "f") };
        };
        this.setPosition = (x, y, z = 0) => {
            __classPrivateFieldSet(this, _CanvasObject_position, {
                x,
                y,
                z,
            }, "f");
        };
        this.setMoveToPosition = (x, y, speed, method) => {
            __classPrivateFieldSet(this, _CanvasObject_moveToPosition, {
                x,
                y,
                speed,
                method,
            }, "f");
        };
        this.getMoveToPosition = () => {
            return __classPrivateFieldGet(this, _CanvasObject_moveToPosition, "f");
        };
        this.getSpriteData = () => {
            return __classPrivateFieldGet(this, _CanvasObject_spriteData, "f");
        };
        this.getOnUpdate = () => {
            return __classPrivateFieldGet(this, _CanvasObject_onUpdate, "f");
        };
        this.setSpriteData = {
            singleSprite: (sprite, _onLoaded = () => { }) => {
                __classPrivateFieldSet(this, _CanvasObject_spriteData, {
                    sprites: [sprite],
                    startFrame: 0,
                    animationSpeed: 0,
                    startTimeFrame: 0,
                }, "f");
                sprite.onload = () => {
                    _onLoaded(this);
                    this.setDimensions(__classPrivateFieldGet(this, _CanvasObject_setDimensionsData, "f").width, __classPrivateFieldGet(this, _CanvasObject_setDimensionsData, "f").height);
                };
            },
            animationSprites: (sprites, startFrame, animationSpeed, _onLoaded = () => { }) => {
                __classPrivateFieldSet(this, _CanvasObject_spriteData, {
                    sprites,
                    startFrame,
                    animationSpeed,
                    startTimeFrame: new Date().getTime(),
                }, "f");
                let loaded = 0;
                sprites.forEach((sprite) => {
                    sprite.onload = () => {
                        ++loaded;
                        if (loaded === sprites.length) {
                            _onLoaded(this);
                        }
                        this.setDimensions(__classPrivateFieldGet(this, _CanvasObject_setDimensionsData, "f").width, __classPrivateFieldGet(this, _CanvasObject_setDimensionsData, "f").height);
                    };
                });
            },
        };
        this.getDimensions = () => {
            return { ...__classPrivateFieldGet(this, _CanvasObject_dimensions, "f") };
        };
        this.setDimensions = (width, height) => {
            const dimensions = { width: 50, height: 50 };
            if (typeof width === "number" && typeof height === "number") {
                dimensions.width = width;
                dimensions.height = height;
            }
            else {
                const spriteDimensions = {
                    width: 10,
                    height: 10,
                };
                const spriteData = this.getSpriteData();
                if (spriteData.sprites !== null) {
                    const sprite = spriteData.sprites[0];
                    if (sprite) {
                        spriteDimensions.width = sprite.naturalWidth;
                        spriteDimensions.height = sprite.naturalHeight;
                    }
                }
                if (width === "auto" && height === "auto") {
                    dimensions.width = spriteDimensions.width;
                    dimensions.height = spriteDimensions.height;
                }
                else if (width === "auto" && typeof height === "number") {
                    dimensions.height = height;
                    dimensions.width =
                        (spriteDimensions.width / spriteDimensions.height) * height;
                }
                else if (height === "auto" && typeof width === "number") {
                    dimensions.width = width;
                    dimensions.height =
                        (spriteDimensions.height / spriteDimensions.width) * width;
                }
            }
            __classPrivateFieldSet(this, _CanvasObject_dimensions, {
                width: dimensions.width,
                height: dimensions.height,
            }, "f");
            // Name this related to setDimensionsWhenSpriteLoaded
            __classPrivateFieldSet(this, _CanvasObject_setDimensionsData, { width, height }, "f");
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
        // TODO: Just for System.
        this.getOnHover = () => {
            return __classPrivateFieldGet(this, _CanvasObject_onHover, "f");
        };
        // TODO: Just for System.
        this.setOnHoverEnter = (callback) => {
            __classPrivateFieldSet(this, _CanvasObject_onHover, callback, "f");
        };
        // TODO: Just for System.
        this.getOnHoverEnd = () => {
            return __classPrivateFieldGet(this, _CanvasObject_onHoverEnd, "f");
        };
        // TODO: Just for System.
        this.setOnHoverEnd = (callback) => {
            __classPrivateFieldSet(this, _CanvasObject_onHoverEnd, callback, "f");
        };
        // TODO: Just for System.
        this.getOnHoverTrue = () => {
            return __classPrivateFieldGet(this, _CanvasObject_onHoverTrue, "f");
        };
        // TODO: Just for System.
        this.setOnHoverTrue = (value) => {
            __classPrivateFieldSet(this, _CanvasObject_onHoverTrue, value, "f");
        };
        // TODO: Just for System.
        this.getOnHoverEndTrue = () => {
            return __classPrivateFieldGet(this, _CanvasObject_onHoverEndTrue, "f");
        };
        // TODO: Just for System.
        this.setOnHoverEndTrue = (value) => {
            return __classPrivateFieldGet(this, _CanvasObject_onHoverEndTrue, "f");
        };
        this.getOnClick = (onClickType) => {
            return __classPrivateFieldGet(this, _CanvasObject_onClick, "f")[onClickType];
        };
        this.setOnClick = (clickType, func) => {
            __classPrivateFieldGet(this, _CanvasObject_onClick, "f")[clickType] = func;
        };
        this.getRotation = () => {
            return __classPrivateFieldGet(this, _CanvasObject_rotation, "f");
        };
        this.setRotation = (rotationAngle) => {
            __classPrivateFieldSet(this, _CanvasObject_rotation, rotationAngle % 360, "f");
        };
        this.getOnWheelScroll = () => {
            return __classPrivateFieldGet(this, _CanvasObject_onWheelScroll, "f");
        };
        this.setOnWheelScroll = (func = (_this, scroll) => { }) => {
            __classPrivateFieldSet(this, _CanvasObject_onWheelScroll, func, "f");
        };
        this.getGlobalVariableValue = (key) => {
            return __classPrivateFieldGet(this, _CanvasObject_canvasX, "f").getGlobalVariableValue(key);
        };
        this.setGlobalVariableValue = (key, value) => {
            __classPrivateFieldGet(this, _CanvasObject_canvasX, "f").setGlobalVariableValue(key, value);
        };
        this.getName = () => {
            return __classPrivateFieldGet(this, _CanvasObject_name, "f");
        };
        this.setName = (name) => {
            __classPrivateFieldSet(this, _CanvasObject_name, name, "f");
        };
        this.getDraggable = () => {
            return __classPrivateFieldGet(this, _CanvasObject_draggable, "f");
        };
        this.setDraggable = (draggable, smoothness = 0) => {
            __classPrivateFieldSet(this, _CanvasObject_draggable, draggable, "f");
            __classPrivateFieldGet(this, _CanvasObject_dragData, "f").smoothness = smoothness;
        };
        this.getDragData = () => {
            return __classPrivateFieldGet(this, _CanvasObject_dragData, "f");
        };
        this.setDragData = (dragData) => {
            __classPrivateFieldSet(this, _CanvasObject_dragData, dragData, "f");
        };
        this.getParent = () => {
            return __classPrivateFieldGet(this, _CanvasObject_parent, "f");
        };
        this.getVisible = () => {
            return __classPrivateFieldGet(this, _CanvasObject_visible, "f");
        };
        this.setVisible = (visible) => {
            __classPrivateFieldSet(this, _CanvasObject_visible, visible, "f");
        };
        this.setParent = (nameOrId) => {
            let parent = null;
            if (typeof nameOrId === "string") {
                parent = __classPrivateFieldGet(this, _CanvasObject_canvasX, "f").getObjectWithName(nameOrId);
            }
            else if (typeof nameOrId === "number") {
                parent = __classPrivateFieldGet(this, _CanvasObject_canvasX, "f").getObjectWithId(nameOrId);
            }
            __classPrivateFieldSet(this, _CanvasObject_parent, parent, "f");
        };
        this.destroy = () => {
            __classPrivateFieldGet(this, _CanvasObject_onDestroy, "f").call(this, this);
            __classPrivateFieldGet(this, _CanvasObject_destroyById, "f").call(this, __classPrivateFieldGet(this, _CanvasObject_id, "f"));
        };
        __classPrivateFieldSet(this, _CanvasObject_id, id, "f");
        __classPrivateFieldSet(this, _CanvasObject_name, name, "f");
        __classPrivateFieldSet(this, _CanvasObject_canvasX, canvasX, "f");
        __classPrivateFieldSet(this, _CanvasObject_onUpdate, onUpdate, "f");
        __classPrivateFieldSet(this, _CanvasObject_onDestroy, onDestroy, "f");
        __classPrivateFieldSet(this, _CanvasObject_destroyById, destroyById, "f");
        onCreate(this);
    }
}
_CanvasObject_id = new WeakMap(), _CanvasObject_position = new WeakMap(), _CanvasObject_parent = new WeakMap(), _CanvasObject_dimensions = new WeakMap(), _CanvasObject_spriteData = new WeakMap(), _CanvasObject_canvasX = new WeakMap(), _CanvasObject_name = new WeakMap(), _CanvasObject_draggable = new WeakMap(), _CanvasObject_dragData = new WeakMap(), _CanvasObject_onUpdate = new WeakMap(), _CanvasObject_onDestroy = new WeakMap(), _CanvasObject_destroyById = new WeakMap(), _CanvasObject_backgroundColor = new WeakMap(), _CanvasObject_opacity = new WeakMap(), _CanvasObject_visible = new WeakMap(), _CanvasObject_onHoverTrue = new WeakMap(), _CanvasObject_onHoverEndTrue = new WeakMap(), _CanvasObject_onHover = new WeakMap(), _CanvasObject_onHoverEnd = new WeakMap(), _CanvasObject_onClick = new WeakMap(), _CanvasObject_rotation = new WeakMap(), _CanvasObject_moveToPosition = new WeakMap(), _CanvasObject_onWheelScroll = new WeakMap(), _CanvasObject_setDimensionsData = new WeakMap();
export default CanvasObject;
//# sourceMappingURL=CanvasObject.js.map