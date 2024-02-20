import { strokeColors } from "../../util/config";
import { SideBarProps } from "../../util/types";

const Stroke: React.FC<SideBarProps> = ({ options, setOptions }) => {
  return (
    <>
      <div className="text-xs mb-2 text-gray-700">Stroke</div>
      <div className="flex justify-center items-center">
        {strokeColors.map((color, index) => {
          return (
            <button
              key={index}
              className="w-6 h-6 rounded-md mx-1"
              style={{ backgroundColor: color }}
              onClick={() => setOptions({ ...options, stroke: color })}
            />
          );
        })}
        <div className="w-px h-7 mx-1 bg-gray-400 opacity-40" />
        <button
          className="w-7 h-7 rounded-md mx-1"
          style={{ backgroundColor: options.stroke as string }}
        />
      </div>
    </>
  );
};

export default Stroke;
