<template>
	<view class="uphead_app pfAllScreen fx">
		<view class="upImg">
			<image :src="imgSrc||userInfo.user.head" v-if="imgSrc||userInfo"></image>
		</view>
		<input type="file" id="fileImg" />
		<view @tap="uploadImg" class="upBtn" hover-class="upHoverBtn">
			跟换头像
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				imgSrc: '',
				userInfo:null
			}
		},
		onLoad(){
			this.userInfo = this.getItemSync('userInfo');
		},
		methods: {
			//上传头像
			uploadImg() {
				uni.chooseImage({
					count: 1,
					sourceType: ['album', 'camera'],
					success: (chooseImageRes) => {
						const {tempFilePaths,tempFiles} = chooseImageRes;
						let {name,size} = tempFiles[0]
						let arr = name.split('.')
						let imgType = arr[arr.length-1];
						if(imgType!=='jpg'&&imgType!=='jpeg'&&imgType!=='png'){
							this.message('图片仅支持 jpg、png格式图片');
							return
						}
						if(size/1000/1000>1){
							this.message('上传图片不能大于1MB');
							return
						}
						
						uni.uploadFile({
							url: 'http://112.74.18.182:9101/cnjy-search-web/upload.do', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'user': 'test'
							},
							success: (res) => {
								let {message,success} = JSON.parse(res.data)
								if (success) {
									this.imgSrc = message
								}else{
									this.message('图片上传失败,请稍后再试');
								}
							},
							fail: () => {
								this.message('图片上传失败,请稍后再试');
							}
						})
					}
				})
			},
			
			//修改头像
		 uploading() {
				let userInfo = this.userInfo;
				let head = this.imgSrc;
				if(userInfo&&head===userInfo.user.head||!head){
				 this.message('头像未更改或没有上传')
				 return
				}
				this.fetch({
					url: 'user/updateHead.do',
					method: 'get',
					data: {
						head,
						phone: userInfo.user.phone
					}
				}, 2).then((res)=>{
					let {message,success} = res[1].data;
					this.message(message);
					if(success){
						userInfo.user.head = head;
						// 更新本地数据
						this.setItemSync('userInfo', userInfo);
						uni.$emit('updateHead')
						setTimeout(()=>{
							this.pop()
						},1000)
					}
				});
			},
		},
		onNavigationBarButtonTap(){
			this.uploading()
		}
	}
</script>

<style scoped lang="scss">

	.uphead_app {
		background: $col-666;
		flex-direction: column;
		justify-content: center;
		.upImg {
			width: 750rpx;
			height: 750rpx;
			background-color: #e6e6e6;
			background-image: url(../../../static/image/touxiang.png);
			background-size: 100% 100%;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.upBtn {
			width: 400rpx;
			height: 90rpx;
			margin: 40rpx auto;
			margin-bottom: 0;
			border: 2rpx solid rgba(229, 229, 229, 1);
			border-radius: 10rpx;
			text-align: center;
			line-height: 90rpx;
			font-size: 36rpx;
			color: $col-fff;
		}

		.upHoverBtn {
			background: #777;
		}
	}
</style>
