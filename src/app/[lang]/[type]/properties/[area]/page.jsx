/* eslint-disable @next/next/inline-script-id */
import SearchBar from '@/app/[lang]/components/home/header/SearchBar';
import Section from '@/app/[lang]/components/home/Section';
import Pagination from '@/app/[lang]/components/Pagination';
import { getDictionary } from '@/app/[lang]/dictionaries';
import Script from 'next/script';
import React from 'react'

export async function generateMetadata({ params, searchParams }) {

    let queryString = ""
    const baseUrl = process.env.baseUrl;
    if (params.type !== null && params.type !== undefined) {
        queryString += `filter[type]=${params.type}&`;
    }
    if (params.area !== null && params.area !== undefined) {
        queryString += `filter[area_slug]=${params.area}&`;
    }
    if (searchParams.page !== null && searchParams.page !== undefined) {
        queryString += `page=${searchParams.page}&`;
    }

    queryString = queryString.slice(0, -1);

    const ApiUrl = `${baseUrl}/properties?${queryString}`


    try {
        const res = await fetch(`${ApiUrl}`, {
            headers: {
                "X-localization": params.lang
            }
        }, { next: { revalidate: 3600 } })
        const data = await res.json()

        return {
            title: `${data.data.meta.total} Property Type For ${params.type} in ${params.area} ,Cairo Egypt | House Point`,
            description: `${data.data.meta.total} Property Type For ${params.type} in ${params.area} ,Cairo Egypt | House Point`,
            openGraph: {
                title: `${data.data.meta.total} Property Type For ${params.type} in ${params.area} ,Cairo Egypt | House Point`,
                // images: `${data.data.meta.total} ${params.slug} For ${params.type} in Cairo Egypt`,
                description: `${data.data.meta.total} Property Type For ${params.type} in ${params.area} ,Cairo Egypt | House Point`,
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

const getArea = async (baseUrl, lang, type, slug, area, page) => {
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
    if (page !== null && page !== undefined) {
        queryString += `page=${page}&`;
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


async function page({ params, searchParams }) {
    const baseUrl = process.env.baseUrl

    const translate = await getDictionary(params.lang)

    const data = await getArea(baseUrl, params.lang, params.type, params.slug, params.area, searchParams.page)


    const itemListSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        '@id': 'mainEntity',
        url: `${baseUrl}/${params.type}`,
        itemListElement: data?.data?.data?.map((property, index) => ({
            '@type': `${property.title.slice(0, -1)}`,
            '@id': `ReferenceNumber:${property.refNumber}`,
            name: `${property.title}`,
            image: `${baseUrl}/original/${property.image.image}`,
            url: `${baseUrl}/${property.title.toLowerCase()}/${property.area}/${property.subarea.name.toLowerCase()}/${property.title.toLowerCase()}-${property.refNumber}`,
            tourBookingPage: `${baseUrl}/${property.title.toLowerCase()}/${property.area}/${property.subarea.name.toLowerCase()}/${property.title.toLowerCase()}-${property.refNumber}`,
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
                <Script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
                />
                <Script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(propertySchema) }}
                />
                <main>
                    <SearchBar lang={params.lang} baseUrl={baseUrl} data={data.data} params={params} translate={translate} />
                    {data.data.data.length !== 0 ? (
                        <div>
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
