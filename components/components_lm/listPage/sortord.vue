<template>
	<view class="st_app fx" v-if="topListNum">
		<template v-for="(item,i) of selList">
			<view class="st_view fx" v-if="item" :key='i' @tap="clickSel(i,item.url)">
				<text :class="i===name?'selColor':''">{{item.title}}</text>
				<view class="st_icon" v-if="i==='price'">
					<text class="iconfont i1" :class="item.sort==='ASC'?'iconColor':''">&#xe601;</text>
					<text class="iconfont i2" :class="item.sort==='DESC'?'iconColor':''">&#xe601;</text>
				</view>
			</view>
		</template>
	</view>
</template> 	

<script>
export default {
	props:['topListNum','selObj'],
	data() {
		return {
			selList:{
				synthesize:{title:'综合'},
				hot:{title:'热门'},
				price:{title:'价格',sort:''},
				filtrate:{title:'筛选',url:'/pages/page_lm/listPage/filtrate/filtrate'}
			},
			obj:{title:'价格',sort:''},
			obj1:{title:'热门'},
			name:'synthesize',
		}
	},
	created() {
		let num = this.topListNum;
		let sl = this.selList;
		if(num!==1) sl.price = null;
		else sl.price = this.obj; 
		if(num===4) sl.hot = null;
		else sl.hot = this.obj1;
	},
	methods: {
		//点击排序时
		clickSel(str,url){
			let so = this.selObj;
			if(str==='filtrate'){
				this.push({url:url+"?selObj="+JSON.stringify(so)+'&typeNum='+this.topListNum});
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
		}
	}
}
</script>

<style scoped lang="scss">
.st_app{
	width: 100%;
	height: 35px;
	padding:0 29rpx;
	background-color: $col-f5;
	border-bottom: 1px solid $col-e5;
	justify-content: space-between;
	.st_view{
		height: 35px;
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
			height:18px;
			position: relative;
			text{
				font-size: 20rpx;
				position: absolute;
			}
			.i1{
				transform: rotate(-90deg);
				top: -1px; 
				left: 8.5rpx;
			}
			.i2{
				transform: rotate(90deg);
				bottom: -1px;
				left: 1.7rpx ;
			}
			.iconColor{
				color:$col-main;
			}
		}
	}
}
</style>
