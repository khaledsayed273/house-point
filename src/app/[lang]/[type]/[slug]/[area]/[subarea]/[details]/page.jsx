/* eslint-disable @next/next/inline-script-id */
import React from 'react'
import Form from './components/Form'
import Description from './components/Description'
import MoreImages from './components/MoreImages'
import Image from 'next/image'
import { getDictionary } from '@/app/[lang]/dictionaries'
import dynamic from 'next/dynamic'
import Script from 'next/script'
import SearchBar from '@/app/[lang]/components/home/header/SearchBar'
import Link from 'next/link'
const SlickAutoPlay = dynamic(() => import('@/app/[lang]/components/SlickAutoPlay'), {
    ssr: false,
});

export async function generateMetadata({ params }) {
    const baseUrl = process.env.baseUrl;
    const mainUrl = process.env.mainUrl;
    try {
        const res = await fetch(`${baseUrl}/properties/${params.details}`, {
            headers: {
                "X-localization": params.lang
            }
        }, { next: { revalidate: 3600 } })
        const data = await res.json()
        const details = await data.data.property

        const extractedTags = details.tags.map(item => item.tag);

        return {
            title: details.title,
            description: details.title,
            keywords: extractedTags,
            openGraph: {
                title: details.title,
                images: [details.images[0].image],
                description: details.title,
                keywords: extractedTags
            },
            alternates: {
                languages: {
                    'x-default': `${mainUrl}/en/${params.type}/${params.slug}/${params.area}/${params.subarea}/${params.details}`,
                    'ar': `${mainUrl}/ar/${params.type}/${params.slug}/${params.area}/${params.subarea}/${params.details}`,
                },
                types: {
                    'application/rss+xml': `${mainUrl}/rss`,
                },
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
    const mainUrl = process.env.mainUrl
    const data = await getDetails(baseUrl, params.details, params.lang);
    const details = await data?.data

    const accSchema = {
        '@context': 'https://schema.org',
        '@type': 'Accommodation',
        '@id': 'mainEntity',
        name: details?.property?.title,
        description: details?.property?.description
            .replaceAll('<p>', '')
            .replaceAll('</p>', '')
            .replaceAll('&nbsp;', ' '),
        image:
            baseUrl +
            '/_next/image?url=' +
            details?.property?.images[0]?.image +
            '&w=3840&q=30',
        url:
            mainUrl +
            `${params.lang
            }/${params.type}/${params.slug}/${params.area}/${params.subarea}/${params.details}`,
        tourBookingPage: mainUrl +
            `${params.lang
            }/${params.type}/${params.slug}/${params.area}/${params.subarea}/${params.details}`,
        numberOfBathroomsTotal: details?.property?.baths,
        numberOfBedrooms: details?.property?.beds,
        address: {
            '@type': 'PostalAddress',
            streetAddress: '',
            addressLocality: '',
            postalCode: '',
            addressCountry: '',
        },
    };

    if (details) {
        return (
            <>
                <meta name='robots' content='index, follow' />
                <meta property='og:url' content={`${mainUrl}/${params.lang}/${params.type}/${params.slug}/${params.area}/${params.subarea}/${params.details}`} />
                <link
                    rel='sitemap'
                    type='application/xml'
                    href={mainUrl + '/sitemap.xml'}
                />
                <link
                    rel='canonical'
                    href={`${mainUrl}/${params.lang}/${params.type}/${params.slug}/${params.area}/${params.subarea}/${params.details}`}
                    key='canonical'
                    title='House Point Egypt - Real Estate'
                />
                <Script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(accSchema) }}
                />
                <main className='mb-10'>
                    <div className='flex flex-col justify-between items-center gap-5 lg:flex-row py-4 px-3 bg-custom-blue text-white'>
                        <div>
                            <h1 className='text-xl text-center lg:text-start md:text-3xl xl:text-4xl font-semibold capitalize'>
                                {details.property.title}
                            </h1>
                            <p className='text-sm md:text-base mt-4 font-medium text-center lg:text-start capitalize'>
                                {details?.property?.category?.name} {params.lang === "en" ? "for " : "لل"}{details?.property?.type} {params.lang === "en" ? "in" : "في"} {details?.property?.areaLocation?.name} {details.property.subarea.name} {params.lang === "en" ? "area" : "منطقة"}: {details.property.area}  {params.lang === "en" ? "m² consists of" : "متر مربع تتكون من"} {details.property.beds} {translate.general.components.searchbar.beds} {details.property.baths} {translate.general.components.searchbar.baths} {details.property.furniture} {details.property.rate} {params.lang === "en" ? "stars" : "نجوم"}
                            </p>
                        </div>
                        <div>
                            <p className='text-lg lg:text-2xl font-semibold text-center lg:text-start mb-2'>
                                {Number(+details.property.price).toLocaleString()} EGP {params.type === "rent" && `/${params.lang === "en" ? "Month" : "شهريا"}`}
                            </p>
                            <p className='mb-3 text-sm lg:text-base'>{translate.pages.property.components.title.last_updated}: {details.property.updated_at}</p>
                            <span className='lg:text-xl font-semibold text-nowrap'>
                                {translate.pages.property.components.title.ref_num} : {details.property.refNumber}
                            </span>
                        </div>
                    </div>

                    <div className='p-2 ms-5 mt-3 flex items-center capitalize  text-sm'>
                        <Link href={"/"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                        </Link>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 mx-0.5 rtl:rotate-180">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                        <Link className='underline' href={`/${params.lang}/${details.property.type}/properties`}>
                            {details.property.type}
                        </Link>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 mx-0.5 rtl:rotate-180">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                        <Link className='underline' href={`/${params.lang}/${details.property.type}/${details.property.category.slug}`}>
                            {details.property.category.name}
                        </Link>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 mx-0.5 rtl:rotate-180">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                        <Link className='underline' href={`/${params.lang}/${details.property.type}/${details.property.category.slug}/${details.property.areaLocation.slug}`}>
                            {details.property.areaLocation.name}
                        </Link>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 mx-0.5 rtl:rotate-180">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                        <Link className='underline' href={`/${params.lang}/${details.property.type}/${details.property.category.slug}/${details.property.areaLocation.slug}/${details.property.subarea.slug}`}>
                            {details.property.subarea.name}
                        </Link>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 mx-0.5 rtl:rotate-180">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                        <span className='underline'>{details.property.title}</span>

                    </div>

                    <div className='px-2'>
                        <div className="py-4 lg:col-span-2 2xl:col-span-3">
                            <div className="grid h-[500px] md:h-[700px] 2xl:grid-rows-4 2xl:grid-flow-col gap-2">
                                <div className="relative row-span-4 col-span-2">
                                    <Image priority src={details.property.images[0].image} alt="1" sizes="(min-width: 808px) 50vw, 100vw" fill />
                                </div>
                                <div className="relative row-span-2">
                                    <Image blurDataURL={details.property.images[1].placeholder} placeholder='blur' src={details.property.images[1].image} alt="2" sizes="(min-width: 808px) 50vw, 100vw" fill />
                                </div>
                                <MoreImages details={details.property} />
                            </div>
                        </div>

                        <div className='grid md:grid-cols-3 gap-5 relative'>
                            <div className='sticky top-3 left-0 w-full h-fit'>
                                <h3 className='bg-custom-blue text-white p-3 font-semibold text-xl rounded-t-md'>{translate.pages.property.components.contact_us.request_property}</h3>
                                <Form refNumber={details.property.refNumber} baseUrl={baseUrl} />
                            </div>
                            <Description details={details.property} translate={translate} />
                        </div>
                    </div>
                    <SlickAutoPlay lang={params.lang} related={details.related} translate={translate} />
                    <div className="flex justify-center items-center ">
                        <Link className="mx-auto text-sm md:text-xl text-white capitalize bg-custom-blue  py-3 px-4 rounded-md hover:opacity-80" href={`/${params.lang}/${params.type}/${params.slug}/${params.area}`}>{`${params.lang === "en" ? `for more avaliable ${details?.property?.category?.name} for ${details?.property?.type} in ${details?.property?.areaLocation?.name} check here` : `لمزيد من ${details?.property?.category?.name}  لل${details?.property?.type} في ${details?.property?.areaLocation?.name} اضغط هنا`}`}</Link>
                    </div>
                    <SearchBar lang={params.lang} baseUrl={baseUrl} data={data.data} params={params} translate={translate} />
                </main>
            </>
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
