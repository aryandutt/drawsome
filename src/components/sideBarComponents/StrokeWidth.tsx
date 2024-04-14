import { PiMinusThin, PiMinus, PiMinusBold } from 'react-icons/pi';
import { SideBarProps } from '../../util/types';

const StrokeWidth: React.FC<SideBarProps> = ({ options, setOptions }) => {
    return (
        <div className="mt-4">
            <div className="text-xs mb-2 text-gray-700">Stroke Width</div>
            <div className="flex align-center">
                <button
                    className={`${
                        options.strokeWidth === 1
                            ? 'bg-slate-200'
                            : 'bg-slate-100'
                    } w-fit h-fit rounded-lg mx-1 p-1`}
                    onClick={() => setOptions({ ...options, strokeWidth: 1 })}
                >
                    <PiMinusThin size={'1.5em'} />
                </button>
                <button
                    className={`${
                        options.strokeWidth === 2
                            ? 'bg-slate-200'
                            : 'bg-slate-100'
                    } w-fit h-fit rounded-lg mx-1 p-1`}
                    onClick={() => setOptions({ ...options, strokeWidth: 2 })}
                >
                    <PiMinus size={'1.5em'} />
                </button>
                <button
                    className={`${
                        options.strokeWidth === 3
                            ? 'bg-slate-200'
                            : 'bg-slate-100'
                    } w-fit h-fit rounded-lg mx-1 p-1`}
                    onClick={() => setOptions({ ...options, strokeWidth: 3 })}
                >
                    <PiMinusBold size={'1.5em'} />
                </button>
            </div>
        </div>
    );
};

export default StrokeWidth;
