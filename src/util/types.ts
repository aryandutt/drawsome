import { Dispatch, SetStateAction } from "react";
import { Options } from "roughjs/bin/core";

export enum Tools {
  Pointer = "pointer",
  Pan = "pan",
  Line = "line",
  Rectangle = "rectangle",
  Ellipse = "ellipse",
  Circle = "circle",
  Pen = "pen",
  Eraser = "eraser",
}

export enum Keys {
  Z = "z",
  Y = "y",
}

export enum ShortCutKeys {
  L = "l",
  H = "h",
  A = "a",
  R = "r",
  C = "c",
  E = "e",
  P = "p",
  O = "o",
}

export enum Cursor {
  Crosshair = "crosshair",
  Default = "default",
  Move = "move",
  Grab = "grab",
  Grabbing = "grabbing",
}

export type InitialValueType<T> = T | ((prev?: T) => T);

export type ReturnValueType<T> = [
  T,
  (value: InitialValueType<T>) => void,
  (value: InitialValueType<T>) => void,
  () => void,
  () => void
];

export interface CoordinateInterface {
  x: number;
  y: number;
}

export interface TopBarProps {
  setTool: Dispatch<SetStateAction<Tools>>;
  setCursor: Dispatch<SetStateAction<Cursor>>;
  tool: Tools;
}

export interface GetShapeProps extends DrawingsElement {
  svgRef: React.MutableRefObject<SVGSVGElement | null>;
}

export interface DrawingsElement {
  startPoint: CoordinateInterface;
  endPoint: CoordinateInterface;
  pointPath?: CoordinateInterface[];
  shape: Tools;
}

export interface ShapeMethodTypes {
  line: (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    options?: Options | undefined
  ) => SVGGElement;
  rectangle: (
    x: number,
    y: number,
    width: number,
    height: number,
    options?: Options | undefined
  ) => SVGGElement;
  ellipse: (
    x: number,
    y: number,
    width: number,
    height: number,
    options?: Options | undefined
  ) => SVGGElement;
  circle: (
    x: number,
    y: number,
    diameter: number,
    options?: Options | undefined
  ) => SVGGElement;
  pen: (d: string, options?: Options) => SVGGElement;
}
