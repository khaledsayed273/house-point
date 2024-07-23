import Link from 'next/link'
import React from 'react'

const getAboutUs = async (lang, baseUrl) => {
    try {
        const res = await fetch(`${baseUrl}/abouts`, {
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

const getLinks = async (lang, baseUrl) => {
    try {
        const res = await fetch(`${baseUrl}/footerlinks`, {
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

async function Footer({ lang }) {
    const baseUrl = process.env.baseUrl
    const aboutData = await getAboutUs(lang, baseUrl)
    const LinksData = await getLinks(lang, baseUrl)
    return (
        <footer className='bg-custom-blue text-white'>
            <div className="grid lg:grid-cols-3 xl:grid-cols-3 py-5 p-3 2xl:grid-cols-5 md:px-5 md:py-10 gap-7">
                <div className='lg:col-span-3 2xl:col-span-2'>
                    <h3 className='text-xl md:text-2xl font-semibold mb-3'>About Us</h3>
                    <div className='text-sm leading-6' dangerouslySetInnerHTML={{ __html: aboutData?.data?.description }}>
                    </div>
                </div>
                {LinksData?.status && (
                    <ul>
                        <h3 className='md:text-2xl font-semibold mb-3'>Useful Links</h3>
                        {LinksData.data.slice(0, 5).map((item, index) => (
                            <li className='my-2' key={index}><Link className='underline hover:opacity-70' href={`${lang}/${item.link}`}>{item.title}</Link></li>
                        ))}
                    </ul>
                )}
                {LinksData?.status && (
                    <ul className='md:mt-9'>
                        {LinksData.data.slice(5, 10).map((item, index) => (
                            <li className='my-2' key={index}><Link className='underline hover:opacity-70' href={`${lang}/${item.link}`}>{item.title}</Link></li>
                        ))}
                    </ul>
                )}
                {LinksData?.status && (
                    <ul className='md:mt-9'>
                        {LinksData.data.slice(10, 15).map((item, index) => (
                            <li className='my-2' key={index}><Link className='underline hover:opacity-70' href={`${lang}/${item.link}`}>{item.title}</Link></li>
                        ))}
                    </ul>
                )}

            </div>
        </footer>
    )
}

export default Footer
