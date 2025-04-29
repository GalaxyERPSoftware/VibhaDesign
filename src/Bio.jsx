import React, { useEffect, useRef, useState } from 'react';
import Header from './Header';

const timelineData = [
    { year: "2010", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt." },
    { year: "2015", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt." },
    { year: "2020", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt." },
    { year: "2024", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt." },
];

const Bio = () => {
    const containerRef = useRef(null);
    const [visibleItems, setVisibleItems] = useState([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    const index = Number(entry.target.getAttribute('data-index'));
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            setVisibleItems(prev => {
                                if (!prev.includes(index)) return [...prev, index];
                                return prev;
                            });
                        }, 200);
                    }
                });
            },
            { threshold: 0.4 }
        );

        const items = containerRef.current.querySelectorAll('.timeline-item');
        items.forEach((item, index) => {
            item.setAttribute('data-index', index);
            observer.observe(item);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <>
            {/* header part start  */}
            <Header />
            {/* header part end  */}

            <div className="bio1-main">
                <div className="container">
                    <div className="bio1-inner-main">
                        <div className="bio1-child">
                            <div className="bio1-inner-child">
                                <p className='bio1-one'>look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                                </p>
                            </div>
                        </div>
                        <div className="bio1-child">
                            <div className="bio1-inner-child">
                                <img src="assets/img/sample.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="bio2-main">
                <div className="container">
                    <div className="bio2-inner-main">
                        <div className="bio2-child">
                            <div className="bio2-inner-child">
                                <img src="assets/img/Group.png" alt="" />
                            </div>
                        </div>
                        <div className="bio2-child">
                            <div className="bio2-inner-child">
                                <p className='bio2-one'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bio1-main">
                <div className="container">
                    <div className="bio1-inner-main">
                        <div className="bio1-child">
                            <div className="bio1-inner-child">
                                <p className='bio1-one'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                                </p>
                            </div>
                        </div>
                        <div className="bio1-child">
                            <div className="bio1-inner-child">
                                <img src="assets/img/sample.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="journey-container">
                <h2 className="journey-title">Our Journey</h2>
                <div className="timeline" ref={containerRef}>
                    <div className="line-wrapper">
                        <div className="base-line"></div>
                        {timelineData.map((_, index) => (
                            <span
                                className="journey-dot"
                                key={index}
                                style={{ top: `${index * 160}px` }} // Adjust spacing between dots
                            ></span>
                        ))}
                    </div>

                    {timelineData.map((item, index) => (
                        <div
                            className={`timeline-item ${index % 2 === 0 ? 'right' : 'left'} ${visibleItems.includes(index) ? 'show' : ''}`}
                            key={index}
                        >
                            <div className="content">
                                <h3>{item.year}</h3>
                                <p>{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Bio;
