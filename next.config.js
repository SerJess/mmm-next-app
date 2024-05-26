const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const { i18n } = require("./next-i18next.config");

module.exports = {
	i18n,
	webpack: (configWebpack) => {
		const nextCssLoaders = configWebpack.module.rules.find((rule) => typeof rule.oneOf === "object");
		nextCssLoaders.oneOf.forEach((loader) => {
			if (loader.issuer && loader.issuer.and && loader.issuer.and.join("").toLowerCase().includes("app")) {
				delete loader.issuer;
			}
		});
		configWebpack.plugins.push(
			new ESLintPlugin({
				extensions: ["js"],
				failOnWarning: false,
				failOnError: false,
			})
		);
		configWebpack.plugins.push(
			new StylelintPlugin({
				extensions: ["scss"],
				failOnWarning: false,
				failOnError: false,
			})
		);

		return configWebpack;
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	env: {
		API: process.env.API,
		SITE_URL: process.env.SITE_URL,
		APP_DOMAIN: process.env.APP_DOMAIN,
		TON_MANIFEST_URL: process.env.TON_MANIFEST_URL,
	},
	sassOptions: {
		includePaths: [path.join(__dirname, "assets/scss")],
	},
};
