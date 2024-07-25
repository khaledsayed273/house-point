"use client"
import React, { useCallback, useMemo, useState } from 'react'

function PriceComponent({lang, minPrice, maxPrice, handleMinPriceSelect, handleMaxPriceSelect, resetPrices }) {

    const [isOpen, setIsOpen] = useState(false);
    const [showMinOptions, setShowMinOptions] = useState(false);
    const [showMaxOptions, setShowMaxOptions] = useState(false);
    const toggleDropdown = useCallback(() => {
        setIsOpen(!isOpen);
        setShowMaxOptions(false);
        setShowMinOptions(false);
    }, [isOpen]);

    const priceOptions = useMemo(() => [
        '10000', '20000', '30000', '40000', '50000',
        '60000', '70000', '90000', '100000', '120000',
        '140000', '170000', '200000', '250000', '300000',
        '400000', '500000'
    ], []);
    
    return (
        <>
            <div onClick={() => setIsOpen(false)} className={`absolute top-0 right-0 bottom-0 left-0 z-10 ${isOpen ? "block" : "hidden"}`}>

            </div>
            <div className="hidden md:block md:w-full h-full relative select-none mt-2">
                <button
                    type="button"
                    onClick={toggleDropdown}
                    className="inline-flex justify-between w-full h-[40px] items-center rounded-md border border-gray-300 shadow-sm px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                >
                {minPrice || maxPrice ? (`[${minPrice}${minPrice && maxPrice && "-"}${maxPrice}] EGP`) : (lang === "en" ? "All Prices" : "كل الاسعار")}
                    
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
                        className="origin-top-right absolute left-1/2 -translate-x-1/2 mt-2 w-80 z-30 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                    >
                        <div className="py-1" role="none">
                            <div className="px-4 py-3">
                                <span className="block text-sm font-medium text-gray-700">Prices</span>
                            </div>
                            <div className="flex justify-between px-4 py-2 space-x-2">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Min. Price EGP"
                                        value={minPrice}
                                        onClick={() => {
                                            setShowMinOptions(!showMinOptions)
                                            setShowMaxOptions(false)
                                        }}
                                        readOnly
                                        className="w-full border border-gray-300 rounded-md px-2 py-1 cursor-pointer"
                                    />
                                    {showMinOptions && (
                                        <ul className="absolute z-10 text-sm max-h-96 overflow-auto mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                                            {priceOptions.map((price, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => {
                                                        handleMinPriceSelect(price)
                                                        setShowMinOptions(false);
                                                    }}
                                                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                                >
                                                    {price}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Max. Price EGP"
                                        value={maxPrice}
                                        onClick={() => {
                                            setShowMaxOptions(!showMaxOptions)
                                            setShowMinOptions(false)
                                        }}
                                        readOnly
                                        className="w-full border border-gray-300 rounded-md px-2 py-1 cursor-pointer"
                                    />
                                    {showMaxOptions && (
                                        <ul className="absolute max-h-96 overflow-auto z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                                            {priceOptions.map((price, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => {
                                                        handleMaxPriceSelect(price)
                                                        setShowMaxOptions(false);

                                                    }}
                                                    className="px-4 text-sm py-2 cursor-pointer hover:bg-gray-200"
                                                >
                                                    {price}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                            <div className="px-4 py-2">
                                <button
                                    type="button"
                                    onClick={resetPrices}
                                    className="w-full text-blue-600 text-sm hover:underline"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default React.memo(PriceComponent) 
