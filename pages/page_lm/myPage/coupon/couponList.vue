<template>
	<view class="cl_app fx pfAllScreen">
		<hb :title="isUseCoupon?'使用卡券':'卡券'"></hb>
		<view class="cl_kj fx">
			<couponSel :selNum="selNum" @clickNum="clickNum"></couponSel>
			<scroll-view scroll-y="true" class="cl_scro">
				<view class="cl_mian fx" v-if="couponList.length>0">
					<couponDetail v-for="(item,i) of couponList" :key='i' @clickUse="clickUse"
						:item="item"></couponDetail>
				</view>
				<view class="cl_zw" v-else >暂无优惠卷，请前往学校领取</view>
			</scroll-view>
			<view class="cl_use" v-if="isUseCoupon">
				<view class="cl_code">
					<tkiQrcode :size="600" :val="useCode" :onval="true" :loadMake="true"
						></tkiQrcode>
				</view>
				<view class="cl_numCode">{{useCode}}</view>
			</view>
		</view>
	</view>
</template>

<script>
import hb from '../../../../components/components_lm/detailPage/headBack.vue'
import couponSel from '../../../../components/components_lm/myPage/coupon/couponSel.vue'
import couponDetail from '../../../../components/components_lm/myPage/coupon/couponDetail.vue'
import tkiQrcode from '../../../../components/tki-qrcode/tki-qrcode.vue'
export default {
	components:{hb,couponSel,couponDetail,tkiQrcode},
	data() {
		return {
			selNum:2,
			userinfo:null,   //用户数据
			couponList:[],   //优惠卷列表
			isUseCoupon:false,   //是否使用优惠卷
			useCode:'',   //使用码
		}
	},
	created() {
		this.userinfo =this.getItemSync('userInfo');
		this.getCouponList();
	},
	methods: {
		//点击时
		clickNum(num){
			this.couponList=[];
			this.selNum = num;
			this.getCouponList()
		},
		
		//获取优惠卷列表
		getCouponList(){
			let url = 'userCoupon/findByUserCoupon.do';
			let data = {
				userId:this.userinfo.user.id,
				status:''+this.selNum
			}
			this.fetch({url,data,method:'post'},2).then(res=>{
				this.couponList = res[1].data;
			})
		},
		
		//点击使用时
		clickUse(item){
			this.useCode = item.id;
			this.isUseCoupon = true;
		}
	},
	//监听页面返回
	onBackPress(){
		if(this.isUseCoupon){
			this.isUseCoupon = false;
			this.useCode = '';
			return true;
		}
		return false
	}
}
</script>

<style scoped lang="scss">
.cl_app{
	flex-direction: column;
	.cl_kj{
		flex: 1;
		flex-direction:column;
		position: relative;
		.cl_scro{
			flex: 1;
			overflow: hidden;
			.cl_mian{
				flex-wrap: wrap;
			}
			.cl_zw{
				height: 300rpx;
				padding:0 30rpx;
				text-align: center;
				line-height: 300rpx;
				font-size: 22px;
				color:$col-e5;
			}
		}
		.cl_use{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: $col-fff;
			.cl_code{
				width: 600rpx;
				height: 600rpx;
				margin:60rpx auto;
				background-color: $col-fff;
			}
			.cl_numCode{
				width: 600rpx;
				margin: 120rpx auto;
				margin-bottom: 0;
				font-size: 40px;
				color: $col-333;
				text-align: center;
				font-weight: bold;
				letter-spacing:24rpx;
			}
		}
	}
	
	
}
</style>
