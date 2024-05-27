import { deleteCookie } from "cookies-next";
import getAccessToken from "./getAccessToken";
import fetchData from "./fetchData";

const fetchWithToken = async (url, options = {}, contentType = "application/json", ctx = {}) => {
	const headers = {};

	const accessToken = await getAccessToken(ctx);

	if (accessToken) {
		headers.Authorization = `Bearer ${accessToken}`;
	}

	const response = await fetchData(url, { ...options }, contentType, headers);

	if (response.status === 401) {
		await deleteCookie("accessToken", { ...ctx, domain: process.env.APP_DOMAIN });
		await deleteCookie("refreshToken", { ...ctx, domain: process.env.APP_DOMAIN });
		return null;
	}

	const json = await response.json();

	return json;
};

export default fetchWithToken;
