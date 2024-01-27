import { GetShapeParamsType, Tools } from "./types";

const getShapeParams = ({ startPoint, endPoint, shape }: GetShapeParamsType): (number | object)[] => {
  
  if (shape === Tools.Line)
    return [startPoint.x, startPoint.y, endPoint.x, endPoint.y];

  if (shape === Tools.Rectangle)
    return [
      startPoint.x,
      startPoint.y,
      endPoint.x - startPoint.x,
      endPoint.y - startPoint.y,
    ];

  if (shape === Tools.Ellipse)
    return [
      startPoint.x + (endPoint.x - startPoint.x) / 2,
      startPoint.y + (endPoint.y - startPoint.y) / 2,
      endPoint.x - startPoint.x,
      endPoint.y - startPoint.y,
    ];

  if (shape === Tools.Circle)
    return [
      startPoint.x + ((endPoint.x - startPoint.x) / 2),
      startPoint.y + ((endPoint.y - startPoint.y) / 2),
      (Math.sqrt(
        (endPoint.y - startPoint.y) * (endPoint.y - startPoint.y) +
          (endPoint.x - startPoint.x) * (endPoint.x - startPoint.x)
      ) / 1.414),
    ];

    return [] as (number | object)[]; 
};


export default getShapeParams;
