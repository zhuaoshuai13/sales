import request from '../utils/request'
import API from './constants'

// 商品入库
export const toStore = (data) => request({
  url: API.TOSTORE_API,
  method: 'PUT',
  data: data,
})

// 获取商品
export const getStore = () => request({
  url: API.GET_STORE,
  method: 'GET',
})

// 销售商品
export const sellStore = (data) => request({
  url: API.SELLING,
  method: 'PUT',
  data: data,
})

// 获取销售情况
export const getSales = () => request({
  url: API.GET_SALES,
  method: 'GET',
})
