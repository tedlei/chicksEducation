<template>
	<view class="rein_app pfAllScreen fx">
		<HeaderView></HeaderView>
		<scroll-view scroll-y="true" class="rein_scview">
			<view class="rein_ui">
				
			</view>
		</scroll-view>
	</view>
</template>

<script>
import HeaderView from '../../../components/components_lzj/index/header/header.vue'
export default {
	components:{HeaderView},
	data() {
		return {
			pageNo:1,  //当前页
			pageSize:20,    //每页条数
			size:0,   //总条数  
			informationList:[]
		}
	},
	methods: {
		getInfo(){
			let data = {
				index: "0",   //当前页 
				port: "1",    //动态资讯   
				status: "1",
			}
			let url = 'schoolMessage/getMessage.do';
			this.fetch({url,data,method:"post"},1).then(res=>{})
		}
	}
}
</script>

<style scoped lang="scss">
.rein_app{
	flex-direction: column;
	.rein_scview{
		flex: 1;
		background-color: $col-fff;
		.rein_ui{
			width: 100%;
		}
	}
}
</style>
