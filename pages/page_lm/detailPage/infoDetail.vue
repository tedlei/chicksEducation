<template>
	<view class="id_app fx pfAllScreen">
		<hb title="资讯详情"></hb>
		<scroll-view scroll-y="true" class="id_scro">
			<view class="id_title">{{infoDetail.schoolTopic}}</view>
			<view class="id_item fx">
				<view class="id_fbz ellipsis">发布者：{{infoDetail.schoolAuthor}}</view>
				<text>{{infoDetail.schoolTime.split(' ')[0]}}</text>
			</view>
			<view class="id_main" v-html="infoDetail.schoolContent"></view>
		</scroll-view>
	</view>
</template>

<script>
import hb from '../../../components/components_lm/detailPage/headBack.vue'
export default {
	components:{hb},
	data() {
		return {
			infoDetail:null, //资讯详情
		}
	},
	onLoad(e) {
		this.getInfoDetail(e.id);
	},
	methods: {
		getInfoDetail(id){
			let url = 'schoolMessage/getByid.do'
			this.fetch({url,data:{id},method:'post'},1).then(res=>{
				this.infoDetail = res[1].data.at
				console.log(res[1].data.at)
			})
		}
	}
}
</script>

<style scoped lang="scss">
.id_app{
	flex-direction: column;
	.id_scro{
		flex: 1;
		overflow: hidden;
		background-color: $col-fff;
		.id_title{
			padding:20rpx 30rpx;
			padding-bottom: 0;
			font-size: 44rpx;
			line-height: 70rpx; 
			font-weight: bold;
			color:$col-333;
		}
		.id_item{
			padding:14rpx 30rpx;
			border-bottom: 1px solid $col-e5;
			font-size: 12px;
			color:$col-999;
			align-items: center;
			.id_fbz{
				flex: 1;
			}
		}
		.id_main{
			padding:32rpx 40rpx;
		}
	}
}
</style>
