import React, { ReactNode, useState } from "react";
import PropTypes from "prop-types";
import styles from "./Swiper.module.scss";

const Swiper = ({ children }: { children: ReactNode }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 2 : prev - 1));
  };

  return (
    <div className={styles.swiperContainer} data-testid="swipper">
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
        tabIndex={0}
        data-testid="prev-slide"
      >
        &#10094;
      </button>
      <button
        className={`${styles.swiperButton} ${styles.next}`}
        onClick={nextSlide}
        tabIndex={0}
        data-testid="next-slide"
      >
        &#10095;
      </button>
      <div className={styles.swiperPagination} data-testid="pagination">
        {React.Children.map(children, (_, index) => (
          <span
            key={index}
            className={`${styles.swiperPaginationDot} ${
              index === currentSlide ? styles.active : ""
            }`}
            onClick={() => setCurrentSlide(index)}
            onKeyDown={() => {}}
            role="button"
            tabIndex={0}
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
