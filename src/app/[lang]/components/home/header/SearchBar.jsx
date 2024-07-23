"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { Select, Option } from "@material-tailwind/react";
import BedsDropdown from './components/BedsDropdown';
import PriceComponent from './components/PriceComponent';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchBarSkeleton from './SearchBarSkeleton';
import dynamic from 'next/dynamic';
const DialogSearchBar = dynamic(() => import('./components/DialogSearchBar'), {
  ssr: false,
});

function SearchBar({ baseUrl, translate, params, data, lang }) {

  const searchParams = useSearchParams()
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState(params?.slug && params?.slug);

  const handleSetCategory = (e) => {
    setCategory(e)
  }


  const [furnitures, setFurnitures] = useState([])


  const handleSetFurnishe = (e) => {
    setFurnishe(e)
  }

  const [locations, setLocations] = useState([])


  const [type, setType] = useState(params?.type ? params?.type : "rent");
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedBedrooms, setSelectedBedrooms] = useState(searchParams.get("beds") ? searchParams.get("beds") : null);
  const [selectedBathrooms, setSelectedBathrooms] = useState(searchParams.get("baths") ? searchParams.get("baths") : null);
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") ? searchParams.get("minPrice") : '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ? searchParams.get("maxPrice") : '');
  const [minPropertyArea, setminPropertyArea] = useState(searchParams.get("minPropertyArea") ? searchParams.get("minPropertyArea") : '');
  const [maxPropertyArea, setmaxPropertyArea] = useState(searchParams.get("maxPropertyArea") ? searchParams.get("maxPropertyArea") : '');
  const [furnishe, setFurnishe] = useState(searchParams.get("furnitureSetting") ? searchParams.get("furnitureSetting") : '');


  const handleSetMinPropertyArea = (e) => {
    setminPropertyArea(e)
  }
  const handleSetMaxPropertyArea = (e) => {
    setmaxPropertyArea(e)
  }

  const toggleDropdown = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleSelectLocation = useCallback((area, subArea = null) => {

    if (subArea) {
      setSearchTerm(subArea.name);
      setSelectedLocation(`${area}/${subArea.slug}`)

    } else {
      setSearchTerm(area.name);
      setSelectedLocation(`${area.slug}`)
    }
    setIsOpen(false);
  }, []);


  const handleInputChange = useCallback((e) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  }, []);

  // beds

  const handleBedroomClick = useCallback((value) => {
    setSelectedBedrooms(value);
  }, []);

  const handleBathroomClick = useCallback((value) => {
    setSelectedBathrooms(value);
  }, []);

  const resetSelections = useCallback(() => {
    setSelectedBedrooms(null);
    setSelectedBathrooms(null);
  }, []);

  // price

  const handleMinPriceSelect = useCallback((price) => {
    setMinPrice(price);
  }, []);

  const handleMaxPriceSelect = useCallback((price) => {
    setMaxPrice(price);
  }, []);


  const resetPrices = useCallback(() => {
    setMinPrice('');
    setMaxPrice('');
  }, []);


  // search

  const router = useRouter()

  const handleSearch = () => {

    const params = new URLSearchParams()

    if (minPrice) {
      params.set("minPrice", minPrice);
    }
    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    }
    if (selectedBedrooms) {
      params.set("beds", selectedBedrooms);
    }
    if (selectedBathrooms) {
      params.set("baths", selectedBathrooms);
    }
    if (furnishe && furnishe !== "finishing") {
      params.set("furnitureSetting", furnishe);
    }
    if (minPropertyArea) {
      params.set("minPropertyArea", minPropertyArea);
    }
    if (maxPropertyArea) {
      params.set("maxPropertyArea", maxPropertyArea);
    }

    router.push(`/${lang}/${type.toLowerCase()}/${category}/${selectedLocation !== null ? selectedLocation : ""}/?${params.toString()}`);
  };


  const fetchData = useCallback(async () => {
    try {
      const [categoriesRes, furnituresRes, locationsRes] = await Promise.all([
        fetch(`${baseUrl}/categories`, {
          headers: { "X-localization": lang },
          cache: 'no-store'
        }),
        fetch(`${baseUrl}/furnitures`, {
          headers: { "X-localization": lang },
          cache: 'no-store'
        }),
        fetch(`${baseUrl}/areas`, {
          headers: { "X-localization": lang },
          cache: 'no-store'
        })
      ]);

      const [categoriesData, furnituresData, locationsData] = await Promise.all([
        categoriesRes.json(),
        furnituresRes.json(),
        locationsRes.json()
      ]);

      if (categoriesData.status) {
        setCategories(categoriesData.data);
        if (!params?.slug) {
          setCategory(categoriesData.data[0]?.slug);
        }
      }

      if (furnituresData.status) {
        setFurnitures(furnituresData.data);
      }

      if (locationsData.status) {
        setLocations(locationsData.data);
      }
    } catch (e) {
      console.error("Failed to fetch data", e);
    }
  }, [baseUrl, lang, params?.slug]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {categories.length > 0 ? (

        <div className='relative searchBar w-full md:px-4 mt-4'>
          <div className="container mx-auto">
            <div className="rounded-xl bg-custom-blue px-3 md:px-6 py-3 shadow-lg">
              <div className='hidden md:flex justify-between items-center'>
                <div>
                  <button className={`me-2 border ${type.toLowerCase() === "rent" ? "bg-custom-blue-darker text-white" : "text-custom-blue-dark bg-white"}  py-2 px-6 hover:opacity-90 rounded-md`} onClick={() => setType("rent")}>{translate.general.components.searchbar.rent}</button>
                  <button className={`me-2 border ${type.toLowerCase() === "sale" ? "bg-custom-blue-darker text-white" : "text-custom-blue-dark bg-white"}  py-2 px-6 hover:opacity-90 rounded-md`} onClick={() => setType("sale")}>{translate.general.components.searchbar.sale}</button>
                </div>
                <span className='text-sm text-white'>
                  {translate.general.components.searchbar.show} ({data?.meta?.total}) {translate.general.components.searchbar.result}
                </span>
              </div>
              <div className="gap-2 grid  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

                {/* location */}

                <div className="relative mt-2 z-20 select-none">
                  <div
                    className="flex items-center p-2 bg-white border border-gray-300 rounded shadow-none "
                    onClick={toggleDropdown}
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="magnifying-glass"
                      className="mx-2"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      width="16"
                      height="16"
                    >
                      <path
                        fill="currentColor"
                        d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"
                      ></path>
                    </svg>
                    <input
                      type="text"
                      className="w-full bg-transparent outline-none border-0"
                      placeholder="Find By Location"
                      value={searchTerm}
                      onChange={handleInputChange}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <svg
                      height="20"
                      width="20"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      focusable="false"
                      className="cursor-pointer"
                    >
                      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                    </svg>
                  </div>
                  {isOpen && (
                    <div className="w-full absolute bg-white border border-gray-300 rounded mt-1">
                      <ul className="max-h-60 overflow-y-auto">
                        {locations.map(location => (
                          <li
                            key={location.name}
                            className="px-2 py-1 block  text-sm"
                          >
                            <span onClick={() => handleSelectLocation(location)} className='block text-base font-semibold py-1 cursor-pointer hover:bg-gray-200'>
                              {location.name}
                            </span>
                            <ul className='p-2'>
                              {location?.subareas?.map((item, index) => (
                                <li onClick={() => handleSelectLocation(location.slug, item)}
                                  className='p-2 hover:bg-gray-200 text-sm cursor-pointer' key={index}>
                                  {item.name}
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* appartement */}

                <div className="hidden md:flex flex-col mt-2">
                  <Select
                    aria-label="category"
                    className='bg-white capitalize border-0 outline-none ring-0 '
                    defaultValue={category}
                    value={category}
                    onChange={(val) => setCategory(val)}
                  >
                    {categories.map((item, index) => (
                      <Option className='capitalize ' key={index} value={item.slug}>{item.name}</Option>
                    ))}
                  </Select>


                </div>

                <BedsDropdown lang={lang} selectedBathrooms={selectedBathrooms} selectedBedrooms={selectedBedrooms} handleBedroomClick={handleBedroomClick} handleBathroomClick={handleBathroomClick} resetSelections={resetSelections} />

                <PriceComponent lang={lang} minPrice={minPrice} maxPrice={maxPrice} handleMinPriceSelect={handleMinPriceSelect} handleMaxPriceSelect={handleMaxPriceSelect} resetPrices={resetPrices} />

                {/* furnished */}
                <div className="hidden md:flex  flex-col mt-2">
                  {furnitures.length > 0 && (
                    <Select
                      aria-label="furnished"
                      className='bg-white capitalize border-0 outline-none ring-0'
                      value={furnishe}
                      onChange={(val) => setFurnishe(val)}
                    >
                      {furnitures.map((item, index) => (
                        <Option className={`capitalize`} key={index} value={item.slug}>{item.name}</Option>
                      ))}
                    </Select>
                  )}
                </div>
              </div>
              <DialogSearchBar
                translate={translate}
                type={type}
                setType={setType}
                category={category}
                categories={categories}
                handleSetCategory={handleSetCategory}
                selectedBedrooms={selectedBedrooms}
                handleBedroomClick={handleBedroomClick}
                selectedBathrooms={selectedBathrooms}
                handleBathroomClick={handleBathroomClick}
                resetSelections={resetSelections}
                minPrice={minPrice}
                maxPrice={maxPrice}
                handleMinPriceSelect={handleMinPriceSelect}
                handleMaxPriceSelect={handleMaxPriceSelect}
                resetPrices={resetPrices}
                furnitures={furnitures}
                furnishe={furnishe}
                handleSetFurnishe={handleSetFurnishe}
                minPropertyArea={minPropertyArea}
                maxPropertyArea={maxPropertyArea}
                handleSetMinPropertyArea={handleSetMinPropertyArea}
                handleSetMaxPropertyArea={handleSetMaxPropertyArea}
                handleSearch={handleSearch}
              />

              <button onClick={handleSearch} className="active:scale-95 mt-6 ms-auto hidden md:block w-full md:w-auto rounded-lg border bg-custom-blue-darker px-8 py-2 font-medium text-white outline-none focus:ring hover:opacity-90 sticky z-20">{translate.general.components.searchbar.search}</button>
            </div>
          </div>
        </div>
      ) : (
        <SearchBarSkeleton />
      )}
      <div onClick={() => setIsOpen(false)} className={`absolute top-0 right-0 bottom-0 left-0 z-10 ${isOpen ? "block" : "hidden"}`}>

      </div>

    </>
  )
}

export default React.memo(SearchBar) 
