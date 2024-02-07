import React from "react";
import { TopBarProps, Tools, Cursor } from "../util/types";
import { LuMousePointer, LuPencil } from "react-icons/lu";
import { FiSquare } from "react-icons/fi";
import { PiMinusBold } from "react-icons/pi";
import { FaRegCircle } from "react-icons/fa";
import { LuEraser } from "react-icons/lu";
import { FaRegHandPaper } from "react-icons/fa";
import { PiNumberZeroBold } from "react-icons/pi";

const iconMap = {
  [Tools.Pointer]: <LuMousePointer />,
  [Tools.Rectangle]: <FiSquare />,
  [Tools.Line]: <PiMinusBold />,
  [Tools.Pen]: <LuPencil />,
  [Tools.Circle]: <FaRegCircle />,
  [Tools.Eraser]: <LuEraser />,
  [Tools.Pan]: <FaRegHandPaper />,
  [Tools.Ellipse]: <PiNumberZeroBold className="rotate-90"/>,
};

const TopBar: React.FC<TopBarProps> = ({ tool, setTool, setCursor }) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCursor(Cursor.Crosshair);
    if (e.target.value === Tools.Pointer) setCursor(Cursor.Default);
    if (e.target.value === Tools.Pan) setCursor(Cursor.Grab);
    setTool(e.target.value as Tools);
  };

  return (
    <div
      onChange={onChange}
      className="flex rounded-lg drop-shadow-[0px_0px_8px_rgba(0,0,0,0.15)] bg-white absolute mt-6 px-1 cursor-default"
    >
      {Object.values(Tools).map((t) => (
        <div
          className={`my-1 mx-1 p-3 rounded-lg ${
            tool === t ? "bg-violet-200" : "hover:bg-violet-100"
          }`}
          key={t}
          onClick={() => setTool(t)}
        >
          <input
            type="radio"
            id={t}
            checked={tool === t}
            onChange={() => setTool(t)}
            readOnly
            hidden
          />
          <label htmlFor={t} />
          {iconMap[t]}
        </div>
      ))}
    </div>
  );
};

export default TopBar;
