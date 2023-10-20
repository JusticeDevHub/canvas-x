const isDraggedHandling = (canvasObject, mousePosition) => {
    const dragData = canvasObject.getDragData();
    if (canvasObject.getDraggable()) {
        const objPosition = dragData.objPosition;
        const targetPosition = dragData.targetPosition;
        if (dragData.physics !== null) {
            targetPosition.x += dragData.physics.velocity.x;
            targetPosition.y += dragData.physics.velocity.y;
            dragData.physics.velocity.x *= dragData.physics.momentum;
            dragData.physics.velocity.y *= dragData.physics.momentum;
            const framePosition = [mousePosition, ...dragData.physics.framePosition];
            if (framePosition.length > dragData.physics.savedFrames) {
                framePosition.splice(-1);
            }
            dragData.physics.framePosition = framePosition;
        }
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