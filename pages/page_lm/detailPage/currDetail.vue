<template>
	<view class="cd_app fx pfAllScreen">
		<HeadPage @topSkip="topSkip" title="进入学校"></HeadPage>
		<scroll-view scroll-y="true" class="cd_scro">
			<topImage></topImage>
			<view class="cd_main" v-if="currDetail">
				<view class="cd_curr_name fx">
					<view class="cdName ellipsis">{{currDetail.courseName}}</view>
					<text class="iconfont iconColor">{{true?'&#xe61f;':'&#xe63b;'}}</text>
				</view>
				<view class="cd_ul schStyle ellipsis">{{currDetail.organizationName}}</view>
				<view class="cd_ul ellipsis">课程价格：{{currDetail.coursePrice}}</view>
				<view class="cd_ul ellipsis">上课时间：{{currDetail.courseTime}}</view>
				<view class="cd_ul ellipsis">学习周期：{{currDetail.coursePeriod}}</view>
				<view class="cd_ul ellipsis">课程等级：{{currDetail.courseGrade}}</view>
				<view class="cd_ul siteStyle ellipsis active" @tap="clickSite(site(currDetail))">上课地址：{{site(currDetail)}}</view>
				<view class="cd_ul pd22 schStyle ellipsis">教学目标</view>
				<view class="cd_ul pl20">{{currDetail.courseTarget}}</view>
				<view class="cd_ul pd22 schStyle ellipsis">课程介绍</view>
				<view class="cd_ul referral" v-html="currDetail.courseContent"></view>
			</view>
		</scroll-view>
		<bottomBtn @clickLeft="clickLeft" @clickRight="clickRight" leftTitle="在线咨询" rightTitle="课程预约"></bottomBtn>
	</view>
</template>

<script>
import HeadPage from '../../../components/components_lm/detailPage/headPage.vue'
import topImage from '../../../components/components_lm/detailPage/topImage.vue'
import bottomBtn from '../../../components/components_lm/detailPage/bottomBtn.vue'
export default {
	components:{HeadPage,topImage,bottomBtn},
	data() {
		return {
			currDetail:null   //课程数据
		}
	},
	onLoad(e) {
		this.getCurrDetail(e.id);
	},
	methods: {
		//获取课程列表
		getCurrDetail(id){
			let url = 'curri/findById.do';
			let data = {sourceType:'1',id}
			this.fetch({url,data,method:'get'},1).then(res=>{
				this.currDetail = res[1].data[0]
			})
		},
		
		//获取课程地址
		site(item){
			let {courseOneAddress,courseTwoAddress,courseThreeAddress,courseAddress} = item;
			let str = courseOneAddress+(courseOneAddress===courseTwoAddress?'':courseTwoAddress)+courseThreeAddress+courseAddress
			return str;
		},
		
		//当点击地址时
		clickSite(site){
			console.log(site);
		},
		
		//在线资讯
		clickLeft(){
			console.log('在线资讯')
		},
		
		//课程预约
		clickRight(){
			console.log('课程预约')
		}
	}
}
</script>

<style scoped lang="scss">
.cd_app{
	flex-direction: column;
	.cd_scro{
		flex: 1;
		overflow: hidden;
		.cd_main{
			width: 750rpx;
			border-radius: 40px;
			background-color: $col-fff;
			position: relative;
			top: -100rpx;
			// border-top-left-radius: 40px;
			// border-top-right-radius: 40px;
			.cd_curr_name{
				padding: 0 20px 0 15px;
				height: 100rpx;
				justify-content: space-between;
				align-items: center;
				.cdName{
					width: 540rpx;
					font-size: 22px;
					color: $col-333;
				}
				.iconfont{
					font-size: 28px;
				}
				.iconColor{
					color: $col-main;
				}
			}
			.cd_ul{
				width: 100%;
				padding: 9px 30rpx;
				box-sizing: border-box;
				color: $col-333;
			}
			.schStyle{
				font-weight:bold;
			}
			.siteStyle{
				color: $col-main;
			}
			.pd22{
				padding-top: 22px;
			}
			.pl20{
				// text-indent:2em;
				line-height:28px;
			}
		}
	}
}
</style>
