export const onLineSegmentWithThreshold = (
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
