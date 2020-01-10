<template>
	<view >
		<headerNav></headerNav>
		<view class="u-table-bar" :style="{top: top + 36 + 'px'}">
			<uTableBar @onSelect="onSelect" :settingNum="listClassNumber"></uTableBar>
		</view>
		<swiper class="swiper_main" :current="listClassNumber">
			<swiper-item @touchmove.stop="()=>{}">
				<scroll-view class="scroll-y" :scroll-y="true" @scroll="emitScroll">
					<view class="section fx">
						<view class="header-nav"></view>
						<uSwiper></uSwiper>
						<view class="index_nav">
							<view class="class_nav fx">
								<view v-for="(item, i) in class_nav_data" :key="i">
									<image :src="item.image"></image>
									<text class="name">{{item.name}}</text>
								</view>
							</view>
						</view>
									
						<!-- 主体内容 -->
						<uMian :isUpdateData.sync="isUpdateData"></uMian>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item @touchmove.stop="()=>{}" class="swItem">
				<scroll-view class="scroll-y " :scroll-y="true">
					<view style="background-color: #007AFF;">11111111111111</view>
				</scroll-view>
			</swiper-item>
			<swiper-item @touchmove.stop="()=>{}" class="swItem">
				<scroll-view class="scroll-y" :scroll-y="true">
					<view>22222222222222222</view>
				</scroll-view>
			</swiper-item>
			<swiper-item @touchmove.stop="()=>{}" class="swItem">
				<scroll-view class="scroll-y" :scroll-y="true">
					<view>33333333333333333</view>
				</scroll-view>
			</swiper-item>
			<swiper-item @touchmove.stop="()=>{}" class="swItem">
				<scroll-view class="scroll-y" :scroll-y="true">
					<view>444444444444444</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import headerNav from '../../components/components_lzj/index/header/header.vue'
	import uSwiper from '../../components/components_lzj/index/swiper/swiper.vue'
	import uTableBar from '../../components/components_lm/listPage/tableBer.vue'
	import uMian from '../../components/components_lzj/index/main/main.vue'
	
	export default {
		components: {
			headerNav,
			uSwiper,
			uMian,
			uTableBar
		},
		data() {
			return {
				top: 0,	// 分类导航栏top值
				searchConenxt: '', // 搜索内容
				hideTableBar: false,	// 是否隐藏分类导航栏
				listClassNumber: 0,	// 显示类别序号
				isUpdateData: false,	// 是否更新首页数据
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

			// 获取搜索关键字
			uni.$on('getSearchResult', this.getSearchResult);
		},
		methods: {
			/**
			 * 根据搜索内容 查询数据
			 */
			getSearchResult(data) {
				this.searchConenxt = data.input;
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
			keepOut: (()=>{
				let num = 0;
				return async function(){
					num++;
					if (!(num % 2)) return;
					this.selectorQuery().select('.index_nav').fields({
						rect: true
					}, data => {
						this.hideTableBar = false;
						let top = data.top - 68;
						if (top < 0 && top > -36) {
							this.top = Math.abs(top)*32/36;
						} else {
							this.hideTableBar = true;
							if (top >= 0) {
								this.top = 0;
							} else this.top = 32;
						}
					}).exec();
				}
			})(),
			/**
			 * 监听页面滚动
			 */
			emitScroll(e) {
				this.keepOut();
			},
			/**
			 * 更新切换序号
			 */
			onSelect(i){
				this.listClassNumber = i;
			}
		},
		onShow() {
			this.isUpdateData = true;
			let timer = setTimeout(() => {
				this.isUpdateData = false;
				clearTimeout(timer);
			}, 1000)
		}
	}
</script>

<style scoped lang="scss">
	.u-table-bar{
		position: fixed;
		left: 0;
		z-index: 9;
	}
	.swiper_main{
		width: 100vw;
		height: calc(100vh - 68px);
		.section {
			position: relative;
			flex-direction: column;
			align-items: center;
			.class_nav{
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
			.shade{
				position: absolute;
				top: 0;
				left: 0;
				width: 750rpx;
				height: 100%;
			}
		}
		.swItem{
			margin-top: 32px;
		}
	}
	.scroll-y {
		height: calc(100vh - 68px);
	}
</style>
