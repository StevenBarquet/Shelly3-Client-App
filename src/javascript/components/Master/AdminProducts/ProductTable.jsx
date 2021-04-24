/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
// ---Dependencys
import React from 'react';
// ---Components
import { Button, Table } from 'antd';
// ---Others
// import { getALLLaptops } from 'Others/peticiones';

const ProductTable = props => {
  const { products, onDeleteP, onOpenEditProduct, current, pageSize } = props;
  const dataSource = products;

  function handleDelete(e) {
    onDeleteP(e.target.value);
  }
  const editOpen = e => {
    onOpenEditProduct(e.target.value);
  };

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre'
    },
    {
      title: 'Precio Online',
      dataIndex: 'precioOnline',
      key: 'precioOnline'
    },
    {
      title: 'Disponibles',
      dataIndex: 'disponibles',
      key: 'disponibles'
    },
    {
      title: 'Categoria',
      dataIndex: 'categoria',
      key: 'categoria'
    },
    {
      title: 'Delete',
      dataIndex: '_id',
      key: '_id',
      render: _id => (
        <Button onClick={handleDelete} value={_id} type="danger">
          Borrar
        </Button>
      )
    },
    {
      title: 'Edit',
      dataIndex: '_id',
      key: '_id',
      render: _id => (
        <Button onClick={editOpen} value={_id} type="primary">
          Editar
        </Button>
      )
    },
    {
      title: 'Portada',
      dataIndex: 'images',
      key: 'images',
      render: images => (
        <span>
          <img src={images.cover} alt="vmo" width="40px" />
        </span>
      )
    }
  ];
  return (
    <React.Fragment>
      <Table
        pagination={{
          current,
          pageSize
        }}
        dataSource={dataSource}
        columns={columns}
      />
    </React.Fragment>
  );
};

export default ProductTable;
