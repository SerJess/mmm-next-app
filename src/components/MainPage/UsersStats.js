import React, { useRef, useState } from "react";
import { Carousel, CarouselItem } from "reactstrap";
import Image from "next/image";
import Countdown, { zeroPad } from "react-countdown";
import { useTranslation } from "next-i18next";
import dayjs from "dayjs";
import CountUp from "react-countup";

import { useAppDispatch, useAppSelector } from "../../redux";
import decimalAdjust from "../../helpers/decimalAdjust";
import easingFunc from "../../helpers/easingFunc";
import { setUser } from "../../redux/slices/main";

import level1Img from "../../assets/img/MainPage/tables/level1.png";
import level2Img from "../../assets/img/MainPage/tables/level2.png";
import level3Img from "../../assets/img/MainPage/tables/level3.png";
import level4Img from "../../assets/img/MainPage/tables/level4.png";
import level5Img from "../../assets/img/MainPage/tables/level5.png";
import level6Img from "../../assets/img/MainPage/tables/level6.png";
import level7Img from "../../assets/img/MainPage/tables/level7.png";

import "../../assets/scss/MainPage/UsersStats.scss";

const imagesByLevel = {
	0: level1Img,
	1: level2Img,
	2: level3Img,
	3: level4Img,
	4: level5Img,
	5: level6Img,
	6: level7Img,
};

const UsersStats = () => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation("common");
	const content = t("content.stats", { returnObjects: true });

	const timerRef = useRef();

	const referralLevel = useAppSelector((state) => state.main.user.referralLevel);
	const balance = useAppSelector((state) => state.main.user.points);
	const income = useAppSelector((state) => state.main.user.income);
	const isBoosted = useAppSelector((state) => state.main.user.usedBoost);
	const isExited = useAppSelector((state) => state.main.user.exited);

	const [hourEnd, setHourEnd] = useState(dayjs().endOf("hour").toDate());

	const level = +Object.keys(imagesByLevel).indexOf(`${referralLevel}`);

	const score = decimalAdjust(+balance / 100, 4);
	const perHour = decimalAdjust(+income / 100, 4);

	const onTimerEnd = () => {
		if (!isExited) {
			dispatch(setUser({ points: +income + +balance }));
		}

		setHourEnd(dayjs().endOf("hour").toDate());
		if (timerRef.current) {
			timerRef.current.api.start();
		}
	};

	return (
		<div className="stats-carousel-by-level">
			<div className="stats-bg">
				<Carousel activeIndex={level} next={() => {}} previous={() => {}} className="tier-slider">
					{Object.values(imagesByLevel).map((img, i) => (
						<CarouselItem key={`stats-img-by-level${i}`} className="custom-tag" tag="div">
							<div className="img-con">
								<Image src={img} alt={""} layout={"responsive"} priority={level === i} />
							</div>
						</CarouselItem>
					))}
				</Carousel>
			</div>
			<div className="users-stats-con">
				<div className="bordered-white level-con">
					{content.yourStatus}
					<span className="diff-color">{content.levels[level]}</span>
				</div>
				<div className="score-con">
					<CountUp decimals={`${+score}`.split(".")[1]?.length || 0} preserveValue end={score} separator={""} easingFn={easingFunc} duration={1} />
				</div>
				<div className="bordered-white timer-con">
					{content.toDrops}
					<Countdown
						ref={timerRef}
						date={hourEnd}
						onComplete={onTimerEnd}
						zeroPadTime={2}
						daysInHours={true}
						renderer={({ formatted: { minutes, seconds } }) => (
							<div className="diff-color">
								{zeroPad(minutes)}:{zeroPad(seconds)}
							</div>
						)}
					/>
				</div>
				<div className="bordered-white per-hour">
					<span className="diff-color">
						{perHour}
						{isBoosted && " x 2"}
					</span>{" "}
					{content.perHour}
				</div>
			</div>
		</div>
	);
};

export default UsersStats;
