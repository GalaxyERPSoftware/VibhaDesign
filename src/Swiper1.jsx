// import React, { useRef, useState } from 'react';
// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';

// import './swiper.css';

// // import required modules
// import { Pagination } from 'swiper/modules';

// const Swiper1 = () => {
//     return (
//         <>
//             <Swiper
//                 pagination={{
//                     dynamicBullets: true,
//                 }}
//                 modules={[Pagination]}
//                 className="mySwiper"
//             >
//                 <SwiperSlide><img src="assets/img/sw1.jpg" alt="" /></SwiperSlide>
//                 <SwiperSlide><img src="assets/img/sw2.jpg" alt="" /></SwiperSlide>
//                 <SwiperSlide><img src="assets/img/sw3.jpg" alt="" /></SwiperSlide>
//                 <SwiperSlide><img src="assets/img/sw4.jpg" alt="" /></SwiperSlide>
//                 <SwiperSlide><img src="assets/img/sw5.jpg" alt="" /></SwiperSlide>
//                 <SwiperSlide>Slide 6</SwiperSlide>
//                 <SwiperSlide>Slide 7</SwiperSlide>
//                 <SwiperSlide>Slide 8</SwiperSlide>
//                 <SwiperSlide>Slide 9</SwiperSlide>
//             </Swiper>
//         </>
//     )
// }

// export default Swiper1

import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import './swiper.css';

// Import required modules
import { Pagination, Autoplay } from 'swiper/modules';

const Swiper1 = () => {
    return (
        <>
            <Swiper
                pagination={{
                    dynamicBullets: true,
                }}
                autoplay={{
                    delay: 2500, // 2.5 seconds delay
                    disableOnInteraction: false,
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
            >
                <SwiperSlide><img src="assets/img/s2-01.png" alt="" /></SwiperSlide>
                <SwiperSlide><img src="assets/img/s2-02.png" alt="" /></SwiperSlide>
                <SwiperSlide><img src="assets/img/s2-03.png" alt="" /></SwiperSlide>
                <SwiperSlide><img src="assets/img/s2-04.png" alt="" /></SwiperSlide>
                <SwiperSlide><img src="assets/img/s2-05.png" alt="" /></SwiperSlide>
                <SwiperSlide><img src="assets/img/s2-06.png" alt="" /></SwiperSlide>
             
            </Swiper>
        </>
    );
}

export default Swiper1;
