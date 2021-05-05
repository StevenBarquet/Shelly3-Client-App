// ---Dependencys
import React from 'react';
import { Row, Col, Form, InputNumber } from 'antd';
import { Link } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';
// ---ComonComponents
import FitImg from 'CommonComps/FitImg';
import ButtonMlg from 'CommonComps/ButtonMlg';
// ---Others
import { priceFormat } from 'Others/otherMethods';

// ---AUX COMPONENTS
function PiezasForm(props) {
  // ----------------------- hooks, const, props y states
  const { max, id, callback, defaultValue } = props;
  const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 }
  };
  // ----------------------- Metodos Principales
  function onFormChange(objValue) {
    const value = Object.values(objValue)[0];
    callback(id, value);
  }
  return (
    <Form
      initialValues={{ piezas: defaultValue }}
      onValuesChange={onFormChange}
    >
      <Form.Item
        {...formItemLayout}
        name="piezas"
        label="Piezas"
        validateStatus="erro"
        help={`Máximas: ${max}`}
      >
        <InputNumber min={1} max={max} />
      </Form.Item>
    </Form>
  );
}
// ------------------------------------------ COMPONENT-----------------------------------------
function CartItem(props) {
  const {
    images,
    piezas,
    _id,
    updatePiezas,
    precio,
    nombre,
    disponibles,
    onDeleteButton
  } = props;
  // ----------------------- Render
  return (
    <Col xs={24} sm={24} lg={{ offset: 1, span: 20 }}>
      <div className="buy-item-container">
        <Row>
          <div className="buy-item-header">
            <Link to={'/item=' + _id}>{nombre}</Link>
          </div>
        </Row>
        <Row>
          <Col xs={24} sm={24} lg={6}>
            <FitImg
              srcImg={images ? images.mini || images.cover : 'none'}
              estilo="cart-images-big"
              alt={nombre}
            />
          </Col>
          <Col xs={24} sm={24} lg={6}>
            <div className="col-vertical-align">
              <PiezasForm
                callback={updatePiezas}
                defaultValue={piezas}
                id={_id}
                max={disponibles}
              />
            </div>
          </Col>
          <Col xs={24} sm={24} lg={6}>
            <div className="col-vertical-align">
              {priceFormat(precio * piezas)}
            </div>
          </Col>
          <Col xs={24} sm={24} lg={6}>
            <div className="col-vertical-align">
              <ButtonMlg
                variant="yellow"
                size="mini"
                value={_id}
                onClick={() => onDeleteButton(_id)}
                widthB="26px"
                icon={<CloseOutlined />}
              />
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  );
}

export default CartItem;
