import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
let userInfo = null;

const store = new Vuex.Store({
	state: {
		updatePosition: false
	},
	getters: {
		location: (state) => {
			let location = uni.getStorageSync('position');
			return () => {
				if (state.updatePosition) {
					location = uni.getStorageSync('position');
					state.updatePosition = false;
				}
				if (typeof location === "string" && /^(\[|\{)/.test(location)){
					location = JSON.parse(location);
				}
				return location;
			}
		},
		vm: () => {
			return (v) => {
				userInfo = v.getItemSync('userInfo');
				return null;
			}
		}
	},
	mutations: {
		changeUpdatePosition(state, newValue) {
			state.updatePosition = newValue;
		}
	}
})

export default store
