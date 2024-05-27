import { deleteCookie, getCookie, hasCookie, setCookie } from "cookies-next";
import isTokenExpired from "./isTokenExpired";
import fetchData from "./fetchData";

// tokenData:
/*
{
	accessToken: ACCESS_TOKEN,
	refreshToken: REFRESH_TOKEN,
}
*/

const getAccessToken = async (ctx = {}) => {
	let refreshToken = "";
	let accessToken = "";

	if (hasCookie("refreshToken", { ...ctx, domain: process.env.APP_DOMAIN })) {
		refreshToken = await getCookie("refreshToken", { ...ctx, domain: process.env.APP_DOMAIN });
		if (isTokenExpired(refreshToken)) {
			await deleteCookie("refreshToken", { ...ctx, domain: process.env.APP_DOMAIN });
			refreshToken = "";
		}
	}

	if (hasCookie("accessToken", { ...ctx, domain: process.env.APP_DOMAIN })) {
		accessToken = await getCookie("accessToken", { ...ctx, domain: process.env.APP_DOMAIN });
		if (isTokenExpired(accessToken)) {
			await deleteCookie("accessToken", { ...ctx, domain: process.env.APP_DOMAIN });
			accessToken = "";
		}
	}

	if (!accessToken && refreshToken) {
		if (refreshToken) {
			try {
				const request = await fetchData("/user/refresh", {
					body: { refreshToken },
					method: "GET",
				});
				const result = await request.json();

				accessToken = result.data.accessToken || "";
				if (accessToken) {
					let expires = new Date();
					expires = new Date(expires.getUTCFullYear() + 1, expires.getUTCMonth(), expires.getUTCDate());
					await setCookie("accessToken", accessToken, { ...ctx, expires, domain: process.env.APP_DOMAIN });
				}
			} catch (e) {
				console.error(e);
			}
		}
	}
	return accessToken;
};

export default getAccessToken;
