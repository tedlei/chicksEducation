<template>
	<view class="myatt_app pfAllScreen fx">
		<view class="myattUl fx">
			<view class="myattLi" 
				:class="selectNum===i?'selColoe':''" 
				v-for="(item,i) of selectList" 
				@tap="selNum(i)"
				:key='i'>{{item}}</view>
		</view>
		<scroll-view class="myattScr" scroll-y="true" >
			<view class="myattList fx">
				<myPageCom 
					v-for = "(item,i) of dataList"
					:key='i'
					:selectNum="selectNum" 
					:isgz="isgz" 
					:item = 'item'
					@topCancel = 'topCancel'
					style="margin-top: 22rpx;"></myPageCom>
			</view>
		</scroll-view>
	</view>
</template>

<script>

import myPageCom from '../../../../components/components_lm/myPage/myPageCom.vue'
export default {
	components:{myPageCom},
	data() {
		return {
			selectList:['课程','教师'],
			selectNum:0,
			dataList:[],
			userInfo:null,
			pageNum:1,  //当前页
			pageSize:4   ,//每页数据
			total:0,    //总页数
			isgz:'gz'
		}
	},
	onLoad(e){
		this.isgz = e.type;
		if(e.type==='gz')this.selectList.push('学校')
		this.userInfo = this.getItem('userInfo');
		this.getData()
	},
	methods: {
		//获取数据
		getData(){
			let num = this.selectNum;
			this.dataList = [];
			switch(num){
				case 0 : 
					if(this.isgz==='gz')this.searchKc();
					else this.getTeacherList(0)
				break
				case 1 : 
					if(this.isgz==='gz')this.searchKc(1);
					else this.getTeacherList(1)
				break
				case 2 : this.searchXX(2);
				break
			}
		},
		//获取关注的课程
		searchKc(){
			let userInfo = this.userInfo;
			let pageNum = this.pageNum;
			let pageSize = this.pageSize;
			let data = {userid:userInfo.user.id,pageNum,pageSize}
			let url = '/course/findCourse.do';
			this.fetch({url,data,method:'get'},3).then(res=>{
				let {rows,total} = res[1].data;
				this.dataList = rows;
				this.total = total;
			})
		},
		
		//获取学校关注列表
		searchXX(num){
			let userInfo = this.userInfo
			let pageNum = ''+this.pageNum;
			let pageSize = ''+this.pageSize;
			let url = '/addTeacher/getList.do';
			let data = {userid:userInfo.user.id,pageNum,pageSize} 
			let IP = 5
			if(num===2){
				url = '/attention/getListS.do';
				IP = 4;
			}
			this.fetch({url,data,method:'post'},IP).then(res=>{
				let {rows,total} = res[1].data;
				this.dataList = rows;
				this.total = total;
			})
		},
		
		//获取教师或课程列表
		getTeacherList(num){
			this.attentionList = [];
			let userInfo = this.getItem('userInfo');
			let IP = 5;
			let url = '/appointment/findAppoin.do';
			let data = {userid:userInfo.user.id,pageNum:''+this.pageNum,pageSize:''+this.pageSize};
			let method = 'post';
			if(!userInfo) return;
			if(num===0){
				IP = 3;
				url = '/course/findAppOinPage.do';
				method = 'get';
			}
			this.fetch({url,data,method},IP).then(res=>{
				let {rows,total} = res[1].data;
				this.dataList = rows;
				this.total = total;
			})
		},
		
		//选择时
		selNum(num){
			this.selectNum = num*1;
			this.getData()
		},
		
		//取消关注或预约
		topCancel(id,isgz,num){
			if(isgz==='gz'){
				this.cancelGz(id,num);
			}else{
				this.cancelYy(id,num);
			}
		},
		
		//取消关注
		cancelGz(id,activeName){
			let userid = this.userInfo.user.id
			let url = 'course/deLeFollow.do';
			let data = {userid};
			let method = 'post';
			let IP = 3
			if(activeName===0){
				data.curseid  = id
				method = 'get';
			}
			if(activeName===2){
				url = 'attention/delete.do'
				data.schoolid = id;
				IP = 4;
			}
			if(activeName===1){
				url ='addTeacher/delete.do'
				data.teacherid = id;
				IP=5;
			}
			this.fetch({url,data,method},IP).then(res=>{
				let {message,success} = res[1].data;
				if(success)this.getData()
				this.message(message)
			})
		},
		
		//取消预约
		cancelYy(id,activeName){
			let userid = this.userInfo.user.id
			let url = '/course/deLeAppOin.do';
			let data = {userId};
			let method = 'post';
			let IP = 3
			if(activeName===0){
				data.courseId=id
			}
			if(activeName===1){
				url = '/appointment/curriCancel.do';
				IP=5;
				data = {teacherid:id}
			}
			this.fetch({url,data,method},IP).then(res=>{
				let {message,success} = res[1].data;
				if(success)this.getData()
				this.message(message)
			})
		},
	}
}
</script>

<style scoped lang="scss">

.myatt_app{
	padding: 34rpx 28rpx;
	padding-bottom: 0;
	background: $col-fff;
	flex-direction: column;
	box-sizing: border-box;
	.myattUl{
		font-size: 36rpx;
		color: $col-333;
		height: 60rpx;
		.myattLi+.myattLi{
			margin-left: 58rpx;
		}
		.selColoe{
			color: #FD5C0E;
			font-weight:bold;
		}
	}
	.myattScr{
		flex:1;
		.myattList{
			justify-content: space-between;
		}
	}
}
</style>
