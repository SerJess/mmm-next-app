import routes from "../constants/routes";

const getSEOOptions = (pathnameWithParams, query = "") => {
	const pathname = pathnameWithParams.split("?")[0];

	let searchRoute = pathname;

	let routeData = routes.find((route) => route.path === searchRoute);

	if (!routeData) {
		const splitRoute = searchRoute.replace("/", "").split("/");
		if (splitRoute.length > 1) {
			searchRoute = `/${splitRoute.slice(0, -1).join("/")}/:url`;
		}
		routeData = routes.find((route) => route.path === searchRoute);
		if (!routeData) {
			searchRoute = `/${splitRoute.slice(0, -1).join("/")}/:id`;
		}
		routeData = routes.find((route) => route.path === searchRoute);
	}

	if (routeData && routeData.helmet) {
		const { title, description, noFollow, noIndex } = routeData.helmet;
		const faviconImg = `${process.env.SITE_URL}/static/favicon-32x32.png`;
		const previewImg = `${process.env.SITE_URL}/static/page-preview.png`;
		const canonical = `${process.env.SITE_URL}${query ? `${routeData.helmet.basePath}/${query}` : pathname}`.replace(/\/$/, "");

		return {
			title,
			description,
			faviconImg,
			previewImg,
			canonical,
			noFollow,
			noIndex,
		};
	}
	return {
		title: "",
		description: "",
		keywords: "",
		canonical: "",
	};
};

export default getSEOOptions;
