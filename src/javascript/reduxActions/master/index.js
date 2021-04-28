import {
  UPDATE_CURRENT_PRODUCTS,
  UPDATE_SEARCH_PARAMS,
  UPDATE_PAGE,
  UPDATE_PAGE_AND_SIZE,
  UPDATE_ONE_PRODUCT
} from 'Types';

export const updateSearchParams = data => dispatch => {
  dispatch({
    type: UPDATE_SEARCH_PARAMS,
    payload: data
  });
};

export const updateProducts = data => dispatch => {
  dispatch({
    type: UPDATE_CURRENT_PRODUCTS,
    payload: data
  });
};

export const updateOneProduct = data => dispatch => {
  dispatch({
    type: UPDATE_ONE_PRODUCT,
    payload: data
  });
};

export const updatePage = data => dispatch => {
  const { newPage, newSize } = data;
  if (newSize) {
    dispatch({
      type: UPDATE_PAGE_AND_SIZE,
      payload: { pageNumber: newPage, pageSize: newSize }
    });
  } else {
    dispatch({
      type: UPDATE_PAGE,
      payload: newPage
    });
  }
};
