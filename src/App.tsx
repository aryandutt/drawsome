import { useEffect, useRef, useState } from "react";
import {
  CoordinateInterface,
  Cursor,
  DrawingsElement,
  Keys,
  ShortCutKeys,
  Tools,
} from "./util/types";
import TopBar from "./components/TopBar";
import getShape from "./util/shape/getShape";
import useHistoryState from "./util/hooks/useHistory";
import SideBar from "./components/SideBar";
import erase from "./util/erase";
import { cursorMap, shortCutMap } from "./util/config";
import hoveredDrawing from "./util/hoveredDrawing";

function App() {
  const [tool, setTool] = useState<Tools>(Tools.Pointer);
  const [drawings, setDrawings, _setDrawings, undo, redo] = useHistoryState<
    // _setDrawings does not enable undo and redo
    DrawingsElement[]
  >([]);
  const [preview, setPreview] = useState<SVGElement | null>(null);
  const [viewBox, setViewBox] = useState({
    x: 0,
    y: 0,
    w: window.innerWidth,
    h: window.innerHeight,
  });
  const [penPath, setPenPath] = useState<CoordinateInterface[]>([]);
  const [cursor, setCursor] = useState<Cursor>(Cursor.Crosshair);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const isDragging = useRef<boolean>(false);

  const isDraggingShape = useRef<boolean>(false);

  const [ind, setInd] = useState<number>(-1);

  const [startPoint, setStartPoint] = useState<CoordinateInterface>({
    x: 0,
    y: 0,
  });

  const [endPoint, setEndPoint] = useState<CoordinateInterface>({ x: 0, y: 0 });

  useEffect(() => {
    const shortCut = (event: KeyboardEvent) => {
      setTool(
        shortCutMap[event.key as ShortCutKeys]
          ? shortCutMap[event.key as ShortCutKeys]
          : tool
      );
      setCursor(
        cursorMap[event.key as ShortCutKeys]
          ? cursorMap[event.key as ShortCutKeys]
          : cursor
      );
    };
    document.addEventListener("keydown", shortCut);
    return () => {
      document.removeEventListener("keydown", shortCut);
    };
  }, [tool, cursor]);

  useEffect(() => {
    if (!svgRef.current) return;

    svgRef.current.innerHTML = "";

    drawings.forEach((child) => {
      const shape = getShape({
        pointPath: child.pointPath,
        startPoint: child.startPoint,
        endPoint: child.endPoint,
        shape: child.shape,
        svgRef,
      });

      if (shape) {
        svgRef.current?.appendChild(shape);
      }

    });
  }, [drawings]);

  useEffect(() => {
    const undoRedoFunction = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        if (event.key === Keys.Z) {
          if (event.shiftKey) redo();
          else undo();
        } else if (event.key === Keys.Y) {
          redo();
        }
      }
    };

    document.addEventListener("keydown", undoRedoFunction);
    return () => {
      document.removeEventListener("keydown", undoRedoFunction);
    };
  }, [undo, redo]);

  useEffect(() => {
    if (!svgRef.current || !preview) return;

    const appendedPreview = svgRef.current.appendChild(preview);

    return () => {
      svgRef.current?.removeChild(appendedPreview);
    };
  }, [preview]);

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    isDragging.current = true;
    setStartPoint({ x: e.clientX, y: e.clientY });
    setEndPoint({ x: e.clientX, y: e.clientY });
    if (tool === Tools.Pen)
      setPenPath([{ x: e.clientX + viewBox.x, y: e.clientY + viewBox.y }]);
    if (tool === Tools.Pointer) isDraggingShape.current = true;
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (tool === Tools.Pointer && !isDraggingShape.current) {
      const drawingIndex = hoveredDrawing(
        drawings,
        e.clientX + viewBox.x,
        e.clientY + viewBox.y
      );
      setInd(drawingIndex);
      if (drawingIndex !== -1) setCursor(Cursor.Move);
      else setCursor(Cursor.Default);
    }

    if (!isDragging.current) return;

    if (tool === Tools.Pointer && ind !== -1) {
      const dx = e.clientX - startPoint.x;
      const dy = e.clientY - startPoint.y;
      _setDrawings((prevDrawings) => {
        const updatedDrawings = [...(prevDrawings || [])]; // Ensure prevDrawings is not undefined
        updatedDrawings[ind] = {
          startPoint: {
            x: (prevDrawings?.[ind]?.startPoint?.x || 0) + dx,
            y: (prevDrawings?.[ind]?.startPoint?.y || 0) + dy,
          },
          endPoint: {
            x: (prevDrawings?.[ind]?.endPoint?.x || 0) + dx,
            y: (prevDrawings?.[ind]?.endPoint?.y || 0) + dy,
          },
          shape: prevDrawings?.[ind]?.shape || Tools.Line,
          pointPath: prevDrawings?.[ind]?.pointPath?.map((point) => {
            return { x: point.x + dx, y: point.y + dy };
          }),
        };
        return updatedDrawings;
      });
      setStartPoint({ x: e.clientX, y: e.clientY });
    }

    if (tool === Tools.Pan) {
      setCursor(Cursor.Grabbing);
      const dx = e.clientX - startPoint.x;
      const dy = e.clientY - startPoint.y;
      setViewBox({
        x: viewBox.x - dx,
        y: viewBox.y - dy,
        w: viewBox.w,
        h: viewBox.h,
      });
      setStartPoint({ x: e.clientX, y: e.clientY });
      return;
    } else if (tool === Tools.Eraser) {
      erase(
        e.clientX + viewBox.x,
        e.clientY + viewBox.y,
        drawings,
        setDrawings
      );
      return;
    } else if (tool === Tools.Pen) {
      setPenPath([
        ...penPath,
        { x: e.clientX + viewBox.x, y: e.clientY + viewBox.y },
      ]);
    }

    setEndPoint({ x: e.clientX, y: e.clientY });

    const shape = getShape({
      startPoint: { x: startPoint.x + viewBox.x, y: startPoint.y + viewBox.y },
      endPoint: { x: endPoint.x + viewBox.x, y: endPoint.y + viewBox.y },
      shape: tool,
      pointPath: [
        ...penPath,
        { x: e.clientX + viewBox.x, y: e.clientY + viewBox.y },
      ],
      svgRef: svgRef,
    });

    if (!shape) return;

    setPreview(shape);
  };

  const handleMouseUp = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    isDragging.current = false;

    if (tool === Tools.Eraser) return;

    else if (tool === Tools.Pan) setCursor(Cursor.Grab);

    else if (tool === Tools.Pointer) isDraggingShape.current = false;

    else if (tool === Tools.Pen) {
      setPenPath([
        ...penPath,
        { x: e.clientX + viewBox.x, y: e.clientY + viewBox.y },
      ]);
    }

    const newShape = {
      startPoint: { x: startPoint.x + viewBox.x, y: startPoint.y + viewBox.y },
      endPoint: { x: endPoint.x + viewBox.x, y: endPoint.y + viewBox.y },
      pointPath: [
        ...penPath,
        { x: e.clientX + viewBox.x, y: e.clientY + viewBox.y },
      ],
      shape: tool,
      svgRef: svgRef,
    };

    setDrawings([...drawings, newShape]);

    setPreview(null);
  };

  return (
    <div className="relative">
        <SideBar />
      <div className="flex flex-col items-center">
        <TopBar tool={tool} setTool={setTool} setCursor={setCursor} />
        <svg
          style={{ cursor: cursor }}
          ref={svgRef}
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
        />
      </div>
    </div>

  );
}

export default App;
