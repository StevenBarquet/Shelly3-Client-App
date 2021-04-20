import { CHANGE_RESPONSIVE, UPDATE_PATH } from 'Types';

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

    case UPDATE_PATH:
      return {
        ...state,
        currentPath: action.payload
      };

    default:
      return state;
  }
};
