<template>
	<view class="ssl_app fx">
		<view class="ssl_Sel" v-for="(item,i) of selList" @tap="onSel(i)"
			:class="i===selNum?'onSel':''"	:key='i'>{{item}}</view>
	</view>
</template>

<script>
export default {
	props:['num'],
	data() {
		return {
			selList:['主页','课程','教师','相册','资讯'],
			selNum:0,
		}
	},
	created() {
		this.selNum = this.num;
	},
	methods: {
		//当选择时
		onSel(num){
			this.selNum = num;
			this.$emit('onSel',num);
		}
	},
	watch:{
		num(val){
			this.selNum = val
		}
	}
}
</script>

<style scoped lang="scss">
.ssl_app{
	width: 750rpx;
	height: 36px;
	padding:16rpx 26rpx;
	padding-bottom: 0;
	border-bottom: 1px solid $col-main;
	justify-content: space-between;
	align-items: center;
	.ssl_Sel{
		width: 104rpx;
		height: 100%;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
		text-align: center;
		line-height: 36px;
		color: $col-333;
		font-weight:bold;
	}
	.onSel{
		background-color: $col-main;
		color: $col-fff;
	}
}
</style>
