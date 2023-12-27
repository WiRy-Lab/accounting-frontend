import { Layout, theme } from 'antd';
import React, { useEffect, useState } from 'react';

import HeaderContent from '@/components/layouts/HeaderContent';
import SideBar from '@/components/layouts/SideBar';

const { Header, Sider, Content } = Layout;

const DashBoardLayout = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [collapsed, setCollapsed] = useState(false);

  // if phone set collapsed
  useEffect(() => {
    // Client-side-only code
    if (window.innerWidth < 768) {
      setCollapsed(true);
    }
  }, []);

  const closeSideBar = () => {
    if (window.innerWidth < 768) {
      setCollapsed(true);
    }
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ height: '100vh', margin: '0px' }}>
      <Sider
        collapsedWidth="0"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="logo-vertical" />
        <SideBar clickCallBack={closeSideBar} />
      </Sider>
      <Layout>
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 0,
            background: colorBgContainer,
            width: '100%',
          }}
        >
          <HeaderContent
            title={title}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
        </Header>
        <Content
          style={{
            // margin: '24px 16px',
            padding: '24px',
            height: 'calc(100vh - 64px)',
            overflowY: 'auto',
            paddingBottom: '30px',
            // background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashBoardLayout;
