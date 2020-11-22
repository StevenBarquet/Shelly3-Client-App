import { INVERT_FLAG } from 'Types';

export const changeFlag = currentFlag => dispatch => {
  console.log('entro change flag con: ', currentFlag);

  dispatch({
    type: INVERT_FLAG,
    payload: !currentFlag
  });
};
