import React, { useRef } from 'react'
import Header from './Header'
import Swiper2 from './Swiper2';

const Workshop = () => {
    const sliderRef = useRef(null);

    const scrollLeft = () => {
        sliderRef.current.scrollBy({ left: -303, behavior: 'smooth' });
    };

    const scrollRight = () => {
        sliderRef.current.scrollBy({ left: 303, behavior: 'smooth' });
    };

    const images = [
        'cate4.jpg', 'cate2.jpg', 'cate3.jpg', 'cate5.jpg',
        'cate4.jpg', 'cate1.jpg', 'cate3.jpg', 'cate6.jpg',
        'cate4.jpg', 'cate2.jpg', 'cate3.jpg', 'cate5.jpg',
        'cate4.jpg', 'cate1.jpg', 'cate3.jpg', 'cate6.jpg'
    ];
    return (
        <>
            <Header />

            <div className="work1-main">
                <div className="container">
                    <div className="work1-inner-main">
                        <div className="work1-child">
                            <div className="work1-inner-child">
                                <img src="assets/img/sample1.png" alt="" />
                            </div>
                        </div>
                        <div className="work1-child">
                            <div className="work1-inner-child">
                                <p className='work1-one'>Up Coming Workshop Detail</p>
                                <p className='work1-three'> <span className='work1-two'>Date:</span> Chosen based on mutual convenience</p>
                                <p className='work1-three'> <span className='work1-two'>Time:</span> Chosen based on mutual convenience (good for international participants as well)</p>
                                <p className='work1-three'> <span className='work1-two'>Duration:</span> 3 hours + Initial discussions about material + WhatsApp guidance for one week after the workshop</p>
                                <p className='work1-two'>Fees:</p>
                                <p className='work1-three'> <span className='work1-two'>ONLINE:</span> 9000/- or 120 USD (for 3 hours - single class, material not included) (International participants may please contact me for PayPal link)
                                </p>
                                <p className='work1-three'> <span className='work1-two'>OFFLINE/IN-STUDIO:</span> Rs. 10,000/- (for 3 hours - single class, basic material included)
                                </p>
                                <p className='work1-three'>​This workshop is designed for individuals who want to seriously understand the nature of inks and work along with me in a step-by-step guided way with all the right products.  </p>
                                <p className='work1-three'>Upon registration, I will contact the person through phone call and WhatsApp and have a friendly discussion about the products they already have, other supplies needed, list of materials, where to get the stuff from, chit-chat about art goals, and so on.</p>
                                <p className='work1-three'>Once the person has received all the supplies, we can have the session at a mutually decided time.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="work2-main">
                <div className="container">
                    <div className="work2-text">
                        <p className='work2-one'>Pervious Workshop </p>
                        <p className='work2-two'>This workshop is designed for individuals who want to seriously understand the nature of inks and work along with me in a step-by-step guided way with all the right products. This workshop is designed for individuals who want to seriously understand the nature of inks and work along with me in a step-by-step guided way with all the right products. </p>
                    </div>
                </div>
            </div>
            <div className="work2-slide">
                <button className="arrow left" onClick={scrollLeft}>&#8592;</button>
                <div className="slider-window">
                    <div className="slider-track" ref={sliderRef}>
                        {images.map((img, i) => (
                            <div className="img-wrapper" key={i}>
                                <img src={`assets/img/${img}`} alt={`Slide ${i}`} />
                            </div>
                        ))}
                    </div>
                </div>

                <button className="arrow right" onClick={scrollRight}>&#8594;</button>
            </div>

<Swiper2/>
        </>
    )
}

export default Workshop
