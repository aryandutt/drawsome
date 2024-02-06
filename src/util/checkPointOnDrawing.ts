import { onCircle } from "./onShape/onCircle";
import { onEllipse } from "./onShape/onEllipse";
import { onLineSegmentWithThreshold } from "./onShape/onLineSegmentWithThreshold";
import { onRectangleSide } from "./onShape/onRectangleSide";
import { DrawingsElement, Tools } from "./types";

const checkPointOnDrawing = (
  drawing: DrawingsElement,
  x1: number,
  y1: number,
  threshold: number = 5
): boolean => {
  const { startPoint, endPoint } = drawing;

  if (drawing.shape === Tools.Line) {
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
    return onRectangleSide(
      x1,
      y1,
      startPoint.x,
      startPoint.y,
      endPoint.x,
      endPoint.y,
      threshold
    );
  } else if (drawing.shape === Tools.Ellipse) {
    return onEllipse(
      x1,
      y1,
      startPoint.x + (endPoint.x - startPoint.x) / 2,
      startPoint.y + (endPoint.y - startPoint.y) / 2,
      Math.abs(endPoint.x - startPoint.x),
      Math.abs(endPoint.y - startPoint.y)
    );
  } else if (drawing.shape === Tools.Circle) {
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
