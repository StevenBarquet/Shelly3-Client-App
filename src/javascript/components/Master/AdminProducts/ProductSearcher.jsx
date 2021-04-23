/* eslint-disable prefer-promise-reject-errors */
// ---Dependencys
import React, { useState } from 'react';
import { Row, Col, Form, Input, Select, Radio } from 'antd';
// import { useHistory } from 'react-router-dom';
import {
  LoginOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined
} from '@ant-design/icons';
// ---CommonComps
import ButtonMlg from 'CommonComps/ButtonMlg';
import mapOptions from 'CommonComps/mapOptions';
// ---Other
import { productos } from 'Others/store-data.json';

const filterOption = [
  {
    label: 'Ambos',
    value: null
  },
  {
    label: 'Si',
    value: true
  },
  {
    label: 'No',
    value: false
  }
];

// ------------------------------------------ COMPONENT-----------------------------------------
function ProductSearcher(props) {
  const { defaultValues } = props;
  const [advanceSearch, setAdvanceSearch] = useState(true);

  // recibe el valor de un input y valida que no esté vació y que cumpla la regex isID
  function validate(rule, value) {
    if (!value || (value && value.length < 50)) {
      return Promise.resolve();
    }
    return Promise.reject('Ingresa una palabra menor a 50 caracteres');
  }

  const changeAdvance = () => setAdvanceSearch(!advanceSearch);

  // const formItemLayoutLong = {
  //   labelCol: { span: 8 },
  //   wrapperCol: { span: 15 }
  // };
  return (
    <div className="store-content-container">
      {/* ----------------------------form------------------------- */}
      <Form
        style={{ width: '100%' }}
        initialValues={defaultValues || null}
        onFinish={data => console.log('www', data)}
      >
        <Row>
          <Col style={{ marginTop: '20px' }} xl={17}>
            <Form.Item
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 17 }}
              name="searchedValue"
              label="Palabra clave"
              rules={[
                {
                  required: false,
                  message: 'Máximo 50 caracteres'
                },
                { validator: validate }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <SubmitButton advanceSearch={advanceSearch} />
          <FilterButton
            advanceSearch={advanceSearch}
            changeAdvance={changeAdvance}
          />
          {/* -------------------Advanced options---------------- */}
          {advanceSearch ? (
            <>
              {/* --Filtros-- */}
              <Col offset={1} xs={22} sm={22} lg={20}>
                <h2>Filtrar por:</h2>
              </Col>
              <Col xs={11} sm={11} lg={7}>
                <Form.Item
                  labelCol={{ span: 12 }}
                  wrapperCol={{ span: 12 }}
                  name={['filters', 'online']}
                  label="Venta Online"
                >
                  <Select>{mapOptions(filterOption)}</Select>
                </Form.Item>
              </Col>
              <Col
                xs={{ span: 11, offset: 1 }}
                sm={{ span: 11, offset: 1 }}
                lg={7}
              >
                <Form.Item
                  labelCol={{ span: 12 }}
                  wrapperCol={{ span: 12 }}
                  name={['filters', 'nuevo']}
                  label="Producto Nuevo"
                >
                  <Select>{mapOptions(filterOption)}</Select>
                </Form.Item>
              </Col>
              <Col xs={11} sm={11} lg={7}>
                <Form.Item
                  labelCol={{ span: 12 }}
                  wrapperCol={{ span: 12 }}
                  name={['filters', 'descuento']}
                  label="Descuento"
                >
                  <Select>{mapOptions(filterOption)}</Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} lg={18}>
                <Form.Item
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 18 }}
                  name={['filters', 'categoria']}
                  label="Categoria"
                >
                  <Select>{mapOptions(productos.categoriasFiltro)}</Select>
                </Form.Item>
              </Col>
              {/* --Sort-- */}
              <Col offset={1} xs={22} sm={22} lg={20}>
                <h2>Ordenar por:</h2>
              </Col>
              <Col className="col-vertical-align" xs={24} sm={24} lg={24}>
                <Form.Item name="sortBy">
                  <Radio.Group>
                    <Row style={{ marginTop: 25 }}>
                      <Col xs={12} sm={12} lg={{ span: 5, offset: 3 }}>
                        <Radio value={{ nombre: 1 }}>
                          <h5>
                            Nombre <span>A-Z</span>
                          </h5>
                        </Radio>
                      </Col>
                      <Col xs={12} sm={12} lg={5}>
                        <Radio value={{ nombre: -1 }}>
                          <h5>
                            Nombre <span>Z-A</span>
                          </h5>
                        </Radio>
                      </Col>
                      <Col xs={12} sm={12} lg={5}>
                        <Radio value={{ marca: 1 }}>
                          <h5>
                            Marca <span>A-Z</span>
                          </h5>
                        </Radio>
                      </Col>
                      <Col xs={12} sm={12} lg={5}>
                        <Radio value={{ marca: -1 }}>
                          <h5>
                            Marca <span>Z-A</span>
                          </h5>
                        </Radio>
                      </Col>
                      <Col xs={12} sm={12} lg={{ span: 6, offset: 6 }}>
                        <Radio value={{ precioOnline: -1 }}>
                          <h5>
                            Precio <span>- +</span>
                          </h5>
                        </Radio>
                      </Col>
                      <Col xs={12} sm={12} lg={6}>
                        <Radio value={{ precioOnline: 1 }}>
                          <h5>
                            Precio <span>+ -</span>
                          </h5>
                        </Radio>
                      </Col>
                    </Row>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <SubmitButton2 />
            </>
          ) : null}
        </Row>
      </Form>
    </div>
  );
}
export default ProductSearcher;

function SubmitButton(props) {
  const { advanceSearch } = props;
  if (!advanceSearch)
    return (
      <Col className="col-vertical-align" xl={4}>
        <ButtonMlg
          variant="yellow"
          size="small"
          htmlType="submit"
          widthB="85%"
          label="Buscar"
          icon={<LoginOutlined />}
        />
      </Col>
    );
  return null;
}
function SubmitButton2() {
  return (
    <Col className="col-vertical-align" xl={24}>
      <ButtonMlg
        variant="yellow"
        size="small"
        htmlType="submit"
        widthB="85%"
        label="Buscar"
        icon={<LoginOutlined />}
      />
    </Col>
  );
}

function FilterButton(props) {
  const { advanceSearch, changeAdvance } = props;
  return (
    <Col className="col-vertical-align" xl={advanceSearch ? 7 : 3}>
      <ButtonMlg
        variant="purple"
        size="small"
        htmlType="button"
        widthB="85%"
        label="Filtros"
        onClick={changeAdvance}
        icon={
          advanceSearch ? (
            <VerticalAlignTopOutlined />
          ) : (
            <VerticalAlignBottomOutlined />
          )
        }
      />
    </Col>
  );
}
