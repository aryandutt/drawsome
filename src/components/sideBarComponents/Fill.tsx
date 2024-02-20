import { FaSquare } from "react-icons/fa6";

const Fill = () => {
    return (
        <div className='mt-4'>
            <div className='text-xs mb-2 text-gray-700'>Fill</div>
            <div className='flex align-center'>
                <button className='bg-slate-200 w-fit rounded-lg mx-1'>
                    <img className='w-8 h-8 object-none scale-[.5] border-2 border-slate-900 rounded-lg' src="../../../public/hachet.png" />
                </button>
                <button className='bg-slate-200 w-fit rounded-lg mx-1'>
                    <img className='w-8 h-8 object-none scale-[.5] border-2 border-slate-900 rounded-lg' src="../../../public/cross-hatch.png" />
                </button>
                <button className='bg-slate-200 w-fit h-fit rounded-lg mx-1 p-2'>
                    <FaSquare />
                </button>
            </div>
        </div>
    )
}

export default Fill