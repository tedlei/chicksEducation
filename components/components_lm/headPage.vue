<template>
	<view class="udNav fx">
		<view class="udBack" @tap="topBack">
			<text class="iconfont">&#xe651;</text>
			<text class="udText">{{title}}</text>
		</view>
		<button class="udBtn" v-if="!isBtn" :class="login?'bgNone':''" type="primary" @tap="topSave">{{login?'注册':'确认'}}</button>
	</view>
</template>

<script>
export default {
	props:['title','login','isBtn'],
	data() {
		return {
		}
	},
	methods: {
		//点击返回时
		topBack(){
			this.$emit('topBack')
		},
		//点击保存时
		topSave(){
			if(this.login)this.$emit('topSave','reg');
			else this.$emit('topSave')
		}
	}
}
</script>

<style scoped lang="scss">
.udNav{
	padding:14rpx 30rpx;
	padding-top: 54rpx;
	background-color: $col-f5;
	border-bottom: 2rpx solid #e5e5e5;
	justify-content:space-between;
	align-items: center;
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
		width:96rpx;
		height:60rpx;
		padding:0;
		margin:0;
		background-color:$col-main;
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
