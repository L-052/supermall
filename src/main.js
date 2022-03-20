import Vue from 'vue'
import App from './App.vue'
import router from './router/'
import store from './store'
import toast from 'components/common/toast/index.js'

Vue.config.productionTip = false

// vue实例可以作为事件总线
Vue.prototype.$bus = new Vue({})

//安装toast插件 
Vue.use(toast)


new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')