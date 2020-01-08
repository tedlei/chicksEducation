import Vue from 'vue'
import App from './App'
import Api  from './mixin'
import store from './store'

Vue.config.productionTip = false;

App.mpType = 'app'

Api.install.call(Vue)

const app = new Vue({
	store,
    ...App
})
app.$mount();
