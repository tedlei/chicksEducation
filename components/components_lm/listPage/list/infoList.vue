<template>
<<<<<<< HEAD
	<view class="il_app active">
		<view class="il_name ellipsis">{{item.schoolTopic}}</view>
		<view class="il_date fx">
			<view class="il_fbz ellipsis">发布者：<text>{{item.schoolAuthor}}</text></view>
			<text class="il_text">{{date(item)}}</text>
=======
	<view class="il_app active">
		<view class="il_name ellipsis">{{item.schoolTopic}}</view>
		<view class="il_date fx">
			<view class="il_fbz ellipsis">发布者：<text>{{item.schoolAuthor}}</text></view>
			<text class="il_text">{{date(item)}}</text>
>>>>>>> 2de0f37acc56a0973e9542f1f203a67643853d80
		</view>
	</view>
</template>

<script>
<<<<<<< HEAD
export default {
=======
export default {
>>>>>>> 2de0f37acc56a0973e9542f1f203a67643853d80
	props:['item'],
	data() {
		return {
		}
	},
<<<<<<< HEAD
	methods: {
		//处理时间
		date(item){
			return item.schoolTime.split(' ')[0];
=======
	methods: {
		//处理时间
		date(item){
			return item.schoolTime.split(' ')[0];
>>>>>>> 2de0f37acc56a0973e9542f1f203a67643853d80
		}
	}
}
</script>

<<<<<<< HEAD
<style scoped lang="scss">
.il_app{
	width: 100%;
	height: 60px;
	padding:0 30rpx;
	border-bottom: 1px solid $col-f5;
	.il_name{
		margin-top: 6px;
		font-weight:bold;
		color:$col-333;
	}
	.il_date{
		margin-top: 7px;
		align-items: center;
		font-size: 12px;
		color:$col-999;
		.il_fbz{
			width: 300rpx;
		}
		.il_text{
			margin-left: 60rpx;
		}
	}
=======
<style scoped lang="scss">
.il_app{
	width: 100%;
	height: 60px;
	padding:0 30rpx;
	border-bottom: 1px solid $col-f5;
	.il_name{
		margin-top: 6px;
		font-weight:bold;
		color:$col-333;
	}
	.il_date{
		margin-top: 7px;
		align-items: center;
		font-size: 12px;
		color:$col-999;
		.il_fbz{
			width: 300rpx;
		}
		.il_text{
			margin-left: 60rpx;
		}
	}
>>>>>>> 2de0f37acc56a0973e9542f1f203a67643853d80
}
</style>
