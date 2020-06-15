import React from "react";

import { Form, Input, Button, InputNumber } from "antd";
import { Upload, Modal, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const { TextArea } = Input;
function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log("blur");
}

function onFocus() {
  console.log("focus");
}

function onSearch(val) {
  console.log("search:", val);
}
export default class CreateDish extends React.Component {
  state = {
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url:
          "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
    ],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  uploadFile = (file) => {
    console.log(file);
  };
  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj);
    }

    this.setState({
      base64: file.preview,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  handleChange = ({ fileList }) => {
    this.setState({ fileList });
    this.setState({ selectedFiles: fileList.fileList });
  };

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  onFinish = (values) => {
    console.log("Success:", values);
    //console.log(this.state.fileList);
  };

  onFinishFailed = (errorInfo) => {
    //console.log("Failed:", errorInfo);
  };
  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Subir imágenes</div>
      </div>
    );
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
          label="Descripción"
          name="description"
          rules={[
            {
              required: true,
              message: "Por favor introduce una descripción",
            },
          ]}
        >
          <TextArea rows={3} />
        </Form.Item>
        <Form.Item name="category">
          <Select
            showSearch
            style={{ marginLeft: 10, width: "50%" }}
            placeholder="Selecciona una categoría"
            optionFilterProp="children"
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="pastas">Entradas</Option>
            <Option value="plato_fuerte">Plato fuerte</Option>
            <Option value="postre">Postre</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Precio" name="price">
          <InputNumber
            type="tel"
            style={{ width: "50%" }}
            defaultValue={0}
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item>
          <Upload
            action={"url"}
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
          <Modal
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={this.handleCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
