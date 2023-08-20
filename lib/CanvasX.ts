import CanvasCamera from "./CanvasCamera.js";
import CanvasObject from "./CanvasObject.js";
import Log from "./log.js";

export default class CanvasX {
  #width = 0;
  #height = 0;
  canvasCamera: CanvasCamera;
  canvasObjects: CanvasObject[] = [];
  canvas: HTMLCanvasElement | null = null;
  #ctx: CanvasRenderingContext2D | null = null;
  #objectsCreated = 0;

  createCanvas = (canvasId: string) => {
    this.canvas =
      (document.getElementById(canvasId) as HTMLCanvasElement) || null;
    if (this.canvas) {
      this.#ctx = this.canvas.getContext("2d");
      const canvasUpdateLoop = () => {
        this.#canvasUpdate();
        requestAnimationFrame(canvasUpdateLoop);
      };
      requestAnimationFrame(canvasUpdateLoop);
      return this;
    } else {
      Log(`No canvas with id ${canvasId} found`);
      return null;
    }
  };

  createCamera = (
    onCreate: (_this: CanvasCamera) => void = () => {},
    onUpdate: (_this: CanvasCamera) => void = () => {}
  ) => {
    this.canvasCamera = new CanvasCamera(onCreate, onUpdate);
    return this;
  };

  #canvasUpdate = () => {
    this.#logic();
    this.#drawCanvas();
  };

  #drawCanvas = () => {
    this.#ctx.clearRect(0, 0, this.#width, this.#height);

    this.canvasObjects.forEach((canvasObject) => {
      const sprite = canvasObject.getSprite();
      const position = { ...canvasObject.getPosition() };
      const dimensions = canvasObject.getDimensions();
      const backgroundColor = canvasObject.getBackgroundColor();
      const positionOffset = this.canvasCamera.getPosition();
      position.x -= positionOffset.x;
      position.y -= positionOffset.y;

      if (backgroundColor) {
        this.#ctx.fillStyle = backgroundColor;
        this.#ctx.fillRect(
          position.x,
          position.y,
          dimensions.width,
          dimensions.height
        );
      }

      if (sprite) {
        this.#ctx.globalAlpha = canvasObject.getOpacity();
        this.#ctx.drawImage(
          sprite,
          position.x,
          position.y,
          dimensions.width,
          dimensions.height
        );
      }
    });
  };

  #logic = () => {};

  setCanvasWidth = (width: number) => {
    if (this.canvas) {
      this.#width = width;
      this.canvas.width = width;
    } else {
      Log("Cannot set canvas width because no canvas found");
    }
  };

  setCanvasHeight = (height: number) => {
    if (this.canvas) {
      this.#height = height;
      this.canvas.height = height;
    } else {
      Log("Cannot set canvas height because no canvas found");
    }
  };

  setCanvasSize = (width: number, height: number) => {
    this.setCanvasWidth(width);
    this.setCanvasHeight(height);
  };

  getCanvasSize = () => {
    return {
      width: this.#width,
      height: this.#height,
    };
  };

  getCamera = (): CanvasCamera => {
    return this.canvasCamera;
  };

  #destroyObjectById = (id: number) => {
    this.canvasObjects = this.canvasObjects.filter(
      (canvasObject) => canvasObject.getId() !== id
    );
  };

  createObject = (
    onCreate: (_this: CanvasObject) => void = () => {},
    onUpdate: (_this: CanvasObject) => void = () => {},
    onDestroy: (_this: CanvasObject) => void = () => {}
  ) => {
    const newObj = new CanvasObject(
      ++this.#objectsCreated,
      onCreate,
      onUpdate,
      onDestroy,
      this.#destroyObjectById
    );
    this.canvasObjects.push(newObj);
    return newObj;
  };
}
