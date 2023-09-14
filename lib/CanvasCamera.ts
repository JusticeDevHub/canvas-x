import CanvasObject from "./CanvasObject.js";

export default class CanvasCamera extends CanvasObject {
  #zoomLevel: number = 1;

  constructor(
    id: number,
    onCreate: (_this: CanvasCamera) => void = (_this: CanvasCamera) => {},
    onUpdate: (_this: CanvasCamera) => void = (_this: CanvasCamera) => {}
  ) {
    super(
      id,
      onCreate,
      onUpdate,
      () => {},
      () => {}
    );
  }

  getZoomLevel = (): number => {
    return this.#zoomLevel;
  };

  setZoomLevel = (zoomLevel: number): void => {
    this.#zoomLevel = zoomLevel > 0 ? zoomLevel : 0.001;
  };
}
