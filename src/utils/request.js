// 封装request请求模块
import axios from 'axios'
// 设置路由的请求拦截器，所以需要导入store
import store from '@/store'

// id最大值转换器
import JSONbig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})

// j解决id最大值
request.defaults.transformResponse = [function (data) {
  // data 是未经处理的后端响应数据：JSON 格式字符串

  // JSONbig.parse 类似于 JSON.parse，它的作用也是将 JSON 格式字符串转换为 JavaScript 对象
  // 唯一的区别就是：JSONbig.parse 会检测被转换数据中的数字是否超出了 JavaScript 安全整数范围，如果超出，它会做特殊处理
  // 如果 data 不是一个 JSON 格式字符串，会导致 JSONbig.parse 转换失败并异常
  // 例如我们执行删除操作，后端返回一个 204 状态码，但是没有返回任何数据，也就是空字符串
  // 那这里 JSONbig.parse(空字符串) 就报错了
  // return JSONbig.parse(data)
  try {
    // data 数据可能不是标准的 JSON 格式字符串，否则会导致 JSONbig.parse(data) 转换失败报错
    return JSONbig.parse(data)
  } catch (err) {
    // 无法转换的数据直接原样返回
    return data
  }
}]

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const { user } = store.state

  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }

  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default request
