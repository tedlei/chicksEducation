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
			// this.push({url:'pages/page_lm/register/verifyLogin'})
		}
	}
</script>

<style lang="less">
	/* #ifndef APP-PLUS-NVUE */
	/*每个页面公共css */
		@font-face {
			font-family: "iconfont";
			src: url('https://at.alicdn.com/t/font_1472826_ujpta4di21n.ttf') format('truetype');
		}
		.iconfont{
			font-family: iconfont;
		}
	.fx{
		display: flex;
	}
	view{
		box-sizing: border-box;
		font-size: 32rpx;
	}
	body{
		background-color: #F5F5F5;
	}
	/* #endif */
	
	.fxCenter{
		justify-content: center;
		align-items: center;
	}
	
	.pointer:active{
		opacity: 0.2;
	}
</style>
