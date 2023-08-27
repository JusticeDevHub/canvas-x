export type coordinationType = {
  x: number;
  y: number;
};

export type dimensionsType = {
  width: number;
  height: number;
};

export type spriteDataType = {
  sprites: HTMLImageElement[] | null;
  startFrame: number;
  animationSpeed: number;
  startTimeFrame: number;
};
