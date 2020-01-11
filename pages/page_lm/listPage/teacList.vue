<template>
	<view class="lp_app fx pfAllScreen">
		<Sortord @clickSortord = "clickSortord" :selObj="selObj" :topListNum="3"></Sortord>
		<scroll-view scroll-y="true" class="lp_scro" @scrolltolower="getTeacherList(true)">
			<view v-if="teacList.length>0">
				<TeacList v-for="(item,i) of teacList" :item="item" :key='i'></TeacList>
				<!-- <ToLoad :title="hintTitle" v-if='isShowHint'></ToLoad>  留起有用-->
			</view>
			<DataNull v-else :isShowData="isShowData"></DataNull>
		</scroll-view>
	</view> 
</template>

<script>
import Sortord from '../../../components/components_lm/listPage/sortord.vue'
import TeacList from '../../../components/components_lm/listPage/list/teacList.vue'
import ToLoad from '../../../components/components_lm/hint/toLoad.vue'
import DataNull from '../../../components/components_lm/hint/dataNull.vue'
export default {
	components:{Sortord,TeacList,ToLoad,DataNull},
	// props:['searchConenxt'],
	data() {
		return {
			teacList:[],
			teacherObj:{
				name: '',   // 搜索字段,
				letter:"",   //教师筛选条件
				oneaddress:"", // 省
				twoaddress:"",   //市
				index:"0",    //当前页码
				follow:'1',   //综合、热门
				pageSize:'10'     //页码大小:
			},
			selObj:{},  //筛选条件
			ListSize:0,   //数据总条数
			
			isShowHint:true,   //加载
			hintTitle:''   ,//提示
			isShowData:false
		}
	},
	created() {
		this.creatScreenEmonitor();
		this.creatSeachEmonitor();
		this.getTeacherList();
	},
	methods: {
		//创建筛选监听器
		creatScreenEmonitor(){
			this.once.call(this,'teacherScreen','clickSel')
		},
		
		//创建搜索监听器
		creatSeachEmonitor(){
			this.once.call(this,'teacSeach','searchConenxt')
		},
		
		//获取教师列表
		getTeacherList(boo){
			let url = 'teacher/getteacher.do';
			let data = this.teacherObj;
			if(boo){
				let index = data.index;
				data.index = ''+(index*1+1)
			}
			this.fetch({url,data,method:'post'},1).then(res=>{
				let {list,size} = res[1].data;
				this.teacList=this.teacList.concat(list);
				this.ListSize = size;
			})
		},
		
		//综合’热门
		clickSortord(obj){
			this.clearList()
			let popular = obj.popular;
			let currObj = this.teacherObj;
			currObj.follow = popular;
			this.getTeacherList();
		},
		
		//筛选页面返回时
		clickSel(obj){
			this.creatScreenEmonitor();
			this.clearList()
			this.selObj = obj;
			let teac = this.teacherObj;
			for(let name in obj){
				teac[name] = obj[name].value;
			}
			this.getTeacherList();
		},
		
		//清空列表
		clearList(){
			this.teacList = [];			this.teacherObj.index = '0';
		},
		
		//当搜索条件变化时
		searchConenxt(val){
			this.creatSeachEmonitor();
			this.clearList()
			this.teacherObj.name = val;
			this.getTeacherList();
		},
	}
}
</script>

<style scoped lang="scss">
.lp_app{
	flex-direction: column;
	.lp_scro{
		height: calc(100vh - 135px);
		overflow: hidden;
	}
}
</style>
