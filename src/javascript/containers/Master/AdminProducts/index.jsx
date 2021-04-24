// ---Dependencys
import React from 'react';
// ---Components
import StoreMenuCont from 'Cont/Master/StoreMenuCont';
import ProductSearcher from 'Comp/Master/AdminProducts/ProductSearcher';
import ProductTable from 'Comp/Master/AdminProducts/ProductTable';
// ---Redux
import { useSelector, useDispatch } from 'react-redux';
import { updateSearchParams, updateProducts } from 'Actions/master';
// ---Others
import { removeNullProperties } from 'Others/otherMethods';
// --Request
import {
  asyncHandlerGet,
  testError,
  testSuccess
} from 'Others/requestHandlers.js';
import { adminSearchProducts } from 'Others/peticiones.js';

function ProductsDisplay(props) {
  const { updatedData, productCount, products, current, pageSize } = props;
  if (!updatedData)
    return (
      <h4>Realiza una busqueda o deja vacío para traer todos los productos</h4>
    );
  if (productCount === 0) return <h4>Sin resultados de busqueda</h4>;
  return (
    <ProductTable products={products} current={current} pageSize={pageSize} />
  );
}

// ------------------------------------------ COMPONENT-----------------------------------------
function AdminProducts() {
  // ----------------------- hooks, const y states
  // Redux States
  const { masterProducts } = useSelector(reducers => reducers.masterReducer);
  const { productCount, products, updatedData, searchParams } = masterProducts;
  const { isLoading } = useSelector(reducers => reducers.appInfoReducer);
  // Redux Actions
  const dispatchR = useDispatch();
  const updateSearchData = data => dispatchR(updateSearchParams(data));
  const updateReduxProducts = data => dispatchR(updateProducts(data));

  // ----------------------- Metodos Principales
  function submitData(data) {
    const cleanedData = cleanSearchData(searchParams, data);
    console.log('cleanedData ->', cleanedData);
    updateSearchData(data);
    asyncHandlerGet(
      adminSearchProducts,
      updateReduxProducts,
      testError,
      cleanedData
    );
  }

  // ----------------------- Metodos Auxiliares
  function cleanSearchData(searchData, formData) {
    const { filters, searchedValue, sortBy } = formData;
    const fullData = {
      ...searchData,
      searchedValue: searchedValue === '' ? null : searchedValue,
      sortBy,
      filters: { ...filters } // Trick to not mutate searchData
    };

    return {
      ...removeNullProperties(fullData),
      sortBy: JSON.parse(fullData.sortBy)
    };
  }

  return (
    <StoreMenuCont>
      <div className="store-content-container">
        <h1>Administrar Productos</h1>
      </div>
      <ProductSearcher submitData={submitData} defaultValues={searchParams} />
      <div className="store-content-container">
        <ProductsDisplay
          updatedData={updatedData}
          productCount={productCount}
          products={products}
          current={searchParams.pageNumber}
          pageSize={searchParams.pageSize}
        />
      </div>
    </StoreMenuCont>
  );
}
export default AdminProducts;
