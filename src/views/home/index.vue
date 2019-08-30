<template>
  <div>
    <!-- 顶部导航栏 -->
    <van-nav-bar title="首页" />
    <!-- 标签页 -->
    <van-tabs v-model="active" style="over">
      <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
        <!-- 下拉刷新组件 -->
        <van-pull-refresh v-model="channel.isLoading" @refresh="onRefresh">
          <!-- 列表组件 -->
          <van-list
            v-model="channel.loading"
            :finished="channel.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="article in channel.articles"
              :key="article.art_id.toString()"
              :title="article.title"
            >
            <!-- 每一行数据下的解释 -->
              <div slot="label">
                <van-grid :border="false" :column-num="3">
                  <van-grid-item v-for="(img, index) in article.cover.images" :key="index">
                    <van-image height="80" :src="img" />
                  </van-grid-item>
                </van-grid>
                <div class="article-info">
                  <div class="meta">
                    <span>{{ article.aut_name }}</span>
                    <span>{{ article.comm_count }}评论</span>
                    <span>{{ article.pubdate | relativeTime }}</span>
                  </div>
                  <van-icon name="close"
                  @click='onCloseClick(article)'
                  />
                </div>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>

<!-- 更多操作模块 -->
<!-- <more-action :is-show='isShow' @change-show='onChangeShow'/> -->
<more-action
v-model="isShow"
:article='currentArticle'
@dislike-success='removearticle'
>
</more-action>

  </div>
</template>
<script>
import { getDefaultOrUserChannels } from '@/api/channel'
import { getArticles } from '@/api/articles'
import MoreAction from './componments/more-active'
export default {
  name: 'HomeIndex',
  components: {
    MoreAction
  },
  data () {
    return {
      // 默认标签页
      active: 0,
      //   列表页数据
      articles: [],
      // 列表单页
      channels: [],
      timestamp: Date.now(),
      // 控制举报页面显示隐藏
      isShow: false,
      // 接收当前操作文章内容
      currentArticle: {}
    }
  },
  computed: {
    currentChchannel () {
      // 每一个 tab 页 的显示都是根据 active 来的
      // this.channels 就是那些标签
      // 当前页的所有状态都在该属性中存储
      return this.channels[this.active]
    }
  },
  created () {
    this.loadChannels()
    // this.loadArticles()
  },
  methods: {
    // changeisShow () {
    //   this.isShow = true
    // },
    //   获取频道接口
    async loadChannels () {
      const { data } = await getDefaultOrUserChannels()
      // console.log(data.data.channels)
      // 结构赋值文章表头
      const { channels } = data.data
      // 循环文章标题，给每一个表头设置一个空数组，用于分发各个模块的不同内容
      channels.forEach(channel => {
        // 存储对应的 数据 列表
        channel.articles = []
        // 存储当前 列表的刷新状态
        channel.loading = false
        // 存储当前列表的 onLoad 是否要加载
        channel.timestamp = false
        // 更新的 loading 状态
        channel.isLoading = false
        // 当前频道的下拉刷新loading状态
        channel.downLoading = false
      })

      this.channels = data.data.channels
      // console.log(this.channels)
    },
    // 获取列表数据
    async onLoad () {
      const { data } = await getArticles({
        timestamp: this.currentChchannel.timestamp || Date.now(),
        channel_id: this.currentChchannel.id
      })
      this.currentChchannel.articles.push(...data.data.results)

      // 如果本次请求到的数据中没有pre_timestamp，停止加载
      if (!data.data.pre_timestamp) {
        this.currentChchannel.finished = true
      } else {
        // 将pre_timestamp存起来，用于加载下一次的数据列表请求参数
        this.currentChchannel.timestamp = data.data.pre_timestamp
      }

      // 加载状态结束
      this.currentChchannel.loading = false
    },
    async onRefresh () {
      const { data } = await getArticles({
        timestamp: Date.now(),
        channel_id: this.currentChchannel.id
      })
      this.currentChchannel.articles.unshift(...data.data.results)
      this.currentChchannel.isLoading = false
    },
    // 设置弹框显示隐藏
    onCloseClick (article) {
      this.isShow = true
      this.currentArticle = article
    },
    removearticle () {
      // 当前选中的文章列表
      // console.log(this.currentArticle)
      // 全部文章列表
      // console.log(this.currentChchannel.articles.toString())
      const articles = this.currentChchannel.articles
      const index = articles.findIndex(article => {
        return article.art_id.toString() === this.currentArticle.art_id.toString()
      })
      if (index !== -1) {
        articles.splice(index, 1)
      }
    }

  }
}
</script>
<style scoped lang='less'>
  .article-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .meta span {
    margin-right: 10px;
  }
  }

</style>
