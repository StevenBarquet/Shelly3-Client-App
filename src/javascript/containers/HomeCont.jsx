// ---Dependencys
import React from 'react';
// ---Components
import DinamicCarousel from 'Comp/Home/DinamicCarousel';
import BuySteps from 'Comp/Home/BuySteps';
import ButtonProd from 'Comp/Home/ButtonProd';
// ---Others
import { title } from 'Others/labels.json';

const { main, sub } = title;

// ------------------------------------------ COMPONENT-----------------------------------------
function HomeCont() {
  return (
    <React.Fragment>
      <div className="h-title">
        {main} <span>{sub}</span>
      </div>
      <p>
        ¡Lo <span>mejor</span> te espera!
      </p>
      <DinamicCarousel />
      <div className="home-container">
        <BuySteps />
        <ButtonProd />
      </div>
    </React.Fragment>
  );
}

export default HomeCont;
