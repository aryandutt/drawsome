import Stroke from './sideBarComponents/Stroke'
import Background from './sideBarComponents/Background'
import Fill from './sideBarComponents/Fill'
import StrokeWidth from './sideBarComponents/StrokeWidth'
import Sloppiness from './sideBarComponents/Sloppiness'
import StrokeStyle from './sideBarComponents/StrokeStyle'

const SideBar = () => {
  return (
    <div className="absolute mx-4 mt-24 p-4 rounded-lg drop-shadow-[0px_0px_5px_rgba(0,0,0,0.15)] bg-white w-auto h-auto">
      <Stroke/>
      <Background/>
      <Fill/>
      <StrokeWidth/>
      <StrokeStyle/>
      <Sloppiness/>
    </div>
  )
}

export default SideBar