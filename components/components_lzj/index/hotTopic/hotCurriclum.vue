<template>
	<view class="hotCurriclum">
		<view class="head fx">
			<text class="title">热门课程</text>
			<view class="more" @tap="toCurrList">
				<text>更多</text>
				<text class="iconfont">&#xe601;</text>
			</view>
		</view>
		<view class="list fx">
			<uOption :showCurriclum="true"
					v-for="(value, i) in popularCourse"
					:value="value" :key="i"></uOption>
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
		props: ['isUpdateData'],
		created() {
			this.getPopularCourseData();
		},
		methods:{
			/**
			 * 热门课程数据获取
			 */
			async getPopularCourseData(){
				let res = await this.getAdvertisingData(3);
				let arr = [];
				this.getRandomData(res, arr, 4);
				this.popularCourse = arr;
			},
			/**
			 * 跳转到课程列表页面
			 */
			toCurrList(){
				this.$parent.$emit('toPage', 'curriculum');
			}
		},
		watch: {
			isUpdateData(v){
				if (v) {
					this.getPopularCourseData();
				}
			}
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