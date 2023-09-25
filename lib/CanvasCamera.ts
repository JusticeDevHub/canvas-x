import CanvasObject from "./CanvasObject.js";
import CanvasX from "./CanvasX.js";

export default class CanvasCamera extends CanvasObject {
  #zoomLevel: number = 1;

  constructor(
    id: number,
    name: string,
    onCreate: (_this: CanvasCamera) => void = (_this: CanvasCamera) => {},
    onUpdate: (_this: CanvasCamera) => void = (_this: CanvasCamera) => {},
    canvasX: CanvasX
  ) {
    super(
      id,
      name,
      onCreate,
      onUpdate,
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
}
