<template>
	<view class="lp_app fx pfAllScreen">
		<HeaderView></HeaderView>
		<TableBer @onSelect="onSelect" :settingNum ="topListNum"></TableBer>
		<Sortord @clickSortord = "clickSortord" :topListNum="topListNum"></Sortord>
		
		<scroll-view scroll-y="true" class="lp_scro" lower-threshold="50" @scrolltolower="getCurrList(true)">
			<view v-if="curriculumList.length>0">
				<CurrList v-for="(item,i) of curriculumList" :item="item" :key='i'></CurrList>
				<ToLoad :title="hintTitle" v-if='isShowHint'></ToLoad>
			</view>
			<DataNull v-else :isShowData="isShowData"></DataNull>
		</scroll-view>
	</view> 
</template>

<script>
import HeaderView from '../../../components/components_lzj/index/header/header.vue'
import TableBer from '../../../components/components_lm/listPage/tableBer.vue'
import Sortord from '../../../components/components_lm/listPage/sortord.vue'
import CurrList from '../../../components/components_lm/listPage/list/currList.vue'
import ToLoad from '../../../components/components_lm/hint/toLoad.vue'
import DataNull from '../../../components/components_lm/hint/dataNull.vue'
export default {
	components:{HeaderView,TableBer,Sortord,CurrList,ToLoad,DataNull},
	data() {
		return {
			topListNum:0,   //选择课程、学校、教师、资讯
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
				pageSize:'20',     //页码大小:
			},
			curriculumList:[],   //课程列表
			
			
			isShowHint:true,   //加载
			hintTitle:''   ,//提示
			isShowData:true
		}
	},
	onLoad() {
		this.getCurrList();
	},
	methods: {
		//当切换列表时
		onSelect(num){
			this.topListNum = num
		},
		//选择排序方式时
		clickSortord(obj){
			this.curriculumList = [];
			let {popular,sort} = obj;
			let currObj = this.currObj;
			currObj.popular = popular;
			currObj.sort = sort;
			console.log(currObj,1345)
			this.getCurrList();
		},
		
		//获取课程数据
		getCurrList(boo){
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
		}
	}
}
</script>

<style scoped lang="scss">
.lp_app{
	flex-direction: column;
	.lp_scro{
		flex: 1;
		overflow: hidden;
	}
}
</style>
