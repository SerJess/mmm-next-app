import React, { useRef } from "react";
import { Provider } from "react-redux";
import { store } from "../../redux";

const StoreProvider = ({ children, initialReduxState, clientSideDispatches }) => {
	const storeRef = useRef();
	if (!storeRef.current) {
		storeRef.current = store(initialReduxState);
	}

	if (clientSideDispatches.length) {
		clientSideDispatches.forEach((func) => storeRef.current.dispatch(func));
	}

	return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
