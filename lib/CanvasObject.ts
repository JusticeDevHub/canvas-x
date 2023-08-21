import VariableClass from "./VariableClass.js";
import { dimensionsType, positionType } from "./types.js";

class CanvasObject extends VariableClass {
  #id: number;
  #position: positionType = { x: 0, y: 0 };
  #dimensions: dimensionsType = { width: 100, height: 100 };
  #sprite: CanvasImageSource | null = null;
  #loopId = -1;
  #onDestroy: Function;
  #destroyById: (id: number) => void;
  #backgroundColor: string | null = null;
  #opacity = 1;

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

  getPosition = (): positionType => {
    return this.#position;
  };

  setPosition = (x: number, y: number) => {
    this.#position = {
      x,
      y,
    };
  };

  getSprite = (): CanvasImageSource | null => {
    return this.#sprite;
  };

  setSprite = (sprite: CanvasImageSource) => {
    this.#sprite = sprite;
  };

  getDimensions = () => {
    return this.#dimensions;
  };

  setDimensions = (width: number | "auto", height: number | "auto") => {
    // TODO: handle auto
    const dimensions: dimensionsType = {
      width: typeof width === "number" ? width : 0,
      height: typeof height === "number" ? height : 0,
    };
    this.#dimensions = dimensions;
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

  destroy = () => {
    this.#onDestroy(this);
    this.#destroyById(this.#id);
    cancelAnimationFrame(this.#loopId);
  };
}

export default CanvasObject;