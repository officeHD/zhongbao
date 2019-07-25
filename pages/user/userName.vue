<template>
	<view class="wrapper">
		<view class="celBox bb">
			<text class="leftcell"> 姓名</text>
			<view class="rightRow">
				<input placeholder="请输入" :value="userData.Name" data-key="Name" @input="inputChange" />
			</view>
		</view>
		<view class="celBox bb">
			<text class="leftcell"> 身份证号</text>
			<view class="rightRow">
				<input placeholder="请输入" maxlength="18" type="idcard" :value="userData.IDCardNo" data-key="userData.IDCardNo" @input="inputChange" />
			</view>
		</view>
		<!-- <view class="celBox bb">
			<text class="leftcell"> 身份证有效期</text>
			<view class="rightRow">
				<text>{{userData.DueDate||"未验证"}}</text>
			</view>
		</view> -->
		<!-- <view class="btn-row">
			<button class="primaryBtn" @tap="toRegister">立即保存</button>
		</view> -->
	</view>
</template>

<script>
	import rup from '@/common/request/request-upFiles.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				title: 'picker',
				array: ['中国', '美国', '巴西', '日本'],
				index: 0,
				date: currentDate,
				time: '12:01',
				front: "",
				back: "",
				idcard: "",
				name: "",
			}
		},
		computed: {
			...mapState(['token', 'userData']),
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			inputChange(e) {
				const key = e.currentTarget.dataset.key;
				this.userData[key] = e.detail.value;
			},
			// 编辑创客姓名身份证
			async toRegister() {
				var res = await this.$req.ajax({
					path: '/wxapi/member/edit_idcard',
					title: '正在加载',
					data: {
						name: this.userData.Name,
						idcard: this.userData.IDCardNo,
						token: this.token,
					}
				});
				if (res.data.code == 200) {
					uni.navigateBack({

					})
				} else {
					this.$api.msg(res.data.message);
				}
			},
			// 上传身份证


			async maker_idcard(surl, side) {
				var res = await this.$req.ajax({
					path: '/wxapi/member/maker_idcard',
					title: '正在加载',
					data: {
						surl: surl,
						side: side,
						token: this.token,
					}
				});
				if (res.data.code == 200) {} else {
					this.$api.msg(res.data.message);
				}
			},
			async testUp(imgtype) {
				let that = this;
				try {
					const res = await rup.selectFiles({
						type: 2,
						maximum: 1,
						upload: {
							path: 'https://www.appi2b2b.com/wxapi/member/Uplode',
							files: ['file'],
							title: '正在上传',
							extra: {
								token: this.token
							}
						}
					})

					// let imageArr=
					if (res.upload && res.upload.length > 0) {
						res.upload.forEach(item => {
							let returnData = JSON.parse(item);
							console.log(returnData)
							if (returnData.code == 200) {
								this[imgtype] = returnData.data.url;
							}

						})
					}
				} catch (e) {
					console.log(e)
				}
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			bindDateChange: function(e) {
				this.userData.DueDate = e.target.value
			},
			bindTimeChange: function(e) {
				this.time = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year;
				} else if (type === 'end') {
					year = year + 20;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style scoped>
	.celBox {
		display: flex;
		align-items: center;
		font-size: 28rpx;
		background-color: #FFFFFF;
		min-height: 100rpx;
		padding: 20rpx 30rpx;
		color: #1E1E1E;
	}

	.primaryBtn {
		border-radius: 5rpx;
		background-color: #1666F3;
		font-size: 30rpx;
		color: #fff;
		height: 100rpx;
		line-height: 100rpx;
	}
	.rightRow{
		color: #888888;
		flex: 1;
	}
	.rightRow input{
		width: 100%;
		height: 100%;
	}

	.leftcell {
		width: 200rpx;
		color: #333333;
	}

	.bb {
		border-bottom: 1px solid #E4E4E4;
	}

	.topgroup {
		background-color: #FFFFFF;
		padding-bottom: 20rpx;
		margin-bottom: 20rpx;
	}

	.wrapper {
		background-color: #F2F2F2;
		height: 100vh;
		width: 100%;
	}

	.pageTitle {
		font-size: 30rpx;
		padding: 20rpx;
	}

	.imgBox {
		display: flex;
		width: 750rpx;
	}

	.boxItem {
		flex: 1;
		padding: 20rpx 30rpx;
	}

	.boxImg {
		width: 100%;
	}

	.boxtitle {
		font-size: 26rpx;
		text-align: center;
		margin-bottom: 20rpx;
		;
	}

	.redt {
		color: #C20101;
	}
</style>
