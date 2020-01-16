<template>
	<view class="at_app fx pfAllScreen">
		<hb title="课程预约"></hb>
		<view class="at_inp fx ">
			<view class="at_text">电话</view>
			<view class="at_input">
				<input type="number" focus v-model="order.phone"/>
			</view>
		</view>
		<view class="at_inp fx ">
			<view class="at_text">姓名</view>
			<view class="at_input">
				<input type="text" v-model="order.name"/>
			</view>
		</view>
		<view class="at_inp fx ">
			<view class="at_text">留言</view>
			<view class="at_input at_area">
				<textarea maxlength='200' v-model="order.leaveWord"/>
				<text class="at_textNum">{{textNum()}}字</text>
			</view>
		</view>
		<view class="at_inp fx ">
			<view class="at_text">验证码</view>
			<view class="at_input at_yzm">
				<input type="text" v-model="verify"/>
			</view>
			<view class="at_yzm_view fx" @tap="createVerifyCode">
				<template v-show="yzmList">
					<text class="at_yzm_text" v-for="(item,i) of yzmList"	:key="i" 
						:style="{'transform':'rotate('+item.num+'deg)'}">{{item.title}}</text>
				</template>
				<text style="font-size: 18px;" v-show="!yzmList">正在获取</text>
			</view>
		</view>
		<view class="at_btn active" @tap="clickAffirm">确认预约</view>
	</view>
</template>

<script>
import hb from '../../../components/components_lm/detailPage/headBack.vue'
export default {
	components:{hb},
	data() {
		return {
			order:{ 
				phone:'',  //电话
				name:'撒旦脚',   //名字
				leaveWord:'数据库的湖北省丹江口毫不放松的尽快回复吧',   //留言
			},
			verify:'',   //验证码
			yzmList:null,   //验证码
			
			schoolId:'',    //学校id
			type:'1',    //1：课程   2：教师
			userId:'',    //用户信息
			id:'',    //课程或教师id
		}
	},
	onLoad(e) {
		let {schoolId,type,id} = e;
		let {userId,phone} = this.getItemSync('userInfo').user;
		this.userId = userId
		this.order.phone = phone
		this.schoolId = schoolId;
		this.type = type;
		this.id = id;
		this.createVerifyCode();
	},
	methods: {
		//生成动态验证码
		createVerifyCode(){
			this.yzmList = null;
			let list = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L',
			'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f',
			'g','h','i','g','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
			let listObj = [];
			for (let i = 0; i < 4; i++) {
				let num1 = parseInt(Math.random()*list.length);
				let num2 = parseInt(Math.random()*110-55);
				listObj.push({title:list[num1],num:num2});
			}
			setTimeout(()=>{
				this.yzmList = listObj
			},500)
		},
		
		//计算剩余字数
		textNum(){
			return 200-this.order.leaveWord.length;
		},
		
		//点击确认时
		clickAffirm(){
			let {order,type,userId,id,schoolId,verify,yzmList} = this
			let {phone,name,leaveWord} = order;
			// let [a,b,c,d] = yzmList;
			let str = '';
			if(!phone||phone.length<11){
				this.message('电话号码为空或格式错误');
				return
			}
			if(!name){
				this.message('请输入姓名');
				return
			}
			if(!leaveWord){
				this.message('请输入留言');
				return
			}
			if(!verify||verify.length<4){
				this.message('验证码为空或格式错误');
				return
			}
			for(let item of yzmList){
				str += item.title
			}
			if(verify.toUpperCase()!==str.toUpperCase()){
				this.message('验证码错误,请从新输入');
				this.verify = '';
				return
			}
			let url = '/course/appOin.do';
			let IP = 3
			let data = {
				appointment:{
					appoMessage:leaveWord, //预约消息
					userName:name,    //用户姓名
					appoPhone:phone,   //预约电话
					schoolId,   //学校id
					appoName:type  //预约分类    
				},
				courseAppointment:{
					userId:userId,     //用户id
					courseId:id    //课程id
				}
			}
			if(type==='2'){
				url = '/appointment/add.do';
				IP = 5;
				delete data.courseAppointment;
				data.teacherAppointment = {
					 userId:userId,     //用户id
					 teacherId :id
				}
			}
			this.fetch({url,data,method:'post'},IP).then(res=>{
				let {message,success} = res[1].data;
				this.message(message);
				if(success){
					if(type==='1') {
						uni.$emit('updateOrderCurr',true);
					}else console.log('预约教师');
					setTimeout(()=>{
						this.pop();
					},1500)
				}
			})
			
		}
	}
}
</script>

<style scoped lang="scss">
.at_app{
	flex-direction: column;
	background-color: $col-f5;
	.at_inp{
		padding:30rpx;
		padding-bottom: 0;
		align-items: center;
		.at_text{
			width: 100rpx;
			color: $col-333;
			font-weight:bold;
		}
		.at_input{
			width:550rpx;
			height:44px;
			margin-left: 26rpx;
			padding-left: 20rpx;
			background-color: $col-fff;
			border:1px solid $col-e5;
			border-radius:5px;
			input{
				height: 100%;
			}
		}
		.at_area{
			height: 200px;
			padding:20rpx;
			position: relative;
			textarea{
				width: 100%;
			}
		}
		.at_textNum{
			font-size: 12px;
			color: $col-999;
			position: absolute;
			bottom: 5px;
			right: 5px;
		}
		.at_yzm{
			width: 290rpx;
		}
		.at_yzm_view{
			width: 242rpx;
			height: 44px;
			margin-left: 20rpx;
			border-radius: 5px;
			background-color: $col-main;
			justify-content: center;
			align-items: center;
			font-size: 22px;
			color:$col-fff;
			.at_yzm_text+.at_yzm_text{
				margin-left: 10px;
			}
		}
	}
	.at_btn{
		width: 750rpx;
		height: 98rpx;
		background-color: $col-main;
		text-align: center;
		line-height: 98rpx;
		font-size: 18px;
		color: $col-fff;
		position: absolute;
		bottom: 0;
	}
}
</style>
