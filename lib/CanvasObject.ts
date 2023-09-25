import CanvasCamera from "./CanvasCamera.js";
import CanvasX from "./CanvasX.js";
import VariableClass from "./VariableClass.js";
import {
  dimensionsType,
  coordinationType,
  spriteDataType,
  moveToType,
  onClickType,
} from "./types.js";

class CanvasObject extends VariableClass {
  #id: number;
  #position: coordinationType & { z: number } = { x: 0, y: 0, z: 0 };
  #dimensions: dimensionsType = { width: 100, height: 100 };
  #spriteData: spriteDataType = {
    sprites: null,
    startFrame: 0,
    animationSpeed: 0,
    startTimeFrame: 0,
  };
  #canvasX: CanvasX;
  #onUpdate: Function;
  #onDestroy: Function;
  #destroyById: (id: number) => void;
  #backgroundColor: string | null = null;
  #opacity = 1;
  #onHoverTrue = false;
  #onHoverEndTrue = false;
  #onHover: Function | null = null;
  #onHoverEnd: Function | null = null;
  #onClick: { [clickType: string]: (_this: CanvasObject) => void } = {};
  #rotation: number = 0;
  #moveToPosition: moveToType = null;
  #onWheelScroll: (
    _this: CanvasObject | CanvasCamera,
    scroll: coordinationType
  ) => void | null = null;
  #setDimensionsData: { width: number | "auto"; height: number | "auto" } = {
    width: "auto",
    height: "auto",
  };

  constructor(
    id: number,
    onCreate: (_this: CanvasObject) => void = (_this: CanvasObject) => {},
    onUpdate: (_this: CanvasObject) => void = (_this: CanvasObject) => {},
    onDestroy: (_this: CanvasObject) => void = (_this: CanvasObject) => {},
    destroyById: (id: number) => void,
    canvasX: CanvasX
  ) {
    super();
    this.#id = id;
    this.#canvasX = canvasX;
    this.#onUpdate = onUpdate;
    this.#onDestroy = onDestroy;
    this.#destroyById = destroyById;

    onCreate(this);
  }

  getId = (): number => {
    return this.#id;
  };

  getPosition = (): coordinationType & { z: number } => {
    return { ...this.#position };
  };

  setPosition = (x: number, y: number, z: number = 0) => {
    this.#position = {
      x,
      y,
      z,
    };
  };

  setMoveToPosition = (
    x: number,
    y: number,
    speed: number,
    method: "linear"
  ) => {
    this.#moveToPosition = {
      x,
      y,
      speed,
      method,
    };
  };

  getMoveToPosition = (): moveToType => {
    return this.#moveToPosition;
  };

  getSpriteData = (): spriteDataType => {
    return this.#spriteData;
  };

  getOnUpdate = () => {
    return this.#onUpdate;
  };

  setSpriteData = {
    singleSprite: (
      sprite: HTMLImageElement,
      _onLoaded: (_this: CanvasObject) => void = () => {}
    ) => {
      this.#spriteData = {
        sprites: [sprite],
        startFrame: 0,
        animationSpeed: 0,
        startTimeFrame: 0,
      };

      sprite.onload = () => {
        _onLoaded(this);
        this.setDimensions(
          this.#setDimensionsData.width,
          this.#setDimensionsData.height
        );
      };
    },
    animationSprites: (
      sprites: HTMLImageElement[],
      startFrame: number,
      animationSpeed: number,
      _onLoaded: (_this: CanvasObject) => void = () => {}
    ) => {
      this.#spriteData = {
        sprites,
        startFrame,
        animationSpeed,
        startTimeFrame: new Date().getTime(),
      };

      let loaded = 0;
      sprites.forEach((sprite) => {
        sprite.onload = () => {
          ++loaded;
          if (loaded === sprites.length) {
            _onLoaded(this);
          }
          this.setDimensions(
            this.#setDimensionsData.width,
            this.#setDimensionsData.height
          );
        };
      });
    },
  };

  getDimensions = (): dimensionsType => {
    return { ...this.#dimensions };
  };

  setDimensions = (width: number | "auto", height: number | "auto") => {
    const dimensions: dimensionsType = { width: 50, height: 50 };

    if (typeof width === "number" && typeof height === "number") {
      dimensions.width = width;
      dimensions.height = height;
    } else {
      const spriteDimensions = {
        width: 10,
        height: 10,
      };
      if (this.getSpriteData().sprites !== null) {
        const sprite: HTMLImageElement = this.getSpriteData().sprites[0];
        //TODO: Check if this is needed
        if (sprite) {
          spriteDimensions.width = sprite.naturalWidth;
          spriteDimensions.height = sprite.naturalHeight;
        }
      }
      if (width === "auto" && height === "auto") {
        dimensions.width = spriteDimensions.width;
        dimensions.height = spriteDimensions.height;
      } else if (width === "auto" && typeof height === "number") {
        dimensions.height = height;
        dimensions.width =
          (spriteDimensions.width / spriteDimensions.height) * height;
      } else if (height === "auto" && typeof width === "number") {
        dimensions.width = width;
        dimensions.height =
          (spriteDimensions.height / spriteDimensions.width) * width;
      }
    }

    this.#dimensions = {
      width: dimensions.width,
      height: dimensions.height,
    };

    // Name this related to setDimensionsWhenSpriteLoaded
    this.#setDimensionsData = { width, height };
  };

  getBackgroundColor = (): string | null => {
    return this.#backgroundColor;
  };

  setBackgroundColor = (color: string) => {
    this.#backgroundColor = color;
  };

  getOpacity = (): number => {
    return this.#opacity;
  };

  setOpacity = (opacity: number) => {
    this.#opacity = opacity;
  };

  // TODO: Just for System.
  getOnHover = () => {
    return this.#onHover;
  };

  // TODO: Just for System.
  setOnHoverEnter = (callback: Function) => {
    this.#onHover = callback;
  };

  // TODO: Just for System.
  getOnHoverEnd = () => {
    return this.#onHoverEnd;
  };

  // TODO: Just for System.
  setOnHoverEnd = (callback: Function) => {
    this.#onHoverEnd = callback;
  };

  // TODO: Just for System.
  getOnHoverTrue = () => {
    return this.#onHoverTrue;
  };

  // TODO: Just for System.
  setOnHoverTrue = (value: boolean) => {
    this.#onHoverTrue = value;
  };

  // TODO: Just for System.
  getOnHoverEndTrue = () => {
    return this.#onHoverEndTrue;
  };

  // TODO: Just for System.
  setOnHoverEndTrue = (value: boolean) => {
    return this.#onHoverEndTrue;
  };

  getOnClick = (onClickType: onClickType) => {
    return this.#onClick[onClickType];
  };

  setOnClick = (
    clickType: onClickType,
    func: (_this: CanvasObject) => void
  ) => {
    this.#onClick[clickType] = func;
  };

  getRotation = () => {
    return this.#rotation;
  };

  setRotation = (rotationAngle: number) => {
    this.#rotation = rotationAngle % 360;
  };

  getOnWheelScroll = () => {
    return this.#onWheelScroll;
  };

  setOnWheelScroll = (
    func: (
      _this: CanvasObject | CanvasCamera,
      scroll: coordinationType
    ) => void = (
      _this: CanvasObject | CanvasCamera,
      scroll: coordinationType
    ) => {}
  ) => {
    this.#onWheelScroll = func;
  };

  getGlobalVariableValue = (key: string) => {
    return this.#canvasX.getGlobalVariableValue(key);
  };

  setGlobalVariableValue = (key: string, value: any) => {
    this.#canvasX.setGlobalVariableValue(key, value);
  };

  destroy = () => {
    this.#onDestroy(this);
    this.#destroyById(this.#id);
  };
}

export default CanvasObject;
