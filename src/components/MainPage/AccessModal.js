import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { Address } from "ton-core";
import { toast } from "react-toastify";
import { Modal } from "reactstrap";
import Image from "next/image";

import { useAppSelector } from "../../redux";
import fetchWithToken from "../../helpers/fetchWithToken";

import LoaderResponsive from "../SingleComponents/LoaderResponsive";

import successImg from "../../assets/img/MainPage/settings/success.png";

import "../../assets/scss/MainPage/AccessModal.scss";

const AccessModal = ({ closeModal }) => {
	const { t } = useTranslation("common");
	const content = t("content.accessModal", { returnObjects: true });
	const currentWalletAddress = useAppSelector((state) => state.main.user.walletAddress);

	const [isSuccess, setIsSuccess] = useState(false);
	const [isWaitConfirmation, setIsWaitConfirmation] = useState(false);

	const [tonConnectUI] = useTonConnectUI();
	const newConnectedAddress = useTonAddress(false);

	const postConnectWallet = async () => {
		try {
			const { success, error } = await fetchWithToken("/users/wallet", {
				method: "POST",
				body: {
					walletAddress: Address.parseRaw(newConnectedAddress).toString({ urlSafe: true, bounceable: false, testOnly: false }),
				},
			});

			if (!success || error?.message) {
				return toast.error(error?.message || "Something went wrong");
			}
		} catch (e) {
			console.error(e);
		}
		return true;
	};

	const sendTransaction = async () => {
		let txResult = null;
		try {
			txResult = await tonConnectUI.sendTransaction({
				validUntil: Math.floor(new Date().getTime() / 1000) + 360,
				messages: [
					{
						address: "UQBKJirjWuKMf02Cgw1-zx2FqPf3aeXmMVcevooscaO55Z7_", // destination address
						amount: "2000000000", // 2 TON
						payload: "",
					},
				],
			});
		} catch (e) {
			console.error(e);
		}

		if (!txResult?.boc) {
			toast.error("Transaction failed, please try again.");
			return false;
		}

		setIsWaitConfirmation(true);
		return true;
	};

	const getIsTransactionConfirmed = async () => {
		try {
			// TODO
			const { success } = await fetchWithToken("/users/wallet");

			if (success) {
				setIsSuccess(true);
				setIsWaitConfirmation(false);
			}
		} catch (e) {
			console.error(e);
		}
		return true;
	};

	const walletBtnClick = () => {
		if (!newConnectedAddress) {
			return tonConnectUI.openModal();
		}
		return sendTransaction();
	};

	useEffect(() => {
		// tonConnectUI.disconnect();
		if (newConnectedAddress && !currentWalletAddress) {
			postConnectWallet();
		}
	}, [newConnectedAddress]);

	useEffect(() => {
		let interval = null;
		if (isWaitConfirmation) {
			interval = setInterval(async () => {
				await getIsTransactionConfirmed();
			}, 3000);
		}
		return () => {
			clearInterval(interval);
		};
	}, [isWaitConfirmation]);

	return (
		<Modal isOpen={true} className="custom-settings-modal access-modal" zIndex={99}>
			<div className="settings-modal-con">
				{!isSuccess && !isWaitConfirmation && (
					<>
						<p className="descr">{content.title}</p>
						<div className="btns-con">
							<div className="btn-item confirm-btn" onClick={walletBtnClick}>
								{newConnectedAddress ? content.purchase : content.connectWallet}
							</div>
							<div className="btn-item confirm-btn" onClick={closeModal}>
								{content.enterCode}
							</div>
						</div>
					</>
				)}
				{isWaitConfirmation && <LoaderResponsive />}
				{isSuccess && (
					<>
						<div className="img-con">
							<Image src={successImg} alt={""} width={180} height={180} />
						</div>
						<p className="descr-sub">{content.success}</p>
						<div className="btns-con">
							<div className="btn-item confirm-btn" onClick={closeModal}>
								{content.continue}
							</div>
						</div>
					</>
				)}
			</div>
		</Modal>
	);
};

export default AccessModal;
