<template>
	<view class="myatt_app pfAllScreen fx">
		<hb :title="isgz==='gz'?'我的关注':'我的预约'"></hb>
		<view class="myattUl fx">
			<view class="myattLi" 
				:class="selectNum===i?'selColoe':''" 
				v-for="(item,i) of selectList" 
				@tap="selNum(i)"
				:key='i'>{{item}}</view>
		</view>
		<scroll-view class="myattScr" scroll-y="true" @scrolltolower="getData(true)">
			<view class="myattList fx">
				<myPageCom 
					v-for = "(item,i) of dataList"
					:key='i'
					:selectNum="selectNum" 
					:isgz="isgz" 
					:item = 'item'
					:deleteNum = 'deleteNum'
					:i="i"
					@pressNum="pressNum"
					@topCancel = 'topCancel'
					style="margin-top: 22rpx;"></myPageCom>
			</view>
		</scroll-view>
	</view>
</template>

<script>

import myPageCom from '../../../../components/components_lm/myPage/myPageCom.vue'
import hb from '../../../../components/components_lm/detailPage/headBack.vue'
export default {
	components:{myPageCom,hb},
	data() {
		return {
			selectList:['课程','教师'],
			selectNum:0,
			dataList:[],   //获取的数据
			userInfo:null,
			pageNum:'1',  //当前页
			pageSize:10   ,//每页数据
			total:0,    //总页数
			isgz:'gz',   
			deleteNum:-1,  //要删除的下标

		}
	},
	onLoad(e){
		this.isgz = e.type;
		if(e.type==='gz')this.selectList.push('学校')
		this.userInfo = this.getItemSync('userInfo');
		this.getData()
	},
	methods: {
		//获取数据
		getData(boo){
			let num = this.selectNum;
			// this.dataList = [];
			switch(num){
				case 0 : 
					if(this.isgz==='gz')this.searchKc(boo);
					else this.getTeacherList(0,boo)
				break
				case 1 : 
					if(this.isgz==='gz')this.searchXX(1,boo);
					else this.getTeacherList(1,boo)
				break
				case 2 : this.searchXX(2,boo);
				break
			}
		},
		//获取关注的课程
		searchKc(boo){
			let userInfo = this.userInfo;
			let pageSize = this.pageSize;
			if(boo){
				this.pageNum = ''+(this.pageNum*1+1);
			}
			let data = {userid:userInfo.user.id,pageNum:this.pageNum,pageSize}
			let url = 'course/findCourse.do';
			this.fetch({url,data,method:'get'},3).then(res=>{
				let {rows,total} = res[1].data;
				this.dataList=this.dataList.concat(rows);
				this.total = total;
			})
		},
		
		//获取学校关注列表
		searchXX(num,boo){
			let userInfo = this.userInfo
			let pageSize = ''+this.pageSize;
			let url = 'addTeacher/getList.do';
			if(boo){
				this.pageNum = ''+(this.pageNum*1+1);
			}
			let data = {userid:userInfo.user.id,pageNum:this.pageNum,pageSize} 
			let IP = 5
			if(num===2){
				url = 'attention/getListS.do';
				IP = 4;
			}
			this.fetch({url,data,method:'post'},IP).then(res=>{
				let {rows,total} = res[1].data;
				this.dataList=this.dataList.concat(rows);
				this.total = total;
			})
		},
		
		//获取教师或课程列表
		getTeacherList(num,boo){
			let userInfo = this.getItemSync('userInfo');
			let IP = 5;
			let url = 'appointment/findAppoin.do';
			if(boo){
				this.pageNum = ''+(this.pageNum*1+1);
			}
			let data = {userid:userInfo.user.id,userId:userInfo.user.id,pageNum:this.pageNum,pageSize:''+this.pageSize};
			let method = 'post';
			if(!userInfo) return;
			if(num===0){
				IP = 3;
				url = 'course/findAppOinPage.do';
				method = 'get';
			}
			this.fetch({url,data,method},IP).then(res=>{
				let {rows,total} = res[1].data;
				this.dataList=this.dataList.concat(rows);
				this.total = total;
			})
		},
		
		//选择时
		selNum(num){
			this.selectNum = num*1;
			this.dataList = [];
			this.pageNum = '1';
			this.getData();
		},
		
		//长按时
		pressNum(i){
			this.deleteNum = i;
		},
		
		//取消关注或预约
		topCancel(id,isgz,num,i){
			this.deleteNum = -1;
			if(isgz==='gz'){
				this.cancelGz(id,num,i);
			}else{
				this.cancelYy(id,num,i);
			}
		},
		
		//取消关注
		cancelGz(id,activeName,i){
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
				if(success) this.dataList.splice(i,1)
				
				this.message(message)
			})
		},
		
		//取消预约
		cancelYy(id,activeName,i){
			let userId = this.userInfo.user.id
			let url = 'course/deLeAppOin.do';
			let data = {userId};
			let method = 'post';
			let IP = 3
			if(activeName===0){
				data.courseId=id
			}
			if(activeName===1){
				url = 'appointment/curriCancel.do';
				IP=5;
				data = {teacherid:id}
			}
			this.fetch({url,data,method},IP).then(res=>{
				let {message,success} = res[1].data;
				if(success) this.dataList.splice(i,1)
				this.message(message)
			})
		},
	}
}
</script>

<style scoped lang="scss">

.myatt_app{
	// padding: 34rpx 28rpx;
	// padding-bottom: 0;
	background: $col-fff;
	flex-direction: column;
	box-sizing: border-box;
	.myattUl{
		padding:0 28rpx;
		border-bottom: 1px solid $col-e5;
		font-size: 36rpx;
		color: $col-333;
		.myattLi{
			padding:30rpx 20rpx;
		}
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
		overflow: hidden;
		.myattList{
			padding:20rpx 28rpx;
			justify-content: space-between;
			flex-wrap: wrap;
		}
	}
}
</style>
