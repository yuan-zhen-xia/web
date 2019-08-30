// 频道相关请求模块
import request from '@/utils/request'
// 获取用户频道列表
export const getDefaultOrUserChannels = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/user/channels'
  })
}
