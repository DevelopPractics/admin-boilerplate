import React from "react";
import { Row, Col, Space, Card, Statistic, Divider } from "antd";
import {
  ArrowUpOutlined,
  UserSwitchOutlined,
  UsergroupAddOutlined,
  FileAddOutlined,
  CheckOutlined,
} from "@ant-design/icons";

const style = {
  iconSize: { fontWeight: "bold", fontSize: 35, marginTop: 20 },
  row: {
    margin: "0 auto",
    justifyContent: "center",
    textAlign: "center",
  },
};

export default class StatisticsGeneral extends React.Component {
  render() {
    return (
      <div>
        <Divider> Tráfico / Clientes</Divider>
        <Row style={style.row} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={12}>
            <Row style={style.row}>
              <UsergroupAddOutlined style={style.iconSize} />
              <Statistic title="Visitas totales" value={112893}></Statistic>
            </Row>
            <Card>
              <Statistic
                title="Active"
                value={50.28}
                precision={1}
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col className="gutter-row" span={12}>
            <Row style={style.row}>
              <UserSwitchOutlined style={style.iconSize} />
              <Statistic title="Visitas totales" value={112893}></Statistic>
            </Row>
            <Card>
              <Statistic
                title="Active"
                value={8.28}
                precision={1}
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>
        <Divider> Pedidos / Entregas</Divider>
        <Row style={style.row} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={12}>
            <Row style={style.row}>
              <FileAddOutlined style={style.iconSize} />
              <Statistic title="Pedidos" value={15}></Statistic>
            </Row>
          </Col>
          <Col className="gutter-row" span={12}>
            <Row style={style.row}>
              <CheckOutlined style={style.iconSize} />

              <Statistic title="Entregas" value={13}></Statistic>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
