import {
  AccountBookOutlined,
  DashboardOutlined,
  FileExcelOutlined,
  FolderOpenOutlined,
  QuestionCircleFilled,
  SettingOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {
  clickCallBack: () => void;
};

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
    key: '/category',
    icon: <FolderOpenOutlined />,
    label: '類別管理',
  },
  {
    key: '/advice',
    icon: <QuestionCircleFilled />,
    label: '財務建議',
  },
  {
    key: '/report',
    icon: <FileExcelOutlined />,
    label: '匯出報表',
  },
  {
    key: '/settings',
    icon: <SettingOutlined />,
    label: '設定',
  },
];

const SideBar = ({ clickCallBack }: Props) => {
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
        clickCallBack();
      }}
    />
  );
};

export default SideBar;
