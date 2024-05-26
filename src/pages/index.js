import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import getSEOOptions from "../helpers/getSEOOptions";

import LogoTable from "../components/MainPage/LogoTable";
import BackgroundImage from "../components/MainPage/BackgroundImage";
import UsersStats from "../components/MainPage/UsersStats";
import TvContainer from "../components/MainPage/TvContainer";
import ClaimBtn from "../components/MainPage/ClaimBtn";
import NavPanel from "../components/MainPage/NavPanel";
import Leaderboard from "../components/MainPage/Leaderboard";
import Settings from "../components/MainPage/settings/Settings";
import Referrals from "../components/MainPage/Referrals";
import Achievements from "../components/MainPage/Achievements";

import "../assets/scss/MainPage/main.scss";

const Index = () => {
	const [activeTab, setActiveTab] = React.useState("");
	return (
		<div className="main-page-con">
			<BackgroundImage />
			<div className="page-content-con">
				<div className="main-screen-con">
					{!activeTab && (
						<>
							<LogoTable />
							<UsersStats />
							<TvContainer />
							<ClaimBtn />
						</>
					)}
					{activeTab === "leaderboard" && <Leaderboard closeTab={() => setActiveTab("")} />}
					{activeTab === "settings" && <Settings closeTab={() => setActiveTab("")} />}
					{activeTab === "referrals" && <Referrals closeTab={() => setActiveTab("")} />}
					{activeTab === "achievements" && <Achievements closeTab={() => setActiveTab("")} />}
				</div>
				<NavPanel setActiveTab={setActiveTab} />
			</div>
		</div>
	);
};

export const getServerSideProps = async ({ locale, resolvedUrl }) => ({
	props: {
		...(await serverSideTranslations(locale, ["common"])),
		...getSEOOptions(resolvedUrl),
	},
});
export default Index;
