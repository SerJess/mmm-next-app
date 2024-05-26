import React, { useState } from "react";
import { Modal } from "reactstrap";
import { useTranslation } from "next-i18next";

import "../../assets/scss/MainPage/ClaimBtn.scss";

const ClaimBtn = () => {
	const { t } = useTranslation("common");
	const content = t("content.claim", { returnObjects: true });

	const [isConfirmModal, setIsConfirmModal] = useState(false);
	return (
		<>
			<div className="claim-btn-con">
				<div className="claim-btn" onClick={() => setIsConfirmModal(true)}>
					{content.claimNow}
				</div>
			</div>
			<Modal isOpen={isConfirmModal} className="claim-confirmation-modal">
				<div className="claim-confirmation-con">
					<p className="descr">{content.confirmation}</p>
					<div className="btns-con">
						<div className="btn-item confirm-btn">{content.yes}</div>
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
