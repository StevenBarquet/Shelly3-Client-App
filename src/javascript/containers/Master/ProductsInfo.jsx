// ---Dependencys
import React from 'react';
// ---Components
import StoreMenuCont from 'Cont/Master/StoreMenuCont';
import SearchPush from 'Comp/Master/ProductsInfo/SearchPush';
import SearchOneProductForm from 'Comp/Master/ProductsInfo/SearchOneProductForm';

// ------------------------------------------ COMPONENT-----------------------------------------
function ProductsInfo() {
  return (
    <StoreMenuCont>
      <div className="store-content-container">
        <h1>Información del producto</h1>
      </div>
      <SearchOneProductForm pushPath="/master/tienda/productInfo" />
      <SearchPush data={{}} />
    </StoreMenuCont>
  );
}
export default ProductsInfo;
