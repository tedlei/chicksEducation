<template>
	<view class="cuList_app fx active">
		<view class="clImg">
			<image :src="require('../../../../static/image/default.png')" mode=""></image>
		</view>
		<view class="clRight">
			<view class="clName n1" v-html="item.courseName"></view>
			<view class="clName n2">上课时间：{{item.courseTime}}</view>
			<view class="clName">
				上课地址：{{site(item)}}
			</view>
			<view class="clName n3">
				课程价格：
				{{price(item)?'￥':''}}
				<text v-if="price(item)">{{item.coursePrice}}</text>
				{{price(item)?'元':'预约后展示'}}
			</view>
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
		//显示地址
		site(item){
			if(!item) return
			let {courseOneAddress,courseTwoAddress,courseThreeAddress,courseAddress} = item;
			let str = (courseOneAddress===courseTwoAddress?courseOneAddress:courseOneAddress+courseTwoAddress)
				+courseThreeAddress+courseAddress
			return str;
		},
		
		//显示价格
		price(item){
			return item.courseCategory!=='0'||item.courseHidePrice==='0';
		}
	}
}
</script>

<style scoped lang="scss">
.cuList_app{
	width: 100%;
	margin-top: 5px;
	padding: 5px 30rpx;
	border-bottom: 2rpx solid $col-e5;
	.clImg{
		width: 270rpx;
		height: 112px;
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
			margin-top: 3px;
			font-size: 36rpx;
			font-weight: 600;
		}
		.n2{
			margin-top: 10px;
		}
		.n3{
			color: $col-main;
			text{
				font-weight: 600;
			}
		}
	}
}
</style>
