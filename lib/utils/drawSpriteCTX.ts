const drawSpriteCTX = (
  ctx: CanvasRenderingContext2D,
  sprite: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number
) => {
  ctx.drawImage(sprite, x, y, width, height);
};

export default drawSpriteCTX;
