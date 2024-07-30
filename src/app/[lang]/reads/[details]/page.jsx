/* eslint-disable @next/next/inline-script-id */
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

export async function generateMetadata({ params }) {
  const url = process.env.baseUrl
  try {
    const res = await fetch(`${url}/articles/${params.details}`, {
      headers: {
        "X-localization": params.lang
      },
      cache: 'no-store'
    })
    const data = await res.json()
    const details = await data.data.article
    const keywords = details.keywords.split(",")
    return {
      title: details.title,
      description: details.title,
      keywords: keywords,

      openGraph: {
        title: details.title,
        images: [details.image],
        description: details.title,
        keywords: keywords,
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

const getDetails = async (lang, baseUrl, slug) => {
  try {
    const res = await fetch(`${baseUrl}/articles/${slug}`, {
      headers: {
        "X-localization": lang
      },
      cache: 'no-store'
    })
    const data = await res.json()
    return data

  } catch (e) {
    return e
  }
}

async function page({ params }) {

  const baseUrl = process.env.baseUrl
  const detailsApi = getDetails(params.lang, baseUrl, params.details)

  const [details] = await Promise.all([detailsApi])

  if (!details?.status) {
    notFound()
  }

  return (
    <>
      <meta name='robots' content='noindex, nofollow' />

      <meta
        property='og:url'
        content={process.env.mainUrl + `/reads/${details.data.article.slug}`}
      />
      <link
        rel='canonical'
        href={process.env.mainUrl + "/" + params.lang + `/reads/${details.data.article.slug}`}
        key='canonical'
        title='House Point Egypt Home Page'
      />

      <link
        rel='alternate'
        hrefLang='ar'
        href={process.env.mainUrl + `/ar/reads/${details.data.article.slug}`}
        title='House Point Egypt Home Page'
      />
      <link
        rel='alternate'
        hrefLang='x-default'
        href={process.env.mainUrl + "/" + params.lang + `/reads/${details.data.article.slug}`}
        title='House Point Egypt Home Page'
      />
      <meta property='og:image' content={process.env.BLOG_IMAGE_BASE_URL + details.data.article.image} />

      <main className='p-2 md:p-5'>
        {details?.status && (
          <>
            <h1 className='text-xl font-semibold md:text-3xl border-b border-gray-500 mb-5 pb-5'>{details.data.article.title}</h1>

            <div className='mb-3 capitalize text-gray-600 text-sm'>
              <Link href={`/${params.lang}/reads/topics/${details.data.article.topic.slug}`} className='text-blue-400 underline'>{details.data.article.topic.slug} </Link>
              | {details.data.article.readTime} min read
              | written By {details.data.article.writer}
            </div>
            <div >
              <div dangerouslySetInnerHTML={{ __html: details.data.article.description }}></div>
              <div className='my-3 border-y py-5  border-gray-500'>
                <h3 className='text-xl font-semibold mb-3'>Articles Tags</h3>
                <div className='flex flex-wrap gap-3'>
                  {details.data.article.tag?.map((item, index) => (
                    <Link key={index} className='bg-[#095668] text-white py-1 px-2.5 rounded-md hover:opacity-80' href={`/${params.lang}/reads/tags/${item.slug}`}># {item.name}</Link>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  )
}

export default page
