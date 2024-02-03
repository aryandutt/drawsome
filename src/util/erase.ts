import checkDrawing from "./checkDrawing";
import { DrawingsElement, InitialValueType } from "./types";

const erase = (
  x1: number,
  y1: number,
  drawings: DrawingsElement[],
  setDrawings: (value: InitialValueType<DrawingsElement[]>) => void
) => {
  const erasedDrawings = drawings.filter(
    (drawing) => !checkDrawing(drawing, x1, y1)
  );

  if (erasedDrawings.length !== drawings.length) setDrawings(erasedDrawings);
};

export default erase;
