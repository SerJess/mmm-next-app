import React, { useEffect, useRef, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { toast } from "react-toastify";

import getSEOOptions from "../helpers/getSEOOptions";
import fetchWithToken from "../helpers/fetchWithToken";
import { useAppDispatch } from "../redux";
import { setUser } from "../redux/slices/main";

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
import { NewLevelModal } from "../components/MainPage/settings/SettingsModals";
import AccessModal from "../components/MainPage/AccessModal";

import "../assets/scss/MainPage/main.scss";

const Index = () => {
	const dispatch = useAppDispatch();
	const refetchIncome = useRef();

	const [activeTab, setActiveTab] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [isNewLevel, setIsNewLevel] = useState(false);
	const [isShowLoader, setIsShowLoader] = useState(true);
	const [isAllowedToPlay, setIsAllowedToPlay] = useState(false);

	const getUser = async () => {
		try {
			const { success, data, error } = await fetchWithToken("/users");

			if (!success || error?.message || !data) {
				return toast.error(error?.message || "Something went wrong");
			}

			const prevLevel = localStorage.getItem(`prevLevel-${data.chatId}`);
			if (prevLevel && `${prevLevel}` !== `${data.referralLevel}`) {
				setIsNewLevel(true);
			}
			localStorage.setItem(`prevLevel-${data.chatId}`, `${data.referralLevel}`);

			setIsAllowedToPlay(data.allowedToPlay);
			return data;
		} catch (e) {
			console.error(e);
		}
		return false;
	};

	const getUserIncome = async () => {
		try {
			const { success, data, error } = await fetchWithToken("/users/income");

			if (!success || error?.message) {
				return toast.error(error?.message || "Something went wrong");
			}

			return data || 0;
		} catch (e) {
			console.error(e);
		}
		return false;
	};

	const fetchUserDataAsync = async () => {
		setIsLoading(true);
		const [user, income] = await Promise.all([getUser(), getUserIncome()]);

		if (user) {
			dispatch(setUser({ ...user, income }));
			setIsLoading(false);
			refetchIncome.current = setInterval(async () => {
				const newIncome = await getUserIncome();
				if (newIncome) {
					dispatch(setUser({ income: newIncome }));
				}
			}, 10000);
		}
	};

	useEffect(() => {
		fetchUserDataAsync();

		return () => {
			clearInterval(refetchIncome.current);
		};
	}, []);

	useEffect(() => {
		if (!isLoading) {
			setTimeout(() => {
				setIsShowLoader(false);
			}, 2000);
		}
	}, [isLoading]);

	return (
		<>
			{isShowLoader && <div className="loader-image" />}
			{!isLoading && (
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
									<NewLevelModal isOpen={isNewLevel} close={() => setIsNewLevel(false)} />
									{!isAllowedToPlay && !isShowLoader && <AccessModal closeModal={() => setIsAllowedToPlay(true)} />}
								</>
							)}
							{activeTab === "leaderboard" && <Leaderboard />}
							{activeTab === "settings" && <Settings />}
							{activeTab === "referrals" && <Referrals />}
							{activeTab === "achievements" && <Achievements />}
						</div>
						<NavPanel setActiveTab={setActiveTab} />
					</div>
				</div>
			)}
		</>
	);
};

export const getServerSideProps = async ({ locale, resolvedUrl }) => ({
	props: {
		...(await serverSideTranslations(locale, ["common"])),
		...getSEOOptions(resolvedUrl),
	},
});
export default Index;
