<template>
	<view class="index_main fx">
		<view class="information fx">
			<text class="information_one">动态资讯</text>
			<text class="information_two fx fxCenter">热门</text>
		</view>
		<image class="section_image" :src="informationImage" mode=""></image>
		<!-- 热门课程 -->
		<uHotCurriclum :isUpdateData.sync="isUpdateData" @toPage="toPage"></uHotCurriclum>
		<!-- 热门学校 -->
		<uHotSchool :isUpdateData.sync="isUpdateData"  @toPage="toPage"></uHotSchool>
		<!-- 热门课程推荐 -->
		<uCategory :isUpdateData.sync="isUpdateData"  @toPage="toPage"></uCategory>
	</view>
</template>

<script>
	import uCategory from '../hotTopic/category.vue'
	import uHotCurriclum from '../hotTopic/hotCurriclum.vue'
	import uHotSchool from '../hotTopic/hotSchool.vue'
	
	export default {
		components: {
			uCategory,
			uHotCurriclum,
			uHotSchool
		},
		props: ['isUpdateData', 'toPage'],
		data() {
			return {
				informationImage: '',
			}
		},
		created() {
			this.getIformation();
		},
		methods: {
			/**
			 * 获取热门资讯广告位
			 */
			async getIformation() {
				this.informationImage = (await this.getAdvertisingData(8))[0].pic;
			}
		}
	}
</script>

<style scoped lang="scss">
	.index_main{
		flex-direction: column;
		align-items: center;
		.information {
			align-items: center;
			width: 690rpx;
			height: 60rpx;
			margin: 28rpx 0 40rpx;
			background: $col-fff;
			border-radius: 50rpx;
		
			.information_one {
				margin: 0 24rpx;
				font-size: 28rpx;
				font-weight: 700;
				color: $col-333;
			}
		
			.information_two {
				width: 48rpx;
				height: 28rpx;
				font-size: 20rpx;
				background-color: rgba(253, 129, 9, 0.2);
				color: $col-main;
				border-radius: 4rpx;
			}
		}
		
		.section_image {
			width: 690rpx;
			height: 152rpx;
		}
	}
	
</style>
