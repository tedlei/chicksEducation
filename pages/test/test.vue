<template>
	<view style="height: 100vh;">
		<view v-for="(item, i) of 80" :key="i">
			<text>{{item}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		onReachBottom() {
			console.log(111);
		}
	}
</script>

<style>
	view{
		background-color: #007AFF;
	}
</style>
