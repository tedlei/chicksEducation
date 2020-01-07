<template>
	<view class="text-app">
		<text>{{title}}</text>
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

.text-app{
	width: 750upx;
	padding:160rpx 0;
	text-align: center;
	font-size: 48rpx;
	color:$col-333;
}
</style>
