<template>
	<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="swiper">
		<swiper-item v-for="(item, index) in swiperImages" :key="index">
			<image :src="item.pic"></image>
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		data() {
			return {
				swiperImages: []
			}
		},
		created() {
			this.getSwiperImages();
		},
		methods: {
			async getSwiperImages(){
				this.swiperImages = await this.getAdvertisingData(4);
			}
		}
	}
</script>

<style scoped lang="less">
	.swiper{
		width: 100vw;
		image{
			width: 100vw;
		}
	}
</style>
