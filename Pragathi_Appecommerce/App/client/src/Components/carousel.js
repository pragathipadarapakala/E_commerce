import React, { useState } from 'react';
import './Carousel.css'; // You can define your CSS styles

const Carousel = ({items}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? items.length - 1 : currentSlide - 1);
  };

  return (
    <div className="carousel">
      <div className="carousel-container">
        {items?.slice(0,4).map((item, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <img src={item.image} alt={item.caption} />
            <div className="caption">{item.caption}</div>
          </div>
        ))}
      </div>
      <button className="prev-button" onClick={prevSlide}>
        Previous
      </button>
      <button className="next-button" onClick={nextSlide}>
        Next
      </button>
    </div>
  );
};

export default Carousel;
