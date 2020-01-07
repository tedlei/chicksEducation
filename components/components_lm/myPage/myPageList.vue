<template>
	<view class="mpl_app">
		<view class="mdc_ul fx">
			<view class="mdc_li">
				<text>{{name}}</text>
				<text>{{value}}</text>				
			</view>
			<text class="iconfont"></text>
		</view>
	</view>
</template>

<script>
export default {
	props:['name','value'],
	data() {
		return {
		}
	},
	methods: {

	}
}
</script>

<style scoped lang="scss">
.mpl_app{
	.mdc_ul{
		padding: 44rpx 28rpx;
		justify-content: space-between;
	}
}
</style>
