import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";
import Slider from "react-slick";

import LoaderResponsive from "../SingleComponents/LoaderResponsive";
import { useAppSelector } from "../../redux";
import fetchWithToken from "../../helpers/fetchWithToken";

import tableBigImg from "../../assets/img/MainPage/tableBig.png";
import referralsImg from "../../assets/img/MainPage/referrals.png";
import friendImg from "../../assets/img/MainPage/settings/friend.png";
import premiumImg from "../../assets/img/MainPage/settings/premium.png";

import "../../assets/scss/MainPage/Referrals.scss";

const COMMON_REF = `+${process.env.REWARD_MMM_BY_FREN} $MMM `;
const PREMIUM_REF = `+${process.env.REWARD_MMM_BY_PREMIUM_FREN} $MMM `;

const Referrals = () => {
	const { t } = useTranslation("common");
	const content = t("content.referrals", { returnObjects: true });

	const usersRefLink = useAppSelector((state) => state.main.user.referralCode);

	const [isLoading, setIsLoading] = useState(true);
	const [stats, setStats] = useState({});

	const copyLink = () => {
		navigator.clipboard.writeText(`https://t.me/${process.env.BOT_USER_NAME}?start=r-${usersRefLink}`);
		toast.success(content.copied, { toastId: "copied", autoClose: 2000 });
	};

	const fetchStats = async () => {
		try {
			setIsLoading(true);

			const { success, data, error } = await fetchWithToken("/users/referrals");

			if (!success || error?.message) {
				return toast.error(error?.message || "Something went wrong");
			}

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
							<div className="carousel-wrapper">
								<Slider
									className="ch-slider" // ref-slider
									dotsClass="slick-dots"
									arrows={false}
									autoplay={true}
									autoplaySpeed={4000}
									dots={true}
									appendDots={(dots) => (
										<div className="carousel-indiacation-con">
											{dots.map(({ props: dotProps }, i) => (
												<div key={`slick-dot${i}`} className={`indicator-item ${dotProps.className}`} />
											))}
										</div>
									)}
								>
									<div className="referral-item">
										<div className="referral-item-wrapepr">
											<div className="img-con">
												<Image src={friendImg} alt={""} width={32} height={32} />
											</div>
											<div className="descr-con">
												<p className="descr-main">{content.invite}</p>
												<p className="descr">
													<span className="diff-color">{COMMON_REF}</span>
													{content.invite}
												</p>
											</div>
										</div>
									</div>
									<div className="referral-item">
										<div className="referral-item-wrapepr">
											<div className="img-con">
												<Image src={premiumImg} alt={""} width={32} height={32} />
											</div>
											<div className="descr-con">
												<p className="descr-main">{content.premium}</p>
												<p className="descr">
													<span className="diff-color">{PREMIUM_REF}</span>
													{content.invite}
												</p>
											</div>
										</div>
									</div>
								</Slider>
							</div>
							<div onClick={copyLink} className="bordered-green share-btn">
								{content.share}
							</div>
						</div>
						<div className="bordered-white ref-list">
							<p className="title">{content.yourRef}</p>
							<div className="stat-item">
								<div>{content.total}</div>
								<div className="diff-color">{Object.values(stats)?.reduce((acc, val) => acc + (val || 0), 0) || 0}</div>
							</div>
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
		</div>
	);
};

export default Referrals;
