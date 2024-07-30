/* eslint-disable @next/next/inline-script-id */
import React from 'react'
import Link from 'next/link'
import Articles from '../../components/Articles'
import { getDictionary } from '@/app/[lang]/dictionaries'
import FeatureProperties from '../../components/FeatureProperties'
import Script from 'next/script'
import { htmlToText } from 'html-to-text'


export async function generateMetadata({ params }) {
    const url = process.env.baseUrl

    const getDetailsApi = await fetch(`${url}/tags/${params.details}`, {
        headers: {
            "X-localization": params.lang
        },
        cache: 'no-store'
    })

    const getDetails = await getDetailsApi.json()

    const getMetaDataApi = await fetch(`${url}/metalinks?link=/reads/tags/${params.details}`, {
        headers: {
            "X-localization": params.lang
        },
        cache: 'no-store'
    })

    const getMetaData = await getMetaDataApi.json()

    const keywords = getMetaData?.keywords?.split(",")

    try {
        return {
            title: getMetaData.data.title,
            description: getMetaData.data.description,
            keywords: keywords,
            openGraph: {
                title: getMetaData.data.title,
                description: getMetaData.data.description,
                keywords: keywords,
            },
        }

    } catch (e) {
        return {
            title: `${getDetails.data.name} | Article Tag`,
            description: `${getDetails.data.description} | Article Tag`,
            keywords: getDetails.data.name,
            openGraph: {
                title: `${getDetails.data.name} | Article Tag`,
                description: `${getDetails.data.description} | Article Tag`,
                keywords: getDetails.data.name,
            },
        }
    }
}

const getTagDetails = async (lang, baseUrl, details) => {
    try {
        const res = await fetch(`${baseUrl}/tags/${details}`, {
            headers: {
                "X-localization": lang
            },
            cache: 'no-store'
        })
        const data = await res.json()
        console.log(data);
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

async function page({ params }) {
    const baseUrl = process.env.baseUrl
    const WEBSITE_BASE_URL = process.env.mainUrl
    const translate = await getDictionary(params.lang)
    const tagsDetailsApi = getTagDetails(params.lang, baseUrl, params.details)
    const topicsApi = getTopics(params.lang, baseUrl)
    const tagsApi = getTags(params.lang, baseUrl)
    const [tagDetails, topics, tags] = await Promise.all([tagsDetailsApi, topicsApi, tagsApi])


    const cleanDescription = (htmlContent) => {
        const plainText = htmlToText(htmlContent)
            .replace(/<p>/g, '')
            .replace(/<\/p>/g, '')
            .replace(/&nbsp;/g, ' ');

        return plainText.length > 150 ? plainText.slice(0, 150) + '...' : plainText;
    };

    const itemListSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        '@id': 'mainEntity',
        url: WEBSITE_BASE_URL + '/reads',
        itemListElement: tagDetails?.data?.articles?.map((post) => {
            return {
                '@context': 'https://schema.org',
                '@type': 'NewsArticle',
                headline: `${post.title}`,
                image: process.env.BLOG_IMAGE_BASE_URL + post.image,
                datePublished: `${post.created_at}`,
                dateModified: `${post.updated_at}` || `${post.created_at}`,
                mainEntityOfPage:
                    WEBSITE_BASE_URL + `/reads/${post.slug}`,
                description: cleanDescription(post.description),
                author: `${post.writer}`,
                publisher: 'HousePointEgyptOrganization',
            };
        }),
    };


    return (
        <>
            <Script
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
            />
            <meta name='robots' content='noindex, nofollow' />
            <meta
                property='og:url'
                content={process.env.mainUrl + `/reads/tags/${params.details}`}
            />
            <link
                rel='alternate'
                hrefLang='ar'
                href={process.env.mainUrl + `/ar/reads/tags/${params.details}`}
                title='House Point Egypt - Real Estate | Reads'
            />
            <link
                rel='alternate'
                hrefLang='x-default'
                href={process.env.mainUrl + `/reads/tags/${params.details}`}
                title='House Point Egypt - Real Estate | Reads'
            />

            <link
                rel='canonical'
                href={process.env.mainUrl + `/reads/tags/${params.details}`}
                key='canonical'
                title='House Point Egypt - Real Estate | Reads'
            />
            <main className='p-2 md:p-5 mt-3'>
                {tagDetails?.status && (
                    <div className='grid lg:grid-cols-3 xl:grid-cols-4 gap-5 '>
                        <div className='lg:col-span-2 xl:col-span-3'>
                            <h1 className='text-xl font-semibold md:text-3xl border-b border-gray-500 mb-5 pb-5'>#{tagDetails.data.name}</h1>
                            <p>{tagDetails.data.description}</p>
                            <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-5 mt-7'>
                                {tagDetails?.data?.articles?.map((item, index) => (
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
