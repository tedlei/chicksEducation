<template>
	<view class="cd_app fx pfAllScreen">
		<HeadPage @topSkip="topSkip" title="进入学校"></HeadPage>
		<scroll-view scroll-y="true" class="cd_scro">
			<topImage></topImage>
			<view class="cd_main" v-if="currDetail">
				<view class="cd_curr_name fx">
					<view class="cdName ellipsis">{{currDetail.courseName}}</view>
					<text class="iconfont" :class="isAttention?'iconColor':''"
					 @tap="clickAttention">{{isAttention?'&#xe63b;':'&#xe61f;'}}</text>
				</view>
				<view class="cd_ul schStyle ellipsis">{{currDetail.organizationName}}</view>
				<view class="cd_ul ellipsis">课程价格：{{currDetail.coursePrice}}</view>
				<view class="cd_ul ellipsis">上课时间：{{currDetail.courseTime}}</view>
				<view class="cd_ul ellipsis">学习周期：{{currDetail.coursePeriod}}</view>
				<view class="cd_ul ellipsis">课程等级：{{currDetail.courseGrade}}</view>
				<view class="cd_ul siteStyle ellipsis active" @tap="clickSite(site(currDetail))">上课地址：{{site(currDetail)}}</view>
				<view class="cd_ul pd22 schStyle ellipsis">教学目标</view>
				<view class="cd_ul pl20">{{currDetail.courseTarget}}</view>
				<view class="cd_ul pd22 schStyle ellipsis">课程介绍</view>
				<view class="cd_ul referral" v-html="currDetail.courseContent"></view>
			</view>
		</scroll-view>
		<bottomBtn @clickLeft="clickLeft" @clickRight="clickRight" 
			leftTitle="在线咨询" :isOrder="isOrder" :rightTitle="(isOrder?'已':'课程')+'预约'"></bottomBtn>
	</view>
</template>

<script>
import HeadPage from '../../../components/components_lm/detailPage/headPage.vue'
import topImage from '../../../components/components_lm/detailPage/topImage.vue'
import bottomBtn from '../../../components/components_lm/detailPage/bottomBtn.vue'
export default {
	components:{HeadPage,topImage,bottomBtn},
	data() {
		return {
			currDetail:null,  //课程数据
			isOrder:false,    //true:已预约    false:未预约
			isAttention:false,  //true：已关注  false ：未关注
			isLoadFinish:false,   //是否加载完成
			userInfo:null,  //用户数据
		}
	},
	onLoad(e) {
		let ui = this.getItemSync('userInfo');
		this.userInfo = ui
		this.getCurrDetail(e.id);
		if(ui){
			uni.$on('updateOrderCurr', this.orderCurr);
			this.getIsOrder(e.id);
			this.getIsAttention(e.id);
		}
	},
	methods: {
		//获取课程列表
		getCurrDetail(id){
			let url = 'curri/findById.do';
			let data = {sourceType:'1',id}
			this.fetch({url,data,method:'get'},1).then(res=>{
				this.currDetail = res[1].data[0];
				this.isLoadFinish = true;
			})
		},
		
		//获取课程地址
		site(item){
			let {courseOneAddress,courseTwoAddress,courseThreeAddress,courseAddress} = item;
			let str = courseOneAddress+(courseOneAddress===courseTwoAddress?'':courseTwoAddress)+courseThreeAddress+courseAddress
			return str;
		},
		
		//查询是否预约
		getIsOrder(id){
			let userId = this.userInfo.user.id;
			let url = "course/findByAppOin.do";
			let data = {userId,curseId:id};
			this.fetch({url,data,method:'get',},3).then(res=>{
				this.isOrder = res[1].data;
			})		
		},
		//查询课程是否关注
		getIsAttention(curseid){
			let userid = this.userInfo.user.id;
			let url = "course/findByFollow.do";
			let data = {userid,curseid}
			this.fetch({url,data,method:'get',},3).then(res=>{
				this.isAttention = res[1].data.success;
			})
		},
		
		//当点击地址时
		clickSite(site){
			this.push({url:'/pages/page_lm/map/map?location='+site})
		},
		
		//在线资讯
		clickLeft(){
			let {isLoadFinish,userInfo,currDetail} = this
			if(!isLoadFinish)return 
			if(!userInfo){
				this.message('请登录')
				return
			}
			this.push({url:'/pages/page_lzj/message/chatSchool'},{
				elid:currDetail.schoolId,
				userName:currDetail.organizationName
			})
		},
		
		//课程预约
		clickRight(){
			let {isLoadFinish,currDetail,isOrder,userInfo} = this
			let {id,schoolId} = currDetail;
			if(!isLoadFinish||isOrder)return 
			if(!userInfo){
				this.message('请登录')
				return
			}
			let url = '/pages/page_lm/detailPage/appointment?id='+id+'&schoolId='+schoolId+'&type=1'
			this.push({url})
		},
		
		//预约成功时修改
		orderCurr(boo){
			this.isOrder = boo;
		},
		
		//点击关注时
		clickAttention(){
			let {isLoadFinish,currDetail,isAttention,userInfo} = this
			let id = currDetail.id;
			if(!isLoadFinish||isAttention)return 
			if(!userInfo){
				this.message('请登录')
				return
			}
			let userid = userInfo.user.id;
			let url = "course/follow.do";
			let data={curseId:id,userid};
			this.fetch({url,data,method:'post',},3).then(res=>{
				let {message,success} = res[1].data;
				this.message(message);
				this.isAttention = success;
			})
		},
		
		//点击进入学校
		topSkip(){
			let schoolId = this.currDetail.schoolId;
			this.push({url:'/pages/page_lm/detailPage/schoolDetail?id='+schoolId})
		}
	}
}
</script>

<style scoped lang="scss">
.cd_app{
	flex-direction: column;
	.cd_scro{
		flex: 1;
		overflow: hidden;
		.cd_main{
			width: 750rpx;
			border-radius: 40px;
			background-color: $col-fff;
			position: relative;
			top: -100rpx;
			.cd_curr_name{
				padding: 0 20px 0 15px;
				height: 100rpx;
				justify-content: space-between;
				align-items: center;
				.cdName{
					width: 540rpx;
					font-size: 22px;
					color: $col-333;
				}
				.iconfont{
					font-size: 28px;
				}
				.iconColor{
					color: $col-main;
				}
			}
			.cd_ul{
				width: 100%;
				padding: 9px 30rpx;
				box-sizing: border-box;
				color: $col-333;
			}
			.schStyle{
				font-weight:bold;
			}
			.siteStyle{
				color: $col-main;
			}
			.pd22{
				padding-top: 22px;
			}
			.pl20{
				// text-indent:2em;
				line-height:28px;
			}
		}
	}
}
</style>
