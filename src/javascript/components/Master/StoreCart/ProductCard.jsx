// ---Dependencys
import React from 'react';
import { Row, Col } from 'antd';
// ---ComonComponents
import InvisibleButton from 'CommonComps/InvisibleButton';
// ---Components
// import AuthValidate from 'Comp/Master/AuthValidate';
// ------------------------------------------ COMPONENT-----------------------------------------
function ProductCard(props) {
  const { onHideCard, data } = props;
  const {
    nombre,
    precioPlaza,
    precioOnline,
    nuevo,
    online,
    disponibles,
    descripcion,
    categoria,
    subcategoria,
    marca,
    _id,
    images
  } = data;
  return (
    <>
      <InvisibleButton callback={onHideCard} />
      <div className="store-product-info-container">
        <Row>
          <Col xs={24} sm={24} lg={24}>
            <h2>{nombre}</h2>
          </Col>
          <Col xs={24} sm={24} lg={12}>
            <h4>
              Precio mostrador: <span>{precioPlaza}</span>
            </h4>
          </Col>
          <Col xs={24} sm={24} lg={12}>
            <h4>
              Precio Online: <span>{precioOnline}</span>
            </h4>
          </Col>
          <Col xs={24} sm={24} lg={12}>
            <h4>
              Producto nuevo: <span>{nuevo ? 'Si' : 'No'}</span>
            </h4>
          </Col>
          <Col xs={24} sm={24} lg={12}>
            <h4>
              Disponible online: <span>{online ? 'Si' : 'No'}</span>
            </h4>
          </Col>
          <Col xs={24} sm={24} lg={12}>
            <h4>
              Piezas disponibles: <span>{disponibles}</span>
            </h4>
          </Col>
          <Col xs={24} sm={24} lg={24}>
            <h4>
              Descripción: <p>{descripcion}</p>
            </h4>
          </Col>
          <Col xs={24} sm={24} lg={12}>
            <h4>
              Categoria: <span>{categoria}</span>
            </h4>
          </Col>
          <Col xs={24} sm={24} lg={12}>
            <h4>
              Subcategoria: <span>{subcategoria}</span>
            </h4>
          </Col>
          <Col xs={24} sm={24} lg={12}>
            <h4>
              Marca: <span>{marca}</span>
            </h4>
          </Col>
          <Col xs={24} sm={24} lg={12}>
            <h4>
              ID: <span>{_id}</span>
            </h4>
          </Col>
          <Col xs={24} sm={24} lg={12}>
            <h4>
              Cover: <span>{images.cover}</span>
            </h4>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ProductCard;
