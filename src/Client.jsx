// import React, { useState } from 'react';

// const clients = [
//     {
//         image: 'assets/img/cate1.jpg',
//         name: 'Sujal Jethava',
//         text: `It is a long established fact that a reader by the readable content...It is a long established fact that a reader by the readable content...It is a long established fact that a reader by the readable content...It is a long established fact that a reader by the readable content...`,
//     },
//     {
//         image: 'assets/img/cate2.jpg',
//         name: 'Parth Patel',
//         text: `It It is a long established fact that a reader by the readable content...is a long established fact that a reader by the readable content...It is a long established fact that a reader by the readable content...It is a long established fact that a reader by the readable content...`,
//     },
//     {
//         image: 'assets/img/cate3.jpg',
//         name: 'Kishan Parmar',
//         text: `It is a long established fact that a reader by the readable content...It is a long established fact that a reader by the readable content...It is a long established fact that a reader by the readable content...It is a long established fact that a reader by the readable content...`,
//     },
//     {
//         image: 'assets/img/cate4.jpg',
//         name: 'Rahul Jaikar',
//         text: `It is a long established fact that a reader by the readable content...It is a long established fact that a reader by the readable content...It is a long established fact that a reader by the readable content...It is a long established fact that a reader by the readable content...`,
//     },
//     {
//         image: 'assets/img/cate5.jpg',
//         name: 'Arohi ',
//         text: `It is a long established fact that a reader by the readable content...It is a long established fact that a reader by the readable content...It is a long established fact that a reader by the readable content...It is a long established fact that a reader by the readable content...`,
//     },
// ];

// const Client = () => {
//     const [currentIndex, setCurrentIndex] = useState(0);

//     const handleNext = () => {
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % clients.length);
//     };

//     return (
//         <div className="client-main">
//             <div className="container">


//                 <div className="client-text">
//                     <p className='client-one'>Some Best Word From</p>
//                     <p className='client-one'>Our Clients</p>
//                 </div>

//                 <div className="client-inner-main">
//                     {/* Left Image */}
//                     <div className="client-child">
//                         <div className="client-img-box">
//                             <img src={clients[currentIndex].image} alt={clients[currentIndex].name} className="client-img-single" />
//                         </div>
//                     </div>

//                     {/* Right Text */}
//                     <div className="client-child">
//                         {/* <div className="client-quote">❝</div> */}
//                         <img src="assets/img/que.png" alt="" />
//                         <p className="client-review">{clients[currentIndex].text}</p>
//                         <div className="client-menu">

//                             <p className="client-name">{clients[currentIndex].name}</p>

//                             {/* Dots */}
//                             <div className="client-dots">
//                                 {clients.map((_, index) => (
//                                     <span
//                                         key={index}
//                                         className={`dot ${index === currentIndex ? 'active' : ''}`}
//                                         onClick={() => setCurrentIndex(index)}
//                                     ></span>
//                                 ))}
//                             </div>

//                             {/* Next Button */}
//                             <div className="client-next-btn" onClick={handleNext}>
//                                 →
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Client;



// import React, { useState } from 'react';

// const clients = [
//     {
//         image: 'assets/img/cate1.jpg',
//         name: 'Sujal Jethava',
//         text: `It is a long established fact that a reader by the readable content...It is a long established fact that a reader by the readable content...`,
//     },
//     {
//         image: 'assets/img/cate2.jpg',
//         name: 'Parth Patel',
//         text: `It is a long established fact that a reader by the readable content...It is a long established fact that a reader by the readable content...`,
//     },
//     {
//         image: 'assets/img/cate3.jpg',
//         name: 'Kishan Parmar',
//         text: `It is a long established fact that a reader by the readable content...It is a long established fact that a reader by the readable content...`,
//     },
//     {
//         image: 'assets/img/cate4.jpg',
//         name: 'Rahul Jaikar',
//         text: `It is a long established fact that a reader by the readable content...It is a long established fact that a reader by the readable content...`,
//     },
//     {
//         image: 'assets/img/cate5.jpg',
//         name: 'Arohi',
//         text: `It is a long established fact that a reader by the readable content...It is a long established fact that a reader by the readable content...`,
//     },
// ];

