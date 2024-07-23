import React from 'react'
import { getDictionary } from '@/app/[lang]/dictionaries'
import Articles from '../../components/Articles'
import FeatureProperties from '../../components/FeatureProperties'

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


async function page({ params }) {
    const baseUrl = process.env.baseUrl
    const translate = await getDictionary(params.lang)
    const articles = await getArticles(params.lang, baseUrl , params.topicslug)

    return (
        <main className='p-2 md:p-5'>
            {articles.status && (
                <div className='grid lg:grid-cols-3 xl:grid-cols-4 gap-5 '>
                    <div className='lg:col-span-2 xl:col-span-3'>
                        <h1 className='text-xl font-semibold md:text-3xl border-b border-gray-500 mb-5 pb-5'>{articles.data.name}</h1>
                        <p>{articles.data.description}</p>
                        <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-5 mt-7'>
                            {articles?.data?.articles?.map((item , index) => (
                                <Articles lang={params.lang} key={index} item={item} translate={translate} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className='bg-[#e5e7eb] p-2 md:p-3'>
                            <FeatureProperties lang={params.lang} baseUrl={baseUrl} translate={translate}/>
                        </div>
                    </div>
                </div>
            )}


        </main>
    )
}

export default page
