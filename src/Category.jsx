import React, { useState, useEffect } from 'react';

const Category = () => {
    const [zoomedIndex, setZoomedIndex] = useState(null);

    // Move images above useEffect
    const images = [
        'assets/img/cate3.jpg',
        'assets/img/cate2.jpg',
        'assets/img/cate1.png',
        'assets/img/cate3.jpg',
        'assets/img/cate2.jpg',
        'assets/img/cate1.png',
    ];

    useEffect(() => {
        // Default ma last image zoomed
        setZoomedIndex(images.length - 1);
    }, [images.length]);

    const handleImageClick = (index) => {
        setZoomedIndex(index === zoomedIndex ? null : index);
    };

    const contentData = [
        {
            title: "Jewelery which fit everyone budget and taste !",
            description: "It is a long established fact that a reader by the readable content of a looking layout..."
        },
        {
            title: "Modern Silver Styles",
            description: "Trendy silver designs that reflect your style. Perfect for parties, casual outings, and gifts."
        },
        {
            title: "Diamond for Every Mood",
            description: "Shine bright with our finely-cut diamonds. Sparkle your personality with every step."
        },
        {
            title: "Traditional Touch",
            description: "Bring heritage home with our traditional collection — inspired by rich Indian culture."
        },
        {
            title: "Minimalist Magic",
            description: "Simple. Chic. Elegant. Explore our minimalist pieces for daily wear and office looks."
        },
        {
            title: "Jewelery which fit everyone budget and taste !",
            description: "It is a long established fact that a reader by the readable content of a looking layout.The point of using Lorem opposed to using  reader by the readable content of a looking layout.The point of using Lorem opposed to using g established fact that a reader by the readable content of a looking ."
        }
    ];

    const selectedContent = contentData[zoomedIndex] || {
        title: "Click an image to explore!",
        description: "Select any category image to see the collection details here."
    };

    return (
        <div className="category-main">
            <div className="category-text">
                <p className='category-one'>Category</p>
            </div>

            <div className="container">
                <div className="category-inner-main">

                    {/* Images */}
                    <div className="category-child">
                        <div className="category-inner-child">
                            <div className="category-img">
                                {images.map((src, index) => (
                                    <img
                                        key={index}
                                        src={src}
                                        alt={`category-${index}`}
                                        className={zoomedIndex === index ? 'zoomed' : ''}
                                        onClick={() => handleImageClick(index)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="category-child">
                        <div className="category-inner-child">
                            <div className="category-box">
                                <p className='category-two'>{selectedContent.title}</p>
                                <p className='category-three'>{selectedContent.description}</p>
                                <div className="category-btn">
                                    <p className='category-four'>Explore all collection</p>
                                    <img src="assets/img/arrow.png" alt="arrow" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Category;
