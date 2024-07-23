import React from 'react'
import Cards from '../cards/Cards'

async function Section({lang, data , translate }) {
  return (
    <section className='px-2 md:px-10 my-10'>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
        {data?.data?.map(item => (
          <Cards key={item.slug} lang={lang}  item={item} translate={translate} />
        ))}
      </div>
    </section>
  )
}

export default Section
