import React from "react";
import { Layout, Menu } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./index.css";
import CreateDinner from "../Components/Create/Dinner";
import CreateUser from "../Components/Create/User";
import CreateCategory from "../Components/Create/Category";
import CreatePromotion from "../Components/Create/Promotion";
import StatisticsDishes from "../Components/Statistics/Dishes";
import StatisticsGeneral from "../Components/Statistics/General";
import StatisticsCustomer from "../Components/Statistics/Customer";

const { SubMenu } = Menu;

const { Header, Content, Footer, Sider } = Layout;
class SiderDemo extends React.Component {
  state = {
    collapsed: false,
    key: "4",
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  changeKey = (key) => {
    console.log(key);
    this.setState({ key });
  };

  render() {
    const { key } = this.state;
    return (
      <Router>
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <div className="logo" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={key}
              defaultOpenKeys={["sub1"]}
            >
              <SubMenu
                key="sub1"
                open={true}
                icon={<UserOutlined />}
                title="Dashboard"
              >
                <Menu.Item key="1" onClick={(e) => this.changeKey(e.key)}>
                  Home
                  <Link to="/general_stats" />
                </Menu.Item>
                <Menu.Item key="2" onClick={(e) => this.changeKey(e.key)}>
                  Platillos
                  <Link to="/dishes_stats" />
                </Menu.Item>
                <Menu.Item key="3" onClick={(e) => this.changeKey(e.key)}>
                  Clientes
                  <Link to="/customer_stats" />
                </Menu.Item>
              </SubMenu>

              <SubMenu key="sub2" icon={<UserOutlined />} title="Agregar">
                <Menu.Item key="4" onClick={(e) => this.changeKey(e.key)}>
                  Platillos
                  <Link to="/" />
                </Menu.Item>
                <Menu.Item key="5" onClick={(e) => this.changeKey(e.key)}>
                  Categorías
                  <Link to="/create_category" />
                </Menu.Item>
                <Menu.Item key="6" onClick={(e) => this.changeKey(e.key)}>
                  Promociones
                  <Link to="/create_promotion" />
                </Menu.Item>
                <Menu.Item key="7" onClick={(e) => this.changeKey(e.key)}>
                  Usuario
                  <Link to="/create_user" />
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>
            <Header
              className="site-layout-sub-header-background"
              style={{ padding: 0 }}
            />
            <Content style={{ margin: "24px 16px 0" }}>
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 360 }}
              >
                <Route exact path="/" component={CreateDinner} />
                <Route exact path="/create_user" component={CreateUser} />
                <Route
                  exact
                  path="/create_category"
                  component={CreateCategory}
                />
                <Route
                  exact
                  path="/create_promotion"
                  component={CreatePromotion}
                />
                <Route
                  exact
                  path="/dishes_stats"
                  component={StatisticsDishes}
                />
                <Route
                  exact
                  path="/general_stats"
                  component={StatisticsGeneral}
                />
                <Route
                  exact
                  path="/customer_stats"
                  component={StatisticsCustomer}
                />
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>Mi restaurante</Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default SiderDemo;
