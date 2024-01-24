import{ Dispatch, SetStateAction } from 'react'

export interface CoordinateInterface {
    x: number;
    y: number;
}

export interface ToolBarProps {
    setTool: Dispatch<SetStateAction<string>>;
    tool: string;
}

export interface GetShapeProps {
    startPoint: CoordinateInterface;
    endPoint: CoordinateInterface;
    shape: string;
    svgRef: React.MutableRefObject<SVGSVGElement | null>;
}