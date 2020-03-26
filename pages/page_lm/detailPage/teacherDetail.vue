<template>
	<view class="td_app fx pfAllScreen">
		<hb title="教师详情" bgInherit='true'></hb> 
		<scroll-view scroll-y="true" class="td_scro">
			<view class="td_main fx">
				<view class="td_image">
					<image :src="teacherDetail&&teacherDetail.teacherImage" mode=""></image>
				</view>
				<view class="td_right">
					<view class="td_p1 td_title1">{{teacherDetail.teacherName}}</view>
					<view class="td_p1 td_title2" @tap="topSkip">{{teacherDetail.organizationName}}</view>
					<view class="td_p1 ellipsis">教学年龄：{{teacherDetail.teacherAge}}年</view>
					<view class="td_p1 ellipsis">毕业院校：{{teacherDetail.teacherSchool}}</view>
					<view class="td_p1 ellipsis">擅长科目：{{teacherDetail.teacherAdept}}</view>
				</view>
			</view>
			<view class="td_jsjy">
				<text class="td_aaa">教师寄语：</text>
				{{teacherDetail.teacherIntro}}</view>
			<view class="td_jxjl">教学经历</view>
			<view style='margin-top: 20rpx;padding:0 30rpx;line-height:26px;' 
				v-html="teacherDetail.teacherMessage"></view>
		</scroll-view>
		<bottomBtn @clickRight="clickRight" @clickLeft="clickAttention" :isOrder="isOrder" type="teacher"
			:rightTitle="isOrder?'已预约':'预约教师'" isShowBtn="isShowBtn" :isAtten="isAtten"></bottomBtn>
	</view>
</template>

<script>
import hb from '../../../components/components_lm/detailPage/headBack.vue'
import bottomBtn from '../../../components/components_lm/detailPage/bottomBtn.vue'
export default {
	components:{hb,bottomBtn},
	data() {
		return {
			userInfo:null, //用户信息
			teacherDetail:null,   //教师信息
			isOrder:true,  //是否预约教师
			isAtten:true,  //是否关注教师
		}
	},
	onLoad(e) {
		let ui = this.getItemSync('userInfo');
		this.userInfo = ui
		this.getTeacher(e.id);
		if(ui){
			uni.$on('updateOrderTeac', this.orderTeac);
			this.setchIsAtten(e.id);
			this.seachIsOrder(e.id);
		}
	},
	methods: {
		//进入学校
		topSkip(){
			this.push({url:'/pages/page_lm/detailPage/schoolDetail?id='+this.teacherDetail.teacherSchoolId})
		},
		
		//获取教师详情
		getTeacher(id){
			let url = 'teacher/byid.do'
			this.fetch({url,data:{userid:id},method:'post'},1).then(res=>{
				this.teacherDetail = res[1].data[0];
			})
		},
		
		//查询是否关注
		setchIsAtten(teacherid){
			let url = 'addTeacher/findByfollow.do';
			this.fetch({url,data:{userid:this.userInfo.user.id,teacherid},method:'post'},5).then(res=>{
				this.isAtten = res[1].data.success
			})
		},

		//查询是否预约
		seachIsOrder(teacherid){
			let url = 'appointment/select.do';
			let data = {userid:this.userInfo.user.id,teacherid};
			this.fetch({url,data,method:'post'},5).then(res=>{
				this.isOrder = res[1].data
			})
		},
		
		//加关注
		clickAttention(){
			let teacherid = this.teacherDetail.id;
			let ui = this.userInfo;
			if(this.isAtten) return
			if(!ui){
				this.message('请登录')
				return
			}
			let url = 'addTeacher/add.do'
			this.fetch({url,data:{userid:ui.user.id,teacherid},method:'post'},5).then(res=>{
				this.isAtten = res[1].data;
			})
		},
		
		//点击预约
		clickRight(){
			let {teacherDetail,isOrder,userInfo} = this
			let {id,teacherSchoolId} = teacherDetail;
			if(isOrder)return 
			if(!userInfo){
				this.message('请登录')
				return
			}
			let url = '/pages/page_lm/detailPage/appointment?id='+id+'&schoolId='+teacherSchoolId+'&type=2'
			this.push({url})
		},
		
		//关注成功
		orderTeac(boo){
			this.isOrder = boo;
		}
	}
}
</script>

<style scoped lang="scss">
.td_app{
	flex-direction: column;
	.td_scro{
		flex: 1;
		overflow: hidden;
		.td_main{
			padding:28rpx 30rpx;
			// align-items: center;
			.td_image{
				width: 272rpx;
				height: 348rpx;
				border:2rpx $col-e5 dashed;
				background-color: $col-f5;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.td_right{
				flex: 1;
				padding-left: 30rpx;
				.td_p1{
					width: 380rpx;
					margin-top: 15px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.td_title1{
					margin-top: 0;
					font-size: 18px;
					color: $col-333;
					font-weight: bold;
				}
				.td_title2{
					font-size: 16px;
					color: $col-main;
					font-weight: bold;
				}
				.ellipsis{
					font-size: 16px;
					color: $col-666;
				}
			}
		}
		.td_jsjy{
			width: 100%;
			padding: 0 30rpx;
			line-height:26px;
			color:$col-666;
			.td_aaa{
				color: $col-333;
				font-weight: bold;
			}
		}
		.td_jxjl{
			padding:23px 30rpx;
			padding-bottom: 0;
			font-size: 18px; 
			color:$col-333;
			font-weight: bold;
		}
	}
}
</style>
