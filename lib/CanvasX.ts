import CanvasCamera from "./CanvasCamera.js";
import CanvasObject from "./CanvasObject.js";
import VariableClass from "./VariableClass.js";
import Log from "./log.js";
import { positionType } from "./types.js";

export default class CanvasX extends VariableClass {
  #width = 0;
  #height = 0;
  canvasCamera: CanvasCamera = new CanvasCamera();
  canvasObjects: CanvasObject[] = [];
  canvas: HTMLCanvasElement | null = null;
  #ctx: CanvasRenderingContext2D | null = null;
  #objectsCreated = 0;
  #mousePosition: positionType = { x: 0, y: 0 };
  #onUpdate: Function | null = null;

  createCanvas = (
    canvasId: string,
    onCreate: (_this: CanvasX) => void = () => {},
    onUpdate: (_this: CanvasX) => void = () => {}
  ) => {
    this.canvas =
      (document.getElementById(canvasId) as HTMLCanvasElement) || null;
    if (this.canvas) {
      this.#ctx = this.canvas.getContext("2d");
      const canvasUpdateLoop = () => {
        this.#canvasUpdate();
        requestAnimationFrame(canvasUpdateLoop);
      };
      requestAnimationFrame(canvasUpdateLoop);

      document.onmousemove = (e) => {
        this.#mousePosition = {
          x: e.clientX - this.#width / 2,
          y: e.clientY - this.#height / 2,
        };
      };

      onCreate(this);
      this.#onUpdate = onUpdate;
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
      const backgroundColor = canvasObject.getBackgroundColor();
      const cameraZoomLevel = this.canvasCamera.getZoomLevel();
      const cameraPositionOffset = { ...this.canvasCamera.getPosition() };
      const position = { ...canvasObject.getPosition() };
      const dimensions = { ...canvasObject.getDimensions() };

      dimensions.width *= cameraZoomLevel;
      dimensions.height *= cameraZoomLevel;
      position.x -= cameraPositionOffset.x;
      position.y -= cameraPositionOffset.y;
      position.x *= cameraZoomLevel;
      position.y *= cameraZoomLevel;
      position.x -= dimensions.width / 2;
      position.y -= dimensions.height / 2;
      position.x += this.#width / 2;
      position.y += this.#height / 2;

      if (backgroundColor) {
        this.#ctx.globalAlpha = canvasObject.getOpacity();
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

  #logic = () => {
    this.canvasObjects.forEach((canvasObject) => {
      this.#onUpdate(this);

      const onHover = canvasObject.getOnHover();
      if (onHover) {
        const objPosition = canvasObject.getPosition();
        const objDimensions = canvasObject.getDimensions();
        const onHoverTrue = canvasObject.getOnHoverTrue();

        let inCollisionWithMouse = false;
        if (
          Math.abs(objPosition.x - this.#mousePosition.x) <
            objDimensions.width / 2 &&
          Math.abs(objPosition.y - this.#mousePosition.y) <
            objDimensions.height / 2
        ) {
          inCollisionWithMouse = true;
        }

        if (inCollisionWithMouse && !onHoverTrue) {
          // Mouse Entered Collision Box
          canvasObject.setOnHoverTrue(true);
          onHover(canvasObject);
        }
        if (!inCollisionWithMouse && onHoverTrue) {
          // Mouse Left Collision Box
          canvasObject.setOnHoverTrue(false);
          const onHoverEnd = canvasObject.getOnHoverEnd();
          onHoverEnd(canvasObject);
        }
      }
    });
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

  setMouseCursor = (cursorType: string) => {
    document.body.style.cursor = cursorType;
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
