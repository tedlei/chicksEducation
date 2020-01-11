<template>
<<<<<<< HEAD
	<view class="sv_app ellipsis" :class="selNum===t?'selBgColor':''" @tap="clickSel(t,val)">
		<image v-if="selNum===t" :src="require('../../../../static/image/errIcon.png')"></image>
=======
	<view class="sv_app ellipsis" :class="selNum===t?'selBgColor':''" @tap="clickSel(t,val)">
		<image v-if="selNum===t" :src="require('../../../../static/image/errIcon.png')"></image>
>>>>>>> 2de0f37acc56a0973e9542f1f203a67643853d80
		<text>{{val}}</text>
	</view>
</template>

<script>
<<<<<<< HEAD
export default {
=======
export default {
>>>>>>> 2de0f37acc56a0973e9542f1f203a67643853d80
	props:['val','selNum','t'],
	data() {
		return {
		}
	},
<<<<<<< HEAD
	methods: {
		//点击选择时
		clickSel(t,val){
			this.$emit('clickSel',t,val);
=======
	methods: {
		//点击选择时
		clickSel(t,val){
			this.$emit('clickSel',t,val);
>>>>>>> 2de0f37acc56a0973e9542f1f203a67643853d80
		}
	}
}
</script>

<<<<<<< HEAD
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
=======
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
>>>>>>> 2de0f37acc56a0973e9542f1f203a67643853d80
}
</style>
