import React, { useState, useContext } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  FundProjectionScreenOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Spin } from "antd";
import { AppContext } from "contexts/app.context";
import { checkIsAuth } from "helpers/auth.helper";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const { Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const menuConstants = {
  home: { key: 0, label: "Home", path: "/", logo: <PieChartOutlined /> },
  profile: {
    key: 1,
    label: "Profile",
    path: "/profile",
    logo: <UserOutlined />,
  },
  services: {
    key: 2,
    label: "Services",
    path: "/service-list",
    logo: <FundProjectionScreenOutlined />,
  },
  login: { key: 3, label: "Login", path: "/login", logo: <TeamOutlined /> },
  logout: { key: 4, label: "Logout", path: "/logout", logo: <FileOutlined /> },
  register: {
    key: 5,
    label: "Register",
    path: "/register",
    logo: <FileOutlined />,
  },
  adminPanel:  {
    key: 6,
    label: "Admin panel",
    path: "/admin-panel",
    logo: <DesktopOutlined />,
  },
  userPanel:  {
    key: 7,
    label: "User panel",
    path: "/user-panel",
    logo: <DesktopOutlined />,
  },
};

const authenMenu = [
  menuConstants.home,
  menuConstants.userPanel,
  menuConstants.services,
  menuConstants.profile,
  menuConstants.logout
];

const adminMenu = [
  menuConstants.home,
  menuConstants.adminPanel,
  menuConstants.services,
  menuConstants.profile,
  menuConstants.logout
];

const unAuthenMenu = [
  menuConstants.home,
  menuConstants.login,
  menuConstants.register,
];

const App = () => {
  const { loading, user } = useContext(AppContext);
  const isAuth = checkIsAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const handleDisplayMenu = () => {
    let result;
    if (isAuth) {
        if(user?.role === 'admin'){
          result = adminMenu
        }else{
          result = authenMenu
        }
    } else {
      result = unAuthenMenu
    }
    return result.map((item) => getItem(item.label, item.key, item.logo));
  };
  const handleOnClick = (selected) => {
    const menu = isAuth && user?.role === 'admin'? adminMenu : isAuth? authenMenu : unAuthenMenu
    const result = menu.find((item) => item.key === parseInt(selected.key));
    navigate(result.path);
  };
  return (
    <Spin spinning={loading} tip="Loading..." size="large">
      <StyledLayout
        className="app-layout"
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["0"]}
            mode="inline"
            items={handleDisplayMenu()}
            onClick={handleOnClick}
          />
        </Sider>
        <Layout>
          <div className="mobile-menu">
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["0"]}
              onClick={handleOnClick}
              items={handleDisplayMenu()}
            />
          </div>
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <Breadcrumb
              style={{
                margin: "16px 0",
              }}
            >
              <Breadcrumb.Item>{user?.first_name}-{user?.last_name}</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="content"
              style={{
                padding: 24,
                // minHeight: 3360,
                background: colorBgContainer,
              }}
            >
              <>
                <Outlet />
              </>
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Copyright ©2023 Created by Tanawat Limsakul
          </Footer>
        </Layout>
      </StyledLayout>
    </Spin>
  );
};

const StyledLayout = styled(Layout)`
  &.app-layout {
    .ant-layout-sider {
      z-index: 1;
    }
    .mobile-menu {
      display: none;
    }
    @media (max-width: 1020px) {
      //mobile screen
      .mobile-menu {
        display: block;
      }
      .ant-layout-sider {
        z-index: 1;
      }
      .ant-layout-sider.ant-layout-sider-dark.ant-layout-sider-has-trigger {
        display: none;
      }
      .ant-layout-sider.ant-layout-sider-dark.ant-layout-sider-has-trigger.ant-layout-sider-collapsed {
      }
    }
  }
`;
export default App;
