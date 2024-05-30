import React, { useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { toast } from "react-toastify";

import fetchWithToken from "../../helpers/fetchWithToken";
import { useAppDispatch, useAppSelector } from "../../redux";

import tvImg from "../../assets/img/MainPage/tv/tv.png";
import triangleGreen from "../../assets/img/MainPage/tv/triangleGreen.json";
import boostBtnImg from "../../assets/img/MainPage/tv/boostBtn.png";

import "../../assets/scss/MainPage/TvContainer.scss";
import { setUser } from "../../redux/slices/main";

dayjs.extend(utc);

const Lottie = dynamic(() => import("lottie-react").then((module) => module), { ssr: false });

const TvContainer = () => {
	const dispatch = useAppDispatch();
	const lastBoostClaim = useAppSelector((state) => state.main.user.lastGuaranteedBoostUsageDate);
	const isBoosted = useAppSelector((state) => state.main.user.usedBoost);

	const [isBoostActive, setIsBoostActive] = React.useState(false);
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
		} catch (e) {
			console.error(e);
		} finally {
			setIsBoostActive(false);
			setIsLoading(false);
		}
		return true;
	};

	useEffect(() => {
		if (lastBoostClaim && !isBoosted) {
			const isOneDayAgo = dayjs(lastBoostClaim).utc().utc().add(1, "day").isAfter(dayjs());
			if (!isOneDayAgo) {
				setIsBoostActive(true);
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
				{isBoostActive && (
					<div className="boost-btn" onClick={postBoost}>
						<Image src={boostBtnImg} alt={""} width={66} height={66} />
					</div>
				)}
			</div>
		</div>
	);
};

export default TvContainer;
