<template>
	<view class="bb_app fx">
		<view class="bbLift active" 
			v-if="type!=='teacher'" @tap="clickLeft">{{leftTitle}}</view>
		<view class="bbRight" :class="isOrder?'bgColor':'active'" 
		  v-if="type!=='school'"	@tap="clickRight">{{rightTitle}}</view>
	</view>
</template>

<script>
export default {
	props:['isOrder','leftTitle','rightTitle','type'],
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
	align-items: center;
	view{
		flex: 1;
		height:100%;
		text-align: center;
		line-height: 47px;
		color:$col-fff;
		background-color: $col-fff;
		font-size: 18px;
		border-top: 1px solid $col-main;
	}
	.bbLift{
		color: $col-main;
	}
	.bbRight{
		background-color: $col-main;
	}
	.bgColor{
		background-color: $col-ccc;
		border-color: $col-ccc;
		color: $col-999;
	}
}
</style>
