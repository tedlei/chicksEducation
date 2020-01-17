<template>
	<view class="si_app pfAllScreen">
		<hb title="每日签到" :bgInherit='true'></hb>
		<view class="si_integral">
			<view class="si_int_top">
				我的积分
				<text class="si_int_num">100</text>
			</view>
			<view class="si_remind">
				<view class="si_rem_left">本周你已连续签到1天</view>
				<view class="si_rem_right">
					<text>签到提醒</text>
					<switch class="si_rem_switch" :checked="false" @change="switch1Change" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import hb from '../../../../components/components_lm/detailPage/headBack.vue'
export default {
	components:{hb},
	data() {
		return {
		}
	},
	methods: {
		//
		switch1Change(e){
			console.log(e.detail.value);
		}
	}
}
</script>

<style scoped lang="scss">
.si_app{
	background-image: url('~@/static/image/signIn.png');
	background-size: 100% 100%;
	.si_integral{
		width: 718rpx;
		height: 626rpx;
		margin:38rpx auto;
		margin-bottom: 0;
		background-color: $col-fff;
		border-radius: 5px;
		.si_int_top{
			height: 100rpx;
			padding-top: 26rpx;
			padding-left:  28rpx;
			border-bottom: 1px solid $col-f5;
			font-size: 36rpx;
			font-weight: bold;
			color: $col-333;
			.si_int_num{
				margin-left: 20rpx;
				color: $col-main;
			}
		}
	}
	.si_remind{
		padding:0 30rpx;
		padding-top: 22rpx;
		.si_rem_left{
			padding-left: 5px;
			border-left: 2px solid $col-main;
			font-weight: bold;
		}
		.si_rem_right{
			.si_rem_switch{
				width: 64rpx;
				height: 28rpx;
			}
		}
	}
}
</style>
