import CanvasCamera from "./CanvasCamera.js";
import VariableClass from "./VariableClass.js";
import { dimensionsType, coordinationType } from "./types.js";

class CanvasObject extends VariableClass {
  #id: number;
  #position: coordinationType = { x: 0, y: 0 };
  #dimensions: dimensionsType = { width: 100, height: 100 };
  #sprite: HTMLImageElement | null = null;
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

  getSprite = (): HTMLImageElement | null => {
    return this.#sprite;
  };

  setSprite = (sprite: HTMLImageElement) => {
    this.#sprite = sprite;
    sprite.onload = () => {
      this.setDimensions(
        this.#setDimensionsData.width,
        this.#setDimensionsData.height
      );
    };
  };

  getDimensions = () => {
    return { ...this.#dimensions };
  };

  setDimensions = (width: number | "auto", height: number | "auto") => {
    const dimensions: dimensionsType = { width: 50, height: 50 };
    const sprite = this.getSprite();
    if (sprite) {
      const spriteDimensions = {
        width: sprite?.naturalWidth || 10,
        height: sprite?.naturalHeight || 10,
      };
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
      } else if (typeof width === "number" && typeof height === "number") {
        dimensions.width = width;
        dimensions.height = height;
      }
      this.#dimensions = dimensions;
    }

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

  setOnClicked = (func: (_this: CanvasObject) => void = () => {}) => {
    this.#onClick = func;
  };

  getOnWheelScroll = () => {
    return this.#onWheelScroll;
  };

  setOnWheelScroll = (
    func: (
      _this: CanvasObject | CanvasCamera,
      scroll: coordinationType
    ) => void = () => {}
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
