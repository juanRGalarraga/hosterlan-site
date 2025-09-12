'use client'

import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import { AntdRegistry } from '@ant-design/nextjs-registry';
const inter = Inter({ subsets: ['latin'] });

const { Header, Content, Footer, Sider } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: Array.from({ length: 4 }).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);

interface AppProps{
  children: React.ReactNode;
}

const App = ({children} : AppProps ) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  
  return (
     <html lang="es">
      <body className={inter.className}>
        <Layout>
          <Header style={{ display: 'flex', alignItems: 'center' }}>
            <div className="demo-logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              items={items1}
              style={{ flex: 1, minWidth: 0 }}
            />
          </Header>
          <div style={{ padding: '0 48px' }}>
            <Breadcrumb
              style={{ margin: '16px 0', background: colorBgContainer }}
              items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
            />
            <Layout
              style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
            >
              <Sider style={{ background: colorBgContainer }} width={200}>
                <Menu
                  mode="inline"
                  theme='dark'
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%' }}
                  items={items2}
                />
              </Sider>
              <Content style={{ padding: '0 24px', minHeight: 280 }}>
                <AuthProvider>
                  <AntdRegistry>
                    {children}
                  </AntdRegistry>
                </AuthProvider>
              </Content>
            </Layout>
          </div>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </body>
    </html>
  );
};

export default App;