// ---Dependencys
import React from 'react';
import { Helmet } from 'react-helmet';
// ---Components
import ImageExCont from 'Cont/ImageExCont';

// ------------------------------------------ COMPONENT-----------------------------------------
const ImageExPage = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Ejemplo con imagen</title>
      </Helmet>
      <ImageExCont />
    </React.Fragment>
  );
};

export default ImageExPage;
