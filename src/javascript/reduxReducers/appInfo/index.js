import { CHANGE_RESPONSIVE } from 'Types';

const INITIAL_STATE = {
  isMovil: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_RESPONSIVE:
      return {
        ...state,
        isMovil: action.payload
      };

    default:
      return state;
  }
};
