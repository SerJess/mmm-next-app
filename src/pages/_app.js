import React from "react";
import App from "next/app";
import Router from "next/router";
import { parse } from "next-useragent";
import { appWithTranslation } from "next-i18next";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { setCookie } from "cookies-next";
import { ToastContainer } from "react-toastify";

import { setIsMobile } from "../redux/slices/main";
import { store } from "../redux";

import StoreProvider from "../components/NextComponets/StoreProvider";
import Loader from "../components/SingleComponents/Loader";
import HelmetComponent from "../components/SingleComponents/HelmetComponent";
import { TelegramProvider } from "../components/NextComponets/TelegramProvider";

import "../assets/scss/main.scss";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class WebApp extends App {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			url: "",
		};
	}

	componentDidMount() {
		Router.events.on("routeChangeStart", (url) => {
			const { url: prevUrl } = this.state;
			const newPath = url.split("?")[0];
			if (prevUrl !== newPath) {
				this.setState({
					isLoading: true,
					url: newPath,
				});
			}
		});

		Router.events.on("routeChangeComplete", async () => {
			this.setState({
				isLoading: false,
			});
		});
	}

	render() {
		const { Component, pageProps, initialReduxState, clientSideDispatches } = this.props;
		const { isLoading } = this.state;

		return (
			<TelegramProvider>
				<TonConnectUIProvider manifestUrl={process.env.TON_MANIFEST_URL}>
					<StoreProvider initialReduxState={initialReduxState} clientSideDispatches={clientSideDispatches}>
						<div id="next-app">
							{isLoading && <Loader />}
							{!isLoading && (
								<div className="wrapper">
									<HelmetComponent {...pageProps} />
									<div className="main-body">
										<div className="content">
											<Component {...pageProps} isLoading={isLoading} />
										</div>
									</div>
								</div>
							)}
							<ToastContainer />
						</div>
					</StoreProvider>
				</TonConnectUIProvider>
			</TelegramProvider>
		);
	}
}

WebApp.getInitialProps = async (context) => {
	const { ctx } = context;
	const isSSR = typeof window === "undefined";

	let ua = "";
	let reduxStore = null;
	if (isSSR) {
		ua = parse(ctx.req.headers["user-agent"]);
	} else {
		ua = { isMobile: window.innerWidth < 992, isTablet: window.innerWidth < 768 };
	}

	const { accessToken, refreshToken } = ctx.query;

	if (accessToken || refreshToken) {
		await setCookie("accessToken", accessToken, { ...ctx, domain: process.env.APP_DOMAIN });
		await setCookie("refreshToken", refreshToken, { ...ctx, domain: process.env.APP_DOMAIN });
	}

	if (isSSR) {
		reduxStore = store();
		const { dispatch } = reduxStore;

		dispatch(setIsMobile(ua.isMobile));
	}

	return {
		...(await App.getInitialProps(context)),
		pathname: ctx.pathname,
		initialReduxState: reduxStore,
		clientSideDispatches: [setIsMobile(ua.isMobile)],
	};
};

export default appWithTranslation(WebApp);
