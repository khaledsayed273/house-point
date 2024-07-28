/* eslint-disable @next/next/inline-script-id */
import React from 'react'
import SearchBar from '../../components/home/header/SearchBar'
import Section from '../../components/home/Section'
import { getDictionary } from '../../dictionaries'
import Pagination from '../../components/Pagination'
import Script from 'next/script'


export async function generateMetadata({ params , searchParams }) {

    const url = process.env.baseUrl

    const ApiUrl = `${url}/properties?filter[type]=${params.type}&page=${searchParams.page}`

    const Query = `${url}/metalinks?link=/${params.type}/properties`

    try {
        const [dataResponse, metaLinkResponse] = await Promise.all([
            fetch(`${ApiUrl}`, {
                headers: {
                    "X-localization": params.lang
                },
                cache: 'no-store'
            }),
            fetch(`${Query}`, {
                headers: {
                    "X-localization": params.lang
                },
                cache: 'no-store'
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
                keywords: keywords,
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

const getData = async (baseUrl, slug, lang, page) => {


    try {
        const res = await fetch(`${baseUrl}/properties?filter[type]=${slug}&page=${page}`, {
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
    const translate = await getDictionary(params.lang)
    const baseUrl = process.env.baseUrl
    const req = await getData(baseUrl, params.type, params.lang, searchParams.page)
    const data = await req?.data


    const itemListSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        '@id': 'mainEntity',
        url: `${baseUrl}/${params.type}`,
        itemListElement: data?.data?.map((property, index) => ({
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


    const propertySchema = data?.data?.map((property) => ({
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
                <SearchBar lang={params.lang} baseUrl={baseUrl} data={data} params={params} translate={translate} />
                {req?.status && (
                    <Section lang={params.lang} data={data} translate={translate} />
                )}
                <Pagination  data={data} />

            </main>
        </>
    )
}

export default page
