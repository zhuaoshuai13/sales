import React, {useState, useEffect} from 'react'
import { List, Typography, Divider } from 'antd';
import { getSales } from '../../api/store';
export default function Sale() {
  const [data, setData] = useState([])
  useEffect(() => {
    getSales().then((data) => setData(data))
  }, [])
  console.log(data);

  const newData = []
  for (let i = 0; i < data.length; i++) {
    const time = new Date(Number(data[i].selling_data))
    newData.push(`商品:${data[i].commodity_id}
    尺码:${data[i].size}
    颜色:${data[i].color}
    销售单价:${data[i].selling_price}
    销售数量:${data[i].selling_number} 
    ${data[i].selling_person}
    ${time.getFullYear()} - ${time.getMonth()} 月 ${time.getDate()} 日 ${time.getHours().toString()
  .padStart(2, '0')} ：${time.getMinutes().toString()
  .padStart(2, '0')} `)
  }
  return (
    <div>
      <Divider orientation="left">销售列表</Divider>
      <List
        bordered
        dataSource={newData}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text mark>销售</Typography.Text> {item}
          </List.Item>
        )}
      />
    </div>
  )
}
