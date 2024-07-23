import React from 'react'

function SearchForm() {
    return (
        <form
            className='w-fit border my-4 lg:my-0 border-custom-blue rounded-s bg-white flex'
            
        >
            <input
                type='text'
                placeholder='search by ref'
                className='px-2 py-1 border outline-custom-blue lg:w-[150px] flex'
                // onChange={(e) => setSearchByRef(e.target.value)}
            />
            <button className='bg-custom-blue text-white px-4 py-1 hover:opacity-70'>
                Find
            </button>
        </form>
    )
}

export default SearchForm
