// ---Dependencys
import React from 'react';
import { Button, Menu } from 'antd';
import {
  TeamOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BarChartOutlined,
  DesktopOutlined,
  CodepenOutlined,
  BarcodeOutlined,
  CarryOutOutlined,
  DollarCircleOutlined
} from '@ant-design/icons';
// ---Components

const { SubMenu } = Menu;

function JustMenu(props) {
  const { collapsed, toggleCollapsed, goToRoute, currentPath } = props;
  return (
    <div className="store-menu-container">
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16 }}
      >
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['3']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        selectedKeys={[currentPath]}
      >
        <SubMenu key="1" icon={<DollarCircleOutlined />} title="Utilidades">
          <Menu.Item key="sub1-1">Hoy</Menu.Item>
          <Menu.Item key="sub1-2">Semanal</Menu.Item>
          <Menu.Item key="sub1-3">Mensual</Menu.Item>
          <Menu.Item key="sub1-4">Anual</Menu.Item>
          <Menu.Item key="sub1-5">Historico</Menu.Item>
        </SubMenu>
        <Menu.Item
          icon={<DesktopOutlined />}
          key="/master/publicHome"
          onClick={() => goToRoute('/master/publicHome')}
        >
          Home publico
        </Menu.Item>
        <Menu.Item
          icon={<CodepenOutlined />}
          key="/master/shippingMethods"
          onClick={() => goToRoute('/master/shippingMethods')}
        >
          Metodos de envío
        </Menu.Item>
        <SubMenu key="3" icon={<BarcodeOutlined />} title="Productos">
          <Menu.Item
            key="/master/adminProductos"
            onClick={() => goToRoute('/master/adminProductos')}
          >
            Administrar Productos
          </Menu.Item>
          <Menu.Item
            key="/master/addProductos"
            onClick={() => goToRoute('/master/addProductos')}
          >
            Agregar/Editar Productos
          </Menu.Item>
          <Menu.Item
            key="/master/productInfo"
            onClick={() => goToRoute('/master/productInfo')}
          >
            Consultar un producto
          </Menu.Item>
        </SubMenu>
        <SubMenu key="4" icon={<CarryOutOutlined />} title="Ordenes">
          <Menu.Item
            key="/master/adminOrders"
            onClick={() => goToRoute('/master/adminOrders')}
          >
            Administrar Ordenes
          </Menu.Item>
          <Menu.Item
            key="/master/storeCart"
            onClick={() => goToRoute('/master/storeCart')}
          >
            Vender en mostrador
          </Menu.Item>
          <Menu.Item key="sub4-3">Generar orden</Menu.Item>
          <Menu.Item key="sub4-4">Seguimiento de ordenes</Menu.Item>
        </SubMenu>
        <SubMenu
          key="5"
          icon={<TeamOutlined />}
          title="Cuentas de administracion"
        >
          <SubMenu key="sub5-1" title="Crear cuenta">
            <Menu.Item key="sub5-1-1">Administrador</Menu.Item>
            <Menu.Item key="sub5-1-2">Master</Menu.Item>
          </SubMenu>
          <SubMenu key="sub5-2" title="Administrar cuentas">
            <Menu.Item key="sub5-2-1">Administrador</Menu.Item>
            <Menu.Item key="sub5-2-2">Master</Menu.Item>
          </SubMenu>
        </SubMenu>
        <Menu.Item
          icon={<BarChartOutlined />}
          key="/master/Analytics"
          onClick={() => goToRoute('/master/Analytics')}
        >
          Analyticas
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default JustMenu;
