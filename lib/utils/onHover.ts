import CanvasObject from "../CanvasObject.js";
import { coordinationType } from "../types.js";
import isCollisionWithMouse from "./isCollisionWithMouse.js";

const onHover = (
  canvasObject: CanvasObject,
  mousePosition: coordinationType
) => {
  const objPosition = canvasObject.getPosition();
  const objDimensions = canvasObject.getDimensions();
  const onHoverTrue = canvasObject.getOnHoverTrue();
  const parent = canvasObject.getParent();
  if (parent) {
    const parentPosition = parent.getPosition();
    objPosition.x += parentPosition.x;
    objPosition.y += parentPosition.y;
  }

  const inCollisionWithMouse = isCollisionWithMouse(
    objPosition,
    mousePosition,
    objDimensions
  );

  if (inCollisionWithMouse && !onHoverTrue) {
    // Mouse Entered Collision Box
    canvasObject.setOnHoverTrue(true);

    const onHover = canvasObject.getOnHover();
    if (onHover) {
      onHover(canvasObject);
    }
  }
  if (!inCollisionWithMouse && onHoverTrue) {
    // Mouse Left Collision Box
    canvasObject.setOnHoverTrue(false);
    const onHoverEnd = canvasObject.getOnHoverEnd();
    if (onHoverEnd) {
      onHoverEnd(canvasObject);
    }
  }
};

export default onHover;
