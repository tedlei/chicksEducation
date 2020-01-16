<template>
	<view class="al_app fx">
		<template v-if="(reco&&recoAlbumList.length>0)||(!reco&&albumList.length>0)">
			<albumList v-for="(item,i) of (reco?recoAlbumList:albumList)" :key='i'></albumList>
		</template>
		<view class="al_text" v-else>
			暂无数据
		</view>
	</view>
</template>

<script>
import albumList from './albumDetail.vue'
export default {
	components:{albumList},
	props:['schoolId','reco'],
	data() {
		return {
			albumList:[],  //相册列表
			recoAlbumList:[],   //推荐列表
		}
	},
	created() {
		this.getAlbumList()
	},
	methods: {
		//获取相册列表
		getAlbumList(){
			let list = [
				'../../../../../static/image/default.png',
				'../../../../../static/image/default.png',
				'../../../../../static/image/default.png',
				'../../../../../static/image/default.png',
				'../../../../../static/image/default.png',
				'../../../../../static/image/default.png',
				'../../../../../static/image/default.png',
				'../../../../../static/image/default.png',
				'../../../../../static/image/default.png',
				'../../../../../static/image/default.png',
				'../../../../../static/image/default.png',
				'../../../../../static/image/default.png'
			];
			this.albumList = list;
			if(this.reco){
				this.recoAlbumList = list.splice(0,3);
			}
		}
	}
}
</script>

<style scoped lang="scss">
.al_app{
	flex-wrap: wrap;
	.al_text{
		width: 100%;
		height: 200rpx;
		text-align: center;
		line-height: 200rpx;
		font-size: 40rpx;
		color: $col-e5;
	}
}
</style>
