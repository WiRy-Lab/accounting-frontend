import React from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

const menuItems: MenuItem[] = [
  {
    key: '1',
    icon: <UserOutlined />,
    label: 'nav 1',
    children: [
      {
        key: '1-1',
        label: 'nav 1-1',
      },
      {
        key: '1-2',
        label: 'nav 1-2',
      },
    ],
  },
  {
    key: '2',
    icon: <VideoCameraOutlined />,
    label: 'nav 2',
  },
  {
    key: '3',
    icon: <UploadOutlined />,
    label: 'nav 3',
  },
];

const SideBar = () => {
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['1']}
      items={menuItems}
    />
  );
};

export default SideBar;
