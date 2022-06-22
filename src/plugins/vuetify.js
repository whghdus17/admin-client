import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
	theme: {
		themes: {
			light: {
				primary: '#0074FF', // #E53935
				talk: '#076cfa', // #E53935
				call: '#00cca1',
			},
		},
	},
})
