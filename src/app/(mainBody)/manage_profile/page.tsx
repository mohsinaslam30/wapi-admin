"use client";

import { useTranslation } from "react-i18next";
import ProfileForm from "@/src/components/profile/ProfileForm";
import ChangePasswordForm from "@/src/components/profile/ChangePasswordForm";

const ManageProfilePage = () => {
  const { t } = useTranslation();

  return (
    <div className=" max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-primary">{t("manage_profile_page_title")}</h1>
        <p className="text-gray-500 text-sm">{t("manage_profile_page_description")}</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <ProfileForm />
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default ManageProfilePage;
