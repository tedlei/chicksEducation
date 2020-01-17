<template>
	<view class="td_app fx pfAllScreen">
		<HeadPage @topSkip="topSkip" title="进入学校"></HeadPage>
		<scroll-view scroll-y="true" class="td_scro">
			<topImage :image='teacherDetail&&teacherDetail.teacherImage'></topImage>
			<view class="td_main" v-if="teacherDetail">
				<view class="td_curr_name fx">
					<view class="tdName ellipsis">{{teacherDetail.teacherName}}</view>
					<text class="iconfont" :class="isAtten?'iconColor':''" 
						@tap="clickAttention(userInfo.user.id,teacherDetail.id)">{{isAtten?'&#xe63b;':'&#xe61f;'}}</text>
				</view>
				<view class="td_text">
					<view class="td_t1 bold ellipsis">{{teacherDetail.organizationName}}</view>
					<view class="td_t1 ellipsis">教学年龄：{{teacherDetail.teacherAge}}年</view>
					<view class="td_t1 ellipsis">毕业院校：{{teacherDetail.teacherSchool}}</view>
					<view class="td_t1 ellipsis">擅长科目：{{teacherDetail.teacherAdept}}</view>
					<view class="td_t1 linh22">教师寄语：{{teacherDetail.teacherIntro}}</view>
					<view class="td_t1 bold mar40 ellipsis">{{teacherDetail.organizationName}}</view>
					<view style='margin-top: 20rpx;' v-html="teacherDetail.teacherMessage"></view>
				</view>
			</view>
		</scroll-view>
		<bottomBtn @clickRight="clickRight" :isOrder="isOrder" type="teacher"
			:rightTitle="isOrder?'已预约':'预约教师'"></bottomBtn>
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
			userInfo:null, //用户信息
			teacherDetail:null,   //教师信息
			isOrder:false,  //是否预约教师
			isAtten:false,  //是否关注教师
		}
	},
	onLoad(e) {
		let ui = this.getItemSync('userInfo');
		this.userInfo = ui
		this.getTeacher(e.id);
		if(ui){
			this.once('updateOrderTeac','orderTeac')
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
				this.setchIsAtten(id);
				this.seachIsOrder(id);
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
		clickAttention(userid,teacherid){
			let url = 'addTeacher/add.do'
			this.fetch({url,data:{userid,teacherid},method:'post'},5).then(res=>{
				this.isAtten = res[1].data;
			})
		},
		
		//点击预约
		clickRight(){
			let {teacherDetail,isOrder,userInfo} = this
			let {id,teacherSchoolId} = teacherDetail;
			if(isOrder)return 
			if(!userInfo){
				this.message('请登录后在预约课程')
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
			background-color: $col-fff;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			.td_curr_name{
				padding: 0 20px 0 15px;
				height: 100rpx;
				justify-content: space-between;
				align-items: center;
				.tdName{
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
			.td_text{
				padding:0 30rpx;
				.td_t1{
					margin-top: 26rpx;
					color: $col-333;
				}
				.bold{
					margin-top: 0;
					font-weight: bold;
				}
				.linh22{
					line-height: 46rpx;
				}
				.mar40{
					margin-top: 40rpx;
				}
			}
		}
	}
}
</style>
