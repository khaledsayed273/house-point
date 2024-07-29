import React from 'react'
import { getDictionary } from '@/app/[lang]/dictionaries'
import Articles from '../../components/Articles'
import FeatureProperties from '../../components/FeatureProperties'
import Link from 'next/link'

export async function generateMetadata({ params }) {
    const url = process.env.baseUrl
    try {
        const res = await fetch(`${url}/topics/${params.topicslug}`)
        const data = await res.json()
        const details = await data.data
        return {
            title: details.name,
            description: details.description,
            openGraph: {
                title: details.name,
                description: details.description,
            },
        }
    } catch (e) {
        return {
            title: "House Point",
            description: "House Point",
            openGraph: {
                title: "",
                description: "House Point",
            },
        }
    }
}

const getArticles = async (lang, baseUrl, slug) => {
    try {
        const res = await fetch(`${baseUrl}/topics/${slug}`, {
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

const getTags = async (lang, baseUrl, slug) => {
    try {
        const res = await fetch(`${baseUrl}/tags/${slug}`, {
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

async function page({ params }) {
    const baseUrl = process.env.baseUrl
    const translate = await getDictionary(params.lang)
    const articlesApi = getArticles(params.lang, baseUrl, params.topicslug)
    const tagsApi = getTags(params.lang, baseUrl, params.topicslug)
    const [articles, tags] = await Promise.all([articlesApi, tagsApi])

    return (
        <>
            <meta name='robots' content='noindex, nofollow' />
            <link
                rel='canonical'
                href={process.env.mainUrl + `/reads/topics/${params.topicslug}`}
                key='canonical'
                title='House Point Egypt - Real Estate | Reads'
            />
            <main className='p-2 md:p-5 mt-3'>
                {articles?.status && (
                    <div className='grid lg:grid-cols-3 xl:grid-cols-4 gap-5 '>
                        <div className='lg:col-span-2 xl:col-span-3'>
                            <h1 className='text-xl font-semibold md:text-3xl border-b border-gray-500 mb-5 pb-5'>{articles.data.name}</h1>
                            <p>{articles?.data?.description}</p>
                            <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-5 mt-7'>
                                {articles?.data?.articles?.map((item, index) => (
                                    <Articles lang={params.lang} key={index} item={item} translate={translate} />
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className='bg-[#e5e7eb] p-2 md:p-3'>
                                <FeatureProperties lang={params.lang} baseUrl={baseUrl} translate={translate} />
                                {tags?.status && (
                                    <div>
                                        <h3 className='text-xl font-semibold mb-3'>Articles Tags</h3>
                                        <div className='flex flex-wrap gap-3'>
                                            {tags?.data?.map((item, index) => (
                                                <Link key={index} className='bg-[#095668] text-white py-1 px-2.5 rounded-md hover:opacity-80' href={`/${params.lang}/reads/tags/${item.slug}`}># {item.name}</Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    )
}

export default page
