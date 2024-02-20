import { strokeColors } from '../../util/config'

const Stroke = () => {
    return (
        <>
            <div className='text-xs mb-2 text-gray-700'>Stroke</div>
            <div className='flex justify-center items-center'>
                {strokeColors.map((color, index) => {
                    return <button key={index} className="w-6 h-6 rounded-md mx-1" style={{ backgroundColor: color }} />
                })}
                <div className="w-px h-7 mx-1 bg-gray-400 opacity-40"></div>
                <button className="w-7 h-7 rounded-md mx-1" style={{ backgroundColor: "teal" }} />
            </div>
        </>
    )
}

export default Stroke