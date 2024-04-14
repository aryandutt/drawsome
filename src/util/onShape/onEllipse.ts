export const onEllipse = (
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
