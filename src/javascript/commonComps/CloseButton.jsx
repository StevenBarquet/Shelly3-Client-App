// ---Dependencys
import React from 'react';
import { CloseCircleFilled } from '@ant-design/icons';

// ------------------------------------------ COMPONENT-----------------------------------------
function CloseButton(props) {
  const { onDeleteButton, _id } = props;
  return (
    <button
      className="close-button"
      type="button"
      value={_id}
      onClick={() => onDeleteButton(_id)}
    >
      <CloseCircleFilled />
    </button>
  );
}

export default CloseButton;
