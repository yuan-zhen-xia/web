// 配置路由
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 将router和store配置到根路由
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
