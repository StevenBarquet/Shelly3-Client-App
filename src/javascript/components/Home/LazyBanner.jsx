// ---Dependencys
import React from 'react';
import { Skeleton, Card, Avatar } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined
} from '@ant-design/icons';

// ------------------------------------------ COMPONENT-----------------------------------------
const { Meta } = Card;

function LazyBanner() {
  return (
    <Card
      style={{ width: '100%', marginTop: 16 }}
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />
      ]}
    >
      <Skeleton loading avatar active>
        <Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title="Card title"
          description="This is the description"
        />
      </Skeleton>
    </Card>
  );
}

export default LazyBanner;
