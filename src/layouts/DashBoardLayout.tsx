import React, { useState, useEffect } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Button, theme } from 'antd';
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
    <Layout style={{ minHeight: '100vh', margin: '0px' }}>
      <Sider
        collapsedWidth="0"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="demo-logo-vertical" />
        <SideBar clickCallBack={closeSideBar} />
      </Sider>
      <Layout>
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <>
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
          </>
        </Header>
        <Content
          style={{
            // margin: '24px 16px',
            padding: 24,
            // minHeight: 280,
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
