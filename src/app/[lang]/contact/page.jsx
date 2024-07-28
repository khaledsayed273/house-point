import React from 'react'


const getData = async (baseUrl, lang) => {


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

async function page({ params }) {


    const baseUrl = process.env.baseUrl
    const req = await getData(baseUrl, params.lang)
    const description = req?.data?.description || ""; 
    const markup = { __html: description };


    return (
        <main className='p-2 md:p-5'>
            <div dangerouslySetInnerHTML={markup}></div>
        </main>
    )
}

export default page
