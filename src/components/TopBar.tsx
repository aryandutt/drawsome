import React from 'react'
import { TopBarProps, ToolsType } from '../util/types'

const TopBar: React.FC<TopBarProps> = ({tool, setTool}) => {

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setTool(e.target.value as ToolsType);
    }

  return (
    <div onChange={onChange} className="bg-orange-600 absolute mt-6 p-4">
      <input type="radio" value="pointer" checked={tool === "pointer"}/> Pointer
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