import React from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";

import tableBigImg from "../../assets/img/MainPage/tableBig.png";
import achievementsImg from "../../assets/img/MainPage/achievements.png";
import completedImg from "../../assets/img/MainPage/completed.png";

import "../../assets/scss/MainPage/Achievements.scss";
import { useAppSelector } from "../../redux";

const Achievements = ({ closeTab }) => {
	const { t } = useTranslation("common");
	const content = t("content.achievements", { returnObjects: true });
	const referralLevel = useAppSelector((state) => state.main.user.referralLevel);

	const items = [
		{ title: content.achievements["1"], reward: `0.5 ${content.perHour}` },
		{ title: content.achievements["2"], reward: `3 ${content.perHour}` },
		{ title: content.achievements["3"], reward: `10 ${content.perHour}` },
		{ title: content.achievements["4"], reward: `50 ${content.perHour}` },
		{ title: content.achievements["5"], reward: `250 ${content.perHour}` },
		{ title: content.achievements["6"], reward: `1000 ${content.perHour}` },
		{ title: content.achievements["7"], reward: `3000 ${content.perHour}` },
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
									<div className="img-con">{!!+referralLevel && i <= 7 - +referralLevel && <Image src={completedImg} alt={""} width={32} height={32} />}</div>
									<div className="descr">{title}</div>
								</div>
								<div className="descr-reward">{reward}</div>
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
