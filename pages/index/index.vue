<template>
	<view>
		<headerNav></headerNav>
		<uSwiper></uSwiper>
		<view class="class_nav fx">
			<view v-for="(item, i) in class_nav_data" :key="i">
				<text class="iconfont">{{item.icon}}</text>
				<text class="name">{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import headerNav from '../../components/components_lzj/index/header/header.vue'
	import uSwiper from '../../components/components_lzj/index/swiper/swiper.vue'
	export default {
		components: {headerNav, uSwiper},
		data() {
			return {
				class_nav_data: [
					{
						icon: '\ue63b',
						name: '课程'
					},
					{
						icon: '\ue63b',
						name: '学校'
					},
					{
						icon: '\ue63b',
						name: '名师'
					},
					{
						icon: '\ue63b',
						name: '资讯'
					},
					{
						icon: '\ue63b',
						name: '分类'
					}
				
				] 
			}
		}
	}
</script>

<style scoped lang="less">
	.class_nav{
		justify-content: space-around;
		.iconfont{
			display: block;
		}
		.name{
			color: var(--col333);
		}
	}
</style>
