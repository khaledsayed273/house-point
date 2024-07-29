import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import bathIcon from "../../../../../../../../../public/assets/bath.png"
import bedIcon from "../../../../../../../../../public/assets/bed.png"
import surfaceIcon from "../../../../../../../../../public/assets/surface.png"
import couchIcon from "../../../../../../../../../public/assets/couch.png"

function Description({ details, translate }) {

    const description = { __html: details.description }

    return (
        <div className='border md:col-span-2'>
            <h3 className='bg-custom-blue p-3 capitalize font-semibold text-xl rounded-t-md text-white'>{translate.pages.property.components.property_desc.description}</h3>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 py-4 border-b gap-7 md:gap-5'>
                <div className='flex lg:justify-center items-center'>
                    <Image width={30} height={30} priority src={surfaceIcon} alt='surface' />
                    <span className='ms-1 '><span className='font-semibold'>{details.area}</span> {translate.general.components.property_card.sqm}</span>
                </div>
                <div className='flex lg:justify-center items-center'>
                    <Image width={30} height={30} priority src={bathIcon} alt='baths' />
                    <span className='ms-1 '><span className='font-semibold'>{details.baths}</span> {translate.general.components.searchbar.baths}</span>
                </div>
                <div className='flex lg:justify-center items-center'>
                    <Image width={30} height={30} priority src={bedIcon} alt='beds' />
                    <span className='ms-1 '><span className='font-semibold mt-2 inline-block'>{details.beds}</span> {translate.general.components.searchbar.beds}</span>
                </div>
                <div className='flex lg:justify-center items-center'>
                    <Image width={30} height={30} priority src={couchIcon} alt='furniture' />
                    <span className='ms-1'>{details.furniture}</span>
                </div>
            </div>

            <div className='my-3 p-2' dangerouslySetInnerHTML={description}>

            </div>

            <div className='my-7 p-2'>
                <h3 className='text-lg md:text-xl font-semibold'>{translate.pages.property.components.property_desc.amentias}</h3>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mt-3 gap-3'>
                    {details.amenities.map(item => (
                        <div className='flex items-center text-sm' key={item.id}>
                            <Image width={40} height={40} src={item.icon} alt={item.name} />
                            <span className='ms-2 font-base'>{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className='md:my-10 p-2'>
                <h3 className='text-lg md:text-xl font-semibold'>{translate.pages.property.components.property_desc.tags}</h3>
                <div className='flex items-center flex-wrap '>
                    {details.tags.map((item, index) => (
                        <Link className='me-3 mt-3 capitalize text-sm hover:scale-95 transition-all duration-300 bg-custom-blue text-white px-4 py-1.5 rounded-md' key={index} href={`${item.url}`}>#{item.tag}</Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Description
