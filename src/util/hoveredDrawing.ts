import checkPointOnDrawing from "./checkPointOnDrawing";
import { DrawingsElement } from "./types";

const hoveredDrawing = (
  drawings: DrawingsElement[],
  x: number,
  y: number
): number => {
  let hoveredIndex: number = -1;
  let flag: boolean = false;

  drawings.every((drawing, index) => {
    flag = checkPointOnDrawing(drawing, x, y);
    if (flag) hoveredIndex = index;
    return !flag;
  });

  return hoveredIndex;
};

export default hoveredDrawing;
