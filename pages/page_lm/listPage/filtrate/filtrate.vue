<template>
	<view class="ft_app fx pfAllScreen">
		<HeadPage :isBtn="true" title="筛选"></HeadPage>
		<scroll-view class="ft_scr" scroll-y="true">
			<view v-for="(item,i) of sList" :key="i">
				<SelList v-if="item.classify==='curriculum'&&item.isShow" :item="item" :i='i'></SelList>	
			</view>
		</scroll-view>
		<view class="ftBtns fx">
			<view class="ftBtnLeft active">重置</view>
			<view class="ftBtnRight active">确认</view>
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
			sList:[],
			classify:'classify',
		}
	},
	onLoad() {
		let condList = filtList.condList
		condList[3].type = ccl["0_3_0"];
		for(let obj of condList){
			if(obj.classify==='curriculum'){
				obj.isShow = true
			}
		}
		this.sList = condList;
	},
	methods: {

	}
}
</script>

<style scoped lang="scss">
.ft_app{
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
