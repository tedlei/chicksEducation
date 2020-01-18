<template>
	<view class="cd_app" :class="item.isUniversal==='2'?'cd_zy1':''">
		<view class="cd_price pt30">优惠券 {{item.couponPrice}}元</view>
		<view class="cd_price t1">{{showPic(item)}}</view>
		<view class="cd_price t1">有效日期至：{{item.createTime.split(' ')[0]}}</view>
		<view class="cd_price t1 ellipsis">{{item.schoolName}}</view>
		<view class="cd_btn" @tap="clickUse(item)">立即使用</view>
	</view>
</template>

<script>
export default {
	props:['item'],
	data() {
		return {
			isDraw:false,  //是否领取
			// item:{},
		}
	},
	methods: {
		//显示背景图片
		showBgImg(type){
			if(type==='2'){
				return 'cd_zy1'
			}
		},
		//显示使用条件
		showPic(item){
			console.log(item,123456)
			if(item.courseId){
				return '仅用于课程：'+item.courseName
			}else{
				if(item.useReRule==='0') return '无门槛使用'
				else return '满'+item.useReRule+'元使用'
			}
		},
		
		//点击使用时
		clickUse(item){
			this.$emit('clickUse',item);
		}
	}
}
</script>

<style scoped lang="scss">
.cd_app{
	width: 336rpx;
	// height: 208rpx;
	margin-left: 26rpx;
	margin-top: 20rpx;
	padding:0 10rpx;
	padding-bottom: 16rpx;
	border-radius: 5px;
	background-image: url('~@/static/image/coupon/ty1.png');
	background-size: 100% 100%;
	color:$col-fff;
	text-align: center;
	.cd_price{
		font-size: 30rpx;
		font-weight: bold;
		text-align: center;
		// line-height: 49rpx;
	}
	.pt30{
		padding-top: 14rpx;
	}
	.t1{
		font-size: 10px;
		line-height: 30rpx;
		font-weight: normal;
	}
	.cd_btn{
		height: 40rpx;
		margin-top: 10rpx;
		padding:0 15px;
		display: inline-block;
		border-radius: 20rpx;
		background-color: $col-fff;
		text-align: center;
		line-height: 40rpx;
		font-size: 12px;
		color:$col-main
	}
}
.cd_zy1{
	background-image: url('~@/static/image/coupon/zy1.png');
	color: $col-main;
	.cd_btn{
		background-color: $col-main;
		color: $col-fff;
	}
}
</style>
