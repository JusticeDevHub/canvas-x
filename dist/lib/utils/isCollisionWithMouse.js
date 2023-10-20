const isCollisionWithMouse = (objPosition, mousePosition, objDimensions) => {
    let inCollisionWithMouse = false;
    if (Math.abs(objPosition.x - mousePosition.x) < objDimensions.width / 2 &&
        Math.abs(objPosition.y - mousePosition.y) < objDimensions.height / 2) {
        inCollisionWithMouse = true;
    }
    return inCollisionWithMouse;
};
export default isCollisionWithMouse;
//# sourceMappingURL=isCollisionWithMouse.js.map