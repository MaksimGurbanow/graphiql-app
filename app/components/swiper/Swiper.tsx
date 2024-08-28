import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Swiper.module.scss";

const Swiper = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === React.Children.count(children) - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? React.Children.count(children) - 1 : prev - 1
    );
  };

  return (
    <div className={styles.swiperContainer}>
      <div
        className={styles.swiperWrapper}
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {React.Children.map(children, (child) => (
          <div className={styles.swiperSlide}>{child}</div>
        ))}
      </div>
      <button
        className={`${styles.swiperButton} ${styles.prev}`}
        onClick={prevSlide}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            prevSlide();
          }
        }}
        tabIndex="0"
      >
        &#10094;
      </button>
      <button
        className={`${styles.swiperButton} ${styles.next}`}
        onClick={nextSlide}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            nextSlide();
          }
        }}
        tabIndex="0"
      >
        &#10095;
      </button>
      <div className={styles.swiperPagination}>
        {React.Children.map(children, (_, index) => (
          <span
            key={index}
            className={`${styles.swiperPaginationDot} ${
              index === currentSlide ? styles.active : ""
            }`}
            onClick={() => setCurrentSlide(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
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
