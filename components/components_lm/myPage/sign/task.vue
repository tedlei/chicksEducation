<template>
	<view class="task_app fx">
		<view class="task_left fx">
			{{obj.title}}
			<view class="task_jjf">+{{obj.integral}}积分</view>
		</view>
		<view class="task_right" :class="obj.isFinish?'task_bgcolor2':'task_bgcolor1'" @tap="clicktz(obj.url)">
			{{obj.isFinish?'已完成':'去完成'}}
		</view>
	</view>
</template>

<script>
export default {
	props:['obj'],
	data() {
		return {
		}
	},
	methods: {
		clicktz(url){
			if(!url)return
			uni.$emit('courseCategoryToCurrList', null);
			uni.switchTab({url})
		}
	}
}
</script>

<style scoped lang="scss">
.task_app{
	width:630rpx;
	height:100rpx;
	margin:0 auto;
	border-top: 1px solid $col-f5;
	justify-content: space-between;
	align-items: center;
	.task_left{
		font-size: 28rpx;
		color:$col-333;
		align-items: center;
		.task_jjf{
			width: 100rpx;
			height: 32rpx;
			margin-left: 28rpx;
			border-radius: 16rpx;
			background-color: #FFCFC2;
			text-align: center;
			line-height: 32rpx;
			font-size: 24rpx;
			color: #FD5D0A;
		}
	}
	.task_right{
		width: 140rpx;
		height: 52rpx;
		border-radius: 26rpx;
		text-align: center;
		line-height: 52rpx;
		font-size: 24rpx;
		color:$col-fff;
	}
	.task_bgcolor1{
		background:linear-gradient(145deg,rgba(253,172,10,1) 0%,rgba(253,87,13,1) 100%);
	}
	.task_bgcolor2{
		background-color: #E9E8E8;
		color: $col-666;
	}
}
</style>
