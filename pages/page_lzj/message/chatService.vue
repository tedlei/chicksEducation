<template>
	<view class="box fx">
		<view class="message">
			<view class="message-detail fx" v-for="(item, i) in dataList" :key="i">
				<text class="timer">2019-6-29</text>
				<view class="message-content fx" :class="item.currentId !== userInfo.user.id ? 'left' : 'right'">
					<image src="../../../static/image/tabBal/IndexSelect.png"></image>
					<view class="message-content-context">
						<text>{{item.messageContent}}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 发送内容 -->
		<view class="send-message-placeholder"></view>
		<view class="send-message fx">
			<input type="text" v-model="input" placeholder="请输入内容" />
			<text @click="send">发送</text>
		</view>
	</view>
</template>

<script>
	import chatCommon from './chatCommon.js'
	export default {
		mixins: [chatCommon],
		onLoad(data) {
			uni.setNavigationBarTitle({
				title: data.userName
			})
			this.getMessageDetail(userInfo.user.id, data.elId, '0');
			this.createSocket();
		},
		data() {
			return {
				input: '',
				socket: null,
				dataList: [{
					messageContent: '聊天内容'
				}]
			}
		},
		methods: {
			createSocket() {
				let socketTask = uni.connectSocket({
				    url: 'http://192.168.3.88:9091',
				    complete: ()=> {}
				});
				uni.onSocketOpen(function(res) {
					console.log('WebSocket连接已打开！');
					uni.sendSocketMessage({
						data: {
							messageContent: "发送内容"
						}
					})
				});
				this.socket = socketTask;
			},
			send() {
				console.log(this.input, '发送内容');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		flex-direction: column;
		height: 100vh;

		.message {
			flex: 1;

			.message-detail {
				align-items: center;
				flex-direction: column;
				padding-top: 24rpx;

				.timer {
					color: $col-999;
					font-size: $uni-font-size-base;
				}

				.message-content {
					width: 690rpx;

					image {
						width: 88rpx;
						height: 88rpx;
					}

					.message-content-context {
						max-width: 474rpx;
						padding: 28rpx 34rpx;
						margin-top: 20rpx;
						background-color: $col-main;
						border-radius: 16rpx;

						text {
							color: $col-fff;
						}
					}
				}

				.left {
					.message-content-context {
						margin-left: 20rpx;
					}
				}

				.right {
					justify-content: flex-end;

					.message-content-context {
						margin-right: 20rpx;
					}
				}
			}
		}

		.send-message-placeholder {
			width: 100vw;
			height: 96rpx;
		}

		.send-message {
			position: fixed;
			bottom: 0;
			left: 0;
			justify-content: space-between;
			width: 100vw;
			padding: 14rpx 28rpx;
			box-shadow: 0 1px 20px 0 $col-e5;

			input {
				width: 566rpx;
				height: 68rpx;
				border: 1px solid $col-e5;
				text-indent: 1em;
			}

			text {
				width: 100rpx;
				height: 68rpx;
				background-color: $uni-color-primary;
				color: $col-fff;
				text-align: center;
				line-height: 68rpx;
				border-radius: 10rpx;
			}
		}
	}
</style>
