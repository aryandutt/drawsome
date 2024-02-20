import { FaSquare } from "react-icons/fa6";
import { SideBarProps } from "../../util/types";

const Fill: React.FC<SideBarProps> = ({ options, setOptions }) => {
  return (
    <div className="mt-4">
      <div className="text-xs mb-2 text-gray-700">Fill</div>
      <div className="flex align-center">
        <button
          className={`${
            options.fillStyle === "hachure" ? "bg-slate-200" : "bg-slate-100"
          } w-fit rounded-lg mx-1`}
          onClick={() => setOptions({ ...options, fillStyle: "hachure" })}
        >
            <img
            className="w-8 h-8 object-none scale-[.5] border-2 border-slate-900 rounded-lg"
            src="./hachet.png"
          />
        </button>
        <button
          className={`${
            options.fillStyle === "cross-hatch"
              ? "bg-slate-200"
              : "bg-slate-100"
          } w-fit rounded-lg mx-1`}
          onClick={() => setOptions({ ...options, fillStyle: "cross-hatch" })}
        >
          <img
            className="w-8 h-8 object-none scale-[.5] border-2 border-slate-900 rounded-lg"
            src="./cross-hatch.png"
          />
        </button>
        <button
          className={`${
            options.fillStyle === "solid" ? "bg-slate-200" : "bg-slate-100"
          } w-fit h-fit rounded-lg mx-1 p-2`}
          onClick={() => setOptions({ ...options, fillStyle: "solid" })}
        >
          <FaSquare />
        </button>
      </div>
    </div>
  );
};

export default Fill;
