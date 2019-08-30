// 封装与后台请求数据的方法
// 用户相关请求模块
import request from '@/utils/request'

export const login = (user) => {
  return request({
    method: 'post',
    url: '/app/v1_0/authorizations',
    data: user
  })
}
