import React from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useRouter } from 'next/router';
import {
  AccountBookOutlined,
  DashboardOutlined,
  FolderOpenOutlined,
} from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

const menuItems: MenuItem[] = [
  {
    key: '/',
    icon: <DashboardOutlined />,
    label: '儀表板',
  },
  {
    key: '/accounting',
    icon: <AccountBookOutlined />,
    label: '所有記帳',
    // children: [
    //   {
    //     key: '/accounting',
    //     label: 'nav 1-1',
    //   },
    //   {
    //     key: '/',
    //     label: 'nav 1-2',
    //   },
    // ],
  },
  {
    key: '/account_type',
    icon: <FolderOpenOutlined />,
    label: '類別管理',
  },
];

const SideBar = () => {
  const router = useRouter();

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={[router.asPath]}
      defaultOpenKeys={[router.asPath.split('/')[1]]}
      items={menuItems}
      onClick={({ key }) => {
        router.push(key);
      }}
    />
  );
};

export default SideBar;
