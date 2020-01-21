<template>
	<view class="sd_app fx pfAllScreen">
		<HeadPage @topSkip="topSkip" title=" "></HeadPage>
		<scroll-view scroll-y="true" class="sd_scro" :scroll-top="setRollTop" @scroll="scroNum">
			<topImage :image="schoolDetail&&schoolDetail.schoolImage"></topImage>
			<view class="sd_main" v-if="schoolDetail">
				<view class="sd_curr_name fx">
					<view class="sdName ellipsis">{{schoolDetail.organizationName}}</view>
					<text class="iconfont" :class="schoolIsAttention?'iconColor':''"
						@tap="clickAttention(schoolId,isLoad)">{{schoolIsAttention?'&#xe63b;':'&#xe61f;'}}</text>
				</view>
				<view class="sd_ul">联系电话：400-12345678</view>
				<view class="sd_location fx" @tap="clickLoca(schoolDetail.schoolAddress)">
					<text class="iconfont">&#xe634;</text>
					<view class="sd_text sd_flex1 ellipsis">{{schoolDetail.schoolAddress}}</view>
					<view class="sd_text">
							{{getLocaType==='1'?'正在获取定位':getLocaType==='2'?'距您'+locationNum+'km':'获取定位失败'}}
					</view>
				</view>
				
				<!-- 选择栏 -->
				<schoolSelList @onSel="onSel" :num='selNum'></schoolSelList>
				
				<view v-show="selNum===0">
					<!-- 优惠卷 -->
					<coli @clickOpen='clickOpen' :schoolIsAttention="schoolIsAttention" 
					 :userId = "userInfo&&userInfo.user.id"	:schoolId="schoolId"></coli>
					<view v-show="!couponOpen">
						<!-- 推荐课程 -->
						<more title="课程" :num='1' @clickMore="clickMore"></more>
						<curriculum :reco='true' :schoolId="schoolId"></curriculum>
						
						<!-- 推荐教师 -->
						<more title="教师" :num='2' @clickMore="clickMore"></more>
						<teacher :reco='true' :schoolId="schoolId"></teacher>
						
						<!-- 相册 -->
						<more title="相册" :num='3' @clickMore="clickMore"></more>
						<albumList :reco='true' :schoolId="schoolId"></albumList>
						
						<!-- 学校简介 -->
						<more title="学校简介" :isRight="true"></more>
						<view class="sd_intro" v-html="schoolDetail.schoolIntroduction"></view>
					</view>
				</view>
				
				<view v-show="selNum===1">
					<more title="全部课程" :isRight="true"></more>
					<curriculum :schoolId="schoolId"></curriculum>
				</view>
				<view v-show="selNum===2">
					<more title="全部教师" :isRight="true"></more>
					<teacher :schoolId="schoolId"></teacher>
				</view>
				<view v-show="selNum===3">
					<more title="全部相册" :isRight="true"></more>
					<albumList :schoolId="schoolId"></albumList>
				</view>
				<view v-show="selNum===4">
					<more title="全部资讯" :isRight="true"></more>
					<informationList :schoolId="schoolId"></informationList>
				</view>
			</view> 
		</scroll-view>
		<bottomBtn @clickLeft="clickLeft" type="school" leftTitle="在线咨询"></bottomBtn>
	</view>
</template>

