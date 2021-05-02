// ---Dependencys
import React from 'react';
// import { Card, Form, Input, Row } from 'antd';
// ---ComonComponents
// import ButtonMlg from 'CommonComps/ButtonMlg';
// ---Components
import SearchCont from 'Cont/Master/StoreCart/SearchCont';
// ---Cont
import StoreMenuCont from 'Cont/Master/StoreMenuCont';
// ------------------------------------------ COMPONENT-----------------------------------------
function StoreCart() {
  return (
    <StoreMenuCont>
      <div className="store-content-container">
        <h1>Venta de mostrador</h1>
      </div>
      <SearchCont />
      {/* <CartList /> */}
    </StoreMenuCont>
  );
}

export default StoreCart;
