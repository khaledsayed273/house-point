"use client"
import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from './cards/Cards';

function SlickAutoPlay({ lang, related, translate }) {
    const settings = {
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 6000,
        arrows: false,
        responsive: [

            {
                breakpoint: 1150,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,

                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="slider-containerAutoPlay  mt-20 md:mt-0 mb-5">
            <h3 className='text-center mb-10 text-lg md:text-xl font-semibold'>RELATED PROPERTIES</h3>

            <Slider {...settings}>
                {related?.map((item) => (
                    <Cards lang={lang} key={item.slug} item={item} translate={translate} />
                ))}
            </Slider>
        </div>
    )
}

export default SlickAutoPlay
