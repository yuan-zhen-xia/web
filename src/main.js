// 配置路由
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import './styles/index.less'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate)

Vue.use(Vant)
Vue.config.productionTip = false

// 将router和store配置到根路由
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
