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
	},
	/**
	 * 网络请求 默认 GET 
	 * @param {Object} param
	 */
	fetch(param){
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
	}
}

module.exports = Api
