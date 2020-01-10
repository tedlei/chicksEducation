<template>
	<view class="tb_app fx">
		<view class="tb_option fx active" v-for="(item,i) of selectList" :key="i" @tap="topSel(i)">
			<text>{{item}}</text>
			<view class="tb_select" v-if="i===n"></view>
		</view>
	</view>
</template>

<script>
export default {
	props:['settingNum', 'onSelect'],
	data() {
		return {
			n: 0,
			selectList:['综合','课程','学校','教师','资讯'],
		}
	},
	created() {
		this.n = this.settingNum;
	},
	methods: {
		//点击时
		topSel(num){
			this.n = num;
			this.$emit('onSelect',num);
		}
	}
}
</script>

<style scoped lang="scss">
.tb_app{
	width: 100vw;
	height: 32px;
	background-color: $col-main;
	justify-content: space-between;
	.tb_option{
		height: 54rpx;
		padding:0 30rpx;
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
