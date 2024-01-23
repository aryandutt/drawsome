import rough from "roughjs";
import { useEffect, useRef, useState } from "react";
import { CoordinateInterface } from "./util/types";

function App() {
  const [drawings, setDrawings] = useState<SVGElement[]>([]);

  const svgRef = useRef<SVGSVGElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const [startPoint, setStartPoint] = useState<CoordinateInterface>({ x: -1, y: -1 });
  const [endPoint, setEndPoint] = useState<CoordinateInterface>({ x: 0, y: 0 });

  const currEndPoint = useRef<CoordinateInterface>({x: 0, y: 0});

  useEffect(() => {
    if (!svgRef.current) return;

    drawings.forEach((child) => {
      svgRef.current?.appendChild(child);
    });

  }, [drawings]);

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    setIsDragging(true);
    setStartPoint({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if(!isDragging) return;

    setEndPoint({ x: e.clientX, y: e.clientY });

    currEndPoint.current = {x: e.clientX, y: e.clientY};

    const svgElement = svgRef.current;

    if (!svgElement) return;

    const roughSvg = rough.svg(svgElement);

    const line = roughSvg.line(
      startPoint.x,
      startPoint.y,
      currEndPoint.current.x,
      currEndPoint.current.y
    );

    const newDrawing = drawings;

    newDrawing.pop()

    setDrawings([...newDrawing, line]);

  };

  const handleMouseUp = () => {

    const svgElement = svgRef.current;

    if (!svgElement) return;

    const roughSvg = rough.svg(svgElement);

    const line = roughSvg.line(
      startPoint.x,
      startPoint.y,
      endPoint.x,
      endPoint.y
    );

    setDrawings([...drawings, line]);
    
    setIsDragging(false);
  };

  return (
    <>
      <svg
        ref={svgRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </>
  );
}

export default App;
