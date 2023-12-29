import {
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Flex, Modal, Space } from 'antd';
import { signOut, useSession } from 'next-auth/react';
import React, { useState } from 'react';

import EditProfile from '@/components/user/EditProfile';

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

  const { data: session } = useSession();

  const { user } = session || {};

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const items: MenuProps['items'] = [
    {
      label: (
        <Button
          block
          type="link"
          onClick={async () => {
            setIsEditProfileOpen(true);
          }}
          style={{
            textAlign: 'left',
            color: 'black',
            paddingLeft: '2.5px',
          }}
        >
          修改資料
        </Button>
      ),
      key: '0',
    },
    {
      type: 'divider',
    },
    {
      label: (
        <Button
          block
          type="link"
          onClick={async () => {
            const confirmed = await modal.confirm(config);

            if (confirmed) {
              localStorage.removeItem('token');
              signOut();
            }
          }}
          style={{
            textAlign: 'left',
            color: 'red',
            paddingLeft: '2.5px',
          }}
        >
          登出
        </Button>
      ),
      key: '3',
    },
  ];

  return (
    <>
      {contextHolder}
      <EditProfile
        isOpen={isEditProfileOpen}
        closeCallBack={() => setIsEditProfileOpen(false)}
      />
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
        <Dropdown menu={{ items }}>
          <Space>
            {user?.name}
            <DownOutlined />
          </Space>
        </Dropdown>
        {/* {user?.name} */}
        {/* <Button
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
        </Button> */}
      </Space>
    </>
  );
};

export default HeaderContent;
