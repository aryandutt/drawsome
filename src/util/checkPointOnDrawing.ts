import { DrawingsElement, Tools } from "./types";

const checkPointOnDrawing = (
  drawing: DrawingsElement,
  x1: number,
  y1: number,
  threshold: number = 5
): boolean => {
  const { startPoint, endPoint } = drawing;

  if (drawing.shape === Tools.Line) {
    const onLineSegmentWithThreshold = (
      x: number,
      y: number,
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      threshold: number
    ) => {
      const distToLine =
        Math.abs((y2 - y1) * x - (x2 - x1) * y + x2 * y1 - y2 * x1) /
        Math.sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2);

      const distToStart = Math.sqrt((x - x1) ** 2 + (y - y1) ** 2);
      const distToEnd = Math.sqrt((x - x2) ** 2 + (y - y2) ** 2);

      return (
        distToLine <= threshold &&
        distToStart + distToEnd <=
          Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) + threshold
      );
    };

    return onLineSegmentWithThreshold(
      x1,
      y1,
      startPoint.x,
      startPoint.y,
      endPoint.x,
      endPoint.y,
      threshold
    );
  } else if (drawing.shape === Tools.Rectangle) {
    const nearRectangleSide = (
      x: number,
      y: number,
      rectX1: number,
      rectY1: number,
      rectX2: number,
      rectY2: number,
      threshold: number
    ) => {
      const isNearTop = y >= rectY1 - threshold && y <= rectY1 + threshold;
      const isNearBottom = y >= rectY2 - threshold && y <= rectY2 + threshold;
      const isNearLeft = x >= rectX1 - threshold && x <= rectX1 + threshold;
      const isNearRight = x >= rectX2 - threshold && x <= rectX2 + threshold;

      return isNearTop || isNearBottom || isNearLeft || isNearRight;
    };

    return nearRectangleSide(
      x1,
      y1,
      startPoint.x,
      startPoint.y,
      endPoint.x,
      endPoint.y,
      threshold
    );
  } else if (drawing.shape === Tools.Ellipse) {
    const onEllipse = (
      x: number,
      y: number,
      centerX: number,
      centerY: number,
      width: number,
      height: number
    ) => {
      const normalizedX = (x - centerX) / (width / 2);
      const normalizedY = (y - centerY) / (height / 2);

      const distance = normalizedX ** 2 + normalizedY ** 2 - 1;

      return Math.abs(distance) <= 0.2;
    };

    return onEllipse(
      x1,
      y1,
      startPoint.x + (endPoint.x - startPoint.x) / 2,
      startPoint.y + (endPoint.y - startPoint.y) / 2,
      Math.abs(endPoint.x - startPoint.x),
      Math.abs(endPoint.y - startPoint.y)
    );
  } else if (drawing.shape === Tools.Circle) {
    const onCircle = (
      x: number,
      y: number,
      centerX: number,
      centerY: number,
      radius: number
    ): boolean => {
      const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

      return Math.abs(distance - radius) <= 0.25;
    };

    return onCircle(
      x1,
      y1,
      startPoint.x + (endPoint.x - startPoint.x) / 2,
      startPoint.y + (endPoint.y - startPoint.y) / 2,
      Math.sqrt(
        (endPoint.y - startPoint.y) ** 2 + (endPoint.x - startPoint.x) ** 2 // diameter / 2
      ) /
        (1.414 * 2)
    );
  } else if (drawing.shape === Tools.Pen) {
    let flag: boolean = false;

    const isNearPoint = (
      x: number,
      y: number,
      x1: number,
      y1: number,
      threshold: number
    ): boolean => {
      const distance = Math.sqrt((x - x1) ** 2 + (y - y1) ** 2);
      return distance <= threshold;
    };

    drawing.pointPath?.every((point) => {
      flag = isNearPoint(point.x, point.y, x1, y1, threshold);
      return !flag;
    });

    return flag;
  }

  return false;
};

export default checkPointOnDrawing;
