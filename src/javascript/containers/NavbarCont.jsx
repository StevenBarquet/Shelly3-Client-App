// ---Dependencys
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
// ---Redux
import { useSelector, useDispatch } from 'react-redux';
import { changeResponsiveFlag, updatePath } from 'Actions/appInfo';
// ---Components
import AdminMenu from 'Comp/NavBar/AdminMenu';
import ClientMenu from 'Comp/NavBar/ClientMenu';
// ---ComonComponents
import LoadingFullScreen from 'CommonComps/LoadingFullScreen';
// ---Others
import logo from 'Images/logoStoreL.png';
import isMovilDetector from 'Others/isMovilDetector';

// ------------------------------------------ COMPONENT-----------------------------------------
const NavbarCont = withRouter(props => {
  const currentPath = props.location.pathname;
  const isAdmin = new RegExp('^[/][m][a][s][t][e][r]');
  // Redux States
  const { isMovil, isLoading } = useSelector(
    reducers => reducers.appInfoReducer
  );
  // Redux Actions
  const dispatchR = useDispatch();
  const updateResponsiveData = data => dispatchR(changeResponsiveFlag(data));
  const updateCurrentPath = () => dispatchR(updatePath(currentPath));

  const responsiveData = isMovilDetector();
  useEffect(() => {
    updateResponsiveData(responsiveData);
  }, [responsiveData]);

  useEffect(() => updateCurrentPath(), [currentPath]);

  if (currentPath === '/master/login') {
    return <LoadingFullScreen isLoading={isLoading} />;
  }
  if (isAdmin.test(currentPath)) {
    return (
      <>
        <AdminMenu currentPath={currentPath} isMovil={isMovil} logo={logo} />
        <LoadingFullScreen isLoading={isLoading} />
      </>
    );
  }
  return (
    <>
      <ClientMenu currentPath={currentPath} isMovil={isMovil} logo={logo} />
      <LoadingFullScreen isLoading={isLoading} />
    </>
  );
});

export default NavbarCont;
