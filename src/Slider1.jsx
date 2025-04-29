import React, { useRef } from 'react';


const Slider1 = () => {
    const sliderRef = useRef(null);

    const scrollLeft = () => {
        sliderRef.current.scrollBy({ left: -303, behavior: 'smooth' });
    };

    const scrollRight = () => {
        sliderRef.current.scrollBy({ left: 303, behavior: 'smooth' });
    };

    const images = [
        's9-01.jpg', 's9-02.jpg', 's9-03.jpg', 's9-04.jpg',
        's9-05.jpg', 's9-06.jpg', 's9-07.jpg', 's9-08.jpg',
    ];

    return (
        <div className="slider1-main">
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
    );
};

export default Slider1;
