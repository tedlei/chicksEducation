import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
let userInfo = null;

const store = new Vuex.Store({
	state: {
		updatePosition: false,
		
		// 聊天界面(vue/nuve)状态共享
		input: "",
		chatMessageList: [{
					"currentId": "1210750415944052737",
					"id": "1243707589200498688",
					"messageContent": "你这个怎么预约",
					"messageSource": "1",
					"phone": "13983331251",
					"schoolId": "1209017944516874241",
					"self": "user1210750415944052736",
					"target": "1209017944516874241",
					"teacherName": "老弟",
					"time": "2020-03-28 01:12:52",
					"userId": "1210750415944052736"
				}, {
					"currentId": "1210750415944052736",
					"id": "1243467185054076928",
					"messageContent": "我是139",
					"messageSource": "1",
					"phone": "13983331251",
					"schoolId": "1209017944516874241",
					"self": "user1210750415944052736",
					"target": "1209017944516874241",
					"teacherName": "李老师",
					"time": "2020-03-27 09:17:37",
					"userId": "1210750415944052736"
				}, {
					"currentId": "1210750415944052737",
					"id": "1243450275868495872",
					"messageContent": "你号",
					"messageSource": "1",
					"phone": "13983331251",
					"schoolId": "1209017944516874241",
					"self": "user1210750415944052736",
					"target": "1209017944516874241",
					"teacherName": "李老师",
					"time": "2020-03-27 08:10:24",
					"userId": "1210750415944052736"
				}, {
					"currentId": "1210750415944052736",
					"id": "1243421847748452352",
					"messageContent": "nihao",
					"messageSource": "1",
					"phone": "13983331251",
					"schoolId": "1209017944516874241",
					"self": "user1210750415944052736",
					"target": "1209017944516874241",
					"teacherName": "李老师",
					"time": "2020-03-27 06:17:27",
					"userId": "1210750415944052736"
				}],
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
		},
		updateInput(state, newValue){
			state.input = newValue;
		},
		updateChatMessageList(state, newValue){
			state.chatMessageList = newValue;
		}
	}
})

export default store
