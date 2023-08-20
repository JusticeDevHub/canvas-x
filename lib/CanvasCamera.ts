import VariableClass from "./VariableClass.js";
import { positionType } from "./types.js";

export default class CanvasCamera extends VariableClass {
  #position: positionType = { x: 0, y: 0 };
  #zoomLevel: number = 1;

  constructor(onCreate: Function = () => {}, onUpdate: Function = () => {}) {
    super();
    onCreate(this);

    // TODO: On cancal close animation frame
    const updateLoop = () => {
      onUpdate(this);
      requestAnimationFrame(updateLoop);
    };
    requestAnimationFrame(updateLoop);
  }

  getPosition = (): positionType => {
    return this.#position;
  };

  setPosition = (x: number, y: number): void => {
    this.#position = {
      x,
      y,
    };
  };

  getZoomLevel = (): number => {
    return this.#zoomLevel;
  };

  setZoomLevel = (zoomLevel: number): void => {
    this.#zoomLevel = zoomLevel;
  };
}
