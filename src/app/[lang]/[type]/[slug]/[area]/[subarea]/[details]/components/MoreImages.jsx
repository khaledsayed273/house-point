"use client"
import dynamic from 'next/dynamic';
import Image from 'next/image'
import React, { useState } from 'react'
const Dialog = dynamic(() => import('@material-tailwind/react').then(mod => mod.Dialog), {
    ssr: false,
});

const DialogHeader = dynamic(() => import('@material-tailwind/react').then(mod => mod.DialogHeader), {
    ssr: false,
});

const DialogBody = dynamic(() => import('@material-tailwind/react').then(mod => mod.DialogBody), {
    ssr: false,
});

function MoreImages({ details }) {

    const [show, setSize] = useState(false);

    const handleShowPopUp = () => {
        setSize(!show)
    }

    return (
        <>
            <div className="relative row-span-2 ">
                {details.images.length > 1 ? (
                    <>
                        <button onClick={handleShowPopUp} className='bg-black/70 absolute top-0 left-0 bottom-0 right-0 text-white z-10 text-xl font-bold'>
                            + {details.images.length}
                        </button>
                        <Image quality={30}
                            sizes="(min-width: 808px) 50vw, 100vw" blurDataURL={details.images[1].placeholder} placeholder='blur' src={details.images[1].image} alt="1" fill />
                    </>

                ) : (
                    <Image blurDataURL={details.images[1].placeholder} placeholder='blur' src={details.images[1].image} alt="1" quality={30} sizes="(min-width: 808px) 50vw, 100vw" fill />
                )}
            </div>
            <Dialog
                open={show}
                size={"xxl"}
                handler={handleShowPopUp}
            >
                <DialogHeader>
                    <h3 className='text-center flex-1 text-sm md:text-base'>شقه حديثه للايجار في سرايات المعادي القاهره مصر - Gallery -</h3>
                    <button
                        onClick={() => handleShowPopUp(null)}
                        className="ms-auto"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10 text-custom-blue">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </DialogHeader>
                <DialogBody className='bg-blue-gray-800 h-full overflow-auto'>
                    <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-5'>
                        {details.images.map((item, index) => (
                            <div key={index} className='relative h-[250px] sm:h-[300px] md:h-[250px] lg:h-[300px] xl:h-[400px] overflow-hidden rounded-lg'>
                                <Image blurDataURL={item.placeholder} placeholder='blur' quality={30} sizes="(min-width: 808px) 50vw, 100vw" src={item.image} fill alt={`image-${index}`} />
                            </div>
                        ))}
                    </div>
                </DialogBody>
            </Dialog>
        </>
    )
}

export default MoreImages
