// ---Dependencys
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// ---Pages Master
import HomePageMaster from 'Pages/Master/HomePageMaster';
import AdminProductsPage from 'Pages/Master/AdminProductsPage';
import AddProductsPage from 'Pages/Master/AddProductsPage';
import AdminPublicHome from 'Pages/Master/AdminPublicHomePage';
import ToHomeMaster from 'Pages/Master/ToHomeMasterPage';
import MasterLogin from 'Pages/Master/MasterLoginPage';
import MasterLogout from 'Pages/Master/MasterLogoutPage';
// ---Pages Client
import HomePage from 'Pages/Client/HomePage';
// ---Pages Others
import Error404Page from 'Pages/Error404Page';
// ---Components
import NavbarCont from 'Cont/NavbarCont';
import Footer from 'Comp/Footer';

function AppContainer() {
  return (
    <BrowserRouter>
      <NavbarCont />
      <Switch>
        {/* Master routes */}
        <Route exact path="/master" component={ToHomeMaster} />
        <Route exact path="/master/tienda" component={HomePageMaster} />
        <Route
          exact
          path="/master/tienda/adminProductos"
          component={AdminProductsPage}
        />
        <Route
          exact
          path="/master/tienda/addProductos"
          component={AddProductsPage}
        />
        <Route
          exact
          path="/master/tienda/publicHome"
          component={AdminPublicHome}
        />
        <Route exact path="/master/login" component={MasterLogin} />
        <Route exact path="/master/salir" component={MasterLogout} />
        {/* Client routes */}
        <Route exact path="/" component={HomePage} />
        <Route exact path="*" component={Error404Page} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default AppContainer;