<script>
import HeadPage from '../../../components/components_lm/detailPage/headPage.vue'
import topImage from '../../../components/components_lm/detailPage/topImage.vue'
import schoolSelList from '../../../components/components_lm/detailPage/schoolDetail/schoolSelList.vue'
import coli from '../../../components/components_lm/detailPage/schoolDetail/coupon/couponList.vue'
import more from '../../../components/components_lm/detailPage/schoolDetail/more.vue'
import curriculum from '../../../components/components_lm/detailPage/schoolDetail/curriculum.vue'
import teacher from '../../../components/components_lm/detailPage/schoolDetail/teacher.vue'
import albumList from '../../../components/components_lm/detailPage/schoolDetail/album/albumList.vue'
import informationList from '../../../components/components_lm/detailPage/schoolDetail/informationList.vue'
import bottomBtn from '../../../components/components_lm/detailPage/bottomBtn.vue'
export default {
	components:{
		HeadPage, //头部
		topImage,   //图片
		schoolSelList,   //选择栏
		coli,  //优惠卷
		more,   //列表分类
		curriculum,  //课程列表
		teacher,  //教师列表
		albumList,   //图片列表
		informationList,  //资讯列表
		bottomBtn  //底部按钮
	},
	data() {
		return {
			schoolId:'',   //学校id
			userInfo:null,  //用户数据
			schoolDetail:null,   //学校数据
			recoCurrList:[],   //推荐课程列表
			recoTeacList:[],   //推荐课程列表
			currList:[],   //课程列表
			teacList:[],   //教师列表
			selNum:0,  //列表选择项
			couponOpen:false,  //true：展开   false： 关闭
			closeList:[],   //优惠卷关闭时
			setRollTop:0,  //设置滚动位置
			rollTop:0,   //滚动的位置
			
			schoolIsAttention:false,   //是否关注
			isLoad:false,   //是否查询到课程
			
			locationNum:0,   //距离
			getLocaType:'1', //获取定位 1：进行中  2.获取成功  3获取失败
		}
	},
	onLoad(e) {
		let ui = this.getItemSync('userInfo');
		let id = e.id;
		this.schoolId = id;
		this.userInfo = ui
		this.getSchoolDetail(id);
		if(ui){
			this.setchIsGz(id);
		}
	},
	methods: {
		//获取学校详情
		getSchoolDetail(userid){
			let url = "schooluser/getSh.do";
			this.fetch({url,data:{userid},method:'post'},1).then((res)=>{
				this.isLoad = true;
				this.schoolDetail = res[1].data;
				this.getLocation();
			})
		},
		
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
		
		//计算距离
		distance(latd,lond){
			let _then = this;
			let item = _then.schoolDetail;
			if(latd===0&&lond===0)return;
			let data = {
				address:item.schoolAddress,   //详细地址
				city:'',   //城市名
				output:'json',  //输格式类型
				key:'8olmnvqZsoP5NDfBMROFmK419QykayO4'   //密钥
			}
			_then.fetch({url:'',data,method:'get'},6).then(res=>{
				let {lng,lat} = res[1].data.result.location;
				var ptObj1 = new plus.maps.Point( lond, latd );
				var ptObj2 = new plus.maps.Point( lng, lat );
				void plus.maps.Map.calculateDistance( ptObj1, ptObj2,res=>{
					_then.getLocaType = '2'
					_then.locationNum = (res.distance/1000).toFixed(1);
				},()=>{
					_then.getLocaType = '3'
				});
			})
		},
		
		
		
		//点击地址时
		clickLoca(str){
			this.push({url:'/pages/page_lm/map/map?location='+str})
		},
		
		//当选择时
		onSel(num){
			this.selNum = num;
		},
		
		//点击展开关闭
		clickOpen(boo){
			this.setRoll()
			this.couponOpen = boo;
		},
		
		//点击跟多时
		clickMore(num){
			this.setRoll()
			this.selNum = num*1;
		},
		
		//设置位置
		setRoll(){
			this.setRollTop = this.rollTop;
			this.$nextTick(function() {
				this.setRollTop=0;
			})
		},
		
		//滚动时触发
		scroNum(e){
			 this.rollTop = e.detail.scrollTop;
		},
		
		//在线咨询
		clickLeft(){
			let {isLoad,userInfo} = this
			if(!isLoad)return 
			if(!userInfo){
				this.message('请登录')
				return
			}
			console.log('在线咨询')
		},
		
		//查询是否关注
		setchIsGz(schoolid){
			let userid = this.userInfo.user.id;
			let url = 'attention/findByfollow.do';
			this.fetch({url,data:{userid,schoolid},method:'post'},4).then(res=>{
				this.schoolIsAttention = res[1].data.success;
			})
		},
		
		//加关注
		clickAttention(schoolid,isLoad){
			let ui = this.userInfo;
			let url = 'attention/add.do';
			if(!isLoad)return;
			if(!ui){
				this.message('请登录')
				return
			}
			this.fetch({url,data:{userid:ui.user.id,schoolid},method:'post'},4).then(res=>{
				let boo = res[1].data;
				this.schoolIsAttention = boo;
				this.message(boo?'关注成功':'关注失败');
			})
		}
	}
}
</script>

<style scoped lang="scss">
.sd_app{
	flex-direction: column;
	.sd_scro{
		flex: 1;
		overflow: hidden;
		.sd_main{
			width: 750rpx;
			border-radius: 10px;
			background-color: $col-fff;
			position: relative;
			top: -100rpx; 
			.sd_curr_name{
				padding: 0 20px;
				height: 100rpx;
				justify-content: space-between;
				align-items: center;
				.sdName{
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
			.sd_ul{
				margin-left: 30rpx;
				font-weight:bold;
				color: $col-main;
			}
			.sd_location{
				padding:16rpx 30rpx;
				padding-bottom: 0;
				color: $col-333;
				align-items: center;
				.iconfont{
					font-size: 22px;
					color: $col-main;
				}
				.sd_text{
					margin-left: 5px;
				}
				.sd_flex1{
					max-width: 420rpx;
				}
			}
			.sd_intro{
				padding:20rpx 30rpx;
			}
		}
	}
}
</style>
