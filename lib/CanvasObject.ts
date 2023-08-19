import { dimensionsType, positionType } from "./types.js";

class CanvasObject {
  #id: number;
  #position: positionType = { x: 0, y: 0 };
  #dimensions: dimensionsType = { width: "auto", height: "auto" };
  #sprite: CanvasImageSource | null = null;
  #loopId = -1;
  #onDestroy: Function;
  #destroyById: (id: number) => void;
  #backgroundColor: string | null = null;
  constructor(
    id: number,
    onCreate: Function,
    onUpdate: Function,
    onDestroy: Function,
    destroyById: (id: number) => void
  ) {
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
    this.#dimensions = {
      width,
      height,
    };
  };

  getBackgroundColor = (): string | null => {
    return this.#backgroundColor;
  };

  setBackgroundColor = (color: string) => {
    this.#backgroundColor = color;
  };

  destroy = () => {
    this.#onDestroy(this);
    this.#destroyById(this.#id);
    cancelAnimationFrame(this.#loopId);
  };
}

export default CanvasObject;
