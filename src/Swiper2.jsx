import React from 'react';
import OwlCarousel from 'react-owl-carousel3';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
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
    const options = {
        loop: true,
        margin: 20,
        items: 3,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 2000,
        smartSpeed: 800,

        responsive: {
            0: {
                items: 1
            },
            400: {
                items: 2
            },
            700: {
                items: 3
            },
            1000: {
                items: 3
            }
        }
    };
    return (
        <>


            <div className="swiper2-main-div-m">
                <h2 className="swiper2-child-div">Review of Previous Workshop</h2>
                <OwlCarousel className="swiper2-owl-theme" {...options}>
                    <div
                        className="swiper2-main"
                    >
                        <img src="assets/img/que.png" alt="" />
                        <p className="swiper2-text-p">
                            "So I did this alcohol ink art detailing one on one workshop & I'm super happy with it. She's told me every single detail without even being asked.",
                        </p>
                        <p className="swiper-name-n">~Aayushi Patel</p>
                    </div>

                    <div
                        className="swiper2-main"
                    >
                        <img src="assets/img/que.png" alt="" />

                        <p className="swiper2-text-p">
                            "I did this alcohol ink art detailing one on one workshop & I'm super happy with it. She's told me every single detail without even being asked.",

                        </p>
                        <p className="swiper-name-n">~Aayushi Patel</p>
                    </div>
                    <div
                        className="swiper2-main"
                    >
                        <img src="assets/img/que.png" alt="" />
                        <p className="swiper2-text-p">
                            " did this alcohol ink art detailing one on one workshop & I'm super happy with it. She's told me every single detail without even being asked.",

                        </p>
                        <p className="swiper-name-n">~Aayushi Patel</p>
                    </div>
                    <div
                        className="swiper2-main"
                    >
                        <img src="assets/img/que.png" alt="" />
                        <p className="swiper2-text-p">
                            " this alcohol ink art detailing one on one workshop & I'm super happy with it. She's told me every single detail without even being asked.",

                        </p>
                        <p className="swiper-name-n">~Aayushi Patel</p>
                    </div>
                    <div
                        className="swiper2-main"
                    >
                        <img src="assets/img/que.png" alt="" />
                        <p className="swiper2-text-p">
                            "alcohol ink art detailing one on one workshop & I'm super happy with it. She's told me every single detail without even being asked.",

                        </p>
                        <p className="swiper-name-n">~Ayushi shah</p>
                    </div>

                </OwlCarousel>
            </div>
        </>


    );
};

export default Swiper2;
