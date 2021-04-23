// ---Dependencys
import React from 'react';
// ---Components
import StoreMenuCont from 'Cont/Master/StoreMenuCont';
import ProductSearcher from 'Comp/Master/AdminProducts/ProductSearcher';

const initialFormSearchValues = {
  filters: {
    categoria: 'Todas',
    descuento: null,
    nuevo: null,
    online: null
  },
  sortBy: { nombre: 1 }
};

// ------------------------------------------ COMPONENT-----------------------------------------
function AdminProducts() {
  return (
    <StoreMenuCont>
      <div className="store-content-container">
        <h1>Administrar Productos</h1>
      </div>
      <ProductSearcher defaultValues={initialFormSearchValues} />
    </StoreMenuCont>
  );
}
export default AdminProducts;
