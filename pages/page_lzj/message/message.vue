<template>
	<!-- 基础用法 -->
	<view>
		<view class="showContent">
			<uni-swipe-action>
				<view class="message-nav fx">
					<text class="active-text" @click="cutN(0)">系统</text>
					<text class="active-text" @click="cutN(1)">客服</text>
					<text class="active-text" @click="cutN(2)">学校</text>
					<!-- 导航线条 -->
					<view class="message-nav-line" :style="{left: 85*(2*n + 1) + n*80 + 'rpx'}"></view>
				</view>
				<view class="message-nav2"></view>
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
						<text v-show="item.usedStatus === '1'" class="circle"></text>
						<view class="fx option-center" @tap="toDetail(item.userId, item.id, i, 'Sys', item.userName)">
							<view class="fx">
								<image src="../../../static/image/kecheng.png" mode=""></image>
								<view class="option-center-context fx">
									<text>{{item.el}}</text>
								</view>
							</view>
							<view><text class="timer">{{item.time.slice(0, 10)}}</text></view>
						</view>
					</view>
				</uni-swipe-action-item>
				<text v-else class="none-message">暂无消息</text>
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
						<text v-show="item.usedStatus === '1'" class="circle"></text>
						
						<view class="fx option-center"  @tap="toDetail(item.userId, item.id, i, 'Service', item.userName)">
							<view class="fx">
								<image src="../../../static/image/kecheng.png" mode=""></image>
								<view class="option-center-context fx">
									<text>{{item.messageContent}}</text>
								</view>
							</view>
							<view><text class="timer">{{item.time.slice(0, 10)}}</text></view>
						</view>
					</view>
				</uni-swipe-action-item>
				<text v-else class="none-message">暂无消息</text>
				
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
						<text v-show="item.usedStatus === '1'" class="circle"></text>
						<view class="fx option-center"  @tap="toDetail(item.userId, item.id, i, 'School', item.userName)">
							<view class="fx">
								<image src="../../../static/image/kecheng.png" mode=""></image>
								<view class="option-center-context fx">
									<text>{{item.messageContent}}</text>
								</view>
							</view>
							<view><text class="timer">{{item.time.slice(0, 10)}}</text></view>
						</view>
					</view>
				</uni-swipe-action-item>
				<text v-else class="none-message">暂无消息</text>
			</uni-swipe-action>
		</view>
		<uni-load-more v-if="showUniLoadMore" :status="status" :content-text="contentText" />
	</view>
</template>

