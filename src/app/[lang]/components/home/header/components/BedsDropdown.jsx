"use client"
import React, { useCallback, useMemo, useState } from 'react'

function BedsDropdown({ lang, selectedBathrooms, selectedBedrooms, handleBedroomClick, handleBathroomClick, resetSelections }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    const bedroomOptions = useMemo(() => [1, 2, 3, 4, 5, '6+'], []);
    const bathroomOptions = useMemo(() => [1, 2, 3, 4, 5, '6+'], []);

    return (
        <>
            <div onClick={() => setIsOpen(false)} className={`absolute top-0 right-0 bottom-0 left-0 z-10 ${isOpen ? "block" : "hidden"}`}>

            </div>
            <div className="hidden md:block md:w-full h-full relative mt-2">
                <button
                    type="button"
                    className="inline-flex justify-between w-full h-[40px] items-center rounded-md border border-gray-300 shadow-sm px-3 md:px-3 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                    onClick={toggleDropdown}
                >
                    {selectedBedrooms} {lang === "en" ? "All Beds" : "عدد الغرف"}  & {selectedBathrooms} {lang === "en" ? "All Baths" : "حمامات"}
                    <svg
                        className="-me-1 ms-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>

                {isOpen && (
                    <div
                        className="origin-top-right absolute z-30 left-0 right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        tabIndex="-1"
                    >
                        <div className="py-1" role="none">
                            <div className="px-3 py-2">
                                <div className="text-sm font-medium text-gray-700">Bedrooms</div>
                                <div className="grid grid-cols-6 gap-2 mt-2">
                                    {bedroomOptions.map((bedroom, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleBedroomClick(bedroom)}
                                            className={`py-1 px-1 text-sm border border-gray-300 rounded text-gray-700  ${selectedBedrooms == bedroom ? 'bg-blue-500 text-white' : ''
                                                }`}
                                        >
                                            {bedroom}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="px-3 py-2 mt-4">
                                <div className="text-sm font-medium text-gray-700">Bathrooms</div>
                                <div className="grid grid-cols-6 gap-2 mt-2">
                                    {bathroomOptions.map((bathroom, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleBathroomClick(bathroom)}
                                            className={`py-1 px-1 text-sm border border-gray-300 rounded text-gray-700  ${selectedBathrooms == bathroom ? 'bg-blue-500 text-white' : ''
                                                }`}
                                        >
                                            {bathroom}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="px-4 py-2 mt-4 text-blue-500 cursor-pointer" onClick={resetSelections}>
                                Reset
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default React.memo(BedsDropdown) 
