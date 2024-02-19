import { backgroundColors, transparentBackgroundUrl } from '../../util/config'

const Background = () => {
    return (
        <div className='mt-2'>
            <div className='text-xs mb-2'>Background</div>
            <div className='flex justify-center items-center'>
                {backgroundColors.map((color, index) => {
                    return (
                        <button
                            key={index}
                            className="w-6 h-6 rounded-md mx-1"
                            style={{
                                backgroundColor: color,
                                backgroundImage: color === 'transparent' ? `url(${transparentBackgroundUrl})` : 'none'
                            }}
                        />
                    );
                })}
                <div className="w-px h-7 mx-1 bg-gray-400 opacity-40"></div>
                <button className="w-7 h-7 rounded-md mx-1" style={{ backgroundColor: "teal" }} />
            </div>
        </div>
    )
}

export default Background