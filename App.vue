<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		created() {
			this.push({url:'/pages/page_lm/LoginRelated/verifyLogin'})
			// this.push({url:'/pages/page_lm/LoginRelated/register'})
			// this.push({url:'/pages/page_lm/myPage/myPage'})
		}
	}
</script>

<style lang="less">
	/*每个页面公共css */
	@font-face {
		font-family: "iconfont";
		src: url('https://at.alicdn.com/t/font_1472826_3szdkj1kh5f.ttf') format('truetype');
	}
	.iconfont{
		font-family: iconfont;
	}
	.fx{ 
		display: flex;
	}
	.fxCenter{
		justify-content: center;
		align-items: center;
	}
	view{
		font-size: 32rpx;
	}
	body{
		background-color: #F5F5F5;
	}
</style>
