import React from 'react'
import Cards from '../../components/cards/Cards'


const getFeatureProperties = async (lang, baseUrl,) => {
    try {
        const res = await fetch(`${baseUrl}/properties/page/feature`, {
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

async function FeatureProperties({ lang, baseUrl , translate }) {

    const feature = await getFeatureProperties(lang, baseUrl)

    return (
        feature.status && (
            <div className='mt-5'>
                <h3 className='text-xl font-semibold mb-3'>Feature Properties</h3>

                {feature.data.map((item, index) => (
                    <div key={index} className='my-4'>
                        <Cards lang={lang} item={item} translate={translate}/>
                    </div>
                ))}

            </div>
        )

    )
}

export default FeatureProperties
