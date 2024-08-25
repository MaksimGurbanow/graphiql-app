import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Swiper.scss';

const Swiper = ({ children }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === React.Children.count(children) - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? React.Children.count(children) - 1 : prev - 1));
    };

    return (
        <div className="swiper-container">
            <div
                className="swiper-wrapper"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {React.Children.map(children, (child) => (
                    <div className="swiper-slide">{child}</div>
                ))}
            </div>
            <button
                className="swiper-button prev"
                onClick={prevSlide}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        prevSlide();
                    }
                }}
                tabIndex="0"
            >
                &#10094;
            </button>
            <button
                className="swiper-button next"
                onClick={nextSlide}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        nextSlide();
                    }
                }}
                tabIndex="0"
            >
                &#10095;
            </button>
            <div className="swiper-pagination">
                {React.Children.map(children, (_, index) => (
                    <span
                        key={index}
                        className={`swiper-pagination-dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                setCurrentSlide(index);
                            }
                        }}
                        role="button"
                        tabIndex="0"
                    ></span>
                ))}
            </div>
        </div>
    );
};

Swiper.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Swiper;
