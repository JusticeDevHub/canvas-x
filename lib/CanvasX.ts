import CanvasObject from "./CanvasObject.js";
import Log from "./log.js";

export default class CanvasX {
  #width = 0;
  #height = 0;
  canvasObjects: CanvasObject[] = [];
  canvas: HTMLCanvasElement | null = null;
  #ctx: CanvasRenderingContext2D | null = null;
  #objectsCreated = 0;

  #drawCanvas = () => {
    this.#ctx.clearRect(0, 0, this.#width, this.#height);

    this.canvasObjects.forEach((canvasObject) => {
      const sprite = canvasObject.getSprite();
      const position = canvasObject.getPosition();
      const dimensions = canvasObject.getDimensions();
      const backgroundColor = canvasObject.getBackgroundColor();

      // TODO: Add support for auto width and height
      if (dimensions.width === "auto") {
        dimensions.width = 1;
      }
      if (dimensions.height === "auto") {
        dimensions.height = 1;
      }

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

  #canvasUpdate = () => {
    this.#logic();
    this.#drawCanvas();
  };

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

  #destroyObjectById = (id: number) => {
    this.canvasObjects = this.canvasObjects.filter(
      (canvasObject) => canvasObject.getId() !== id
    );
  };

  createObject = (
    onCreate: Function = () => {},
    onUpdate: Function = () => {},
    onDestroy: Function = () => {}
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
