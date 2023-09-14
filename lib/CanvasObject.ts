import CanvasCamera from "./CanvasCamera.js";
import VariableClass from "./VariableClass.js";
import {
  dimensionsType,
  coordinationType,
  spriteDataType,
  moveToType,
} from "./types.js";

class CanvasObject extends VariableClass {
  #id: number;
  #position: coordinationType = { x: 0, y: 0 };
  #dimensions: dimensionsType = { width: 100, height: 100 };
  #spriteData: spriteDataType = {
    sprites: null,
    startFrame: 0,
    animationSpeed: 0,
    startTimeFrame: 0,
  };
  #loopId = -1;
  #onDestroy: Function;
  #destroyById: (id: number) => void;
  #backgroundColor: string | null = null;
  #opacity = 1;
  #onHoverTrue = false;
  #onHoverEndTrue = false;
  #onHover: Function | null = null;
  #onHoverEnd: Function | null = null;
  #onClick: Function | null = null;
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
    onCreate: (_this: CanvasObject) => void,
    onUpdate: (_this: CanvasObject) => void,
    onDestroy: (_this: CanvasObject) => void,
    destroyById: (id: number) => void
  ) {
    super();
    this.#id = id;
    onCreate(this);

    const updateLoop = () => {
      onUpdate(this);
      this.#loopId = requestAnimationFrame(updateLoop);
    };
    this.#loopId = requestAnimationFrame(updateLoop);

    this.#onDestroy = onDestroy;
    this.#destroyById = destroyById;
  }

  getId = (): number => {
    return this.#id;
  };

  getPosition = (): coordinationType => {
    return { ...this.#position };
  };

  setPosition = (x: number, y: number) => {
    this.#position = {
      x,
      y,
    };
  };

  setMoveToPosition = (moveToPosition: moveToType) => {
    this.#moveToPosition = moveToPosition;
  };

  getMoveToPosition = (): moveToType => {
    return this.#moveToPosition;
  };

  getSpriteData = (): spriteDataType => {
    return this.#spriteData;
  };

  setSpriteData = {
    singleSprite: (sprite: HTMLImageElement) => {
      this.#spriteData = {
        sprites: [sprite],
        startFrame: 0,
        animationSpeed: 0,
        startTimeFrame: 0,
      };

      sprite.onload = () => {
        this.setDimensions(
          this.#setDimensionsData.width,
          this.#setDimensionsData.height
        );
      };
    },
    animationSprites: (
      sprites: HTMLImageElement[],
      startFrame: number,
      animationSpeed: number
    ) => {
      this.#spriteData = {
        sprites,
        startFrame,
        animationSpeed,
        startTimeFrame: new Date().getTime(),
      };

      sprites.forEach((sprite) => {
        sprite.onload = () => {
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
      this.#dimensions = {
        width,
        height,
      };
    } else {
      const spriteDimensions = {
        width: 10,
        height: 10,
      };
      if (this.getSpriteData().sprites !== null) {
        const sprite: HTMLImageElement = this.getSpriteData().sprites[0];
        spriteDimensions.width = sprite.naturalWidth;
        spriteDimensions.height = sprite.naturalHeight;
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

    // Name this related to setDimensionsWhenSpriteLoadedN
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

  getOnClicked = () => {
    return this.#onClick;
  };

  setOnClicked = (
    func: (_this: CanvasObject) => void = (_this: CanvasObject) => {}
  ) => {
    this.#onClick = func;
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

  destroy = () => {
    this.#onDestroy(this);
    this.#destroyById(this.#id);
    cancelAnimationFrame(this.#loopId);
  };
}

export default CanvasObject;
