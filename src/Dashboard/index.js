import React from "react";
import { Layout, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./index.css";
import CreateDishes from "../Components/Create/Dishes";
import CreateUser from "../Components/Create/User";
import CreateCategory from "../Components/Create/Category";
import CreatePromotion from "../Components/Create/Promotion";
import StatisticsDishes from "../Components/Statistics/Dishes";
import StatisticsGeneral from "../Components/Statistics/General";
import StatisticsCustomer from "../Components/Statistics/Customer";
import EditDishes from "../Components/Edit/Dishes";
import EditCategories from "../Components/Edit/Category";
import EditUSers from "../Components/Edit/User";

const { SubMenu } = Menu;

const { Header, Content, Sider } = Layout;
class SiderDemo extends React.Component {
  state = {
    collapsed: false,
    key: "4",
  };

  onCollapse = (collapsed) => {
    console.log("collapsed: " + collapsed);
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
                  <Link to="/" />
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
                  <Link to="/create_dishes" />
                </Menu.Item>
                <Menu.Item key="5" onClick={(e) => this.changeKey(e.key)}>
                  Categorías
                  <Link to="/create_category" />
                </Menu.Item>
                <Menu.Item
                  hidden={true}
                  key="6"
                  onClick={(e) => this.changeKey(e.key)}
                >
                  Promociones
                  <Link to="/create_promotion" />
                </Menu.Item>
                <Menu.Item key="7" onClick={(e) => this.changeKey(e.key)}>
                  Usuario
                  <Link to="/create_user" />
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                open={true}
                icon={<UserOutlined />}
                title="Editar"
              >
                <Menu.Item key="8" onClick={(e) => this.changeKey(e.key)}>
                  Platillos
                  <Link to="/edit_dishes" />
                </Menu.Item>
                <Menu.Item key="9" onClick={(e) => this.changeKey(e.key)}>
                  Categorías
                  <Link to="/edit_categories" />
                </Menu.Item>
                <Menu.Item
                  key="10"
                  hidden={true}
                  onClick={(e) => this.changeKey(e.key)}
                >
                  Promociones
                  <Link to="/edite_promotion" />
                </Menu.Item>
                <Menu.Item key="11" onClick={(e) => this.changeKey(e.key)}>
                  Usuario
                  <Link to="/edit_users" />
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
                <Route exact path="/create_dishes" component={CreateDishes} />
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
                <Route exact path="/" component={StatisticsGeneral} />
                <Route
                  exact
                  path="/customer_stats"
                  component={StatisticsCustomer}
                />
                <Route exact path="/edit_dishes" component={EditDishes} />
                <Route
                  exact
                  path="/edit_categories"
                  component={EditCategories}
                />
                <Route exact path="/edit_users" component={EditUSers} />
              </div>
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default SiderDemo;
