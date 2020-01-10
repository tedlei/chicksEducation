<template>
	<view class="st_app fx" v-if="topListNum">
		<template v-for="(item,i) of selList">
			<view class="st_view fx" v-if="item" :key='i' @tap="clickSel(i)">
				<text :class="i===name?'selColor':''">{{item.title}}</text>
				<view class="st_icon" v-if="i==='price'">
					<text class="iconfont i1" :class="item.sort==='ASC'?'iconColor':''">&#xe601;</text>
					<text class="iconfont i2" :class="item.sort==='DESC'?'iconColor':''">&#xe601;</text>
				</view>
			</view>
		</template>
		{{isPrice(topListNum)}}
	</view>
</template> 	

<script>
export default {
	props:['topListNum'],
	data() {
		return {
			selList:{
				synthesize:{title:'综合'},
				hot:{title:'热门'},
				price:{title:'价格',sort:''},
				filtrate:{title:'筛选',url:''}
			},
			obj:{title:'价格',sort:''},
			name:'synthesize',
		}
	},
	methods: {
		//点击排序时
		clickSel(str){
			if(str==='filtrate'){
				//跳转
				return
			}
			this.name = str;
			let price = this.selList.price
			let sort = price?price.sort:'';
			let obj = {popular:'1',sort:''};
			if(str==='hot')obj.popular = '2'
			if(str==='price'){
				let val = sort?(sort==='ASC'?'DESC':'ASC'):'ASC'; 
				price.sort = val;
				obj.popular = '';
				obj.sort = val;
			}else{
				if(price)price.sort = '';
				obj.sort = '';
			}
			this.$emit('clickSortord',obj);
		},
		isPrice(){
			let num = this.topListNum;
			let sl = this.selList;
			if(this.topListNum!==1){
				sl.price = null;
			}else{
				sl.price = this.obj; 
			}
			return ''
		}
	}
}
</script>

<style scoped lang="scss">
.st_app{
	width: 100%;
	height: 70rpx;
	padding:0 29rpx;
	background-color: $col-f5;
	border-bottom: 2rpx solid $col-e5;
	justify-content: space-between;
	.st_view{
		height: 70rpx;
		padding:0 29rpx; 
		font-size: 32rpx;
		color: $col-333;
		align-items: center;
		.selColor{
			color: $col-main;
		}
		.st_icon{
			margin-left: 4rpx;
			width: 24rpx;
			height:36rpx;
			position: relative;
			text{
				font-size: 20rpx;
				position: absolute;
			}
			.i1{
				transform: rotate(-90deg);
				top: -4rpx; 
				left: 8.5rpx;
			}
			.i2{
				transform: rotate(90deg);
				bottom: -4rpx;
				left: 1.7rpx ;
			}
			.iconColor{
				color:$col-main;
			}
		}
	}
}
</style>
