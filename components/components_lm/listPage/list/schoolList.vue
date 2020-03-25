<template>
	<view class="cl_app">
		<view class="clSchName fx" @tap="clickSchool">
			<image class="clImg" 
				:src="item.schoolImage||require('../../../../static/image/default.png')"></image>
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
			<view class="clLeft" @tap="clickSite(item.schoolAddress)">
				<text class="iconfont">&#xe634;</text>
				<text class="clt1">{{fontSize(item)}}</text>
				<text class="clt1">
				{{getLocaType==='1'?'正在获取定位':getLocaType==='2'?'距您'+locationNum+'km':'获取定位失败'}}
				</text>
			</view>
			<view class="clRight" @tap="clickSchool">
				<text>进入学校</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props:['item'],
	data() {
		return {
			currList:[], 
			locationNum:0,   //距离
			getLocaType:'1', //获取定位 1：进行中  2.获取成功  3获取失败
			
			// latd:0,  //当前坐标
			// lond:0,
		}
	},
	created(){
		this.getLocation();
		this.getCurrList(this.item.id);
	},
	methods: {
		//获取定位
		getLocation(){
			uni.getLocation({success:success=>{
				let {latitude,longitude} = success;
				this.getLocaType = '2'
				this.distance(latitude,longitude);
			},fail:()=>{ 
				this.getLocaType = '3' 
				this.message('获取定位失败');
			}})
		},
		
		
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
			})
		},
		
		//到学校详情
		clickSchool(){
			let id = this.item.id
			this.push({url:'/pages/page_lm/detailPage/schoolDetail?id='+id})
		},
		
		//当点击地址时
		clickSite(site){
			this.push({url:'/pages/page_lm/map/map?location='+site})
		},
		
		//计算距离
		distance(latd,lond){
			let _then = this;
			let item = _then.item;
			if(latd===0&&lond===0)return;
			let data = {
				address:item.schoolAddress,   //详细地址
				city:'',   //城市名
				output:'json',  //输格式类型
				key:'8olmnvqZsoP5NDfBMROFmK419QykayO4'   //密钥
			}
			_then.fetch({url:'',data,method:'get'},6).then(res=>{
				let {lng,lat} = res[1].data.result.location;
				let X_PI = 3.14159265358979324 * 3000.0 / 180.0;
				let x = lng - 0.0065;
				let y = lat - 0.006; 
				let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
				let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
				lng = z * Math.cos(theta);
				lat = z * Math.sin(theta);
				var ptObj1 = new plus.maps.Point( lond, latd );
				var ptObj2 = new plus.maps.Point( lng, lat );
				void plus.maps.Map.calculateDistance( ptObj1, ptObj2,res=>{
					_then.locationNum = (res.distance/1000).toFixed(1);
				},()=>{
					_then.getLocaType = '3'
				});
			})
		}
	}
}
</script>

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
}
</style>
