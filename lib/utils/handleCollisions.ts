import CanvasObject from "../CanvasObject.js";
import CanvasX from "../CanvasX.js";

const handleCollisions = (canvasObject: CanvasObject, canvasX: CanvasX) => {
  const collisionEnter = canvasObject.getOnCollisionEnter();

  if (collisionEnter !== null) {
    collisionEnter.forEach((_collisionEnter) => {
      if (_collisionEnter.isCollision === false) {
        let targetObject = null;
        if (typeof _collisionEnter.target === "string") {
          targetObject = canvasX.getObjectWithName(_collisionEnter.target);
        } else {
          targetObject = canvasX.getObjectWithId(_collisionEnter.target);
        }

        if (targetObject !== null) {
          const object = {
            position: canvasObject.getPosition(),
            size: canvasObject.getDimensions(),
          };
          const target = {
            position: targetObject.getPosition(),
            size: targetObject.getDimensions(),
          };

          const xCollision =
            Math.abs(object.position.x - target.position.x) <
            (object.size.width + target.size.width) / 2;

          const yCollision =
            Math.abs(object.position.y - target.position.y) <
            (object.size.height + target.size.height) / 2;

          if (xCollision && yCollision) {
            _collisionEnter.isCollision = true;
            _collisionEnter.func(canvasObject);
          }
        }
      }
    });
  }
};

export default handleCollisions;
