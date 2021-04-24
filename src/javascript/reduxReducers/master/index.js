import { UPDATE_CURRENT_PRODUCTS, UPDATE_SEARCH_PARAMS } from 'Types';

const INITIAL_STATE = {
  masterProducts: {
    productCount: 0,
    products: [],
    updatedData: false,
    searchParams: {
      pageNumber: 1,
      pageSize: 30,
      searchedValue: null,
      filters: {
        categoria: null,
        descuento: null,
        nuevo: null,
        online: null
      },
      sortBy: '{ "nombre": 1 }'
    }
  }
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_SEARCH_PARAMS: {
      return {
        ...state,
        masterProducts: {
          ...state.masterProducts,
          searchParams: { ...state.masterProducts.searchParams, ...payload }
        }
      };
    }

    case UPDATE_CURRENT_PRODUCTS:
      return {
        ...state,
        masterProducts: {
          ...state.masterProducts,
          updatedData: true,
          ...payload
        }
      };

    default:
      return state;
  }
};
