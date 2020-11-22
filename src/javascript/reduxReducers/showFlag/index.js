import { INVERT_FLAG } from 'Types';

const INITIAL_STATE = {
  showImg: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INVERT_FLAG:
      return {
        ...state,
        showImg: action.payload
      };

    default:
      return state;
  }
};
