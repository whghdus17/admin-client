import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import EmptyLayout from './components/layout/Empty'
import DefaultLayout from './components/layout/Default'

Vue.component('empty', EmptyLayout)
Vue.component('default', DefaultLayout)

Vue.config.productionTip = false

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App),
}).$mount('#app')
