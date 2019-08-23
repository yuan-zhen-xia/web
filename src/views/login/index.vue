<template>
<div>
  <!-- 顶部导航栏 -->
    <van-nav-bar
  title="登录"
/>
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

export default {
  name: 'loginIndex',
  data () {
    return {
      user: {
        mobile: '15236520053',
        code: '246810'
      },
      isLoading: false
    }
  },
  methods: {
    // 点击登录按钮发送请求
    async onLogin () {
      // console.log(this.user)

      try {
        // 表单验证方法
        this.$validator.validate().then(async valid => {
          // 如果验证失败
          if (!valid) {
            // console.log('登录失败')

            return
          }
          // 发送请求，开始loading
          this.isLoading = true

          const { data } = await login(this.user)

          // 登录成功，loading状态结束
          this.isLoading = false
          // 跳转到首页
          // this.$router.push({ name: 'home' })
          console.log(data)
        })
      } catch (err) {
        // console.dir(err)
        if (err.response && err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        }
        // 登录失败，loading状态结束
        this.isLoading = false
      }
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
