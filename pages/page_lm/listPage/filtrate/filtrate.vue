<template>
	<view class="ft_app fx pfAllScreen">
		<HeadPage :isBtn="true" @topBack="topBack" title="筛选"></HeadPage>
		<scroll-view class="ft_scr" scroll-y="true">
			<view v-for="(item,i) of sList" :key="i">
				<SelList v-if="item.isShow" 
					:item="item" :i='i' @clickSel="clickSel"></SelList>	
			</view>
		</scroll-view>
		<view class="ftBtns fx">
			<view class="ftBtnLeft active" @tap="clickReset(typeNum)">重置</view>
			<view class="ftBtnRight active" @tap="affirm">确认</view>
		</view>
	</view>
</template>

<script>
import HeadPage from '../../../../components/components_lm/headPage.vue'
import SelList from '../../../../components/components_lm/listPage/filtrate/selList.vue'
import filtList from './data.js';
import ccl from '../../../../static/js/chinaCityList.js'
export default { 
	components:{HeadPage,SelList},
	data() {
		return {
			sList:[],    //所有选择条件
			currSizer:{    //当筛选课程时
				category:{i:'0',num:0,value:''},
				address:{i:'3',num:0,value:''},
				time:{i:'4',num:0,value:''},
				level:{i:'5',num:0,value:''}
			},
			schoolSizer:{   //筛选学校时
				type:{i:'6',num:0,value:''},
				thressaddress:{i:'7',num:0,value:''}
			},
			teacSizer:{   //筛选教师时
				letter:{i:'8',num:0,value:''}
			},
			infoSizer:{   //筛选资讯时
				type:{i:'9',num:0,value:''}
			},
			typeNum:'',   //1：课程   2：学校   3：教师   4：资讯
		}
	},
	onLoad(e) {
		let {selObj,typeNum} = e;
		let condList = filtList.condList;
		this.typeNum = typeNum;
		condList[3].type = condList[3].type.concat(ccl["0_3_0"]);
		condList[7].type = condList[3].type.concat(ccl["0_3_0"]);
		for(let obj of condList){
			obj.isShow = false;
			if(typeNum==='1'&&obj.classify==='curriculum'){
				obj.isShow = true
			}
			if(typeNum==='2'&&obj.classify==='school'){
				obj.isShow = true
			}
			if(typeNum==='3'&&obj.classify==='teacher'){
				obj.isShow = true
			}
			if(typeNum==='4'&&obj.classify==='info'){
				obj.isShow = true
			}
		}
		this.sList = condList;
		if(selObj!=='{}'){
			let data = JSON.parse(selObj)
			switch(typeNum){
				case '1':this.currSizer = data
				break
				case '2':this.schoolSizer = data
				break
				case '3':this.teacSizer = data
				break
				case '4':this.infoSizer = data
				break
			}
			this.setsList(data);
		}
	},
	methods: {
		//选择分类时
		clickSel(i,num,val){
			let pl = this.currSizer;
			let ss = this.schoolSizer;
			let ts = this.teacSizer;
			let is = this.infoSizer;
			switch(i){
				case 0:
					pl.category.num = num;
					if(num) pl.category.value = val;
					else pl.category.value = ''
				break
				case 3:
					pl.address.num = num;
					if(num) pl.address.value = val;
					else pl.address.value = ''
				break
				case 4:
					pl.time.num = num;
					if(num) pl.time.value = val;
					else pl.time.value = ''
				break
				case 5:
					pl.level.num = num;
					if(num) pl.level.value = val;
					else pl.level.value = ''
				break
				case 6:
					ss.type.num = num;
					if(num) ss.type.value = val;
					else ss.type.value = ''
				break
				case 7:
					ss.thressaddress.num = num;
					if(num) ss.thressaddress.value = val;
					else ss.thressaddress.value = ''
				break
				case 8:
					ts.letter.num = num;
					if(num) ts.letter.value = val;
					else ts.letter.value = ''
				break
				case 9:
					is.type.num = num;
					if(num) is.type.value = val;
					else is.type.value = ''
				break
			}
		},
		
		//点击返回时
		topBack(){
			this.pop();
		},
		
		//点击确认时
		affirm(){
			let type = this.typeNum;
			let pl = {};
			let boo = false;
			let name = 'currScreen'
			switch(type){
				case '1':pl = this.currSizer
				break
				case '2': pl = this.schoolSizer
					name = 'schoolScreen'
				break
				case '3':pl = this.teacSizer;
					name = 'teacherScreen'
				break
				case '4':pl = this.infoSizer;
					name = 'infoScreen'
				break
			}
			// for(let item in pl){
			// 	if(pl[item].value){
			// 		boo = true;
			// 		break;
			// 	}
			// }
			// if(!boo){
			// 	this.message('请选择后在确认')
			// 	return
			// }
			uni.$emit(name,pl);
			this.topBack();
		},
		
		//自动设置选项
		setsList(obj){
			let sList = this.sList;
			for(let name in obj){
				let {i,num} = obj[name];
				sList[i].selNum = num;
			}
		},
		
		//点击重置时
		clickReset(num){
			//重置课程筛选
			if(num==='1')this.resetData(this.currSizer)
			
			//重置课程筛选
			if(num==='2')this.resetData(this.schoolSizer)
			
			//重置教师筛选
			if(num==='3')this.resetData(this.teacSizer)
			
			//重置资讯筛选
			if(num==='4')this.resetData(this.infoSizer)
		},
		
		//重置
		resetData(pl){
			let sList = this.sList;
			for(let name in pl){
				let data = pl[name];
				let {i,num,value} = data;
				data.num = 0;
				data.value = '';
				sList[i].selNum = 0;
			}
		}
		
	}
}
</script>

<style scoped lang="scss">
.ft_app{
	padding-top: 54rpx;
	flex-direction: column;
	.ft_scr{
		flex: 1;
		overflow: hidden;
	}
	.ftBtns{
		width: 720rpx;
		height: 44px;
		border-radius: 22px;
		margin:20px auto;
		overflow: hidden;
		view{
			width: 50%;
			text-align: center;
			line-height: 44px;
			font-size: 18px;
			color:$col-fff;
		}
		.ftBtnLeft{
			background-color: #FF9032;
		}
		.ftBtnRight{
			background-color: #FD5C0E;
		}
	}
}
</style>
