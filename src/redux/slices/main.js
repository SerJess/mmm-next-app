import { createSlice } from "@reduxjs/toolkit";

export const mainSlice = createSlice({
	name: "main",
	initialState: {
		isMobile: false,
		user: {
			chatId: 0,
			username: "",
			referralCounter: 0,
			referralLevel: 0,
			income: 0,
			points: "0", // "2_00"
			balance: "0", // "1_0000"
			usedBoost: false,
			lastGuaranteedBoostUsageDate: new Date().toString(),
			exited: false,
			walletAddress: "",
			referralCode: "",
		},
	},
	reducers: {
		setIsMobile: (state, action) => {
			state.isMobile = action.payload;
		},
		setUser: (state, action) => {
			state.user = { ...state.user, ...action.payload };
		},
	},
});

export const { setIsMobile, setUser } = mainSlice.actions;
