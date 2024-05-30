import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { Address } from "ton-core";
import { toast } from "react-toastify";

import { LanguageModal, SocialsModal, SupportModal } from "./SettingsModals";
import { useAppSelector } from "../../../redux";
import fetchWithToken from "../../../helpers/fetchWithToken";

import tableSmallImg from "../../../assets/img/MainPage/tableSmall.png";
import settingsImg from "../../../assets/img/MainPage/settings/settings.png";
import languageImg from "../../../assets/img/MainPage/settings/language.png";
import shareImg from "../../../assets/img/MainPage/settings/share.png";
import supportImg from "../../../assets/img/MainPage/settings/support.png";

import "../../../assets/scss/MainPage/Settings.scss";

const Settings = ({ closeTab }) => {
	const { t } = useTranslation("common");
	const content = t("content.settings", { returnObjects: true });
	const currentWalletAddress = useAppSelector((state) => state.main.user.walletAddress);

	const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
	const [isSocialsModalOpen, setIsSocialsModalOpen] = useState(false);
	const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

	const [tonConnectUI] = useTonConnectUI();
	const newConnectedAddress = useTonAddress(false);

	const addressToRaw = newConnectedAddress ? Address.parseRaw(newConnectedAddress).toString({ urlSafe: true, bounceable: false, testOnly: false }) : currentWalletAddress;
	const walletConcat = addressToRaw ? `${addressToRaw.slice(0, 6)}...${addressToRaw.slice(-4)}` : "";

	const btns = [
		//
		{ id: "lang", icon: languageImg, width: 48, height: 48, onClick: () => setIsLanguageModalOpen(true) },
		{ id: "share", icon: shareImg, width: 40, height: 40, onClick: () => setIsSocialsModalOpen(true) },
		{ id: "support", icon: supportImg, width: 40, height: 40, onClick: () => setIsSupportModalOpen(true) },
	];

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

	useEffect(() => {
		if (newConnectedAddress && !currentWalletAddress) {
			postConnectWallet();
		}
	}, [newConnectedAddress]);

	return (
		<div className="settings-con wide-con">
			<div className="tab-main-content-wrapper">
				<div className="tab-main-content">
					<div className="bg-img">
						<Image src={tableSmallImg} alt={""} layout="fill" />
					</div>
					<div className="main-wrapper">
						<div className="bordered-white heading-con">
							<Image src={settingsImg} alt={""} width={138} height={48} />
						</div>
						<div className="bordered-white settings-content-con">
							<p className="descr">{content.settings}</p>
							<div className="btns-con">
								{btns.map(({ id, icon, width, height, onClick }) => (
									<div key={id} className="btn-item bordered-green" onClick={onClick}>
										<Image src={icon} alt={""} width={width} height={height} />
									</div>
								))}
							</div>
						</div>
						<div className="bordered-green wallet-btn" onClick={() => tonConnectUI.openModal()}>
							{walletConcat || content.connectWallet}
						</div>
					</div>
				</div>
			</div>
			<div className="close-btn-con">
				<div className="bordered-green close-btn" onClick={closeTab}>
					{content.close}
				</div>
			</div>
			<LanguageModal isOpen={isLanguageModalOpen} close={() => setIsLanguageModalOpen(false)} />
			<SocialsModal isOpen={isSocialsModalOpen} close={() => setIsSocialsModalOpen(false)} />
			<SupportModal isOpen={isSupportModalOpen} close={() => setIsSupportModalOpen(false)} />
		</div>
	);
};

export default Settings;
