import React from "react";
import { NextSeo } from "next-seo";

const HelmetComponent = ({ title, description, keywords, imageLink, canonical }) => (
	<NextSeo
		title={title}
		description={description}
		canonical={canonical}
		openGraph={{
			type: "website",
			url: `${canonical}`,
			title: `${title}`,
			description: `${description}`,
			images: [
				{
					url: `${imageLink}`,
					width: 32,
					height: 32,
					alt: "favicon",
				},
			],
		}}
		additionalMetaTags={[
			{
				httpEquiv: "X-UA-Compatible",
				content: "IE=edge",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=5",
			},
			{
				name: "x-ua-compatible",
				content: "IE=edge; chrome=1",
			},
			{
				name: "description",
				content: `${description}`,
			},
			{
				name: "keywords",
				content: `${keywords}`,
			},
		]}
		additionalLinkTags={[
			{
				rel: "dns-prefetch",
				href: "https://fonts.googleapis.com",
			},
			{
				rel: "icon",
				href: "/static/favicon/favicon-32x32.png",
				sizes: "32x32",
			},
			{
				rel: "icon",
				href: "/favicon-32x32.ico",
			},
			{
				rel: "preconnect",
				href: "https://www.google-analytics.com",
			},
			{
				rel: "preconnect",
				href: "https://www.googletagmanager.com",
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com",
			},
		]}
	/>
);

export default HelmetComponent;
