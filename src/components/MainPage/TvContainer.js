import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

import tvImg from "../../assets/img/MainPage/tv/tv.png";
import triangleGreen from "../../assets/img/MainPage/tv/triangleGreen.json";
import triangleRed from "../../assets/img/MainPage/tv/triangleRed.json";
import boostBtnImg from "../../assets/img/MainPage/tv/boostBtn.png";
import boostBtnActiveImg from "../../assets/img/MainPage/tv/boostBtnActive.png";

import "../../assets/scss/MainPage/TvContainer.scss";

const Lottie = dynamic(() => import("lottie-react").then((module) => module), { ssr: false });

const TvContainer = () => (
	<div className="tv-con">
		<div className="tv-img-con">
			<Image src={tvImg} alt={""} width={359} height={230} />
			<div className="triangle-con">
				<Lottie animationData={triangleGreen} loop={false} />
			</div>
			<div className="boost-btn">
				<Image src={boostBtnImg} alt={""} width={66} height={66} />
			</div>
		</div>
	</div>
);

export default TvContainer;
