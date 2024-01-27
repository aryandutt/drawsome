import { useEffect, useRef, useState } from "react";
import { CoordinateInterface, DrawingsElement, Tools, ToolsType } from "./util/types";
import TopBar from "./components/TopBar";
import getShape from "./util/getShape";

function App() {
  const [tool, setTool] = useState<ToolsType>("line");
  const [drawings, setDrawings] = useState<DrawingsElement[]>([]);
  const [preview, setPreview] = useState<SVGElement | null>(null);
  const [viewBox, setViewBox] = useState({ x: 0, y: 0, w: window.innerWidth, h: window.innerHeight });

  const svgRef = useRef<SVGSVGElement | null>(null);

  const isDragging = useRef<boolean>(false);

  const [startPoint, setStartPoint] = useState<CoordinateInterface>({x: 0, y: 0});

  const [endPoint, setEndPoint] = useState<CoordinateInterface>({ x: 0, y: 0 });

  useEffect(() => {
    if (!svgRef.current) return;

    svgRef.current.innerHTML = "";

    drawings.forEach((child) => {
      const shape = getShape({startPoint: child.startPoint, endPoint: child.endPoint, shape: child.shape, svgRef})
      if(!shape) return;
      svgRef.current?.appendChild(shape);
    });

    if(!preview) return;

    svgRef.current?.appendChild(preview);
    
  }, [drawings, preview]);


  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    isDragging.current = true;
    setStartPoint({ x: e.clientX, y: e.clientY });
    setEndPoint({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!isDragging.current) return;

    if(tool === Tools.Pointer){
      const dx = e.clientX - startPoint.x;
      const dy = e.clientY - startPoint.y;
      setViewBox({
        x: viewBox.x - dx,
        y: viewBox.y - dy,
        w: viewBox.w,
        h: viewBox.h
      });
      setStartPoint({x: e.clientX, y: e.clientY});
      return;
    }

    setEndPoint({ x: e.clientX, y: e.clientY });

    const shape = getShape({
      startPoint: {x: startPoint.x + viewBox.x, y: startPoint.y+viewBox.y},
      endPoint: {x: endPoint.x+ viewBox.x, y: endPoint.y+viewBox.y},
      shape: tool,
      svgRef: svgRef,
    });

    if (!shape) return;

    setPreview(shape);

  };

  const handleMouseUp = () => {

    isDragging.current = false;

    const newShape = {
      startPoint: {x: startPoint.x + viewBox.x, y: startPoint.y+viewBox.y},
      endPoint: {x: endPoint.x+ viewBox.x, y: endPoint.y+viewBox.y},
      shape: tool,
      svgRef: svgRef,
    }

    setDrawings([...drawings, newShape]);

    setPreview(null);
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
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
      />
    </div>
  );
}

export default App;
