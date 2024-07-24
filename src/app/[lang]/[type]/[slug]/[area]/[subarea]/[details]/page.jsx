import React from 'react'
import Form from './components/Form'
import SlickAutoPlay from '@/app/[lang]/components/SlickAutoPlay'
import Description from './components/Description'
import Image from 'next/image'
import { getDictionary } from '@/app/[lang]/dictionaries'
import dynamic from 'next/dynamic'
const MoreImages = dynamic(() => import('./components/MoreImages'), {
    ssr: false,
});
export async function generateMetadata({ params }) {
    const baseUrl = process.env.baseUrl;
    try {
        const res = await fetch(`${baseUrl}/properties/${params.details}`, {
            headers: {
                "X-localization": params.lang
            }
        }, { next: { revalidate: 3600 } })
        const data = await res.json()
        const details = await data.data.property
        return {
            title: details.title,
            description: details.description,
            openGraph: {
                title: details.title,
                images: [details.images[0].image],
                description: details.description,
            },
        };
    } catch (e) {
        return {
            title: "House Point",
            description: "House Point",
            openGraph: {
                title: "House Point",
                description: "House Point",
            },
        }
    }
}

const getDetails = async (baseUrl, details, lang) => {

    try {
        const res = await fetch(`${baseUrl}/properties/${details}`, {
            headers: {
                "X-localization": lang
            }
        }, { next: { revalidate: 3600 } })
        const data = await res.json();
        return data
    } catch (e) {
        return e
    }
}


async function page({ params }) {

    const translate = await getDictionary(params.lang)
    const baseUrl = process.env.baseUrl
    const data = await getDetails(baseUrl, params.details, params.lang);
    const details = await data?.data

    if (details) {
        return (
            <main>
                <div className='flex flex-col justify-between items-center gap-5 lg:flex-row py-4 px-3 bg-custom-blue text-white'>
                    <div>
                        <h1 className='text-xl text-center lg:text-start md:text-3xl xl:text-4xl font-semibold capitalize'>
                            {details.property.title}
                        </h1>
                        <p className='text-sm md:text-base mt-4 font-medium text-center lg:text-start capitalize'>
                            {details?.property?.category?.name} for {details?.property?.type} in {details?.property?.areaLocation?.name} {details.property.subarea.name} area: {details.property.area} m² consists of {details.property.beds} {translate.general.components.searchbar.beds} {details.property.baths} {translate.general.components.searchbar.baths} {details.property.furniture} {details.property.rate} stars
                        </p>
                    </div>
                    <div>
                        <p className='text-lg lg:text-2xl font-semibold text-center lg:text-start mb-2'>
                            {details.property.price} EGP
                        </p>
                        <p className='mb-3 text-sm lg:text-base'>Last Updated: {details.property.updated_at}</p>
                        <span className='lg:text-xl font-semibold text-nowrap'>
                            Reference Number : {details.property.refNumber}
                        </span>
                    </div>
                </div>

                <div className='px-2'>
                    <div className='grid lg:grid-cols-3 2xl:grid-cols-4 gap-3'>
                        <div className="py-4 lg:col-span-2 2xl:col-span-3">
                            <div className="grid h-[500px] md:h-[600px] lg:h-[700px] xl:h-[600px] 2xl:h-[700px] 2xl:grid-rows-4 2xl:grid-flow-col gap-2">
                                <div className="relative row-span-4 col-span-2">
                                    <Image priority src={details.property.images[0].image} alt="1" sizes="(min-width: 808px) 50vw, 100vw" fill />
                                </div>
                                <div className="relative row-span-2">
                                    <Image blurDataURL={details.property.images[1].placeholder} placeholder='blur' src={details.property.images[1].image} alt="2" sizes="(min-width: 808px) 50vw, 100vw" fill />
                                </div>
                                <MoreImages details={details.property} />
                            </div>
                        </div>
                        <div className='mt-4 mb-10 lg:mb-0'>
                            <h3 className='bg-custom-blue text-white p-3 font-semibold text-xl rounded-t-md'>Inquire Property</h3>
                            <Form />
                        </div>
                    </div>
                    <Description details={details.property} translate={translate} />
                </div>

                <SlickAutoPlay lang={params.lang} related={details.related} translate={translate} />
            </main>
        )
    } else {
        return (
            <main>
                <h1 className='text-center mt-20'>sorry there is no data</h1>
            </main>
        )
    }

}

export default page
