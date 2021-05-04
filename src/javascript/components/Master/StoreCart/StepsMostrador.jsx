import React from 'react';
import { Row, Col, Steps } from 'antd';

const { Step } = Steps;

function StepsMostrador(props) {
  const { step } = props;
  return (
    <Row>
      <Col offset={8} xs={24} sm={24} lg={8}>
        <Steps current={step}>
          <Step title="Productos" description="Agrega tus productos" />
          <Step
            title="Completar"
            description="Completa datos de la orden y finaliza la compra"
          />
        </Steps>
      </Col>
    </Row>
  );
}

export default StepsMostrador;
