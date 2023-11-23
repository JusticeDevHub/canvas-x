export class MoveToClass {
  startX: number = 0;
  startY: number = 0;
  targetX: number = 0;
  targetY: number = 0;
  speed: number = 0;
  method: "linear" = "linear";
  #timestamp: number | null = null;

  setMoveTo = (
    currentX: number,
    currentY: number,
    targetX: number,
    targetY: number,
    method: string,
    speed: number
  ) => {
    this.startX = currentX;
    this.startY = currentY;
    this.targetX = targetX;
    this.targetY = targetY;
    this.method = method as "linear";
    this.speed = speed;
    this.#timestamp = Date.now();
  };

  getMoveToData = () => {
    return {
      startX: this.startX,
      startY: this.startY,
      targetX: this.targetX,
      targetY: this.targetY,
      speed: this.speed,
      method: this.method,
      timestamp: this.#timestamp,
    };
  };
}
