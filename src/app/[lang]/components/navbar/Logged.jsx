import React, { useState } from 'react'

function Logged() {
    const [user, setUser] = useState("ahmed")
    const [logged, setLogged] = useState(false)
    return (
        logged ? (
            <button onClick={() => {
                localStorage.removeItem('user');
                localStorage.removeItem('email');
                localStorage.removeItem('token');
                setLogged('');
                setUser('');
            }} className='flex items-center flex-col my-4 lg:my-0 mx-2 hover:opacity-70'>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-custom-blue hover:opacity-70">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
            </button>
        ) : (
            <button className='bg-white hover:opacity-70 my-4 lg:my-0 text-custom-blue font-semibold mx-4 px-8 py-1.5 rounded'>login</button>
        )
    )
}

export default Logged
