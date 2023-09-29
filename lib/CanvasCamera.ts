import CanvasObject from "./CanvasObject.js";
import CanvasX from "./CanvasX.js";

export default class CanvasCamera extends CanvasObject {
  #zoomLevel: number = 1;
  #zoomByScroll: boolean = false;
  #zoomSpeed: number = 1;

  constructor(
    id: number,
    name: string,
    onCreate: (_this: CanvasCamera | CanvasObject) => void = (
      _this: CanvasCamera | CanvasObject
    ) => {},
    onUpdate: (_this: CanvasCamera | CanvasObject) => void = (
      _this: CanvasCamera | CanvasObject
    ) => {},
    canvasX: CanvasX
  ) {
    super(
      id,
      name,
      (_this: CanvasObject) => {
        onCreate(_this);
      },
      (_this: CanvasObject) => {
        onUpdate(_this);
      },
      () => {},
      () => {},
      canvasX
    );
  }

  getZoomLevel = (): number => {
    return this.#zoomLevel;
  };

  setZoomLevel = (zoomLevel: number): void => {
    this.#zoomLevel = zoomLevel > 0 ? zoomLevel : 0.001;
  };

  getZoomSpeed = (): number => {
    return this.#zoomSpeed;
  };

  setZoomSpeed = (zoomSpeed: number): void => {
    this.#zoomSpeed = zoomSpeed;
  };

  getZoomByScroll = () => {
    return this.#zoomByScroll;
  };

  setZoomByScroll = (value: boolean, zoomSpeed: number = 1) => {
    this.#zoomByScroll = value;
    this.#zoomSpeed = zoomSpeed;
  };
}
