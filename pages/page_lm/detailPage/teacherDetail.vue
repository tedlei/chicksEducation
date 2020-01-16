<template>
	<view class="td_app fx pfAllScreen">
		<HeadPage @topSkip="topSkip" title="进入学校"></HeadPage>
		<scroll-view scroll-y="true" class="td_scro">
			<topImage ></topImage>
			
			
		</scroll-view>
		<bottomBtn @clickRight="clickRight" :isOrder="isOrder" 
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
			isOrder:false,  
			userInfo:null, //用户信息
			teacherDetail:null,   //教师信息
		}
	},
	onLoad(e) {
		let ui = this.getItemSync('userInfo');
		this.userInfo = ui
		this.getTeacher(e.id);
	},
	methods: {
		//进入学校
		topSkip(){
			console.log('进入学校')
		},
		
		//获取教师详情
		getTeacher(id){
			let url = 'teacher/byid.do'
			this.fetch({url,data:{userid:id},method:'post'},1).then(res=>{
				this.teacherDetail = res[1].data[0];
			})
		},
		
//查询是否关注
		setchIsGz(teacherid){
			if(JSON.stringify(this.userInfo)==="{}") {
				this.isGz = false;
				return
			}
			let userid = this.userInfo.user.id;
			let url = '/addTeacher/findByfollow.do';
			this.fetch({url,data:{userid,teacherid},method:'post'},5).then(res=>{
				this.isGz = res.data.success;
			})
		},

		//查询是否预约
		isYy(teacherid){
			if(JSON.stringify(this.userInfo)==="{}") {
				this.seachIsYy = false;
				return
			}
			let url = '/appointment/select.do';
			let data = {userid:this.userInfo.user.id,teacherid};
			this.fetch({url,data,method:'post'},5).then(res=>{
				this.seachIsYy = res.data;
			})
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
	}
}
</style>
