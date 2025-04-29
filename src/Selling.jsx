// import React, { useEffect, useState } from 'react';

// const Selling = () => {
//     const contentList = [
//         {
//             category: ['Braclets', 'Rings', 'Necklaces', 'Earrings'],
//             images: ['assets/img/sw1.jpg', 'assets/img/sw2.jpg']
//         },
//         {
//             category: ['xvddfg', 'vbn', 'mhjk', 'zds'],
//             images: ['assets/img/sw3.jpg', 'assets/img/sw4.jpg']
//         },
//         {
//             category: ['aaaaa', 'bbbbb', 'ccccc', 'dddd'],
//             images: ['assets/img/sw1.jpg', 'assets/img/sw2.jpg']
//         },
//         {
//             category: ['bbbbb', 'bbbbb', 'bbbbb', 'bbbbb'],
//             images: ['assets/img/sw3.jpg', 'assets/img/sw4.jpg']
//         },
//         {
//             category: ['ccccc', 'ccccc', 'ccccc', 'ccccc'],
//             images: ['assets/img/sw1.jpg', 'assets/img/sw2.jpg']
//         },
//     ];


//     const [currentIndex, setCurrentIndex] = useState(0);

//     const handleNext = () => {
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % contentList.length);
//     };
//     useEffect(() => {
//         const items = document.querySelectorAll(".timeline-item");

//         const observer = new IntersectionObserver(
//             entries => {
//                 entries.forEach(entry => {
//                     if (entry.isIntersecting) {
//                         setTimeout(() => {
//                             entry.target.classList.add("show");
//                         }, 200); // Delay on enter
//                     } else {
//                         entry.target.classList.remove("show"); // Remove on exit
//                     }
//                 });
//             },
//             {
//                 threshold: 0.5,
//             }
//         );

//         items.forEach(item => observer.observe(item));

//         return () => {
//             items.forEach(item => observer.unobserve(item));
//         };
//     }, []);


//     return (
//         <div className="selling-main">
//             <div className="container">
//                 <div className="selling-inner-main">
//                     {/* Left Side: Content */}
//                     <div className="selling-child">
//                         <div className="selling-inner-child">
//                             <p className='selling-one'>Our Best Selling Product</p>

//                             {/* Category List */}
//                             <ul className="selling-category-list">
//                                 {contentList[currentIndex].category.map((item, index) => (
//                                     <li key={index} className={index === 0 ? 'active' : ''}>{item}</li>
//                                 ))}
//                             </ul>

//                             {/* All Collection (stay same) */}
//                             <div className="selling-collection-link">
//                                 <span>All Collection</span>
//                                 <img src="assets/img/arrow.png" alt="arrow" />
//                             </div>

//                             {/* Navigation Controls */}

//                         </div>
//                     </div>

//                     {/* Right Side: Images */}
//                     <div className="selling-child">
//                         <div className="selling-inner-child">
//                             <div className="selling-inner-child-flex">
//                                 <div className="selling-inner-child-two">
//                                     <div className="slider-button" style={{ cursor: 'pointer', marginTop: '20px' }}>
//                                         <p className='selling-count'>{String(currentIndex + 1).padStart(2, '0')}</p>

//                                         {/* Dot Navigation */}
//                                         <div className="main-slide">
//                                             {contentList.map((_, index) => (
//                                                 <div
//                                                     key={index}
//                                                     className={`selling-nav-slide ${index === currentIndex ? 'active' : ''}`}
//                                                     onClick={() => setCurrentIndex(index)}
//                                                 ></div>
//                                             ))}
//                                         </div>

//                                         {/* Next Arrow */}
//                                         <div className='selling-arrow-button' onClick={handleNext} >→</div>
//                                     </div>
//                                 </div>
//                                 <div className="selling-inner-child-two">
//                                     {contentList[currentIndex].images.map((src, idx) => (
//                                         <img key={idx} src={src} alt={`Product ${idx + 1}`} className='setting-img' />
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Selling;


import React, { useEffect, useState } from 'react';

const Selling = () => {
    const contentList = [
        {
            category: ['Braclets', 'Rings', 'Necklaces', 'Earrings'],
            images: ['assets/img/s7-2.jpg', 'assets/img/s7-1.jpg']
        },
        {
            category: ['xvddfg', 'vbn', 'mhjk', 'zds'],
            images: ['assets/img/sw3.jpg', 'assets/img/sw4.jpg']
        },
        {
            category: ['aaaaa', 'bbbbb', 'ccccc', 'dddd'],
            images: ['assets/img/sw1.jpg', 'assets/img/sw2.jpg']
        },
        {
            category: ['bbbbb', 'bbbbb', 'bbbbb', 'bbbbb'],
            images: ['assets/img/sw3.jpg', 'assets/img/sw4.jpg']
        },
        {
            category: ['ccccc', 'ccccc', 'ccccc', 'ccccc'],
            images: ['assets/img/sw1.jpg', 'assets/img/sw2.jpg']
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(false);

    const handleNext = () => {
        setFade(false); 
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % contentList.length);
            setFade(true);
        }, 100); 
    };

    useEffect(() => {
        setFade(true); // When page first loads, add fade
    }, []);

    return (
        <div className="selling-main">
            <div className="container">
                <div className="selling-inner-main">
                    
                    {/* Left Side */}
                    <div className="selling-child">
                        <div className="selling-inner-child">
                            <p className='selling-one'>Our Best Selling Product</p>

                            <ul className="selling-category-list">
                                {contentList[currentIndex].category.map((item, index) => (
                                    <li key={index} className={index === 0 ? 'active' : ''}>{item}</li>
                                ))}
                            </ul>

                            <div className="selling-collection-link">
                                <span>All Collection</span>
                                <img src="assets/img/arrow.png" alt="arrow" />
                            </div>

                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="selling-child">
                        <div className="selling-inner-child">
                            <div className="selling-inner-child-flex">
                                <div className="selling-inner-child-two">
                                    <div className="slider-button" style={{ cursor: 'pointer', marginTop: '20px' }}>
                                        <p className='selling-count'>{String(currentIndex + 1).padStart(2, '0')}</p>

                                        <div className="main-slide">
                                            {contentList.map((_, index) => (
                                                <div
                                                    key={index}
                                                    className={`selling-nav-slide ${index === currentIndex ? 'active' : ''}`}
                                                    onClick={() => {
                                                        setFade(false);
                                                        setTimeout(() => {
                                                            setCurrentIndex(index);
                                                            setFade(true);
                                                        }, 100);
                                                    }}
                                                ></div>
                                            ))}
                                        </div>

                                        <div className='selling-arrow-button' onClick={handleNext}>→</div>
                                    </div>
                                </div>

                                <div className="selling-inner-child-two">
                                    {contentList[currentIndex].images.map((src, idx) => (
                                        <img
                                            key={idx}
                                            src={src}
                                            alt={`Product ${idx + 1}`}
                                            className={`setting-img ${fade ? 'fade-in' : ''}`}
                                        />
                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Selling;
