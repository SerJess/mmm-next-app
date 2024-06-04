import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";
import { Carousel, CarouselItem } from "reactstrap";

import LoaderResponsive from "../SingleComponents/LoaderResponsive";
import { useAppSelector } from "../../redux";
import fetchWithToken from "../../helpers/fetchWithToken";

import tableBigImg from "../../assets/img/MainPage/tableBig.png";
import referralsImg from "../../assets/img/MainPage/referrals.png";
import friendImg from "../../assets/img/MainPage/settings/friend.png";
import premiumImg from "../../assets/img/MainPage/settings/premium.png";

import "../../assets/scss/MainPage/Referrals.scss";

const COMMON_REF = "+5 $MMM ";
const PREMIUM_REF = "+10 $MMM ";
const textForDm = "Мы Можем Многое - присоединяйся.";

const Referrals = () => {
	const { t } = useTranslation("common");
	const content = t("content.referrals", { returnObjects: true });

	const usersRefLink = useAppSelector((state) => state.main.user.referralCode);

	const [isLoading, setIsLoading] = useState(true);
	const [activeSlide, setActiveSlide] = useState(0);
	const [stats, setStats] = useState({});

	const getShareLink = () => `https://t.me/share/url?url=https://t.me/${process.env.BOT_USER_NAME}?start=r-${usersRefLink}&text=${textForDm}`;

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
		const timer = setInterval(() => {
			setActiveSlide((prevState) => (prevState + 1) % 2);
		}, 4000);

		return () => {
			clearInterval(timer);
		};
	}, []);

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
								<Carousel activeIndex={activeSlide} next={() => {}} previous={() => {}} className="ref-slider">
									<CarouselItem className="custom-tag" tag="div">
										<div className="referral-item">
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
									</CarouselItem>
									<CarouselItem className="custom-tag" tag="div">
										<div className="referral-item">
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
									</CarouselItem>
								</Carousel>
								<div className="carousel-indiacation-con">
									<div className={`indicator-item${activeSlide === 0 ? " active" : ""}`} />
									<div className={`indicator-item${activeSlide === 1 ? " active" : ""}`} />
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
		</div>
	);
};

export default Referrals;
