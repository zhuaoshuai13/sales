import axios from 'axios';
const service = axios.create({
  baseURL: 'http://sb.zhuaoshuai.com',
  timeout: 10000,
})

service.interceptors.request.use((config) => {
  config.headers['x-token'] = '218741284184619'
  return config
})

service.interceptors.response.use((response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.data
  } else {
    const error = new Error('接口访问异常')
    error.error = response
    return Promise.reject(error)
  }
})

export default service
