import { useEffect, useRef, useState } from "react";
import { CoordinateInterface, tool } from "./util/types";
import TopBar from "./components/TopBar";
import getShape from "./util/getShape";

function App() {
  const [tool, setTool] = useState<tool>("line");
  const [drawings, setDrawings] = useState<SVGElement[]>([]);
  const [preview, setPreview] = useState<SVGElement | null>(null);

  const svgRef = useRef<SVGSVGElement | null>(null);

  const isDragging = useRef<boolean>(false);

  const [startPoint, setStartPoint] = useState<CoordinateInterface>({
    x: 0,
    y: 0,
  });
  const [endPoint, setEndPoint] = useState<CoordinateInterface>({ x: 0, y: 0 });

  const currEndPoint = useRef<CoordinateInterface>({ x: 0, y: 0 });

  useEffect(() => {
    if (!svgRef.current || !preview) return;

    svgRef.current.innerHTML = "";

    drawings.forEach((child) => {
      svgRef.current?.appendChild(child);
    });

    svgRef.current?.appendChild(preview);
  }, [drawings, preview]);

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    isDragging.current = true;
    setStartPoint({ x: e.clientX, y: e.clientY });
    setEndPoint({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!isDragging.current) return;

    setEndPoint({ x: e.clientX, y: e.clientY });

    currEndPoint.current = { x: e.clientX, y: e.clientY };

    const shape = getShape({
      startPoint: startPoint,
      endPoint: currEndPoint.current,
      shape: tool,
      svgRef: svgRef,
    });

    if (!shape) return;

    setPreview(shape);

  };

  const handleMouseUp = () => {

    const shape = getShape({
      startPoint: startPoint,
      endPoint: endPoint,
      shape: tool,
      svgRef: svgRef,
    });

    if (!shape) return;

    setDrawings([...drawings, shape]);

    isDragging.current = false;
  };

  return (
    <div className="relative">
      <TopBar tool={tool} setTool={setTool} />
      <svg
        ref={svgRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
}

export default App;
