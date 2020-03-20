import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.apiUrl = 'http://192.168.101.10:8080';  
Vue.prototype.header ={'content-type':'application/x-www-form-urlencoded'};
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
