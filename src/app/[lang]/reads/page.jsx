import React from 'react'
import Articles from './components/Articles'
import { getDictionary } from '../dictionaries'
import Link from 'next/link'
import FeatureProperties from './components/FeatureProperties'


export async function generateMetadata({ params }) {
    const url = process.env.baseUrl
    try {
        const res = await fetch(`${url}/metalinks?link=/reads`, {
            headers: {
                "X-localization": params.lang
            },
            cache: 'no-store'
        })
        const data = await res.json()
        const details = await data.data
        const keywords = details.keywords.split(",")
        return {
            title: details.title,
            description: details.title,
            keywords: keywords,
            openGraph: {
                title: details.title,
                description: details.title,
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


const getArticles = async (lang, baseUrl,) => {
    try {
        const res = await fetch(`${baseUrl}/articles`, {
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

const getTopics = async (lang, baseUrl) => {
    try {
        const res = await fetch(`${baseUrl}/topics`, {
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

const getTags = async (lang, baseUrl) => {
    try {
        const res = await fetch(`${baseUrl}/tags`, {
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

const getPageTitle = async (lang, baseUrl) => {
    try {
        const res = await fetch(`${baseUrl}/pagetitles?link=/reads`, {
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
    const articlesApi = getArticles(params.lang, baseUrl)
    const topicsApi = getTopics(params.lang, baseUrl)
    const tagsApi = getTags(params.lang, baseUrl)
    const pageTitleApi = getPageTitle(params.lang, baseUrl)
    const [articles, topics, tags, pageTitle] = await Promise.all([articlesApi, topicsApi, tagsApi, pageTitleApi])

    return (
        <>
            <meta name='robots' content='index, follow' />
            <link
                rel='canonical'
                href={process.env.mainUrl + '/articles'}
                key='canonical'
                title='House Point Egypt - Real Estate | Logo'
            />
            <main className='p-2 md:p-5'>
                {articles?.status && (
                    <div className='grid lg:grid-cols-3 xl:grid-cols-4 gap-5 '>
                        <div className='lg:col-span-2 xl:col-span-3'>
                            <h1 className='text-xl font-semibold md:text-3xl border-b border-gray-500 mb-5 pb-5'>{pageTitle?.data?.title}</h1>
                            <h2>Explore the real estate world, where we offer you rich and diverse content that caters to all your needs and curiosity about real estate. Here, you will find our articles covering various aspects of the real estate market, ranging from tips for real estate investment planning to the latest trends in home design and interior decor.</h2>
                            <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-5 mt-7'>
                                {articles?.data.map((item, index) => (

                                    <Articles lang={params.lang} key={index} item={item} translate={translate} />
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className='bg-[#e5e7eb] p-2 md:p-3'>
                                {topics?.status && (
                                    <>
                                        <h3 className='text-xl font-semibold mb-3'>Articles Topics</h3>
                                        {topics?.data.map((item, index) => (
                                            <Link className='bg-custom-blue-light text-white block text-center py-1 rounded-sm mb-2 hover:opacity-70' key={index} href={`/${params.lang}/reads/topics/${item.slug}`}>{item.name}</Link>

                                        ))}
                                    </>
                                )}

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
