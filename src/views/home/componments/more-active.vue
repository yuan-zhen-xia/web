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
        <van-cell title="拉黑作者" icon="location-o" @click="onBlacklists"/>
      </van-cell-group>

      <van-cell-group v-else>
        <van-cell icon="arrow-left" @click="isReportShow=false" />
        <van-cell v-for='item in repotTypes'
        :key="item.type"
        :title="item.title"
        icon="location-o"
        @click="onReportArticle(item.type)"
        />
      </van-cell-group>
    </van-dialog>
  </div>
</template>
<script>

import { dislikeArticles, reportArticle } from '@/api/articles'
import { addBlacklists } from '@/api/user'

export default {
  name: 'MoreAction',
  data () {
    return {
      // 默认举报框显示
      // show: true
      isReportShow: false,
      repotTypes: [
        { title: '标题夸张', type: 1 },
        { title: '低俗色情', type: 2 },
        { title: '错别字多', type: 3 },
        { title: '旧闻重复', type: 4 },
        { title: '广告软文', type: 5 },
        { title: '内容不实', type: 6 },
        { title: '涉嫌违法犯罪', type: 7 },
        { title: '侵权', type: 8 },
        { title: '其他问题', type: 0 }
      ]
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
    // 文章不喜欢
    async onDislake () {
      await dislikeArticles(this.article.art_id.toString())
      // console.log(data)
      this.$emit('input', false)
      // 提示用户操作成功
      this.$toast('操作成功')
      // 告诉父组件该文章移除
      this.$emit('dislike-success')
    },

    // 拉黑作者
    async onBlacklists () {
      await addBlacklists(this.article.aut_id)
      this.$emit('add-blackist-success')
    },

    // 反馈垃圾内容
    async onReportArticle (type) {
      try {
        await reportArticle({
          articleId: this.article.art_id.toString(),
          type
        })
        this.$toast('操作成功')

        // 关闭弹窗
        this.$emit('input', false)
      } catch (err) {
        console.log(err)
        this.$toast('操作成功')
      }
    }
  }
}
</script>
<style scoped lang='less'>
</style>
