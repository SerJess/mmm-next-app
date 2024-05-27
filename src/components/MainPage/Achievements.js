import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";

import LoaderResponsive from "../SingleComponents/LoaderResponsive";

import tableBigImg from "../../assets/img/MainPage/tableBig.png";
import achievementsImg from "../../assets/img/MainPage/achievements.png";

import "../../assets/scss/MainPage/Achievements.scss";

const Achievements = ({ closeTab }) => {
	const { t } = useTranslation("common");
	const content = t("content.achievements", { returnObjects: true });

	const [isLoading, setIsLoading] = useState(true);
	const [items, setItems] = useState([]);

	const fetchAchievements = async () => {
		try {
			setIsLoading(true);

			// TODO: fetch achievements
			await new Promise((resolve) => setTimeout(resolve, 1000));

			setItems([
				{ title: "Заработать 1м $MMM", reward: "1м/1м" },
				{ title: "Заработать 1м $MMM", reward: "1м/1м" },
				{ title: "Заработать 1м $MMM", reward: "1м/1м" },
				{ title: "Заработать 1м $MMM", reward: "1м/1м" },
				{ title: "Заработать 1м $MMM", reward: "1м/1м" },
				{ title: "Заработать 1м $MMM", reward: "1м/1м" },
				{ title: "Заработать 1м $MMM", reward: "1м/1м" },
				{ title: "Заработать 1м $MMM", reward: "1м/1м" },
				{ title: "Заработать 1м $MMM", reward: "1м/1м" },
			]);
			setIsLoading(false);
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		fetchAchievements();
	}, []);

	return (
		<div className="achievements-con wide-con">
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
							<Image src={achievementsImg} alt={""} width={138} height={40} />
						</div>
						<div className="bordered-white achievements-con">
							<p className="title">{content.title}</p>
							{items.map(({ title, reward }, i) => (
								<div key={`reward-item${i}`} className="achievement-item">
									<div className="descr-con">
										<div className="img-con"></div>
										<div className="descr">{title}</div>
									</div>
									<div className="descr-reward">{reward}</div>
								</div>
							))}
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

export default Achievements;
