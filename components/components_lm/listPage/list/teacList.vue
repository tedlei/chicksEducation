<template>
<<<<<<< HEAD
	<view class="cuList_app fx active">
		<view class="clImg">
			<image :src="item.teacherImage||require('../../../../static/image/default.png')" mode=""></image>
		</view>
		<view class="clRight">
			<view class="clName n1" v-html="item.teacherName"></view>
			<view class="clName n2">{{item.organizationName}}</view>
			<view class="clName n3">教学年龄：{{item.teacherAge}}年</view>
			<view class="clName n3">擅长科目：{{item.teacherAdept}}</view>
			<view class="clName n3">教学经历：{{item.teacherIntro}}</view>
=======
	<view class="cuList_app fx active">
		<view class="clImg">
			<image :src="item.teacherImage||require('../../../../static/image/default.png')" mode=""></image>
		</view>
		<view class="clRight">
			<view class="clName n1" v-html="item.teacherName"></view>
			<view class="clName n2">{{item.organizationName}}</view>
			<view class="clName n3">教学年龄：{{item.teacherAge}}年</view>
			<view class="clName n3">擅长科目：{{item.teacherAdept}}</view>
			<view class="clName n3">教学经历：{{item.teacherIntro}}</view>
>>>>>>> 2de0f37acc56a0973e9542f1f203a67643853d80
		</view>
	</view>
</template>

<script>
<<<<<<< HEAD
export default {
	props:['item'],
	data() {
		return {
=======
export default {
	props:['item'],
	data() {
		return {
>>>>>>> 2de0f37acc56a0973e9542f1f203a67643853d80
			
		}
	},
	methods: {
	}
}
</script>

<<<<<<< HEAD
<style scoped lang="scss">
.cuList_app{
	width: 100%;
	margin-top: 5px;
	padding: 5px 30rpx;
	border-bottom: 2rpx solid $col-e5;
	.clImg{
		width: 270rpx;
		height: 346rpx;
		border-radius: 10rpx;
		background-color: #000;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.clRight{
		flex: 1;
		padding-left: 30rpx;
		.clName{
			margin-top: 10px;
			width: 386rpx;
			color: $col-333;
			font-size: 28rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.n1{
			margin-top: 7px;
			font-size: 36rpx;
			font-weight: 600;
		}
		.n2{
			margin-top: 20px;
		}
		.n3{
			margin-top: 13px;
		}
	}
=======
<style scoped lang="scss">
.cuList_app{
	width: 100%;
	margin-top: 5px;
	padding: 5px 30rpx;
	border-bottom: 2rpx solid $col-e5;
	.clImg{
		width: 270rpx;
		height: 346rpx;
		border-radius: 10rpx;
		background-color: #000;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.clRight{
		flex: 1;
		padding-left: 30rpx;
		.clName{
			margin-top: 10px;
			width: 386rpx;
			color: $col-333;
			font-size: 28rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.n1{
			margin-top: 7px;
			font-size: 36rpx;
			font-weight: 600;
		}
		.n2{
			margin-top: 20px;
		}
		.n3{
			margin-top: 13px;
		}
	}
>>>>>>> 2de0f37acc56a0973e9542f1f203a67643853d80
}
</style>
