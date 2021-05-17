// ---Dependencys
import React from 'react';
import { Row, Col } from 'antd';
// ---Cont
import SearchCont from 'Cont/Master/StoreCart/SearchCont';
// ---Components
import CartItem from 'Comp/Master/StoreCart/CartItem';

// ---AUX COMPONENTS
function CartList(props) {
  const { items, updatePiezas, onDeleteButton } = props;
  if (!items || items.length === 0) return null;
  return (
    <Row>
      {items.map(item => (
        <CartItem
          key={item._id}
          {...item}
          onDeleteButton={onDeleteButton}
          updatePiezas={updatePiezas}
        />
      ))}
    </Row>
  );
}
// ------------------------------------------ COMPONENT-----------------------------------------
function CartContainer(props) {
  const { addToCart, items, updatePiezas, onDeleteButton } = props;
  return (
    <>
      <Row style={{ marginTop: 30 }}>
        <Col xs={24} sm={24} lg={24}>
          <SearchCont addToCart={addToCart} />
        </Col>
        <Col xs={24} sm={24} lg={24}>
          <CartList
            updatePiezas={updatePiezas}
            items={items}
            onDeleteButton={onDeleteButton}
          />
        </Col>
      </Row>
    </>
  );
}

export default CartContainer;
