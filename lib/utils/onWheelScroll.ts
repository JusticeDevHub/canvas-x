import CanvasObject from "../CanvasObject.js";
import { coordinationType } from "../types.js";

const onWheelScroll = (
  canvasObject: CanvasObject,
  wheelScroll: coordinationType
) => {
  const wheelSroll = canvasObject.getOnWheelScroll();
  if (wheelSroll) {
    if (JSON.stringify(wheelScroll) !== JSON.stringify({ x: 0, y: 0 })) {
      wheelSroll(canvasObject, wheelScroll);
    }
  }
};

export default onWheelScroll;
