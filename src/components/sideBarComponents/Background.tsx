import { backgroundColors, transparentBackgroundUrl } from "../../util/config";
import { SideBarProps } from "../../util/types";

const Background: React.FC<SideBarProps> = ({ options, setOptions }) => {
  return (
    <div className="mt-4">
      <div className="text-xs mb-2 text-gray-700">Background</div>
      <div className="flex justify-center items-center">
        {backgroundColors.map((color, index) => {
          return (
            <button
              key={index}
              className="w-6 h-6 rounded-md mx-1"
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
        <button
          className="w-7 h-7 rounded-md mx-1"
          style={{
            backgroundColor: options.fill as string,
            backgroundImage:
              options.fill === "transparent"
                ? `url(${transparentBackgroundUrl})`
                : "none",
          }}
        />
      </div>
    </div>
  );
};

export default Background;
