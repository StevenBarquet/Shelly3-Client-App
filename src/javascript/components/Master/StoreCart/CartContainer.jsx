// ---Dependencys
import React from 'react';
import { Row, Col } from 'antd';
// ---Cont
import SearchCont from 'Cont/Master/StoreCart/SearchCont';
// ---Components
import CartMaths from 'Comp/Master/StoreCart/CartMaths';
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
  const {
    subTotal,
    size,
    addToCart,
    items,
    updatePiezas,
    onDeleteButton
  } = props;
  return (
    <>
      <Row>
        <Col xs={24} sm={24} lg={6}>
          <CartMaths subTotal={subTotal} size={size} />
        </Col>
        <Col xs={24} sm={24} lg={18}>
          <SearchCont addToCart={addToCart} />
        </Col>
        <Col xs={24} sm={24} lg={{ offset: 6, span: 18 }}>
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
