// ---Dependencys
import React from 'react';
import { Link } from 'react-router-dom';
// ---Redux
import { useSelector, useDispatch } from 'react-redux';
import { changeFlag } from 'Actions/showFlag';
// ---Others
import frame from 'Images/frame.png';

function ImageExample() {
  // Redux States
  const flag = useSelector(reducers => reducers.showFlagReducer);
  // Redux Actions
  const dispatchR = useDispatch();
  const changeF = currentFlag => dispatchR(changeFlag(currentFlag));

  function handleclick() {
    changeF(flag.showImg);
  }

  return (
    <React.Fragment>
      <Link to="/">
        <h3>To home --- "react-router"</h3>
      </Link>
      <a href="/">
        <h3>To home --- "href"</h3>
      </a>
      <button type="button" onClick={handleclick}>
        Mostrar imagen
      </button>
      {flag.showImg && <img src={frame} alt="frameo" />}
    </React.Fragment>
  );
}

export default ImageExample;
