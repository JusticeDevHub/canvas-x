import CanvasObject from "../CanvasObject.js";
import { coordinationType } from "../types.js";

const isDraggedHandling = (
  canvasObject: CanvasObject,
  mousePosition: coordinationType
) => {
  const dragData = canvasObject.getDragData();
  if (dragData.isDragged) {
    canvasObject.setPosition(
      mousePosition.x - dragData.dragPositionOffset.x,
      mousePosition.y - dragData.dragPositionOffset.y,
      canvasObject.getPosition().z
    );
  }
};

export default isDraggedHandling;
