import rough from "roughjs";
import { GetShapeProps } from "./types";

const getShape = ({startPoint, endPoint, shape, svgRef}: GetShapeProps) => {

    if(!svgRef || !svgRef.current) return null;

    if(shape === 'line'){
        
        const roughSvg = rough.svg(svgRef.current);
        const line = roughSvg.line(
        startPoint.x,
        startPoint.y,
        endPoint.x,
        endPoint.y
        );

        return line;
    }
    if(shape === 'rectangle'){

        const roughSvg = rough.svg(svgRef.current);

        const rectangle = roughSvg.rectangle(
        startPoint.x,
        startPoint.y,
        endPoint.x - startPoint.x,
        endPoint.y - startPoint.y
        );

        return rectangle;

    }

}

export default getShape;