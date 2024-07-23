import SearchBar from '@/app/[lang]/components/home/header/SearchBar';
import Section from '@/app/[lang]/components/home/Section';
import { getDictionary } from '@/app/[lang]/dictionaries';
import React from 'react'

export async function generateMetadata({ params }) {

  let queryString = ""
  const baseUrl = process.env.baseUrl;


  if (params.type !== null && params.type !== undefined) {
    queryString += `filter[type]=${params.type}&`;
  }
  if (params.area !== null && params.area !== undefined) {
    queryString += `filter[area_slug]=${params.area}&`;
  }
  if (params.subarea !== null && params.subarea !== undefined) {
    queryString += `filter[subarea_slug]=${params.subarea}&`;
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
      title: `${data.data.meta.total} Property Type For ${params.type} in ${params.area}, ${params.subarea} ,Cairo Egypt | House Point`,
      description: `${data.data.meta.total} Property Type For ${params.type} in ${params.area}, ${params.subarea} ,Cairo Egypt | House Point`,
      openGraph: {
        title: `${data.data.meta.total} Property Type For ${params.type} in ${params.area}, ${params.subarea} ,Cairo Egypt | House Point`,
        // images: `${data.data.meta.total} ${params.slug} For ${params.type} in Cairo Egypt`,
        description: `${data.data.meta.total} Property Type For ${params.type} in ${params.area}, ${params.subarea} ,Cairo Egypt | House Point`,
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

const getSubArea = async (baseUrl, lang, type, area, subarea) => {
  let queryString = ""

  if (type !== null && type !== undefined) {
    queryString += `filter[type]=${type}&`;
  }
  if (area !== null && area !== undefined) {
    queryString += `filter[area_slug]=${area}&`;
  }
  if (subarea !== null && subarea !== undefined) {
    queryString += `filter[subarea_slug]=${subarea}&`;
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


async function page({ params }) {
  const baseUrl = process.env.baseUrl

  const translate = await getDictionary(params.lang)

  const data = await getSubArea(baseUrl, params.lang, params.type, params.area, params.subarea)
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
