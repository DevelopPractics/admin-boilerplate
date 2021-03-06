import React from "react";
import { Form, Input, Button } from "antd";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const { TextArea } = Input;

export default class CreateCategory extends React.Component {
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
