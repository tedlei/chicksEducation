<template>
	<scroll-view class="scroll-y" :scroll-y="true" @scroll="emitScroll">
		<view class="section fx">
			<headerNav></headerNav>
			<view class="header-nav"></view>
			<uSwiper></uSwiper>
			<view class="u-swiper-bottom"></view>
			<view v-show="!showListClass" class="class_nav fx">
				<view v-for="(item, i) in class_nav_data" :key="i">
					<image :src="item.image"></image>
					<text class="name">{{item.name}}</text>
				</view>
			</view>
			<view class="information fx">
				<text class="information_one">动态资讯</text>
				<text class="information_two fx fxCenter">热门</text>
			</view>
			<image class="section_image" :src="informationImage.pic" mode=""></image>
			<!-- 热门课程 -->
			<uHotCurriclum :isUpdateData.sync="isUpdateData"></uHotCurriclum>
			<!-- 热门学校 -->
			<uHotSchool :isUpdateData.sync="isUpdateData"></uHotSchool>
			<!-- 热门课程推荐 -->
			<uCategory :isUpdateData.sync="isUpdateData"></uCategory>
		</view>
	</scroll-view>
</template>

<script>
	import headerNav from '../../components/components_lzj/index/header/header.vue'
	import uSwiper from '../../components/components_lzj/index/swiper/swiper.vue'
	import uCategory from '../../components/components_lzj/index/hotTopic/category.vue'
	import uHotCurriclum from '../../components/components_lzj/index/hotTopic/hotCurriclum.vue'
	import uHotSchool from '../../components/components_lzj/index/hotTopic/hotSchool.vue'
	export default {
		components: {
			headerNav,
			uSwiper,
			uCategory,
			uHotCurriclum,
			uHotSchool
		},
		data() {
			return {
				showListClass: false, // 是否显示分类
				isUpdateData: false,
				informationImage: {},
				class_nav_data: [{
						image: '../../static/image/kecheng.png',
						name: '课程'
					},
					{
						image: '../../static/image/xuexiao.png',
						name: '学校'
					},
					{
						image: '../../static/image/mingshi.png',
						name: '名师'
					},
					{
						image: '../../static/image/zixue.png',
						name: '资讯'
					},
					{
						image: '../../static/image/fenlei.png',
						name: '分类'
					}
				]
			}
		},
		onLoad() {
			this.getIformation();

			// 获取搜索关键字
			uni.$on('getSearchResult', this.getSearchResult);
		},
		onReady() {

		},
		methods: {
			/**
			 * 获取热门资讯广告位
			 */
			async getIformation() {
				this.informationImage = (await this.getAdvertisingData(5))[0];
			},
			/**
			 * 根据搜索内容 查询数据
			 */
			getSearchResult(data) {
				// console.log(data, 7777777777);
			},
			/**
			 * 监听轮播图是否被头部导航栏完全遮挡
			 */
			selectorQuery: (() => {
				let query = null;
				return function() {
					if (!query) query = uni.createSelectorQuery().in(this);
					return query;
				}
			})(),
			async keepOut() {

				this.selectorQuery().select('.u-swiper-bottom').fields({
					rect: true
				}, data => {
					let result = false;
					result = data.top <= 68;
					if (this.showListClass !== result) this.showListClass = result;
				}).exec();
			},
			/**
			 * 监听页面滚动
			 */
			emitScroll(e) {
				this.keepOut();
			}
		},
		onShow() {
			this.isUpdateData = true;
			let timer = setTimeout(() => {
				this.isUpdateData = false;
				clearTimeout(timer);
			}, 1000)
		},
		watch: {
			showListClass(v) {
				if (v) {
					console.log(v, '显示');
				} else console.log(v, '隐藏');
			}
		}
	}
</script>

<style scoped lang="scss">
	.scroll-y {
		height: 100vh;

		.section {
			position: relative;
			flex-direction: column;
			align-items: center;

			.u-swiper-bottom {
				height: 1px;
				width: 100%;
			}

			.class_nav {
				justify-content: space-around;
				width: 100vw;
				padding-top: 18rpx;
				text-align: center;

				image {
					display: block;
					width: 114rpx;
					height: 114rpx;
				}

				.name {
					color: $col-333;
				}
			}

			.information {
				align-items: center;
				width: 690rpx;
				height: 60rpx;
				margin: 28rpx 0 40rpx;
				background: $col-fff;
				opacity: 1;
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
	}
</style>
