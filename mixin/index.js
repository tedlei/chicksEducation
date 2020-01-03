const Api = {
	install(){
		this.prototype.fetch = Api.fetch;
		this.prototype.deepCopy = Api.deepCopy;
		this.prototype.parse = Api.parse;
		this.prototype.stringify = Api.stringify;
		this.prototype.getTimer = Api.getTimer;
		this.prototype.getItem = Api.getItem;
		this.prototype.setItem = Api.setItem;
		this.prototype.push = Api.push;
		this.prototype.pop = Api.pop;
		this.prototype.getAdvertisingData = Api.getAdvertisingData;
	},
	/**
	 * 网络请求 默认 GET 
	 * @param {Object} param
	 */
	fetch(param, port){
		if (typeof port === 'undefined') port = 1;
		port = port - 1;
		let ipList = [
			'http://112.74.18.182:9101/cnjy-search-web/',
			'http://112.74.16.235:9102/cnjy-user-web/',
			'http://112.74.16.235:9103/cnjy-curriculum-web/',
			'http://120.24.45.159:9104/cnjy-school-web/',
			'http://120.24.45.159:9105/cnjy-teacher-web/',
		];
		let url = param.url;
		if (/^\//.test(url)) url = url.slice(1);
		if (port > -1) {
			url = ipList[port] + param.url
		}
		param.url = url;
	
		if (param.method === 'POST') {
			param.header = param.header || {'content-type': 'application/json'}
		}
		let promiseObj = uni.request(param);
		if (!param.success){
			return promiseObj
		}
	},
	// 深复制
	deepCopy(obj){
		return JSON.parse(JSON.stringify(obj));
	},
	// 序列化
	parse(obj){
		return JSON.parse(obj);
	},
	stringify(obj){
	    return JSON.stringify(obj);
	},
	/**
	 * @param data {boolean} 是否返回为日期格式
	 * @param notHMS {boolean} 是否只要年月日
	 * @param notYMD {boolean} 是否只要时分秒
	 * @param sign {string}	年月日拼接符号
	 * @param sign2 {string}	时分秒拼接符号
	 * @returns {string}
	 */
	getTimer(data = false, notHMS = false, notYMD = false, sign = '-', sign2 = ':'){
		function double(val){
			if (val < 10) val = '0' + val;
			return val;
		}
		let nowTimer = new Date(),
			year = double(nowTimer.getFullYear()),
			month = double(nowTimer.getMonth() + 1),
			date = double(nowTimer.getDate() + 1),
			hours = double(nowTimer.getHours()),
			minutes = double(nowTimer.getMinutes()),
			seconds = double(nowTimer.getSeconds());
		let ymd='',
			hms = '';
		if (data) {
			ymd = year + '年' + month + '月' + date + '日';
			hms = hours + '时' + minutes + '分' + seconds + '秒'
		} else {
			ymd = year + sign + month + sign + date;
			hms = hours + sign2 + minutes + sign2 + seconds
		}
	
		if (notYMD) return hms;
		if (notHMS) return ymd;
	
		return ymd + ' ' + hms;
	},
	/**
	 * 获取本地存储数据
	 * @param {String} key
	 */
	getItem(key){
		let result = uni.getStorageSync(key)
		if (/^(\[|\{)/.test(result)){
			result = this.parse(result)
		}
		return result
	},
	/**
	 * 设置本地存储
	 * @param {String} key
	 * @param {Object} value
	 */
	setItem(key, value){
		if (typeof value === 'object'){
			value = this.stringify(value);
		}
		uni.setStorageSync(key, value);
	},
	/**
	 * 页面跳转
	 * @param param 	{Object} 
	 * @param data 		{Object|string} 
	 * @param isBack 	{Boolean}
	 */
	push(param, data, isBack = true){
		if (data) {
			Object.keys(data).forEach((key, i)=>{
				if (!i) param.url += "?"
				param.url += key + '=' + data[key]
			})
		}
		if (isBack) {
			uni.navigateTo(param);
		} else uni.redirectTo(param);
	},
	/**
	 * 返回页面
	 */
	pop(param){
		param = param || {delta: 1}
		uni.navigateBack(param)
	},
	
	/**
	 * 消息提示
	 */
	message(title){
		uni.showToast({title,icon:'none'})
	},
	
	/**
	 * 获取广告位数据 1 
	 */
	getAdvertisingData(categoryId) {
		return new Promise(resolve => {
			this.fetch({
				method: 'GET',
				url: 'content/cateId.do',
				data: {
					categoryId
				}
			}, 2).then(([rej, res]) => {
				resolve(res.data);
			});
		})
	}
}

module.exports = Api
