<template>
	<view class="lp_app fx pfAllScreen">
		<Sortord @clickSortord = "clickSortord" :selObj="selObj" :topListNum="3"></Sortord>
		<scroll-view scroll-y="true" class="lp_scro" @scrolltolower="getTeacherList(true)">
			<view v-if="teacList.length>0">
				<TeacList v-for="(item,i) of teacList" :item="item" :key='i'></TeacList>
			</view>
			<uniLoadMore :status="status"></uniLoadMore>
		</scroll-view>
	</view> 
</template>

<script>
import Sortord from '../../../components/components_lm/listPage/sortord.vue'
import TeacList from '../../../components/components_lm/listPage/list/teacList.vue'
import uniLoadMore from '../../../components/uni-load-more/uni-load-more.vue' 
export default {
	components:{Sortord,TeacList,uniLoadMore},
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
			status:'loading'   //上拉加载更多	
		}
	},
	created() {
		this.once('teacherScreen','clickSel')
		this.once('teacSeach','searchConenxt')
		this.getTeacherList();
	},
	methods: {
		//获取教师列表
		getTeacherList(boo){
			let url = 'teacher/getteacher.do';
			let data = this.teacherObj;
			if(boo){
				let index = data.index;
				data.index = ''+(index*1+1)
			}
			this.status = 'loading'
			this.fetch({url,data,method:'post'},1).then(res=>{
				let {list,size} = res[1].data;
				this.teacList=this.teacList.concat(list);
				this.ListSize = size;
				if(list.length<=0) this.status = 'noMore'
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
			this.teacList = [];
			this.teacherObj.index = '0';
		},
		
		//当搜索条件变化时
		searchConenxt(val){
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
