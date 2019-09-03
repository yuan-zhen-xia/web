<template>
  <van-popup
    :style="{ height: '95%' }"
    :value="value"
    @input="$emit('input', $event)"
    position="bottom"
    round
  >
    <van-cell icon="cross" @click="$emit('input', false)" />
    <van-cell title="我的频道" label="点击进入频道">
      <van-button
        round
        type="danger"
        size="mini"
        @click="isEdit = !isEdit"
      >{{ isEdit ? '完成' : '编辑' }}</van-button>
    </van-cell>
    <van-grid>
      <van-grid-item
        v-for="(channel, index) in myChannels"
        :key="channel.id"
        :text="channel.name"
        @click="onMyChannelItemClick(index, channel.id)"
      >
        <span class="grid-text" :class="{ active: index === activeIndex }">{{ channel.name }}</span>
        <van-icon
          class="close-icon"
          name="close"
          v-show="isEdit"
        />
      </van-grid-item>
    </van-grid>

    <van-cell title="推荐频道" label="点击添加频道" />
    <van-grid :gutter="10">
      <van-grid-item
        v-for="channel in recommendChannels"
        :key="channel.id"
        :text="channel.name"
        @click="onAddChannel(channel)"
      />
    </van-grid>
  </van-popup>
</template>

<script>
import { getAllChannels, deleteUserChannel, addUserChannel } from '@/api/channel'
import { mapState } from 'vuex'

export default {
  name: 'ChannelEdit',
  props: {
    value: {
      type: Boolean,
      default: false
    },

    myChannels: {
      type: Array,
      default: () => []
    },

    activeIndex: {
      type: Number
    }
  },

  data () {
    return {
      allChannels: [],
      isEdit: false
    }
  },

  computed: {
    ...mapState(['user']),
    // 计算返回剩余的频道列表（不包含我的频道）
    recommendChannels () {
      // 遍历所有频道，将不存在我的品达中的频道收集起来
      const channels = this.allChannels.filter(channel => {
        const ret = this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
        return !ret
      })
      return channels
    }
  },

  created () {
    this.loadAllChannels()
  },

  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      const { channels } = data.data
      channels.forEach(channel => {
        channel.articles = []
        channel.finished = false // 当前频道是否加载结束
        channel.timestamp = null // 当前频道下一页的页码
        channel.upLoading = false // 当前频道的上拉加载的 loading 状态
        channel.downLoading = false // 当前频道的下拉刷新 loading 状态
      })
      this.allChannels = channels
    },

    async onAddChannel (channel) {
      this.myChannels.push(channel)
      if (this.user) {
        // 登录状态，发请求将数据保存到后端数据库
        await addUserChannel(channel.id, this.myChannels.length)
      } else {
        // 非登录状态，将数据保存到本次存储
        this.saveMyChannels()
      }
    },

    async onMyChannelItemClick (index, channelId) {
      if (this.isEdit) {
        this.myChannels.splice(index, 1)

        // 如果登录状态，则发请求将数据保存到后端数据库
        if (this.user) {
          await deleteUserChannel(channelId)
        } else {
          // 非登录状态，则将操作保存到本地存储
          this.saveMyChannels()
        }
      } else {
        // 切换频道操作

        // 父组件切换频道
        this.$emit('update-active', index)

        // 关闭弹窗
        this.$emit('input', false)
      }
    },

    saveMyChannels () {
      window.localStorage.setItem('my-channels', JSON.stringify(this.myChannels))
    }
  }
}
</script>

<style lang="less" scoped>
.close-icon {
  position: absolute;
  right: 0;
  top: 0;
}

.grid-text {
  color: #7d7e80;
  font-size: 12px;
}

.active {
  color: red;
}
</style>
