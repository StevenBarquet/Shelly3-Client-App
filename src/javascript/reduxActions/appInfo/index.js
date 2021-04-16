import { CHANGE_RESPONSIVE } from 'Types';

export const changeResponsiveFlag = newFlag => dispatch => {
  console.log('entro changeResponsiveFlag con: ', newFlag);

  dispatch({
    type: CHANGE_RESPONSIVE,
    payload: newFlag
  });
};
