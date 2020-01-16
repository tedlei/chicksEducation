<template>
	<view class="more_app fx">
		<text class="more_left">{{title}}</text>
		<view class="more_right active" @tap="clickMore" v-if="!isRight">
			<text>更多</text>
			<text class="iconfont">&#xe601;</text>
		</view>
	</view>
</template>

<script>
export default {
	props:['title','num','isRight'],
	data() {
		return {
		}
	},
	methods: {
		clickMore(){
			this.$emit('clickMore',this.num);
		}
	}
}
</script>

<style scoped lang="scss">
.more_app{
	width: 100%;
	padding: 0 30rpx;
	padding-top: 20px;
	justify-content: space-between;
	align-items: center;
	.more_left{
		font-weight: bold;
		color: $col-333;
	}
	.more_right{
		height: 60rpx;
		line-height: 60rpx;
		font-size: 12px;
		color:$col-666;
	}
}
</style>
