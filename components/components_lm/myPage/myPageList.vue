<template>
	<view class="mpl_app" :hover-class="item.isIcon&&!item.type?'':'topColor'" @tap="topUpdate(item,user)">
		<view class="mdc_ul fx">
			<view class="mdc_li">
				<text :class="item.type==='logout'?'fontColor':''">{{item.title}}</text>
				<text class="mdcText">{{sel(item,user)}}</text>				
			</view>
			<text class="iconfont" v-if="!item.isIcon">&#xe601;</text>
		</view>
	</view>
</template>

<script>
export default {
	props:['item','user'],
	data() {
		return {
		}
	},
	methods: {
		topUpdate(item,user){
			this.$emit('topUpdate',item,user)
		},
		sel(item,user){
			if(!user) return
			if(!item.fun) return user[item.key]?user[item.key]:'';
			if(item.fun==='birthday') return this.birthday(user.birthday);
			if(item.fun==='region') return this.region(user);
		},
		//地区处理
		region(obj){
			let str = (obj.oneDddress!==obj.twoDddress?obj.oneDddress+obj.twoDddress:obj.oneDddress)+obj.threeDddress
			return str?str:'';
		},
		//生日处理
		birthday(str){
			return str&&str.split(' ')[0]||''
		},
	}
}
</script>

<style scoped lang="scss">
.mpl_app{
	background-color: $col-fff;
	.mdc_ul{
		padding: 44rpx 28rpx;
		border-bottom: 2rpx solid #e5e5e5;
		justify-content: space-between;
		align-items: center;
		.mdc_li{
			font-size: 32rpx;
			color:$col-333;
			.fontColor{
				color:#f00;
			}
			.mdcText{
				margin-left: 24rpx;
				font-size: 28rpx;
				color:$col-666;
			}			
		}
	}
}
.topColor{
	background-color: #eee;
}
</style>
