// import io from '../../../js_sdk/hyoga-uni-socket_io/uni-socket.io.js';
import {mapState, mapMutations} from 'vuex'
module.exports = {
	computed: {...mapState(['chatMessageList'])},
	data() {
		return { 
			pageNum: 0,
			pageSize: 4,
			dataList: [],
			userInfo: getApp().globalData.userInfo,
			socket: null,	// socket对象
		}
	},
	methods: {
		...mapMutations(['updateInput', 'updateChatMessageList']),
		/**
		 * 建立socket链接
		 */
		createSocket() {
			
			// websocket连接
			
			
			// let ws = io('http://192.168.3.88:9108/');
			// console.log(ws, 999);
			// // 连接成功
			// ws.on('connect', () => {
			// 	console.log('连接成功');
			// });
			
			// ws.on('communication', msg => {   // key 用于接受服务端定义为key的对应消息
			// 	console.log(msg,'接收过来的数据');
			// 	this.send(msg, 'from');
			// });
			// let userInfo = this.userInfo;
			// ws.emit('username', 'user' + userInfo.user.id);
			// if (!this.isSchool) {
			// 	ws.emit('username', 'user' + userInfo.schoolUser.id);
			// }
			// this.socket = ws;
		},
		getMessageDetail(userId, elId, num) {
			uni.request({
				url: 'http://112.74.16.235:9102/cnjy-user-web/userMessage/getMessageDetails.do',
				method: 'post',
				data: { 
					userId, // 本人id
					elId, // 聊天对象id
					pageNum: this.pageNum.toString(), // 页数
					pageSize: this.pageSize.toString(), // 数量
					num
				},
				header: {
					'content-type': 'application/json'
				},
				success: (res) => {
					console.log(res, 77);
					this.dataList = res.data.object;
				}
			})
		},
		/**
		 * 发送消息
		 */
		sendMsg(message) {
			if (!message.trim().length) {
				uni.showToast({
					title: '消息不能为空!',
					icon: "none"
				})
				return
			}
			let dataList = this.chatMessageList;
			dataList.push({
					messageContent: message, // 消息内容
					messageSource: "1", //
					teacherName: "",
					schoolId: "1209017944516874241",
					userId: "1210750415944052736",
					time: "2020-03-19 12:39:26",
					Target: "user1209017944516874241",
					self: "user1210750415944052736",
					phone: "13983331251",
					currentId: "1210750415944052736"
				})
				
			this.updateChatMessageList(dataList);
			this.updateInput('');
		},
		/**
		 * 接收消息
		 */
		receiveMsg(){
			
		}
	},
	// 页面销毁时清除input值
	onUnload(){
		console.log('销毁');
		this.updateInput('');
	}
}
