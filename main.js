import Vue from 'vue'
import App from './App'

import store from './store'
import {
	req
} from './common/request/request.js';


const msg = (title, duration = 1500, mask = false, icon = 'none') => {
	//统一提示方便全局修改
	if (Boolean(title) === false) {
		return;
	}
	uni.showToast({ 
		title,
		duration,
		mask,
		icon
	});
}
Vue.config.productionTip = false



req.defaultReq.url = 'https://www.appi2b2b.com/' //设置公共url部分
req.defaultReq.type = "POST"; //设置公共请求类型
Vue.prototype.$req = req;
Vue.prototype.$store = store
Vue.prototype.$api = {
	msg 
};
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
