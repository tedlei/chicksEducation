<script>
	export default {
		onLaunch: function() {
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
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
	ul, li, view{
		box-sizing: border-box;
		font-size: 32rpx;
	}
	body{
		background-color: #F5F5F5;
	}
	navigator:active{
		opacity: 0.4;
	}
	.ellipsis{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	/* #endif */
	
	.fxCenter{
		justify-content: center;
		align-items: center;
	}
	
	.active:active{
		opacity: 0.4;
	}
	.pfAllScreen{
		position: fixed;
		width: 100%;
		height: 100%;
		top:0;
		left: 0;
	}
</style>
