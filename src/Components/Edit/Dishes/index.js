import React, { useState } from "react";
import { Table, Input, InputNumber, Popconfirm, Form } from "antd";
import { Row, Col, Divider } from "antd";

const _ = require("lodash");

const originData = [];

for (let i = 0; i < 10; i++) {
  originData.push({
    key: i.toString(),
    name: `Hamburguesa ${i}`,
    price: 32,
    description: `Una hamburguesa riquísima doble con queso`,
  });
}

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      price: "",
      description: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const handleDelete = (row) => {
    const newData = [...data];
    let newobj = [];

    newobj = _.pullAllBy(newData, [{ key: row.key }], "key");

    //COMUNICAR AL SERVIDOR EL NUEVO ARRAY DE PRODUCTOS
    setData(newobj);
    console.log(newobj);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "key",
      width: "5%",
      editable: false,
      align: "center",
    },
    {
      title: "name",
      dataIndex: "name",
      width: "20%",
      editable: true,
      align: "center",
    },
    {
      title: "Precio",
      dataIndex: "price",
      width: "5%",
      editable: true,
      render: (text) => <a>$ {text}</a>,
      align: "center",
    },
    {
      title: "Descripción",
      dataIndex: "description",
      width: "40%",
      editable: true,
      align: "center",
    },
    {
      title: "Editar",
      dataIndex: "operation",
      align: "center",
      width: "20%",

      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Guardar
            </a>
            <Popconfirm title="Quieres cancelar la edición?" onConfirm={cancel}>
              <a>Cancelar</a>
            </Popconfirm>
          </span>
        ) : (
          <div>
            <a disabled={editingKey !== ""} onClick={() => edit(record)}>
              Editar
            </a>
            <Popconfirm
              title="Eliminar?"
              onConfirm={() => handleDelete(record)}
            >
              <a style={{ marginLeft: 5, color: "red" }}>Eliminar</a>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <div>
        <h1>Platillos</h1>
      </div>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default class EditDishes extends React.Component {
  render() {
    return <EditableTable />;
  }
}
