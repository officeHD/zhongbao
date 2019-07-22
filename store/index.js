import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		openId: "",
		forcedLogin: false,
		hasLogin: false,
		token: "",
		userData: {
			Age: "",
			BankCardNo: "",
			BankName: "",
			CreateDate: "",
			DateVerify: "",
			DescVerify: "",
			DueDate: "",
			FlagVerify: "",
			IDCardNo: "",
			IDCardPic: "",
			IDCardPicBack: "",
			MakerID: "",
			Name: "",
			NameVerifyManual: "",
			PhoneNumber: "",
			PicVerify: "",
			RelaDate: "",
			RunAddress: "",
			SelfDesc: "",
			SelfPic: "",
			Sex: "",
			ShopID: "",
			ShopURL: "",
			ShopUserName: "",
			ShopUserPWD: "",
			StatusVerify: "",
			SubBankName: "",
			WeChatID: "",
		}
	},
	mutations: {
		login(state, token) {
			state.token = token;
			state.hasLogin = true;
			uni.setStorage({ //缓存用户登陆状态
				key: 'token',
				data: token
			})

		},
		logout(state) {
			state.userName = "";
			state.hasLogin = false;
		},
		setUserData(state, obj) {
		 
			Object.assign(state.userData, obj);
		},
		setOpenId(state, id) {
			state.openId = id;
			uni.setStorage({ //缓存用户登陆状态
				key: 'openId',
				data: id
			})
		}
	}
})

export default store
