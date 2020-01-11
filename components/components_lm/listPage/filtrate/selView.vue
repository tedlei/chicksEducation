<template>
	<view class="sv_app ellipsis" :class="selNum===t?'selBgColor':''" @tap="clickSel(t,val)">
		<image v-if="selNum===t" :src="require('../../../../static/image/errIcon.png')"></image>
		<text>{{val}}</text>
	</view>
</template>

<script>
export default {
	props:['val','selNum','t'],
	data() {
		return {
		}
	},
	methods: {
		//点击选择时
		clickSel(t,val){
			this.$emit('clickSel',t,val);
		}
	}
}
</script>

<style scoped lang="scss">
.sv_app{
	width:150rpx;
	height:60rpx;
	padding:0 6rpx;
	background:$col-fff;
	border-radius:10rpx;
	font-size: 14px;
	color: $col-333;
	text-align: center;
	line-height: 60rpx;
	position: relative;
	image{
		width: 8px;
		height: 8px;
		position: absolute;
		top: 2px;
		right: 2px;
	}
}
.selBgColor{
	color: $col-main;
	background-color: #FFEBD8;
}
</style>
