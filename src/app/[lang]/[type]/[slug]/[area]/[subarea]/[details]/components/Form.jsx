"use client"
import React, { useState } from 'react'
import DropDownPhoneForm from './DropDownPhoneForm';
import Link from 'next/link';
import Image from 'next/image';
import phoneIcon from "../../../../../../../../../public/assets/phone.png"
import whatsAppIcon from "../../../../../../../../../public/assets/whatsapp.png"

function Form() {

    const [fullName, setFullName] = useState("")
    const [phone, setPhone] = useState(0)
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("Hi I found your property with Ref: 5917 on House Solution Egypt. Please Contact me, Thanks")

    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    return (
        <form className='font-medium'>
            <div className='flex flex-col mt-4 mb-6'>
                <label htmlFor="fullName">Full Name *</label>
                <input onChange={(e) => setFullName(e.target.value)} value={fullName} placeholder='Full Name *' className='border p-2 outline-custom-blue border-black/60 rounded-md mt-2' type="text" name="fullName" id="fullName" />
            </div>
            <div className='my-3'>
                <label htmlFor="phone">Mobile Number *</label>
                <div className="flex items-center relative mt-3">

                    <button
                        id="dropdown-phone-button"
                        onClick={toggleDropdown}
                        className="flex-shrink-0  z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                        type="button"
                    >
                        <svg
                            fill="none"
                            aria-hidden="true"
                            className="h-4 w-4 mr-2"
                            viewBox="0 0 20 15"
                        >
                            {/* SVG content here */}
                        </svg>
                        +1
                        <svg
                            className="w-2.5 h-2.5 ml-2.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 4 4 4-4"
                            />
                        </svg>
                    </button>
                    {isOpen && (
                        <DropDownPhoneForm />
                    )}
                    <input onChange={(e) => setPhone(e.target.value)} value={phone} className='py-2.5 px-4 w-full border outline-custom-blue border-black/60 rounded-e-md' type="text" placeholder='Mobile Number *' id='phone' />
                </div>
            </div>
            <div className='flex flex-col my-4'>
                <label htmlFor="email">Email *</label>
                <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Email *' className='border p-2 outline-custom-blue border-black/60 rounded-md mt-2' type="email" name="email" id="email" />
            </div>
            <div className='flex flex-col my-4'>
                <label htmlFor="message">Your Message *</label>
                <textarea onChange={(e) => setMessage(e.target.value)} value={message} placeholder='Your Message *' className='border p-2 outline-custom-blue border-black/60 rounded-md mt-2 min-h-[90px] max-h-[90px]' type="text" name="message" id="message" />
            </div>
            <button className='w-full capitalize bg-custom-blue text-white  py-2.5 text-xl rounded-lg hover:opacity-80'>send</button>
            <div className='grid md:grid-cols-2 gap-5 mt-4'>
                <Link className='bg-green-600 text-white flex items-center justify-center py-2 text-xl capitalize rounded-lg hover:opacity-80' href={"/"}>
                    <Image src={phoneIcon} width={22} className='me-2' alt='phone'/>
                    call

                </Link>
                <Link className='bg-green-600 text-white  py-2 text-xl flex items-center justify-center capitalize rounded-lg hover:opacity-80' href={"/"}>
                    <Image src={whatsAppIcon} width={22} className='me-2' alt='whatsapp'/>
                    whats app
                </Link>
            </div>
        </form>
    )
}

export default Form
