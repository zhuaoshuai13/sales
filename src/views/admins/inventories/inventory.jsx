import React, {useState, useEffect} from 'react'
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { getStore } from '../../../api/store';
export default function Inventory() {
  const [data, setDate] = useState([])
  useEffect(() => {
    getStore().then((data) => {
      data.forEach((cur) => {cur.key = cur.id})
      setDate(data)
    })
  }, [])

  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setsearchedColumn] = useState('')

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
  const columns = [
    {
      title: '货号',
      dataIndex: 'commodity_id',
      key: 'name',
      width: '15%',
      ...getColumnSearchProps('commodity_id'),
    },
    {
      title: '种类',
      dataIndex: 'category',
      key: 'name',
      width: '15%',
      ...getColumnSearchProps('category'),
    },
    {
      title: '颜色',
      dataIndex: 'color',
      key: 'name',
      width: '15%',
      ...getColumnSearchProps('color'),
    },
    {
      title: '尺码',
      dataIndex: 'size',
      key: 'name',
      width: '15%',
      ...getColumnSearchProps('size'),
    },
    {
      title: '进价',
      dataIndex: 'purchase_price',
      key: 'name',
      width: '15%',
      ...getColumnSearchProps('purchase_price'),
    },
    {
      title: '售价',
      dataIndex: 'selling_price',
      key: 'name',
      width: '15%',
      ...getColumnSearchProps('selling_price'),
    },
    {
      title: '库存',
      dataIndex: 'number',
      key: 'name',
      width: '15%',
      ...getColumnSearchProps('number'),
      sorter: (a, b) => a.number - b.number,
      sortDirections: ['descend', 'ascend'],
    },
  ];
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // this.setState({
    //   searchText: selectedKeys[0],
    //   searchedColumn: dataIndex,
    // });
    setSearchText(selectedKeys[0])
    setsearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    // this.setState({ searchText: '' });
    setSearchText('')
  };
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  )
}
