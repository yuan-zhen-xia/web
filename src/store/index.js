import Vue from 'vue'
import Vuex from 'vuex'
// 记载该模块的所有成员，调用该模块的方法 user.getUser
// 也可以  import {getUser} from '@/utils/user'
import * as user from '@/utils/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: user.getUser()
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 为了刷新保持数据状态，所以还要再本地存储一次数据
      user.setUser(state.user)
    }
  },
  actions: {

  }
})
