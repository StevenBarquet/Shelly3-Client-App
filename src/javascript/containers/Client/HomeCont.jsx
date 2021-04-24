// ---Dependencys
import React, { useEffect } from 'react';
// ---Redux
import { useSelector, useDispatch } from 'react-redux';
import { getPublicHomeAction } from 'Actions/home';
// ---Components
import DinamicCarousel from 'Comp/Client/Home/DinamicCarousel';
import BuySteps from 'Comp/Client/Home/BuySteps';
import ButtonProd from 'Comp/Client/Home/ButtonProd';
import Destacados from 'Comp/Client/Home/Destacados';
// ---Others
import { title } from 'Others/labels.json';
// --Request
import { getHomePublic } from 'Others/peticiones.js';
import { asyncHandlerGet, testError } from 'Others/requestHandlers.js';

const { main, sub } = title;

// ------------------------------------------ COMPONENT-----------------------------------------
function HomeCont() {
  // Redux States
  const { banners, paragraph, products } = useSelector(
    reducers => reducers.homeReducer
  );
  const { isMovil } = useSelector(reducers => reducers.appInfoReducer);
  // Redux Actions
  const dispatchR = useDispatch();
  const updateHomeReducer = data => dispatchR(getPublicHomeAction(data));

  // ---Get Home data
  useEffect(() => {
    asyncHandlerGet(getHomePublic, updateHomeReducer, testError);
  }, []);
  return (
    <React.Fragment>
      <div className="h-title">
        {main} <span>{sub}</span>
      </div>
      <p>
        ¡Lo <span>mejor</span> te espera!
      </p>
      <DinamicCarousel isMovil={isMovil} banners={banners} />
      <div className="home-container">
        <p>{paragraph || 'Cargando...'}</p>
        <Destacados items={products} />
        <BuySteps />
        <ButtonProd />
      </div>
    </React.Fragment>
  );
}

export default HomeCont;
