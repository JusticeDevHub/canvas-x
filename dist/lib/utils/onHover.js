const onHover = (canvasObject, mousePosition) => {
    const objPosition = canvasObject.getPosition();
    const objDimensions = canvasObject.getDimensions();
    const onHoverTrue = canvasObject.getOnHoverTrue();
    let inCollisionWithMouse = false;
    if (Math.abs(objPosition.x - mousePosition.x) < objDimensions.width / 2 &&
        Math.abs(objPosition.y - mousePosition.y) < objDimensions.height / 2) {
        inCollisionWithMouse = true;
    }
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
//# sourceMappingURL=onHover.js.map