const average = (a: number, b: number): number => (a + b) / 2;

export const getSvgPathFromStroke = (stroke: [number, number][]) => {
  const len = stroke.length;

  if (!len) {
    return "";
  }

  const first = stroke[0];
  let result = `M${first[0].toFixed(3)},${first[1].toFixed(3)}Q`;

  for (let i = 0, max = len - 1; i < max; i++) {
    const a = stroke[i];
    const b = stroke[i + 1];
    result += `${a[0].toFixed(3)},${a[1].toFixed(3)} ${average(
      a[0],
      b[0]
    ).toFixed(3)},${average(a[1], b[1]).toFixed(3)} `;
  }

  result += "Z";

  return result;
};
