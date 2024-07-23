import { notFound } from "next/navigation";
import SearchBar from "../../components/home/header/SearchBar";
import Section from "../../components/home/Section";
import { getDictionary } from "../../dictionaries";


export async function generateMetadata({ params, searchParams }) {
  const translate = await getDictionary(params.lang)
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
  if (searchParams.beds !== null && searchParams.beds !== undefined) {
    queryString += `filter[beds]=${searchParams.beds}&`;
  }
  if (searchParams.baths !== null && searchParams.baths !== undefined) {
    queryString += `filter[baths]=${searchParams.baths}&`;
  }
  if (searchParams.furnitureSetting !== null && searchParams.furnitureSetting !== undefined) {
    queryString += `filter[furniture_slug]=${searchParams.furnitureSetting}&`;
  }

  queryString = queryString.slice(0, -1);

  const Query = `${url}/properties?filter[category_name]=${params.slug}&${queryString}`

  try {
    const res = await fetch(Query, {
      headers: {
        "X-localization": params.lang
      },
      cache: 'no-store'
    })
    const data = await res.json()
    const slug = params.slug.charAt(0).toUpperCase() + params.slug.slice(1)
    const type = params.type.charAt(0).toUpperCase() + params.type.slice(1)
    return {
      title: `${data.data.meta.total} ${decodeURIComponent(slug)} ${translate.general.components.property_card.for} ${decodeURIComponent(type)} in Cairo Egypt`,
      description: `${data.data.meta.total} ${decodeURIComponent(slug)} ${translate.general.components.property_card.for} ${decodeURIComponent(type)} in Cairo Egypt`,
      openGraph: {
        title: `${data.data.meta.total} ${decodeURIComponent(slug)}  ${translate.general.components.property_card.for} ${decodeURIComponent(type)} in Cairo Egypt`,
        // images: `${data.data.meta.total} ${slug} For ${type} in Cairo Egypt`,
        description: `${data.data.meta.total} ${decodeURIComponent(slug)}  ${translate.general.components.property_card.for} ${decodeURIComponent(type)} in Cairo Egypt`,
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

const getData = async (baseUrl, type, slug, min, max, beds, baths, furniture, lang) => {
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
  if (beds !== null && beds !== undefined) {
    queryString += `filter[beds]=${beds}&`;
  }
  if (baths !== null && baths !== undefined) {
    queryString += `filter[baths]=${baths}&`;
  }
  if (furniture !== null && furniture !== undefined) {
    queryString += `filter[furniture_slug]=${furniture}&`;
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

export default async function Slug({ params, searchParams }) {
  const translate = await getDictionary(params.lang)
  const baseUrl = process.env.baseUrl
  const req = await getData(baseUrl, params.type, params.slug, searchParams.minPrice, searchParams.maxPrice, searchParams.beds, searchParams.baths, searchParams.furnitureSetting, params.lang)
  const data = await req?.data

  return (
    <main>
      <SearchBar lang={params.lang} baseUrl={baseUrl} data={data} params={params} translate={translate} />
      {req?.status && (
        data.data.length > 0 ? (

          <Section lang={params.lang} data={data} translate={translate} />
        ) : (
          <h1 className="text-center mt-44 font-semibold text-lg md:text-xl">Sorry there is no data</h1>
        )
      )}
    </main>
  );
}
