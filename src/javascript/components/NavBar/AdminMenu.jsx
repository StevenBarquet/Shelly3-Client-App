// ---Dependencys
import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
// ---Media
// import c1 from 'Images/bannerD1.jpg';

// ------------------------------------------ COMPONENT-----------------------------------------
function AdminMenu(props) {
  const { isMovil, logo, currentPath } = props;
  return (
    <Row className="nav-div">
      <Col xs={24} sm={24} lg={6}>
        <Link to="/">
          <div className="to-home">
            <img src={logo} alt="Shelly" width="100%" />
          </div>
        </Link>
      </Col>
      <Col xs={24} sm={24} lg={18}>
        <Row>
          <Col xs={24} sm={24} lg={4}>
            <Link to="/master/productos">
              <div
                className={
                  currentPath === '/master/productos'
                    ? 'nav-btn nav-border'
                    : 'nav-btn'
                }
              >
                Productos
              </div>
            </Link>
          </Col>
          <Col xs={24} sm={24} lg={4}>
            <Link to="/master/ordenes">
              <div
                className={
                  currentPath === '/master/ordenes'
                    ? 'nav-btn nav-border'
                    : 'nav-btn'
                }
              >
                Ordenes
              </div>
            </Link>
          </Col>
          <Col xs={24} sm={24} lg={4}>
            <Link to="/master/cuenta">
              <div
                className={
                  currentPath === '/master/cuenta'
                    ? 'nav-btn nav-border'
                    : 'nav-btn'
                }
              >
                Mi cuenta
              </div>
            </Link>
          </Col>
          <Col xs={24} sm={24} lg={4}>
            <Link to="/master/salir">
              <div
                className={
                  currentPath === '/master/salir'
                    ? 'nav-btn nav-border'
                    : 'nav-btn'
                }
              >
                Salir
              </div>
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default AdminMenu;
