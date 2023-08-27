import CanvasCamera from "../CanvasCamera.js";
import CanvasObject from "../CanvasObject.js";
import { coordinationType } from "../types.js";

const onHover = (
  canvasObject: CanvasObject,
  mousePosition: coordinationType,
  cameraObject: CanvasCamera
) => {
  const onHover = canvasObject.getOnHover();
  if (onHover) {
    const objPosition = canvasObject.getPosition();
    const objDimensions = canvasObject.getDimensions();
    const onHoverTrue = canvasObject.getOnHoverTrue();
    const cameraZoomLevel = cameraObject.getZoomLevel();
    const cameraPosition = cameraObject.getPosition();

    mousePosition.x += cameraPosition.x * cameraZoomLevel;
    mousePosition.y += cameraPosition.y * cameraZoomLevel;
    mousePosition.x /= cameraZoomLevel;
    mousePosition.y /= cameraZoomLevel;

    let inCollisionWithMouse = false;
    if (
      Math.abs(objPosition.x - mousePosition.x) < objDimensions.width / 2 &&
      Math.abs(objPosition.y - mousePosition.y) < objDimensions.height / 2
    ) {
      inCollisionWithMouse = true;
    }

    if (inCollisionWithMouse && !onHoverTrue) {
      // Mouse Entered Collision Box
      canvasObject.setOnHoverTrue(true);
      onHover(canvasObject);
    }
    if (!inCollisionWithMouse && onHoverTrue) {
      // Mouse Left Collision Box
      canvasObject.setOnHoverTrue(false);
      const onHoverEnd = canvasObject.getOnHoverEnd();
      onHoverEnd(canvasObject);
    }
  }
};

export default onHover;
