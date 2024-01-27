import React from 'react'
import { TopBarProps, tool } from '../util/types'

const TopBar: React.FC<TopBarProps> = ({tool, setTool}) => {

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setTool(e.target.value as tool);
    }

  return (
    <div onChange={onChange} className="bg-orange-600 absolute">
      <input type="radio" value="line" checked={tool === "line"} /> Line
      <input type="radio" value="rectangle" checked={tool === "rectangle"}/> Rectangle
      <input type="radio" value="ellipse" checked={tool === "ellipse"}/> Ellipse
      <input type="radio" value="circle" checked={tool === "circle"}/> Circle
      <input type="radio" value="pointer" checked={tool === "pointer"}/> Pointer
    </div>
  )
}

export default TopBar