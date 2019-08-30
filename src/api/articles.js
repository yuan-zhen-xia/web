// 文章相关请求模块
import request from '@/utils/request'
// 获取文章列表
export const getArticles = (data) => {
  return request({
    method: 'get',
    url: '/app/v1_1/articles',
    params: {
      // 频道ID
      channel_id: data.channel_id,
      //   时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
      timestamp: data.timestamp,
      //   是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
      with_top: 1
    }
  })
}

// 文章不喜欢
export const dislikeArticles = channelsId => {
  return request({
    method: 'post',
    url: '/app/v1_0/article/dislikes',
    data: {
      target: channelsId
    }
  })
}
