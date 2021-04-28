// ---Dependencys
import React, { useReducer, useEffect } from 'react';
// ---Redux
import { useSelector, useDispatch } from 'react-redux';
import { updateLoading } from 'Actions/appInfo';
// ---Components
import SearchPush from 'Comp/Master/ProductsInfo/SearchPush';
import StoreMenuCont from 'Cont/Master/StoreMenuCont';
import ProductForm from 'Comp/Master/AddProducts/ProductForm';
// ---Others
import { isId } from 'Others/otherMethods';
// --Request
import { asyncHandler, testError } from 'Others/requestHandlers.js';
import { getOneProduct } from 'Others/peticiones.js';
import { joiFormValidate, messagesSchema } from './AddProductsSchema';

// ------------------------------------------ REDUCER -----------------------------------------
const typesR = {
  UPDATE_MSGSCHEMA: 'UPDATE_MSGSCHEMA',
  UPDATE_FORM: 'UPDATE_FORM',
  STOP_RELOAD: 'STOP_RELOAD',
  RESET_VALIDATIONS: 'RESET_VALIDATIONS'
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
        reload: payload.reload,
        form: { ...state.form, ...payload.formData }
      };

    case typesR.STOP_RELOAD:
      return { ...state, reload: false };

    default:
      return state;
  }
}
// ------------------------------------------ CONTAINER-----------------------------------------
function AddProducts() {
  // ----------------------- hooks, const, props y states
  const {
    RESET_VALIDATIONS,
    UPDATE_FORM,
    UPDATE_MSGSCHEMA,
    STOP_RELOAD
  } = typesR;
  const initialState = {
    msgSchema: messagesSchema,
    form: {
      nuevo: true,
      online: false
    },
    isValidForm: true,
    reload: false
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  // Redux States
  const { currentPath } = useSelector(reducers => reducers.appInfoReducer);
  const dispatchR = useDispatch();
  // Redux Actions
  const isLoading = flag => dispatchR(updateLoading(flag));

  useEffect(() => getProductData(), [currentPath]);
  useEffect(() => dispatch({ type: STOP_RELOAD }), [state.reload]); // truco para hacer un rerendero condicional
  // ----------------------- Metodos Principales
  function onChangeForm(formData, reload) {
    // console.log('onChangeForm: ', formData);
    dispatch({ type: RESET_VALIDATIONS });
    dispatch({
      type: UPDATE_FORM,
      payload: { formData, reload }
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
  function getProductData() {
    const urlID = getID(currentPath);
    if (urlID) {
      isLoading(true);
      asyncHandler(getOneProduct, onSuccessSearch, onErrorSearch, urlID);
    }
  }
  // ----------------------- Metodos Auxiliares
  function validateForm(formData) {
    const validation = joiFormValidate(formData);
    dispatch({
      type: UPDATE_MSGSCHEMA,
      payload: validation
    });
    return validation;
  }

  function onSuccessSearch(data) {
    onChangeForm(data, true);
    isLoading(false);
  }

  function onErrorSearch(err) {
    testError(err);
    isLoading(false);
  }
  function getID(value) {
    // valida:
    // -Cadena exista y tenga 51 caracteres (27 de url y 24 del id)
    // -Sólo contiene caracteres alfanumericos
    // Retorna:
    // -El id de la url o falso
    if (
      (value && value === '/master/tienda/addProductos') ||
      value === '/master/tienda/addProductos/'
    ) {
      onChangeForm({ nuevo: true, online: false });
      return false;
    }
    if (value && value.length === 52) {
      const urlID = currentPath.substring(28, currentPath.length);
      return isId(urlID) ? urlID : false;
    }
    return false;
  }
  // ----------------------- Render
  return (
    <StoreMenuCont>
      <div className="store-content-container">
        <h1>Agregar Productos</h1>
      </div>
      <SearchPush pushPath="/master/tienda/addProductos" />
      <div className="store-form-container">
        {!state.reload && (
          <ProductForm
            onChangeForm={onChangeForm}
            defaultValues={state.form}
            onSubmit={onSubmit}
            validation={state.msgSchema}
            isValidForm={state.isValidForm}
          />
        )}
      </div>
    </StoreMenuCont>
  );
}

export default AddProducts;
