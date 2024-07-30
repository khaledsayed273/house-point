/* eslint-disable @next/next/inline-script-id */
import SearchBar from '@/app/[lang]/components/home/header/SearchBar';
import Section from '@/app/[lang]/components/home/Section';
import Pagination from '@/app/[lang]/components/Pagination';
import { getDictionary } from '@/app/[lang]/dictionaries';
import Link from 'next/link';
import Script from 'next/script';
import React from 'react'

export async function generateMetadata({ params, searchParams }) {

    let queryString = ""
    const baseUrl = process.env.baseUrl;
    const mainUrl = process.env.mainUrl;
    if (params.type !== null && params.type !== undefined) {
        queryString += `filter[type]=${params.type}&`;
    }
    if (params.slug !== null && params.slug !== undefined) {
        queryString += `filter[category_name]=${params.slug}&`;
    }
    if (params.area !== null && params.area !== undefined) {
        queryString += `filter[area_slug]=${params.area}&`;
    }
    if (searchParams.minPrice !== null && searchParams.minPrice !== undefined) {
        queryString += `filter[min_price]=${searchParams.minPrice}&`;
    }
    if (searchParams.maxPrice !== null && searchParams.maxPrice !== undefined) {
        queryString += `filter[max_price]=${searchParams.maxPrice}&`;
    }
    if (searchParams.minPropertyArea !== null && searchParams.minPropertyArea !== undefined) {
        queryString += `filter[min_area]=${searchParams.minPropertyArea}&`;
    }
    if (searchParams.maxPropertyArea !== null && searchParams.maxPropertyArea !== undefined) {
        queryString += `filter[max_area]=${searchParams.maxPropertyArea}&`;
    }
    if (searchParams.beds !== null && searchParams.beds !== undefined) {
        queryString += `filter[beds]=${searchParams.beds}&`;
    }
    if (searchParams.baths !== null && searchParams.baths !== undefined) {
        queryString += `filter[baths]=${searchParams.baths}&`;
    }
    if (searchParams.furnitureSetting !== null && searchParams.furnitureSetting !== undefined) {
        queryString += `filter[furniture_slug]=${searchParams.furnitureSetting}&`;
    }

    queryString = queryString.slice(0, -1);

    const ApiUrl = `${baseUrl}/properties?${queryString}`

    const Query = `${baseUrl}/metalinks?link=/${params.type}/${params.slug}/${params.area}`

    try {
        const [dataResponse, metaLinkResponse] = await Promise.all([
            fetch(`${ApiUrl}`, {
                headers: {
                    "X-localization": params.lang
                },
                next: { revalidate: 3600 }
            }),
            fetch(`${Query}`, {
                headers: {
                    "X-localization": params.lang
                },
                next: { revalidate: 3600 }
            })
        ]);

        const data = await dataResponse.json();
        const resMetaLink = await metaLinkResponse.json();

        const metaLink = await resMetaLink.data
        const keywords = metaLink.keywords.split(",")

        return {
            title: `${data.data.meta.total} ${metaLink.title}`,
            description: `${data.data.meta.total} ${metaLink.description}`,
            keywords: keywords,
            openGraph: {
                title: `${data.data.meta.total} ${metaLink.title}`,
                description: `${data.data.meta.total} ${metaLink.description}`,
                keywords: keywords
            },
            alternates: {
                languages: {
                    'x-default': `${mainUrl}/en/${params.type}/${params.slug}/${params.area}`,
                    'ar': `${mainUrl}/ar/${params.type}/${params.slug}/${params.area}`,
                },
                types: {
                    'application/rss+xml': `${mainUrl}/rss`,
                },
            },
        }

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

const getArea = async (baseUrl, lang, type, slug, area, searchParams) => {
    let queryString = ""

    if (type !== null && type !== undefined) {
        queryString += `filter[type]=${type}&`;
    }
    if (slug !== null && slug !== undefined) {
        queryString += `filter[category_name]=${slug}&`;
    }
    if (area !== null && area !== undefined) {
        queryString += `filter[area_slug]=${area}&`;
    }
    if (searchParams.minPrice !== null && searchParams.minPrice !== undefined) {
        queryString += `filter[min_price]=${searchParams.minPrice}&`;
    }
    if (searchParams.maxPrice !== null && searchParams.maxPrice !== undefined) {
        queryString += `filter[max_price]=${searchParams.maxPrice}&`;
    }
    if (searchParams.minPropertyArea !== null && searchParams.minPropertyArea !== undefined) {
        queryString += `filter[min_area]=${searchParams.minPropertyArea}&`;
    }
    if (searchParams.maxPropertyArea !== null && searchParams.maxPropertyArea !== undefined) {
        queryString += `filter[max_area]=${searchParams.maxPropertyArea}&`;
    }
    if (searchParams.beds !== null && searchParams.beds !== undefined) {
        queryString += `filter[beds]=${searchParams.beds}&`;
    }
    if (searchParams.baths !== null && searchParams.baths !== undefined) {
        queryString += `filter[baths]=${searchParams.baths}&`;
    }
    if (searchParams.furnitureSetting !== null && searchParams.furnitureSetting !== undefined) {
        queryString += `filter[furniture_slug]=${searchParams.furnitureSetting}&`;
    }
    if (searchParams.page !== null && searchParams.page !== undefined) {
        queryString += `page=${searchParams.page}&`;
    }
    if (searchParams.page !== null && searchParams.page !== undefined) {
        queryString += `page=${searchParams.page}&`;
    }

    queryString = queryString.slice(0, -1);

    const ApiUrl = `${baseUrl}/properties?${queryString}`

    try {
        const req = await fetch(`${ApiUrl}`, {
            headers: {
                "X-localization": lang
            }
        }, { next: { revalidate: 3600 } })
        const res = await req.json()
        return res

    } catch (e) {
        return e
    }



}


const getPageTitle = async (baseUrl, type, slug, lang) => {
    try {
        const res = await fetch(`${baseUrl}/pagetitles?link=/${type}/${slug}`, {
            headers: {
                "X-localization": lang
            },
            cache: 'no-store'
        })
        const data = await res.json()
        return data
    } catch (e) {
        console.log(e);
    }
}


async function page({ params, searchParams }) {
    const baseUrl = process.env.baseUrl
    const mainUrl = process.env.mainUrl

    const translate = await getDictionary(params.lang)

    const data = await getArea(baseUrl, params.lang, params.type, params.slug, params.area, searchParams)
    const pageTitle = await getPageTitle(baseUrl, params.type, params.slug, params.lang)


    const itemListSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        '@id': 'mainEntity',
        url: `${mainUrl}/${params.type}`,
        itemListElement: data?.data?.data?.map((property, index) => ({
            '@type': `${property.title.slice(0, -1)}`,
            '@id': `ReferenceNumber:${property.refNumber}`,
            name: `${property.title}`,
            image: `${baseUrl}/original/${property.image.image}`,
            url: `${mainUrl}/${property.title.toLowerCase()}/${property.area}/${property.subarea.name.toLowerCase()}/${property.title.toLowerCase()}-${property.refNumber}`,
            tourBookingPage: `${mainUrl}/${property.title.toLowerCase()}/${property.area}/${property.subarea.name.toLowerCase()}/${property.title.toLowerCase()}-${property.refNumber}`,
            address: `${property.subarea.name}, ${property.area}, EG`,
            telephone: '+201221409530',
            floorSize: 'QuantitativeValue',
            floorSize: 'sqm',
        })),
    };


    const propertySchema = data?.data?.data?.map((property) => ({
        '@context': 'https://schema.org',
        '@type': 'Product',
        '@id': `ReferenceNumber:#${property.refNumber}`,
        sku: `${property.refNumber}`,
        offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            price: `${property.price}`,
            priceCurrency: 'EGP',
            '@id': 'HousePointEgyptOrganization',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '5',
        },
    }));


    if (data?.status) {
        return (
            <>
                <meta name='robots' content='index, follow' />
                <meta
                    property="og:url"
                    content={`${mainUrl}/${params.lang}/${params.type}/${params.slug}/${params.area}`}
                />
                <link
                    rel='canonical'
                    href={`${mainUrl}/${params.lang}/${params.type}/${params.slug}/${params.area}`}
                    key='canonical'
                    title='House Point Egypt - Real Estate'
                />
                <Script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
                />
                <Script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(propertySchema) }}
                />
                <main>
                    <div className='p-2 ms-5 mt-3 flex items-center capitalize  text-sm'>
                        <Link href={"/"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                        </Link>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 mx-0.5 rtl:rotate-180">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                        <Link className='underline' href={`/${params.lang}/${params.type}/properties`}>
                            {params.type}
                        </Link>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 mx-0.5 rtl:rotate-180">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                        <Link className='underline' href={`/${params.lang}/${params.type}/${params.slug}`}>
                            {params.slug}
                        </Link>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 mx-0.5 rtl:rotate-180">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                        <Link className='underline' href={`/${params.lang}/${params.type}/${params.slug}/${params.area}`}>
                            {params.area}
                        </Link>
                    </div>
                    <SearchBar lang={params.lang} baseUrl={baseUrl} data={data.data} params={params} translate={translate} />
                    {data.data.data.length !== 0 ? (
                        <div>
                            <h1 className="text-center my-5 md:text-2xl font-medium">{pageTitle?.data?.title}</h1>
                            <h2 className="text-center my-5 md:text-lg font-base">{translate.general.components.searchbar.searchReads}</h2>
                            <Section lang={params.lang} translate={translate} data={data.data} />
                            <Pagination lang={params.lang} data={data.data} />

                        </div>
                    ) : (
                        <div>
                            <h1 className='mt-36 text-center font-semibold text-xl capitalize'>
                                Sorry, this page is not found
                            </h1>
                        </div>
                    )}
                </main>
            </>
        );
    }
}

export default page
