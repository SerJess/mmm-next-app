import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";

import LoaderResponsive from "../SingleComponents/LoaderResponsive";

import leaderboardImg from "../../assets/img/MainPage/leaderboard.png";
import referralsGreenImg from "../../assets/img/MainPage/referralsGreen.png";
import tableBigImg from "../../assets/img/MainPage/tableBig.png";

import "../../assets/scss/MainPage/Leaderboard.scss";

const Leaderboard = ({ closeTab }) => {
	const { t } = useTranslation("common");
	const content = t("content.leaderboard", { returnObjects: true });

	const [isLoading, setIsLoading] = useState(true);
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState([]);

	const fetchLeaderboard = async () => {
		try {
			setIsLoading(true);

			// TODO: fetch fetchLeaderboard from the server
			await new Promise((resolve) => setTimeout(resolve, 1000));

			setUser({
				place: 111,
				avatarUrl: "https://avatars.cloudflare.steamstatic.com/6a991cedbf9caf7e0dfd32c5f17f13820c818bf8_full.jpg",
				name: "asdasda",
				amount: 12312412,
			});
			setUsers([
				{
					avatarUrl: "https://avatars.cloudflare.steamstatic.com/6a991cedbf9caf7e0dfd32c5f17f13820c818bf8_full.jpg",
					name: "asdasda",
					amount: 12312412,
				},
				{
					avatarUrl: "https://avatars.cloudflare.steamstatic.com/6a991cedbf9caf7e0dfd32c5f17f13820c818bf8_full.jpg",
					name: "asdasda",
					amount: 12312412,
				},
				{
					avatarUrl: "https://avatars.cloudflare.steamstatic.com/6a991cedbf9caf7e0dfd32c5f17f13820c818bf8_full.jpg",
					name: "asdasda",
					amount: 12312412,
				},
				{
					avatarUrl: "https://avatars.cloudflare.steamstatic.com/6a991cedbf9caf7e0dfd32c5f17f13820c818bf8_full.jpg",
					name: "asdasda",
					amount: 12312412,
				},
				{
					avatarUrl: "https://avatars.cloudflare.steamstatic.com/6a991cedbf9caf7e0dfd32c5f17f13820c818bf8_full.jpg",
					name: "asdasda",
					amount: 12312412,
				},
				{
					avatarUrl: "https://avatars.cloudflare.steamstatic.com/6a991cedbf9caf7e0dfd32c5f17f13820c818bf8_full.jpg",
					name: "asdasda",
					amount: 12312412,
				},
				{
					avatarUrl: "https://avatars.cloudflare.steamstatic.com/6a991cedbf9caf7e0dfd32c5f17f13820c818bf8_full.jpg",
					name: "asdasda",
					amount: 12312412,
				},
				{
					avatarUrl: "https://avatars.cloudflare.steamstatic.com/6a991cedbf9caf7e0dfd32c5f17f13820c818bf8_full.jpg",
					name: "asdasda",
					amount: 12312412,
				},
			]);
			setIsLoading(false);
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		fetchLeaderboard();
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
							<div className="stats-item">
								<div className="descr">{content.referrals}</div>
								<div className="descr">
									<div className="icon-con">
										<Image src={referralsGreenImg} alt={""} width={25} height={25} />
									</div>
									123123
								</div>
							</div>
							<div className="stats-item">
								<div className="descr">{content.amount}</div>
								<div className="descr">213213</div>
							</div>
							<div className="stats-item">
								<div className="descr">{content.totalUsers}</div>
								<div className="descr">23123</div>
							</div>
						</div>
						<div className="bordered-white users-list">
							<div className="global-users-list">
								<div className="title">{content.title}</div>
								{users.map((item, i) => (
									<div key={`global-user${i}`} className={`list-item${i < 3 ? " bordered-green" : ""}`}>
										<div className="main-wrap">
											<div className="place">#{i + 1}</div>
											<div className="avatar-con" style={{ backgroundImage: `url(${item?.avatarUrl})` }} />
											<div className="name">{item.name}</div>
										</div>
										<div className="amount">{item.amount}</div>
									</div>
								))}
							</div>
							<div className={"list-item"}>
								<div className="main-wrap">
									<div className="place">#{100}</div>
									<div className="avatar-con" style={{ backgroundImage: `url(${user?.avatarUrl})` }} />
									<div className="name">{content.you}</div>
								</div>
								<div className="amount">{user.amount}</div>
							</div>
						</div>
					</div>
				)}
			</div>
			<div className="close-btn-con">
				<div className="bordered-green close-btn" onClick={closeTab}>
					{content.close}
				</div>
			</div>
		</div>
	);
};

export default Leaderboard;
