module.exports = {
	data() {
		return {
			pageNum: 0,
			pageSize: 4,
			dataList: [],
			input: '',
			userInfo: getApp().globalData.userInfo,
			
			scrollTop:0,  //滚动高度
		}
	},
	methods: {
		getMessageDetail(userId, elId, num) {
			this.fetch({
				url: 'userMessage/getMessageDetails.do',
				method: 'post',
				data: {
					userId, // 本人id
					elId, // 聊天对象id
					pageNum: this.pageNum.toString(), // 页数
					pageSize: this.pageSize.toString(), // 数量
					num
				},
				success: (res) => {
					this.dataList = res.data.object;
				}
			}, 2)
		},
		send(viewId) {
			
			let input = this.input;
			if (!input.trim().length) {
				uni.showToast({
					title: '消息不能为空!',
					icon: "none"
				})
				return
			}
			this.dataList = this.dataList.concat([{
				"currentId": "1210750415944052736",
				"id": "1219246748977270784",
				"messageContent": input,
				"messageSource": "1",
				"phone": "13983331251",
				"schoolId": "1209017944516874241",
				"self": "user1210750415944052736",
				"target": "1209017944516874241",
				"teacherName": "李老师",
				"time": "2020-01-20 13:14:12",
				"userId": "1210750415944052736"
			}])
			this.input = '';
			this.setHeight(viewId)
		},
		
		//设置滑动高度
		setHeight(viewId){
			const query = wx.createSelectorQuery()
			query.select(viewId).boundingClientRect()
			query.selectViewport().scrollOffset()
			query.exec(res=>{
				this.scrollTop = res[0].height
				this.$nextTick(function() {
					this.scrollTop = res[0].height
				});
			})
		},
	}
}
