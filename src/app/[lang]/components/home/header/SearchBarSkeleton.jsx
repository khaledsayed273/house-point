import React from 'react'

function SearchBarSkeleton() {
    return (
        <div className="container mx-auto">
            <div className="rounded-xl bg-custom-blue px-3 md:px-6 py-3 shadow-lg animate-pulse">
                <div className='hidden md:flex justify-between items-center'>
                    <div>
                        <div className="hidden md:inline-block me-2 h-10 w-28 bg-gray-300 rounded-md"></div>
                        <div className="hidden md:inline-block h-10 w-28 bg-gray-300 rounded-md"></div>
                    </div>
                    <span className='text-sm text-gray-300 bg-gray-300 h-6 w-24 rounded-md'></span>
                </div>
                <div className="gap-2 grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-4">
                    {/* Location Skeleton */}
                    <div className="relative mt-2 z-20">
                        <div className="flex items-center p-2 bg-gray-300 rounded shadow-none h-10 w-full">
                            <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                            <div className="w-full ml-2 h-6 bg-gray-400 rounded"></div>
                            <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                        </div>
                    </div>
                    {/* Appartement Skeleton */}
                    <div className="hidden md:flex flex-col mt-2">
                        <div className="h-10 bg-gray-300 rounded-md"></div>
                    </div>
                    {/* Beds and Baths Skeleton */}
                    <div className="hidden md:flex flex-col mt-2">
                        <div className="h-10 bg-gray-300 rounded-md"></div>
                    </div>
                    {/* Price Skeleton */}
                    <div className="hidden md:flex flex-col mt-2">
                        <div className="h-10 bg-gray-300 rounded-md"></div>
                    </div>
                    {/* Furnished Skeleton */}
                    <div className="hidden md:flex flex-col mt-2">
                        <div className="h-10 bg-gray-300 rounded-md"></div>
                    </div>
                </div>
                <div className="mt-6 flex justify-end">
                    <div className="h-10 w-32 bg-gray-300 rounded-md"></div>
                </div>
            </div>
        </div>
    )
}

export default SearchBarSkeleton
