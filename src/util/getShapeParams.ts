import { GetShapeParamsType, shapes } from "./types";

const getShapeParams = ({ startPoint, endPoint, shape }: GetShapeParamsType): (number | object)[] => {
  if (shape === shapes.Line)
    return [startPoint.x, startPoint.y, endPoint.x, endPoint.y];

  if (shape === shapes.Rectangle)
    return [
      startPoint.x,
      startPoint.y,
      endPoint.x - startPoint.x,
      endPoint.y - startPoint.y,
    ];

  if (shape === shapes.Ellipse)
    return [
      startPoint.x + (endPoint.x - startPoint.x) / 2,
      startPoint.y + (endPoint.y - startPoint.y) / 2,
      endPoint.x - startPoint.x,
      endPoint.y - startPoint.y,
    ];

  if (shape === shapes.Circle)
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
