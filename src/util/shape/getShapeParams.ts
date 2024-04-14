import getStroke from 'perfect-freehand';
import rough from 'roughjs';
import { getSvgPathFromStroke } from '../getSvgPathFromStroke';
import { CoordinateInterface, DrawingsElement, Tools } from '../types';

const seed = rough.newSeed();

const getShapeParams = ({
    pointPath,
    startPoint,
    endPoint,
    shape,
    options,
}: DrawingsElement): (number | object | string)[] => {
    if (shape === Tools.Line)
        return [
            startPoint.x,
            startPoint.y,
            endPoint.x,
            endPoint.y,
            { seed, ...options },
        ];
    else if (shape === Tools.Rectangle)
        return [
            startPoint.x,
            startPoint.y,
            endPoint.x - startPoint.x,
            endPoint.y - startPoint.y,
            { seed, ...options },
        ];
    else if (shape === Tools.Ellipse)
        return [
            startPoint.x + (endPoint.x - startPoint.x) / 2,
            startPoint.y + (endPoint.y - startPoint.y) / 2,
            endPoint.x - startPoint.x,
            endPoint.y - startPoint.y,
            { seed, ...options },
        ];
    else if (shape === Tools.Circle)
        return [
            startPoint.x + (endPoint.x - startPoint.x) / 2,
            startPoint.y + (endPoint.y - startPoint.y) / 2,
            Math.sqrt(
                (endPoint.y - startPoint.y) ** 2 +
                    (endPoint.x - startPoint.x) ** 2
            ) / 1.414,
            { seed, ...options },
        ];
    else {
        // shape === Tools.Pen
        const strokePoints = getStroke(pointPath as CoordinateInterface[], {
            last: true,
            size: 4,
            smoothing: 1,
            streamline: 0.55,
        });
        const penPathArray = strokePoints.map((point) => {
            return [point[0], point[1]] as [number, number];
        });

        return penPathArray
            ? [
                  getSvgPathFromStroke(penPathArray),
                  {
                      seed,
                      ...options,
                      roughness: 0,
                      fillStyle: 'solid',
                      fill: options?.stroke,
                  },
              ]
            : [];
    }
};

export default getShapeParams;
