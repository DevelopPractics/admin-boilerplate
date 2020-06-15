import React from "react";
import { Form, Input, Button } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export default class CreateUser extends React.Component {
  onFinish = (values) => {
    console.log(values.password);
    console.log(values.password_confirmation);
    if (values.password === values.password_confirmation) {
      alert("exito");
    } else {
      alert("Verifica tu contraseña");
    }
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  render() {
    return (
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        layout="vertical"
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
      >
        <Form.Item
          label="Nombre"
          name="name"
          rules={[
            {
              required: true,
              message: "Por favor introduce un nombre",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Apellido"
          name="lastname"
          rules={[
            {
              required: false,
              message: "Por favor introduce apellido",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Por favor introduce un apellido!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Contraseña"
          name="password"
          rules={[
            {
              required: true,
              message: "Por favor introduce tu contraseña!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirmar contraseña"
          name="password_confirmation"
          rules={[
            {
              required: true,
              message: "Porfavor confirma tu contraseña",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...layout}>
          <Button
            type="primary"
            htmlType="submit"
            onSubmit={(e) => this.validatePassword(e)}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
