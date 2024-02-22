import { backgroundColors, transparentBackgroundUrl } from "../../util/config";
import { SideBarProps } from "../../util/types";
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from "../Popover";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

const Background: React.FC<SideBarProps> = ({ options, setOptions }) => {
  const [color, setColor] = useColor(options.fill);
  return (
    <div className="mt-4">
      <div className="text-xs mb-2 text-gray-700">Background</div>
      <div className="flex items-center">
        {backgroundColors.map((color, index) => {
          return (
            <button
              key={index}
              className="w-5 h-5 rounded-[4px] m-1"
              style={{
                backgroundColor: color,
                backgroundImage:
                  color === "transparent"
                    ? `url(${transparentBackgroundUrl})`
                    : "none",
              }}
              onClick={() => setOptions({ ...options, fill: color })}
            />
          );
        })}
        <div className="w-px h-7 mx-1 bg-gray-400 opacity-40" />
        <Popover>
          <PopoverTrigger className="flex justify-center">
            <button
              className="w-6 h-6 rounded-[4px] mx-1"
              style={{
                backgroundColor: options.fill as string,
                backgroundImage:
                  options.fill === "transparent"
                    ? `url(${transparentBackgroundUrl})`
                    : "none",
              }}
            />
          </PopoverTrigger>
          <PopoverContent align="start" alignOffset={-20} sideOffset={20} side="right">
            <ColorPicker hideInput={true} height={100}
              color={color}
              onChange={(color) => {
                setColor(color);
                setOptions({ ...options, fill: color.hex });
              }}
            />
          <PopoverArrow width={20} height={10} fill="white"/>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Background;
