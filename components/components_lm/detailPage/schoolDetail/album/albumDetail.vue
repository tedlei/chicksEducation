<template>
	<view class="ad_app fx">
		<image mode='aspectFit' :src="require('../../../../../static/image/default.png')"></image>
	</view>
</template>

<script>
export default {
	data() {
		return {
		}
	},
	methods: { 

	}
}
</script>

<style scoped lang="scss">
.ad_app{
	width: 210rpx;
	height: 280rpx;
	margin-top: 30rpx;
	margin-left: 30rpx;
	background-color: $col-e5;
	border-radius: 5px;
	overflow: hidden;
	align-items: center;
}
</style>
