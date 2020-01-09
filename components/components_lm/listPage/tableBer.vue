<template>
	<view class="tb_app fx">
		<view class="tb_option fx" v-for="(item,i) of selectList" :key="i" @tap="topSel(i)">
			<text>{{item}}</text>
			<view class="tb_select" v-if="i===(!settingNum&&settingNum!==0?0:settingNum)"></view>
		</view>
	</view>
</template>

<script>
export default {
	props:['settingNum'],
	data() {
		return {
			selectList:['综合','课程','学校','教师','资讯'],
		}
	},
	methods: {
		//点击时
		topSel(num){
			this.$emit('onSelect',num);
		},
		
	}
}
</script>

<style scoped lang="scss">
.tb_app{
	width: 100%;
	height: 64rpx;
	background-color: $col-main;
	justify-content: space-between;
	.tb_option{
		height: 54rpx;
		padding:0 30rpx;
		font-size: 32rpx;
		color: $col-fff;
		flex-direction: column;
		justify-content: space-between;
		.tb_select{
			width: 100%;
			height: 6rpx;
			border-radius: 3rpx;
			background-color: $col-fff;
		}
	}
}
</style>
