// ---Dependencys
import React from 'react';
// ---Components
import StoreMenuCont from 'Cont/Master/StoreMenuCont';
import ProductSearcher from 'Comp/Master/AdminProducts/ProductSearcher';
import ProductTable from 'Comp/Master/AdminProducts/ProductTable';
// ---Redux
import { useSelector, useDispatch } from 'react-redux';
import { updateLoading } from 'Actions/appInfo';
import { updateSearchParams, updateProducts, updatePage } from 'Actions/master';
// ---Others
import { removeNullProperties } from 'Others/otherMethods';
// --Request
import { asyncHandler, testError } from 'Others/requestHandlers.js';
import { adminSearchProducts } from 'Others/peticiones.js';

// ---AUX COMPONENTS
function ProductsDisplay(props) {
  const {
    updatedData,
    productCount,
    products,
    current,
    pageSize,
    onPageChange
  } = props;
  if (!updatedData)
    return (
      <h4>Realiza una busqueda o deja vacío para traer todos los productos</h4>
    );
  if (productCount === 0) return <h4>Sin resultados de busqueda</h4>;
  return (
    <ProductTable
      products={products}
      current={current}
      pageSize={pageSize}
      total={productCount}
      onPageChange={onPageChange}
    />
  );
}

// ------------------------------------------ COMPONENT-----------------------------------------
function AdminProducts() {
  // ----------------------- hooks, const, props y states
  // Redux States
  const { masterProducts } = useSelector(reducers => reducers.masterReducer);
  const { productCount, products, updatedData, searchParams } = masterProducts;
  // Redux Actions
  const dispatchR = useDispatch();
  const updateSearchData = data => dispatchR(updateSearchParams(data));
  const updateReduxProducts = data => dispatchR(updateProducts(data));
  const updateReduxPage = page => dispatchR(updatePage(page));
  const isLoading = flag => dispatchR(updateLoading(flag));

  // ----------------------- Metodos Principales
  function submitData(data) {
    isLoading(true);
    updateSearchData(data);
    const cleanedData = cleanSearchData(searchParams, data);
    asyncHandler(adminSearchProducts, onSuccessSearch, testError, cleanedData);
  }

  function onPageChange(newPage, newSize) {
    isLoading(true);
    updateReduxPage({ newPage, newSize });
    const changedPage = newSize
      ? { ...searchParams, pageNumber: newPage, pageSize: newSize }
      : { ...searchParams, pageNumber: newPage };
    const cleanedData = cleanSearchData(changedPage, searchParams);
    asyncHandler(adminSearchProducts, onSuccessSearch, testError, cleanedData);
  }

  // ----------------------- Metodos Auxiliares

  function onSuccessSearch(data) {
    isLoading(false);
    updateReduxProducts(data);
  }

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

  // ----------------------- Render
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
          onPageChange={onPageChange}
        />
      </div>
    </StoreMenuCont>
  );
}
export default AdminProducts;
