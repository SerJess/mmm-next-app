import React, { useEffect, useState } from "react";
import { Modal } from "reactstrap";
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";
import Countdown, { zeroPad } from "react-countdown";
import dayjs from "dayjs";

import { setUser } from "../../redux/slices/main";
import { useAppDispatch, useAppSelector } from "../../redux";

import fetchWithToken from "../../helpers/fetchWithToken";

import "../../assets/scss/MainPage/ClaimBtn.scss";

const ClaimBtn = () => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation("common");
	const content = t("content.claim", { returnObjects: true });
	const popUps = t("content.popUps", { returnObjects: true });

	const points = useAppSelector((state) => state.main.user.points);
	const exited = useAppSelector((state) => state.main.user.exited);

	const [isConfirmModal, setIsConfirmModal] = useState(false);
	const [isAvailAbleToClaim, setIsAvailAbleToClaim] = useState(false);
	const [isLastMinutesLock, setIsLastMinutesLock] = useState(false);

	const postClaim = async () => {
		if (!isAvailAbleToClaim) {
			return false;
		}
		try {
			setIsAvailAbleToClaim(false);

			const { success, error } = await fetchWithToken("/points/convert", { method: "POST" });

			if (!success || error?.message) {
				return toast.error(error?.message || "Something went wrong");
			}

			dispatch(setUser({ points: "0", exited: true }));
			setIsConfirmModal(false);
			toast.success(popUps.convert);
			return true;
		} catch (e) {
			console.error(e);
		}
		return false;
	};

	const onClaimClick = () => {
		if (isAvailAbleToClaim) {
			return setIsConfirmModal(true);
		}
		if (exited || !+points) {
			return toast.warn(popUps.exited, { toastId: "exited", autoClose: 2000 });
		}
		return toast.warn(popUps.timeout, { toastId: "timeout", autoClose: 2000 });
	};

	const checkAvailAbleToClaim = () => {
		const isLastMinutes = new Date().getMinutes() > 55;
		if (isLastMinutes) {
			setIsLastMinutesLock(true);
			return setIsAvailAbleToClaim(false);
		}
		if (!+points || exited) {
			return setIsAvailAbleToClaim(false);
		}
		return setIsAvailAbleToClaim(true);
	};

	useEffect(() => {
		checkAvailAbleToClaim();
		const interval = setInterval(checkAvailAbleToClaim, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [points, exited]);

	return (
		<>
			<div className="claim-btn-con">
				<div className="timer-con">
					{isLastMinutesLock && (
						<>
							<p className="descr">Оставшееся время до разблокировки:</p>
							<Countdown
								date={dayjs().endOf("hour").toDate().getTime()}
								onComplete={() => setIsLastMinutesLock(false)}
								zeroPadTime={2}
								renderer={({ formatted: { minutes, seconds } }) => (
									<div className="diff-color">
										{zeroPad(minutes)}:{zeroPad(seconds)}
									</div>
								)}
							/>
						</>
					)}
				</div>
				<div className={`claim-btn${isAvailAbleToClaim ? "" : " disabled"}`} onClick={onClaimClick}>
					{isAvailAbleToClaim ? content.claimNow : content.claimUnavailable}
				</div>
			</div>
			<Modal isOpen={isConfirmModal} className="claim-confirmation-modal">
				<div className="claim-confirmation-con">
					<p className="descr">{content.confirmation}</p>
					<p className="sub-descr">
						{content.descr1}
						{process.env.RATE_MAVR_TO_01_MMM}
						{content.descr2}
					</p>
					<div className="btns-con">
						<div className={`btn-item confirm-btn${isAvailAbleToClaim ? "" : " disabled"}`} onClick={postClaim}>
							{content.yes}
						</div>
						<div className="btn-item cancel-btn" onClick={() => setIsConfirmModal(false)}>
							{content.no}
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default ClaimBtn;
