import React from "react";
import Image from "next/image";

import mmmImg from "../../assets/img/MainPage/mmmLogo.png";

import "../../assets/scss/MainPage/LogoTable.scss";

const LogoTable = () => (
	<div className="logo-con">
		<div className="img-wrapper">
			<div className="glow" />
			<div className="img-con">
				<Image src={mmmImg} alt={""} width={320} />
			</div>
		</div>
	</div>
);

export default LogoTable;