// const Client = () => {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [isVisible, setIsVisible] = useState(true);

//     const handleNext = () => {
//         setIsVisible(false);
//         setTimeout(() => {
//             setCurrentIndex((prevIndex) => (prevIndex + 1) % clients.length);
//             setIsVisible(true);
//         }, 300);
//     };

//     const handleDotClick = (index) => {
//         if (index === currentIndex) return;
//         setIsVisible(false);
//         setTimeout(() => {
//             setCurrentIndex(index);
//             setIsVisible(true);
//         }, 300);
//     };

//     return (
//         <div className="client-main">
//             <div className="container">
//                 <div className="client-text">
//                     <p className="client-one">Some Best Word From</p>
//                     <p className="client-one">Our Clients</p>
//                 </div>

//                 <div className="client-inner-main">
//                     {/* Left Image */}
//                     <div className="client-child">
//                         <div className="client-img-box">
//                             <img
//                                 src={clients[currentIndex].image}
//                                 alt={clients[currentIndex].name}
//                                 className={`client-img-single client-fade ${isVisible ? 'show' : ''}`}
//                             />
//                         </div>
//                     </div>

//                     {/* Right Text */}
//                     <div className="client-child">
//                         <img src="assets/img/que.png" alt="" />
//                         <p className={`client-review client-fade ${isVisible ? 'show' : ''}`}>
//                             {clients[currentIndex].text}
//                         </p>
//                         <div className="client-menu">
//                             <p className="client-name">{clients[currentIndex].name}</p>

//                             {/* Dots */}
//                             <div className="client-dots">
//                                 {clients.map((_, index) => (
//                                     <span
//                                         key={index}
//                                         className={`dot ${index === currentIndex ? 'active' : ''}`}
//                                         onClick={() => handleDotClick(index)}
//                                     ></span>
//                                 ))}
//                             </div>

//                             {/* Next Button */}
//                             <div className="client-next-btn" onClick={handleNext}>
//                                 →
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Client;


import React, { useState } from 'react';

const clients = [
    {
        image: 'assets/img/client.png',
        name: 'Sujal Jethava',
        text: `It is a long established fact that a reader by the readable content...It is a long established fact that a reader by the readable content...It is a long established fact that a reader by the readable content...`,
    },
    {
        image: 'assets/img/cate2.jpg',
        name: 'Parth Patel',
        text: `It is a long established fact that a reader by the readable content...`,
    },
    {
        image: 'assets/img/cate3.jpg',
        name: 'Kishan Parmar',
        text: `It is a long established fact that a reader by the readable content...`,
    },
    {
        image: 'assets/img/cate4.jpg',
        name: 'Rahul Jaikar',
        text: `It is a long established fact that a reader by the readable content...`,
    },
    {
        image: 'assets/img/cate5.jpg',
        name: 'Arohi',
        text: `It is a long established fact that a reader by the readable content...`,
    },
];

const Client = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === clients.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="client-main">
            <div className="container">
                <div className="client-text">
                    <p className="client-one">Some Best Word From</p>
                    <p className="client-one">Our Clients</p>
                </div>

                <div className="carousel-wrapper">
                    <div
                        className="carousel-inner"
                        style={{
                            transform: `translateX(-${currentIndex * 100}%)`,
                        }}
                    >
                        {clients.map((client, index) => (
                            <div className="carousel-item" key={index}>
                                <div className="carousel-left">
                                    <img src={client.image} alt={client.name} className="client-img-single" />
                                </div>
                                <div className="carousel-right">
                                    <img src="assets/img/que.png" alt="quote" className="quote-img" />
                                    <p className="client-review">{client.text}</p>
                                    <p className="client-name">{client.name}</p>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="client-menu">
                    <div className="client-dots">
                        {clients.map((_, index) => (
                            <span
                                key={index}
                                className={`client-dot ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => handleDotClick(index)}
                            ></span>
                        ))}
                    </div>

                    <div className="client-next-btn" onClick={handleNext}>
                        →
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Client;
