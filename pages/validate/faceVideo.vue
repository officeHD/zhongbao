<template>
	<view class="wrapper">
		<!-- <view class="tips">缓缓的眨一眨眼睛</view> -->

		<view class="videoBorder">
			<view class="videoContent">
				<!-- <view class="topTips">没有检测到人脸</view> -->
				<camera  device-position="front"  flash="off"  binderror="error"  style="width: 100%; height: 100%;"></camera>
			</view>
		</view>
		<button class="primaryBtn"   @click="takePhoto"> 拍照 </button>
	</view>
</template>

<script>
	import rup from '@/common/request/request-upFiles.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		computed: {
			...mapState(['token', 'userData'])
		},
		methods: {
			//拍照
			takePhoto() {
				var that = this;
				//拍照
				const ctx = uni.createCameraContext()
				ctx.takePhoto({
					quality: 'high',
					success: (res) => {
						this.uploadFile(res.tempImagePath);

					} //拍照成功结束

				}) //调用相机结束
			},
			async uploadFile(path) {
				const res = await this.$req.ajaxFile({ 
					path: 'http://c_inventory.i2f2f.com/wxapi/member/Uplode',
					filePath: path,
					fileName: 'file',
					extra: { 
						token: this.token 
					}

				})
				let data=JSON.parse(res.data);
				if(data.code==200){
					this.validImg(data.data.url)
				}
			},
			async validImg(url){
				var res = await this.$req.ajax({
					path: '/wxapi/member/maker_PicVerify',
					title: '保存中',
					data: {
						url: url,
						token: this.token
				
					}
				});
				if (res.data.code == 200) {
					// console.log(res.data.data)
					this.$api.msg("保存成功");
					 
				} else {
					this.$api.msg(res.data.message);
				}
				
				
			}
		},

	}
</script>

<style scoped>
	.tips {
		text-align: center;
		font-size: 28rpx;
		margin: 30rpx 0;
		color: #333;
	}

	.wrapper {
		width: 100%;
	}

	.videoBorder {
		width: 450rpx;
		height: 450rpx;
		border: 10rpx solid #D8D8D8;
		padding: 5rpx;
		border-radius: 450rpx;
		margin: 50rpx auto;
		overflow: hidden;
		display: flex;
	}

	.videoContent {
		flex: 1;
		background-color: #B0AAA5;
		border-radius: 450rpx;
		position: relative;
		overflow: hidden;
	}

	.topTips {
		width: 100%;
		height: 150rpx;
		background-color: #86827E;
		top: 0;
		left: 0;
		font-size: 32rpx;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;

	}
	
	.primaryBtn {
		background-color: #1666F3;
		color: #FFFFFF;
		height: 100rpx;
		line-height: 100rpx;
		margin-left: 100rpx;
		margin-right: 100rpx;
		margin-top: 130rpx;
		text-align: center;
	}
	
</style>
