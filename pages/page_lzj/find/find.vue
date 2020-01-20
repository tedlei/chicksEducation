<template>
	<view class="find">
		<uHeader></uHeader>
		<view class="find-content">
			<text class="title">为您推荐</text>
			<view class="list fx">
				<view class="fx option" v-for="(item, i) in dataList" :key="i">
					<image src="../../../static/image/default.png" mode=""></image>
					<text class="ellipsis">{{item.schoolTopic}}</text>
					<text class="ellipsis">发布者：{{item.schoolAuthor}}</text>
				</view>
			</view>
		</view>
		<uni-load-more :status="status" :content-text="contentText" />
	</view>
</template>

<script>
	import uHeader from '../../../components/components_lzj/index/header/header.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"

	export default {
		components: {uHeader, uniLoadMore},
		data() {
			return {
				status: 'more',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				dataList: [],
				index: 0
			}
		},
		async mounted(){
			uni.$on('getSearchResult', this.getDataList);
			
			this.closePullDownRefresh();
			this.dataList = await this.getDataList();
		},
		methods: {
			/**
			 * 获取搜索结果并调取接口
			 */
			getDataList(input = ''){
				return new Promise(reslove=>{
					// type:"",
					// topic:'',   // 搜索内容
					// index:"0",   // 分页   
					// status:'1',   //资讯状态
					// pageSize:"10",    //每页条数
					// port:'' //资讯分类 
					this.fetch({
						url: 'schoolMessage/getMessage.do',
						method: 'POST',
						data: {
							type: '',
							status: '1',
							pageSize: '10',
							index: this.index.toString(),
							topic: input,
							port: '1'
						},
						success: (res) => {
							this.index++;
							reslove(res.data.list);
						}
					}, 1);
				})
			},
			/**
			 * 关闭下拉刷新
			 */
			closePullDownRefresh(){
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];  
				const currentWebview = page.$getAppWebview();
				currentWebview.setStyle({  
				  pullToRefresh: {  
				    support: false,  
				    style: plus.os.name === 'Android' ? 'circle' : 'default'  
				  }  
				});
			}
		},
		// 触底刷新
		async onReachBottom() {
			this.status = 'loading';
			this.getDataList();
			let data = await this.getDataList();
			setTimeout(()=>{
				if (data.length) {
					this.dataList = this.dataList.concat(data);
					this.status = 'more';
				} else this.status = 'noMore';
			}, 300)
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
