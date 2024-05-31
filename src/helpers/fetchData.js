import fetch from "isomorphic-fetch";

const fetchData = (url, options = {}, contentType = "application/json", additionalHeaders = {}) => {
	const headers = {
		Accept: "application/json",
		...additionalHeaders,
	};

	if (contentType) {
		headers["Content-Type"] = contentType;
	}

	const originUrl = process.env.API;

	if (options.body) {
		options.body = JSON.stringify(options.body);
	}

	if (options.method === "POST" && !options.body) {
		delete headers["Content-Type"];
	}

	return fetch(`${originUrl || ""}${url}`, {
		headers,
		...options,
	});
};

export default fetchData;
