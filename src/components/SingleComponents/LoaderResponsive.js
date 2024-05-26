import React from "react";

import "../../assets/scss/SingleComponents/LoaderResponsive.scss";

const LoaderResponsive = () => (
	<div className="loader-responsive-con">
		<div className="icon-con">
			<svg className="circular-loader" viewBox="25 25 50 50">
				<circle className="loader-path" cx="50" cy="50" r="20" fill="none" stroke="white" strokeWidth="2" />
			</svg>
		</div>
	</div>
);

export default LoaderResponsive;
