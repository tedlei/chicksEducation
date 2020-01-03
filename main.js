import Vue from 'vue'
import App from './App'
import Api  from './mixin'

Vue.config.productionTip = false;

App.mpType = 'app'

Api.install.call(Vue)

const app = new Vue({
    ...App
})
app.$mount();
