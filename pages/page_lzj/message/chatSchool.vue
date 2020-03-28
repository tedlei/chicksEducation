<template>
	<view class="">
		<uChat></uChat>
	</view>
</template>

<script>
	import chatCommon from './chatCommon.js'
	import uChat from './chat.nvue'

	export default {
		mixins: [chatCommon],
		components: {
			uChat
		},
		onLoad(data) {
			
			uni.setNavigationBarTitle({
				title: data.userName
			})
			
			this.deviceHeight = plus.screen.resolutionHeight

			
			// // 获取消息详情列表 
			// this.getMessageDetail(userInfo.user.id, data.elId, '0');

			this.createSocket();

			// 监听发送消息事件
			uni.$on('sendMsg', this.sendMsg);
		},
		data() {
			return {
				socket: null,
				dataList: [{
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
				deviceHeight: 0
			}
		},
		methods: {}
	}
</script>

<style lang="scss" scoped></style>
