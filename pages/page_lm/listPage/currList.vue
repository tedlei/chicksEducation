<template>
	<view class="lp_app fx pfAllScreen">
		<Sortord @clickSortord = "clickSortord" :selObj="selObj" :topListNum="1"></Sortord>
		<scroll-view scroll-y="true" class="lp_scro" @scrolltolower="getCurrList(true)">
			<view v-if="curriculumList.length>0">
				<CurrList v-for="(item,i) of curriculumList" :item="item" :key='i'></CurrList>
				<!-- <ToLoad :title="hintTitle" v-if='isShowHint'></ToLoad>  留起有用-->
			</view>
			<DataNull v-else :isShowData="isShowData"></DataNull>
		</scroll-view>
	</view> 
</template>

<script>
import Sortord from '../../../components/components_lm/listPage/sortord.vue'
import CurrList from '../../../components/components_lm/listPage/list/currList.vue'
import ToLoad from '../../../components/components_lm/hint/toLoad.vue'
import DataNull from '../../../components/components_lm/hint/dataNull.vue'
export default {
	components:{Sortord,CurrList,ToLoad,DataNull},
	data() {
		return {
			// topListNum:0,   //选择课程、学校、教师、资讯
			currObj:{      //课程列表 传到后台的参数
				keywords: '',   // 搜索字段
				category: ''   ,   // 课程分类
				subject: ''   ,   // 科目分类
				grade: ''   ,   // 年级分类
				address: ''   ,   // 上课地点
				addressList:'',   //地区
				time: ''   ,   // 上课时间 
				level: ''   ,   // 课程级别
				sort:"",    //升序或降序
				popular:"1",     //综合或热门
				pageNo:'1',        //页码
				total:0,   //数据总条数
				pageSize:'10',     //页码大小: 
			},
			curriculumList:[],   //课程列表
			selObj:{},   //筛选条件
			
			isShowHint:true,   //加载
			hintTitle:''   ,//提示
			isShowData:true
		}
	},
	created() {
		this.creatScreenEmonitor()
		this.creatSeachEmonitor()
		this.getCurrList();
	},
	methods: {
		//创建筛选监听器
		creatScreenEmonitor(){
			this.once.call(this,'teacherScreen','clickSel')
		},
		
		//创建搜索监听器
		creatSeachEmonitor(){
			this.once.call(this,'currSearch','searchConenxt')
		},
		
		//当切换列表时
		onSelect(num){
			this.topListNum = num
		},
		//选择排序方式时
		clickSortord(obj){
			this.clearList()
			let {popular,sort} = obj;
			let currObj = this.currObj;
			currObj.popular = popular;
			currObj.sort = sort;
			this.getCurrList();
		},
		
		//获取课程数据
		getCurrList(boo){
			this.isShowHint = true;
			let cl = this.curriculumList;
			this.hintTitle = '正在加载'
			let url='curri/search.do';
			let data = this.currObj;
			if(!data.keywords) delete data.keywords; 
			if(boo){
				let pageNo = data.pageNo
				data.pageNo = ''+(pageNo*1+1);
			}
			this.fetch({url,data,method:'post'},1).then(res=>{
				let {rows,total} = res[1].data
				data.total = total;
				if(rows.length>0){
					this.isShowHint = false;
					cl = cl.concat(rows)
					this.curriculumList = cl;
				}else{
					if(this.curriculumList.length>0){
						this.hintTitle = '这是底线';
						setTimeout(()=>{
							// this.isShowHint = false;
						},1000)
					}else{
						this.isShowData = false;
					}
				}
			})
		},
		
		//筛选页面返回时
		clickSel(obj){
			this.creatScreenEmonitor();
			this.clearList();
			this.selObj = obj;
			let currObj = this.currObj;
			for(let name in obj){
				currObj[name] = obj[name].value;
			}
			this.getCurrList();
		},
		
		//清空列表
		clearList(){
			this.curriculumList = [];
			this.currObj.pageNo = '1'
		},
		
		//当搜索条件变化时
		searchConenxt(val){
			this.creatSeachEmonitor();
			this.clearList()
			this.currObj.keywords = val;
			this.getCurrList()
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
