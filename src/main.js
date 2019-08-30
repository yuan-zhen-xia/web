// 配置路由
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import './styles/index.less'
import VeeValidate, { Validator } from 'vee-validate'
import zhCN from 'vee-validate/dist/locale/zh_CN'

// 转换时间格式
import { relativeTime } from './utils/date-utils.js'

// 设置全局过滤器，方便各个组件调用时间格式
// 因为过滤器传入一个参数，接收一个参数，而dayjs也是，所以可以简写为下面格式
Vue.filter('relativeTime', relativeTime)

// 加载验证插件的语言包
Vue.use(VeeValidate)
Validator.localize('zh_CN', zhCN)
Vue.use(Vant)
Vue.config.productionTip = false

// 将router和store配置到根路由
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
