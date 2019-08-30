<template>
<div>
  <!-- 顶部导航栏 -->
    <van-nav-bar title="登录"/>
<!-- 输入框 -->
<van-cell-group>
  <van-field
    name="mobile"
    v-model="user.mobile"
    placeholder="请输入手机号"
    v-validate="'required'"
    :error-message="errors.first('mobile')"
  />
    <van-field
    v-model="user.code"
    type="password"
    v-validate="'required'"
    placeholder="请输入验证码"
    name="code"
    :error-message="errors.first('code')"
  />
</van-cell-group>

<div class="login-btn">
    <van-button type="info" :loading=isLoading  @click="onLogin()">登录</van-button>
</div>

</div>
</template>
<script>

import { login } from '@/api/user'
import { mapMutations } from 'vuex'

export default {
  name: 'loginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      isLoading: false
    }
  },
  created () {
    this.errVerification()
  },
  methods: {
    // 映射vuex中的方法
    ...mapMutations(['setUser']),
    // 点击登录按钮发送请求
    async onLogin () {
      // console.log(this.user)

      try {
        // 表单验证方法
        const valid = this.$validator.validate()
        // 如果验证失败
        // console.log(valid)
        if (!valid) {
          // console.log('登录失败')
          return
        }
        // 发送请求，开始loading
        this.isLoading = true

        const { data } = await login(this.user)

        // 登录成功，loading状态结束
        this.isLoading = false

        // 通过方法向vuex中传值
        this.setUser(data.data)

        // 跳转到首页
        this.$router.push({ name: 'home' })
        console.log(data)
      } catch (err) {
        // console.dir(err)
        if (err.response && err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('程序异常，请稍后重试')
        }
        // 登录失败，loading状态结束
        this.isLoading = false
      }
    },
    errVerification () {
      this.$validator.localize('zh_CN', {
        custom: {
          mobile: {
            required: '手机号不能为空'
          },
          code: {
            required: '邮箱不能为空'
          }
        }
      })
    }

  }
}
</script>
<style scoped lang='less'>
    .login-btn {
    padding: 20px;
      .van-button {
      width: 100%;
  }
}
</style>
