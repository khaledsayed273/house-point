import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

async function Articles({translate , item , lang}) {

    return (
        <div className='custom-gradient p-2.5'>
            <div className='flex justify-around items-center text-sm mb-2 pt-1.5'>
                <span className='font-semibold capitalize'>{translate.pages.blog.topic}</span>
                <Link href={`/${lang}/reads/topics/${item.topic.slug}`} className='bg-custom-blue text-white p-1.5 rounded-sm text-xs hover:opacity-80'>{item.topic.name}</Link>
            </div>

            <Link href={`/${lang}/reads/${item.slug}`}>
                <div className='relative h-56 w-full'>
                    <Image sizes="(min-width: 808px) 50vw, 100vw" placeholder='blur' blurDataURL={item.placeholder} src={item.image} fill alt='img' />
                </div>
                    <h3 className='bg-[#000000b3] text-white text-center text-xs  p-3 font-semibold rounded-b-2xl'>{item.title}</h3>
                <button className='ms-auto mt-2 block text-xs px-5 py-1 border-2 hover:bg-custom-blue hover:text-white rounded-md tracking-[.17em] '>Read More</button>
                <div className='flex justify-between items-center px-2 text-sm'>
                    <div>
                        <p className='BlogIndex_postAuthor__NyWX4 relative text-[#2f4f4f] text-[0.70rem]' data-by={translate.pages.blog.authby}>
                            {item.writer}
                        </p>
                        <p className='text-[0.70rem] text-gray-600'>{item.created_at}</p>
                    </div>
                    <span className='text-yellow-900 capitalize text-[0.70rem]'>{item.readTime} MIN read</span>

                </div>
            </Link>



        </div>
    )
}

export default Articles
