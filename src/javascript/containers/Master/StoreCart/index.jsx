// ---Dependencys
import React, { useReducer } from 'react';
import { Row } from 'antd';
// ---ComonComponents
// import ButtonMlg from 'CommonComps/ButtonMlg';
// ---Components
import CartItem from 'Comp/Master/StoreCart/CartItem';
import StepsMostrador from 'Comp/Master/StoreCart/StepsMostrador';
import AdvanceButtons from 'Comp/Master/StoreCart/AdvanceButtons';
// ---Cont
import SearchCont from 'Cont/Master/StoreCart/SearchCont';
import StoreMenuCont from 'Cont/Master/StoreMenuCont';

// ---AUX COMPONENTS
function CartList(props) {
  const { cartProducts } = props;
  if (!cartProducts || cartProducts.length === 0)
    return <h4>No tienes productos en tu carrito</h4>;
  return (
    <Row>
      {cartProducts.map(item => (
        <CartItem key={item._id} {...item} />
      ))}
    </Row>
  );
}
// ------------------------------------------ REDUCER -----------------------------------------
const typesR = {
  ADD_TO_CART: 'ADD_TO_CART',
  CHANGE_STEP: 'CHANGE_STEP'
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case typesR.ADD_TO_CART:
      return {
        ...state,
        cartProducts: [...state.cartProducts, payload]
      };

    case typesR.CHANGE_STEP:
      return {
        ...state,
        step: payload
      };

    default:
      return state;
  }
}
// ------------------------------------------ COMPONENT-----------------------------------------
function StoreCart() {
  // ----------------------- hooks, const, props y states
  const { ADD_TO_CART, CHANGE_STEP } = typesR;
  const initialState = {
    cartProducts: [],
    step: 0
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  // ----------------------- Metodos Principales
  function addToCart(productData) {
    const item = { ...productData, piezas: 1, precio: productData.precioPlaza };
    console.log('addToCart: ', item);
    dispatch({
      type: ADD_TO_CART,
      payload: item
    });
  }
  function toStep(number) {
    dispatch({
      type: CHANGE_STEP,
      payload: number
    });
  }
  return (
    <StoreMenuCont>
      <div className="store-content-container">
        <h1>Venta de mostrador</h1>
      </div>
      <StepsMostrador step={state.step} />
      {state.step === 0 ? (
        <>
          <SearchCont addToCart={addToCart} />
          <CartList cartProducts={state.cartProducts} />
        </>
      ) : (
        <p>
          From del cliente sencillo <br />
          From del cliente para facturar <br />
          Resumen de productos <br />
          Form cobro adicional <br />
          Radio button metodo de pago <br />
          Responsable de Venta (informativo), Subtotal, Total y fecha
        </p>
      )}
      <AdvanceButtons toStep={toStep} step={state.step} />
    </StoreMenuCont>
  );
}

export default StoreCart;
