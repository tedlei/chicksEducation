<template>
	<!-- 基础用法 -->
	<uni-swipe-action>
		<uni-swipe-action-item class="iconfont" 
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
				dltNUmber: -1,
				options: [{
					text: '\ue732',
					style: {
						backgroundColor: '#FF0000',
						width: '79px',
						fontSize: '54rpx'
					}
				}],
				dataList: [{
						el: '系统',
						num: 1,
						timer: '2019-6-29'
					},
					{
						el: '天琥教育',
						num: 1,
						timer: '2019-6-29'
					},
					{
						el: '龙丰培训',
						num: 1,
						timer: '2019-6-29'
					}
				]
			};
		},
		onLoad() {
		},
		methods: {
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
			}
		}
	}
</script>
<style scoped lang="scss">
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
