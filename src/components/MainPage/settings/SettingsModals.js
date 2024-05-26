import React from "react";
import { Modal } from "reactstrap";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import Image from "next/image";

import tgLogoImg from "../../../assets/img/MainPage/settings/tgLogo.png";
import twitterLogoImg from "../../../assets/img/MainPage/settings/twitterLogo.png";

import "../../../assets/scss/MainPage/SettingsModals.scss";

const LanguageModal = ({ isOpen, close }) => {
	const { t, i18n } = useTranslation("common");
	const content = t("content.settings", { returnObjects: true });
	const { language } = i18n;
	const { pathname, replace } = useRouter();

	const switchLanguage = async (lang) => {
		if (language === lang) {
			return false;
		}
		await setCookie("NEXT_LOCALE", lang);
		await i18n.changeLanguage(lang);
		await replace(pathname, pathname, { locale: lang });
		return true;
	};

	return (
		<Modal isOpen={isOpen} toggle={close} className="custom-settings-modal">
			<div className="settings-modal-con">
				<p className="descr">{content.chooseLang}</p>
				<div className="btns-con">
					<div className="btn-item confirm-btn" onClick={() => switchLanguage("ru")}>
						{content.rus}
					</div>
					<div className="btn-item confirm-btn" onClick={() => switchLanguage("en")}>
						{content.eng}
					</div>
				</div>
			</div>
		</Modal>
	);
};

const SocialsModal = ({ isOpen, close }) => {
	const { t } = useTranslation("common");
	const content = t("content.settings", { returnObjects: true });

	return (
		<Modal isOpen={isOpen} toggle={close} className="custom-settings-modal">
			<div className="settings-modal-con">
				<p className="descr">{content.socials}</p>
				<div className="btns-con">
					<div className="btn-item confirm-btn">
						<div className="icon-con">
							<Image src={tgLogoImg} alt={""} width={24} height={20} />
						</div>
						{content.telegram}
					</div>
					<div className="btn-item confirm-btn">
						<div className="icon-con">
							<Image src={twitterLogoImg} alt={""} width={20} height={18} />
						</div>
						{content.twitter}
					</div>
				</div>
			</div>
		</Modal>
	);
};

const SupportModal = ({ isOpen, close }) => {
	const { t } = useTranslation("common");
	const content = t("content.settings", { returnObjects: true });

	return (
		<Modal isOpen={isOpen} toggle={close} className="custom-settings-modal">
			<div className="settings-modal-con">
				<p className="descr">{content.support}</p>
				<div className="btns-con">
					<div className="btn-item confirm-btn wide">{content.write}</div>
				</div>
			</div>
		</Modal>
	);
};

export { LanguageModal, SocialsModal, SupportModal };
