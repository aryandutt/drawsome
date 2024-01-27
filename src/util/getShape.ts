import rough from "roughjs";
import { GetShapeProps, ShapeMethodTypes } from "./types";
import getShapeParams from "./getShapeParams";

const getShape = ({ startPoint, endPoint, shape, svgRef }: GetShapeProps) => {

  if (!svgRef || !svgRef.current) return null; // returns if svgRef does not point to svg element

  const roughSvg = rough.svg(svgRef.current);

  //initialise a map which fetches the method corresponding to the shape
  const shapeMethods: ShapeMethodTypes = {
    line: roughSvg.line.bind(roughSvg),
    rectangle: roughSvg.rectangle.bind(roughSvg),
    ellipse: roughSvg.ellipse.bind(roughSvg),
    circle: roughSvg.circle.bind(roughSvg),
  };

  const shapeFunction = shapeMethods[shape as keyof ShapeMethodTypes]; // fetching the function corresponding to the shape

  const params = getShapeParams({ startPoint, endPoint, shape }); // a function that returns the right parameter given the set of start point, end point and the type of shape

  //@ts-ignore
  const drawnShape = shapeFunction(...params);

  return drawnShape; //returning the final shape which is drawn
};

export default getShape;