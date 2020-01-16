// #ifdef APP-PLUS
/**
 * App更新
 * @param {Object} widgetInfo
 */
function hotUpdate() {
	plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
		uni.request({
			url: '',
			method: 'GET',
			data: {
				name: widgetInfo.name,
				version: widgetInfo.version
			},
			success: res => {
				let data = result.data;
				if (data.update && data.wgtUrl) {
					uni.downloadFile({
						url: data.wgtUrl,
						success: (downloadResult) => {
							if (downloadResult.statusCode === 200) {
								plus.runtime.install(downloadResult.tempFilePath, {
									force: false
								}, function() {
									console.log('install success...');
									plus.runtime.restart();
								}, function(e) {
									console.error('install fail...');
								});
							}
						}
					});
				}
			}
		});
	})
}

/**
 * 整包更新
 */
function packageUpdate(){
	let server = "http://192.168.3.87"; //检查更新地址
	let req = { //升级检测数据  
		"appid": plus.runtime.appid,
		"version": plus.runtime.version
	};
	uni.request({
		url: server,
		method: 'GET',
		data: req,
		success: (res) => {
			if (res.statusCode == 200 && res.data.status === 1) {
				uni.showModal({ //提醒用户更新  
					title: "更新提示",
					content: '检测到有新版本,是否更新?',
					success: (result) => {
						if (result.confirm) {
							downWgt(res.data.url);
						} else {
							// 检测热更新
							hotUpdate()
						}
					}
				})
			}
		}
	})
}


/**
 * //下载资源包
 * @param {Object} wgtUrl
 */
function downWgt(wgtUrl){
	var that=this;				
	var	task=plus.downloader.createDownload( wgtUrl, {}, function(download,status){ //安装到手机的目录
		if ( status == 200 ) { 
			plus.runtime.install(download.filename);  // 安装下载的apk文件
		} else {
			mui.toast("下载更新失败！");
			plus.nativeUI.closeWaiting();
		}
	});
	//监听下载
	task.addEventListener("statechanged", function (download, status) {
		switch (download.state) {
			case 2:
				// plus.nativeUI.showWaiting("正在下载...");
				break;
			case 3:
				//进度条百分比 totalSize为总量，baifen为当前下载的百分比
				if(that.totalSize==0){
				  that.totalSize=parseInt(download.totalSize);
				}
				if(parseInt(download.downloadedSize/that.totalSize*100)!=that.baifen){
				   that.baifen=parseInt(download.downloadedSize/that.totalSize*100);
				}						    
				break;
			case 4:
				// mui.toast("下载完成");
				plus.nativeUI.closeWaiting();
				break;
		}
	});
	task.start();
}

export {packageUpdate}

// #endif
