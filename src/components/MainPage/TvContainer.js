import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

import tvImg from "../../assets/img/MainPage/tv/tv.png";
import triangleGreen from "../../assets/img/MainPage/tv/triangleGreen.json";
import triangleRed from "../../assets/img/MainPage/tv/triangleRed.json";
import boostBtnImg from "../../assets/img/MainPage/tv/boostBtn.png";
import boostBtnActiveImg from "../../assets/img/MainPage/tv/boostBtnActive.png";

import "../../assets/scss/MainPage/TvContainer.scss";
import { useAppSelector } from "../../redux";

const Lottie = dynamic(() => import("lottie-react").then((module) => module), { ssr: false });

const TvContainer = () => {
	const isBoostActive = useAppSelector((state) => state.main.user.usedBoost);

	// TODO need to know is available boost exist
	// TODO how to know about daily random booster
	// TODO add info is current pool destroyed

	return (
		<div className="tv-con">
			<div className="tv-img-con">
				<Image src={tvImg} alt={""} width={359} height={230} priority={true} />
				<div className="triangle-con">
					<Lottie animationData={triangleGreen} loop={true} />
				</div>
				<div className="boost-btn">
					<Image src={isBoostActive ? boostBtnActiveImg : boostBtnImg} alt={""} width={66} height={66} />
				</div>
			</div>
		</div>
	);
};

export default TvContainer;
