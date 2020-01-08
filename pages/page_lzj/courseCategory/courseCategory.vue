<template>
	<view class="courseCategory fx">
		<view class="leftNav">
			<view v-for="(item,index) in courseClassificationList" :key="index" class="leftNavOption">
				<view class="fx fxCenter leftNavOption_tit active" 
					:class="index === showNumber ?  'checked' : ''" 
					@tap="cutShowNumber(index)">{{item.tit}}</view>
				<view v-show="index === showNumber"
						class="rightContent">
						<view v-for="(value, j) in item.option" :key="j">
							<text class="optionTit">{{value.optionTit}}</text>
							<view class="optionContextList fx">
								<text v-for="(val, m) in value.optionContextList" :key="m">{{val}}</text>
							</view>
						</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import courseCategoryState from './courseCategory.js';
	export default {
		data() {
			return {...courseCategoryState};
		},
		methods: {
			/**
			 * 切换显示类别
			 */
			cutShowNumber(index){
				this.showNumber = index;
			}
		}
	}
</script>

<style scoped lang="scss">
	.courseCategory{
		height: 100vh;
		background-color: $col-fff;
		.leftNav{
			width: 188rpx;
			height: 100%;
			background-color: $col-f5;
			.leftNavOption{
				.leftNavOption_tit{
					height: 120rpx;
				}
				.checked{
					position: relative;
					background-color: $col-fff;
				}
				.checked:before{
					position: absolute;
					top: 0;
					left: 0;
					width: 6rpx;
					height: 120rpx;
					content: '';
					background-color: $col-main;
				}
				.rightContent{
					position: absolute;
					top: 0;
					bottom: 0;
					right: 0;
					overflow-y: auto;
					width: 562rpx;
					padding: 6rpx 0 32rpx 60rpx;
					background-color: $col-fff;
					.optionTit{
						display: inline-block;
						margin: 26rpx 0;
						color: $col-main;
						font-size:32rpx;
						font-weight:bold;
					}
					.optionContextList{
						flex-wrap: wrap;
						text{
							display: inline-block;
							margin-right: 32rpx;
							margin-bottom: 10rpx;
						}
					}
				}
			}
		}
	}
</style>
