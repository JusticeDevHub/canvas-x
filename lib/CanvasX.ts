import CanvasCamera from "./CanvasCamera.js";
import CanvasObject from "./CanvasObject.js";
import VariableClass from "./VariableClass.js";
import Log from "./log.js";
import { coordinationType } from "./types.js";
import onHover from "./utils/onHover.js";
import onWheelScroll from "./utils/onWheelScroll.js";

export default class CanvasX extends VariableClass {
  #width = 0;
  #height = 0;
  canvasCamera: CanvasCamera = new CanvasCamera(
    -1,
    () => {},
    () => {}
  );
  canvasObjects: CanvasObject[] = [];
  canvas: HTMLCanvasElement | null = null;
  #ctx: CanvasRenderingContext2D | null = null;
  #objectsCreated = 0;
  #mousePosition: coordinationType = { x: 0, y: 0 };
  #onUpdate: Function | null = null;
  #wheelScroll: coordinationType = { x: 0, y: 0 };

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

      document.addEventListener("click", (e) => {
        this.canvasObjects.forEach((canvasObject) => {
          if (canvasObject.getOnHoverTrue()) {
            const onClicked = canvasObject.getOnClicked();
            if (onClicked) {
              onClicked(canvasObject);
            }
          }
        });
      });

      document.addEventListener("wheel", (e) => {
        this.#wheelScroll = {
          x: Math.abs(e.deltaX) < 10 ? 0 : e.deltaX,
          y: Math.abs(e.deltaY) < 10 ? 0 : e.deltaY,
        };
      });

      document.onmousemove = (e) => {
        this.#mousePosition = {
          x: e.clientX - this.#width / 2,
          y: e.clientY - this.#height / 2,
        };
        const cameraZoomLevel = this.canvasCamera.getZoomLevel();
        const cameraPosition = this.canvasCamera.getPosition();
        this.#mousePosition.x += cameraPosition.x * cameraZoomLevel;
        this.#mousePosition.y += cameraPosition.y * cameraZoomLevel;
        this.#mousePosition.x /= cameraZoomLevel;
        this.#mousePosition.y /= cameraZoomLevel;
      };

      onCreate(this);
      this.#onUpdate = onUpdate;
      return this;
    } else {
      Log(`No canvas with id ${canvasId} found`);
      return null;
    }
  };

  #canvasUpdate = () => {
    this.#logic();
    this.#drawCanvas();
  };

  #drawCanvas = () => {
    this.#ctx.clearRect(0, 0, this.#width, this.#height);

    this.canvasObjects.forEach((canvasObject) => {
      const spriteData = canvasObject.getSpriteData();
      const backgroundColor = canvasObject.getBackgroundColor();
      const cameraZoomLevel = this.canvasCamera.getZoomLevel();
      const cameraPositionOffset = this.canvasCamera.getPosition();
      const position = canvasObject.getPosition();
      const dimensions = canvasObject.getDimensions();
      const rotation = canvasObject.getRotation();

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

      if (spriteData.sprites) {
        this.#ctx.save();
        this.#ctx.globalAlpha = canvasObject.getOpacity();
        this.#ctx.translate(
          position.x + dimensions.width / 2,
          position.y + dimensions.height / 2
        );
        this.#ctx.rotate(rotation * (Math.PI / 180));
        this.#ctx.translate(
          -(position.x + dimensions.width / 2),
          -(position.y + dimensions.height / 2)
        );

        if (spriteData.sprites.length === 1) {
          this.#ctx.drawImage(
            spriteData.sprites[0],
            position.x,
            position.y,
            dimensions.width,
            dimensions.height
          );
        } else if (spriteData.sprites.length > 1) {
          const timePassed =
            (new Date().getTime() -
              canvasObject.getSpriteData().startTimeFrame) /
            1000;
          const animationFrame = Math.floor(
            (timePassed * spriteData.animationSpeed) % spriteData.sprites.length
          );

          this.#ctx.drawImage(
            spriteData.sprites[animationFrame],
            position.x,
            position.y,
            dimensions.width,
            dimensions.height
          );
        }

        this.#ctx.restore();
      }
    });
  };

  #logic = () => {
    const objs = [...this.canvasObjects, this.canvasCamera];

    objs.forEach((canvasObject) => {
      this.#onUpdate(this);

      onWheelScroll(canvasObject, { ...this.#wheelScroll });
      onHover(canvasObject, { ...this.#mousePosition });
    });
  };

  setCanvasSize = (width: number, height: number) => {
    if (this.canvas) {
      this.#width = width;
      this.#height = height;
      this.canvas.width = width;
      this.canvas.height = height;
      this.canvas.style.width = `${width}px`;
      this.canvas.style.height = `${height}px`;
    } else {
      Log("Cannot set canvas width because no canvas found");
    }
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

  createCamera = (
    onCreate: (_this: CanvasCamera) => void = () => {},
    onUpdate: (_this: CanvasCamera) => void = () => {}
  ) => {
    this.canvasCamera = new CanvasCamera(
      ++this.#objectsCreated,
      onCreate,
      onUpdate
    );
    this.canvasObjects.push(this.canvasCamera);
    return this.canvasCamera;
  };
}
