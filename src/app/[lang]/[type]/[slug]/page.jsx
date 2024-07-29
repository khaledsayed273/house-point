/* eslint-disable @next/next/inline-script-id */
import Script from "next/script";
import SearchBar from "../../components/home/header/SearchBar";
import Section from "../../components/home/Section";
import Pagination from "../../components/Pagination";
import { getDictionary } from "../../dictionaries";


export async function generateMetadata({ params, searchParams }) {
  const url = process.env.baseUrl



  let queryString = '';

  if (params.type !== null && params.type !== undefined) {

    queryString += `filter[type]=${params.type}&`;
  }
  if (searchParams.minPrice !== null && searchParams.minPrice !== undefined) {
    queryString += `filter[min_price]=${searchParams.minPrice}&`;
  }
  if (searchParams.maxPrice !== null && searchParams.maxPrice !== undefined) {
    queryString += `filter[max_price]=${searchParams.maxPrice}&`;
  }
  if (searchParams.minPropertyArea !== null && searchParams.minPropertyArea !== undefined) {
    queryString += `filter[min_area]=${searchParams.minPropertyArea}&`;
  }
  if (searchParams.maxPropertyArea !== null && searchParams.maxPropertyArea !== undefined) {
    queryString += `filter[max_area]=${searchParams.maxPropertyArea}&`;
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
  if (searchParams.page !== null && searchParams.page !== undefined) {
    queryString += `page=${searchParams.page}&`;
  }


  queryString = queryString.slice(0, -1);

  const ApiUrl = `${url}/properties?${queryString}`

  const Query = `${url}/metalinks?link=/${params.type}/${params.slug}`


  try {
    const [dataResponse, metaLinkResponse] = await Promise.all([
      fetch(`${ApiUrl}`, {
        headers: {
          "X-localization": params.lang
        },
        next: { revalidate: 3600 }
      }),
      fetch(`${Query}`, {
        headers: {
          "X-localization": params.lang
        },
        next: { revalidate: 3600 }
      })
    ]);
    const data = await dataResponse.json();
    const resMetaLink = await metaLinkResponse.json();

    const metaLink = await resMetaLink.data
    const keywords = metaLink.keywords.split(",")
    return {
      title: `${data.data.meta.total} ${metaLink.title}`,
      description: `${data.data.meta.total} ${metaLink.description}`,
      keywords: keywords,
      openGraph: {
        title: `${data.data.meta.total} ${metaLink.title}`,
        description: `${data.data.meta.total} ${metaLink.description}`,
        keywords: keywords
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

const getData = async (baseUrl, type, slug, min, max, minPropertyArea, maxPropertyArea, beds, baths, furniture, lang, page) => {
  let queryString = '';

  if (type !== null && type !== undefined) {

    queryString += `filter[type]=${type}&`;
  }
  if (min !== null && min !== undefined) {
    queryString += `filter[min_price]=${min}&`;
  }
  if (max !== null && max !== undefined) {
    queryString += `filter[max_price]=${max}&`;
  }
  if (minPropertyArea !== null && minPropertyArea !== undefined) {
    queryString += `filter[min_area]=${minPropertyArea}&`;
  }
  if (maxPropertyArea !== null && maxPropertyArea !== undefined) {
    queryString += `filter[max_area]=${maxPropertyArea}&`;
  }
  if (beds !== null && beds !== undefined) {
    queryString += `filter[beds]=${beds}&`;
  }
  if (baths !== null && baths !== undefined) {
    queryString += `filter[baths]=${baths}&`;
  }
  if (furniture !== null && furniture !== undefined) {
    queryString += `filter[furniture_slug]=${furniture}&`;
  }
  if (page !== null && page !== undefined) {
    queryString += `page=${page}&`;
  }

  // Remove the trailing '&' if it exists
  queryString = queryString.slice(0, -1);

  const Query = `${baseUrl}/properties?filter[category_name]=${slug}&${queryString}`

  try {
    const res = await fetch(Query, {
      headers: {
        "X-localization": lang
      },
      cache: 'no-store'
    });
    const data = await res.json();
    return data;
  } catch (e) {
    return e

  }
}

const getPageTitle = async (baseUrl, type, slug, lang) => {
  try {
    const res = await fetch(`${baseUrl}/pagetitles?link=/${type}/${slug}`, {
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

export default async function Slug({ params, searchParams }) {
  const translate = await getDictionary(params.lang)
  const baseUrl = process.env.baseUrl
  const mainUrl = process.env.mainUrl
  const req = await getData(baseUrl, params.type, params.slug, searchParams.minPrice, searchParams.maxPrice, searchParams.minPropertyArea, searchParams.maxPropertyArea, searchParams.beds, searchParams.baths, searchParams.furnitureSetting, params.lang, searchParams.page)
  const pageTitle = await getPageTitle(baseUrl, params.type, params.slug, params.lang)
  const data = await req?.data


  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': 'mainEntity',
    url: `${mainUrl}/${params.type}`,
    itemListElement: data?.data?.map((property, index) => ({
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


  const propertySchema = data?.data?.map((property) => ({
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

  return (
    <>
      <meta name='robots' content='index, follow' />
      <link
        rel='canonical'
        href={`${mainUrl}/${params.lang}/${params.type}/${params.slug}`}
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
      <main className="min-h-screen">
        <SearchBar lang={params.lang} baseUrl={baseUrl} data={data} params={params} translate={translate} />
        {req?.status && (
          data.data.length > 0 ? (
            <>
              <h2 className="text-center my-5 md:text-2xl font-medium">{pageTitle?.data?.title}</h2>
              <p className="text-center my-5 md:text-lg font-base">{translate.general.components.searchbar.searchReads}</p>
              <Section lang={params.lang} data={data} translate={translate} />
            </>
          ) : (
            <h1 className="text-center mt-44 font-semibold text-lg md:text-xl">Sorry there is no data</h1>
          )
        )}
        <Pagination lang={params.lang} data={data} />
      </main>
    </>
  );
}
