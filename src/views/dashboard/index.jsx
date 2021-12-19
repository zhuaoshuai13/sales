import React, {useEffect, useRef} from 'react'
import './style.less'
import { Typography, Row, Col, Slider, Card, Statistic } from 'antd';
const { Title } = Typography;
import * as echarts from 'echarts';
export default function Dashboard() {
  const echarsRef  = useRef()
  const sale = useRef()
  useEffect(() => {
    const myCharts = echarts.init(echarsRef.current)
    myCharts.setOption({
      title: {
        text: '支付金额',
      },
      tooltip: {},
      legend: {
        data: ['销量'],
      },
      xAxis: {
        type: 'category',
        data: ['4', '6',  '8', '10',  '12', '14', '16', '18'],
      },
      yAxis: {
        type: 'value',
      },
      series: [{
        data: [0, 10],
        type: 'line',
      }],
    })

  }, [])
  useEffect(() => {
    const saleCharts = echarts.init(sale.current)
    saleCharts.setOption({
      title: {
        text: '销售内容',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      // legend: {
      //   orient: 'vertical',
      //   left: 'left',
      // },
      series: [
        {
          name: '本日销售',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 12, name: '羽绒服' },
            { value: 3, name: '短袖' },
            // { value: 580, name: 'Email' },
            // { value: 484, name: 'Union Ads' },
            // { value: 300, name: 'Video Ads' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    })
  }, [])
  return (
    <div>
      <Title level={3}>数据总览</Title>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <div style={{width: 300, height: 300}} ref={echarsRef}></div>
        </Col>
        <Col span={12}>
          <Row gutter={[12, 12]}>
            <Col span={11}>
              <div style={{width: 300, height: 200}} ref={sale}></div>
            </Col>
            <Col span={11} >
              <Card>
                <Statistic
                  title="支付笔数"
                  value={24}
                  precision={2}
                  valueStyle={{ color: '#3f8600' }}
                />
              </Card>
            </Col>

            <Col span={11} >
              <Card>
                <Statistic
                  title="上一次销售时间"
                  value={'10:24'}
                  precision={2}
                  valueStyle={{ color: '#3f8600' }}
                />
              </Card>
            </Col>
            <Col span={11} >4</Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
