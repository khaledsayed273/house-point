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

async function page({params}) {


    const baseUrl = process.env.baseUrl
    const req = await getData(baseUrl, params.lang)

    console.log(req);

  return (
    <main className='p-2 md:p-5'>
        <div dangerouslySetInnerHTML={{__html: req.data.description}}></div>

      
    </main>
  )
}

export default page
