class CircleClass {
  #render = false;
  #radius: number | null = null;
  #color: string | CanvasGradient | CanvasPattern | null = null;
  #strokeWidth: number | null = null;

  getRender = () => this.#render;

  updateDefaultValues = () => {
    this.#render = true;

    const defaultValues = {
      render: true,
      radius: 100,
      color: "gray",
      strokeWidth: 1,
    };

    if (this.#color === null) {
      this.#color = defaultValues.color;
    }

    if (this.#radius === null) {
      this.#radius = defaultValues.radius;
    }

    if (this.#strokeWidth === null) {
      this.#strokeWidth = defaultValues.strokeWidth;
    }
  };

  getRadius = () => this.#radius;

  setRadius = (radius: number) => {
    this.#radius = radius;
    this.updateDefaultValues();
    return this;
  };

  getStrokeWidth = () => this.#strokeWidth;

  setStrokeWidth = (width: number) => {
    this.#strokeWidth = width;
    this.updateDefaultValues();
  };

  getColor = () => this.#color;

  setColor = (color: string | CanvasGradient | CanvasPattern) => {
    this.#color = color;
    this.updateDefaultValues();
    return this;
  };
}

export default CircleClass;
