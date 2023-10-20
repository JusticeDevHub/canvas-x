import { coordinationType } from "../types.js";

const getDistanceBetweenTwoPoints = (
  p1: coordinationType,
  p2: coordinationType
) => {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
};

export default getDistanceBetweenTwoPoints;
