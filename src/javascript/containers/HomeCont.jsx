// ---Dependencys
import React from 'react';
// ---Components
import DinamicCarousel from 'Comp/Home/DinamicCarousel';
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
    </React.Fragment>
  );
}

export default HomeCont;
