<template>
	<view class="at_app">
		<hb title="课程预约"></hb>
		<view class="at_btn active">确认预约</view>
	</view>
</template>

<script>
import hb from '../../../components/components_lm/detailPage/headBack.vue'
export default {
	components:{hb},
	data() {
		return {
		}
	},
	methods: {

	}
}
</script>

<style scoped lang="scss">
.at_app{
	
	.at_btn{
		width: 750rpx;
		height: 98rpx;
		background-color: $col-main;
		text-align: center;
		line-height: 98rpx;
		font-size: 18px;
		color: $col-fff;
		position: absolute;
		bottom: 0;
	}
}
</style>
