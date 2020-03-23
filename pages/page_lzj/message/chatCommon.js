// import io from '../../../js_sdk/socket-io/weapp.socket.io.js';

module.exports = {
	data() {
		return {
			pageNum: 0,
			pageSize: 4,
			dataList: [],
			input: '',
			userInfo: getApp().globalData.userInfo,
			socket: null,	// socket对象
			lowerThreshold: '',	// 发送消息后位于底部的元素的id
		}
	},
	methods: {
		/**
		 * 建立socket链接
		 */
		createSocket() {
			// console.log(io, 99999999999999999999)
			// let ws = io('http://120.78.145.39:9108/');
			
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
					this.dataList = res.data.object;
				}
			})
		},
		send(e, el = 'send') {
			this.lowerThreshold = ''
			let input = this.input;
			if (!input.trim().length) {
				uni.showToast({
					title: '消息不能为空!',
					icon: "none"
				})
				return
			}

			if (el !== 'send') {
				// 接受消息
				console.log(123123)
			} else this.sendMsg(input);
			
			this.input = '';
		}
	}
}
