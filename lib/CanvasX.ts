import CanvasCamera from "./CanvasCamera.js";
import CanvasObject from "./CanvasObject.js";
import VariableClass from "./VariableClass.js";
import Log from "./log.js";
import { coordinationType } from "./types.js";
import onHover from "./utils/onHover.js";
import onWheelScroll from "./utils/onWheelScroll.js";
import moveToPositionHandling from "./utils/moveToPositionHandling.js";
import isDraggedHandling from "./utils/isDraggedHandling.js";
import drawSpriteCTX from "./utils/drawSpriteCTX.js";
import updateCanvasMousePosition from "./utils/updateCanvasMousePosition.js";
import handleCollisions from "./utils/handleCollisions.js";

export default class CanvasX extends VariableClass {
  #width: number | "auto" = "auto";
  #height: number | "auto" = "auto";
  canvasCamera: CanvasCamera = new CanvasCamera(
    -1,
    "",
    () => {},
    () => {},
    this
  );
  canvasObjects: CanvasObject[] = [];
  canvas: HTMLCanvasElement | null = null;
  #ctx: CanvasRenderingContext2D | null = null;
  #objectsCreated = 0;
  #mousePosition: coordinationType = { x: 0, y: 0 };
  #onUpdate: (_this: CanvasX) => void = (_this: CanvasX) => {};
  #wheelScroll: coordinationType = { x: 0, y: 0 };
  #loopId: any | null = null;
  #globalValues: VariableClass = new VariableClass();
  #window: Window | null = null;

  init = (
    canvasId: string,
    onCreate: (_this: CanvasX) => void = (_this: CanvasX) => {},
    onUpdate: (_this: CanvasX) => void = (_this: CanvasX) => {}
  ) => {
    this.canvas =
      (document.getElementById(canvasId) as HTMLCanvasElement) || null;
    if (this.canvas) {
      this.setCanvasSize("auto", "auto");
      this.#ctx = this.canvas.getContext("2d");

      this.#loopId = setInterval(() => {
        this.#canvasUpdate();
      }, 1000 / 60);

      const mouseOrClickDown = (e: MouseEvent | TouchEvent) => {
        // e.preventDefault();
        if (e instanceof MouseEvent) {
          updateCanvasMousePosition(this, e.clientX, e.clientY);
        } else if (e.touches && e.touches[0]) {
          updateCanvasMousePosition(
            this,
            e.touches[0].clientX,
            e.touches[0].clientY
          );
        }

        this.canvasObjects.forEach((canvasObject) => {
          // Handle Global Left Click
          const global_left_click =
            canvasObject.getOnClick("global_left_click");
          if (global_left_click) {
            global_left_click(canvasObject);
          }

          if (canvasObject.getOnHoverTrue()) {
            // Handle this Left Clicked
            const this_left_click = canvasObject.getOnClick("this_left_click");
            if (this_left_click) {
              this_left_click(canvasObject);
            }

            // Handle drag
            const draggable = canvasObject.getDraggable();
            if (draggable) {
              const dragData = canvasObject.getDragData();
              canvasObject.setDragData({
                dragPositionOffset: {
                  x: this.#mousePosition.x - canvasObject.getPosition().x,
                  y: this.#mousePosition.y - canvasObject.getPosition().y,
                },
                isDragged: true,
                smoothness: dragData.smoothness,
              });
            }
          }
        });
      };

      const mouseOrClickUp = (e: MouseEvent | TouchEvent) => {
        // e.preventDefault();
        this.canvasObjects.forEach((canvasObject) => {
          // Handle click release
          const clickRelease = canvasObject.getClickRelease();
          if (clickRelease !== null) {
            clickRelease(canvasObject);
          }

          // Handle drag
          const dragData = canvasObject.getDragData();
          if (dragData.isDragged) {
            canvasObject.setDragData({
              dragPositionOffset: {
                x: 0,
                y: 0,
              },
              isDragged: false,
              smoothness: dragData.smoothness,
            });
          }
        });
      };

      const mouseOrClickMove = (
        e: MouseEvent | TouchEvent,
        clientX: number,
        clientY: number
      ) => {
        if (this.canvas === null) {
          return;
        }
        // e.preventDefault();
        updateCanvasMousePosition(this, clientX, clientY);
      };

      document.addEventListener("mousedown", (e) => {
        mouseOrClickDown(e);
      });

      document.addEventListener("touchstart", (e) => {
        mouseOrClickDown(e);
      });

      document.addEventListener("mousemove", (e: MouseEvent) => {
        mouseOrClickMove(e, e.clientX, e.clientY);
      });

