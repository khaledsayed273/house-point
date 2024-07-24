"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import LanguageSwitcher from './LanguageSwitcher';
import logo from "../../../../../public/images/HPlogo.webp"
import SearchForm from './SearchForm';
import Logged from './Logged';

function Navbar({ translate, lang }) {
    const ul = [
        {
            name: translate.general.components.navbar.rent,
            path: `/${lang}/rent/properties`
        },
        {
            name: translate.general.components.navbar.sale,
            path: `/${lang}/sale/properties`
        },
        {
            name: translate.general.components.navbar.blogs,
            path: `/${lang}/reads`
        },
        {
            name: translate.general.components.navbar.contact,
            path: `/${lang}/contact`
        },
    ]

    const [showNav , setShowNav] = useState(false)
    
    const handleShowNav = () => {
        setShowNav(!showNav)
    }

    useEffect(() => {
        if (window.innerWidth < 1024) {
            if (showNav) {
                document.querySelector("body").style.overflow = "hidden"
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                })
            } else {
                document.querySelector("body").style.overflow = "auto"
            }
        }
    }, [showNav])

    return (
        <nav className={`w-full transition-all static  bg-[#e5e7eb]`}>
            <div className="container mx-auto  py-2 px-2 md:px-5">
                <div className='flex justify-between z-20 items-center '>
                    <Link onClick={() => setShowNav(false)} className='transition-all h-[55px] w-[170px] md:w-[220px] relative md:h-[70px] duration-300 hover:scale-90' href={`/${lang}`}>
                        <Image
                            priority
                            src={logo}
                            width={170}
                            height={55}
                            alt='logo'
                            sizes="(min-width: 808px) 50vw, 100vw"
                        />
                    </Link>
                    <ul className={`flex absolute w-full ${showNav ? "top-16" : "-top-[450px] opacity-20 lg:opacity-100"} left-0  z-30  lg:z-10 lg:h-auto  transition-all duration-300  bg-[#e5e7eb] lg:bg-transparent flex-col lg:flex-row lg:w-auto lg:static items-center `}>
                        {ul.map((link, index) => (
                            <li className='my-5 lg:my-0' key={index}>
                                <Link onClick={() => setShowNav(false)} className='text-custom-blue capitalize hover:opacity-70 text-sm md:text-base lg:me-5 font-semibold' href={`${link.path}`}>{link.name}</Link>
                            </li>
                        ))}
                        <LanguageSwitcher translate={translate} lang={lang} />
                        <Logged />
                        <SearchForm />
                    </ul>
                    <button aria-label="bar" onClick={handleShowNav} className='border lg:hidden p-1 rounded-sm border-custom-blue'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-custom-blue">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
