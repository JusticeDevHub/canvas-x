import CanvasObject from "../CanvasObject.js";

const moveToPositionHandling = (canvasObject: CanvasObject) => {
  const moveToPosition = canvasObject.getMoveToPosition();
  if (moveToPosition !== null && moveToPosition.speed !== 0) {
    const position = canvasObject.getPosition();
    const speed = moveToPosition.speed;
    const method = moveToPosition.method;
    const x = moveToPosition.x;
    const y = moveToPosition.y;
    const xDiff = x - position.x;
    const yDiff = y - position.y;
    const distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    const xSpeed = (speed * xDiff) / distance;
    const ySpeed = (speed * yDiff) / distance;
    const xSpeedAbs = Math.abs(xSpeed);
    const ySpeedAbs = Math.abs(ySpeed);

    if (method === "linear") {
      if (xSpeedAbs >= Math.abs(xDiff)) {
        moveToPositionHandling;
        position.x = x;
      } else {
        position.x += xSpeed;
      }

      if (ySpeedAbs >= Math.abs(yDiff)) {
        position.y = y;
      } else {
        position.y += ySpeed;
      }

      if (position.x === x && position.y === y) {
        canvasObject.setMoveToPosition(x, y, 0, "linear");
      }
    }

    canvasObject.setPosition(position.x, position.y, position.z);
  }
};

export default moveToPositionHandling;
