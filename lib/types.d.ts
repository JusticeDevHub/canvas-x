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

export type dragDataPhysicsType = {
  momentum: number;
  savedFrames: number;
  framePosition: coordinationType[];
  velocity: coordinationType;
} | null;

export type onClickType =
  | "this_left_click"
  | "this_right_click"
  | "global_left_click"
  | "global_right_click"
  | "this_touch1"
  | "this_touch2"
  | "this_touch3"
  | "this_touch4"
  | "this_touch5"
  | "global_touch1"
  | "global_touch2"
  | "global_touch3"
  | "global_touch4"
  | "global_touch5";
