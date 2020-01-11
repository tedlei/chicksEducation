<template>
	<view class="tl_app fx">
		<view class="tl_hx"></view>
		<text>{{title}}</text>
		<view class="tl_hx"></view>
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

	}
}
</script>

<style scoped lang="scss">
.tl_app{
	height: 50px;
	padding:0 20rpx;
	align-items: center;
	font-size: 24rpx;
	color: $col-ccc;
	text{
		margin:0 20rpx;
	}
	.tl_hx{
		flex:1;
		height: 2rpx;
		background-color: $col-ccc;
	}
}
</style>
