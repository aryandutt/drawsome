import React from 'react'
import { PiMinusThin, PiMinus, PiMinusBold } from "react-icons/pi";

const StrokeWidth = () => {
    return (
        <div className='mt-2'>
            <div className='text-xs mb-2'>Stroke Width</div>
            <div className='flex align-center'>
                <button className='bg-slate-200 w-fit h-fit rounded-lg mx-1 p-1'>
                    <PiMinusThin size={'1.5em'}/>
                </button>
                <button className='bg-slate-200 w-fit h-fit rounded-lg mx-1 p-1'>
                    <PiMinus size={'1.5em'}/>
                </button>
                <button className='bg-slate-200 w-fit h-fit rounded-lg mx-1 p-1'>
                    <PiMinusBold size={'1.5em'}/>
                </button>
            </div>
        </div>
    )
}

export default StrokeWidth