<template>
	<view class="cpl_app">
		<view class="cpl_text fx">
			<text>优惠卷</text>
			<view @tap="clickOpen">{{!openType?'展开':'收起'}}</view>
		</view>
		<view class="cpl_list fx">
			<template v-for="(item,i) of closeList">
				<coupond :key="i" :item="item" :isFinally='ones(closeList,i)' :schoolIsAttention="schoolIsAttention"
				 :userId="userId"	:class="ones(closeList,i)?'width100':''"></coupond>
			</template>
			<view style="width: 100%;height: 20rpx;" v-if="openType"></view>
		</view>
	</view>
</template>

<script>
import coupond from './couponDetail.vue'
export default {
	components:{coupond},
	props:['schoolId','schoolIsAttention','userId'],
	data() {
		return {
			openType:false,  //true：展开   false： 关闭
			closeList:[],   //优惠卷关闭时列表
			couponList:[]  //优惠卷列表 
			/*
			couponNumber: 1    //优惠卷剩余数量
			couponPrice: 100   //优惠价格
			createTime: "2020-01-15 10:10:37"   //有效期
			id: "15465464"     //id
			isUniversal: "1"     //1：通用   2：专用
			*/
		}
	},
	created() {
		this.getCoupon(this.schoolId)
	},
	methods: {
		//展开、关闭
		clickOpen(){
			this.openType = !this.openType;
			this.closeyhj(this.openType);
			this.$emit('clickOpen',this.openType);
		},
		
		//追后一个时单还是双
		ones(item,i){
			let num = item.length;
			if(num%2!==0&&num===(i+1)) return true;
			return false;
		},
		
		//获取优惠卷列表
		getCoupon(schoolId){
			let url = 'coup/findByCoupon.do';
			this.fetch({url,data:{schoolId},method:'get'},4).then(res=>{
				this.couponList = res[1].data;
				this.closeyhj();
			})
		},
		
		//关闭优惠卷时
		closeyhj(couponOpen){
			let couponList = this.couponList;
			if(couponOpen){
				this.closeList = couponList;
			}else{
				if(couponList.length%2===0){
					this.closeList = couponList.slice(-2);
				}else{
					this.closeList = couponList.slice(-1);
				}
			}
		},
	}
}
</script>

<style scoped lang="scss">
.cpl_app{
	width: 750rpx;
	padding:0 30rpx;
	padding-top: 22rpx;
	.cpl_text{
		justify-content: space-between;
		align-items: center;
		color: $col-333;
		text{
			font-weight: bold;
		}
		view{
			width: 70rpx;
			height: 40rpx;
			text-align: center;
			line-height: 40rpx;
			font-size: 12px;
		}
	}
	.cpl_list{
		width: 100%;
		flex-wrap: wrap;
		justify-content: space-between;
		.width100{
			width: 100%;
		}
	}
}
</style>
