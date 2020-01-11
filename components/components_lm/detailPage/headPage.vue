<template>
<<<<<<< HEAD
	<view class="udNav fx">
		<view class="udBack" @tap="topBack">
			<text class="iconfont">&#xe651;</text>
		</view>
=======
	<view class="udNav fx">
		<view class="udBack" @tap="topBack">
			<text class="iconfont">&#xe651;</text>
		</view>
>>>>>>> 2de0f37acc56a0973e9542f1f203a67643853d80
		<button class="udBtn" @tap="topSkip">{{title}}</button>
	</view>
</template>

<script>
<<<<<<< HEAD
export default {
=======
export default {
>>>>>>> 2de0f37acc56a0973e9542f1f203a67643853d80
	props:['title'],
	data() {
		return {
		}
	},
<<<<<<< HEAD
	methods: {
		//点击返回时
		topBack(){
			this.$emit('topBack')
		},
		//点击保存时
		topSkip(){
			this.$emit('topSkip',);
=======
	methods: {
		//点击返回时
		topBack(){
			this.$emit('topBack')
		},
		//点击保存时
		topSkip(){
			this.$emit('topSkip',);
>>>>>>> 2de0f37acc56a0973e9542f1f203a67643853d80
		}
	}
}
</script>

<<<<<<< HEAD
<style scoped lang="scss">
.udNav{
	width: 750rpx;
	padding:14rpx 30rpx;
	padding-top: 56rpx;
	background-color: rgba(0,0,0,0.3);
	border-bottom: 2rpx solid #e5e5e5;
	justify-content:space-between;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	.udBack{
		height:60rpx;
		line-height: 60rpx;
		font-size: 36rpx;
		color:$col-333;
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
=======
<style scoped lang="scss">
.udNav{
	width: 750rpx;
	padding:14rpx 30rpx;
	padding-top: 56rpx;
	background-color: rgba(0,0,0,0.3);
	border-bottom: 2rpx solid #e5e5e5;
	justify-content:space-between;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	.udBack{
		height:60rpx;
		line-height: 60rpx;
		font-size: 36rpx;
		color:$col-333;
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
>>>>>>> 2de0f37acc56a0973e9542f1f203a67643853d80
}
</style>
