<template>
<<<<<<< HEAD
	<view class="cl_app">
		<view class="clSchName fx">
			<image class="clImg" :src="item.schoolImage||require('../../../../static/image/default.png')"></image>
			<view class="clName ellipsis">{{item.organizationName}}</view>
			<!-- <view class="clBs">撒旦发射</view>
			<view class="clBs">撒旦发射</view> 暂时有用 -->
		</view>
		<view class="clCurrList fx">
			<template v-if="currList.length>0">
				<view class="clcUl" v-for="(item,i) of currList" :key="i">
					<image :src="item.courseImage"></image>
					<view class="clcName ellipsis">{{item.courseName}}</view>
				</view>
			</template>
			<view v-else class="clzw">暂无课程</view>
		</view>
		<view class="clBot fx">
			<view class="clLeft">
				<text class="iconfont">&#xe634;</text>
				<text class="clt1">{{fontSize(item)}}</text>
				<text class="clt1">距您5.01km</text>
			</view>
			<view class="clRight">
				<text>进入学校</text>
			</view>
=======
	<view class="cl_app">
		<view class="clSchName fx">
			<image class="clImg" :src="item.schoolImage||require('../../../../static/image/default.png')"></image>
			<view class="clName ellipsis">{{item.organizationName}}</view>
			<!-- <view class="clBs">撒旦发射</view>
			<view class="clBs">撒旦发射</view> 暂时有用 -->
		</view>
		<view class="clCurrList fx">
			<template v-if="currList.length>0">
				<view class="clcUl" v-for="(item,i) of currList" :key="i">
					<image :src="item.courseImage"></image>
					<view class="clcName ellipsis">{{item.courseName}}</view>
				</view>
			</template>
			<view v-else class="clzw">暂无课程</view>
		</view>
		<view class="clBot fx">
			<view class="clLeft">
				<text class="iconfont">&#xe634;</text>
				<text class="clt1">{{fontSize(item)}}</text>
				<text class="clt1">距您5.01km</text>
			</view>
			<view class="clRight">
				<text>进入学校</text>
			</view>
>>>>>>> 2de0f37acc56a0973e9542f1f203a67643853d80
		</view>
	</view>
</template>

<script>
<<<<<<< HEAD
export default {
	props:['item'],
	data() {
		return {
			currList:[],
		}
	},
	created(){
		this.getCurrList(this.item.id);
	},
	methods: {
		//处理字的长度
		fontSize(item){
			let str = item.schoolAddress;
			let num = str.length;
			if(num<=8)return str;
			else return str.slice(0,8)+'…';
		},
		
		//获取推荐课程列表
		getCurrList(id){
			let url = '/curri/schoolList.do';
			let data = {schoolId:id}
			this.fetch({url,data,method:'get'},1).then(res=>{
				this.currList = res[1].data.splice(0,3);
				console.log(res[1].data)
			})
		},
		
=======
export default {
	props:['item'],
	data() {
		return {
			currList:[],
		}
	},
	created(){
		this.getCurrList(this.item.id);
	},
	methods: {
		//处理字的长度
		fontSize(item){
			let str = item.schoolAddress;
			let num = str.length;
			if(num<=8)return str;
			else return str.slice(0,8)+'…';
		},
		
		//获取推荐课程列表
		getCurrList(id){
			let url = '/curri/schoolList.do';
			let data = {schoolId:id}
			this.fetch({url,data,method:'get'},1).then(res=>{
				this.currList = res[1].data.splice(0,3);
				console.log(res[1].data)
			})
		},
		
>>>>>>> 2de0f37acc56a0973e9542f1f203a67643853d80
		
	}
}
</script>

<<<<<<< HEAD
<style scoped lang="scss">
.cl_app{
	width: 690rpx;
	height: 430rpx;
	padding:26rpx 28rpx;
	background-color: $col-fff;
	border-radius: 10rpx;
	.clSchName{
		align-items: center;
		.clImg{
			width: 72rpx;
			height: 72rpx;
		}
		.clName{
			margin-left: 30rpx;
			flex: 1;
		}
		.clBs{
			width: 100rpx;
			height: 40rpx;
			background-color: #FFE4D6;
			border-radius: 10rpx;
			text-align: center;
			line-height: 40rpx;
			font-size: 20rpx;
			color: $col-main;
		}
	}
	.clCurrList{
		margin-top: 24rpx;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		.clcUl{
			width:200rpx;
			image{
				width: 100%;
				height: 156rpx;
				border-radius: 10rpx;
			}
			.clcName{
				margin-top: 4px;
				width: 100%;
				font-size: 14px;
				color:$col-333;
			}
		}
		.clzw{
			width: 100%;
			height: 204rpx;
			text-align: center;
			line-height: 204rpx;
			font-size: 36px;
			color: $col-ccc;
		}
	}
	.clBot{
		margin-top: 28rpx;
		justify-content: space-between;
		align-items: center;
		view{
			height: 56rpx;
			line-height: 56rpx;
			border-radius: 28rpx;
		}
		.clLeft{
			min-width: 400rpx;
			padding:0 16rpx;
			background-color: $col-f5;
			.iconfont{
				color: $col-main;
			}
			.clt1{
				margin-left: 10rpx;
				font-size: 24rpx;
				color:$col-333;
			}
		}
		.clRight{
			width: 160rpx;
			border:2rpx solid $col-main;
			background-color: $col-fff;
			text-align: center;
			font-size: 28rpx;
			color: $col-main;
		}
	}
=======
<style scoped lang="scss">
.cl_app{
	width: 690rpx;
	height: 430rpx;
	padding:26rpx 28rpx;
	background-color: $col-fff;
	border-radius: 10rpx;
	.clSchName{
		align-items: center;
		.clImg{
			width: 72rpx;
			height: 72rpx;
		}
		.clName{
			margin-left: 30rpx;
			flex: 1;
		}
		.clBs{
			width: 100rpx;
			height: 40rpx;
			background-color: #FFE4D6;
			border-radius: 10rpx;
			text-align: center;
			line-height: 40rpx;
			font-size: 20rpx;
			color: $col-main;
		}
	}
	.clCurrList{
		margin-top: 24rpx;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		.clcUl{
			width:200rpx;
			image{
				width: 100%;
				height: 156rpx;
				border-radius: 10rpx;
			}
			.clcName{
				margin-top: 4px;
				width: 100%;
				font-size: 14px;
				color:$col-333;
			}
		}
		.clzw{
			width: 100%;
			height: 204rpx;
			text-align: center;
			line-height: 204rpx;
			font-size: 36px;
			color: $col-ccc;
		}
	}
	.clBot{
		margin-top: 28rpx;
		justify-content: space-between;
		align-items: center;
		view{
			height: 56rpx;
			line-height: 56rpx;
			border-radius: 28rpx;
		}
		.clLeft{
			min-width: 400rpx;
			padding:0 16rpx;
			background-color: $col-f5;
			.iconfont{
				color: $col-main;
			}
			.clt1{
				margin-left: 10rpx;
				font-size: 24rpx;
				color:$col-333;
			}
		}
		.clRight{
			width: 160rpx;
			border:2rpx solid $col-main;
			background-color: $col-fff;
			text-align: center;
			font-size: 28rpx;
			color: $col-main;
		}
	}
>>>>>>> 2de0f37acc56a0973e9542f1f203a67643853d80
}
</style>
