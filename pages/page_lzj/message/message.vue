<template>
	<!-- 基础用法 -->
	<uni-swipe-action> 
		<view class="message-nav fx">
			<text class="active-text" @click="cutN(0)">系统</text>
			<text class="active-text" @click="cutN(1)">客服</text>
			<text class="active-text" @click="cutN(2)">学校</text>
			<!-- 导航线条 -->
			<view class="message-nav-line" :style="{left: 85*(2*n + 1) + n*80 + 'rpx'}"></view>
		</view>
		<uni-swipe-action-item class="iconfont" v-if="n === 0"
			v-for="(item, i) in dataList"
			:key="i"
			:options="options"
			@click="dlt"
			:auto-close="false"
			:show="dltNUmber === i"
			@change="onChnage"
			:i="i">
			<view class="option fx">
				<text class="circle"></text>
				<navigator hover-class="none" :url="'/pages/page_lzj/message/chat?el=' + item.el + '&id=' + '1'">
					<view class="fx option-center">
						<view class="fx">
							<image src="../../../static/image/kecheng.png" mode=""></image>
							<view class="option-center-context fx">
								<text>{{item.el}}</text>
								<text>您有{{item.num}}条新消息</text>
							</view>
						</view>
						<view><text class="timer">{{item.timer}}</text></view>
					</view>
				</navigator>
			</view>
		</uni-swipe-action-item>
		<uni-swipe-action-item class="iconfont" v-if="n === 1"
			v-for="(item, i) in dataList1"
			:key="i"
			:options="options"
			@click="dlt"
			:auto-close="false"
			:show="dltNUmber === i"
			@change="onChnage"
			:i="i">
			<view class="option fx">
				<text class="circle"></text>
				<navigator hover-class="none" :url="'/pages/page_lzj/message/chat?el=' + item.el + '&id=' + '1'">
					<view class="fx option-center">
						<view class="fx">
							<image src="../../../static/image/kecheng.png" mode=""></image>
							<view class="option-center-context fx">
								<text>{{item.el}}</text>
								<text>您有{{item.num}}条新消息</text>
							</view>
						</view>
						<view><text class="timer">{{item.timer}}</text></view>
					</view>
				</navigator>
			</view>
		</uni-swipe-action-item>
		
		<uni-swipe-action-item class="iconfont" v-if="n === 2"
			v-for="(item, i) in dataList2"
			:key="i"
			:options="options"
			@click="dlt"
			:auto-close="false"
			:show="dltNUmber === i"
			@change="onChnage"
			:i="i">
			<view class="option fx">
				<text class="circle"></text>
				<navigator hover-class="none" :url="'/pages/page_lzj/message/chat?el=' + item.el + '&id=' + '1'">
					<view class="fx option-center">
						<view class="fx">
							<image src="../../../static/image/kecheng.png" mode=""></image>
							<view class="option-center-context fx">
								<text>{{item.messageContent}}</text>
								<text>您有{{item.num}}条新消息</text>
							</view>
						</view>
						<view><text class="timer">{{item.timer}}</text></view>
					</view>
				</navigator>
			</view>
		</uni-swipe-action-item>
	</uni-swipe-action>
</template>

<script>
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	export default {
		components: {
			uniSwipeAction,
			uniSwipeActionItem
		},
		data() {
			return {
				n: 2, // 处于哪个消息列表
				index: 1,	// 页数
				index1: 1,
				index2: 1,
				pageSize: 8,
				dltNUmber: -1,	// 显示哪个删除按钮
				options: [{
					text: '\ue732',
					style: {
						backgroundColor: '#FF0000',
						width: '79px',
						fontSize: '54rpx'
					}
				}],
				dataList: [], // 系统消息列表
				dataList1: [],	// 客服消息列表
				dataList2: []	// 学校消息列表
			};
		},
		mounted() {
			this.getSchoolMessage();
		},
		watch: {
			n(v){
				switch(v) {
					case 0:
						if (!this.dataList.length) {
							this.getServiceMessage();
						}
						this.getSysMessage();
						break;
					case 1:
						if (!this.dataList1.length) {
							this.getServiceMessage();
						}
						break;
					case 2:
						if (!this.dataList2.length) {
							this.getServiceMessage();
						}
						this.getSchoolMessage();
						break;
					// not default
				}
			}
		},
		methods: {
			/**
			 * 获取系统消息列表
			 */
			async getSysMessage(){
				this.dataList = await this.getMessageList('index', '1');
			},
			/**
			 * 获取客服消息列表
			 */
			async getServiceMessage(){
				this.dataList1 = await this.getMessageList('index1', '3', 'kefu');
			},
			/**
			 * 获取学校消息列表
			 */
			async getSchoolMessage(){
				this.dataList2 = await this.getMessageList('index2', '3');
			},
			/**
			 * 获取消息列表
			 */
			getMessageList(indexKey, num, el = null){
				return new Promise(resolve=>{
					let {user, schoolUser} = getApp().globalData.userInfo,
						userId = '';
					if (el === 'kefu') userId = schoolUser.id;
					else userId = user.id;
					this.fetch({
						url: 'userMessage/message.do',
						method: 'post',
						data: {
							userId: userId.toString(),
							pageNum: (this[indexKey] - 1).toString(),
							pageSize: this.pageSize.toString(),
							num
						},
						success: (res) => {
							this[indexKey]++;
							resolve(res.data.rows);
						}
					}, 2);
				})
			},
			dlt() {
				uni.showModal({
				    title: '提示',
				    content: '确认是否删除',
				    success: function (res) {
						if (res.confirm) {
							// 调用删除接口删除消息列表
						}
				    }
				});
			},
			onChnage(e){
				if (!e.open) return
				this.dltNUmber = e.index;
			},
			/**
			 * 切换消息列表
			 * @param {Number} n
			 */
			cutN(n){
				this.n = n;
			}
		}
	}
</script>
<style scoped lang="scss">
	.active-text:active{
		color: rgba($color: $col-fff, $alpha: 0.7);
	}
	.message-nav{
		position: relative;
		text{
			flex: 1;
			height: 38px;
			background-color: $col-main;
			color: $col-fff;
			line-height: 38px;
			text-align: center;
		}
		.message-nav-line{
			position: absolute;
			bottom: 8rpx;
			width: 80rpx;
			height: 6rpx;
			background-color: $col-fff;
			transition: left 0.3s;
		}
	}
	.option {
		align-items: center;
		justify-content: space-between;
		width: 750rpx;
		height: 128rpx;
		padding: 0 30rpx;

		.circle {
			display: inline-block;
			width: 16rpx;
			height: 16rpx;
			background-color: $col-main;
			border-radius: 8rpx;
		}

		.option-center {
			align-items: center;
			justify-content: space-between;
			width: 644rpx;
			height: 88rpx;

			.option-center-context {
				flex-direction: column;
				justify-content: space-between;

				& text:nth-child(1) {
					color: $col-333;
					font-size: 36rpx;
				}

				& text:nth-child(2) {
					color: $col-999;
					font-size: $uni-font-size-sm;
				}
			}

			.timer {
				color: $col-999;
				font-size: $uni-font-size-sm;
			}
		}

		image {
			width: 88rpx;
			height: 88rpx;
		}
	}
</style>
