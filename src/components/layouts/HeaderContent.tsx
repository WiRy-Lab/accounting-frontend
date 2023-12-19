import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Flex, Modal, Space } from 'antd';
import { signOut } from 'next-auth/react';
import React from 'react';

type Props = {
  title: string;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

const config = {
  title: '登出',
  content: '確定要登出嗎？',
};

const HeaderContent = ({ title, collapsed, setCollapsed }: Props) => {
  const [modal, contextHolder] = Modal.useModal();

  return (
    <>
      {contextHolder}
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
          onClick={async () => {
            const confirmed = await modal.confirm(config);

            if (confirmed) {
              localStorage.removeItem('token');
              signOut();
            }
          }}
        >
          登出
        </Button>
      </Space>
    </>
  );
};

export default HeaderContent;
