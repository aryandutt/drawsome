import { Cursor, ShortCutKeys, Tools } from "./types";

export const shortCutMap = {
  [ShortCutKeys.L]: Tools.Line,
  [ShortCutKeys.H]: Tools.Pan,
  [ShortCutKeys.A]: Tools.Pointer,
  [ShortCutKeys.R]: Tools.Rectangle,
  [ShortCutKeys.C]: Tools.Circle,
  [ShortCutKeys.E]: Tools.Eraser,
  [ShortCutKeys.P]: Tools.Pen,
  [ShortCutKeys.O]: Tools.Ellipse,
};

export const cursorMap = {
  [ShortCutKeys.L]: Cursor.Crosshair,
  [ShortCutKeys.H]: Cursor.Grab,
  [ShortCutKeys.A]: Cursor.Default,
  [ShortCutKeys.R]: Cursor.Crosshair,
  [ShortCutKeys.C]: Cursor.Crosshair,
  [ShortCutKeys.E]: Cursor.Crosshair,
  [ShortCutKeys.P]: Cursor.Crosshair,
  [ShortCutKeys.O]: Cursor.Crosshair,
};

export const invertedShortCutMap: Record<Tools, ShortCutKeys> = {
  [Tools.Pointer]: ShortCutKeys.A,
  [Tools.Pan]: ShortCutKeys.H,
  [Tools.Line]: ShortCutKeys.L,
  [Tools.Rectangle]: ShortCutKeys.R,
  [Tools.Circle]: ShortCutKeys.C,
  [Tools.Eraser]: ShortCutKeys.E,
  [Tools.Pen]: ShortCutKeys.P,
  [Tools.Ellipse]: ShortCutKeys.O,
};