      document.addEventListener("touchmove", (e: TouchEvent) => {
        if (e && e.touches && e.touches[0]) {
          const clientX = e.touches[0].clientX;
          const clientY = e.touches[0].clientY;
          mouseOrClickMove(e, clientX, clientY);
        }
      });

      document.addEventListener("mouseup", (e) => {
        mouseOrClickUp(e);
      });

      document.addEventListener("touchend", (e) => {
        mouseOrClickUp(e);
      });

      document.addEventListener("contextmenu", (e) => {
        // e.preventDefault();
        this.canvasObjects.forEach((canvasObject) => {
          const global_right_click =
            canvasObject.getOnClick("global_right_click");
          if (global_right_click) {
            global_right_click(canvasObject);
          }

          if (canvasObject.getOnHoverTrue()) {
            const this_right_click =
              canvasObject.getOnClick("this_right_click");
            if (this_right_click) {
              this_right_click(canvasObject);
            }
          }
        });
      });

      document.addEventListener("wheel", (e) => {
        if (this.canvasCamera.getZoomByScroll()) {
          let zoomLevel = this.canvasCamera.getZoomLevel();
          const zoomSpeed = this.canvasCamera.getZoomSpeed();
          const bassScrollSpeedPoint = 50;
          const scrollDelta =
            1 + 0.02 * zoomSpeed * (Math.abs(e.deltaY) / bassScrollSpeedPoint);

          if (e.deltaY < 0) {
            zoomLevel *= scrollDelta;
          } else {
            zoomLevel /= scrollDelta;
          }
          this.canvasCamera.setZoomLevel(zoomLevel);
        }

        // TODO: Seems not needed
        this.#wheelScroll = {
          x: Math.abs(e.deltaX) < 10 ? 0 : e.deltaX,
          y: Math.abs(e.deltaY) < 10 ? 0 : e.deltaY,
        };
      });

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

  #logic = () => {
    this.#onUpdate(this);

    const objs = [...this.canvasObjects, this.canvasCamera];
    objs.forEach((canvasObject) => {
      const update = canvasObject.getOnUpdate();
      handleCollisions(canvasObject, this);
      moveToPositionHandling(canvasObject);
      onWheelScroll(canvasObject, { ...this.#wheelScroll });
      onHover(canvasObject, { ...this.#mousePosition });
      isDraggedHandling(canvasObject, { ...this.#mousePosition });
      update(canvasObject);
    });
  };

  #drawCanvas = () => {
    if (this.canvas === null || this.#ctx === null) {
      return;
    }

    const canvasSize = this.getCanvasSize();
    this.#ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

    const canvasObjectsDrawOrder: CanvasObject[] = [];
    this.canvasObjects.forEach((canvasObject) => {
      const obj: any = { ...canvasObject };
      if (canvasObject.getVisible()) {
        canvasObjectsDrawOrder.push(obj);
      }
    });
    canvasObjectsDrawOrder.sort((a, b) => {
      return a.getPosition().z - b.getPosition().z;
    });

    canvasObjectsDrawOrder.forEach((canvasObject) => {
      const spriteData = canvasObject.getSpriteData();
      const backgroundColor = canvasObject.getBackgroundColor();
      const cameraZoomLevel = this.canvasCamera.getZoomLevel();
      const cameraPositionOffset = this.canvasCamera.getPosition();
      const position = canvasObject.getPosition();
      const dimensions = canvasObject.getDimensions();
      const rotation = canvasObject.getRotation();
      const parent = canvasObject.getParent();
      if (parent) {
        const parentPosition = parent.getPosition();
        position.x += parentPosition.x;
        position.y += parentPosition.y;
      }

      dimensions.width *= cameraZoomLevel;
      dimensions.height *= cameraZoomLevel;
      position.x -= cameraPositionOffset.x;
      position.y -= cameraPositionOffset.y;
      position.x *= cameraZoomLevel;
      position.y *= cameraZoomLevel;
      position.x -= dimensions.width / 2;
      position.y -= dimensions.height / 2;
      position.x += canvasSize.width / 2;
      position.y += canvasSize.height / 2;

      if (backgroundColor && this.#ctx !== null) {
        this.#ctx.globalAlpha = canvasObject.getOpacity();
        this.#ctx.fillStyle = backgroundColor;
        this.#ctx.fillRect(
          position.x,
          position.y,
          dimensions.width,
          dimensions.height
        );
      }

      if (spriteData.sprites && this.#ctx !== null) {
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

        const sprites: HTMLImageElement[] | undefined = spriteData.sprites;
        if (sprites && sprites[0] && sprites.length === 1) {
          drawSpriteCTX(
            this.#ctx,
            sprites[0],
            position.x,
            position.y,
            dimensions.width,
            dimensions.height
          );
        } else if (sprites.length > 1) {
          const timePassed =
            (new Date().getTime() -
              canvasObject.getSpriteData().startTimeFrame) /
            1000;
          const animationFrame = Math.floor(
            (timePassed * spriteData.animationSpeed) % spriteData.sprites.length
          );
          const sprite = sprites[animationFrame];
          if (sprite) {
            drawSpriteCTX(
              this.#ctx,
              sprite,
              position.x,
              position.y,
              dimensions.width,
              dimensions.height
            );
          }
        }

        this.#ctx.restore();
      }
    });
  };

  useRequestAnimationFrame = (window: Window) => {
    clearInterval(this.#loopId);
    this.#window = window;

    const loop = () => {
      this.#canvasUpdate();
      this.#loopId = window.requestAnimationFrame(loop);
    };
    loop();
  };

  setCanvasSize = (width: number | "auto", height: number | "auto") => {
    if (this.canvas) {
      let canvasWidth =
        typeof width === "number" ? width : this.canvas.clientWidth;
      let canvasHeight =
        typeof height === "number" ? height : this.canvas.clientHeight;

      this.#width = canvasWidth;
      this.#height = canvasHeight;
      this.canvas.width = canvasWidth;
      this.canvas.height = canvasHeight;
      this.canvas.style.width = `${width}px`;
      this.canvas.style.height = `${height}px`;
    } else {
      Log("Cannot set canvas size because no canvas found");
    }
  };

  getCanvasSize = () => {
    if (this.canvas === null) {
      return { width: 0, height: 0 };
    }
    const canvasSize = {
      width:
        typeof this.#width === "number" ? this.#width : this.canvas.clientWidth,
      height:
        typeof this.#height === "number"
          ? this.#height
          : this.canvas.clientHeight,
    };
    return canvasSize;
  };

  getCamera = (): CanvasCamera => {
    return this.canvasCamera;
  };

  // TODO: Hidden from user
  setMousePosition = (x: number, y: number) => {
    this.#mousePosition = { x, y };
  };

  getMousePosition = (): coordinationType => {
    return this.#mousePosition;
  };

  getGlobalVariableValue = (key: string) => {
    return this.#globalValues.getVariableValue(key);
  };

  setGlobalVariableValue = (key: string, value: any) => {
    this.#globalValues.setVariableValue(key, value);
  };

  #destroyObjectById = (id: number) => {
    this.canvasObjects = this.canvasObjects.filter(
      (canvasObject) => canvasObject.getId() !== id
    );
  };

  setMouseCursor = (cursorType: string) => {
    document.body.style.cursor = cursorType;
  };

  getObjectWithId = (id: number): CanvasObject | CanvasCamera | null => {
    const canvasObject = this.canvasObjects.find((canvasObject) => {
      return canvasObject.getId() === id;
    });
    return canvasObject || null;
  };

  getObjectWithName = (name: string): CanvasObject | CanvasCamera | null => {
    const canvasObject = this.canvasObjects.find((canvasObject) => {
      return canvasObject.getName() === name;
    });
    return canvasObject || null;
  };

  createObject = (
    name: string = "",
    onCreate: (_this: CanvasObject) => void = (_this: CanvasObject) => {},
    onUpdate: (_this: CanvasObject) => void = (_this: CanvasObject) => {},
    onDestroy: (_this: CanvasObject) => void = (_this: CanvasObject) => {}
  ) => {
    const newObj = new CanvasObject(
      ++this.#objectsCreated,
      name,
      onCreate,
      onUpdate,
      onDestroy,
      this.#destroyObjectById,
      this
    );
    this.canvasObjects.push(newObj);
    return newObj;
  };

  createCamera = (
    name: string = "",
    onCreate: (_this: CanvasCamera | CanvasObject) => void = (
      _this: CanvasCamera | CanvasObject
    ) => {},
    onUpdate: (_this: CanvasCamera | CanvasObject) => void = (
      _this: CanvasCamera | CanvasObject
    ) => {}
  ) => {
    this.canvasCamera = new CanvasCamera(
      ++this.#objectsCreated,
      name,
      onCreate,
      onUpdate,
      this
    );
    this.canvasObjects.push(this.canvasCamera);
    return this.canvasCamera;
  };

  terminate = () => {
    if (this.#window !== null) {
      this.#window.cancelAnimationFrame(this.#loopId);
    } else {
      clearInterval(this.#loopId);
    }
  };
}
