import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import bedflatImg from "../../../../../public/assets/bedflat.png"
import bathflatImg from "../../../../../public/assets/bathflat.png"
import surfaceflatImg from "../../../../../public/assets/surfaceflat.png"
import couchflatImg from "../../../../../public/assets/couchflat.png"
import MediaCards from './MediaCards'


function Cards({ lang, item, translate }) {

    const linkHref = `/${lang}/${item.type === "إيجار" || item.type === "rent" ? "rent" : "sale"}/${item.category.slug.toLowerCase()}/${item.areaLocation.slug.toLowerCase()}/${item.subarea.slug.toLowerCase()}/${item.slug}`;

    return (
        <div className='flex relative flex-col  bg-white rounded shadow-lg shadow-gray-300'>
            <h3 className='flex items-center justify-center h-20 px-2 py-1  text-sm  font-semibold text-center text-white bg-custom-blue'>
                {item.title}
            </h3>
            <div className='aspect-[3/2]'>
                <div className='relative h-full w-full'>
                    <Link className='relative inline-block h-full w-full' href={linkHref}>
                        <Image
                            src={item.image.image}
                            blurDataURL={item.image.placeholder}
                            alt={item.title}
                            placeholder='blur'
                            fill
                            quality={30}
                            sizes="(min-width: 808px) 50vw, 100vw"
                            title={item.title}
                        />
                    </Link>
                    {/* about */}
                    <div className="absolute top-0 start-0">
                        <h3 className=' text-sm font-bold p-3 rounded-e-md tracking-wider text-white transition-all bg-opacity-50 top-2 font-openSans bg-custom-blue'>
                            {item.category.name}
                        </h3>
                    </div>
                    {/* media */}
                    <MediaCards item={item} />
                    {/* bottom */}
                    <div className='absolute bottom-[75px]'>
                        <div className='flex px-2'>
                            {[...Array(+item.rate)].map((_, index) => (
                                <svg key={index} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-yellow-500">
                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                </svg>

                            ))}
                        </div>
                    </div>

                    <div className='absolute bottom-0 left-0 right-0'>
                        <div className='gap-1'>

                            <div className='flex flex-col items-center gap-3 px-2 py-2 text-xs font-bold tracking-wider text-white transition-all bg-opacity-50 font-openSans bg-custom-blue'>
                                <div className='w-full flex justify-start items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>
                                    <span className='text-sm ms-1'>{item.areaLocation.name} , {item.subarea.name}</span>
                                </div>
                                <div className='w-full flex justify-end gap-1 text-xs font-bold text-white transition-colors duration-200 transform'>
                                    <span className='text-sm'>
                                        {Number(+item.price).toLocaleString()}
                                        <span className='ms-1'>{translate.general.components.property_card.egp}</span>
                                    </span>
                                    {item.type === "rent" && (
                                        <span className='flex gap-1 text-sm'>
                                            <span>/</span>
                                            <span>{translate.general.components.property_card.month}</span>
                                        </span>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='px-2 '>
                <div className='flex items-center justify-around py-1 text-sm'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex items-center gap-1'>
                            <Image
                                src={bedflatImg}
                                alt='bed'
                                width={25}
                                height={25}
                                title='bed'
                                sizes="(min-width: 808px) 50vw, 100vw"

                            />
                            <span>
                                <span className='me-1'>{item.beds}</span>
                                {translate.general.components.property_card.bedrooms}
                            </span>
                        </div>
                        <div className='flex items-center gap-1'>
                            <Image
                                src={bathflatImg}
                                alt='bath'
                                width={25}
                                height={25}
                                title='bath'
                                sizes="(min-width: 808px) 50vw, 100vw"

                            />
                            <span>
                                <span>{item.baths}</span>
                            </span>
                            {translate.general.components.property_card.bathrooms}
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className='flex items-center gap-1'>
                            <Image
                                src={surfaceflatImg}
                                alt='surface'
                                width={25}
                                height={25}
                                title='surface'
                                sizes="(min-width: 808px) 50vw, 100vw"

                            />
                            {item.area}
                            <span>
                                {translate.general.components.property_card.sqm}
                                <sup>2</sup>
                            </span>
                        </span>
                        <span className='flex items-center gap-1'>
                            <Image
                                src={couchflatImg}
                                alt='couch'
                                width={25}
                                height={25}
                                title='couch'
                                sizes="(min-width: 808px) 50vw, 100vw"
                            />
                            {item.furniture}
                        </span>
                    </div>
                </div>
                <hr />
                <div className='flex justify-between gap-2 my-1 text-sm'>
                    <span className='flex items-center justify-center w-full capitalize py-1.5 gap-1 px-4 text-white rounded bg-custom-blue'>
                        {translate.general.components.property_card.for}
                        {item.type}
                    </span>
                    <span className='flex items-center justify-center w-full capitalize py-1.5 gap-1 px-4 text-white rounded bg-custom-blue'>
                        {translate.general.components.property_card.refnum}{item.refNumber}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Cards) 
