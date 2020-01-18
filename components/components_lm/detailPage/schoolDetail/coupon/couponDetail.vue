<template>
	<view class="cd_app" 
		:class="item.isUniversal==='2'?(isFinally?'cd_zy2 width100':'cd_zy1'):(isFinally?'cd_ty2 width100':'')">
		<view class="cd_name" v-if="!isFinally">{{item.isUniversal==='1'?'通用':'专用'}}优惠券</view>
		<view class="cd_price" :class="isFinally?'pricePt':''">
			{{item.couponPrice}}元
			<text class="cd_yhj" v-if="isFinally">{{item.isUniversal==='1'?'通用':'专用'}}优惠券</text>
		</view>
		<view class="cd_price t1">{{showPic(item)}}</view>
		<view class="cd_price t2">有效日期至：{{item.createTime.split(' ')[0]}}</view>
		<view class="cd_btn" @tap="clickDraw(item,userId,isDraw,schoolIsAttention)">
			{{isDraw?'已领取':down(item,schoolIsAttention)}}
		</view>
	</view>
</template>

<script>
export default {
	props:['item','isFinally','schoolIsAttention','userId'],
	data() {
		return {
			isDraw:false,  //是否领取
		}
	},
	created() {
		this.seachIsDraw(this.item.id,this.userId);
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
			if(item.courseId){
				return '仅用于课程：'+item.courseName
			}else{
				if(item.useReRule==='0') return '无门槛使用'
				else return '满'+item.useReRule+'元使用'
			}
		},
		
		//领取显示
		down(item,boo){
			let isFollow = item.isFollow;
			if(isFollow==='0') return '立即领取'
			if(boo) return '立即领取'
			else return '请关注后在领取'
		},
		
		//领取优惠卷
		clickDraw(item,userId,isDraw,schoolIsAttention){
			let {id,isFollow} = item;
			let url = 'coup/receive.do'
			if(isDraw)return
			if(isFollow==='1'&&!schoolIsAttention){
				this.message('请在关注后领取优惠卷')
				return
			}
			this.fetch({url,data:{couponId:id,userId},method:'post'},4).then(res=>{
				let {message,success} = res[1].data;
				this.message(message);
				this.isDraw = success;
			})
		},
		
		//查看是否领取
		seachIsDraw(couponId,userId){
			let url = 'coup/isReceive.do'
			let data = {couponId,userId}
			this.fetch({url,data,method:'post'},4).then(res=>{
				this.isDraw = res[1].data;
			})
		}
	}
}
</script>

<style scoped lang="scss">
.cd_app{
	width: 336rpx;
	height: 228rpx;
	margin-top: 20rpx;
	border-radius: 5px;
	background-image: url('~@/static/image/coupon/ty1.png');
	background-size: 100% 100%;
	color:$col-fff;
	text-align: center;
	.cd_name{
		padding-top: 5px;
		padding-left: 7px;
		font-size: 12px;
	}
	.cd_price{
		// margin-top: 10rpx;
		font-size: 40rpx;
		font-weight: bold;
		text-align: center;
		line-height: 49rpx;
		.cd_yhj{
			margin-left: 15px;
		}
	}
	.pricePt{
		padding:20rpx 0;
	}
	.t1,.t2{
		font-size: 10px;
		line-height: 39rpx;
		font-weight: normal;
	}
	.cd_btn{
		height: 30rpx;
		padding:0 10px;
		display: inline-block;
		border-radius: 15rpx;
		background-color: $col-fff;
		text-align: center;
		line-height: 30rpx;
		font-size: 8px;
		color:$col-main
	}
}
.width100{
	width: 100%;
}
.cd_ty2{
	background-image: url('~@/static/image/coupon/ty2.png');
}
.cd_zy1{
	background-image: url('~@/static/image/coupon/zy1.png');
	color: $col-main;
	.cd_btn{
		background-color: $col-main;
		color: $col-fff;
	}
}
.cd_zy2{
	background-image: url('~@/static/image/coupon/zy2.png');
	color: $col-main;
	.cd_btn{
		background-color: $col-main;
		color: $col-fff;
	}
}
</style>
