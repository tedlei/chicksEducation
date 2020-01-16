<template>
	<view class="udNav fx">
		<view class="udBack" @tap="topBack">
			<text class="iconfont">&#xe651;</text>
		</view>
		<button class="udBtn" @tap="topSkip">{{title}}</button>
	</view>
</template>

<script>
export default {
	props:['title'],
	data() {
		return {
		}
	},
	methods: {
		//点击返回时
		topBack(){
			this.pop();
		},
		//点击保存时
		topSkip(){
			this.$emit('topSkip',);
		}
	}
}
</script>

<style scoped lang="scss">
.udNav{
	width: 750rpx;
	padding:14rpx 30rpx;
	padding-top: 56rpx;
	background-color: rgba(0,0,0,0.3);
	// border-bottom: 2rpx solid #e5e5e5;
	justify-content:space-between;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10001;
	.udBack{
		width: 100rpx;
		height:60rpx;
		line-height: 60rpx;
		font-size: 36rpx;
		color:$col-fff;
		.udText{
			margin-left: 20rpx;
		}
	}
	.udBtn{
		height:60rpx;
		padding-right: 0;
		margin:0;
		background-color:rgba(0,0,0,0);
		border-radius:10rpx;
		text-align: center;
		line-height: 60rpx;
		font-size: 32rpx;
		color: $col-fff;
	}
	.bgNone{
		background: no-repeat;
		font-size: 36rpx;
		color:$col-333;
	}
	.udBtn::after{ border: none;}
}
</style>
