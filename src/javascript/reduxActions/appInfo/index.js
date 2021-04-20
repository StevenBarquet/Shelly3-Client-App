import { CHANGE_RESPONSIVE, UPDATE_PATH } from 'Types';

export const changeResponsiveFlag = newFlag => dispatch => {
  dispatch({
    type: CHANGE_RESPONSIVE,
    payload: newFlag
  });
};

export const updatePath = newPath => dispatch => {
  dispatch({
    type: UPDATE_PATH,
    payload: newPath
  });
};
