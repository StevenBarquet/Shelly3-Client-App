// ---Dependencys
import React from 'react';
import { Carousel } from 'antd';
// ---Media
import c1 from 'Images/banner1.jpg';
import c2 from 'Images/banner2.jpg';

// ------------------------------------------ COMPONENT-----------------------------------------
function DinamicCarousel() {
  return (
    <React.Fragment>
      <div className="carousel-cont">
        <Carousel autoplay effect="fade" dotPosition="top">
          <div>
            <img src={c1} width="100%" alt="shelly" />
          </div>
          <div>
            <img src={c2} width="100%" alt="shelly" />
          </div>
        </Carousel>
      </div>
    </React.Fragment>
  );
}

export default DinamicCarousel;
