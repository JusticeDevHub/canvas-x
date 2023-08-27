const onHover = (canvasObject, mousePosition) => {
    const onHover = canvasObject.getOnHover();
    if (onHover) {
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
//# sourceMappingURL=onHover.js.map