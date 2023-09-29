const isDraggedHandling = (canvasObject, mousePosition) => {
    const dragData = canvasObject.getDragData();
    if (canvasObject.getDraggable()) {
        const objPosition = dragData.objPosition;
        const targetPosition = dragData.targetPosition;
        const smoothness = dragData.smoothness;
        objPosition.x =
            objPosition.x + (targetPosition.x - objPosition.x) * smoothness;
        objPosition.y =
            objPosition.y + (targetPosition.y - objPosition.y) * smoothness;
        canvasObject.setPosition(objPosition.x, objPosition.y, canvasObject.getPosition().z);
    }
    if (dragData.isDragged) {
        dragData.targetPosition = {
            x: mousePosition.x - dragData.dragPositionOffset.x,
            y: mousePosition.y - dragData.dragPositionOffset.y,
        };
    }
};
export default isDraggedHandling;
//# sourceMappingURL=isDraggedHandling.js.map