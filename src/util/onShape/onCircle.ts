export const onCircle = (
  x: number,
  y: number,
  centerX: number,
  centerY: number,
  radius: number
): boolean => {
  const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

  return Math.abs(distance - radius) <= 5;
};
