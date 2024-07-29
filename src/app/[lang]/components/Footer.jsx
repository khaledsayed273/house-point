import Link from 'next/link'
import React from 'react'
import facebook from "../../../../public/assets/facebooksq.png"
import twitter from "../../../../public/assets/twitter.png"
import instagram from "../../../../public/assets/instagram.png"
import linkedin from "../../../../public/assets/linkedin.png"
import pinterest from "../../../../public/assets/pinterest.png"
import telegram from "../../../../public/assets/telegram.png"
import tiktok from "../../../../public/assets/tiktok.webp"
import youtube from "../../../../public/assets/youtube.png"
import Image from 'next/image'

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

const getSocials = async (lang, baseUrl) => {
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

async function Footer({ lang }) {
    const baseUrl = process.env.baseUrl
    const aboutData = await getAboutUs(lang, baseUrl)
    const LinksData = await getLinks(lang, baseUrl)
    const socials = await getSocials(lang, baseUrl)
    const description = aboutData?.data?.description || "";
    const markup = { __html: description };

    return (
        <footer className='bg-custom-blue text-white p-1'>
            <div className="grid lg:grid-cols-3 xl:grid-cols-3 py-5 p-3 2xl:grid-cols-5 md:px-5 md:pt-10 gap-7">
                <div className='lg:col-span-3 2xl:col-span-2'>
                    <h3 className='text-xl md:text-2xl font-semibold mb-3'>About Us</h3>
                    <div className='text-sm leading-6' dangerouslySetInnerHTML={markup}>
                    </div>
                </div>
                {LinksData?.status && (
                    <ul>
                        <h3 className='md:text-2xl font-semibold mb-3'>Useful Links</h3>
                        {LinksData.data.slice(0, 5).map((item, index) => (
                            <li className='my-2' key={index}><Link className='underline hover:opacity-70 flex items-center' href={`/${lang}/${item.link}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 me-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                                {item.title}
                            </Link></li>
                        ))}
                    </ul>
                )}
                {LinksData?.status && (
                    <ul className='md:mt-9'>
                        {LinksData.data.slice(5, 10).map((item, index) => (
                            <li className='my-2' key={index}><Link className='underline hover:opacity-70 flex items-center' href={`/${lang}/${item.link}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 me-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                                {item.title}
                            </Link>
                            </li>
                        ))}
                    </ul>
                )}
                {LinksData?.status && (
                    <ul className='md:mt-9'>
                        {LinksData.data.slice(10, 15).map((item, index) => (
                            <li className='my-2' key={index}>
                                <Link className='underline hover:opacity-70 flex items-center' href={`/${lang}/${item.link}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 me-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {socials?.status && (
                <div className='px-5 mb-5'>
                    {socials.data[0].social === "facebook" && (
                        <Link className='me-3 inline-block' target='_blank' href={socials.data[0].url}>
                            <Image className='hover:rotate-[360deg] transition-all duration-300' width={35} src={facebook} alt='facebook' />
                        </Link>
                    )}
                    {socials.data[1].social === "twitter" && (
                        <Link className='me-3 inline-block' target='_blank' href={socials.data[1].url}>
                            <Image className='hover:rotate-[360deg] transition-all duration-300' width={35} src={twitter} alt='twitter' />
                        </Link>
                    )}
                    {socials.data[2].social === "instagram" && (
                        <Link className='me-3 inline-block' target='_blank' href={socials.data[2].url}>
                            <Image className='hover:rotate-[360deg] transition-all duration-300' width={35} src={instagram} alt='instagram' />
                        </Link>
                    )}
                    {socials.data[3].social === "linkedin" && (
                        <Link className='me-3 inline-block' target='_blank' href={socials.data[3].url}>
                            <Image className='hover:rotate-[360deg] transition-all duration-300' width={35} src={linkedin} alt='linkedin' />
                        </Link>
                    )}
                    {socials.data[4].social === "pinterest" && (
                        <Link className='me-3 inline-block' target='_blank' href={socials.data[4].url}>
                            <Image className='hover:rotate-[360deg] transition-all duration-300' width={30} src={pinterest} alt='pinterest' />
                        </Link>
                    )}
                    {socials.data[5].social === "telegram" && (
                        <Link className='me-3 inline-block' target='_blank' href={socials.data[5].url}>
                            <Image className='hover:rotate-[360deg] transition-all duration-300' width={30} src={telegram} alt='telegram' />
                        </Link>
                    )}
                    {socials.data[6].social === "tiktok" && (
                        <Link className='me-3 inline-block' target='_blank' href={socials.data[6].url}>
                            <Image className='hover:rotate-[360deg] transition-all duration-300' width={30} src={tiktok} alt='tiktok' />
                        </Link>
                    )}
                    {socials.data[7].social === "youtube" && (
                        <Link className='me-3 inline-block' target='_blank' href={socials.data[7].url}>
                            <Image className='hover:rotate-[360deg] transition-all duration-300' width={35} src={youtube} alt='youtube' />
                        </Link>
                    )}

                </div>
            )}

            <div className='flex justify-center items-center'>

            <Link href={"/"} className='text-center  mb-5 underline'>HousePointEgypt.com© 2023</Link>
            </div>


        </footer>
    )
}

export default Footer
