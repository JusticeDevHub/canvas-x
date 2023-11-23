import CanvasObject from "../CanvasObject.js";
import getDistanceBetweenTwoPoints from "./getDistanceBetweenTwoPoints.js";

const moveToPositionHandling = (canvasObject: CanvasObject) => {
  const moveToPosition = canvasObject.getMoveToPosition();
  if (moveToPosition !== null && moveToPosition.speed !== 0) {
    const position = {
      startX: moveToPosition.startX,
      startY: moveToPosition.startY,
      targetX: moveToPosition.targetX,
      targetY: moveToPosition.targetY,
      currentX: 0,
      currentY: 0,
    };

    const timestamp = moveToPosition.getMoveToData().timestamp;
    if (timestamp === null) {
      return;
    }
    const timePassed = (Date.now() - timestamp) / 1000;

    const movementDistance = getDistanceBetweenTwoPoints(
      {
        x: position.startX,
        y: position.startY,
      },
      {
        x: position.targetX,
        y: position.targetY,
      }
    );

    const totalTimeToMove = movementDistance / moveToPosition.speed;

    if (timePassed > totalTimeToMove) {
      position.currentX = position.targetX;
      position.currentY = position.targetY;
      canvasObject.setMoveToPositionToNull();
    } else {
      const percentage = timePassed / totalTimeToMove;
      position.currentX =
        position.startX + (position.targetX - position.startX) * percentage;
      position.currentY =
        position.startY + (position.targetY - position.startY) * percentage;
    }

    canvasObject.setPosition(
      position.currentX,
      position.currentY,
      canvasObject.getPosition().z
    );
  }
};

export default moveToPositionHandling;
