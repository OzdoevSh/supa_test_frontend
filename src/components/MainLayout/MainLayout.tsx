import { FC, ReactNode, useEffect, useState } from 'react';
import { BarChartOutlined, HomeOutlined } from '@ant-design/icons';
import { Layout, Menu, MenuProps } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

import './MainLayout.scss'

const { Header, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

interface MainLayoutProps {
  children: ReactNode,
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
    <Layout className='main-layout'>
      <Header className='header'>
        <Menu
          onClick={(e) => navigate(e.key)}
          theme="dark"
          defaultSelectedKeys={[currentKey]}
          mode="horizontal"
          items={menuItems}
        />
      </Header>
      <Content className='content'>
        {children}
      </Content>
    </Layout>
  );
}

export default MainLayout;
