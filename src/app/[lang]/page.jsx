/* eslint-disable @next/next/inline-script-id */
import Link from "next/link";
import Cards from "./components/cards/Cards";
import Header from "./components/home/header/Header";
import { getDictionary } from "./dictionaries";
import Articles from "./reads/components/Articles";
import Image from "next/image";
import linkIcon from "../../../public/images/linkIcon.svg"
import Script from "next/script";

export async function generateMetadata() {
  const url = process.env.baseUrl
  try {
    const res = await fetch(`${url}/metalinks?link=/`)
    const data = await res.json()
    const details = await data.data

    const keywords = details.keywords.split(",")

    return {
      title: details.title,
      description: details.description,
      keywords: keywords,
      openGraph: {
        title: details.title,
        description: details.description,
        keywords: keywords
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

const getData = async (lang, baseUrl) => {
  try {
    const res = await fetch(`${baseUrl}/properties/page/home`, {
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

const getToplinks = async (lang, baseUrl) => {
  try {
    const res = await fetch(`${baseUrl}/toplinks`, {
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

const getLocations = async (lang, baseUrl) => {
  try {
    const res = await fetch(`${baseUrl}/locations`, {
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

const getSocial = async (lang, baseUrl) => {
  try {
    const res = await fetch(`${baseUrl}/socials`, {
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

export default async function Home({ params }) {
  const translate = await getDictionary(params.lang)
  const dataApi = getData(params.lang, process.env.baseUrl)
  const linksApi = getToplinks(params.lang, process.env.baseUrl)
  const primeLocationApi = getLocations(params.lang, process.env.baseUrl)
  const socialApi = getSocial(params.lang, process.env.baseUrl)
  const [data, toplinks, primeLocations] = await Promise.all([dataApi, linksApi, primeLocationApi, socialApi])
  const WEBSITE_BASE_URL = process.env.mainUrl

  const itemListSchemaSale = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': '@mainEntity',
    url: process.env.mainUrl,
    itemListElement: data?.data?.sale?.map((property) => {
      return {
        '@context': 'https://schema.org',
        '@type': `${property?.title.slice(0, -1)}`,
        '@id': `ReferenceNumber:${property?.refNumber}`,
        name: `${property?.title}`,
        image: process.env.baseUrl + 'original/' + property?.image.image,
        url:
          process.env.mainUrl +
          `/${property?.title.toLowerCase()}/${property?.area}/${property?.subarea?.name.toLowerCase()}/${property.title.toLowerCase()}-${property.refNumber
          }`,
        tourBookingPage:
          process.env.mainUrl +
          `/${property.title.toLowerCase()}/${property.area}/${property.subarea.name.toLowerCase()}/${property.title.toLowerCase()}-${property.refNumber
          }`,
        address: `${property.subarea.name}, ${property.area}, EG`,
        telephone: '+201221409530',
        floorSize: 'QuantitativeValue',
        floorSize: 'sqm',
      };
    }),
  };

  const itemListSchemaRent = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': '@mainEntity',
    url: process.env.mainUrl,
    itemListElement: data?.data?.sale.map((property) => {
      return {
        '@context': 'https://schema.org',
        '@type': `${property.title.slice(0, -1)}`,
        '@id': `ReferenceNumber:${property.refNumber}`,
        name: `${property.title}`,
        image: process.env.mainUrl + 'original/' + property.image.image,
        url:
          process.env.mainUrl +
          `/${property.title.toLowerCase()}/${property.area}/${property.subarea.name.toLowerCase()}/${property.title.toLowerCase()}-${property.refNumber
          }`,
        tourBookingPage:
          process.env.mainUrl +
          `/${property.title.toLowerCase()}/${property.area}/${property.subarea.name.toLowerCase()}/${property.title.toLowerCase()}-${property.refNumber
          }`,
        address: `${property.subarea.name}, ${property.area}, EG`,
        telephone: '+201221409530',
        floorSize: 'QuantitativeValue',
        floorSize: 'sqm',
      };
    }),
  };

  const propertySchemaSale = data?.data?.sale.map((property) => {
    return {
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
    };
  });

  const propertySchemaRent = data?.data?.rent.map((property) => {
    return {
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
    };
  });

  return (

    <>
      <Script
        strategy="afterInteractive"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchemaSale) }}
      />
      <Script
        strategy="afterInteractive"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchemaRent) }}
      />
      <Script
        strategy="afterInteractive"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(propertySchemaRent) }}
      />
      <Script
        strategy="afterInteractive"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(propertySchemaSale) }}
      />

      <meta name='robots' content='index, follow' />

      <meta property='og:url' content={WEBSITE_BASE_URL} />
      <link
        rel='alternate'
        hrefLang='x-default'
        href={WEBSITE_BASE_URL + `/`}
        title='House Point Egypt - Real Estate | Home'
      />
      <link
        rel='alternate'
        hrefLang='ar'
        href={WEBSITE_BASE_URL + `/ar/`}
        title='House Point Egypt - Real Estate | الصفحة الرئيسية'
      />
      <link
        rel='canonical'
        href={`${WEBSITE_BASE_URL}/${params.lang}`}
        key='canonical'
        title='House Point Egypt - Real Estate | Home'
      />

      <main>
        <Header translate={translate} lang={params.lang} />
        {data?.status && (
          <>
            <h2 className="text-center my-5 md:text-2xl font-medium">{translate.pages.home.titleRent}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 px-2 md:px-5 xl:px-10 my-10">
              {data.data.rent.map((item, index) => (
                <Cards key={index} lang={params.lang} item={item} translate={translate} />
              ))}
            </div>
            <div className="flex justify-center items-center ">
              <Link className="mx-auto text-sm md:text-xl text-white bg-black  py-3 px-4 rounded-md hover:opacity-80" href={`${params.lang}/rent/properties`}>{translate.pages.home.exploreMoreRent}</Link>
            </div>
            <h2 className="text-center my-5 md:text-2xl font-medium">{translate.pages.home.titleSale}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4  gap-5 px-2 md:px-5 xl:px-10 my-10">
              {data.data.sale.map((item, index) => (
                <Cards key={index} lang={params.lang} item={item} translate={translate} />
              ))}
            </div>
            <div className="flex justify-center items-center ">
              <Link className="mx-auto text-sm md:text-xl text-white bg-black  py-3 px-4 rounded-md hover:opacity-80" href={`${params.lang}/sale/properties`}>{translate.pages.home.exploreMoreSale}</Link>
            </div>
            <div className="container mx-auto my-10">
              <h3 className="text-center my-5 text-xl font-medium">LATEST BLOGS</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7 mt-10">
                {data.data.articles.map((item, index) => (
                  <Articles key={index} item={item} translate={translate} lang={params.lang} />
                ))}
              </div>
            </div>
          </>
        )}

        {toplinks?.status && (
          <div className="px-2 md:p-5 py-7 border">
            <h3 className="text-center text-custom-blue-dark font-semibold md:text-xl">{params.lang === "en" ? "Most Popular Searches" : "الاكثر بحثا"} </h3>
            <div className="mt-2 p-2 grid grid-cols-2 gap-5 md:gap-0">
              {toplinks.data.map((item, index) => (
                <Link key={index} className="text-custom-blue-dark text-sm md:text-base font-medium mt-0.5 flex hover:underline" href={`${params.lang}/${item.link}`}>
                  <Image className="me-1.5" src={linkIcon} alt="icon" sizes="(min-width:992px) 100vw ,50vw" />
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        {primeLocations?.status && (
          <div className="px-2 md:p-5 py-7 border">
            <h3 className="text-center text-custom-blue-dark font-semibold md:text-xl">{params.lang === "en" ? "Prime Locations" : "الاماكن المتاحة"} </h3>
            {primeLocations.data.map((item, index) => (
              <div key={index}>
                <Link href={`${params.lang}/rent/properties/${item.slug}`} className="hover:underline flex justify-between items-center text-sm md:text-base border-b-2 pb-2">
                  <div className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    <span className="capitalize ms-1 text-custom-blue-dark font-semibold">{item.name}</span>
                  </div>
                  <span className="bg-[#c5b59e] px-2 rounded-sm">{item.properties}</span>
                </Link>
                <ul className="px-2 md:px-3 py-1">
                  {item.subarea.map((itemSubArea, indexSubArea) => (
                    <li key={indexSubArea}>
                      <Link href={`${params.lang}/rent/properties/${item.slug}/${itemSubArea.slug}`} className="hover:underline flex justify-between items-center text-sm md:text-base  border-b-2 pb-2">
                        <div className="flex">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                          </svg>
                          <span className="capitalize ms-1 text-custom-blue-dark font-semibold">{itemSubArea.name}</span>
                        </div>
                        <span className="bg-[#c5b59e] px-2 rounded-sm">{itemSubArea.properties}</span>
                      </Link>
                    </li>
                  ))}

                </ul>
              </div>

            ))}

          </div>

        )}


      </main>
    </>
  );
}
