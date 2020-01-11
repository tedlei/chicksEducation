<template>
	<view class="find">
		<uHeader></uHeader>
		<view class="find-content">
			<text class="title">为您推荐</text>
			<view class="list fx">
				<view class="fx option" v-for="(item, i) in dataList" :key="i">
					<image src="../../../static/image/default.png" mode=""></image>
					<text class="ellipsis">{{item.context}}</text>
					<text class="ellipsis">发布者：{{item.el}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uHeader from '../../../components/components_lzj/index/header/header.vue'
	export default {
		components: {uHeader},
		data() {
			return {
				dataList: [
					{
						el: '重庆工商大学',
						context: '对于幼儿，家长该哈电话u放佛萨附件'
					},
					{
						el: '重庆工商大学',
						context: '对于幼儿，家长该哈电话u放佛萨附件'
					},
					{
						el: '重庆工商大学',
						context: '对于幼儿，家长该哈电话u放佛萨附件'
					},
					{
						el: '重庆工商大学',
						context: '对于幼儿，家长该哈电话u放佛萨附件'
					},
					{
						el: '重庆工商大学',
						context: '对于幼儿，家长该哈电话u放佛萨附件'
					},
					{
						el: '重庆工商大学',
						context: '对于幼儿，家长该哈电话u放佛萨附件'
					},
					{
						el: '重庆工商大学',
						context: '对于幼儿，家长该哈电话u放佛萨附件'
					}
				]
			}
		},
		onLoad() {
			uni.$on('getSearchResult', this.getDataList);
		},
		methods: {
			/**
			 * 获取搜索结果并调取接口
			 */
			getDataList(input){
				console.log(input, '搜索结果');
			}
		},
		show(){
		}
	}
</script>

<style scoped lang="scss">
	.find{
		.find-content{
			padding: 0 30rpx;
			.title{
				display: inline-block;
				padding: 22rpx 0;
				color: $col-333;
				font-weight: 700;
			}
			.list{
				flex-wrap: wrap;
				justify-content: space-between;
				.option{
					flex-direction: column;
					image{
						width: 334rpx;
						height: 268rpx;
					}
					text{
						display: inline-block;
						width: 334rpx;
					}
					& text:nth-last-child(2){
						padding: 14rpx 0 10rpx;
						color: $col-333;
						font-size: 26rpx;
					}
					& text:nth-last-child(1){
						padding-bottom: 16rpx;
						color: $col-999;
						font-size: $uni-font-size-sm;
					}
				}
			}
		}
	}
</style>
