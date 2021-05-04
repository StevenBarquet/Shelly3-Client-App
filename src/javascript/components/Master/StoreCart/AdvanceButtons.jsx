// ---Dependencys
import React from 'react';
import { Col, Row } from 'antd';
import { LeftOutlined, RightOutlined, SendOutlined } from '@ant-design/icons';
// ---ComonComponents
import ButtonMlg from 'CommonComps/ButtonMlg';
// ------------------------------------------ COMPONENT-----------------------------------------
function AdvanceButtons(props) {
  const { step, toStep } = props;
  function before() {
    toStep(0);
  }
  function next() {
    if (step === 0) toStep(1);
    else console.log('Finalizando orden...');
  }
  return (
    <Row>
      <Col xs={24} sm={24} lg={8}>
        <ButtonMlg
          variant={step === 0 ? 'block' : 'yellow'}
          size="small"
          htmlType="button"
          widthB="85%"
          label="Atrás"
          onClick={before}
          icon={<LeftOutlined />}
        />
      </Col>
      <Col xs={24} sm={24} lg={{ span: 8, offset: 8 }}>
        <ButtonMlg
          variant={step === 0 ? 'yellow' : 'yellow-outline'}
          size="small"
          htmlType="button"
          widthB="85%"
          label={step === 0 ? 'Siguiente' : 'Finalizar'}
          onClick={next}
          icon={step === 0 ? <RightOutlined /> : <SendOutlined />}
        />
      </Col>
    </Row>
  );
}

export default AdvanceButtons;
