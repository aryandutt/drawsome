import React from 'react';
import { SideBarProps } from '../../util/types';

const Sloppiness: React.FC<SideBarProps> = ({ options, setOptions }) => {
    return (
        <div className="mt-4">
            <div className="text-xs mb-2 text-gray-700">Sloppiness</div>
            <div className="flex align-center">
                <button
                    className={`${
                        options.roughness === 0
                            ? 'bg-slate-200'
                            : 'bg-slate-100'
                    } w-fit h-fit rounded-lg mx-1 p-1`}
                    onClick={() => setOptions({ ...options, roughness: 0 })}
                >
                    <svg
                        viewBox="0 0 20 20"
                        role="img"
                        aria-hidden="true"
                        width="24"
                        height="24"
                    >
                        <path
                            d="M2.5 12.038c1.655-.885 5.9-3.292 8.568-4.354 2.668-1.063.101 2.821 1.32 3.104 1.218.283 5.112-1.814 5.112-1.814"
                            strokeWidth="1.25"
                            stroke="currentColor"
                            fill="none"
                        />
                    </svg>
                </button>
                <button
                    className={`${
                        options.roughness === 1
                            ? 'bg-slate-200'
                            : 'bg-slate-100'
                    } w-fit h-fit rounded-lg mx-1 p-1`}
                    onClick={() => setOptions({ ...options, roughness: 1 })}
                >
                    <svg
                        viewBox="0 0 20 20"
                        role="img"
                        aria-hidden="true"
                        width="24"
                        height="24"
                    >
                        <path
                            d="M2.5 12.563c1.655-.886 5.9-3.293 8.568-4.355 2.668-1.062.101 2.822 1.32 3.105 1.218.283 5.112-1.814 5.112-1.814m-13.469 2.23c2.963-1.586 6.13-5.62 7.468-4.998 1.338.623-1.153 4.11-.132 5.595 1.02 1.487 6.133-1.43 6.133-1.43"
                            strokeWidth="1.25"
                            stroke="currentColor"
                            fill="none"
                        />
                    </svg>
                </button>
                <button
                    className={`${
                        options.roughness === 2
                            ? 'bg-slate-200'
                            : 'bg-slate-100'
                    } w-fit h-fit rounded-lg mx-1 p-1`}
                    onClick={() => setOptions({ ...options, roughness: 2 })}
                >
                    <svg
                        viewBox="0 0 20 20"
                        role="img"
                        aria-hidden="true"
                        width="24"
                        height="24"
                    >
                        <path
                            d="M2.5 11.936c1.737-.879 8.627-5.346 10.42-5.268 1.795.078-.418 5.138.345 5.736.763.598 3.53-1.789 4.235-2.147M2.929 9.788c1.164-.519 5.47-3.28 6.987-3.114 1.519.165 1 3.827 2.121 4.109 1.122.281 3.839-2.016 4.606-2.42"
                            strokeWidth="1.25"
                            stroke="currentColor"
                            fill="none"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Sloppiness;
