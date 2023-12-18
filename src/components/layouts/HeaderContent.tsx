import React from 'react';
import { signOut } from 'next-auth/react';
import { Flex, Space, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

type Props = {
  title: string;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

const HeaderContent = ({ title, collapsed, setCollapsed }: Props) => {
  return (
    <>
      <Flex align="center">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        />
        <h2
          style={{
            color: 'rgba(0, 0, 0, 0.6)',
          }}
        >
          {title}
        </h2>
      </Flex>
      <Space style={{ marginRight: '24px' }}>
        <Button
          type="link"
          onClick={() => {
            signOut();
          }}
        >
          登出
        </Button>
      </Space>
    </>
  );
};

export default HeaderContent;
