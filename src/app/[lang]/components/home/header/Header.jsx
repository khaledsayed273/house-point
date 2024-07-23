import React from 'react'
import SearchBar from "./SearchBar"


function Header({ data ,translate, lang }) {
    const baseUrl= process.env.baseUrl
    return (
        <header className={'flex flex-col items-center justify-center h-fit p-2 md:py-8 text-black md:min-h-fit from-secondary-color to-custom-blue-light bg-gradient-to-r bg-custom-blue md:h-auto'}>
            <div className='flex flex-col items-center justify-center w-full h-full'>
                <h1 className='text-xl font-bold my-4 leading-none tracking-tight text-center lg:text-5xl mb-5 text-white z-[1]'>
                    {translate.pages.home.title}
                </h1>
                <SearchBar lang={lang} baseUrl={baseUrl} data={data} translate={translate}  />
            </div>
        </header>
    )
}

export default Header
