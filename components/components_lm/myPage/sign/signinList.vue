<template>
	<view class="sil_app" :class="isContinuous?(isEnd?'sil_width sil_bgColor':'sil_bgColor'):isEnd?'sil_width':''">
		<view class="sil_text fx">
			<text class="sil_t1">{{item.sky}}</text>
			<text class="sil_t1 sw_mar"><text>{{item.integral}}</text>积分</text>
		</view>
		<image class="sil_img" 
		:src="require('../../../../static/image/sign/'+(isContinuous?'signImg2':'signImg1')+'.png')"></image>
	</view>
</template>

<script>
export default {
	props:['item','isEnd','isContinuous'],
	data() {
		return {
			
		}
	},
	methods: {

	}
}
</script>

<style scoped lang="scss">
.sil_app{
	width: 144rpx;
	height: 144rpx;
	margin-top: 26rpx;
	margin-left: 30rpx;
	background:radial-gradient(closest-side at 50% 70%,rgba(255,196,139,1) 20%,rgba(253,131,13,1) 100%);
	border-radius: 72rpx;
	position: relative;
	.sil_text{
		width: 100%;
		color: $col-fff;
		flex-direction: column;
		align-items: center;
		.sil_t1{
			margin-top: 10rpx;
			font-size: 24rpx;
			text{
				margin-right: 3px;
				font-size: 28rpx;
			}
		}
	}
	.sil_img{
		width: 64rpx;
		height: 72rpx;
		position: absolute;
		left: 40rpx;
		bottom: -16rpx;
	}
}
.sil_width{
	width: 308rpx;
	background:radial-gradient(closest-side at 70% 60%,rgba(255,196,139,1) 20%,rgba(253,131,13,1) 100%);
	.sil_text{
		width: 150rpx;
		.sw_mar{
			margin-top: 32rpx;
		}
		// .sil_t1{
		// }
	}
	.sil_img{
		width: 114rpx;
		height: 130rpx;
		left: 170rpx;
		bottom: -30rpx;
	}
}
.sil_bgColor{
	background:rgba(253,131,13,0.2);
}
</style>
