"use client"
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import phoneIcon from "../../../../../../../../../public/assets/phone.png"
import whatsAppIcon from "../../../../../../../../../public/assets/whatsapp.png"
import faceIcon from "../../../../../../../../../public/assets/facebooksq.png"
import twitterIcon from "../../../../../../../../../public/assets/twitter.png"
import linkedInIcon from "../../../../../../../../../public/assets/linkedin.png"
import { useParams } from 'next/navigation';

function Form({ refNumber, baseUrl }) {

    const params = useParams()

    let message = `Hi I found your property with Ref: ${refNumber} on House Point Egypt. Please Contact me, Thanks`


    return (
        <form className='font-medium'>
            <div className='grid lg:grid-cols-2 2xl:grid-cols-3 gap-3 mt-4'>
                <Link target='_blank' className='bg-custom-blue text-white flex items-center justify-center py-2 text-xl capitalize rounded-lg hover:opacity-80' href={"tel:+201221409530"}>
                    <Image src={phoneIcon} width={22} className='me-2' alt='phone' />
                    call
                </Link>
                <button className='bg-custom-blue text-white flex items-center justify-center py-2 text-xl capitalize rounded-lg hover:opacity-80' >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 me-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                    email
                </button>
                <Link target='_blank' className='bg-green-600 text-white  py-2 text-xl flex items-center justify-center capitalize rounded-lg hover:opacity-80' href={`https://api.whatsapp.com/send?phone=01221409530&text=${message}`}>
                    <Image src={whatsAppIcon} width={22} className='me-2' alt='whatsapp' />
                    whats app
                </Link>
            </div>

            <div className='mt-3'>
                <h3 className='mb-2 text-lg'>Share On</h3>
                <div className='grid sm:grid-cols-2 md:grid-cols-4 gap-2 '>
                    <Link className='bg-[#3f53b7] py-1 flex items-center justify-center rounded-lg hover:opacity-80' target='_blank' href={`https://www.facebook.com/sharer.php?u=${baseUrl}/${params.type}/${params.slug}/${params.area}/${params.subarea}/${params.details}`}>
                        <Image src={faceIcon} width={30} alt='facebook' />
                    </Link>
                    <Link className='bg-[#04a7ef] py-1 flex items-center justify-center rounded-lg hover:opacity-80' target='_blank' href={`https://twitter.com/intent/tweet?text=&amp;url=${baseUrl}/${params.type}/${params.slug}/${params.area}/${params.subarea}/${params.details}`}>
                        <Image src={twitterIcon} width={30} alt='twitter' />
                    </Link>
                    <Link className='bg-[#0376df] py-1 flex items-center justify-center  rounded-lg hover:opacity-80' target='_blank' href={`"https://www.linkedin.com/shareArticle?mini=true&amp;url=${baseUrl}/${params.type}/${params.slug}/${params.area}/${params.subarea}/${params.details}`}>
                        <Image src={linkedInIcon} width={30} alt='linkedIn' />
                    </Link>
                    <Link className='bg-green-600 py-1 flex items-center justify-center rounded-lg hover:opacity-80' target='_blank' href={`https://web.whatsapp.com/send?text=${baseUrl}/${params.type}/${params.slug}/${params.area}/${params.subarea}/${params.details}`}>
                        <Image src={whatsAppIcon} width={25} alt='whatsapp' />
                    </Link>
                </div>
            </div>

        </form>
    )
}

export default React.memo(Form)
