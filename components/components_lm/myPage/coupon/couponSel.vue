<template>
	<view class="cs_app fx">
		<view class="cs_text" v-for="(item,i) of textList" :key="i" @tap="clickNum(i+1)"
			:class="selNum===(i+1)?'textColor':''">{{item}}</view>
	</view>
</template>

<script>
export default {
	props:['selNum'],
	data() {
		return {
			textList:['通用卷','学校专用卷'],
		}
	},
	methods: {
		//点击时
		clickNum(num){
			this.$emit('clickNum',num);
		}
	}
}
</script>

<style scoped lang="scss">
.cs_app{
	padding:0 28rpx;
	border-bottom: 1px solid $col-e5;
	align-items: center;
	.cs_text{
		padding:14rpx 0;
		font-size: 18px;
		color:$col-333;
	}
	.cs_text+.cs_text{
		margin-left: 56rpx;
	}
	.textColor{
		font-weight: bold;
		color: $col-main;
	}
}
</style>
