import React, { useState } from "react";
import { Table, Input, InputNumber, Popconfirm, Form } from "antd";
const _ = require("lodash");

const originData = [];

for (let i = 0; i < 3; i++) {
  originData.push({
    key: i.toString(),
    name: `Rafael Lagunas`,
    user: "rafastaria",
    password: "contraseña",
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
      id: "",
      name: "",
      user: "",
      password: "",
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
    },
    {
      title: "name",
      dataIndex: "name",
      width: "25%",
      editable: true,
    },
    {
      title: "Usuario",
      dataIndex: "user",
      width: "15%",
      editable: true,
    },
    {
      title: "Contraseña",
      dataIndex: "password",
      width: "20%",
      editable: true,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? <span>{Text}</span> : <span>**********</span>;
      },
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
        <h1>Usuarios</h1>
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
export default class EditUser extends React.Component {
  render() {
    return <EditableTable />;
  }
}
