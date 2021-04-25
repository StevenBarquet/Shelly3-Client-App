/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
// ---Dependencys
import React from 'react';
// ---Components
import { Button, Table, Pagination } from 'antd';
// ---Others
// import { getALLLaptops } from 'Others/peticiones';

const ProductTable = props => {
  const {
    products,
    onDeleteP,
    onOpenEditProduct,
    current,
    pageSize,
    total,
    onPageChange
  } = props;
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

  //   function onShowSizeChange(current2, pageSize2) {
  //     console.log('onShowSizeChange', current2, pageSize2);
  //   }
  return (
    <React.Fragment>
      <Table pagination={false} dataSource={dataSource} columns={columns} />
      <Pagination
        style={{ margin: '15px auto 0px auto' }}
        onShowSizeChange={onPageChange}
        pageSizeOptions={[20, 30, 50, 100]}
        showSizeChanger
        current={current}
        pageSize={pageSize}
        onChange={onPageChange}
        total={total}
      />
    </React.Fragment>
  );
};

export default ProductTable;
