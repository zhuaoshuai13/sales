import request from '../utils/request'
import API from './constants'

// 用户登录
export const login = (userInfo) =>   request({
  url: API.LOGIN_API,
  method: 'POST',
  data: userInfo,
})

