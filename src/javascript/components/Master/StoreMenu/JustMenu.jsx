// ---Dependencys
import React from 'react';
import { Button, Menu } from 'antd';
import {
  TeamOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined
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
        <SubMenu key="1" icon={<PieChartOutlined />} title="Utilidades">
          <Menu.Item key="sub1-1">Hoy</Menu.Item>
          <Menu.Item key="sub1-2">Semanal</Menu.Item>
          <Menu.Item key="sub1-3">Mensual</Menu.Item>
          <Menu.Item key="sub1-4">Anual</Menu.Item>
          <Menu.Item key="sub1-5">Historico</Menu.Item>
        </SubMenu>
        <Menu.Item
          icon={<DesktopOutlined />}
          key="/master/tienda/publicHome"
          onClick={() => goToRoute('/master/tienda/publicHome')}
        >
          Home publico
        </Menu.Item>
        <SubMenu key="3" icon={<ContainerOutlined />} title="Productos">
          <Menu.Item
            key="/master/tienda/adminProductos"
            onClick={() => goToRoute('/master/tienda/adminProductos')}
          >
            Administrar Productos
          </Menu.Item>
          <Menu.Item
            key="/master/tienda/addProductos"
            onClick={() => goToRoute('/master/tienda/addProductos')}
          >
            Agregar Productos
          </Menu.Item>
        </SubMenu>
        <SubMenu key="4" icon={<MailOutlined />} title="Ordenes">
          <Menu.Item key="sub4-1">Administrar Ordenes</Menu.Item>
          <Menu.Item key="sub4-2">Modo caja</Menu.Item>
          <Menu.Item key="sub4-3">Generar orden</Menu.Item>
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
      </Menu>
    </div>
  );
}

export default JustMenu;
