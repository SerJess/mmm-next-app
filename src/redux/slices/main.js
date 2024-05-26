import { createSlice } from "@reduxjs/toolkit";

export const mainSlice = createSlice({
	name: "main",
	initialState: {
		isMobile: false,
		user: "",
	},
	reducers: {
		setIsMobile: (state, action) => {
			state.isMobile = action.payload;
		},
		setUser: (state, action) => {
			state.user = action.payload;
		},
	},
});

export const { setIsMobile, setUser } = mainSlice.actions;
