import React, {useState, useEffect} from 'react'
import {getStore, sellStore} from '../../api/store'
import { Table, Button, Input, Space, Row, Col, Form, Drawer, Select, message, InputNumber } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

import './market.less'
export default function Market() {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setsearchedColumn] = useState('')
  const [data, setDate] = useState([])
  const [choose, setChoose] = useState([])
  const [max, setMax] = useState(0)
  useEffect(() => {
    getStore().then((data) => {
      data.forEach((cur) => {cur.key = cur.id})
      setDate(data)
    })
  }, [])

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            // console.log('node', node);
            // searchInput = node;
            // setSearchInput(node)
            // console.log(searchInput.select);
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setsearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase()
          .includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: (visible) => {
      // console.log('visible', searchInput.select);
      if (visible) {
        // setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setsearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('')
  };
  const getData = (newData) => {
    console.log(newData.number);
    setMax(newData.number)
    newData.sellingNumber = 1
    newData.total_price = newData.selling_price
    form.setFieldsValue(newData);
    setChoose(newData);
    showDrawer()
  }
  const columns = [
    {
      title: '??????',
      width: 100,
      dataIndex: 'commodity_id',
      key: 'name',
      fixed: 'left',
      ...getColumnSearchProps('commodity_id'),
    },
    {
      title: '??????',
      width: 100,
      dataIndex: 'category',
      key: 'category',
      fixed: 'left',
    },
    {
      title: '??????',
      dataIndex: 'color',
      key: '1',
      width: 100,
    },
    {
      title: '??????',
      dataIndex: 'size',
      key: '2',
      width: 100,
    },
    {
      title: '??????',
      dataIndex: 'selling_price',
      key: '3',
      width: 100,
    },
    {
      title: '??????',
      dataIndex: 'number',
      key: '3',
      width: 100,
    },
    {
      title: '??????',
      key: 'operation',
      fixed: 'right',
      width: 200,
      render: (text) => (
        <div id="orderBtn">
          <Button type="primary" onClick={() => getData(text)}>????????????</Button>
          {/* <Button type="primary">????????????</Button> */}
        </div>
      ),
    },
  ];

  for (let i = 0; i < 0; i++) {
    data.push({
      key: i.toString(),
      commodity_id: `Edrward ${i}`,
      category: '??????',
      color: '??????',
      size: '??????',
      selling_price: '??????',
      number: 32,
    });
  }

  // ????????????
  const { Option } = Select;
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true);
  };
  const onReset = () => {
    form.resetFields();
  };
  const onSell = () => {
    setVisible(false);
    // console.log(form.getFieldValue());
    sellStore(form.getFieldValue()).then(() => {
      getStore().then((data) => {
        data.forEach((cur) => {cur.key = cur.id})
        setDate(data)
      })
    });
  };
  const onClose = () => {
    setVisible(false);
  }
  const warning = () => {
    message.warning(`????????????????????????${max}`);
  };
  const changeNumber = (e) => {
    console.log(e);
    if (e > max) {
      warning()
      e = max
    }
    let temp =  choose
    temp.sellingNumber = e
    temp.total_price = choose.sellingNumber * choose.selling_price

    setChoose(temp)
    form.setFieldsValue(temp)
  }
  return (
    <div>
      <Table columns={columns} dataSource={data} />
      <Drawer
        title="????????????"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose}>??????</Button>
            <Button onClick={onSell} type="primary">
                ??????
            </Button>
            <Button onClick={onReset}>
                ??????
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark form={form}
          initialValues={{commodity_id: ''}}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="commodity_id"
                label="??????"
                // initialValue={choose.commodity_id}
                rules={[{ required: true, message: 'Please enter user name' }]}
              >
                <Input name="commodity_id" placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="color"
                label="??????"
                rules={[{ required: true, message: 'Please enter url' }]}
              >
                <Input
                  style={{ width: '100%' }}
                  placeholder="Please enter url"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="size"
                label="??????"
                rules={[{ required: true, message: 'Please select an owner' }]}
              >
                <Input
                  style={{ width: '100%' }}
                  placeholder="Please enter url"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="selling_price"
                label="??????"
                rules={[{ required: true, message: 'Please choose the type' }]}
              >
                <Input
                  style={{ width: '100%' }}
                  placeholder="Please enter url"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="sellingNumber"
                label="??????"
                rules={[{ required: true, message: 'Please choose the approver' }]}
              >
                <InputNumber
                  min={0}
                  onChange={changeNumber}
                  style={{ width: '100%' }}
                  placeholder="Please enter url"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="sale_person"
                label="????????????"
                rules={[{ required: true, message: 'Please choose the dateTime' }]}
              >
                <Select placeholder="Please choose the approver" >
                  <Option value="??????">??????</Option>
                  <Option value="??????">??????</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="total_price"
                label="??????"
                rules={[
                  {
                    required: true,
                    message: 'please enter url description',
                  },
                ]}
              >
                <InputNumber
                  min={0}
                  style={{ width: '100%' }}
                  placeholder="Please enter url"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="pay"
                label="????????????"
                rules={[
                  {
                    required: true,
                    message: 'please enter url description',
                  },
                ]}
              >
                <Select placeholder="Please choose the approver" >
                  <Option value="??????">??????</Option>
                  <Option value="?????????">?????????</Option>
                  <Option value="??????">??????</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  )
}
