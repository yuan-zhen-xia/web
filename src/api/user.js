// 封装与后台请求数据的方法
import request from '@/utils/request'

export const login = (user) => {
  return request({
    method: 'post',
    url: '/authorizations',
    data: user
  })
}
