// ---Dependencys
import React, { useReducer, useEffect } from 'react';
// ---Redux
import { useSelector, useDispatch } from 'react-redux';
import { updateLoading } from 'Actions/appInfo';
// ---Components
import SearchPush from 'Comp/Master/ProductsInfo/SearchPush';
import StoreMenuCont from 'Cont/Master/StoreMenuCont';
import ProductForm from 'Comp/Master/AddProducts/ProductForm';
import SearchMercadoLibre from 'Comp/Master/AddProducts/SearchMercadoLibre';
// ---Others
import {
  isId,
  ignoreArgs,
  removeNullProperties,
  removeBlankProperties
} from 'Others/otherMethods';
import superMLhandler from 'Others/superMLhandler';
// --Request
import { asyncHandler, testError } from 'Others/requestHandlers.js';
import {
  getOneProduct,
  updateProductRequest,
  createProductRequest
} from 'Others/peticiones.js';
import { joiFormValidate, messagesSchema } from './AddProductsSchema';

// ------------------------------------------ REDUCER -----------------------------------------
const typesR = {
  UPDATE_MSGSCHEMA: 'UPDATE_MSGSCHEMA',
  UPDATE_FORM: 'UPDATE_FORM',
  STOP_RELOAD: 'STOP_RELOAD',
  START_RELOAD: 'START_RELOAD',
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
        form: { ...state.form, ...payload }
      };

    case typesR.STOP_RELOAD:
      return { ...state, reload: false };

    case typesR.START_RELOAD:
      return {
        ...state,
        reload: true,
        form: { ...state.form, ...payload },
        isValidForm: true,
        msgSchema: messagesSchema
      };

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
    STOP_RELOAD,
    START_RELOAD
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
  function onChangeForm(formData) {
    // console.log('onChangeForm: ', formData);
    dispatch({ type: RESET_VALIDATIONS });
    dispatch({
      type: UPDATE_FORM,
      payload: formData
    });
  }
  function onSearchML(data) {
    isLoading(true);
    superMLhandler(data.id).then(res => {
      // console.log('onSearchML: ', res);
      onSuccessSearch(res);
      isLoading(false);
    });
  }
  function onSubmit(formData) {
    const { isValid } = validateForm(formData);
    if (isValid) {
      const data = fitDataToRequest(formData);
      const { _id } = data;
      if (_id) updateProduct(data);
      else createProduct(data);
    } else {
      console.log('onSubmit: Error\n', formData);
    }
  }
  function getProductData() {
    const urlID = getID(currentPath);
    if (urlID) {
      isLoading(true);
      asyncHandler(getOneProduct, onSuccessSearch, onError, urlID);
    }
  }
  function updateProduct(data) {
    isLoading(true);
    asyncHandler(updateProductRequest, isLoadingFalse, onError, data);
  }
  function createProduct(data) {
    isLoading(true);
    asyncHandler(createProductRequest, isLoadingFalse, onError, data);
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
  function isLoadingFalse() {
    isLoading(false);
  }
  function onSuccessSearch(data) {
    const fixedData = fitDataToForm(data);
    dispatch({ type: START_RELOAD, payload: fixedData });
    isLoading(false);
  }
  function onError(err) {
    testError(err);
    isLoading(false);
  }
  function fitDataToForm(data) {
    // console.log('fitDataToForm', data);
    const keys = Object.keys(data);
    const values = Object.values(data);
    let newData = {};

    keys.forEach((key, i) => {
      if (key === 'images') {
        newData = {
          ...newData,
          imagesCover: data.images.cover,
          imagesMini: data.images.mini || '',
          imagesExtra1: data.images.extra ? data.images.extra[0] || '' : '',
          imagesExtra2: data.images.extra ? data.images.extra[1] || '' : '',
          imagesExtra3: data.images.extra ? data.images.extra[2] || '' : ''
        };
      } else {
        newData = { ...newData, [key]: values[i] };
      }
    });
    // console.log('fit data: ', newData);
    return newData;
  }
  function fitDataToRequest(data) {
    const ignore = [
      '__v',
      'date',
      'countVisits',
      'countQuestions',
      'countPurchases',
      'countLocalPurchases'
    ];
    let cleanData = ignoreArgs(data, ignore);
    cleanData = removeBlankProperties(cleanData);
    cleanData = removeNullProperties(cleanData);
    const keys = Object.keys(cleanData);
    const values = Object.values(cleanData);
    // console.log(cleanData);
    let newData = {};

    keys.forEach((key, i) => {
      if (key === 'imagesCover') {
        newData = {
          ...newData,
          images: { ...newData.images, cover: values[i] }
        };
      } else if (key === 'imagesMini') {
        newData = {
          ...newData,
          images: { ...newData.images, mini: values[i] }
        };
      } else if (
        key === 'imagesExtra1' ||
        key === 'imagesExtra2' ||
        key === 'imagesExtra3'
      ) {
        newData = {
          ...newData,
          images: {
            ...newData.images,
            extra: [...(newData.images.extra || []), values[i]]
          }
        };
      } else {
        newData = { ...newData, [key]: values[i] };
      }
    });
    // console.log('fitDataToRequest: ', newData);
    return newData;
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
      <SearchMercadoLibre onFinish={onSearchML} />
      <div className="store-form-container">
        {!state.reload && (
          <ProductForm
            onChangeForm={onChangeForm}
            defaultValues={state.form}
            onSubmit={onSubmit}
            validation={state.msgSchema}
            isValidForm={state.isValidForm}
            isEdit={state.form._id}
          />
        )}
      </div>
    </StoreMenuCont>
  );
}

export default AddProducts;
