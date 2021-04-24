import { UPDATE_CURRENT_PRODUCTS, UPDATE_SEARCH_PARAMS } from 'Types';

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
