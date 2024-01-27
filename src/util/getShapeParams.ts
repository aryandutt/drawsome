import { GetShapeParamsType, tools } from "./types";

const getShapeParams = ({ startPoint, endPoint, shape }: GetShapeParamsType): (number | object)[] => {
  
  if (shape === tools.Line)
    return [startPoint.x, startPoint.y, endPoint.x, endPoint.y];

  if (shape === tools.Rectangle)
    return [
      startPoint.x,
      startPoint.y,
      endPoint.x - startPoint.x,
      endPoint.y - startPoint.y,
    ];

  if (shape === tools.Ellipse)
    return [
      startPoint.x + (endPoint.x - startPoint.x) / 2,
      startPoint.y + (endPoint.y - startPoint.y) / 2,
      endPoint.x - startPoint.x,
      endPoint.y - startPoint.y,
    ];

  if (shape === tools.Circle)
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
