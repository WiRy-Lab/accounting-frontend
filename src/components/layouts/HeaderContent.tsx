import React from 'react';
import { Flex, Space, Button, Modal } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { signOut } from 'next-auth/react';

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
