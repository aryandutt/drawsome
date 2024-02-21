import Stroke from "./sideBarComponents/Stroke";
import Background from "./sideBarComponents/Background";
import Fill from "./sideBarComponents/Fill";
import StrokeWidth from "./sideBarComponents/StrokeWidth";
import Sloppiness from "./sideBarComponents/Sloppiness";
import { SideBarProps, Tools } from "../util/types";
import { Show } from "./Show";

const SideBar: React.FC<SideBarProps> = ({ options, setOptions, tool }) => {
  return (
    <div className="absolute mx-4 mt-24 px-2 py-3 rounded-lg drop-shadow-[0px_0px_5px_rgba(0,0,0,0.15)] bg-white w-auto h-auto">
      <Stroke options={options} setOptions={setOptions} />
      <Show>
        <Show.When isTrue={tool !== Tools.Pen && tool !== Tools.Line}>
          <Background options={options} setOptions={setOptions} />
        </Show.When>
      </Show>
      <Show>
        <Show.When
          isTrue={
            options.fill !== "transparent" &&
            tool !== Tools.Pen &&
            tool !== Tools.Line
          }
        >
          <Fill options={options} setOptions={setOptions} />
        </Show.When>
      </Show>
      <StrokeWidth options={options} setOptions={setOptions} />
      <Show>
        <Show.When isTrue={tool !== Tools.Pen}>
          <Sloppiness options={options} setOptions={setOptions} />
        </Show.When>
      </Show>
    </div>
  );
};

export default SideBar;
