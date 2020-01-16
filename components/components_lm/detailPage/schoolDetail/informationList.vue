<template>
	<view style="margin-top: 20rpx;">
		<view v-if="infoList.length>0">
			<InfoList v-for="(item,i) of infoList" :key="i" :item="item"></InfoList>
		</view>
		<view class="text" v-else></view>
	</view>
</template>

<script>
import InfoList from '../../listPage/list/infoList.vue'
export default {
	components:{InfoList},
	props:['schoolId'],
	data() {
		return {
			infoData:{   //传到后端的值
				dynamic:'1',  //1：动态资讯  ，0普通资讯
				status:'1',   
				schoolId:'',     //学校id
				pageNo:'0',   //当前页
				pageSize:'10',   //每页数量
			},
			infoList:[]
		}
	},
	created() {
		this.infoData.schoolId = this.schoolId
		this.getInfoList(this.schoolId);
	},
	methods: {
		getInfoList(schoolid){
			let url = 'schoolMessage/findBySchoolId.do'
			let data = this.infoData;
			this.fetch({url,data,method:'post'},1).then(res=>{
				console.log(res[1].data.rows)
				this.infoList = res[1].data.rows;
			})
		}
	}
}
</script>

<style scoped lang="scss">
.text{
	width: 100%;
	height: 200rpx;
	text-align: center;
	line-height: 200rpx;
	font-size: 40rpx;
	color: $col-e5;
}
</style>
