import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";

import LoaderResponsive from "../SingleComponents/LoaderResponsive";
import { useAppSelector } from "../../redux";
import fetchWithToken from "../../helpers/fetchWithToken";

import tableBigImg from "../../assets/img/MainPage/tableBig.png";
import referralsImg from "../../assets/img/MainPage/referrals.png";

import "../../assets/scss/MainPage/Referrals.scss";

const COMMON_REF = "+1,500 $MMM ";
const PREMIUM_REF = "+10,500 $MMM ";
const textForDm = "Hey! Check it out!";

const Referrals = ({ closeTab }) => {
	const { t } = useTranslation("common");
	const content = t("content.referrals", { returnObjects: true });

	const usersRefLink = useAppSelector((state) => state.main.user.referralCode);

	const [isLoading, setIsLoading] = useState(true);
	const [stats, setStats] = useState({});

	const getShareLink = () => `https://t.me/share/url?url=${usersRefLink}&text=${textForDm}`;

	const fetchStats = async () => {
		try {
			setIsLoading(true);

			const { success, data, error } = await fetchWithToken("/users/referrals");

			if (!success || error?.message) {
				return toast.error(error?.message || "Something went wrong");
			}

			// TODO return grouped by level - data: {1:100, 2: 200...}
			setStats(data);
			setIsLoading(false);
		} catch (e) {
			console.error(e);
		}
		return false;
	};

	useEffect(() => {
		fetchStats();
	}, []);

	return (
		<div className="referrals-con wide-con">
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
							<Image src={referralsImg} alt={""} width={144} height={40} />
						</div>
						<div className="bordered-white referral-stats-con">
							<p className="title">{content.title}</p>
							<div className="ref-info-con">
								<div className="referral-item">
									<div className="img-con"></div>
									<div className="descr-con">
										<p className="descr-main">{content.invite}</p>
										<p className="descr">
											<span className="diff-color">{COMMON_REF}</span>
											{content.invite}
										</p>
									</div>
								</div>
								<div className="referral-item">
									<div className="img-con"></div>
									<div className="descr-con">
										<p className="descr-main">{content.premium}</p>
										<p className="descr">
											<span className="diff-color">{PREMIUM_REF}</span>
											{content.invite}
										</p>
									</div>
								</div>
							</div>
							<a href={getShareLink()} className="bordered-green share-btn">
								{content.share}
							</a>
						</div>
						<div className="bordered-white ref-list">
							<p className="title">{content.yourRef}</p>
							{Object.keys(content.levels)
								.reverse()
								.map((levelKey, i) => (
									<div key={`stat-item${i}`} className="stat-item">
										<div>{content.levels[levelKey]}</div>
										<div className="diff-color">{stats?.[levelKey] || 0}</div>
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

export default Referrals;
