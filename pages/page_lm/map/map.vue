<template>
	<view class="map_app fx">
		<hb title="地图"></hb>
		<view class="map_main">
			<map :latitude="gcjLat" :longitude="gcjlon" :markers="markers"></map>
		</view>
		<view class="map_btn" @tap="openMap(locationName,latitude,longitude)">去这里</view>
	</view>
</template>

<script>
import hb from '../../../components/components_lm/detailPage/headBack.vue'
export default {
	components:{hb},
	data() {
		return {
			latitude: 0,   //纬度   百度坐标
		　longitude: 0,  //经度  百度坐标
			gcjLat:0,   //高德坐标
			gcjlon:0,		//高德坐标
			locationName:'',   //地址名称
			markers: [{
				latitude: 0,  //高德坐标
				longitude: 0, //高德坐标
				iconPath: '../../../static/image/sign/signImg3.png',   //显示图标
				label:{
					content:'',
					color:'#F76350',
					bgColor:'#fff',
					padding:5,
					borderRadius:4
				}
			}],
		}
	},
	
	onLoad(e) {
		let lt = e.location
		this.locationName = lt
		this.markers[0].label.content = lt;
		this.getLoLa(lt)
	},
	methods: {
		/** 
		 * 获取经纬度
		 * @param {Object} address   //地址
		 * @param {Object} city    //省或市
		 */
		getLoLa(address){
			let data = {
				address,   //详细地址
				city:'',   //城市名
				output:'json',  //输格式类型
				key:'8olmnvqZsoP5NDfBMROFmK419QykayO4'   //密钥
			}
			this.fetch({url:'',data,method:'get'},6).then(res=>{
				let {lng,lat} = res[1].data.result.location;
				this.latitude = lat;
				this.longitude = lng;
				this.bd09togcj02(lng,lat);   
			})
		},
		
		/*
		 *百度坐标系（BD09）与火星坐标系（GCJ-02）的转换
		 *即 百度 转 高德 、谷歌
		 */
		bd09togcj02(bd_lon,bd_lat){
			let X_PI = 3.14159265358979324 * 3000.0 / 180.0;
			let x = bd_lon - 0.0065;
			let y = bd_lat - 0.006;
			let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
			let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
			let ggLng = z * Math.cos(theta);
			let ggLat = z * Math.sin(theta);
			this.markers[0].latitude = ggLat;
			this.markers[0].longitude = ggLng;
			this.gcjLat = ggLat 
			this.gcjlon= ggLng	
		}, 
		
		//打开地图app
		openMap(location){
			let lat =	this.latitude
			let lon =	this.longitude
			let gclLat =	this.gcjLat
			let gclLon =	this.gcjlon
			let type = plus.os.name;
			if(type==='iOS'){
				let url = "";  
				plus.nativeUI.actionSheet({
					title:"选择地图应用",
					cancel:"取消",
					buttons:[
					{title:"Apple地图"},
					{title:"百度地图"},
					{title:"高德地图"}],
				}, function(e){ 
					switch(e.index){
						case 1:  
							url = "http://maps.apple.com/?q="+location+"&ll="+gclLat+","+gclLon; 
							break;
						case 2:
						url = "baidumap://map/marker?location="+lat+","+lon+"&title="
						+location+"&src=Hello%20uni-app"; 
							break;
						case 3:
							url = "iosamap://viewMap?sourceApplication=Hello%20uni-app&poiname="
							+location+"&lat="+gclLat+"&lon="+gclLon+"&dev=0";  
							break;
					}
					if(!url)return
					url = encodeURI(url)    //进行中文转码
					plus.runtime.openURL(url,function(e){
							plus.nativeUI.alert("未安装该地图应用");  
					});  
				}) 
			}else{
				var hasBaiduMap = plus.runtime.isApplicationExist(
					{pname:'com.baidu.BaiduMap',action:'baidumap://'}
				);  
				var hasAmap = plus.runtime.isApplicationExist(
					{pname:'com.autonavi.minimap',action:'androidamap://'}
				);  
				var urlBaiduMap = "baidumap://map/marker?location="+lat+","+lon+"&title="
					+location+"&src=Hello%20uni-app";  
				var urlAmap = "androidamap://viewMap?sourceApplication=Hello%20uni-app&poiname="
					+location+"&lat="+gclLat+"&lon="+gclLon+"&dev=0"  
				if (hasAmap && hasBaiduMap) {  
						plus.nativeUI.actionSheet({
							title:"选择地图应用",cancel:"取消",buttons:[
								{title:"百度地图"},{title:"高德地图"},
							]}, function(e){  
								switch (e.index){  
									case 1:  
										plus.runtime.openURL(urlBaiduMap);  
										break;  
									case 2:  
										plus.runtime.openURL(urlAmap);  
										break;  
								}  
						})  
				}  
				else if (hasAmap) {  
						plus.runtime.openURL(urlAmap);  
				}  
				else if (hasBaiduMap) {  
						plus.runtime.openURL(urlBaiduMap);  
				}  
				else{  
						url = "geo:"+lat+","+lon+"?q="+location;  
						plus.runtime.openURL(url); //如果是国外应用，应该优先使用这个，会启动google地图。这个接口不能统一坐标系，进入百度地图时会有偏差  
				}  
			}
		}
	}
}
</script>

<style scoped lang="scss">
.map_app{
	position: fixed;
	width: 100%;
	height: 100%;
	background-color: $col-fff;
	flex-direction: column;
	.map_main{
		flex: 1;
		background-color: $col-ccc;
		map{
			width: 100%;
			height: 100%;
		}
	}
	.map_btn{
		width: 780rpx;
		height: 100rpx;
		background-color: $col-main;
		text-align: center;
		line-height: 100rpx;
		font-size: 40rpx;
		color: $col-fff;
	}
}
</style>
