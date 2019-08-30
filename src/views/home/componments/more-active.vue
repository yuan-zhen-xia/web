<template>
  <div>
    <!-- 弹框组件 -->
    <!-- $event就是父组件传过来的参数 -->
    <van-dialog
      :value="value"
      @input="$emit('input',$event)"
      :show-cancel-button="false"
      :show-confirm-button="false"
      closeOnClickOverlay
    >
      <!-- 单元格组件 -->
      <van-cell-group v-if="!isReportShow">
        <van-cell title="不感兴趣" icon="location-o" @click="onDislake" />
        <van-cell title="反馈垃圾内容" icon="location-o" is-link @click="isReportShow=true" />
        <van-cell title="拉黑作者" icon="location-o" />
      </van-cell-group>

      <van-cell-group v-else>
        <van-cell icon="arrow-left" @click="isReportShow=false" />
        <van-cell title="标题夸张" icon="location-o" />
        <van-cell title="低俗色情" icon="location-o" />
        <van-cell title="错别字多" icon="location-o" />
        <van-cell title="旧闻重复" icon="location-o" />
        <van-cell title="广告软文" icon="location-o" />
        <van-cell title="内容不实" icon="location-o" />
        <van-cell title="涉嫌违法犯罪" icon="location-o" />
        <van-cell title="侵权" icon="location-o" />
        <van-cell title="其他问题" icon="location-o" />
      </van-cell-group>
    </van-dialog>
  </div>
</template>
<script>

import { dislikeArticles } from '@/api/articles'

export default {
  name: 'MoreAction',
  data () {
    return {
      // 默认举报框显示
      // show: true
      isReportShow: false
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    article: {
      type: Object,
      required: true
    }
  },
  methods: {
    async onDislake () {
      await dislikeArticles(this.article.art_id.toString())
      // console.log(data)
      this.$emit('input', false)
      // 提示用户操作成功
      this.$toast('操作成功')
      // 告诉父组件该文章移除
      this.$emit('dislike-success')
    }
  }
}
</script>
<style scoped lang='less'>
</style>
