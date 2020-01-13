<template>
	<view class="bb_app fx">
		<view class="bbLift active" @tap="clickLeft">{{leftTitle}}</view>
		<view class="bbRight active" @tap="clickRight">{{rightTitle}}</view>
	</view>
</template>

<script>
export default {
	props:['leftTitle','rightTitle'],
	data() {
		return {
		}
	},
	methods: {
		clickLeft(){
			this.$emit('clickLeft');
		},
		clickRight(){
			this.$emit('clickRight');
		}
	}
}
</script>

<style scoped lang="scss">
.bb_app{
	background-color: #007AFF;
	width: 750rpx;
	height: 48px;
	border-top: 1px solid $col-main;
	align-items: center;
	view{
		width: 375rpx;
		height:100%;
		text-align: center;
		line-height: 47px;
		color:$col-fff;
		background-color: $col-fff;
		font-size: 18px;
	}
	.bbLift{
		color: $col-main;
	}
	.bbRight{
		background-color: $col-main;
	}
}
</style>
