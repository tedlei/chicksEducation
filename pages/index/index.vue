<template>
	<view class="index">
		<headerNav></headerNav>
		<view class="u-table-bar" :style="{top: top + 36 + 'px'}">
			<uTableBar @onSelect="onSelect" :settingNum.sync="listClassNumber"></uTableBar>
		</view>
		<swiper class="swiper_main" :current="listClassNumber" :duration="200">
			<swiper-item @touchmove.stop="()=>{}">
				<scroll-view :scroll-top="scrollTop" class="scroll-y" :scroll-y="true" @scroll="emitScroll">
					<view class="section fx">
						<view class="header-nav"></view>
						<uSwiper></uSwiper>
						<view class="index_nav">
							<view class="class_nav fx">
								<view v-for="(item, i) in class_nav_data" :key="i" @tap="changeListClassNumber(i)">
									<image :src="item.image"></image>
									<text class="name">{{item.name}}</text>
								</view>
							</view>
						</view>
									
						<!-- 主体内容 -->
						<uMian :isUpdateData.sync="isUpdateData" @toPage="toPage"></uMian>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item @touchmove.stop="()=>{}" class="swItem">
				<!-- 课程列表 -->
				<currList></currList>
			</swiper-item>
			<swiper-item @touchmove.stop="()=>{}" class="swItem">
				<!-- 学校列表 -->
				<schoolList></schoolList>
			</swiper-item>
			<swiper-item @touchmove.stop="()=>{}" class="swItem">
				<!-- 教师列表 -->
				<teacList></teacList>
			</swiper-item>
			<swiper-item @touchmove.stop="()=>{}" class="swItem">
				<!-- 资讯列表 -->
				<infoList></infoList>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import headerNav from '../../components/components_lzj/index/header/header.vue'
	import uSwiper from '../../components/components_lzj/index/swiper/swiper.vue'
	import uTableBar from '../../components/components_lm/listPage/tableBer.vue'
	import uMian from '../../components/components_lzj/index/main/main.vue'
	
	import currList from '../page_lm/listPage/currList.vue'
	import schoolList from '../page_lm/listPage/schoolList.vue'
	import teacList from '../page_lm/listPage/teacList.vue'
	import infoList from '../page_lm/listPage/infoList.vue'
	
	export default {
		components: {
			headerNav,
			uSwiper,
			uMian,
			uTableBar,
			currList,
			schoolList,
			teacList,
			infoList
		},
		data() {
			return {
				scrollTop: 0,
				top: 0,	// 分类导航栏top值
				oldClassNameScrollYBottom: 0,
				hideTableBar: false,	// 是否隐藏分类导航栏
				searchConenxt: '', // 搜索内容
				listClassNumber: 0,	// 显示类别序号
				isUpdateData: false,	// 是否更新首页数据
				firstNotUpdate: false, // 首次进入不触发onShow
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
			
			uni.$on('courseCategoryToCurrList', this.courseCategoryToCurrList);
		},
		methods: {
			/**
			 * 首页选中分类时 筛选条件后点击确定进入到首页中的课程列表
			 * @param {Object} obj
			 */
			courseCategoryToCurrList(obj){
				this.listClassNumber = 1;
				this.top = 32;
				// 避免点击一次之后再次点击时因scrollTop未改变而使滚动不生效
				this.scrollTop = this.scrollTop === 200 ? 201 : 200;
				
				// uni.$emit('selectClassify',obj);
			},
			/**
			 * 根据搜索内容 查询数据
			 */
			getSearchResult(data) {
				let listClassNumber = this.listClassNumber;
				let input = data.input
				switch(listClassNumber) {
					case 1:	// 传递给课程列表
						uni.$emit('currSearch',input)
						break;
					case 2:	// 传递给学校列表
						uni.$emit('schSearch',input)
						break;
					case 3:	// 传递给课教师列表
						uni.$emit('teacSeach',input)
						break;
					case 4:	// 传递给资讯列表
						uni.$emit('infoSeach',input);
						break;
					// not default
				}
				
				
				this.searchConenxt = input;
				
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
				this.input = '';
			},
			changeListClassNumber(i){
				i = i+1;
				
				if (i === 5) {
					this.push({
						url: '/pages/page_lzj/courseCategory/courseCategory'
					});
					return;
				}
				
				this.listClassNumber = i;
				this.scrollTop = this.scrollTop === 200 ? 201 : 200;
				this.top = 32;
			},
			/**
			 * '跳转' 到课程列表 
			 */
			toPage(v){
				switch(v){
					case 'curriculum':
						this.listClassNumber = 1;
						break;
					case 'school':
						this.listClassNumber = 2;
						break;
					default:
						uni.$emit('currConditionFind',v);
						this.listClassNumber = 1;
						break;
				}
				// 避免点击一次之后再次点击时因scrollTop未改变而使滚动不生效
				this.scrollTop = this.scrollTop === 200 ? 201 : 200;
				this.top = 32;
			}
		},
		onShow() {
			if (this.firstNotUpdate) {
				this.isUpdateData = true;
				let timer = setTimeout(() => {
					this.isUpdateData = false;
					clearTimeout(timer);
				}, 1000)
			} else {
				this.firstNotUpdate = true;
			}
		}
	}
</script>

<style scoped lang="scss">
	.index{
		background-color: $col-f5;
	}
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
