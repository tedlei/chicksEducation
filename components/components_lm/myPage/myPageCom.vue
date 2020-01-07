<template>
	<view class="mpc_app" @longpress="LongPress">
		<view class="mpcImg" :class="selectNum===1?'mpcTeacher':''">
			<image :src="imgSrc(item,selectNum)" mode=""></image>
		</view>
		<view class="mapName">{{selectNum===0?item.courseName:item.organizationName}}</view>
		<view class="mapName mapM" v-if="selectNum===0">价格：￥<text>{{item.coursePrice}}</text>元</view>
		<view class="mapName" v-if="selectNum===1">{{item.teacherName}}</view>
		<view class="mapName mapM" v-if="selectNum===2">课程数：{{item.subjectNum}}</view>
		<view class="mpcTc fx" v-show="isShowTc">
			<view class="mpcTcBtn" hover-class="topTcBtn" @tap="topCancel(item.id,isgz,selectNum)">取消{{isgz==='gz'?'关注':'预约'}}</view>
		</view>
	</view> 
</template>

<script>
export default {
	props:['isTeacher','selectNum','isgz','item'],
	data() {
		return {
			isShowTc:false
		}
	},
	methods: {
		//判断是学校、课程还是教师
		imgSrc(obj,num){
			if(!obj)return
			switch(num){
				case 0 : return obj.courseImage; 
				break
				case 1 : return obj.teacherImage; 
				break
				case 2 : return obj.schoolImage; 
				break
			}
		},
		//长按方块时
		LongPress(){
			if(this.isShowTc)return
			this.isShowTc = true;
		},
		
		//点击取消时
		topCancel(id,isgz,num){
			this.$emit('topCancel',id,isgz,num);
		}
	}
}
</script>

<style scoped lang="less">
.mpc_app{
	width:336rpx;
	box-shadow:0px 3px 6px rgba(0,0,0,0.06);
	position: relative;
	.mpcImg{
		width: 100%;
		height: 238rpx;
		background: #eee;
		border-radius: 10rpx 10rpx 0 0;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.mpcTeacher{
		height: 428rpx;
	}
	.mapName{
		padding:14rpx 16rpx;
		font-size: 26rpx;
		color: var(--col-333);
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.mapM{
		color: #FD4309;
		text{
			font-weight: bold;
		}
	}
	.mpcTc{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
		background: rgba(0,0,0,0.3);
		.mpcTcBtn{
			width:200rpx;
			height:60rpx;
			background:var(--col-fff);
			border-radius:30rpx;
			text-align: center;
			line-height: 60rpx;
			color:var(--col-999);
		}
		.topTcBtn{
			background: #eee;
		}
	}
}
</style>
