import { RxBorderDotted } from "react-icons/rx";
import { TfiLineDashed } from "react-icons/tfi";
import { PiMinusThin } from "react-icons/pi";
import React from "react";


const StrokeStyle: React.FC = () => {
  return (
    <div className='mt-4'>
            <div className='text-xs mb-2 text-gray-700'>Stroke Style</div>
            <div className='flex align-center'>
                <button className='bg-slate-200 w-fit h-fit rounded-lg mx-1 p-1'>
                    <PiMinusThin size={'1.5em'}/>
                </button>
                <button className='bg-slate-200 w-fit h-fit rounded-lg mx-1 p-1'>
                    <RxBorderDotted size={'1.5em'}/>
                </button>
                <button className='bg-slate-200 w-fit h-fit rounded-lg mx-1 p-1'>
                    <TfiLineDashed size={'1.5em'}/>
                </button>
            </div>
        </div>
  )
}

export default StrokeStyle