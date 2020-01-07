<template>
	<view class="hotCurriclum">
		<view class="head fx">
			<text class="title">热门课程</text>
			<navigator url="/pages/page_lzj/courseCategory/courseCategory">
				<view class="more">
					<text>更多</text>
					<text class="iconfont">&#xe601;</text>
				</view>
			</navigator>
		</view>
		<view class="list fx">
			<uOption :showCurriclum="true" v-for="(value, i) in popularCourse" :cuClass="true" :value="value" :key="i"></uOption>
		</view>
	</view>
</template>

<script>
	import uOption from './option.vue'
	export default {
		components: {uOption},
		data(){
			return {
				// 热门课程数据
				popularCourse: []
			}
		},
		created() {
			this.getPopularCourseData();
		},
		methods:{
			/**
			 * 热门课程数据获取
			 */
			async getPopularCourseData(){
				let res = await this.getAdvertisingData(3);
				this.getRandomData(res, this.popularCourse, 4);
			},
		}
	}
</script>

<style scoped lang="scss">
	.hotCurriclum{
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