<template>
	<view class="hotSchool">
		<view class="head fx">
			<text class="title">热门学校</text>
			<view class="more">
				<text>更多</text>
				<text class="iconfont">&#xe601;</text>
			</view>
		</view>
		<view class="list fx">
			<uSchoolOption
					v-for="(value, i) in popularSchool" 
					:value="value"
					:key="i"></uSchoolOption>
		</view>
	</view>
</template>

<script>
	import uSchoolOption from './schoolOption.vue'
	export default {
		components: {uSchoolOption},
		data(){
			return {
				// 热门学校数据
				popularSchool: []
			}
		},
		props: ['isUpdateData'],
		created() {
			this.getPopularSchoolData();
		},
		methods:{
			/**
			 * 热门学校数据获取
			 */
			async getPopularSchoolData(){
				let result = await this.getAdvertisingData(2);
				let arr = [];
				this.getRandomData(result, arr, 2);
				this.popularSchool = arr;
			},
		},
		watch: {
			isUpdateData(v){
				if (v) {
					this.getPopularSchoolData();
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.hotSchool{
		.head{
			justify-content: space-between;
			padding: 30rpx 0;
			.title{
				color: $col-333;
			}
			.more{
				font-size: 24rpx;
				color: $col-666;
			}
		}
		.list{
			justify-content: space-between;
			flex-wrap: wrap;
			width: 690rpx;
		}
	}
</style>