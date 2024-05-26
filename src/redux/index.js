import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import reducers from "./slices";

export const store = (preloadedState = {}) =>
	configureStore({
		reducer: reducers,
		preloadedState,
	});

export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
export const useAppStore = useStore;
