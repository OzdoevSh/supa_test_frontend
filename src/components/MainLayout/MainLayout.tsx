import {
  type FC, type ReactNode, useEffect, useState,
} from 'react';
import { BarChartOutlined, HomeOutlined } from '@ant-design/icons';
import { Layout, Menu, type MenuProps } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

import './MainLayout.scss';

const { Header, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentKey, setCurrentKey] = useState(location.pathname);

  useEffect(() => {
    setCurrentKey(location.pathname);
  }, [location]);

  const menuItems: MenuItem[] = [
    {
      key: '/',
      label: 'Главная',
      icon: <HomeOutlined />,
    },
    {
      key: '/stats',
      label: 'Статистика',
      icon: <BarChartOutlined />,
    },
  ];
  return (
    <Layout className="main-layout">
      <Header className="header">
        <Menu
          defaultSelectedKeys={[currentKey]}
          items={menuItems}
          mode="horizontal"
          onClick={(e) => { navigate(e.key); }}
          theme="dark"
        />
      </Header>
      <Content className="content">
        {children}
      </Content>
    </Layout>
  );
};

export default MainLayout;