<script>
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	import uniLoadMore from '../../../components/uni-load-more/uni-load-more.vue'
	
	export default {
		components: {
			uniSwipeAction,
			uniSwipeActionItem,
			uniLoadMore
		},
		data() {
			return {
				showUniLoadMore: true,
				status: 'more',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				n: 2, // 处于哪个消息列表
				index: 1,	// 页数
				index1: 1,
				index2: 1,
				pageSize: 2,
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
			this.getSchoolMessage(1);
		},
		onShow(){
			switch(this.n) {
				case 0:
					this.getSysMessage(1);
					break;
				case 1:
					this.getServiceMessage(1);
					break;
				case 2:
					this.getSchoolMessage(1);
					break;
				// not default
			}
		},
		watch: {
			n(v){
				switch(v) {
					case 0:
						if (!this.dataList.length) {
							this.getSysMessage(1);
						}
						break;
					case 1:
						if (!this.dataList1.length) {
							this.getServiceMessage(1);
						}
						break;
					case 2:
						if (!this.dataList2.length) {
							this.getSchoolMessage(1);
						}
						break;
					// not default
				}
			}
		},
		methods: {
			/**
			 * 获取系统消息列表
			 */
			async getSysMessage(index){
				this.dataList = await this.getMessageList(index, '1');
			},
			/**
			 * 获取客服消息列表
			 */
			async getServiceMessage(index){
				this.dataList1 = await this.getMessageList(index, '3', 'kefu');
			},
			/**
			 * 获取学校消息列表
			 */
			async getSchoolMessage(index){
				this.dataList2 = await this.getMessageList(index, '3');
			},
			/**
			 * 获取消息列表
			 */
			getMessageList(index, num, el = null){
				return new Promise(resolve=>{
					let {user, schoolUser} = getApp().globalData.userInfo,
						userId = '';
					if (!user) uni.reLaunch({url:'/pages/page_lm/LoginRelated/verifyLogin'});
					if (el === 'kefu') {
						this.fetch({
							url: 'userMessage/selectSchoolService.do',
							method: 'post',
							data: {
								phone: user.phone,
								schoolId: schoolUser ? schoolUser.id : '',
								pageNum: (index - 1).toString(),
								pageSize: this.pageSize.toString()
							},
							success: (res)=>{
								resolve(res.data.rows);
							}
						}, 2);
					} else {
						userId = user.id;
						this.fetch({
							url: 'userMessage/message.do',
							method: 'post',
							data: {
								userId: userId.toString(),
								pageNum: (index - 1).toString(),
								pageSize: this.pageSize.toString(),
								num
							},
							success: (res) => {
								resolve(res.data.rows);
							}
						}, 2);
					}
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
			},
			/**
			 * 去到详情页
			 */
			toDetail(elId, id, i, name, userName){
				let n = this.n;
				this.push({url:'/pages/page_lzj/message/chat' + name}, {
					elId: n === 0 ? id : elId,
					userName
				})
				let userInfo = getApp().globalData.userInfo;
				let num = n === 0 ? '1' : '3'
				this.fetch({
					url: 'userMessage/updateMessage.do',
					method: 'post',
					data: {
						id,
						userId: userInfo.user.id,
						num
					},
					success: () => {
						switch(n) {
							case 0:
								this.dataList[i].usedStatus = '2';
								break;
							case 1:
								this.dataList1[i].usedStatus = '2';
								break;
							case 2:
								this.dataList2[i].usedStatus = '2';
								console.log(this.dataList2[i].usedStatus, 1111);
								break;
						}
					}
				}, 2)
			},
			/**
			 * 更改消息读取状态
			 */
		},
		// 触底加载更多
		async onReachBottom() {
			let index = 1,
				res = null;
			this.status = "loading";
			switch(this.n) {
				case 0:
					this.index++
					index = this.index;
					res = await this.getMessageList(index, '1');
					this.dataList = this.dataList.concat(res);
					break;
				case 1:
					this.index1++
					index = this.index1;
					res = await this.getMessageList(index, '3', 'kefu');
					this.dataList1 = this.dataList1.concat(res);
					break;
				case 2:
					this.index2++
					index = this.index2;
					res = await this.getMessageList(index, '3');
					this.dataList2 = this.dataList2.concat(res);
					break;
				// not default
			}
			
			let timer = setTimeout(()=>{
				this.showUniLoadMore = false;
				if (res.length) {
					this.status = 'more'
				} else this.status = 'none'
				clearTimeout(timer);
			}, 100);
			let timer2 = setTimeout(()=>{
				this.showUniLoadMore = true;
				clearTimeout(timer2);
			}, 200)
		}
	}
</script>
<style scoped lang="scss">
	.active-text:active{
		color: rgba($color: $col-fff, $alpha: 0.7);
	}
	.showContent{
		position: relative;
		min-height: 100vh;
		.none-message{
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			height: 80rpx;
			margin: auto;
			color: $col-ccc;
			font-size: 48rpx;
			text-align: center;
			line-height: 80rpx;
		}
	}
	.message-nav{
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		z-index: 10;
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
	.message-nav2{
		width: 100vw;
		height: 38px;
	}
	.option {
		position: relative;
		align-items: center;
		justify-content: space-between;
		width: 750rpx;
		height: 128rpx;
		padding: 0 30rpx;

		.circle {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 30rpx;
			margin: auto 0;
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
			margin-left: 24rpx;

			.option-center-context {
				flex-direction: column;
				justify-content: center;
				text {
					color: $col-333;
					font-size: 36rpx;
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
