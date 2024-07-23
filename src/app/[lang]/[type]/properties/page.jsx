import React from 'react'
import SearchBar from '../../components/home/header/SearchBar'
import Section from '../../components/home/Section'
import { getDictionary } from '../../dictionaries'
import Pagination from '../../components/Pagination'


export async function generateMetadata({ params }) {
    const translate = await getDictionary(params.lang)




    const url = process.env.baseUrl
    try {
        const res = await fetch(`${url}/properties?filter[type]=${params.type}`, { headers: { "X-localization": params.lang }, cache: 'no-store' })
        const data = await res.json()
        const type = params.type.charAt(0).toUpperCase() + params.type.slice(1)
        
        return {
            title: `${data.data.meta.total} Property Types For ${type} In Cairo, Egypt`,
            description: `${data.data.meta.total} Property Types For ${type} In Cairo, Egypt`,
            openGraph: {
                title: `${data.data.meta.total} Property Types For ${type} In Cairo, Egypt`,
                // images: `${data.data.meta.total} ${type} For ${type} in Cairo Egypt`,
                description: `${data.data.meta.total} Property Types For ${type} In Cairo, Egypt`,
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

const getData = async (baseUrl, slug, lang , page) => {


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

async function page({ params , searchParams }) {
    const translate = await getDictionary(params.lang)
    const baseUrl = process.env.baseUrl
    const req = await getData(baseUrl, params.type, params.lang , searchParams.page)
    const data = await req?.data





    return (
        <main>
            <SearchBar lang={params.lang} baseUrl={baseUrl} data={data} params={params} translate={translate} />
            {req?.status && (
                <Section lang={params.lang} data={data} translate={translate} />
            )}
            <Pagination lang={params.lang} data={data}/>

        </main>
    )
}

export default page
