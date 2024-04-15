import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';

const Navigation = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const images = ['/images/army_image1.jpg', '/images/army_image3.jpg', '/images/army_image4.jpg', '/images/army_image5.jpg'];

  const nextImage = () => {
    setImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevImage = () => {
    setImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <div className="container">
      <div className="blur-container">
        <Header />
        <div className="image-container">
          <div className="button-container">
            <button onClick={prevImage}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button onClick={nextImage}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          <img src={images[imageIndex]} alt="Navigation Image" style={{ marginBottom: '20px' }} />
          <marquee className="marquee-behavior" behavior="scroll" direction="left">
            The Indian Army is the land-based branch and the largest component of the Indian Armed Forces.
            It is commanded by the Chief of Army Staff, who is a four-star general.
            The primary mission of the Indian Army is to ensure national security and defend the nation's sovereignty.
            It also plays a crucial role in humanitarian assistance and disaster relief operations.
          </marquee>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
