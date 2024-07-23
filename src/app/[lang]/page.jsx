import Link from "next/link";
import Cards from "./components/cards/Cards";
import Header from "./components/home/header/Header";
import { getDictionary } from "./dictionaries";
import Articles from "./reads/components/Articles";
import Image from "next/image";
import linkIcon from "../../../public/images/linkIcon.svg"

export async function generateMetadata() {
  const url = process.env.baseUrl
  try {
    const res = await fetch(`${url}/properties?filter[category_name]=apartments`)
    const data = await res.json()
    const details = await data.data
    return {
      title: details.title,
      description: details.description,
      openGraph: {
        title: details.title,
        images: [details.images[0].image],
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

const getDetails = async (lang, baseUrl) => {
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

export default async function Home({ params }) {
  const translate = await getDictionary(params.lang)
  const req = await getDetails(params.lang, process.env.baseUrl)
  const data = await req?.data
  const toplinks = await getToplinks(params.lang, process.env.baseUrl)
  const primeLocations = await getLocations(params.lang, process.env.baseUrl)
  return (
    <main>
      <Header translate={translate} lang={params.lang} />
      {req?.status && (
        <>
          <h2 className="text-center my-5 md:text-2xl font-semibold">{translate.pages.home.titleRent}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 px-2 md:px-5 xl:px-10 my-10">
            {data.rent.map(item => (
              <Cards key={item.slug} lang={params.lang} item={item} translate={translate} />
            ))}
          </div>
          <div className="flex justify-center items-center ">
            <Link className="mx-auto text-sm md:text-xl text-white bg-black  py-3 px-4 rounded-md hover:opacity-80" href={`${params.lang}/rent/properties`}>{translate.pages.home.exploreMoreRent}</Link>
          </div>
          <h2 className="text-center my-5 md:text-2xl font-semibold">{translate.pages.home.titleSale}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 px-2 md:px-5 xl:px-10 my-10">
            {data.sale.map(item => (
              <Cards key={item.slug} lang={params.lang} item={item} translate={translate} />
            ))}
          </div>
          <div className="flex justify-center items-center ">
            <Link className="mx-auto text-sm md:text-xl text-white bg-black  py-3 px-4 rounded-md hover:opacity-80" href={`${params.lang}/sale/properties`}>{translate.pages.home.exploreMoreSale}</Link>
          </div>
          <div className="container mx-auto my-10">
            <h3 className="text-center my-5 text-xl font-semibold">LATEST BLOGS</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mt-10">
              {data.articles.map((item, index) => (
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
  );
}
