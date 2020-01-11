<template>
	<view class="il_app active">
		<view class="il_name ellipsis">{{item.schoolTopic}}</view>
		<view class="il_date fx">
			<view class="il_fbz ellipsis">发布者：<text>{{item.schoolAuthor}}</text></view>
			<text class="il_text">{{date(item)}}</text>
		</view>
	</view>
</template>

<script>
export default {
	props:['item'],
	data() {
		return {
		}
	},
	methods: {
		//处理时间
		date(item){
			return item.schoolTime.split(' ')[0];
		}
	}
}
</script>

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
}
</style>
