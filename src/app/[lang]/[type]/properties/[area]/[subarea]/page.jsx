/* eslint-disable @next/next/inline-script-id */
import SearchBar from '@/app/[lang]/components/home/header/SearchBar';
import Section from '@/app/[lang]/components/home/Section';
import Pagination from '@/app/[lang]/components/Pagination';
import { getDictionary } from '@/app/[lang]/dictionaries';
import Script from 'next/script';
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
  if (params.page !== null && params.page !== undefined) {
    queryString += `page=${params.page}&`;
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

const getSubArea = async (baseUrl, lang, type, area, subarea, page) => {
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
  if (page !== null && page !== undefined) {
    queryString += `page=${page}&`;
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

const getPageTitle = async (baseUrl, type, lang, area, subarea) => {
  try {
    const res = await fetch(`${baseUrl}/pagetitles?link=/${type}/properties/${area}/${subarea}`, {
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
  const baseUrl = process.env.baseUrl
  const mainUrl = process.env.mainUrl

  const translate = await getDictionary(params.lang)

  const data = await getSubArea(baseUrl, params.lang, params.type, params.area, params.subarea, searchParams.page)
  const pageTitle = await getPageTitle(baseUrl, params.type, params.lang, params.area, params.subarea)


  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': 'mainEntity',
    url: `${mainUrl}/${params.type}`,
    itemListElement: data?.data?.data?.map((property, index) => ({
      '@type': `${property.title.slice(0, -1)}`,
      '@id': `ReferenceNumber:${property.refNumber}`,
      name: `${property.title}`,
      image: `${baseUrl}/original/${property.image.image}`,
      url: `${mainUrl}/${property.title.toLowerCase()}/${property.area}/${property.subarea.name.toLowerCase()}/${property.title.toLowerCase()}-${property.refNumber}`,
      tourBookingPage: `${mainUrl}/${property.title.toLowerCase()}/${property.area}/${property.subarea.name.toLowerCase()}/${property.title.toLowerCase()}-${property.refNumber}`,
      address: `${property.subarea.name}, ${property.area}, EG`,
      telephone: '+201221409530',
      floorSize: 'QuantitativeValue',
      floorSize: 'sqm',
    })),
  };


  const propertySchema = data?.data?.data?.map((property) => ({
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

  if (data?.status) {
    return (
      <>
        <meta name='robots' content='index, follow' />
        <link
          rel='canonical'
          href={`${mainUrl}/${params.lang}/${params.type}/properties/${params.area}/${params.subarea}`}
          key='canonical'
          title='House Point Egypt - Real Estate'
        />
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(propertySchema) }}
        />
        <main>
          <SearchBar lang={params.lang} baseUrl={baseUrl} data={data.data} params={params} translate={translate} />
          {data.data.data.length !== 0 ? (
            <div>
              <h2 className="text-center my-5 md:text-2xl font-medium">{pageTitle?.data?.title}</h2>
              <p className="text-center my-5 md:text-lg font-base">{translate.general.components.searchbar.searchReads}</p>

              <Section lang={params.lang} translate={translate} data={data.data} />
              <Pagination lang={params.lang} data={data.data} />

            </div>
          ) : (
            <div>
              <h1 className='mt-36 text-center font-semibold text-xl capitalize'>
                Sorry, this page is not found
              </h1>
            </div>
          )}
        </main>
      </>
    );
  }
}

export default page
