import { APP_ROUTES } from "./appRoutes";

// Routes

const MainRoute = {
	path: APP_ROUTES.HOME,
	helmet: {
		title: "Home",
		description: "",
		keywords: "",
		noIndex: true,
		noFollow: true,
		hasQuery: false,
	},
};
const PlayRoute = {
	path: APP_ROUTES.PLAY,
	helmet: {
		title: "Play",
		description: "",
		keywords: "",
		noIndex: true,
		noFollow: true,
		hasQuery: false,
	},
};

const NotFoundRoute = {
	path: "/404",
	helmet: {
		title: "Page not found",
		description: "Page not found",
		keywords: "",
	},
};

export default [MainRoute, NotFoundRoute, PlayRoute];
