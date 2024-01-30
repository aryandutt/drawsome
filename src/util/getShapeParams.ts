import getStroke from "perfect-freehand";
import rough from "roughjs";
import { getSvgPathFromStroke } from "./getSvgPathFromStroke";
import { CoordinateInterface, DrawingsElement, Tools } from "./types";

const seed = rough.newSeed();

const getShapeParams = ({ pointPath, startPoint, endPoint, shape }: DrawingsElement): (number | object | string)[] => {
  
  if (shape === Tools.Line)
    return [startPoint.x, startPoint.y, endPoint.x, endPoint.y, {seed}];

  if (shape === Tools.Rectangle)
    return [
      startPoint.x,
      startPoint.y,
      endPoint.x - startPoint.x,
      endPoint.y - startPoint.y,
      {seed}
    ];

  if (shape === Tools.Ellipse)
    return [
      startPoint.x + (endPoint.x - startPoint.x) / 2,
      startPoint.y + (endPoint.y - startPoint.y) / 2,
      endPoint.x - startPoint.x,
      endPoint.y - startPoint.y,
      {seed}
    ];

  if (shape === Tools.Circle)
    return [
      startPoint.x + ((endPoint.x - startPoint.x) / 2),
      startPoint.y + ((endPoint.y - startPoint.y) / 2),
      (Math.sqrt(
        (endPoint.y - startPoint.y) * (endPoint.y - startPoint.y) +
          (endPoint.x - startPoint.x) * (endPoint.x - startPoint.x)
      ) / 1.414),
      {seed}
    ];

  if (shape === Tools.Pen){
    const strokePoints = getStroke(pointPath as CoordinateInterface[], {last: true, size: 4, smoothing: 1, streamline: 0.55});
    const penPathArray = strokePoints.map((point) => {
      return [point[0], point[1]] as [number, number];
    })

    return penPathArray ? [getSvgPathFromStroke(penPathArray), {seed, fill: 'black', roughness: 0, fillStyle: 'solid'}] : [];
  }

    return [] as (number | object)[]; 
};


export default getShapeParams;
