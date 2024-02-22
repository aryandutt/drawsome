import { ColorPicker, useColor } from "react-color-palette";
import { strokeColors } from "../../util/config";
import { SideBarProps } from "../../util/types";
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from "../Popover";

const Stroke: React.FC<SideBarProps> = ({ options, setOptions }) => {
  const [color, setColor] = useColor(options.stroke);

  return (
    <>
      <div className="text-xs mb-2 text-gray-700">Stroke</div>
      <div className="flex items-center">
        {strokeColors.map((color, index) => {
          return (
            <button
              key={index}
              className="w-5 h-5 rounded-[4px] mx-1"
              style={{ backgroundColor: color }}
              onClick={() => setOptions({ ...options, stroke: color })}
            />
          );
        })}
        <div className="w-px h-7 mx-1 bg-gray-400 opacity-40" />
        <Popover>
          <PopoverTrigger className="flex justify-center">
            <button
              className="w-6 h-6 rounded-[4px] mx-1"
              style={{ backgroundColor: options.stroke }}
            />
          </PopoverTrigger>
          <PopoverContent align="start" alignOffset={-20} sideOffset={20} side="right">
            <ColorPicker hideInput={true} height={100}
              color={color}
              onChange={(color) => {
                setColor(color);
                setOptions({ ...options, stroke: color.hex });
              }}
            />
            <PopoverArrow width={20} height={10} fill="white"/>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default Stroke;
