import { coordinationType } from "./types.js";

class LineClass {
  #lineWidth: number = 1;
  #fromPosition: coordinationType | null = null;
  #toPosition: coordinationType | null = null;
  #color: string | null = null;

  setLine = (fromPosition: coordinationType, toPosition: coordinationType) => {
    this.#fromPosition = fromPosition;
    this.#toPosition = toPosition;

    if (this.#color === null) {
      this.#color = "black";
    }

    return this;
  };

  setLineWidth = (lineWidth: number) => {
    this.#lineWidth = lineWidth;

    return this;
  };

  setColor = (color: string) => {
    this.#color = color;

    return this;
  };

  getLineData = () => {
    return {
      fromPosition: this.#fromPosition,
      toPosition: this.#toPosition,
      color: this.#color,
      lineWidth: this.#lineWidth,
    };
  };
}

export default LineClass;
