<template>
	<view class="wrapper takephoto">
		<view class="tips">请保持面部与颈部位于识别区内</view>

		<view class="camera">
			<canvas class="progress_bg" canvas-id="canvasProgressbg"></canvas>
			<canvas class="progress_canvas" canvas-id="canvasProgress"></canvas>
			<camera id='camera' device-position="front" bindinitdone="startdrawCanvas" flash="off" binderror="error">
				<cover-view class='cameraGai'>
					<cover-image src='../../static/img/mask.png' class='cover-image'></cover-image>
				</cover-view>
			</camera>
		</view>
		<button class="primaryBtn" @click="validImg" v-if="complete"> 完成 </button>
		<button class="primaryBtn" @click="startRecord" v-if="!complete"> 开始识别 </button>

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
		data() {
			return {
				count: 0, 	//设置 计数器 初始为 0
				countTimer: null, //设置 定时器 初始为null
				complete: false,
				videoUrl:""
			}
		},
		onReady() {
			if (wx.createCameraContext()) {
				this.cameraContext = wx.createCameraContext('myCamera')
			 
				
			} else {
				// 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
				wx.showModal({
					title: '提示',
					content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
				})
			}
		},
		methods: { 

			drawProgressbg() {
				// 使用 wx.createContext 获取绘图上下文 context
				var ctx = wx.createCanvasContext('canvasProgressbg')
				ctx.setLineWidth(5); // 设置圆环的宽度
				ctx.setStrokeStyle('#a9a9a9'); // 设置圆环的颜色
				ctx.setLineCap('round') // 设置圆环端点的形状
				ctx.beginPath(); //开始一个新的路径
				ctx.arc(110, 110, 100, 0, 2 * Math.PI, false);
				//设置一个原点(100,100)，半径为90的圆的路径到当前路径
				ctx.stroke(); //对当前路径进行描边
				ctx.draw();
			},
			error(e) {
				console.log(e.detail)
			},
			startdrawCanvas() {
				console.log('相机初始化成功')
			},
			countInterval() {
				// 设置倒计时 定时器 每100毫秒执行一次，计数器count+1 ,耗时6秒绘一圈
				this.countTimer = setInterval(() => {
					if (this.count <= 60) {
						/* 绘制彩色圆环进度条
						注意此处 传参 step 取值范围是0到2，
						所以 计数器 最大值 60 对应 2 做处理，计数器count=60的时候step=2
						*/
						this.drawCircle(this.count / (60 / 2))
						this.count++;
					} else {
						this.stopRecord()
						
						clearInterval(this.countTimer);
					}
				}, 60)
			},
			drawCircle(step) {
				var context = wx.createCanvasContext('canvasProgress');
				// 设置渐变
				var gradient = context.createLinearGradient(200, 100, 100, 200);
				gradient.addColorStop("0", "#2661DD");
				gradient.addColorStop("0.5", "#2661DD");
				gradient.addColorStop("1.0", "#2661DD");
				context.setLineWidth(5);
				context.setStrokeStyle(gradient);
				context.setLineCap('round')
				context.beginPath();
				// 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
				context.arc(110, 110, 100, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
				context.stroke();
				context.draw()
			},
			startRecord(){
				const ctx = uni.createCameraContext()
				var that = this
				ctx.startRecord({
					success: (res) => {
						console.log(res);
						this.drawProgressbg(); 
						this.countInterval();
					},
					fail:(err)=>{
						console.log(err);
					}
				}) 
			}, 
		 
			//停止录像
			stopRecord () {
				const ctx = uni.createCameraContext()
				var that = this
				ctx.stopRecord ({ 
					success: (res) => {
						that.complete = true
						that.uploadFile(res.tempVideoPath) 
					}
				})
			},
			async uploadFile(path) {
				const res = await this.$req.ajaxFile({
					path: 'https://www.appi2b2b.com/wxapi/member/Uplode',
					title: '读取数据',
					filePath: path,
					fileName: 'file',
					extra: {
						token: this.token,
						path: "4"
					} 
				})
				let data = JSON.parse(res.data);
				if (data.code == 200) {
					this.validImg(data.data.url);
					this.videoUrl=data.data.url;
				}
			},
			async validImg(url) {
				if(!url){
					url=this.videoUrl
				}
				var res = await this.$req.ajax({
					path: '/wxapi/member/faceliveness',
					title: '认证中',
					data: {
						url: url,
						token: this.token

					}
				});
				if (res.data.code == 200) {
					// console.log(res.data.data)
					this.$api.msg("保存成功");
					setTimeout(function() {
						uni.redirectTo({
							url: "/pages/validate/success"
						})
					}, 1000);
				} else {
					this.$api.msg(res.data.message);
					setTimeout(function() {
						uni.navigateBack({})
					}, 1000);


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

	.takephoto {
		width: 100%;
	}

	.takephoto .camera {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.takephoto camera {
		width: 220px;
		height: 220px;
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: -99;
	}

	.takephoto .goBack {
		color: #1792f0;
		margin-left: 35rpx;
		font-size: 35rpx;
	}

	.distinguishing image {
		height: 370rpx;
		width: 100%;
	}

	.progress_bg {
		position: absolute;
		width: 220px;
		height: 220px;
	}

	.progress_canvas {
		width: 220px;
		height: 220px;
	}

	.takephoto .complete {
		border-top: 1rpx solid #e5e5e5;
		width: 100%;
		position: fixed;
		bottom: 0;
		background: #fff;
		color: #1792f0;
		font-size: 40rpx;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
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

	.videoCa {
		border-radius: 450rpx;
		width: 100%;
		height: 100%;
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
