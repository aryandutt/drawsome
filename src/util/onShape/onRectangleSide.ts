import { onLineSegmentWithThreshold } from './onLineSegmentWithThreshold';

export const onRectangleSide = (
    x: number,
    y: number,
    rectX1: number,
    rectY1: number,
    rectX2: number,
    rectY2: number,
    threshold: number
) => {
    const isNearTop = onLineSegmentWithThreshold(
        x,
        y,
        rectX1,
        rectY1,
        rectX2,
        rectY1,
        threshold
    );
    const isNearBottom = onLineSegmentWithThreshold(
        x,
        y,
        rectX1,
        rectY2,
        rectX2,
        rectY2,
        threshold
    );
    const isNearLeft = onLineSegmentWithThreshold(
        x,
        y,
        rectX1,
        rectY1,
        rectX1,
        rectY2,
        threshold
    );
    const isNearRight = onLineSegmentWithThreshold(
        x,
        y,
        rectX2,
        rectY1,
        rectX2,
        rectY2,
        threshold
    );

    return isNearTop || isNearBottom || isNearLeft || isNearRight;
};
