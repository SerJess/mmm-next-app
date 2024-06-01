import React from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";

import { useAppSelector } from "../../redux";

import tableBigImg from "../../assets/img/MainPage/tableBig.png";
import achievementsImg from "../../assets/img/MainPage/achievements.png";
import completedImg from "../../assets/img/MainPage/completed.png";

import "../../assets/scss/MainPage/Achievements.scss";

const Achievements = ({ closeTab }) => {
	const { t } = useTranslation("common");
	const content = t("content.achievements", { returnObjects: true });
	const referralLevel = useAppSelector((state) => state.main.user.referralLevel);

	const items = [
		{ title: content.achievements["2"], reward: "0,5" },
		{ title: content.achievements["3"], reward: "3" },
		{ title: content.achievements["4"], reward: "10" },
		{ title: content.achievements["5"], reward: "50" },
		{ title: content.achievements["6"], reward: "250" },
		{ title: content.achievements["7"], reward: "1000" },
	];

	return (
		<div className="achievements-con wide-con">
			<div className="tab-main-content">
				<div className="bg-img">
					<Image src={tableBigImg} alt={""} layout="fill" />
				</div>
				<div className="main-wrapper">
					<div className="bordered-white heading-con">
						<Image src={achievementsImg} alt={""} width={138} height={40} />
					</div>
					<div className="bordered-white achievements-con">
						<p className="title">{content.title}</p>
						{items.map(({ title, reward }, i) => (
							<div key={`reward-item${i}`} className="achievement-item">
								<div className="descr-con">
									<div className="img-con">{!!+referralLevel && i <= 6 - +referralLevel + 1 && <Image src={completedImg} alt={""} width={32} height={32} />}</div>
									<div className="descr">{title}</div>
								</div>
								<div className="descr-reward">
									{reward}
									<br />
									{content.perHour}
								</div>
							</div>
						))}
					</div>
				</div>
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
