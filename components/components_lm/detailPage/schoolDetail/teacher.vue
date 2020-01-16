<template>
	<view>
		<view v-if="(reco&&recoTeacList.length>0)||(!reco&&teacList.length>0)">
			<teachList v-for="(item,i) of (reco?recoTeacList:teacList)" :item='item' :key="i"></teachList>
		</view>
		<view class="teac_text" v-else>
			暂无数据
		</view>
	</view>
</template>

<script>
import teachList from '../../listPage/list/teacList.vue'
export default {
	components:{teachList},
	props:['reco','schoolId'],
	data() {
		return {
			teacList:[], //教师列表
			recoTeacList:[]  //推荐教师列表
		}
	},
	created() {
		this.getTeacherList(this.schoolId);
	},
	methods: {
		//获取教师列表
		getTeacherList(schoolid){
			let url = '/teacher/select.do';
			this.fetch({url,data:{schoolid},method:'post'},1).then(res=>{
				let data = res[1].data;
				this.teacList = data;
				if(this.reco&&data.length>0){
					this.recoTeacList = data.splice(0,1);
				}
			})
		},
	}
}
</script>

<style scoped lang="scss">
.teac_text{
	width: 100%;
	height: 200rpx;
	text-align: center;
	line-height: 200rpx;
	font-size: 40rpx;
	color: $col-e5;
}
</style>
