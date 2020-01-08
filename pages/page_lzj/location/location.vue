<template>
	<view style="height: 100vh;width: 100vw;">
		<view class="currentSelect fx fxCenter">
			<text>当前选择城市：</text>
			<text>{{saveCity}}</text>
		</view>

		<view class="orien_ul1 fx">
			<view v-for="(item,i) of provinceList" :key="i" class="li">
				<text class="active" 
					:class="[i===plNum?'divBgColor':'', item ? '' : 'without']" 
					@tap.stop="topSel(item)">{{item || '未查找到该地址'}}</text>
			</view>
		</view>

		<view class="selectProvinace">{{provinceList[plNum]}} 热门城市：</view>
		
		<view class="orien_ul1 fx">
			<view v-for="(item,i) in areaList" :key="i" class="li">
				<text class="active" 
					:class="i===alNum?'divBgColor':''"
					@tap="topSelarea(i, item)">{{item}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import chinaCityList from '../../../static/js/chinaCityList.js';
	export default {
		data() {
			return {
				saveCity: '', 
				provinceList: [], //省列表
				plNum: 0, //选择的省
				areaList: [], //市列表
				alNum: 0, //选择的市
				cityInfo: {}
			}
		},
		onLoad() {
			this.provinceList = chinaCityList['0'];
			// 初始化城市信息
			let city = this.getStoreGetter('location');
			if (Object.keys(city).length) {
				this.initCityInfo(city);
			}
		},
		methods: {
			/**
			 * 父级获取到定位时， 更新当前组件信息
			 */
			initCityInfo(cityInfo) {
				// 省级序号
				let provincialLevelNumber = chinaCityList[0].indexOf(cityInfo.provincialLevel);
				// 市级序号
				let cityLevelNumber = 0,
					cityLevelList = [];
				// 判断是否未直辖市   获取市级列表
				if (chinaCityList['0_' + provincialLevelNumber].length === 1) cityLevelList = chinaCityList['0_' +
					provincialLevelNumber + '_0'];
				else cityLevelList = chinaCityList['0_' + provincialLevelNumber];

				cityLevelNumber = cityLevelList.indexOf(cityInfo.cityLevel);

				// 赋值
				
				this.saveCity = this.provinceList[provincialLevelNumber];
				
				this.areaList = cityLevelList;

				this.plNum = provincialLevelNumber;
				this.alNum = cityLevelNumber;
				
				this.cityInfo = cityInfo;
			},
			//选择省
			topSel: function(city) {
				if (this.provinceList.length === 1) return;
				let num = chinaCityList[0].indexOf(city);
				let list = chinaCityList['0_' + num];
				this.alNum = -1;
				this.plNum = num;

				if (list.length > 1) {
					this.areaList = list;
				} else {
					this.areaList = chinaCityList['0_' + num + '_0'];
				}

				let cityInfo = {
					provincialLevel: city,
					cityLevel: ''
				};
				this.cityInfo = cityInfo;
			},
			//选择区
			topSelarea(num, city) {
				let cityInfo = this.deepCopy(this.cityInfo);
				cityInfo.cityLevel = city;

				this.cityInfo = cityInfo;
				this.alNum = num;
			},
		},
		onNavigationBarButtonTap() {
			this.setItemSync('position', this.cityInfo);
			this.updateStoreState('changeUpdatePosition', true);
			this.pop();
		}
	}
</script>

<style scoped lang="scss">
	.currentSelect {
		height: 66rpx;
		background: $col-fff;
		font-size: $uni-font-size-base;

		& text:nth-child(1) {
			color: $col-999;
		}

		& text:nth-child(2) {
			color: #FF0000;
		}
	}
	
	.selectProvinace{
		margin-top:60rpx;
		margin-left: 20rpx;
		color: $col-333;
		font-size: $uni-font-size-lg;
		font-weight: 700;
	}

	.orien_ul1 {
		margin-top: 20rpx;
		flex-wrap: wrap;

		.li {
			padding: 8rpx 20rpx;
			text {
				display: block;
				padding: 6rpx;
				margin-top: 8rpx;
				color: rgba(128, 128, 128, 1);
				text-align: center;
				font-size: $uni-font-size-base;
			}

			.divBgColor {
				background: rgba(255, 0, 0, 1);
				color: white;
				border-radius: 4rpx;
			}

			.without {
				background-color: #fff;
				color: #808080;
			}
		}
	}
</style>
