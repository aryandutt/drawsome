import { onCircle } from './onShape/onCircle';
import { onEllipse } from './onShape/onEllipse';
import { onLineSegmentWithThreshold } from './onShape/onLineSegmentWithThreshold';
import { onRectangleSide } from './onShape/onRectangleSide';
import { DrawingsElement, Tools } from './types';
interface Point {
  x: number;
  y: number;
}
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
                (endPoint.y - startPoint.y) ** 2 +
                    (endPoint.x - startPoint.x) ** 2 // diameter / 2
            ) /
                (1.414 * 2)
        );
    } else if (drawing.shape === Tools.Pen) {
        let flag = false;

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



        const smoothedPath = drawing.pointPath?.length ? smoothPath(drawing.pointPath) : []; // Apply smoothing algorithm
        smoothedPath.every((point: Point) => {
            flag = isNearPoint(point.x, point.y, x1, y1, threshold);
            return !flag;
        });

        return flag;
    }
    function smoothPath(path: { x: number; y: number }[], tolerance = 1) {
        if (path.length < 2) {
            return path;
        }
        // Find the point with the maximum distance from the line formed by the first and last points
        let farthestPointIndex = 0;
        let farthestDistance = 0;
        for (let i = 1; i < path.length - 1; i++) {
            const distance = perpendicularDistance(
                path[0],
                path[path.length - 1],
                path[i]
            );
            if (distance > farthestDistance) {
                farthestPointIndex = i;
                farthestDistance = distance;
            }
        }

        // If the farthest point is within the tolerance, the path is considered smooth
        if (farthestDistance <= tolerance) {
            return [path[0], path[path.length - 1]];
        }

        // Recursively simplify the two sub-paths formed by splitting at the farthest point
        const simplifiedLeft: { x: number; y: number }[] = smoothPath(
            path.slice(0, farthestPointIndex + 1),
            tolerance
        );
        const simplifiedRight: { x: number; y: number }[] = smoothPath(
            path.slice(farthestPointIndex),
            tolerance
        );

        // Combine the simplified sub-paths
        return [
            ...simplifiedLeft.slice(0, simplifiedLeft.length - 1),
            ...simplifiedRight,
        ];
    }

    // Helper function to calculate the perpendicular distance from a point to a line segment
    function perpendicularDistance(
        p1: { x: number; y: number },
        p2: { x: number; y: number },
        p: { x: number; y: number }
    ): number {
        const x1 = p1.x;
        const y1 = p1.y;
        const x2 = p2.x;
        const y2 = p2.y;
        const px = p.x;
        const py = p.y;

        const A = y2 - y1;
        const B = x1 - x2;
        const C = x1 * y2 - x2 * y1;

        const distance =
            Math.abs(A * px + B * py + C) / Math.sqrt(A * A + B * B);
        return distance;
    }
    return false;
};

export default checkPointOnDrawing;
