// 封装request请求模块
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0'
})

export default request
