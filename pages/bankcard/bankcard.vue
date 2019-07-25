<template>
	<view class="wrapper">

		<view class="celBox bb">
			<text class="c666 leftcell">户名</text>
			<text>{{userData.Name}}</text>
		</view>
		<view class="celBox bb">
			<text class="c666 leftcell">银行卡号</text>
			<input class="inputItem" type="number" maxlength="22" :value="userData.BankCardNo||''" data-key="BankCardNo" @input="inputChange"
			 placeholder="请输入银行卡号" placeholder-style="color:#999" />
		</view>
		<view class="celBox bb">
			<text class="c666 leftcell">开户银行</text>
			<input class="inputItem" type="text" :value="userData.BankName||''" data-key="BankName" @input="inputChange"
			 placeholder="请输入开户银行" placeholder-style="color:#999" />
		</view>
		<view class="celBox bb">
			<text class="c666 leftcell">开户支行</text>
			<input class="inputItem" type="text" :value="userData.SubBankName||''" data-key="SubBankName" @input="inputChange"
			 placeholder="请输入开户支行" placeholder-style="color:#999" />
		</view>
		<text class="tips">必须填写本人银行卡</text>

		<view class="btn-row">
			<button class="primaryBtn" @tap="bindLogin">保存</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		computed: {
			...mapState(['token', 'forcedLogin', 'userData'])
		},
		data() {
			return {

			}
		},
		methods: {
			...mapMutations(['logout']),
			inputChange(e) {
				const key = e.currentTarget.dataset.key;
				this.userData[key] = e.detail.value;
			},
			async bindLogin() {
				const result = await this.$req.ajax({
					path: 'wxapi/member/maker_bank',
					title: '正在加载',
					data: {
						BankCardNo: this.userData.BankCardNo,
						BankName: this.userData.BankName,
						SubBankName: this.userData.SubBankName,
						token: this.token,
					}
				});
				if (result.data.code === 200) {
					this.$api.msg("保存成功");
					setTimeout(function() {
						uni.navigateBack({})
					},800)
				} else {
					this.$api.msg(result.data.message);
					this.logining = false;
				}


			}


		}
	}
</script>

<style scoped>
	.wrapper {
		width: 100%;
		min-height: 100vh;
		background-color: #F2F2F2;
		padding-bottom: 20px;
		;
	}

	.celBox {
		display: flex;
		align-items: center;
		font-size: 28rpx;
		background-color: #FFFFFF;
		min-height: 100rpx;
		padding: 20rpx 30rpx;
		color: #1E1E1E;

	}

	.leftcell {
		width: 180rpx;
	}

	.inputItem {
		flex: 1;
	}

	.bb {
		border-bottom: 1px solid #E4E4E4;
	}

	.mt20 {
		margin-top: 20rpx;
	}

	.primaryBtn {
		background-color: #007AFF;
		color: #FFFFFF;
		height: 100rpx;
		line-height: 100rpx;
		margin-left: 10rpx;
		margin-right: 10rpx;
	}

	.c666 {
		color: #666;
	}

	.tips {
		display: block;
		padding: 30rpx;
		color: #666;
		font-size: 24rpx;
		;
	}

	.cblue {
		color: #1666F3;
	}

	.avator {
		width: 100rpx;
		height: 100rpx;
	}
</style>
