<template>
	<view class="il_app">
		<Sortord :selObj="selObj" :topListNum="4"></Sortord>
		<scroll-view scroll-y="true" class="il_scro" @scrolltolower="getZxData(true)">
			<view v-if="infoList.length>0">
				<InfoList v-for="(item,i) of infoList" :key="i" :item="item"></InfoList>
				<!-- <ToLoad :title="hintTitle" v-if='isShowHint'></ToLoad>  留起有用-->
			</view>
			<DataNull v-else :isShowData="isShowData"></DataNull>
		</scroll-view>
	</view>
</template>

<script>
import Sortord from '../../../components/components_lm/listPage/sortord.vue'
import InfoList from '../../../components/components_lm/listPage/list/infoList.vue'
import DataNull from '../../../components/components_lm/hint/dataNull.vue'
export default {
	components:{Sortord,InfoList,DataNull},
	data() {
		return {
			infoList:[],   //资讯列表
			setParam:{    //参数
				type:"",     //资讯分类 
				topic:'',   //资讯题目
				index:"0",   // 分页   
				status:'1',   //资讯状态
				pageSize:"10",    //每页条数
				port:'1'
			},
			selObj:{},
			listSize:0,  //数据总条数
			isShowData:true,
		}
	},
	created() {
		this.once('infoScreen','clickSel')
		this.once('infoSeach','searchConenxt')
		this.getZxData();
	},
	methods: {
		//获取资讯数据
		getZxData(boo){
			let url = 'schoolMessage/getMessage.do';
			let data = this.setParam;
			if(boo){
				data.index = ''+(data.index*1+1);
			}
			this.fetch({url,data,method:"post"},1).then(res=>{ 
				let {list,size} = res[1].data;
				this.infoList = this.infoList.concat(list);
				this.listSize = size;
			})
		},
		
		//清空列表
		clearList(){
			this.infoList = [];
			this.setParam.index = '0';
		},
		
		//当搜索条件变化时
		searchConenxt(val){ 
			this.clearList()
			this.setParam.topic = val;
			this.getZxData();
		},
		
		//筛选页面返回时
		clickSel(obj){
			this.clearList()
			this.selObj = obj;
			let sp = this.setParam;
			for(let name in obj){
				sp[name] = obj[name].value;
			}
			this.getZxData();
		},
	}
}
</script>

<style scoped lang="scss">
.il_app{
	flex-direction: column;
	.il_scro{
		height: calc(100vh - 135px);
		background-color: $col-fff;
		overflow: hidden;
	}
}
</style>
