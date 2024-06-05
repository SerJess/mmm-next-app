import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { Carousel, CarouselItem } from "reactstrap";

import { useAppSelector } from "../../redux";

import decimalAdjust from "../../helpers/decimalAdjust";
import fetchWithToken from "../../helpers/fetchWithToken";

import LoaderResponsive from "../SingleComponents/LoaderResponsive";

import leaderboardImg from "../../assets/img/MainPage/leaderboard.png";
import tableBigImg from "../../assets/img/MainPage/tableBig.png";
import userImg from "../../assets/img/MainPage/user.png";

import "../../assets/scss/MainPage/Leaderboard.scss";

const Leaderboard = () => {
	const { t } = useTranslation("common");
	const content = t("content.leaderboard", { returnObjects: true });

	const usersReferralLevel = useAppSelector((state) => state.main.user.referralLevel);

	const [isLoading, setIsLoading] = useState(true);
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState([]);
	const [totalUsers, setTotalUsers] = useState(0);
	const [activeSlide, setActiveSlide] = useState(0);

	const fetchLeaderboard = async () => {
		try {
			setIsLoading(true);

			const { success, data } = await fetchWithToken("/leaderboard", {
				method: "GET",
			});

			if (success) {
				setUser(data.user);
				setUsers(data.leaderboard);
				setTotalUsers(data.stats.users);
			}

			/*
			{
    "success": true,
    "data": {
        "leaderboard": [
            {
                "name": "anonym",
                "amount": 10000,
                "avatarUrl": "",
                referralLevel: 1
            },
            {
                "name": "anonym",
                "amount": 0,
                "avatarUrl": "https://avatars.cloudflare.steamstatic.com/6a991cedbf9caf7e0dfd32c5f17f13820c818bf8_full.jpg",
                referralLevel: 1
            }
        ],
        "user": {
            "place": 1,
            "name": "anonym",
            "amount": 10000
        }
    }
			 */
		} catch (e) {
			console.error(e);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchLeaderboard();
		const timer = setInterval(() => {
			setActiveSlide((prevState) => (prevState + 1) % 2);
		}, 4000);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<div className="leaderboard-con wide-con">
			<div className="tab-main-content">
				<div className="bg-img">
					<Image src={tableBigImg} alt={""} layout="fill" />
				</div>
				{isLoading && (
					<div className="loader-con">
						<LoaderResponsive />
					</div>
				)}
				{!isLoading && (
					<div className="main-wrapper">
						<div className="bordered-white heading-con">
							<Image src={leaderboardImg} alt={""} width={138} height={48} />
						</div>
						<div className="bordered-white referral-stats-con">
							<div className="carousel-wrapper">
								<Carousel activeIndex={activeSlide} next={() => {}} previous={() => {}} className="ref-slider">
									<CarouselItem className="custom-tag" tag="div">
										<div className="stats-item">
											<div className="descr">{content.amount}</div>
											<div className="descr">{decimalAdjust(+user.balance / 10000, 4)}</div>
										</div>
									</CarouselItem>
									<CarouselItem className="custom-tag" tag="div">
										<div className="stats-item">
											<div className="descr">{content.totalUsers}</div>
											<div className="descr">{totalUsers}</div>
										</div>
									</CarouselItem>
								</Carousel>
								<div className="carousel-indiacation-con">
									<div className={`indicator-item${activeSlide === 0 ? " active" : ""}`} />
									<div className={`indicator-item${activeSlide === 1 ? " active" : ""}`} />
								</div>
							</div>
						</div>
						<div className="bordered-white users-list">
							<div className="global-users-list">
								<div className="title">{content.title}</div>
								{users.map((item, i) => (
									<div key={`global-user${i}`} className={`list-item${i < 3 ? " bordered-green" : ""}`}>
										<div className="main-wrap">
											<div className="place">#{i + 1}</div>
											<div className="avatar-con" style={{ backgroundImage: `url(${item?.avatarUrl || userImg.src})` }} />
											<div className="name">
												{item.name}
												<span className="level">({content.levels[item.referralLevel || 0]})</span>
											</div>
										</div>
										<div className="amount">{item.amount}</div>
									</div>
								))}
							</div>
							<div className={"list-item"}>
								<div className="main-wrap">
									<div className="place">#{user.place}</div>
									<div className="avatar-con" style={{ backgroundImage: `url(${user?.avatarUrl || userImg.src})` }} />
									<div className="name">
										{content.you}
										<span className="level">({content.levels[usersReferralLevel || 0]})</span>
									</div>
								</div>
								<div className="amount">{user.amount}</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Leaderboard;
