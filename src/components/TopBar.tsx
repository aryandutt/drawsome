import React from 'react'
import { TopBarProps, Tools, Cursor } from '../util/types'

const TopBar: React.FC<TopBarProps> = ({tool, setTool, setCursor}) => {

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setCursor(Cursor.Crosshair);
        if(e.target.value === Tools.Pointer) setCursor(Cursor.Default);
        if(e.target.value === Tools.Pan) setCursor(Cursor.Grab);
        setTool(e.target.value as Tools);
    }

  return (
    <div onChange={onChange} className="bg-orange-600 absolute mt-6 p-4 cursor-default">
      <input type="radio" value="pointer" checked={tool === "pointer"}/> Pointer
      <input type="radio" value="pan" checked={tool === "pan"}/> Pan
      <input type="radio" value="line" checked={tool === "line"} /> Line
      <input type="radio" value="rectangle" checked={tool === "rectangle"}/> Rectangle
      <input type="radio" value="ellipse" checked={tool === "ellipse"}/> Ellipse
      <input type="radio" value="circle" checked={tool === "circle"}/> Circle
      <input type="radio" value="pen" checked={tool === "pen"}/> Pen
      <input type="radio" value="eraser" checked={tool === "eraser"}/> Eraser
    </div>
  )
}

export default TopBar