import React, { useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { toast } from "react-toastify";
import { useTranslation } from "next-i18next";

import fetchWithToken from "../../helpers/fetchWithToken";
import { useAppDispatch, useAppSelector } from "../../redux";
import { setUser } from "../../redux/slices/main";

import tvImg from "../../assets/img/MainPage/tv/tv.png";
import triangleGreen from "../../assets/img/MainPage/tv/triangleGreen.json";
import boostBtnImg from "../../assets/img/MainPage/tv/boostBtn.png";

import "../../assets/scss/MainPage/TvContainer.scss";

dayjs.extend(utc);

const Lottie = dynamic(() => import("lottie-react").then((module) => module), { ssr: false });

const TvContainer = () => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation("common");
	const popUps = t("content.popUps", { returnObjects: true });
	const content = t("content.tv", { returnObjects: true });

	const lastBoostClaim = useAppSelector((state) => state.main.user.lastGuaranteedBoostUsageDate);
	const lastFreePointsClaim = useAppSelector((state) => state.main.user.lastFreePointsDate);
	const isBoosted = useAppSelector((state) => state.main.user.usedBoost);
	const isExited = useAppSelector((state) => state.main.user.exited);
	const points = useAppSelector((state) => state.main.user.points);

	const [isBoostActive, setIsBoostActive] = React.useState(false);
	const [isFreePointsActive, setIsFreePointsActive] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);

	const postBoost = async () => {
		if (isLoading) {
			return false;
		}
		try {
			setIsLoading(true);
			const { success, error } = await fetchWithToken("/boost/use", {
				method: "POST",
			});

			if (!success || error?.message) {
				return toast.error(error?.message || "Something went wrong");
			}
			dispatch(setUser({ usedBoost: true, lastGuaranteedBoostUsageDate: dayjs().utc().toDate() }));
			toast.success(popUps.boost);
		} catch (e) {
			console.error(e);
		} finally {
			setIsBoostActive(false);
			setIsLoading(false);
		}
		return true;
	};

	const postClaimFree = async () => {
		if (isLoading) {
			return false;
		}
		try {
			setIsLoading(true);
			const { success, error } = await fetchWithToken("/points/free", {
				method: "POST",
			});

			if (!success || error?.message) {
				return toast.error(error?.message || "Something went wrong");
			}

			dispatch(setUser({ points: `${+points + 10 * 100}`, lastFreePointsDate: dayjs().utc().toDate() }));
			toast.success(popUps.freePoints);
		} catch (e) {
			console.error(e);
		} finally {
			setIsBoostActive(false);
			setIsLoading(false);
		}
		return true;
	};

	useEffect(() => {
		if (lastBoostClaim && !isBoosted && !isExited) {
			const isOneDayAgo = dayjs(lastBoostClaim).utc().utc().add(1, "day").isAfter(dayjs());
			if (!isOneDayAgo) {
				setIsBoostActive(true);
			}
		}
		if (lastFreePointsClaim && !isExited) {
			const isOneDayAgo = dayjs(lastFreePointsClaim).utc().utc().add(1, "day").isAfter(dayjs());
			if (!isOneDayAgo) {
				setIsFreePointsActive(true);
			}
		}
	}, []);

	return (
		<div className="tv-con">
			<div className="tv-img-con">
				<Image src={tvImg} alt={""} width={359} height={230} priority={true} />
				<div className="triangle-con">
					<Lottie animationData={triangleGreen} loop={true} />
				</div>
				{isFreePointsActive && (
					<div className="btn-item confirm-btn" onClick={postClaimFree}>
						+10 {content.mavr}
					</div>
				)}
				{isBoostActive && (
					<div className="boost-btn" onClick={postBoost}>
						<Image src={boostBtnImg} alt={""} width={50} height={50} />
					</div>
				)}
			</div>
		</div>
	);
};

export default TvContainer;
