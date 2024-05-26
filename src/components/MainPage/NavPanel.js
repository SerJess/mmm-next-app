import React from "react";
import Image from "next/image";

import referralsIcon from "../../assets/img/MainPage/navBar/referrals.png";
import achievementIcon from "../../assets/img/MainPage/navBar/achievement.svg";
import leaderboardIcon from "../../assets/img/MainPage/navBar/leaderboard.svg";
import settingsIcon from "../../assets/img/MainPage/navBar/settings.svg";

import "../../assets/scss/MainPage/NavPanel.scss";

const navItems = [
	{
		id: "referrals",
		icon: referralsIcon,
	},
	{
		id: "achievements",
		icon: achievementIcon,
	},
	{
		id: "leaderboard",
		icon: leaderboardIcon,
	},
	{
		id: "settings",
		icon: settingsIcon,
	},
];
const NavPanel = ({ setActiveTab }) => (
	<div className="nav-panel-wrapper wide-con">
		<div className="nav-panel-con">
			{navItems.map((item) => (
				<div key={item.id} className="nav-item" onClick={() => setActiveTab(item.id)}>
					<Image src={item.icon} alt={""} width={20} height={20} />
				</div>
			))}
		</div>
	</div>
);

export default NavPanel;
