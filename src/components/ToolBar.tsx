import React from 'react'
import { ToolBarProps } from '../util/types'

const ToolBar: React.FC<ToolBarProps> = ({tool, setTool}) => {

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setTool(e.target.value);
    }

  return (
    <div onChange={onChange} className="bg-orange-600 absolute">
      <input type="radio" value="line" checked={tool === "line"} /> Line
      <input type="radio" value="rectangle" checked={tool === "rectangle"}/> Rectangle
    </div>
  )
}

export default ToolBar