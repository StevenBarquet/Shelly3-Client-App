// ---Dependencys
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
// ---Redux
import { useSelector, useDispatch } from 'react-redux';
import { changeResponsiveFlag } from 'Actions/appInfo';
// ---Components
import AdminMenu from 'Comp/NavBar/AdminMenu';
import ClientMenu from 'Comp/NavBar/ClientMenu';
// ---Others
import logo from 'Images/logoStoreL.png';
import isMovilDetector from 'Others/isMovilDetector';

// ------------------------------------------ COMPONENT-----------------------------------------
const NavbarCont = withRouter(props => {
  const currentPath = props.location.pathname;
  const isAdmin = new RegExp('^[/][m][a][s][t][e][r]');
  // Redux States
  const { isMovil } = useSelector(reducers => reducers.appInfoReducer);
  // Redux Actions
  const dispatchR = useDispatch();
  const updateResponsiveData = data => dispatchR(changeResponsiveFlag(data));

  const responsiveData = isMovilDetector();
  useEffect(() => {
    updateResponsiveData(responsiveData);
  }, [responsiveData]);

  if (currentPath === '/master/login') {
    return null;
  }
  if (isAdmin.test(currentPath)) {
    return (
      <AdminMenu currentPath={currentPath} isMovil={isMovil} logo={logo} />
    );
  }
  return <ClientMenu currentPath={currentPath} isMovil={isMovil} logo={logo} />;
});

export default NavbarCont;
