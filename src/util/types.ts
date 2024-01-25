import{ Dispatch, SetStateAction } from 'react'
import { Options } from 'roughjs/bin/core';

export enum shapes {
    Line = "line",
    Rectangle = "rectangle",
    Ellipse = "ellipse",
    Circle = "circle",
}

export type tool = `${shapes}` | 'pointer' | 'select';

export interface CoordinateInterface {
    x: number;
    y: number;
}

export interface TopBarProps {
    setTool: Dispatch<SetStateAction<tool>>;
    tool: string;
}

export interface GetShapeProps {
    startPoint: CoordinateInterface;
    endPoint: CoordinateInterface;
    shape: string;
    svgRef: React.MutableRefObject<SVGSVGElement | null>;
}

export interface ShapeMethodTypes {
    line: (x1: number, y1: number, x2: number, y2: number, options?: Options | undefined) => SVGGElement;
    rectangle: (x: number, y: number, width: number, height: number, options?: Options | undefined) => SVGGElement;
    ellipse: (x: number, y: number, width: number, height: number, options?: Options | undefined) => SVGGElement;
    circle: (x: number, y: number, diameter: number, options?: Options | undefined) => SVGGElement;
}

export interface GetShapeParamsType {
    startPoint: CoordinateInterface; endPoint: CoordinateInterface;
    shape: string;
}