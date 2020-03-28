<template>
	<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="swiper" :circular="true">
		<swiper-item v-for="(item, index) in swiperImages" :key="index">
			<navigator :url="item.url"><image :src="item.pic"></image></navigator>
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		data() {
			return {
				swiperImages: [],
				aL: [false, false, false, false, false]
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

<style scoped lang="scss">
	.swiper{
		width: 100vw;
		image{
			position: absolute;
			left: 50%;
			height: 100%;
			transform: translateX(-50%);
		}
	}
</style>
