const Api = {
	install() {
		this.prototype.fetch = Api.fetch;
		this.prototype.deepCopy = Api.deepCopy;
		this.prototype.parse = Api.parse;
		this.prototype.stringify = Api.stringify;
		this.prototype.getTimer = Api.getTimer;
		this.prototype.getItem = Api.getItem;
		this.prototype.setItem = Api.setItem;
		this.prototype.getItemSync = Api.getItemSync;
		this.prototype.setItemSync = Api.setItemSync;
		this.prototype.removeItem = Api.removeItem;
		this.prototype.push = Api.push;
		this.prototype.pop = Api.pop;
		this.prototype.getAdvertisingData = Api.getAdvertisingData;
		this.prototype.getAdvertisingData = Api.getAdvertisingData;
		this.prototype.getRandomData = Api.getRandomData;

		/*---------------------------------------------------*/
		this.prototype.message = Api.message;
		this.prototype.hideKey = Api.hideKey;
		this.prototype.once = Api.once;
		this.prototype.getRandomData = Api.getRandomData;


		// vuex相关
		this.prototype.updateStoreState = Api.updateStoreState;
		this.prototype.getStoreGetter = Api.getStoreGetter;
	},
	/**
	 * 网络请求 默认 GET 
	 * @param {Object} param
	 */
	fetch: (() => {
		let ipList = [
			'http://112.74.18.182:9101/cnjy-search-web/',
			'http://112.74.16.235:9102/cnjy-user-web/',
			'http://112.74.16.235:9103/cnjy-curriculum-web/',
			'http://120.24.45.159:9104/cnjy-school-web/',
			'http://120.24.45.159:9105/cnjy-teacher-web/',
		];
		return function(param, port, isImage) {
			if (typeof port === 'undefined') port = 1;
			port = port - 1;
			
			let url = param.url;
			if (/^\//.test(url)) url = url.slice(1);
			if (port > -1) {
				url = ipList[port] + param.url
			}

			param.url = url;
			if (param.method === 'POST') {
				param.header = param.header || {
					'content-type': 'application/json'
				}
			}
			let promiseObj = uni.request(param);
			if (!param.success) {
				return promiseObj
			}
		}
	})(),
	// 深复制
	deepCopy(obj) {
		return JSON.parse(JSON.stringify(obj));
	},
	// 序列化
	parse(obj) {
		return JSON.parse(obj);
	},
	stringify(obj) {
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
	getTimer(data = false, notHMS = false, notYMD = false, sign = '-', sign2 = ':') {
		function double(val) {
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
		let ymd = '',
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
	 * 同步获取本地存储数据
	 * @param {String} key
	 * @param {Function} callback
	 */
	getItem(key, callback = (data) => {}) {
		uni.getStorage({
			key,
			success: (res) => {
				let result = res.data;
				if (/^(\[|\{)/.test(result)) {
					result = this.parse(result);
				}
				callback.call(this, result);
			},
			fail: (rej) => {
				callback.call(this, null);
			}
		});
	},
	/**
	 * 同步获取本地存储数据
	 * @param {String} key
	 */
	getItemSync(key) {
		let result = uni.getStorageSync(key);
		if (/^(\[|\{)/.test(result)) {
			result = this.parse(result);
		}
		return result
	},
	/**
	 * 异步置本地存储
	 * @param {String} key
	 * @param {Any} value
	 * @param {Function} callback
	 */
	setItem(key, value, callback = () => {}) {
		uni.setStorage({
			key,
			data: value,
			success: callback
		});
	},
	/**
	 * 同步设置本地存储
	 * @param {String} key
	 * @param {Object} value
	 */
	setItemSync(key, value) {
		if (typeof value === 'object') {
			value = this.stringify(value);
		}
		uni.setStorageSync(key, value);
	},
	/**
	 * 异步移除
	 */
	removeItem(key, callback = (res) => {}) {
		uni.removeStorage({
			key,
			success: (res) => {
				callback.call(this, res);
			}
		});
	},
	/**
	 * 页面跳转
	 * @param param 	{Object} 
	 * @param data 		{Object|string} 
	 * @param isBack 	{Boolean}
	 */
	push(param, data, isBack = true) {
		if (data) {
			Object.keys(data).forEach((key, i) => {
				if (!i) {
					param.url += "?"
					param.url += key + '=' + data[key]
				} else {
					param.url += '&' + key + '=' + data[key]
				}
			})
		}
		if (isBack) {
			uni.navigateTo(param);
		} else {
			console.log(param, 7);
			uni.redirectTo(param)
		};
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
	 * 隐藏键盘
	 */
	hideKey(){
		// #ifdef APP-PLUS
		plus.key.hideSoftKeybord();
		// #endif
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
	},
	/**
	 * 随机获取数组中的n个数据
	 * @param {Array} origin	源数据
	 * @param {Array} result	接收结果的对象
	 * @param {Number} n	随机取几个
	 */
	getRandomData(origin,result, n){
		let len = 0,	// 用于限定取值范围
			rd = -1;	// 随机数
		for (var i = 0; i < n; i++) {
			len = origin.length;
			rd = Math.floor(Math.random()*len);
			result.push(origin[rd]);
			origin.splice(rd, 1);
		}
	},
	/**
	 * @param {String} mutationsApiName	mutations 中的方法名
	 * @param {Any} newValue
	 */
	updateStoreState(mutationsApiName, newValue){
		this.$store.commit(mutationsApiName, newValue);
	},
	/**
	 * 获取定位vuex计算属性中的值
	 * @param {String} name
	 */
	getStoreGetter(name){
		return this.$store.getters[name]();
	}
}

module.exports = Api
