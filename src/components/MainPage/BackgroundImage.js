import React from "react";
import { Carousel, CarouselItem } from "reactstrap";
import Image from "next/image";

import { useAppSelector } from "../../redux";

import level1Img from "../../assets/img/MainPage/bg/level1.png";
import level2Img from "../../assets/img/MainPage/bg/level2.png";
import level3Img from "../../assets/img/MainPage/bg/level3.png";
import level4Img from "../../assets/img/MainPage/bg/level4.png";
import level5Img from "../../assets/img/MainPage/bg/level5.png";
import level6Img from "../../assets/img/MainPage/bg/level6.png";
import level7Img from "../../assets/img/MainPage/bg/level7.png";

import "../../assets/scss/MainPage/BackgroundImage.scss";

const imagesByLevel = {
	0: level7Img,
	7: level1Img,
	6: level2Img,
	5: level3Img,
	4: level4Img,
	3: level5Img,
	2: level6Img,
	1: level7Img,
};

const BackgroundImage = () => {
	const referralLevel = useAppSelector((state) => state.main.user.referralLevel);

	const level = +Object.keys(imagesByLevel).indexOf(`${referralLevel}`);
	return (
		<div className="bg-carousel-by-level">
			<Carousel activeIndex={level} next={() => {}} previous={() => {}} className="tier-slider">
				{Object.values(imagesByLevel).map((img, i) => (
					<CarouselItem key={`bg-img-by-level${i}`} className="custom-tag" tag="div">
						<div className="img-con">
							<Image src={img} alt={""} layout={"fill"} priority={level === i} />
						</div>
					</CarouselItem>
				))}
			</Carousel>
		</div>
	);
};

export default BackgroundImage;
