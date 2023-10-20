import { coordinationType } from "../types.js";

const isCollisionWithMouse = (
  objPosition: coordinationType,
  mousePosition: coordinationType,
  objDimensions: { width: number; height: number }
) => {
  let inCollisionWithMouse = false;
  if (
    Math.abs(objPosition.x - mousePosition.x) < objDimensions.width / 2 &&
    Math.abs(objPosition.y - mousePosition.y) < objDimensions.height / 2
  ) {
    inCollisionWithMouse = true;
  }

  return inCollisionWithMouse;
};

export default isCollisionWithMouse;
