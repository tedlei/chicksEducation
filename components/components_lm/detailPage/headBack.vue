<template>
	<view class="hb_app fx" :class="bgInherit?'bgnone':''">
		<view class="hb_btn" @tap="clickBack">
			<text class="iconfont">&#xe651;</text>
		</view>
		<text class="hb_font">{{title}}</text>
		<view style="width: 100rpx;"></view>
	</view>
</template>

<script>
export default {
	props:['title','bgInherit'],
	data() {
		return {
		}
	},
	methods: {
		clickBack(){
			this.pop();
		}
	}
}
</script>

<style scoped lang="scss">
.hb_app{
	padding:56rpx 22rpx;
	padding-bottom: 22rpx;
	background-color: $col-main;
	justify-content: space-between;
	align-items: center;
	.hb_btn{
		width: 100rpx;
		font-size: 18px;
		color: $col-fff;
	}
	.hb_font{
		font-size: 18px;
		color:$col-fff
	}
}
.bgnone{
	background-color: rgba(0,0,0,0);
}
</style>
