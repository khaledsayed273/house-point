"use client"
import dynamic from 'next/dynamic';
import React, { useCallback, useMemo, useState } from 'react'
const Dialog = dynamic(() => import('@material-tailwind/react').then(mod => mod.Dialog), {
    ssr: false,
});

const DialogHeader = dynamic(() => import('@material-tailwind/react').then(mod => mod.DialogHeader), {
    ssr: false,
});

const DialogBody = dynamic(() => import('@material-tailwind/react').then(mod => mod.DialogBody), {
    ssr: false,
});
function DialogSearchBar({
    type,
    setType,
    translate,
    category,
    categories,
    handleSetCategory,
    selectedBedrooms,
    handleBedroomClick,
    selectedBathrooms,
    handleBathroomClick,
    resetSelections,
    minPrice,
    maxPrice,
    handleMinPriceSelect,
    handleMaxPriceSelect,
    resetPrices,
    furnitures,
    furnishe,
    handleSetFurnishe,
    minPropertyArea,
    maxPropertyArea,
    handleSetMinPropertyArea,
    handleSetMaxPropertyArea,
    handleSearch
}) {

    
    const [show, setSize] = useState(false);

    const handleShowPopUp = useCallback(() => {
        setSize(prevShow => !prevShow);
    }, []);
    const reset = useCallback(() => {
        resetPrices();
        resetSelections();
        handleSetMinPropertyArea("");
        handleSetMaxPropertyArea("");
        handleSetFurnishe("");
    }, [resetPrices, resetSelections, handleSetMinPropertyArea, handleSetMaxPropertyArea, handleSetFurnishe]);

    
    const bedroomOptions = useMemo(() => [1, 2, 3, 4, 5, '6+'], []);
    const bathroomOptions = useMemo(() => [1, 2, 3, 4, 5, '6+'], []);


  


   

    return (
        <div className='md:hidden'>
            <button onClick={handleShowPopUp} className='active:scale-95 mt-6 ms-auto block md:hidden w-full md:w-auto rounded-lg border bg-custom-blue-darker px-8 py-2 font-medium text-white outline-none focus:ring hover:opacity-90 sticky z-10'>More Filter</button>
            <Dialog
            className='md:hidden'
                open={show}
                size={"xxl"}
                handler={handleShowPopUp}
            >
                <DialogHeader>
                    <h3 className=' flex-1 text-sm md:text-base'>More Filter</h3>
                    <button
                        onClick={() => handleShowPopUp(null)}
                        className="ms-auto"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10 text-custom-blue">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </DialogHeader>
                <DialogBody className='h-full overflow-auto'>
                    <div className='flex justify-between'>
                        <button className={`me-2 border ${type.toLowerCase() === "rent" ? "bg-custom-blue-darker text-white" : "text-custom-blue-dark bg-white"} w-full py-2 px-6 hover:opacity-90 rounded-md`} onClick={() => setType("rent")}>{translate.general.components.searchbar.rent}</button>
                        <button className={`me-2 border ${type.toLowerCase() === "sale" ? "bg-custom-blue-darker text-white" : "text-custom-blue-dark bg-white"} w-full  py-2 px-6 hover:opacity-90 rounded-md`} onClick={() => setType("sale")}>{translate.general.components.searchbar.sale}</button>
                    </div>
                    <div className='my-4'>
                        <h3 className='text-black text-sm font-semibold'>All Property Types</h3>
                        <div className='flex overflow-auto py-4'>
                            {categories?.map((cat, index) => (
                                <button onClick={() => handleSetCategory(cat.slug)} className={` text-nowrap py-1.5 px-4 rounded-md me-1.5 border-custom-blue-dark border text-sm ${category === cat.slug ? "bg-custom-blue-dark text-white" : "bg-[#cccccc] text-black"} `} key={index}>{cat.name}</button>
                            ))}
                        </div>
                    </div>
                    <div className='my-4'>
                        <h3 className='text-black text-sm font-semibold capitalize'>bedrooms</h3>
                        <div className='flex overflow-auto py-2'>
                            {bedroomOptions?.map((bed, index) => (
                                <button onClick={() => handleBedroomClick(bed)} className={` text-nowrap py-1.5 px-3 rounded-md me-1.5 border-custom-blue-dark border text-sm ${selectedBedrooms == bed ? "bg-custom-blue-dark text-white" : "bg-[#cccccc] text-black"} `} key={index}>{bed}</button>
                            ))}
                        </div>
                    </div>
                    <div className='mb-4'>
                        <h3 className='text-black text-sm font-semibold capitalize'>bathRooms</h3>
                        <div className='flex overflow-auto py-2'>
                            {bathroomOptions?.map((bath, index) => (
                                <button onClick={() => handleBathroomClick(bath)} className={` text-nowrap py-1.5 px-3 rounded-md me-1.5 border-custom-blue-dark border text-sm ${selectedBathrooms == bath ? "bg-custom-blue-dark text-white" : "bg-[#cccccc] text-black"} `} key={index}>{bath}</button>
                            ))}
                        </div>
                    </div>
                    <div className='mb-4'>
                        <h3 className='text-black text-sm font-semibold capitalize'>prices</h3>
                        <div className='flex py-3'>
                            <input onChange={(e) => handleMinPriceSelect(e.target.value)} value={minPrice} placeholder='Min.Price EGP' className='py-1.5 px-2 border w-full me-2 rounded-md border-gray-600' type="number" name="" id="" />
                            <input onChange={(e) => handleMaxPriceSelect(e.target.value)} value={maxPrice} placeholder='Max.Price EGP' className='py-1.5 px-2 border w-full rounded-md border-gray-600' type="number" name="" id="" />
                        </div>
                    </div>
                    <div className='my-4'>
                        <h3 className='text-black text-sm font-semibold capitalize'>finishing</h3>
                        <div className='flex overflow-auto py-4'>
                            {furnitures?.map((finish, index) => (
                                <button onClick={() => handleSetFurnishe(finish.slug)} className={` text-nowrap py-1.5 px-4 rounded-md me-1.5 border-custom-blue-dark border text-sm ${furnishe === finish.slug ? "bg-custom-blue-dark text-white" : "bg-[#cccccc] text-black"} `} key={index}>{finish.name}</button>
                            ))}
                        </div>
                    </div>
                    <div className='mb-4'>
                        <h3 className='text-black text-sm font-semibold capitalize'>property area</h3>
                        <div className='flex py-3'>
                            <input onChange={(e) => handleSetMinPropertyArea(e.target.value)} value={minPropertyArea} placeholder='Min.Area (sqm)' className='py-1.5 px-2 border w-full me-2 rounded-md border-gray-600' type="number" name="" id="" />
                            <input onChange={(e) => handleSetMaxPropertyArea(e.target.value)} value={maxPropertyArea} placeholder='Max.Area (sqm)' className='py-1.5 px-2 border w-full rounded-md border-gray-600' type="number" name="" id="" />
                        </div>
                    </div>
                    <div className='mt-3'>
                        <div className='flex py-4'>
                            <button onClick={reset} className='w-full py-1.5 me-2 rounded-md rounded-e-none text-black border-custom-blue-dark border capitalize'>reset</button>
                            <button onClick={handleSearch} className='w-full capitalize py-1.5 rounded-md rounded-s-none bg-custom-blue-dark text-white'>show</button>
                        </div>
                    </div>
                </DialogBody>
            </Dialog>
        </div>
    )
}

export default React.memo(DialogSearchBar) 
