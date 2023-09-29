import CanvasX from "../CanvasX.js";

const updateCanvasMousePosition = (
  canvasX: CanvasX,
  clientX: number,
  clientY: number
) => {
  if (canvasX.canvas === null) {
    return;
  }
  const canvasSize = canvasX.getCanvasSize();
  const canvasPosition = canvasX.canvas.getBoundingClientRect();
  const mousePosition = {
    x: clientX - canvasSize.width / 2 - canvasPosition.left,
    y: clientY - canvasSize.height / 2 - canvasPosition.top,
  };
  const cameraZoomLevel = canvasX.canvasCamera.getZoomLevel();
  const cameraPosition = canvasX.canvasCamera.getPosition();
  mousePosition.x += cameraPosition.x * cameraZoomLevel;
  mousePosition.y += cameraPosition.y * cameraZoomLevel;
  mousePosition.x /= cameraZoomLevel;
  mousePosition.y /= cameraZoomLevel;
  canvasX.setMousePosition(mousePosition.x, mousePosition.y);
};

export default updateCanvasMousePosition;
