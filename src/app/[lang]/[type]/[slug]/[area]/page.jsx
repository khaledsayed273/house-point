import SearchBar from '@/app/[lang]/components/home/header/SearchBar';
import Section from '@/app/[lang]/components/home/Section';
import { getDictionary } from '@/app/[lang]/dictionaries';
import React from 'react'

export async function generateMetadata({ params, searchParams }) {

    let queryString = ""
    const baseUrl = process.env.baseUrl;
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


    try {
        const res = await fetch(`${ApiUrl}`, {
            headers: {
                "X-localization": params.lang
            }
        }, { next: { revalidate: 3600 } })
        const data = await res.json()

        return {
            title: `${data.data.meta.total} ${params.slug} For ${params.type} in Cairo Egypt`,
            description: `${data.data.meta.total} ${params.slug} For ${params.type} in Cairo Egypt`,
            openGraph: {
                title: `${data.data.meta.total} ${params.slug} For ${params.type} in Cairo Egypt`,
                // images: `${data.data.meta.total} ${params.slug} For ${params.type} in Cairo Egypt`,
                description: `${data.data.meta.total} ${params.slug} For ${params.type} in Cairo Egypt`,
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

    const data = await getArea(baseUrl, params.lang, params.type, params.slug, params.area, searchParams)

    if (data?.status) {
        return (
            <main>
                <SearchBar lang={params.lang} baseUrl={baseUrl} data={data.data} params={params} translate={translate} />
                {data.data.data.length !== 0 ? (
                    <div>
                        <Section lang={params.lang} translate={translate} data={data.data} />
                    </div>
                ) : (
                    <div>
                        <h1 className='mt-36 text-center font-semibold text-xl capitalize'>
                            Sorry, this page is not found
                        </h1>
                    </div>
                )}
            </main>
        );
    }
}

export default page
