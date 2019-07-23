<template>
	<view class="wrapper">
		<view class="topgroup">
			<view class="pageTitle">上传图片</view>
			<view class="imgBox">
				<view class="boxItem">
					<view class="boxtitle">身份证正面+反面合一复印件 </view>
					<view @click="testUp(index)">
						<image v-if="userData.IDCardCopy" class="boxImg" :src="'http://c_inventory.i2f2f.com'+userData.IDCardCopy" mode="widthFix"></image>
						<image v-else class="boxImg" src="../../static/img/idcopy.png" mode="widthFix"></image>
					</view>
				</view>

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

			return {
				idImg: ""
			}
		},
		computed: {
			...mapState(['token', 'userData'])
		},
		methods: {
			async toRegister() {


				var res = await this.$req.ajax({
					path: '/wxapi/member/maker_CardCopy',
					title: '保存中',
					data: {
						url: this.idImg,
						token: this.token

					}
				});
				if (res.data.code == 200) {
					// console.log(res.data.data)
					this.$api.msg("保存成功");
					uni.navigateBack({

					})
				} else {
					this.$api.msg(res.data.message);
				}
			},
			async testUp(index) {
				try {
					const res = await rup.selectFiles({
						type: 2,
						maximum: 1,
						upload: {
							path: 'https://www.appi2b2b.comwxapi/member/Uplode',
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
								this.userData.IDCardCopy = returnData.data.url;
							}

						})
					}
				} catch (e) {
					console.log(e)
				}
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

	.leftcell {
		width: 200rpx;
	}

	.bb {
		border-bottom: 1px solid #E4E4E4;
	}

	.topgroup {
		background-color: #FFFFFF;
		padding-bottom: 20rpx;
	}

	.wrapper {
		background-color: #F2F2F2;
		height: 100vh;
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
		width: 360rpx;
		display: block;
		margin: 30rpx auto;
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
