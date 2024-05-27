import React, { useEffect, useState } from "react";
import { Modal } from "reactstrap";
import { useTranslation } from "next-i18next";
import dayjs from "dayjs";

import "../../assets/scss/MainPage/ClaimBtn.scss";
import fetchWithToken from "../../helpers/fetchWithToken";
import { toast } from "react-toastify";

const ClaimBtn = () => {
	const { t } = useTranslation("common");
	const content = t("content.claim", { returnObjects: true });

	const [isConfirmModal, setIsConfirmModal] = useState(false);
	const [isAvailAbleToClaim, setIsAvailAbleToClaim] = useState(false);

	useEffect(() => {
		const isLastMinutes = new Date().getMinutes() > 55;

		setIsAvailAbleToClaim(!isLastMinutes);

		let timer = null;
		if (!isLastMinutes) {
			timer = setTimeout(
				() => {
					setIsAvailAbleToClaim(true);
				},
				dayjs().endOf("hour").diff(dayjs(), "millisecond")
			);
		}

		return () => {
			clearTimeout(timer);
		};
	});

	const postClaim = async () => {
		if (!isAvailAbleToClaim) {
			return false;
		}
		try {
			setIsAvailAbleToClaim(false);

			// TODO add refetch balance
			const { success, error } = await fetchWithToken("/points/convert", { method: "POST" });

			if (!success || error?.message) {
				return toast.error(error?.message || "Something went wrong");
			}

			return true;
		} catch (e) {
			console.error(e);
		}
		return false;
	};

	return (
		<>
			<div className="claim-btn-con">
				<div className={`claim-btn${isAvailAbleToClaim ? "" : " disabled"}`} onClick={() => setIsConfirmModal(true)}>
					{content.claimNow}
				</div>
			</div>
			<Modal isOpen={isConfirmModal} className="claim-confirmation-modal">
				<div className="claim-confirmation-con">
					<p className="descr">{content.confirmation}</p>
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
