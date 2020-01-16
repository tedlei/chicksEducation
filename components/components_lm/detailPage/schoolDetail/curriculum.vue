<template>
	<view>
		<view v-if="(reco&&recoCurrList.length>0)||(!reco&&currlist.length>0)">
			<currList v-for="(item,i) of (reco?recoCurrList:currlist)" :item='item' :key="i"></currList>
		</view>
		<view class="cc_text" v-else>
			暂无数据
		</view>
	</view>
</template>

<script>
import currList from '../../listPage/list/currList.vue'
export default {
	components:{currList},
	props:['reco','schoolId'],
	data() {
		return {
			currlist:[],  //课程列表
			recoCurrList:[],  //推荐课程
		}
	},
	created() {
		this.getCurrList(this.schoolId);
	},
	methods: {
		//获取课程数据
		getCurrList(schoolId){
			let url = '/curri/schoolCourse.do';
			let data = {schoolId,pageNo:'1',pageSize:'20'}
			this.fetch({url,data,method:'post'},1).then(res=>{
				let data = res[1].data.rows;
				this.currlist = data;
				if(this.reco&&data.length>0){
					this.recoCurrList = data.splice(0,2);
				}
			})
		},
	}
}
</script>

<style scoped lang="scss">
.cc_text{
	width: 100%;
	height: 200rpx;
	text-align: center;
	line-height: 200rpx;
	font-size: 40rpx;
	color: $col-e5;
}
</style>
