<template>
	<view class="box">
		<view class="head fx">
			<text class="title">{{value}}</text>
			<view class="more" @tap="conditionFind">
				<text>更多</text>
				<text class="iconfont">&#xe601;</text>
			</view>
		</view>
		<view class="list fx">
			<uOption :value="value" :cuClass="true" v-for="(value, i) in listData" :key="i" />
		</view>
	</view>
</template>

<script>
	import uOption from './option.vue'
	
	export default {
		components: {uOption},
		data(){
			return {
				listData: []
			}
		},
		props: ['value', 'selectArrValue', 'isUpdateData', 'toPageMain'],
		created() {
			this.initialize();
		},
		methods: {
			/**
			 * 请求渲染数据
			 */
			initialize(){
				// 获取地址 并拼接
				let position = this.getStoreGetter('location');
				
				let val = this.selectArrValue;
				if (val === '其他热门推荐课程') val = 'other';

				this.fetch({
					method: 'post',
					url: 'curri/indexlist.do',
					data: {
						search: val,
						address: position.provincialLevel,
						courseThreeAddress: position.cityLevel,
					}
				}).then(([rej, result])=>{
					let res = result.data;
					// 取res数组中的前五项数据 大于5则filter过滤反之直接赋值
					this.listData = res.length > 4 ? res.filter((item, index)=>{
						return index < 4;
					}) : res;
				});
			},
			// 课程跳转并附加查询条件
			conditionFind(){
				this.$parent.$parent.$emit('toPage', this.value.slice(0, 2));
			}
		},
		watch: {
			isUpdateData(v){
				if (v) {
					this.initialize();
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.box{
		width: 690rpx;
		.head{
			justify-content: space-between;
			padding: 30rpx 0;
			.title{
				color: $col-333;
			}
			.more{
				font-size: 24rpx;
				color: $col-666;
			}
		}
		.list{
			justify-content: space-between;
			flex-wrap: wrap;
		}
	}
</style>