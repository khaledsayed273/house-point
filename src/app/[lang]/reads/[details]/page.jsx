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
    const details = await data.data
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
      <main className='p-2 md:p-5'>
        {details?.status && (
          <>
            <h1 className='text-xl font-semibold md:text-3xl border-b border-gray-500 mb-5 pb-5'>{details.data.title}</h1>

            <div className='mb-3 capitalize text-gray-600 text-sm'>
              <Link href={`/${params.lang}/reads/topics/${details.data.topic.slug}`} className='text-blue-400 underline'>{details.data.topic.slug} </Link>
              | {details.data.readTime} min read
              | written By {details.data.writer}
            </div>
            <div className='grid lg:grid-cols-3 gap-5'>
              <div className='lg:col-span-2'>
                <div dangerouslySetInnerHTML={{ __html: details.data.description }}></div>
                <div className='my-3 border-y py-5  border-gray-500'>
                  <h3 className='text-xl font-semibold mb-3'>Articles Tags</h3>
                  <div className='flex flex-wrap gap-3'>
                    {details.data.tag?.map((item, index) => (
                      <Link key={index} className='bg-[#095668] text-white py-1 px-2.5 rounded-md hover:opacity-80' href={`/${params.lang}/reads/tags/${item.slug}`}># {item.name}</Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className='bg-red-700'>

              </div>
            </div>
          </>
        )}


      </main>
    </>
  )
}

export default page
