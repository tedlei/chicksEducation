<template>
	<view class="sl_app fx pfAllScreen">
		<Sortord @clickSortord = "clickSortord" :selObj="selObj" :topListNum="2"></Sortord>
		<scroll-view scroll-y="true" class="sl_scro" @scrolltolower="getSchoolList(true)">
			<view v-if="schoolList.length>0">
				<view class="sl_list" v-for="(item,i) of schoolList" :key='i'>
					<SchoolList :item="item"></SchoolList>
				</view>
			</view>
			<DataNull v-else :isShowData="isShowData"></DataNull>
		</scroll-view>
	</view>
</template>

<script>
import Sortord from '../../../components/components_lm/listPage/sortord.vue'
import DataNull from '../../../components/components_lm/hint/dataNull.vue'
import SchoolList from '../../../components/components_lm/listPage/list/schoolList.vue'
export default {
	components:{Sortord,DataNull,SchoolList},
	data() {
		return {
			schoolList:[],   //学校数据
			schoolObj:{     //学校列表 传到后台的参数
				name:'',   // 搜索字段
				type:'',   //学校分类  
				oneaddress: "",   //省
				twoaddress: "",    //市
				thressaddress: "",  //区
				index:"0",     //当前页
				follow:'1',    //综合 、热门
				pageSize:'10'     //页码大小:
			},
			listSize:0,  //长度
			selObj:{},   //筛选条件
				
			isShowData:true
		}
	},
	created() {
		this.once('schoolScreen','clickSel')
		this.once('schSearch','searchConenxt')
		this.getSchoolList();
	},
	methods: {
		//选择排序方式时
		clickSortord(obj){
			this.clearList()
			let popular = obj.popular;
			let schoolObj = this.schoolObj;
			schoolObj.follow = popular;
			this.getSchoolList()
		},
		
		//获取学校列表
		getSchoolList(boo){
			this.curriculumList = [];
			let url='schooluser/getschool.do';
			let data = this.schoolObj;
			if(boo){
				data.index = ''+(data.index*1+1)
			}
			this.fetch({url,data,method:'post'},1).then(res=>{
				let {list,size} = res[1].data;
				this.schoolList = this.schoolList.concat(list);
				this.listSize = size;
			})
		},
		
		//筛选页面返回时
		clickSel(obj){
			this.clearList();
			this.selObj = obj;
			let schoolObj = this.schoolObj;
			for(let name in obj){
				schoolObj[name] = obj[name].value;
			}
			this.getSchoolList();
		},
		//清空列表
		clearList(){
			this.schoolList = [];
			this.schoolObj.index = '0'
		},
		//当搜索条件变化时
		searchConenxt(val){
			this.clearList()
			this.schoolObj.name = val;
			this.getSchoolList()
		},
	}
}
</script>

<style scoped lang="scss">
.sl_app{
	flex-direction: column;
	.sl_scro{
		height: calc(100vh - 135px);
		padding-left: 30rpx;
		overflow: hidden;
		.sl_list{
			margin-top: 20rpx;
		}
	}
}
</style>
