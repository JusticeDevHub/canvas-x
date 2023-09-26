const isDraggedHandling = (canvasObject, mousePosition) => {
    const dragData = canvasObject.getDragData();
    if (dragData.isDragged) {
        canvasObject.setPosition(mousePosition.x - dragData.dragPositionOffset.x, mousePosition.y - dragData.dragPositionOffset.y, canvasObject.getPosition().z);
    }
};
export default isDraggedHandling;
//# sourceMappingURL=isDraggedHandling.js.map