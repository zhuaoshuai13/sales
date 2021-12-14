import React, {useState} from 'react'
import { Form, Input, Button, Select, Col, ConfigProvider, Table, InputNumber, Popconfirm, Typography, notification,
} from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import './purchase.less'
import {toStore}  from '../../../api/store';
export default function Purchase() {
  // 表单部分
  const date = new Date()
  const { Option } = Select;
  const tailLayout = {
    wrapperCol: {
      offset: 9,
      span: 8,
    },
  };
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);

    values.key = date.getTime()
    const newData = [...data];
    newData.push(values);
    setData(newData);
  };
  const onReset = () => {
    form.resetFields();
  };
  const validateMessages = {
    required: ' ',
    // ...
    types: {
      number: '${label}必须为数字!',
    },
  };

  // 表格部分
  const originData = [];
  for (let i = 0; i < 0; i++) {
    originData.push({
      key: i.toString(),
      commodity_id: `Edrward ${i}`,
      category: '类别',
      color: '颜色',
      size: '尺码',
      purchase_price: '进价',
      selling_price: '售价',
      number: 32,
    });
  }
  const EditableCell = ({
    // eslint-disable-next-line react/prop-types
    editing,
    // eslint-disable-next-line react/prop-types
    dataIndex,
    // eslint-disable-next-line react/prop-types
    title,
    // eslint-disable-next-line react/prop-types
    inputType,
    // eslint-disable-next-line react/prop-types
    record,
    // eslint-disable-next-line react/prop-types
    index,
    // eslint-disable-next-line react/prop-types
    children,
    ...restProps
  }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
      <td{...restProps}>
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
  const [forms] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');
  const totalNumber = function() {
    return data.reduce((acc, cur) => acc += parseInt(cur.number), 0)
  }
  const totalPrice = function() {
    return data.reduce((acc, cur) => acc += parseInt(cur.purchase_price) * parseInt(cur.number), 0)
  }
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    console.log(record);
    forms.setFieldsValue({
      commodity_id: '',
      category: '',
      color: '',
      size: '',
      purchase_price: '',
      selling_price: '',
      number: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };
  const save = async(key) => {
    try {
      const row = await forms.validateFields();
      const newData = [...data];
      //  TODO:完善修改时，修改后的内容可能不为数字的bug
      // console.log(newData);
      // console.log(isNaN(newData.number));
      // !isNaN(newData.number) ? newData.number = data.number : newData.number = data.number
      // console.log(newData);
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const handleDelete = (key) => {
    const dataSource = [...data];
    setData(dataSource.filter((item) => item.key !== key))
  };
  const columns = [
    {
      title: '货号',
      dataIndex: 'commodity_id',
      width: '10%',
      editable: false,
    },
    {
      title: '分类',
      dataIndex: 'category',
      width: '10%',
      editable: false,
    },
    {
      title: '颜色',
      dataIndex: 'color',
      width: '10%',
      editable: false,
    },
    {
      title: '尺码',
      dataIndex: 'size',
      width: '10%',
      editable: false,
    },
    {
      title: '进价',
      dataIndex: 'purchase_price',
      width: '10%',
      editable: false,
    },
    {
      title: '售价',
      dataIndex: 'selling_price',
      width: '10%',
      editable: false,
    },
    {
      title: '数量',
      dataIndex: 'number',
      width: '15%',
      editable: true,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
                保存
            </Typography.Link>
            <Popconfirm title="是否取消修改?"cancelText='再想想' okText='取消' onConfirm={cancel}>
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                修改
            </Typography.Link>
            <Popconfirm title="确定删除?"cancelText='取消' okText='确定'onConfirm={() => handleDelete(record.key)}>
              <a  id="del">删除</a>
            </Popconfirm>
          </>
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
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  // 入库按钮
  const store = () => {
    console.log('入库', data);
    // const newData = []
    toStore(data);
    openNotification()
    setData([])
  }

  const openNotification = () => {
    notification.open({
      message: '商品入库成功！',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
      duration: 0.5,
    });
  };
  return (
    <>
      <ConfigProvider form={{ validateMessages }}>
        <Form form={form} name="control-hooks" onFinish={onFinish} layout="inline">
          <Form.Item
            name="commodity_id"
            label="货号"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="分类"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="color"
            label="颜色"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="size"
            label="尺码"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              size="middle"
            >
              <Option value="S">S</Option>
              <Option value="M">M</Option>
              <Option value="L">L</Option>
              <Option value="XL">XL</Option>
              <Option value="XXL">XXL</Option>
              <Option value="均码">均码</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="purchase_price"
            label="进价"
            rules={[
              {
                required: true,
                type: 'number',
                transform(value) {
                  if (value) {
                    return Number(value)
                  }
                },
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="selling_price"
            label="售价"
            rules={[
              {
                required: true,
                type: 'number',
                transform(value) {
                  if (value) {
                    return Number(value)
                  }
                },
              },
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="number"
            label="数量"
            rules={[
              {
                type: 'number',
                required: true,
                transform(value) {
                  if (value) {
                    return Number(value)
                  }
                },
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout} >
            <Button type="primary" htmlType="submit">
              添加
            </Button>
            <Button htmlType="button" onClick={onReset}>
               重置
            </Button>
          </Form.Item>
        </Form>
      </ConfigProvider>
      <hr></hr>
      <Form form={forms} component={false}>
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
          pagination={false}
          summary={() => !data.length ? (<Table.Summary.Row>
            <Table.Summary.Cell colSpan={0}>
            </Table.Summary.Cell>
          </Table.Summary.Row>) : (<Table.Summary.Row>
            <Table.Summary.Cell colSpan={8}>
              <span id="spa">总件数：{totalNumber()}</span><span>总金额：{totalPrice()}</span>
            </Table.Summary.Cell>
          </Table.Summary.Row>)}
        />
      </Form>
      <Button type="primary" onClick={store} disabled={!data.length}>入库</Button>
    </>
  )
}
