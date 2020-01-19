<template>
	<view class="lp_app fx pfAllScreen">
		<Sortord @clickSortord = "clickSortord" :selObj="selObj" :topListNum="1"></Sortord>
		<scroll-view scroll-y="true" class="lp_scro" @scrolltolower="getCurrList(true)">
			<view v-if="curriculumList.length>0">
				<CurrList v-for="(item,i) of curriculumList" :item="item" :key='i'></CurrList>
			</view>
			<uniLoadMore :status="status"></uniLoadMore>
		</scroll-view>
	</view> 
</template>

<script>
import Sortord from '../../../components/components_lm/listPage/sortord.vue'
import CurrList from '../../../components/components_lm/listPage/list/currList.vue'
import uniLoadMore from '../../../components/uni-load-more/uni-load-more.vue' 
export default {
	components:{Sortord,CurrList,uniLoadMore},
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
			
			status:'loading'   //上拉加载更多
		}
	},
	created() {
		this.once('currConditionFind','conditionFind')
		this.once('currScreen','clickSel')
		this.once('currSearch','searchConenxt')
		this.getCurrList();
	},
	methods: {
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
			let cl = this.curriculumList;
			let url='curri/search.do';
			let data = this.currObj;
			this.status = 'loading'
			if(!data.keywords) delete data.keywords; 
			if(boo){
				let pageNo = data.pageNo
				data.pageNo = ''+(pageNo*1+1);
			}
			this.fetch({url,data,method:'post'},1).then(res=>{
				let {rows,total} = res[1].data
				data.total = total;
				cl = cl.concat(rows)
				this.curriculumList = cl;
				if(rows.length<=0) this.status = 'noMore'
			})
		},
		
		//筛选页面返回时
		clickSel(obj){
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
			this.clearList()
			this.currObj.keywords = val;
			this.getCurrList()
		},
		
		//选择分类时
		conditionFind(value){
			let arr = {
				'小学':{i:'0',num:2,value:'小学辅导'},
				'中学':{i:'0',num:3,value:'中学辅导'},
				'艺术':{i:'0',num:4,value:'艺术培训'},
				'学历':{i:'0',num:5,value:'学历提升'},
				'职业':{i:'0',num:6,value:'职业培训'}
			}
			let data = {category:arr[value]};
			this.clickSel(data);
		}
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
