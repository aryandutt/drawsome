import { Cursor, ShortCutKeys, Tools } from "./types";

export const strokeColors = ["#1e1e1e", "#e03131", "#2f9e44", "#1971c2", "#f08c00"];

export const backgroundColors = ["transparent", "#ffc9c9", "#b2f2bb", "#a5d8ff", "#ffec99"];

export const transparentBackgroundUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==";

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
