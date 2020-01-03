<template>
	<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
		<swiper-item v-for="(item, index) in swiperImages" :key="index" class="swiper">
			<image :src="item"></image>
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		data() {
			return {
				swiperImages: [
					'https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/05/06/ChMkJl4BcxiIC3kJAASB9yN2nOYAAv6zwLHqt0ABIIP059.jpg',
					'https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/05/06/ChMkJl4BcxiIC3kJAASB9yN2nOYAAv6zwLHqt0ABIIP059.jpg',
					'https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/05/06/ChMkJl4BcxiIC3kJAASB9yN2nOYAAv6zwLHqt0ABIIP059.jpg',
					'https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/05/06/ChMkJl4BcxiIC3kJAASB9yN2nOYAAv6zwLHqt0ABIIP059.jpg',
					'https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/05/06/ChMkJl4BcxiIC3kJAASB9yN2nOYAAv6zwLHqt0ABIIP059.jpg'
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="less">
	.swiper{
		image{
			width: 100vw;
		}
	}
</style>
