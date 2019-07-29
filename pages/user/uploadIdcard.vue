<template>
	<view class="wrapper">
		<view class="topgroup">
			<view class="pageTitle">上传图片</view>
			<view class="imgBox">
				<view class="boxItem">
					<view class="boxtitle">身份证国徽面扫描 <text class="redt">(必填)</text></view>
					<view @click="testUp('IDCardPicBack')">
						<image v-if="userData.IDCardPicBack" :src="userData.IDCardPicBack" class="boxImg cardImg" mode="aspectFit"></image>
						<image v-else="" class="boxImg" src="../../static/img/idBack.png" mode="aspectFit"></image>
					</view>
				</view>
				<view class="boxItem">
					<view class="boxtitle">身份证人像面上传<text class="redt">(必填)</text></view>
					<view @click="testUp('IDCardPic')">
						<image v-if="userData.IDCardPic" :src=" userData.IDCardPic" class="boxImg cardImg" mode="aspectFit"></image>
						<image v-else="" class="boxImg" src="../../static/img/idFront.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="celBox bb">
			<text class="leftcell"> 姓名</text>
			<view class="rightRow">

				<input class="rowInput" :disabled="namedis" :focus="!namedis" :value="userData.Name" data-key="Name" @input="inputChange" />
				<view class="editImgBox" @click="namedis=false">
					<image class="editImg" src="../../static/img/edit.png" mode="aspectFit"></image>
				</view>
			</view>
		</view>
		<view class="celBox bb">
			<text class="leftcell"> 身份证号</text>
			<view class="rightRow">
				<input class="rowInput" maxlength="18" :focus="!iddis" :disabled="iddis" type="idcard" :value="userData.IDCardNo"
				 data-key="userData.IDCardNo" @input="inputChange" />
				<view class="editImgBox" @click="iddis=false">
					<image class="editImg" src="../../static/img/edit.png" mode="aspectFit"></image>
				</view>
			</view>
		</view>
		<view class="celBox bb">
			<text class="leftcell"> 身份证有效期</text>
			<view class="rightRow">
				{{userData.DueDate||""}}
				<!-- <picker :disabled="datedis" class="rowInput" mode="date" :value="userData.DueDate" :start="startDate" :end="endDate"
				 @change="bindDateChange">
					<view class="uni-input">{{userData.DueDate}}</view>
				</picker>
				<view class="editImgBox" @click="datedis=false">
					<image  class="editImg" src="../../static/img/edit.png" mode="aspectFit"></image>
				</view> -->
			</view>
		</view>
		<view class="btn-row">
			<button class="primaryBtn" @tap="toRegister">立即保存</button>
		</view>
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
				namedis: true,
				iddis: true,
				datedis: true,
				title: 'picker',
				array: ['中国', '美国', '巴西', '日本'],
				index: 0,
				date: currentDate,
				time: '12:01',
				front: "",
				back: "",
				IDCardPic: "",
				IDCardPicBack: "",
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
			...mapMutations(['setUserData']),
			async getUserData() {
				var res = await this.$req.ajax({
					path: '/wxapi/member/Maker',
					title: '',
					data: {
						token: this.token

					}
				});
				if (res.data.code == 200) {
					this.setUserData(res.data.data)

				} else {
					this.$api.msg(res.data.message);
				}
			},
			inputChange(e) {
				const key = e.currentTarget.dataset.key;
				this.userData[key] = e.detail.value;

			},
			IdentityCodeValid(code) {
				var city = {
					11: "北京",
					12: "天津",
					13: "河北",
					14: "山西",
					15: "内蒙古",
					21: "辽宁",
					22: "吉林",
					23: "黑龙江 ",
					31: "上海",
					32: "江苏",
					33: "浙江",
					34: "安徽",
					35: "福建",
					36: "江西",
					37: "山东",
					41: "河南",
					42: "湖北 ",
					43: "湖南",
					44: "广东",
					45: "广西",
					46: "海南",
					50: "重庆",
					51: "四川",
					52: "贵州",
					53: "云南",
					54: "西藏 ",
					61: "陕西",
					62: "甘肃",
					63: "青海",
					64: "宁夏",
					65: "新疆",
					71: "台湾",
					81: "香港",
					82: "澳门",
					91: "国外 "
				};
				var tip = "";
				var pass = true;
				var code18 =
					/(^[1-9]\d{5}[1-2]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}(\d|X|x)$)|(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)/;
				if (!code || !code18.test(code)) {
					tip = "身份证号格式错误";
					pass = false;
				} else if (!city[code.substr(0, 2)]) {
					tip = "身份证地址编码错误";
					pass = false;
				} else {
					//18位身份证需要验证最后一位校验位
					if (code.length == 18) {
						code = code.split('');
						//∑(ai×Wi)(mod 11)
						//加权因子
						var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
						//校验位
						var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
						var sum = 0;
						var ai = 0;
						var wi = 0;
						for (var i = 0; i < 17; i++) {
							ai = code[i];
							wi = factor[i];
							sum += ai * wi;
						}
						var last = parity[sum % 11];
						if (parity[sum % 11] != code[17]) {
							tip = "身份证校验位错误";
							pass = false;
						}
					}
				}
				if (!pass) this.$api.msg(tip);
				return pass;
			},

			// 编辑创客姓名身份证
			async toRegister() {
				if (this.IdentityCodeValid(this.userData.IDCardNo)) {
					var res = await this.$req.ajax({
						path: '/wxapi/member/edit_idcard',
						title: '修改中',
						data: {
							name: this.userData.Name,
							idcard: this.userData.IDCardNo,
							token: this.token,
						}
					});
					if (res.data.code == 200) {
						this.$api.msg("修改成功");
						setTimeout(function() {
							uni.navigateBack({})
						}, 500);
					} else {
						this.$api.msg(res.data.message);
					}
				}

			},
			// 上传身份证


			async maker_idcard(surl, side) {
				var res = await this.$req.ajax({
					path: '/wxapi/member/maker_idcard',
					title: '正在验证',
					data: {
						url: surl,
						side: side,
						token: this.token,
					}
				});
				if (res.data.code == 200) {
					// this.getUserData()
					this.$api.msg(res.data.message);
					if (res.data.data) {
						if (res.data.data.Name) {
							this.setUserData({
								Name: res.data.data.Name
							})
						}
						if (res.data.data.IDCardNo) {
							this.setUserData({
								IDCardNo: res.data.data.IDCardNo
							})
						}
						if (res.data.data.words_result) {
							this.setUserData({
								DueDate: res.data.data.DueDate
							})
						}
					}
				} else {
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
								let imgUrl = returnData.data.url;
								if (imgtype == "IDCardPic") {
									this.setUserData({
										IDCardPic: returnData.data.path
									})
									this.maker_idcard(imgUrl, 'front');
								} else {
									this.setUserData({
										IDCardPicBack: returnData.data.path
									})
									this.maker_idcard(imgUrl, 'back');
								}
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
				this.date = e.target.value
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
		height: 100rpx;
		padding: 0rpx 32rpx;
		color: #1E1E1E;
	}

	.rightRow {
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.primaryBtn {
		border-radius: 4rpx;
		background-color: #1666F3;
		font-size: 34rpx;
		color: #fff;
		height: 90rpx;
		line-height: 90rpx;
	}

	.editImgBox {
		width: 100rpx;
		height: 100rpx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.editImg {
		width: 40rpx;
		height: 40rpx;
	}

	.leftcell {
		width: 240rpx;
		color: #333333;
		font-size: 32rpx;
	}

	.rowInput {
		flex: 1;
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
	}

	.pageTitle {
		font-size: 32rpx;
		padding: 24rpx 32rpx;
		color: #333333;
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
		width: 304rpx;
		height: 227rpx;
	}

	.cardImg {
		background-color: #F2F2F2;
	}

	.boxtitle {
		font-size: 24rpx;
		text-align: center;
		margin-bottom: 20rpx;
		color: #333333;
	}

	.redt {
		color: #C20101;
	}
</style>
