"use client";

import CommonHeader from "@/src/shared/CommonHeader";
import { useTranslation } from "react-i18next";

interface EmailTemplateHeaderProps {
  onSearch: (value: string) => void;
  searchTerm: string;
  isLoading: boolean;
}

const EmailTemplateHeader = ({ onSearch, searchTerm, isLoading }: EmailTemplateHeaderProps) => {
  const { t } = useTranslation();

  return <CommonHeader title={t("email_template_title")} description={t("email_template_description")} onSearch={onSearch} searchTerm={searchTerm} searchPlaceholder={t("email_template_search_placeholder")} isLoading={isLoading} />;
};

export default EmailTemplateHeader;
