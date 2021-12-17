import React, {useState, useEffect} from 'react'
import { changeActive, getActive } from '../../../../api/store'
import { Table, Tag, Space } from 'antd';
import { Button } from 'antd/lib/radio';
export default function Minus() {
  const [active, setActive] = useState([])
  useEffect(() => {
    getActive().then((active) => {
      active.forEach((current) => current.key = current.id + Date.now())
      setActive(active)
    })
  }, [])
  const chanegActive = (id) => {
    changeActive({id: id}).then((data) => {
      setActive(data)
    })
  }
  const columns = [
    {
      title: '活动',
      dataIndex: '',
      key: 'id',
      render: () => (
        <span>满减活动</span>
      ),
    },
    {
      title: '适用范围',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '活动内容',
      dataIndex: '',
      key: '',
      render: (data) => (
        <span>满{data.full}减{data.minus}</span>
      ),
    },
    {
      title: '当前状态',
      dataIndex: 'type',
      key: '',
      render: (text, record) => (record.type ? <Tag color="#87d068">正在实施</Tag> : <Tag color="#f50">已停止</Tag>),
    },
    {
      title: '操作',
      dataIndex: '',
      key: '',
      render: (text, record) => (
        record.type
          ? <>
            <Button onClick={() => {chanegActive(record.id)}}>停用</Button>
          </>
          : <><Button onClick={() => {chanegActive(record.id)}}>启用</Button></>
      ),
    },
  ]
  return (
    <div>
      <Table columns={columns} dataSource={active} />
    </div>
  )
}
