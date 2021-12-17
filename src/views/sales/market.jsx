import React, {useState, useEffect} from 'react'
import {getActive, getStore, sellStore} from '../../api/store'
import { Table, Button, Input, Space, Row, Col, Form, Drawer, Select, message, InputNumber, List } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import './market.less'
export default function Market() {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setsearchedColumn] = useState('')
  const [data, setDate] = useState([])
  const [choose, setChoose] = useState([])
  const [max, setMax] = useState(0)
  const [active, setActive] = useState([])
  const [activeId, setActiveId] = useState(null)
  const [allList, setAllList] = useState([])
  const [nowList, setNowList] = useState(['暂无优惠'])
  useEffect(() => {
    getStore().then((data) => {
      data.forEach((cur) => {cur.key = cur.id})
      setDate(data)
    })
    getActive().then((active) => {
      const tempActive = active.filter((cur) => cur.type)
      setActive(tempActive)
    })
  }, [])
  // console.log(active);
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
    allActive()
    setNowList(['暂无优惠'])
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
      title: '货号',
      width: 100,
      dataIndex: 'commodity_id',
      key: 'name',
      fixed: 'left',
      ...getColumnSearchProps('commodity_id'),
    },
    {
      title: '类别',
      width: 100,
      dataIndex: 'category',
      key: 'category',
      fixed: 'left',
    },
    {
      title: '颜色',
      dataIndex: 'color',
      key: '1',
      width: 100,
    },
    {
      title: '尺码',
      dataIndex: 'size',
      key: '2',
      width: 100,
    },
    {
      title: '售价',
      dataIndex: 'selling_price',
      key: '3',
      width: 100,
    },
    {
      title: '库存',
      dataIndex: 'number',
      key: '3',
      width: 100,
    },
    {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 200,
      render: (text) => (
        <div id="orderBtn">
          <Button type="primary" onClick={() => getData(text)}>直接下单</Button>
          {/* <Button type="primary">暂缓下单</Button> */}
        </div>
      ),
    },
  ];

  for (let i = 0; i < 0; i++) {
    data.push({
      key: i.toString(),
      commodity_id: `Edrward ${i}`,
      category: '类别',
      color: '颜色',
      size: '尺码',
      selling_price: '售价',
      number: 32,
    });
  }

  // 表单部分
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
    message.warning(`改商品库存最多为${max}`);
  };
  const allActive = () => {
    const tempList = [];
    for (let i = 0; i < active.length; i++) {
      tempList.push(`${active[i].category} 满 ${active[i].full} 减 ${active[i].minus}`)
    }
    console.log(tempList);
    setAllList(tempList)
  }

  // allActive()
  const nowActive = (id) => {
    console.log(id);
    const temp = active.filter((cur) => cur.id === id)
    console.log(temp);
    temp.length ? setNowList([`现在享受的是${temp[0].category} 满 ${temp[0].full} 减 ${temp[0].minus}`]) : setNowList(['暂无优惠'])
  }
  const changeNumber = (e) => {
    console.log(e);
    if (e > max) {
      warning()
      e = max
    }
    let temp =  choose
    temp.sellingNumber = e
    console.log(temp.category);
    temp.total_price = choose.sellingNumber * choose.selling_price
    console.log(temp.total_price);
    const newActive = active.filter((cur) => cur.category === temp.category)
    console.log(newActive);
    if (newActive.length) {
      for (let i = 0; i < newActive.length; i++) {
        if (temp.total_price < newActive[i].full) {
          if (i === 0) {
            temp.total_price = temp.total_price + 0
            nowActive(0)
            break;
          }
          if (i > 0) {
            console.log('i>0');
            temp.total_price -= newActive[i - 1].minus
            nowActive(newActive[i - 1].id)
          }
        }
      }
      if (temp.total_price >= newActive[newActive.length - 1].full) {
        console.log('imax');
        temp.total_price -= newActive[newActive.length - 1].minus
        // setActiveId(active[active.length - 1].id)
        nowActive(newActive[newActive.length - 1].id)
      }
    }
    // nowActive(activeId)
    setChoose(temp)
    form.setFieldsValue(temp)
  }
  return (
    <div>
      <Table columns={columns} dataSource={data} />
      <Drawer
        title="新的订单"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose}>取消</Button>
            <Button onClick={onSell} type="primary">
                下单
            </Button>
            <Button onClick={onReset}>
                重置
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
                label="货号"
                // initialValue={choose.commodity_id}
                rules={[{ required: true, message: 'Please enter user name' }]}
              >
                <Input name="commodity_id" placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="color"
                label="颜色"
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
                label="尺码"
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
                label="单价"
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
                label="数量"
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
                label="销售人员"
                rules={[{ required: true, message: 'Please choose the dateTime' }]}
              >
                <Select placeholder="Please choose the approver" >
                  <Option value="张三">张三</Option>
                  <Option value="李四">李四</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="total_price"
                label="合计"
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
                label="支付方式"
                rules={[
                  {
                    required: true,
                    message: 'please enter url description',
                  },
                ]}
              >
                <Select placeholder="Please choose the approver" >
                  <Option value="微信">微信</Option>
                  <Option value="支付宝">支付宝</Option>
                  <Option value="现金">现金</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <hr />
        当前享受的优惠
        <List
          bordered
          dataSource={nowList}
          renderItem={(item) => (
            <List.Item>
              {item}
            </List.Item>
          )}
        />
        <hr />
        店铺现有活动
        <List
          bordered
          dataSource={allList}
          renderItem={(item) => (
            <List.Item>
              {item}
            </List.Item>
          )}
        />
      </Drawer>
    </div>
  )
}
