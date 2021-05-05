// ---Dependencys
import React, { useEffect, useReducer } from 'react';
// ---Components
import StepsMostrador from 'Comp/Master/StoreCart/StepsMostrador';
import AdvanceButtons from 'Comp/Master/StoreCart/AdvanceButtons';
import OrderDataForm from 'Comp/Master/StoreCart/OrderDataForm';
import CartContainer from 'Comp/Master/StoreCart/CartContainer';
// ---CommonComps
import ModalConfirmation from 'CommonComps/ModalConfirmation';
// ---Cont
import StoreMenuCont from 'Cont/Master/StoreMenuCont';
// ---Others
import { searchProductByID } from 'Others/otherMethods';
import { joiFormValidate, messagesSchema } from './OrderDataFormJoi';

// ------------------------------------------ REDUCER -----------------------------------------
const typesR = {
  ADD_TO_CART: 'ADD_TO_CART',
  CHANGE_STEP: 'CHANGE_STEP',
  UPDATE_MSGSCHEMA: 'UPDATE_MSGSCHEMA',
  UPDATE_FORM: 'UPDATE_FORM',
  RESET_VALIDATIONS: 'RESET_VALIDATIONS',
  UPDATE_MATHS: 'UPDATE_MATHS',
  UPDATE_TOTAL: 'UPDATE_TOTAL'
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case typesR.RESET_VALIDATIONS:
      return {
        ...state,
        isValidForm: true,
        msgSchema: messagesSchema
      };

    case typesR.UPDATE_MSGSCHEMA:
      return {
        ...state,
        isValidForm: payload.isValid,
        msgSchema: payload.messagesSchema
      };

    case typesR.UPDATE_FORM:
      return {
        ...state,
        orderData: { ...state.orderData, ...payload }
      };

    case typesR.UPDATE_MATHS:
      return {
        ...state,
        subTotal: payload.subTotal,
        size: payload.size,
        orderData: {
          ...state.orderData,
          totalCosto: payload.costos
        }
      };

    case typesR.UPDATE_TOTAL:
      return {
        ...state,
        orderData: {
          ...state.orderData,
          totalVenta: payload
        }
      };

    case typesR.ADD_TO_CART:
      return {
        ...state,
        orderData: {
          ...state.orderData,
          items: [...state.orderData.items, payload]
        }
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
  const {
    ADD_TO_CART,
    CHANGE_STEP,
    RESET_VALIDATIONS,
    UPDATE_FORM,
    UPDATE_MSGSCHEMA,
    UPDATE_MATHS,
    UPDATE_TOTAL
  } = typesR;
  const initialState = {
    orderData: {
      items: [],
      ventaTipo: 'local 133',
      estatus: 'Finalizado',
      responsableVenta: 'Pruebas',
      totalVenta: 0
    },
    step: 0,
    msgSchema: messagesSchema,
    isValidForm: true
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => updateMaths(), [state.orderData.items]);
  useEffect(() => updateTotal(), [state.subTotal, state.orderData.cantidad]);

  // ----------------------- Metodos Principales
  function addToCart(productData) {
    const item = { ...productData, piezas: 1, precio: productData.precioPlaza };
    const { _id } = item;
    const { items } = state.orderData;
    const itemExist = searchProductByID(items, _id);
    if (!itemExist && itemExist !== 0) {
      dispatch({
        type: ADD_TO_CART,
        payload: item
      });
    }
  }
  function toStep(number) {
    dispatch({
      type: CHANGE_STEP,
      payload: number
    });
  }
  function onChangeForm(obj) {
    dispatch({ type: RESET_VALIDATIONS });
    dispatch({
      type: UPDATE_FORM,
      payload: obj
    });
  }
  function onSubmit(formData) {
    const { isValid } = validateForm(formData);
    if (isValid) {
      console.log('onSubmit: Success\n', formData);
    } else {
      console.log('onSubmit: Error\n', formData);
    }
  }
  function updateMaths() {
    const costos = getCost();
    const subTotal = getSubTotal();
    const size = getSize();
    dispatch({
      type: UPDATE_MATHS,
      payload: { costos, subTotal, size }
    });
  }
  function updateTotal() {
    const { subTotal, orderData } = state;
    const { cantidad } = orderData;
    dispatch({
      type: UPDATE_TOTAL,
      payload: subTotal + (cantidad || 0)
    });
  }
  function updatePiezas(id, value) {
    const { items } = state.orderData;
    const itemIndex = searchProductByID(items, id);
    const changedItems = getChangedItems(itemIndex, value);
    dispatch({
      type: UPDATE_FORM,
      payload: { items: changedItems }
    });
  }
  function onDeleteButton(id) {
    const question = '¿Deseas eliminar éste producto?';
    const details = `El producto será eliminado de la lista`;
    ModalConfirmation(question, details, deleteFromCart, id);
  }
  // ----------------------- Metodos Auxiliares
  function deleteFromCart(id) {
    const { items } = state.orderData;
    const itemIndex = searchProductByID(items, id);
    const reducedItems = getReducedItems(itemIndex);
    console.log('reducedItems: ', reducedItems);
    dispatch({
      type: UPDATE_FORM,
      payload: { items: reducedItems }
    });
  }
  function validateForm(formData) {
    const validation = joiFormValidate(formData);
    dispatch({
      type: UPDATE_MSGSCHEMA,
      payload: validation
    });
    return validation;
  }
  function getSubTotal() {
    const { items } = state.orderData;
    let subTotal = 0;
    if (items && items.length > 0) {
      items.forEach(item => (subTotal += item.precio * item.piezas));
    }
    return subTotal;
  }
  function getCost() {
    const { items } = state.orderData;
    let cost = 0;
    if (items && items.length > 0) {
      items.forEach(item => {
        cost += item.costo * item.piezas;
      });
    }
    return cost;
  }
  function getSize() {
    const { items } = state.orderData;
    let size = 0;
    if (items && items.length > 0) {
      items.forEach(item => {
        size += item.piezas;
      });
    }
    return size;
  }
  function getChangedItems(itemIndex, value) {
    const { items } = state.orderData;
    const newItem = { ...items[itemIndex], piezas: value };
    const newItems = items.map((item, index) => {
      if (index === itemIndex) return newItem;
      return item;
    });
    return newItems;
  }
  function getReducedItems(itemIndex) {
    const { items } = state.orderData;
    let newItems = [];
    items.forEach((item, index) => {
      if (index !== itemIndex) newItems = [...newItems, item];
    });
    return newItems;
  }
  return (
    <StoreMenuCont>
      <div className="store-content-container">
        <h1>Venta de mostrador</h1>
      </div>
      <StepsMostrador step={state.step} />
      {state.step === 0 ? (
        <CartContainer
          subTotal={state.subTotal}
          size={state.size}
          items={state.orderData.items}
          addToCart={addToCart}
          updatePiezas={updatePiezas}
          onDeleteButton={onDeleteButton}
        />
      ) : (
        <OrderDataForm
          onChangeForm={onChangeForm}
          defaultValues={state.orderData}
          onSubmit={onSubmit}
          validation={state.msgSchema}
          isValidForm={state.isValidForm}
          subTotal={state.subTotal}
          totalVenta={state.orderData.totalVenta}
          responsableVenta={state.orderData.responsableVenta}
        />
      )}
      <AdvanceButtons toStep={toStep} step={state.step} />
    </StoreMenuCont>
  );
}

export default StoreCart;
