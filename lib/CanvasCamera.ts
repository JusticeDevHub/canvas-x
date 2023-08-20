import { positionType } from "./types.js";

export default class CanvasCamera {
  #position: positionType = { x: 0, y: 0 };
  #zoomLevel: number = 1;

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
