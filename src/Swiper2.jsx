import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './swiper2.css';

// const options = {
//     loop: true,
//     margin: 30,
//     items: 3,
//     nav: false,
//     autoplay: true,
//     dots: true,
//     autoplay: true,
//     autoplayTimeout: 2000,
//     smartSpeed: 800,
//     autoplayHoverPause: true,// This stops autoplay on hover,\
//     responsive: {
//         0: {
//             items: 1,
//         },
//         768: {
//             items: 2,
//         },
//         1024: {
//             items: 3,
//         },
//     },
// };


const Swiper2 = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    const reviews = [
        {
            text: "So I did this alcohol ink art detailing one on one workshop & I'm super happy with it. She's told me every single detail without even being asked.",
            author: "Aayushi Patel"
        },
        {
            text: "I did this alcohol ink art detailing one on one workshop & I'm super happy with it. She's told me every single detail without even being asked.",
            author: "Aayushi Patel"
        },
        {
            text: "Did this alcohol ink art detailing one on one workshop & I'm super happy with it. She's told me every single detail without even being asked.",
            author: "Aayushi Patel"
        },
        {
            text: "This alcohol ink art detailing one on one workshop & I'm super happy with it. She's told me every single detail without even being asked.",
            author: "Aayushi Patel"
        },
        {
            text: "Alcohol ink art detailing one on one workshop & I'm super happy with it. She's told me every single detail without even being asked.",
            author: "Ayushi shah"
        }
    ];

    return (
        <div className="swiper2-main-div-m">
            <h2 className="swiper2-child-div">Review of Previous Workshop</h2>
            <Slider {...settings}>
                {reviews.map((review, index) => (
                    <div key={index} className="swiper2-main">
                        <img src="assets/img/que.png" alt="" />
                        <p className="swiper2-text-p">"{review.text}"</p>
                        <p className="swiper-name-n">~{review.author}</p>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Swiper2;
